'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { MapPin, Navigation, Clock, Loader2, XCircle, Crosshair, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/lib/i18n';

interface SelectedPlan {
  name: string;
  price: number;
}

interface Branch {
  id: string;
  name: string;
  nameAr: string;
  address: string;
  lat: number;
  lng: number;
  mapsUrl: string;
  mapsEmbed: string;
  badge: string;
  badgeColor: string;
}

const branches: Branch[] = [
  {
    id: 'branch-1',
    name: 'Vikings Club 1 — Sahat Madina',
    nameAr: 'فرع 1 — ساحة المدينة',
    address: 'Sahat Al Madina, Tangier',
    lat: 35.7873,
    lng: -5.8179,
    mapsUrl: 'https://maps.app.goo.gl/aePHaegRpa4sFRvm8',
    mapsEmbed: 'https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Vikings+Club+Tanger+Sahat+Al+Madina+Tangier+Morocco&zoom=15',
    badge: '',
    badgeColor: '',
  },
  {
    id: 'branch-2',
    name: 'Vikings Club 2 — Mesnana',
    nameAr: 'فرع 2 — مسنانة قواسم',
    address: 'Mesnana, Qouasem, Tangier',
    lat: 35.767,
    lng: -5.835,
    mapsUrl: 'https://maps.app.goo.gl/QUjLGETtyvZkwxvG8',
    mapsEmbed: 'https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Vikings+Club+2+Mesnana+Qouasem+Tangier+Morocco&zoom=15',
    badge: 'NEW',
    badgeColor: 'bg-emerald-500',
  },
];

function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

type GeoStatus = 'idle' | 'loading' | 'success' | 'denied' | 'unavailable';

export default function Locations({ selectedPlan }: { selectedPlan: SelectedPlan | null }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [geoStatus, setGeoStatus] = useState<GeoStatus>('idle');
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [distances, setDistances] = useState<Record<string, number>>({});
  const { t } = useTranslation();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    const revealElements = el.querySelectorAll('.reveal');
    revealElements.forEach((r) => observer.observe(r));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (selectedPlan) {
      const timer = setTimeout(() => {
        const el = document.getElementById('locations');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [selectedPlan]);

  const findNearestBranch = useCallback(() => {
    if (!navigator.geolocation) {
      setGeoStatus('unavailable');
      return;
    }

    setGeoStatus('loading');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserCoords({ lat: latitude, lng: longitude });

        const dists: Record<string, number> = {};
        branches.forEach((branch) => {
          dists[branch.id] = haversineDistance(latitude, longitude, branch.lat, branch.lng);
        });
        setDistances(dists);
        setGeoStatus('success');
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          setGeoStatus('denied');
        } else {
          setGeoStatus('unavailable');
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  }, []);

  const nearestBranchId =
    geoStatus === 'success' && Object.keys(distances).length === 2
      ? Object.entries(distances).reduce((a, b) => (a[1] < b[1] ? a : b))[0]
      : null;

  const getDirectionsUrl = (branch: Branch) => {
    if (userCoords) {
      return `https://www.google.com/maps/dir/?api=1&origin=${userCoords.lat},${userCoords.lng}&destination=Vikings+Club+Tanger+${encodeURIComponent(branch.address)}`;
    }
    return branch.mapsUrl;
  };

  return (
    <section id="locations" ref={sectionRef} className="relative py-16 px-4 md:px-8 bg-background overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-8 reveal">
          <span className="text-sm font-bold tracking-[0.2em] uppercase gradient-text">
            {t('locations_label')}
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            {t('locations_title')}
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            {t('locations_subtitle')}
          </p>
        </div>

        {selectedPlan && (
          <div className="reveal mb-10">
            <div className="mx-auto max-w-xl rounded-xl border border-primary/30 bg-primary/5 backdrop-blur-sm px-6 py-5 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="size-5 text-primary" />
                <span className="text-sm font-bold tracking-wider uppercase text-primary">
                  {t('locations_great_choice')}
                </span>
              </div>
              <p className="text-foreground text-lg font-semibold">
                {selectedPlan.name} —{' '}
                <span className="gradient-text font-extrabold">{selectedPlan.price} MAD</span>
              </p>
              <p className="text-muted-foreground text-sm mt-1">
                {t('locations_pick_branch')}
              </p>
            </div>
          </div>
        )}

        <div className="reveal mb-10 text-center">
          {geoStatus === 'idle' && (
            <Button
              onClick={findNearestBranch}
              className="btn-primary text-white font-semibold rounded-lg px-6 h-11 text-sm"
            >
              <Crosshair className="size-4 mr-2" />
              {t('locations_find')}
            </Button>
          )}
          {geoStatus === 'loading' && (
            <div className="inline-flex items-center gap-3 rounded-lg border border-primary/30 bg-card/50 backdrop-blur-sm px-5 py-3 text-sm text-muted-foreground">
              <Loader2 className="size-4 text-primary animate-spin" />
              {t('locations_detecting')}
            </div>
          )}
          {geoStatus === 'denied' && (
            <div className="inline-flex items-center gap-3 rounded-lg border border-destructive/30 bg-destructive/5 backdrop-blur-sm px-5 py-3 text-sm text-muted-foreground">
              <XCircle className="size-4 text-destructive shrink-0" />
              {t('locations_denied')}
            </div>
          )}
          {geoStatus === 'unavailable' && (
            <div className="inline-flex items-center gap-3 rounded-lg border border-destructive/30 bg-destructive/5 backdrop-blur-sm px-5 py-3 text-sm text-muted-foreground">
              <XCircle className="size-4 text-destructive shrink-0" />
              {t('locations_unavailable')}
            </div>
          )}
          {geoStatus === 'success' && userCoords && (
            <div className="inline-flex items-center gap-3 rounded-lg border border-emerald-500/30 bg-emerald-500/5 backdrop-blur-sm px-5 py-3 text-sm text-emerald-400">
              <MapPin className="size-4 shrink-0" />
              {t('locations_detected')}
            </div>
          )}
        </div>

        <div className="section-divider mb-10" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {branches.map((branch, index) => {
            const isNearest = nearestBranchId === branch.id;
            const distance = distances[branch.id];

            return (
              <div
                key={branch.id}
                className={`reveal rounded-xl overflow-hidden border transition-all duration-300 bg-card/80 backdrop-blur-sm card-glow ${
                  isNearest
                    ? 'border-emerald-500/60 shadow-[0_0_30px_oklch(0.7_0.18_160/0.15)]'
                    : 'border-border/30 hover:border-primary/40'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="relative">
                  <iframe
                    src={branch.mapsEmbed}
                    width="100%"
                    height="200"
                    style={{
                      border: 0,
                      filter: 'invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2)',
                    }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={branch.name}
                    className="w-full"
                  />
                  <div className="absolute top-3 right-3 flex flex-col gap-1.5">
                    {branch.badge && (
                      <span
                        className={`${branch.badgeColor} text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-lg`}
                      >
                        {branch.badge}
                      </span>
                    )}
                    {isNearest && (
                      <Badge className="bg-emerald-500 hover:bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-lg border-0">
                        📍 {t('locations_nearest')}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-base font-bold text-foreground">{branch.name}</h4>
                      <p className="text-xs text-muted-foreground/70 mt-0.5 font-arabic" dir="rtl">
                        {branch.nameAr}
                      </p>
                    </div>
                    {isNearest && (
                      <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">
                        {t('locations_nearest_short')}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="size-3.5 text-primary shrink-0" />
                    <span>{branch.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="size-3.5 text-primary shrink-0" />
                    <span>{t('locations_hours')}</span>
                  </div>

                  {geoStatus === 'success' && distance !== undefined && (
                    <div className="flex items-center gap-2 text-sm">
                      {isNearest ? (
                        <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-400">
                          <Crosshair className="size-3.5" />
                          {distance.toFixed(1)} km {t('locations_away')}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                          <Navigation className="size-3.5" />
                          {distance.toFixed(1)} km {t('locations_away')}
                        </span>
                      )}
                    </div>
                  )}

                  <a
                    href={getDirectionsUrl(branch)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 text-sm font-semibold mt-1 py-2.5 px-3 rounded-lg min-h-[44px] transition-colors duration-200 ${
                      isNearest
                        ? 'text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10'
                        : 'text-primary hover:underline hover:bg-primary/5'
                    }`}
                  >
                    <Navigation className="size-3.5" />
                    {userCoords ? t('locations_directions_from') : t('locations_directions')}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}