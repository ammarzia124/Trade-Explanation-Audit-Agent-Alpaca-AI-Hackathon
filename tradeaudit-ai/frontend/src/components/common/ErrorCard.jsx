import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function ErrorCard({ message, onRetry, title }) {
  return (
    <div
      className="rounded-card border border-danger/20 bg-danger-muted p-card"
      role="alert"
    >
      <div className="flex items-start gap-3">
        <AlertTriangle size={18} className="text-danger mt-0.5 shrink-0" />
        <div className="flex-1 min-w-0">
          {title && (
            <h3 className="text-caption font-semibold text-danger mb-1">{title}</h3>
          )}
          <p className="text-caption text-danger">{message}</p>
        </div>
        {onRetry && (
          <button
            onClick={onRetry}
            className="shrink-0 inline-flex items-center gap-1.5 rounded-button bg-danger/10 px-3 py-1.5 text-micro font-medium text-danger transition-colors hover:bg-danger/20"
          >
            <RefreshCw size={12} />
            Retry
          </button>
        )}
      </div>
    </div>
  );
}
