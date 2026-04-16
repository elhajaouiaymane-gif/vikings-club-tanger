'use client';

import { useState, useEffect } from 'react';
import { Bell, X } from 'lucide-react';

export default function NotificationPrompt() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    if (typeof window === 'undefined') return;
    if (!('Notification' in window)) return;
    if (Notification.permission === 'granted' || Notification.permission === 'denied') return;

    const wasDismissed = localStorage.getItem('vikings-notif-dismissed');
    if (wasDismissed) { setDismissed(true); return; }

    const timer = setTimeout(() => setShow(true), 10000);
    return () => clearTimeout(timer);
  }, [dismissed]);

  useEffect(() => {
    if (!show) return;
    const autoHide = setTimeout(() => setShow(false), 25000);
    return () => clearTimeout(autoHide);
  }, [show]);

  const handleEnable = async () => {
    try {
      const perm = await Notification.requestPermission();
      if (perm === 'granted') {
        new Notification('Vikings Club Tanger', {
          body: 'Welcome warrior! You\'ll now receive exclusive offers & updates.',
          icon: '/gym-logo.png',
        });
      }
    } catch {}
    setShow(false);
  };

  const handleDismiss = () => {
    localStorage.setItem('vikings-notif-dismissed', 'true');
    setDismissed(true);
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-16 left-3 right-3 z-35 md:hidden animate-fade-in-up">
      <div className="glass-dark rounded-xl px-4 py-3 flex items-center gap-3 border border-primary/20 shadow-lg shadow-black/30">
        <Bell className="size-5 text-primary shrink-0" />
        <p className="flex-1 text-xs text-foreground leading-snug">
          Enable notifications for exclusive offers & updates
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleEnable}
            className="btn-primary text-white text-xs font-semibold px-3 py-1.5 rounded-lg"
          >
            Enable
          </button>
          <button
            onClick={handleDismiss}
            className="text-muted-foreground hover:text-foreground p-1 transition-colors"
            aria-label="Dismiss"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
