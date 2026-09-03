import { Inbox } from 'lucide-react';
import clsx from 'clsx';

export default function EmptyState({
  icon: Icon = Inbox,
  title = 'No data available',
  description,
  actionLabel,
  onAction,
  className,
}) {
  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-center py-16 text-center',
        className
      )}
    >
      <div className="rounded-card bg-base-elevated p-4 mb-4">
        <Icon size={28} className="text-text-muted" />
      </div>
      <p className="text-body font-medium text-text-muted">
        {title}
      </p>
      {description && (
        <p className="mt-1 text-micro text-text-muted max-w-xs">
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-4 btn-primary"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
