import { useState } from 'react';
import type { View } from '@/types';
import { Sidebar } from '@/components/Sidebar';
import { TopBar } from '@/components/TopBar';
import { Dashboard } from '@/components/views/Dashboard';
import { EmailGenerator } from '@/components/views/EmailGenerator';
import { MeetingSummarizer } from '@/components/views/MeetingSummarizer';
import { TaskPlanner } from '@/components/views/TaskPlanner';
import { ResearchAssistant } from '@/components/views/ResearchAssistant';
import { Chatbot } from '@/components/views/Chatbot';

const viewMeta: Record<View, { title: string; subtitle: string }> = {
  dashboard: { title: 'Dashboard', subtitle: 'Your AI productivity workspace overview' },
  email: { title: 'Smart Email Generator', subtitle: 'Draft professional emails with AI' },
  meeting: { title: 'Meeting Notes Summarizer', subtitle: 'Extract key points and action items' },
  tasks: { title: 'AI Task Planner', subtitle: 'Prioritize and schedule your day' },
  research: { title: 'AI Research Assistant', subtitle: 'Get insights and recommendations' },
  chat: { title: 'AI Chatbot', subtitle: 'Your AI workplace assistant' },
};

export default function App() {
  const [view, setView] = useState<View>('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);

  const meta = viewMeta[view];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar
        current={view}
        onNavigate={setView}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar
          title={meta.title}
          subtitle={meta.subtitle}
          onOpenSidebar={() => setMobileOpen(true)}
        />

        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 overflow-x-hidden">
          <div className="max-w-7xl mx-auto">
            {view === 'dashboard' && <Dashboard onNavigate={setView} />}
            {view === 'email' && <EmailGenerator />}
            {view === 'meeting' && <MeetingSummarizer />}
            {view === 'tasks' && <TaskPlanner />}
            {view === 'research' && <ResearchAssistant />}
            {view === 'chat' && <Chatbot />}
          </div>
        </main>
      </div>
    </div>
  );
}
