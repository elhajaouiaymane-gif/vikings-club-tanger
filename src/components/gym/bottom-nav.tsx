'use client';

import { useState, useEffect } from 'react';
import { Home, Dumbbell, UserPlus, MessageSquare, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

const navItems = [
  { id: 'home', icon: Home, label: 'Home', href: '#home' },
  { id: 'services', icon: Dumbbell, label: 'Services', href: '#services' },
  { id: 'pricing', icon: UserPlus, label: 'Join', href: '#pricing' },
];

export default function BottomNav() {
  const [active, setActive] = useState('home');
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    var ids = navItems.map(function(item) { return item.id; });
    var observer = new IntersectionObserver(
      function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    );
    ids.forEach(function(id) {
      var el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return function() { observer.disconnect(); };
  }, []);

  var handleClick = function(href: string, id: string) {
    if (id === 'contact') {
      window.dispatchEvent(new CustomEvent('open-contact-modal'));
      return;
    }
    var el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden glass-dark border-t border-white/10 safe-area-bottom">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map(function(item) {
          var Icon = item.icon;
          var isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={function() { handleClick(item.href, item.id); }}
              className={cn(
                'flex flex-col items-center justify-center gap-1 min-w-[60px] py-1.5 rounded-xl transition-all duration-200',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <Icon className={cn('size-5 transition-transform', isActive && 'scale-110')} />
              <span className="text-[10px] font-medium">{item.label}</span>
              {isActive && (
                <span className="absolute bottom-2 w-1 h-1 rounded-full bg-primary" />
              )}
            </button>
          );
        })}
        <button
          onClick={function() { handleClick('#contact', 'contact'); }}
          className={cn(
            'flex flex-col items-center justify-center gap-1 min-w-[60px] py-1.5 rounded-xl transition-all duration-200',
            active === 'contact' ? 'text-primary' : 'text-muted-foreground'
          )}
        >
          <MessageSquare className="size-5" />
          <span className="text-[10px] font-medium">Contact</span>
        </button>
        <button
          onClick={function() { setTheme(theme === 'dark' ? 'light' : 'dark'); }}
          className="flex flex-col items-center justify-center gap-1 min-w-[60px] py-1.5 rounded-xl transition-all duration-200 text-muted-foreground hover:text-primary"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="size-5" /> : <Moon className="size-5" />}
          <span className="text-[10px] font-medium">{theme === 'dark' ? 'Light' : 'Dark'}</span>
        </button>
      </div>
    </nav>
  );
}