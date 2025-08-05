import type { LucideIcon } from 'lucide-react';
import {
  LayoutDashboard,
  Calendar,
  BarChart3,
  Thermometer,
  ShieldAlert,
  Crosshair,
  UserCheck,
  Scale,
  Users,
  GitCommitHorizontal,
  Database,
  Diamond,
  List,
  Sparkles,
  Target,
  GraduationCap,
  Trophy,
  ClipboardList,
  Settings,
  Webhook,
  Flame,
  TrendingUp,
  DatabaseZap,
  BrainCircuit,
} from 'lucide-react';

export interface NavLink {
  href: string;
  label: string;
  icon: LucideIcon;
  subLinks?: NavLink[];
}

export interface NavGroup {
  title: string;
  links: NavLink[];
}

export const menuList: NavGroup[] = [
  {
    title: 'Main',
    links: [
      {
        href: '/dashboard',
        label: 'Dashboard',
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: 'Schedule and Result',
    links: [
      {
        href: '/schedule/daily-schedule',
        label: 'Daily Schedule',
        icon: Calendar,
      },
      {
        href: '/schedule/scoreboard',
        label: 'ScoreBoard',
        icon: ClipboardList,
      },
    ],
  },
  {
    title: 'Analysis and Data',
    links: [
      {
        href: '/analysis/live-odds',
        label: 'Live Odds',
        icon: Scale,
      },
      {
        href: '/analysis/weather-analysis',
        label: 'Weather Analysis',
        icon: Thermometer,
      },
      {
        href: '/analysis/injury-analysis',
        label: 'Injury Analysis',
        icon: ShieldAlert,
      },
      {
        href: '/analysis/park-factor-analysis',
        label: 'Park Factor Analysis',
        icon: Crosshair,
      },
      {
        href: '/analysis/probable-pitcher-analysis',
        label: 'Probable Pitcher',
        icon: UserCheck,
      },
      {
        href: '/analysis/umpire-data-analysis',
        label: 'Umpire Data',
        icon: Users,
      },
      {
        href: '/analysis/bullpen-analysis',
        label: 'Bullpen Analysis',
        icon: Users,
      },
      {
        href: '/analysis/batter-stats',
        label: 'Batter Analysis',
        icon: Flame,
      },
    ],
  },
  {
    title: 'Data Hub Center',
    links: [
      {
        href: '/data-hub/team-data',
        label: 'Team Data',
        icon: Database,
      },
      {
        href: '/data-hub/batter-stats',
        label: 'Batter Stats',
        icon: BarChart3,
      },
      {
        href: '/data-hub/pitcher-stats',
        label: 'Pitcher Stats',
        icon: BarChart3,
      },
      {
        href: '/data-hub/pitcher-vs-batter',
        label: 'Pitcher Vs Batter',
        icon: BarChart3,
      },
      {
        href: '/data-hub/park-factors',
        label: 'Park Factors',
        icon: List,
      },
      {
        href: '/data-hub/top-home-runners',
        label: 'Top Home Runners',
        icon: Diamond,
      },
    ],
  },
  {
    title: 'Daily Picks Generation',
    links: [
      {
        href: '/picks/trap-detector',
        label: 'Trap Detector',
        icon: ShieldAlert,
      },
      {
        href: '/picks/signal-analysis',
        label: 'Signal Analysis',
        icon: Target,
      },
      {
        href: '/picks/ai-picks',
        label: 'AI Picks',
        icon: Sparkles,
      },
    ],
  },
  {
    title: 'Result and Lessons',
    links: [
      {
        href: '/results/graded-picks',
        label: 'Graded Picks',
        icon: ClipboardList,
      },
      {
        href: '/results/results',
        label: 'Results',
        icon: Trophy,
      },
      {
        href: '/results/lesson-learning',
        label: 'Lesson Learning',
        icon: GraduationCap,
      },
    ],
  },
  {
    title: 'Admin',
    links: [
      {
        href: '/admin',
        label: 'Admin Dashboard',
        icon: Settings,
      },
       {
        href: '/admin/odds-parser',
        label: 'Odds Parser',
        icon: Webhook,
      },
       {
        href: '/admin/firestore-test',
        label: 'Firestore Test',
        icon: DatabaseZap,
      },
       {
        href: '/admin/ai-chat',
        label: 'AI Chat',
        icon: BrainCircuit,
      },
    ],
  },
];
