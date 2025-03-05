/**
 * Fallback notification handler for when the extension isn't available
 */
export function showFallbackNotification(
  type: 'info' | 'success' | 'error',
  title: string,
  message: string
): void {
  if (typeof window === 'undefined') return;
  
  // Simple console fallback
  switch (type) {
    case 'info':
      console.info(`${title}: ${message}`);
      break;
    case 'success':
      console.log(`✅ ${title}: ${message}`);
      break;
    case 'error':
      console.error(`❌ ${title}: ${message}`);
      break;
  }
  
  // If browser supports notifications API, use it as fallback
  if ('Notification' in window) {
    if (Notification.permission === 'granted') {
      new Notification(title, { body: message });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification(title, { body: message });
        }
      });
    }
  }
}