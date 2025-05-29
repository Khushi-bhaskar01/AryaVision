/**
 * Formats a date in a human-readable format (e.g., "2 hours ago", "yesterday")
 * @param {Date} date - The date to format
 * @returns {string} The formatted date string
 */
export function formatDistanceToNow(date) {
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  // Less than a minute
  if (diffInSeconds < 60) {
    return 'just now';
  }
  
  // Less than an hour
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
  }
  
  // Less than a day
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
  }
  
  // Less than a week
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    if (diffInDays === 1) {
      return 'yesterday';
    }
    return `${diffInDays} days ago`;
  }
  
  // Format as date
  return formatDate(date);
}

/**
 * Formats a date as MM/DD/YYYY
 * @param {Date} date - The date to format
 * @returns {string} The formatted date string
 */
export function formatDate(date) {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}