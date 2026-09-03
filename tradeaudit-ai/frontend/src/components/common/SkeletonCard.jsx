import clsx from 'clsx';

export default function SkeletonCard({ className, rows = 1, height = 'h-32' }) {
  return (
    <div
      className={clsx(
        'rounded-card border border-base-border bg-base-light p-card',
        className
      )}
      aria-busy="true"
      aria-label="Loading"
    >
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className={clsx('skeleton rounded-card', height, i > 0 && 'mt-3')}
        />
      ))}
    </div>
  );
}
