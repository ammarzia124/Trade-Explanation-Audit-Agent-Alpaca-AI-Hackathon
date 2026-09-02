import { format } from 'date-fns';

export function formatDate(dateString) {
  if (!dateString) return 'N/A';
  try {
    return format(new Date(dateString), 'MMM dd, yyyy HH:mm:ss');
  } catch {
    return dateString;
  }
}

export function formatCurrency(value) {
  if (value === null || value === undefined) return '$0.00';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

export function getRiskColor(score) {
  if (score <= 3) return 'text-green-600';
  if (score <= 6) return 'text-yellow-600';
  if (score <= 8) return 'text-orange-600';
  return 'text-red-600';
}

export function getRiskBg(score) {
  if (score <= 3) return 'bg-green-100';
  if (score <= 6) return 'bg-yellow-100';
  if (score <= 8) return 'bg-orange-100';
  return 'bg-red-100';
}

export function truncate(str, len = 100) {
  if (!str || str.length <= len) return str;
  return str.slice(0, len) + '...';
}
