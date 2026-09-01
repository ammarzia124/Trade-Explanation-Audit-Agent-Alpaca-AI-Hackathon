import { Bot, User } from 'lucide-react';

export default function MessageBubble({ role, content }) {
  const isUser = role === 'user';

  return (
    <div className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="bg-primary-100 text-primary-700 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
          <Bot size={16} />
        </div>
      )}

      <div
        className={`max-w-[75%] rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-primary-600 text-white rounded-br-md'
            : 'bg-gray-100 text-gray-900 rounded-bl-md'
        }`}
      >
        <p className="text-sm whitespace-pre-wrap">{content}</p>
      </div>

      {isUser && (
        <div className="bg-gray-200 text-gray-600 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
          <User size={16} />
        </div>
      )}
    </div>
  );
}
