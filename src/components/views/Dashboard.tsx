import {
  Mail,
  FileText,
  ListChecks,
  Search,
  MessageSquare,
  ArrowRight,
  Zap,
  Clock,
  TrendingUp,
  CheckCircle2,
} from 'lucide-react';
import type { View } from '@/types';
import { Card } from '@/components/ui/Card';
import { Disclaimer } from '@/components/ui/Shared';

interface DashboardProps {
  onNavigate: (view: View) => void;
}

const features: {
  id: View;
  title: string;
  description: string;
  icon: typeof Mail;
  color: string;
  iconBg: string;
}[] = [
  {
    id: 'email',
    title: 'Smart Email Generator',
    description: 'Draft professional emails with AI — choose tone, audience, and purpose for perfectly tailored messages.',
    icon: Mail,
    color: 'text-brand-600',
    iconBg: 'bg-brand-50 border-brand-100',
  },
  {
    id: 'meeting',
    title: 'Meeting Notes Summarizer',
    description: 'Transform raw meeting notes into structured summaries with key points, action items, and deadlines.',
    icon: FileText,
    color: 'text-brand-600',
    iconBg: 'bg-brand-50 border-brand-100',
  },
  {
    id: 'tasks',
    title: 'AI Task Planner',
    description: 'Prioritize your to-do list and get an optimized daily schedule with time blocks and rationale.',
    icon: ListChecks,
    color: 'text-brand-600',
    iconBg: 'bg-brand-50 border-brand-100',
  },
  {
    id: 'research',
    title: 'AI Research Assistant',
    description: 'Get structured insights, key findings, and actionable recommendations on any topic in seconds.',
    icon: Search,
    color: 'text-brand-600',
    iconBg: 'bg-brand-50 border-brand-100',
  },
  {
    id: 'chat',
    title: 'AI Chatbot Interface',
    description: 'Ask anything work-related and get instant, professional responses from your AI assistant.',
    icon: MessageSquare,
    color: 'text-brand-600',
    iconBg: 'bg-brand-50 border-brand-100',
  },
];

const stats = [
  { label: 'Tasks Completed', value: '127', icon: CheckCircle2, trend: '+12%' },
  { label: 'Hours Saved', value: '34h', icon: Clock, trend: '+8%' },
  { label: 'Productivity Score', value: '92%', icon: TrendingUp, trend: '+5%' },
  { label: 'AI Actions', value: '1,420', icon: Zap, trend: '+23%' },
];

export function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-slate-900 p-8 sm:p-10">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600/20 via-slate-900 to-slate-900"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
        <div className="relative">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-600/20 border border-brand-500/30 text-brand-300 text-xs font-medium mb-4">
            <Zap className="w-3.5 h-3.5" />
            AI-Powered Productivity
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 max-w-2xl">
            Automate your daily work with BUILD IT IA
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mb-6">
            Your AI assistant for emails, meetings, tasks, research, and more — designed to help you work smarter, not harder.
          </p>
          <button
            onClick={() => onNavigate('email')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 transition-colors shadow-lg shadow-brand-600/20"
          >
            Get Started
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-brand-600" />
                </div>
                <span className="text-xs font-medium text-green-600">{stat.trend}</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-sm text-slate-500 mt-0.5">{stat.label}</p>
            </Card>
          );
        })}
      </div>

      {/* Feature Cards */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-4">AI Tools</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.id}
                className="p-6 hover:shadow-md hover:border-brand-200 transition-all duration-200 cursor-pointer group"
              >
                <button onClick={() => onNavigate(feature.id)} className="text-left w-full">
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-4 ${feature.iconBg}`}>
                    <Icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h4 className="text-base font-semibold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4">{feature.description}</p>
                  <div className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 group-hover:gap-2.5 transition-all">
                    Open tool
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </button>
              </Card>
            );
          })}
        </div>
      </div>

      <Disclaimer className="pt-2" />
    </div>
  );
}
