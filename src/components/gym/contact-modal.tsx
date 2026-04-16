'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: 'join' | 'contact';
}

export function ContactModal({ isOpen, onClose, mode = 'join' }: ContactModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Join form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [plan, setPlan] = useState('');

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [message, setMessage] = useState('');

  const resetForms = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setPlan('');
    setContactName('');
    setContactEmail('');
    setContactPhone('');
    setMessage('');
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      resetForms();
      onClose();
    }
  };

  const handleJoinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: fullName, email, phone, plan, mode: 'join' }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Something went wrong.');
      }

      toast({
        title: 'Welcome to Vikings Club! 🏋️',
        description: "We've received your sign-up details. Our team will reach out within 24 hours to get you started.",
      });

      setTimeout(() => {
        resetForms();
        onClose();
      }, 1500);
    } catch (err) {
      toast({
        title: 'Submission Failed',
        description: err instanceof Error ? err.message : 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: contactName, email: contactEmail, phone: contactPhone, message, mode: 'contact' }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Something went wrong.');
      }

      toast({
        title: 'Message Sent!',
        description: "We'll reach out within 24 hours.",
      });

      setTimeout(() => {
        resetForms();
        onClose();
      }, 1500);
    } catch (err) {
      toast({
        title: 'Submission Failed',
        description: err instanceof Error ? err.message : 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md max-h-[85vh] overflow-y-auto bg-background/95 backdrop-blur-xl border-border/50">
        {mode === 'join' ? (
          <>
            <DialogHeader className="space-y-2 pb-2">
              <DialogTitle className="text-2xl font-bold">
                Start Your <span className="gradient-text">Journey</span>
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Fill in your details and we&apos;ll get you set up
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleJoinSubmit} className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="bg-card/50 border-border/50 focus:border-primary/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-card/50 border-border/50 focus:border-primary/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+212 6XX XXX XXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="bg-card/50 border-border/50 focus:border-primary/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="plan">Which plan interests you?</Label>
                <Select value={plan} onValueChange={setPlan} required>
                  <SelectTrigger className="w-full bg-card/50 border-border/50 focus:border-primary/50">
                    <SelectValue placeholder="Select a plan" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border/50">
                    <SelectItem value="1 Mois — 250 MAD">1 Mois — 250 MAD</SelectItem>
                    <SelectItem value="3 Mois — 650 MAD">3 Mois — 650 MAD</SelectItem>
                    <SelectItem value="6 Mois — 1100 MAD">6 Mois — 1100 MAD</SelectItem>
                    <SelectItem value="1 An — 1800 MAD">1 An — 1800 MAD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                type="submit"
                className="btn-primary w-full h-11 text-white font-semibold text-base mt-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Get Started'
                )}
              </Button>
            </form>
          </>
        ) : (
          <>
            <DialogHeader className="space-y-2 pb-2">
              <DialogTitle className="text-2xl font-bold">
                Get In <span className="gradient-text">Touch</span>
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleContactSubmit} className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label htmlFor="contactName">Name</Label>
                <Input
                  id="contactName"
                  placeholder="John Doe"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  required
                  className="bg-card/50 border-border/50 focus:border-primary/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  placeholder="votre@email.com"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  required
                  className="bg-card/50 border-border/50 focus:border-primary/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPhone">Phone</Label>
                <Input
                  id="contactPhone"
                  type="tel"
                  placeholder="+212 6XX XXX XXX"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  required
                  className="bg-card/50 border-border/50 focus:border-primary/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us how we can help you..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={4}
                  className="bg-card/50 border-border/50 focus:border-primary/50 resize-none"
                />
              </div>
              <Button
                type="submit"
                className="btn-primary w-full h-11 text-white font-semibold text-base mt-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Send Message'
                )}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
