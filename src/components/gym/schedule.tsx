'use client';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, User } from 'lucide-react';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

type Intensity = 'easy' | 'medium' | 'intense';

interface ClassEntry {
  time: string;
  name: string;
  trainer: string;
  intensity: Intensity;
}

const intensityConfig: Record<
  Intensity,
  { dot: string; label: string; badge: string }
> = {
  easy: {
    dot: 'bg-green-500 shadow-green-500/50',
    label: 'Easy',
    badge: 'bg-green-500/15 text-green-400 border-green-500/25',
  },
  medium: {
    dot: 'bg-yellow-500 shadow-yellow-500/50',
    label: 'Medium',
    badge: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/25',
  },
  intense: {
    dot: 'bg-red-500 shadow-red-500/50',
    label: 'Intense',
    badge: 'bg-red-500/15 text-red-400 border-red-500/25',
  },
};

const schedule: Record<string, ClassEntry[]> = {
  Mon: [
    { time: '8:00 AM', name: 'Musculation Open', trainer: 'Youssef', intensity: 'medium' },
    { time: '10:00 AM', name: 'Crossfit WOD', trainer: 'Karim', intensity: 'intense' },
    { time: '5:00 PM', name: 'Group Training', trainer: 'Omar', intensity: 'medium' },
    { time: '7:00 PM', name: 'Strength & Conditioning', trainer: 'Youssef', intensity: 'intense' },
  ],
  Tue: [
    { time: '8:00 AM', name: 'Cardio Burn', trainer: 'Omar', intensity: 'medium' },
    { time: '10:00 AM', name: 'Crossfit WOD', trainer: 'Karim', intensity: 'intense' },
    { time: '5:00 PM', name: 'Personal Coaching', trainer: 'Amine', intensity: 'easy' },
    { time: '7:00 PM', name: 'Power Lifting', trainer: 'Youssef', intensity: 'intense' },
  ],
  Wed: [
    { time: '8:00 AM', name: 'Musculation Open', trainer: 'Youssef', intensity: 'medium' },
    { time: '10:00 AM', name: 'Group HIIT', trainer: 'Omar', intensity: 'intense' },
    { time: '5:00 PM', name: 'Crossfit Skills', trainer: 'Karim', intensity: 'medium' },
    { time: '7:00 PM', name: 'Strength Area', trainer: 'Youssef', intensity: 'intense' },
  ],
  Thu: [
    { time: '8:00 AM', name: 'Cardio Burn', trainer: 'Omar', intensity: 'medium' },
    { time: '10:00 AM', name: 'Crossfit WOD', trainer: 'Karim', intensity: 'intense' },
    { time: '5:00 PM', name: 'Personal Coaching', trainer: 'Amine', intensity: 'easy' },
    { time: '7:00 PM', name: 'Group Training', trainer: 'Omar', intensity: 'medium' },
  ],
  Fri: [
    { time: '8:00 AM', name: 'Musculation Open', trainer: 'Youssef', intensity: 'medium' },
    { time: '10:00 AM', name: 'Crossfit WOD', trainer: 'Karim', intensity: 'intense' },
    { time: '5:00 PM', name: 'Strength Circuit', trainer: 'Youssef', intensity: 'intense' },
  ],
  Sat: [
    { time: '9:00 AM', name: 'Weekend Crossfit', trainer: 'Karim', intensity: 'intense' },
    { time: '11:00 AM', name: 'Group Training', trainer: 'Omar', intensity: 'medium' },
  ],
  Sun: [
    { time: '10:00 AM', name: 'Open Gym', trainer: 'Youssef', intensity: 'easy' },
  ],
};

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function ClassItem({ entry }: { entry: ClassEntry }) {
  const config = intensityConfig[entry.intensity];

  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-card/80 backdrop-blur-sm border border-border/40 hover:border-primary/30 hover:bg-accent/30 transition-all duration-300 group">
      {/* Intensity dot */}
      <div
        className={`w-2.5 h-2.5 rounded-full shrink-0 shadow-md ${config.dot}`}
        title={`${config.label} intensity`}
      />

      {/* Time */}
      <div className="flex items-center gap-1.5 shrink-0 w-20">
        <Clock className="w-3.5 h-3.5 text-muted-foreground" />
        <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
          {entry.time}
        </span>
      </div>

      {/* Class name */}
      <span className="text-sm font-semibold text-foreground flex-1 min-w-0 truncate">
        {entry.name}
      </span>

      {/* Trainer */}
      <div className="flex items-center gap-1.5 shrink-0">
        <User className="w-3.5 h-3.5 text-muted-foreground" />
        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
          {entry.trainer}
        </span>
      </div>

      {/* Intensity badge */}
      <Badge
        variant="outline"
        className={`shrink-0 text-[11px] px-2 py-0.5 ${config.badge}`}
      >
        {config.label}
      </Badge>
    </div>
  );
}

function DayClasses({ classes }: { classes: ClassEntry[] }) {
  return (
    <div className="space-y-3 animate-fade-in-up">
      {classes.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-base">No classes scheduled</p>
        </div>
      ) : (
        classes.map((entry) => (
          <ClassItem key={`${entry.time}-${entry.name}`} entry={entry} />
        ))
      )}
    </div>
  );
}

export default function Schedule() {
  useScrollReveal();

  return (
    <section id="schedule" className="py-20 md:py-28 relative bg-photo-overlay overflow-hidden">
      {/* Real gym photo background — reverse Ken Burns for variety */}
      <div
        className="bg-rune-pattern bg-glow-teal"
      />
      <div className="bg-rune-pattern-dust" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14 reveal">
          <span className="text-sm font-semibold tracking-widest text-primary uppercase">
            Schedule
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-4 text-foreground">
            Class Timetable
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Plan your week with our diverse range of classes. From high-intensity
            sessions to mindful recovery, we have something for every fitness level.
          </p>
          <div className="section-divider max-w-xs mx-auto mt-8" />
        </div>

        {/* Tabs Schedule */}
        <div className="reveal max-w-4xl mx-auto">
          <Tabs defaultValue="Mon" className="w-full">
            {/* Day tabs */}
            <TabsList className="w-full flex bg-card/80 backdrop-blur-sm border border-border/50 h-11 p-1 rounded-xl mb-6 overflow-x-auto scrollbar-hide">
              {days.map((day) => (
                <TabsTrigger
                  key={day}
                  value={day}
                  className="flex-none min-w-[3.5rem] px-3 rounded-lg text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-primary/30 transition-all duration-300"
                >
                  {day}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Day content */}
            {days.map((day) => (
              <TabsContent key={day} value={day}>
                <Card className="border-border/40 bg-card/60 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <DayClasses classes={schedule[day]} />
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-sm shadow-green-500/50" />
              <span>Easy</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 shadow-sm shadow-yellow-500/50" />
              <span>Medium</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-sm shadow-red-500/50" />
              <span>Intense</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
