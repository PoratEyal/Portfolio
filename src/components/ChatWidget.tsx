import { useRef, useEffect, useState, type FormEvent } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

const EASING = [0.165, 0.84, 0.44, 1] as const;

const KNOWN_DOMAINS = [
  'linkedin.com',
  'github.com',
  'hivest.app',
  'activitywiz.com',
  'apps.apple.com',
  'facebook.com',
  'instagram.com',
];

const FRIENDLY_LABELS: [string, string][] = [
  ['apps.apple.com/il/app/hivest', 'Hivest on App Store ↗'],
  ['linkedin.com', 'LinkedIn Profile ↗'],
  ['github.com', 'GitHub Profile ↗'],
  ['hivest.app', 'Hivest Website ↗'],
  ['activitywiz.com', 'ActivityWiz Website ↗'],
  ['apps.apple.com', 'App Store ↗'],
  ['facebook.com', 'Facebook Profile ↗'],
  ['instagram.com', 'Instagram Profile ↗'],
];

function getFriendlyLabel(url: string): string {
  const lower = url.toLowerCase();
  for (const [domain, label] of FRIENDLY_LABELS) {
    if (lower.includes(domain)) return label;
  }
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
}

type LinkMatch = { start: number; end: number; url: string; label?: string };

const SECTION_ANCHORS: Record<string, string> = {
  '#contact': 'Contact Section 📬',
  '#about': 'About Section',
  '#products': 'Products Section',
  '#skills': 'Skills Section',
};

function scrollToSection(hash: string) {
  const id = hash.replace('#', '');
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function findLinks(text: string): LinkMatch[] {
  const results: LinkMatch[] = [];
  const lower = text.toLowerCase();

  // 1. Find markdown-style links: [label](#anchor) or [label](url)
  const mdRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let mdMatch;
  while ((mdMatch = mdRegex.exec(text)) !== null) {
    results.push({
      start: mdMatch.index,
      end: mdMatch.index + mdMatch[0].length,
      url: mdMatch[2],
      label: mdMatch[1],
    });
  }

  // 2. Find standalone #anchor links (like #contact)
  const hashRegex = /#(?:contact|about|products|skills)\b/gi;
  let hashMatch;
  while ((hashMatch = hashRegex.exec(text)) !== null) {
    const alreadyMatched = results.some(
      (r) => hashMatch!.index >= r.start && hashMatch!.index < r.end
    );
    if (!alreadyMatched) {
      results.push({
        start: hashMatch.index,
        end: hashMatch.index + hashMatch[0].length,
        url: hashMatch[0],
      });
    }
  }

  // 3. Find https:// URLs
  let idx = 0;
  while (idx < lower.length) {
    const httpIdx = lower.indexOf('http', idx);
    if (httpIdx === -1) break;
    if (lower.startsWith('http://', httpIdx) || lower.startsWith('https://', httpIdx)) {
      const alreadyMatched = results.some(
        (r) => httpIdx >= r.start && httpIdx < r.end
      );
      if (!alreadyMatched) {
        let end = httpIdx;
        while (end < text.length && !/[\s),!?;:]/.test(text[end])) end++;
        while (end > httpIdx && text[end - 1] === '.') end--;
        if (end > httpIdx + 8) {
          results.push({ start: httpIdx, end, url: text.slice(httpIdx, end) });
        }
      }
      idx = httpIdx + (results.length > 0 ? results[results.length - 1].end - httpIdx : 1);
      if (idx <= httpIdx) idx = httpIdx + 1;
    } else {
      idx = httpIdx + 1;
    }
  }

  // 4. Find known domains without https://
  for (const domain of KNOWN_DOMAINS) {
    idx = 0;
    while (idx < lower.length) {
      const domIdx = lower.indexOf(domain, idx);
      if (domIdx === -1) break;
      const alreadyMatched = results.some(
        (r) => domIdx >= r.start && domIdx < r.end
      );
      if (!alreadyMatched) {
        let end = domIdx;
        while (end < text.length && !/[\s),!?;:]/.test(text[end])) end++;
        while (end > domIdx && text[end - 1] === '.') end--;
        results.push({ start: domIdx, end, url: text.slice(domIdx, end) });
      }
      idx = domIdx + domain.length;
    }
  }

  return results.sort((a, b) => a.start - b.start);
}

function renderTextWithLinks(text: string, isUser: boolean) {
  const links = findLinks(text);
  if (links.length === 0) return text;

  const elements: React.ReactNode[] = [];
  let lastEnd = 0;

  const linkClass = cn(
    'inline-flex items-center gap-1 underline underline-offset-2 whitespace-nowrap cursor-pointer',
    isUser
      ? 'text-primary-foreground/90 hover:text-primary-foreground'
      : 'text-primary hover:text-primary/80'
  );

  for (let i = 0; i < links.length; i++) {
    const { start, end, url, label } = links[i];
    if (start > lastEnd) {
      elements.push(<span key={`t${i}`}>{text.slice(lastEnd, start)}</span>);
    }

    const isAnchor = url.startsWith('#');

    if (isAnchor) {
      const displayLabel =
        label || SECTION_ANCHORS[url.toLowerCase()] || url;
      elements.push(
        <button
          key={`l${i}`}
          type="button"
          dir="ltr"
          onClick={() => scrollToSection(url)}
          className={linkClass}
        >
          {displayLabel}
        </button>
      );
    } else {
      const href = url.startsWith('http') ? url : `https://${url}`;
      const displayLabel = label || getFriendlyLabel(url);
      elements.push(
        <a
          key={`l${i}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          dir="ltr"
          className={linkClass}
        >
          {displayLabel}
        </a>
      );
    }
    lastEnd = end;
  }

  if (lastEnd < text.length) {
    elements.push(<span key="last">{text.slice(lastEnd)}</span>);
  }

  return elements;
}

const chatTransport = new DefaultChatTransport({
  api: '/api/chat',
});

const baseUrl = import.meta.env.BASE_URL ?? '/';
const BOT_PROFILE_IMAGES = [
  `${baseUrl}images/botProfileImages/helicopter.jpeg`,
  `${baseUrl}images/botProfileImages/surf.png`,
  `${baseUrl}images/botProfileImages/dragon.png`,
  `${baseUrl}images/botProfileImages/drums.png`,
  `${baseUrl}images/botProfileImages/laba.png`,
];

function getRandomBotImage(): string {
  return BOT_PROFILE_IMAGES[Math.floor(Math.random() * BOT_PROFILE_IMAGES.length)];
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [showProfile, setShowProfile] = useState<string | null>(null);
  const [botAvatar] = useState(() => getRandomBotImage());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { messages, sendMessage, status } = useChat({
    transport: chatTransport,
  });

  const isLoading = status === 'streaming' || status === 'submitted';

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const resizeTextarea = () => {
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = 'auto';
      ta.style.height = `${Math.min(ta.scrollHeight, 120)}px`;
    }
  };

  const onSubmit = (e?: FormEvent) => {
    e?.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;
    setInput('');
    sendMessage({ text });
    // Reset textarea height
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }, 0);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  const onSuggestionClick = (suggestion: string) => {
    if (isLoading) return;
    setInput('');
    sendMessage({ text: suggestion });
  };

  return (
    <>
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-4">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.3, ease: EASING }}
            className="w-full sm:w-[400px] h-[100dvh] sm:h-[550px] max-sm:fixed max-sm:inset-0 flex flex-col sm:rounded-2xl border-0 sm:border sm:border-border/50 bg-card text-card-foreground shadow-2xl shadow-black/10 dark:shadow-black/30 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border/30 bg-card/80 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowProfile(botAvatar)}
                  className="relative flex-shrink-0 size-9 rounded-full overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <img
                    src={botAvatar}
                    alt="Eyal"
                    className="size-full object-cover"
                  />
                  <span className="absolute -top-0.5 -right-0.5 size-2.5 bg-emerald-500 rounded-full ring-2 ring-card" />
                </button>
                <div>
                  <h3 className="font-semibold text-sm text-foreground">
                    Eyal's Personal Assistant
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {isLoading ? 'Typing...' : 'Online'}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => setIsOpen(false)}
                className="rounded-full"
              >
                <X className="size-4" />
              </Button>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 overflow-hidden">
              <div className="flex flex-col gap-3 p-4">
                {/* Welcome message */}
                {messages.length === 0 && (
                  <div className="flex flex-col items-center justify-center text-center py-10 px-4 gap-4">
                    <button
                      type="button"
                      onClick={() => setShowProfile(botAvatar)}
                      className="size-20 rounded-full overflow-hidden cursor-pointer hover:scale-105 transition-transform shadow-lg"
                    >
                      <img src={botAvatar} alt="Eyal" className="size-full object-cover" />
                    </button>
                    <div>
                      <h4 className="font-bold text-foreground text-base">
                        Hey! I'm Eyal's Personal Assistant
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1.5 max-w-[260px] leading-relaxed">
                        Ask me anything about Eyal's work, projects, or
                        skills — I'd love to help! 😊
                      </p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2 mt-3 w-full">
                      {[
                        { text: 'Tell me about Hivest', icon: '📈' },
                        { text: "What are Eyal's skills?", icon: '💻' },
                        { text: 'How can I contact Eyal?', icon: '📬' },
                      ].map((suggestion) => (
                        <button
                          key={suggestion.text}
                          type="button"
                          onClick={() => onSuggestionClick(suggestion.text)}
                          className="flex items-center gap-1.5 text-xs px-4 py-2 rounded-xl border border-border/40 bg-secondary/60 text-foreground/80 hover:bg-primary/10 hover:border-primary/30 hover:text-foreground transition-all duration-200"
                        >
                          <span>{suggestion.icon}</span>
                          <span>{suggestion.text}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Message bubbles */}
                {messages.map((message) => {
                  const text = message.parts
                    .filter(
                      (p): p is { type: 'text'; text: string } =>
                        p.type === 'text'
                    )
                    .map((p) => p.text)
                    .join('');

                  if (!text) return null;

                  return (
                    <div
                      key={message.id}
                      className={cn(
                        'flex gap-2',
                        message.role === 'user'
                          ? 'ml-auto flex-row-reverse'
                          : 'mr-auto'
                      )}
                      style={{ maxWidth: '85%' }}
                    >
                      {/* Avatar */}
                      {message.role === 'user' ? (
                        <div className="flex-shrink-0 flex items-center justify-center size-7 rounded-full mt-0.5 bg-primary">
                          <User className="size-3.5 text-primary-foreground" />
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setShowProfile(botAvatar)}
                          className="flex-shrink-0 size-7 rounded-full mt-0.5 overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                        >
                          <img src={botAvatar} alt="Eyal" className="size-full object-cover" />
                        </button>
                      )}

                      {/* Bubble */}
                      <div
                        dir="auto"
                        className={cn(
                          'rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
                          message.role === 'user'
                            ? 'bg-primary text-primary-foreground rounded-br-md'
                            : 'bg-secondary text-secondary-foreground rounded-bl-md'
                        )}
                        style={{ overflowWrap: 'anywhere', wordBreak: 'break-word' }}
                      >
                        <p className="whitespace-pre-wrap" dir="auto">
                          {renderTextWithLinks(text, message.role === 'user')}
                        </p>
                      </div>
                    </div>
                  );
                })}

                {/* Loading indicator */}
                {isLoading &&
                  messages[messages.length - 1]?.role === 'user' && (
                    <div className="flex gap-2 mr-auto max-w-[85%]">
                      <button
                        type="button"
                        onClick={() => setShowProfile(botAvatar)}
                        className="flex-shrink-0 size-7 rounded-full overflow-hidden mt-0.5 cursor-pointer hover:opacity-80 transition-opacity"
                      >
                        <img src={botAvatar} alt="Eyal" className="size-full object-cover" />
                      </button>
                      <div className="rounded-2xl rounded-bl-md bg-secondary px-4 py-3">
                        <div className="flex gap-1.5">
                          <span className="size-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:0ms]" />
                          <span className="size-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:150ms]" />
                          <span className="size-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:300ms]" />
                        </div>
                      </div>
                    </div>
                  )}

                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input area */}
            <form
              onSubmit={onSubmit}
              className="flex items-end gap-2 p-4 border-t border-border/30 bg-card/80 backdrop-blur-xl"
            >
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  resizeTextarea();
                }}
                onKeyDown={onKeyDown}
                placeholder="Type a message..."
                disabled={isLoading}
                rows={1}
                className="flex-1 rounded-2xl bg-secondary/50 border-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring/50 px-4 py-2.5 text-sm resize-none overflow-y-auto max-h-[120px] min-h-[40px] placeholder:text-muted-foreground"
              />
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || !input.trim()}
                className="rounded-full shrink-0"
              >
                <Send className="size-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB Toggle Button - hidden on mobile when chat is open */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(isOpen && 'max-sm:hidden')}
      >
        <Button
          onClick={() => setIsOpen((prev) => !prev)}
          size="icon-lg"
          className={cn(
            'rounded-full shadow-lg shadow-primary/25 size-14 transition-all duration-300',
            isOpen &&
              'bg-muted text-muted-foreground hover:bg-muted/80 shadow-none'
          )}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="size-6" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle className="size-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>

      {/* Profile Image Lightbox (Easter Egg) */}
      <AnimatePresence>
        {showProfile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 backdrop-blur-sm cursor-pointer"
            onClick={() => setShowProfile(null)}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ duration: 0.3, ease: EASING }}
              className="size-[85vw] max-size-[500px] sm:size-[500px] rounded-full overflow-hidden shadow-2xl cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={showProfile}
                alt="Eyal Porat"
                className="size-full object-cover"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </>
  );
}
