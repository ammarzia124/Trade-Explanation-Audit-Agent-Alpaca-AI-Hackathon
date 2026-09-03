import { useState } from 'react';
import { Bot, User, Copy, Check } from 'lucide-react';

export default function MessageBubble({ role, content }) {
  const isUser = role === 'user';
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent-muted border border-base-border">
          <Bot size={16} className="text-accent" />
        </div>
      )}

      <div
        className={`max-w-[80%] rounded-card px-4 py-3 text-body leading-relaxed ${
          isUser
            ? 'bg-accent text-white rounded-tr-button'
            : 'bg-base-light text-text-primary rounded-tl-button border border-base-border'
        }`}
      >
        <p className="whitespace-pre-wrap">{content}</p>
        <div className={`mt-2 flex items-center gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
          <span className="text-micro text-text-muted opacity-60">
            {new Date().toLocaleTimeString()}
          </span>
          {!isUser && (
            <button
              onClick={handleCopy}
              aria-label={copied ? 'Copied' : 'Copy message'}
              className="flex items-center gap-1 text-micro text-text-muted opacity-60 transition-opacity duration-150 hover:opacity-100 hover:text-text-secondary"
            >
              {copied ? (
                <><Check size={12} className="text-success" /> Copied</>
              ) : (
                <><Copy size={12} /> Copy</>
              )}
            </button>
          )}
        </div>
      </div>

      {isUser && (
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-base-elevated border border-base-border">
          <User size={16} className="text-text-secondary" />
        </div>
      )}
    </div>
  );
}
