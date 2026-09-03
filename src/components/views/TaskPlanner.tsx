import { useState } from 'react';
import { ListChecks, Sparkles, RotateCcw, Clock, AlertCircle } from 'lucide-react';
import { Card, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Loader } from '@/components/ui/Loader';
import { Disclaimer, FeatureHeader, EmptyState } from '@/components/ui/Shared';
import { CopyButton, Badge } from '@/components/ui/CopyButton';
import { planTasks } from '@/lib/aiEngine';
import type { TaskInput, TaskOutput } from '@/types';

const sampleTasks = `Urgent: Finalize Q3 budget report
Review team performance feedback
Prepare slides for client presentation
Urgent: Respond to compliance audit email
Update project documentation
Optional: Research new productivity tools
Team standup meeting
Review and approve marketing copy
Critical: Fix production deployment issue
Plan next sprint retrospective`;

export function TaskPlanner() {
  const [input, setInput] = useState<TaskInput>({
    tasks: '',
    workHours: '8',
    deadline: 'End of week',
  });
  const [output, setOutput] = useState<TaskOutput | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePlan = async () => {
    if (!input.tasks.trim()) return;
    setLoading(true);
    setOutput(null);
    const result = await planTasks(input);
    setOutput(result);
    setLoading(false);
  };

  const handleReset = () => {
    setOutput(null);
    setInput({ tasks: '', workHours: '8', deadline: 'End of week' });
  };

  const handleLoadSample = () => {
    setInput({ ...input, tasks: sampleTasks });
  };

  const priorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'red';
      case 'Medium': return 'amber';
      case 'Low': return 'slate';
      default: return 'slate';
    }
  };

  const fullOutput = output
    ? `Optimized Schedule:\n${output.schedule.map((s) => `[${s.priority}] ${s.time} — ${s.task}\n  ${s.rationale}`).join('\n\n')}\n\nTips:\n${output.tips.map((t) => `• ${t}`).join('\n')}`
    : '';

  return (
    <div className="animate-fade-in">
      <FeatureHeader
        icon={<ListChecks className="w-6 h-6" />}
        title="AI Task Planner"
        description="Prioritize your to-do list and get an optimized daily schedule with time blocks."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <Card>
          <CardBody>
            <div className="space-y-5">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-slate-700">Your Tasks</label>
                  <button
                    onClick={handleLoadSample}
                    className="text-xs font-medium text-brand-600 hover:text-brand-700 transition-colors"
                  >
                    Load sample tasks
                  </button>
                </div>
                <textarea
                  value={input.tasks}
                  onChange={(e) => setInput({ ...input, tasks: e.target.value })}
                  placeholder="Enter one task per line...&#10;e.g., Urgent: Finalize quarterly report&#10;Review team feedback&#10;Optional: Research new tools"
                  rows={10}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-400 transition-all resize-none scrollbar-thin"
                />
                <p className="text-xs text-slate-400 mt-1.5">
                  Tip: Use keywords like "urgent", "critical", "optional", or "later" to help the AI prioritize.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Work Hours Available</label>
                  <select
                    value={input.workHours}
                    onChange={(e) => setInput({ ...input, workHours: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-400 transition-all"
                  >
                    {['4', '6', '8', '10', '12'].map((h) => (
                      <option key={h} value={h}>{h} hours</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Deadline</label>
                  <select
                    value={input.deadline}
                    onChange={(e) => setInput({ ...input, deadline: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-400 transition-all"
                  >
                    {['Today', 'Tomorrow', 'End of week', 'Next week', 'End of month'].map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button onClick={handlePlan} disabled={!input.tasks.trim() || loading} className="flex-1">
                  <Sparkles className="w-4 h-4" />
                  {loading ? 'Planning...' : 'Plan My Day'}
                </Button>
                {output && (
                  <Button variant="outline" onClick={handleReset}>
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Output */}
        <Card>
          <CardBody>
            {loading && <Loader label="Optimizing your schedule..." />}

            {!loading && !output && (
              <EmptyState
                icon={<ListChecks className="w-7 h-7" />}
                title="Your optimized schedule will appear here"
                description="Enter your tasks, set your available hours, and let AI create a prioritized schedule."
              />
            )}

            {!loading && output && (
              <div className="space-y-5 animate-slide-up">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge color="blue">{output.schedule.length} tasks scheduled</Badge>
                    <Badge color="slate">Deadline: {input.deadline}</Badge>
                  </div>
                  <CopyButton text={fullOutput} />
                </div>

                {/* Schedule */}
                <div className="space-y-3">
                  {output.schedule.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-4 rounded-lg border border-slate-100 hover:border-brand-200 hover:bg-brand-50/30 transition-all"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center text-sm font-bold">
                        {i + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <Badge color={priorityColor(item.priority) as 'red' | 'amber' | 'slate'}>
                            {item.priority}
                          </Badge>
                          <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                            <Clock className="w-3 h-3" />
                            {item.time}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-slate-900">{item.task}</p>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.rationale}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tips */}
                <div className="p-4 bg-brand-50/50 rounded-lg border border-brand-100">
                  <h4 className="text-sm font-semibold text-slate-900 mb-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-brand-600" />
                    Productivity Tips
                  </h4>
                  <ul className="space-y-2">
                    {output.tips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5 flex-shrink-0"></span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                <Disclaimer />
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
