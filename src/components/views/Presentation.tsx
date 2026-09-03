import { useState, useEffect, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Lightbulb,
  Target,
  Code2,
  AlertTriangle,
  Rocket,
  CheckCircle2,
  Layers,
  Brain,
  Palette,
  Trophy,
  Maximize2,
  Minimize2,
  Search,
} from 'lucide-react';
import type { View } from '@/types';
import { Disclaimer } from '@/components/ui/Shared';

interface PresentationProps {
  onNavigate: (view: View) => void;
}

interface Slide {
  id: number;
  icon: typeof Sparkles;
  iconBg: string;
  label: string;
  title: string;
  render: () => React.ReactNode;
}

export function Presentation({ onNavigate }: PresentationProps) {
  const [current, setCurrent] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  const slides: Slide[] = [
    {
      id: 0,
      icon: Sparkles,
      iconBg: 'bg-brand-600',
      label: 'Title',
      title: 'BUILD IT IA',
      render: () => (
        <div className="text-center flex flex-col items-center justify-center min-h-[420px] gap-6">
          <div className="w-20 h-20 rounded-2xl bg-brand-600 flex items-center justify-center shadow-2xl shadow-brand-600/30">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">BUILD IT IA</h1>
            <p className="text-xl text-brand-200 font-medium">AI Workplace Productivity Assistant</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 max-w-2xl">
            {['Email Generation', 'Meeting Summaries', 'Task Planning', 'Research', 'AI Chatbot'].map((tag) => (
              <span key={tag} className="px-4 py-2 rounded-full bg-white/10 border border-white/15 text-sm text-brand-100">
                {tag}
              </span>
            ))}
          </div>
          <p className="text-slate-400 text-sm mt-4">Presentation — How We Built It</p>
        </div>
      ),
    },
    {
      id: 1,
      icon: Lightbulb,
      iconBg: 'bg-amber-500',
      label: 'The Prompt',
      title: 'The Original Prompt',
      render: () => (
        <div className="space-y-6">
          <p className="text-slate-300 text-lg leading-relaxed">
            We were asked to build a modern, responsive AI Workplace Productivity Assistant that helps professionals
            automate daily work tasks using AI — with a clean SaaS dashboard, sidebar navigation, and interactive components.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-white/5 border border-white/10">
              <p className="text-brand-300 text-sm font-semibold mb-2">Core Features Requested</p>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-1.5 flex-shrink-0" />Smart Email Generator (tone + audience)</li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-1.5 flex-shrink-0" />Meeting Notes Summarizer</li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-1.5 flex-shrink-0" />AI Task Planner</li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-1.5 flex-shrink-0" />AI Research Assistant</li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-1.5 flex-shrink-0" />AI Chatbot Interface</li>
              </ul>
            </div>
            <div className="p-5 rounded-xl bg-white/5 border border-white/10">
              <p className="text-brand-300 text-sm font-semibold mb-2">Design Requirements</p>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-1.5 flex-shrink-0" />Modern SaaS UI — clean & minimal</li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-1.5 flex-shrink-0" />Sidebar navigation + card layout</li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-1.5 flex-shrink-0" />Loading states & responsive design</li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-1.5 flex-shrink-0" />AI disclaimer on all outputs</li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-1.5 flex-shrink-0" />Colors: Blue, White & Black</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      icon: Target,
      iconBg: 'bg-red-500',
      label: 'The Problem',
      title: 'The Problem We Are Solving',
      render: () => (
        <div className="space-y-6">
          <p className="text-slate-300 text-lg leading-relaxed">
            Professionals spend hours every day on repetitive tasks — drafting emails, summarizing meetings, planning
            schedules, and researching topics. This is time that could be spent on higher-value work.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { stat: '2.5 hrs', label: 'Daily time spent on email', icon: '📧' },
              { stat: '31%', label: 'Of meetings feel unproductive', icon: '📅' },
              { stat: '4.3 hrs', label: 'Weekly on research & summaries', icon: '🔍' },
            ].map((item) => (
              <div key={item.label} className="p-5 rounded-xl bg-white/5 border border-white/10 text-center">
                <p className="text-3xl mb-2">{item.icon}</p>
                <p className="text-2xl font-bold text-white">{item.stat}</p>
                <p className="text-sm text-slate-400 mt-1">{item.label}</p>
              </div>
            ))}
          </div>
          <div className="p-5 rounded-xl bg-brand-600/10 border border-brand-500/20">
            <p className="text-brand-200 text-base leading-relaxed">
              <strong className="text-white">The goal:</strong> Build a single AI-powered workspace that automates these
              daily tasks — producing professional, ready-to-review output in seconds, not hours.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      icon: Layers,
      iconBg: 'bg-brand-600',
      label: 'Architecture',
      title: 'How We Designed It',
      render: () => (
        <div className="space-y-6">
          <p className="text-slate-300 text-lg leading-relaxed">
            We chose a component-driven architecture with React, TypeScript, and Tailwind CSS — separating the AI
            logic from the UI for maintainability and scalability.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 mb-3">
                <Code2 className="w-5 h-5 text-brand-400" />
                <p className="text-white font-semibold text-sm">Tech Stack</p>
              </div>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-400" />React 18 + TypeScript — type-safe components</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-400" />Vite — fast build & dev tooling</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-400" />Tailwind CSS — utility-first styling</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-400" />Lucide React — consistent icon set</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-400" />Supabase — backend for data persistence</li>
              </ul>
            </div>
            <div className="p-5 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 mb-3">
                <Layers className="w-5 h-5 text-brand-400" />
                <p className="text-white font-semibold text-sm">Project Structure</p>
              </div>
              <div className="text-xs text-slate-400 font-mono leading-relaxed">
                <p>src/</p>
                <p className="pl-3">├── App.tsx — view routing</p>
                <p className="pl-3">├── types.ts — shared types</p>
                <p className="pl-3">├── lib/aiEngine.ts — AI logic</p>
                <p className="pl-3">├── components/</p>
                <p className="pl-6">├── ui/ — reusable components</p>
                <p className="pl-6">└── views/ — feature pages</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 4,
      icon: Brain,
      iconBg: 'bg-purple-600',
      label: 'AI Engine',
      title: 'The AI Engine — Structured Prompt Engineering',
      render: () => (
        <div className="space-y-6">
          <p className="text-slate-300 text-lg leading-relaxed">
            Each feature uses structured prompt engineering — the AI receives formatted input parameters and generates
            professional, well-structured output using deterministic templates and keyword analysis.
          </p>
          <div className="space-y-3">
            {[
              { feature: 'Email Generator', prompt: 'Topic + Tone + Audience + Purpose + Length → Subject line, body, tips', icon: '📧' },
              { feature: 'Meeting Summarizer', prompt: 'Raw notes → Summary, key points, action items (owner + deadline), decisions', icon: '📝' },
              { feature: 'Task Planner', prompt: 'Task list + work hours + deadline → Prioritized schedule with time blocks + rationale', icon: '✅' },
              { feature: 'Research Assistant', prompt: 'Topic + depth → Overview, insights, key findings, recommendations', icon: '🔍' },
              { feature: 'Chatbot', prompt: 'User message → Context-aware professional response with suggestions', icon: '💬' },
            ].map((item) => (
              <div key={item.feature} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-brand-500/30 transition-colors">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm">{item.feature}</p>
                  <p className="text-slate-400 text-xs mt-0.5 font-mono">{item.prompt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 5,
      icon: AlertTriangle,
      iconBg: 'bg-amber-500',
      label: 'Challenges',
      title: 'Challenges We Faced',
      render: () => (
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                num: '01',
                title: 'AI Output Quality',
                desc: 'Generating professional, consistent output across five different features required carefully designed templates and keyword detection logic for each use case.',
              },
              {
                num: '02',
                title: 'Tone & Audience Matching',
                desc: 'The email generator needed to adapt language, greetings, and closings based on six tones and four audience types — all while staying natural and professional.',
              },
              {
                num: '03',
                title: 'Meeting Note Parsing',
                desc: 'Raw meeting notes come in wildly different formats. We built pattern matching for bullet points, action keywords, and deadline references to extract structure.',
              },
              {
                num: '04',
                title: 'Task Prioritization Logic',
                desc: 'Detecting priority from free-text task descriptions required keyword analysis (urgent, critical, optional) and a time-blocking algorithm that fits available hours.',
              },
              {
                num: '05',
                title: 'Responsive Design',
                desc: 'The sidebar, card layouts, and chat interface all needed to work seamlessly from mobile to desktop — including a collapsible drawer for the sidebar on small screens.',
              },
              {
                num: '06',
                title: 'Loading & Empty States',
                desc: 'Every feature needed clear loading indicators and empty states so users always know what is happening and what to do next.',
              },
            ].map((challenge) => (
              <div key={challenge.num} className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-amber-500/30 transition-colors">
                <div className="flex items-start gap-3">
                  <span className="text-2xl font-bold text-amber-500/60 flex-shrink-0">{challenge.num}</span>
                  <div>
                    <p className="text-white font-semibold text-sm mb-1">{challenge.title}</p>
                    <p className="text-slate-400 text-xs leading-relaxed">{challenge.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 6,
      icon: Palette,
      iconBg: 'bg-brand-600',
      label: 'Design System',
      title: 'Design System & UI',
      render: () => (
        <div className="space-y-6">
          <p className="text-slate-300 text-lg leading-relaxed">
            We built a cohesive design system using a blue, white, and black palette with consistent spacing, typography,
            and interactive states.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-white/5 border border-white/10">
              <p className="text-brand-300 text-sm font-semibold mb-3">Color Palette</p>
              <div className="flex gap-2 mb-3">
                {['#2563eb', '#3b82f6', '#60a5fa', '#dbeafe', '#eff6ff', '#0f172a', '#1e293b', '#f8fafc', '#ffffff'].map((c) => (
                  <div key={c} className="flex flex-col items-center gap-1">
                    <div className="w-10 h-10 rounded-lg border border-white/10" style={{ backgroundColor: c }} />
                    <span className="text-[10px] text-slate-500 font-mono">{c}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-5 rounded-xl bg-white/5 border border-white/10">
              <p className="text-brand-300 text-sm font-semibold mb-3">Design Principles</p>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-1.5 flex-shrink-0" />8px spacing system for consistency</li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-1.5 flex-shrink-0" />Inter font — 3 weights max</li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-1.5 flex-shrink-0" />Card-based layout with hover effects</li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-1.5 flex-shrink-0" />Fade-in, slide-up, shimmer animations</li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-1.5 flex-shrink-0" />Dark sidebar + light content area</li>
              </ul>
            </div>
          </div>
          <div className="p-5 rounded-xl bg-white/5 border border-white/10">
            <p className="text-brand-300 text-sm font-semibold mb-3">Reusable Components Built</p>
            <div className="flex flex-wrap gap-2">
              {['Card', 'Button', 'Loader', 'ShimmerLines', 'Badge', 'CopyButton', 'Disclaimer', 'FeatureHeader', 'EmptyState'].map((comp) => (
                <span key={comp} className="px-3 py-1.5 rounded-lg bg-brand-600/15 border border-brand-500/20 text-xs text-brand-200 font-mono">
                  {comp}
                </span>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 7,
      icon: Code2,
      iconBg: 'bg-green-600',
      label: 'Implementation',
      title: 'Implementation — Feature by Feature',
      render: () => (
        <div className="space-y-4">
          {[
            {
              feature: 'Smart Email Generator',
              approach: 'Tone-adjective mapping, audience-based greetings, purpose-specific templates, length guidance, and contextual tips generation.',
              icon: '📧',
            },
            {
              feature: 'Meeting Notes Summarizer',
              approach: 'Line-by-line parsing with bullet-point detection, action-item extraction (owner + deadline regex), and decision keyword matching.',
              icon: '📝',
            },
            {
              feature: 'AI Task Planner',
              approach: 'Priority keyword detection, sort by urgency, time-block scheduling from 9 AM, and rationale per priority level.',
              icon: '✅',
            },
            {
              feature: 'AI Research Assistant',
              approach: 'Depth-aware overview generation, four themed insight cards, findings list, and actionable recommendations.',
              icon: '🔍',
            },
            {
              feature: 'AI Chatbot Interface',
              approach: 'Context-aware response matching on keywords (email, meeting, task, research, help), typing indicators, and suggested prompts.',
              icon: '💬',
            },
          ].map((item) => (
            <div key={item.feature} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
              <span className="text-2xl flex-shrink-0">{item.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm">{item.feature}</p>
                <p className="text-slate-400 text-xs mt-1 leading-relaxed">{item.approach}</p>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 8,
      icon: CheckCircle2,
      iconBg: 'bg-green-600',
      label: 'Solutions',
      title: 'How We Solved the Challenges',
      render: () => (
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { challenge: 'AI Output Quality', solution: 'Built deterministic template functions with parameterized content generation for each feature, ensuring consistent professional output.' },
              { challenge: 'Tone & Audience Matching', solution: 'Created a tone-to-adjective mapping system and audience-specific greeting/closing logic that adapts the email structure dynamically.' },
              { challenge: 'Meeting Note Parsing', solution: 'Implemented multi-pattern detection: bullet markers, numbered lists, action keywords, owner names, and deadline phrases via regex.' },
              { challenge: 'Task Prioritization', solution: 'Developed keyword-based priority detection with a sorting algorithm and time-block scheduler that distributes tasks across available hours.' },
              { challenge: 'Responsive Design', solution: 'Used Tailwind responsive breakpoints with a collapsible sidebar drawer, adaptive grid layouts, and mobile-first component design.' },
              { challenge: 'Loading & Empty States', solution: 'Built reusable Loader, ShimmerLines, and EmptyState components used across all five features for consistent UX feedback.' },
            ].map((item, i) => (
              <div key={i} className="p-5 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <p className="text-amber-300 text-xs font-semibold">{item.challenge}</p>
                </div>
                <div className="flex items-start gap-2 mt-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-slate-300 text-xs leading-relaxed">{item.solution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 9,
      icon: Rocket,
      iconBg: 'bg-brand-600',
      label: 'The Output',
      title: 'The Final Product',
      render: () => (
        <div className="space-y-6">
          <p className="text-slate-300 text-lg leading-relaxed">
            BUILD IT IA is a fully functional prototype with five interactive AI-powered features, a professional SaaS
            dashboard, and a responsive design that works across all devices.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { label: 'AI Features', value: '5', icon: Brain },
              { label: 'Components Built', value: '15+', icon: Layers },
              { label: 'Responsive Breakpoints', value: '4', icon: Palette },
              { label: 'Email Tones', value: '6', icon: Sparkles },
              { label: 'Audience Types', value: '4', icon: Target },
              { label: 'Research Depths', value: '3', icon: Search },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                  <Icon className="w-6 h-6 text-brand-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-slate-400 mt-1">{stat.label}</p>
                </div>
              );
            })}
          </div>
          <div className="p-5 rounded-xl bg-brand-600/10 border border-brand-500/20">
            <p className="text-brand-200 text-sm leading-relaxed">
              The app includes a dashboard with stats and feature cards, a dark sidebar with navigation, loading states
              with spinners and shimmer effects, copy-to-clipboard on all outputs, and the required AI disclaimer on
              every feature.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 10,
      icon: Trophy,
      iconBg: 'bg-amber-500',
      label: 'Key Takeaways',
      title: 'Key Takeaways',
      render: () => (
        <div className="space-y-5">
          <div className="space-y-3">
            {[
              { num: '01', title: 'Structured Prompt Engineering Works', desc: 'By treating each AI feature as a structured input-to-output pipeline, we achieved consistent, professional results without unpredictable outputs.' },
              { num: '02', title: 'Component-Driven Architecture Scales', desc: 'Separating AI logic (aiEngine.ts) from UI components made it easy to build five distinct features that share a consistent design language.' },
              { num: '03', title: 'Design Systems Prevent Drift', desc: 'A reusable component library (Card, Button, Loader, Badge) with a defined color palette and spacing system kept the UI cohesive across all views.' },
              { num: '04', title: 'Loading & Empty States Matter', desc: 'Every feature communicates clearly when processing and when idle — users always know what to do next, which builds trust in the AI.' },
              { num: '05', title: 'Responsiveness Is Non-Negotiable', desc: 'Mobile-first design with a collapsible sidebar and adaptive grids ensured the app works from phone to desktop without compromise.' },
            ].map((item) => (
              <div key={item.num} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-brand-500/30 transition-colors">
                <span className="text-2xl font-bold text-brand-500/40 flex-shrink-0">{item.num}</span>
                <div>
                  <p className="text-white font-semibold text-sm">{item.title}</p>
                  <p className="text-slate-400 text-xs mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 11,
      icon: Sparkles,
      iconBg: 'bg-brand-600',
      label: 'Thank You',
      title: '',
      render: () => (
        <div className="text-center flex flex-col items-center justify-center min-h-[420px] gap-6">
          <div className="w-20 h-20 rounded-2xl bg-brand-600 flex items-center justify-center shadow-2xl shadow-brand-600/30">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Thank You</h1>
            <p className="text-xl text-brand-200">BUILD IT IA — AI Workplace Productivity Assistant</p>
          </div>
          <p className="text-slate-400 text-sm max-w-md">
            A fully functional prototype with interactive UI and AI-powered features — built from prompt to production.
          </p>
          <button
            onClick={() => onNavigate('dashboard')}
            className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 transition-colors shadow-lg shadow-brand-600/20"
          >
            <Rocket className="w-4 h-4" />
            Explore the App
          </button>
          <Disclaimer className="mt-6 justify-center" />
        </div>
      ),
    },
  ];

  const next = useCallback(() => {
    setCurrent((prev) => Math.min(prev + 1, slides.length - 1));
  }, [slides.length]);

  const prev = useCallback(() => {
    setCurrent((p) => Math.max(p - 1, 0));
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [next, prev]);

  const slide = slides[current];
  const SlideIcon = slide.icon;

  return (
    <div className={`animate-fade-in ${fullscreen ? 'fixed inset-0 z-50 bg-slate-900 flex flex-col' : ''}`}>
      {/* Slide container */}
      <div className={`${fullscreen ? 'flex-1' : 'relative'} rounded-2xl overflow-hidden bg-slate-900 border border-slate-700 shadow-xl`}>
        {/* Slide header bar */}
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 py-3 bg-gradient-to-b from-slate-900/90 to-transparent">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-lg ${slide.iconBg} flex items-center justify-center`}>
              <SlideIcon className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{slide.label}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 font-mono">
              {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
            </span>
            <button
              onClick={() => setFullscreen(!fullscreen)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              {fullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Slide content */}
        <div className={`px-6 sm:px-12 ${fullscreen ? 'py-20' : 'pt-16 pb-20'} ${fullscreen ? 'min-h-screen' : 'min-h-[500px]'}`}>
          {slide.title && (
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 mt-4">{slide.title}</h2>
          )}
          <div className="max-w-4xl">
            {slide.render()}
          </div>
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prev}
          disabled={current === 0}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={next}
          disabled={current === slides.length - 1}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800">
          <div
            className="h-full bg-brand-600 transition-all duration-300"
            style={{ width: `${((current + 1) / slides.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Slide dots */}
      {!fullscreen && (
        <div className="flex items-center justify-center gap-2 mt-4">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? 'w-8 bg-brand-600' : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Keyboard hint */}
      {!fullscreen && (
        <p className="text-center text-xs text-slate-400 mt-3">
          Use arrow keys to navigate • Click the expand icon for fullscreen
        </p>
      )}
    </div>
  );
}
