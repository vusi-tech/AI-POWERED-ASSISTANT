import { useState } from 'react';
import { FileText, Sparkles, RotateCcw, CheckSquare, Calendar, Gavel } from 'lucide-react';
import { Card, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Loader } from '@/components/ui/Loader';
import { Disclaimer, FeatureHeader, EmptyState } from '@/components/ui/Shared';
import { CopyButton, Badge } from '@/components/ui/CopyButton';
import { summarizeMeeting } from '@/lib/aiEngine';
import type { MeetingInput, MeetingOutput } from '@/types';

const sampleNotes = `- Discussed Q3 product roadmap and key milestones
- Reviewed budget allocation for marketing initiatives
- Action item: Sarah to finalize design mockups by Friday
- Action item: Mike to send client proposal by next Tuesday
- Decided to launch the beta feature in October
- Reviewed customer feedback from the latest survey
- Action item: Tom to schedule follow-up meeting with stakeholders by next week
- Agreed to increase engineering headcount by 2 FTEs
- Discussed potential partnership with Acme Corp
- Confirmed Q3 OKRs are on track`;

export function MeetingSummarizer() {
  const [input, setInput] = useState<MeetingInput>({ notes: '', format: 'Structured' });
  const [output, setOutput] = useState<MeetingOutput | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!input.notes.trim()) return;
    setLoading(true);
    setOutput(null);
    const result = await summarizeMeeting(input);
    setOutput(result);
    setLoading(false);
  };

  const handleReset = () => {
    setOutput(null);
    setInput({ notes: '', format: 'Structured' });
  };

  const handleLoadSample = () => {
    setInput({ ...input, notes: sampleNotes });
  };

  const fullOutput = output
    ? `Summary:\n${output.summary}\n\nKey Points:\n${output.keyPoints.map((p) => `• ${p}`).join('\n')}\n\nAction Items:\n${output.actionItems.map((a) => `• ${a.task} (Owner: ${a.owner}, Deadline: ${a.deadline})`).join('\n')}\n\nDecisions:\n${output.decisions.map((d) => `• ${d}`).join('\n')}`
    : '';

  return (
    <div className="animate-fade-in">
      <FeatureHeader
        icon={<FileText className="w-6 h-6" />}
        title="Meeting Notes Summarizer"
        description="Turn raw meeting notes into structured summaries with key points, action items, and decisions."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <Card>
          <CardBody>
            <div className="space-y-5">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-slate-700">Meeting Notes</label>
                  <button
                    onClick={handleLoadSample}
                    className="text-xs font-medium text-brand-600 hover:text-brand-700 transition-colors"
                  >
                    Load sample notes
                  </button>
                </div>
                <textarea
                  value={input.notes}
                  onChange={(e) => setInput({ ...input, notes: e.target.value })}
                  placeholder="Paste your raw meeting notes here...&#10;e.g., Discussed Q3 roadmap&#10;Action item: Sarah to send report by Friday&#10;Decided to launch in October"
                  rows={12}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-400 transition-all resize-none scrollbar-thin font-mono"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button onClick={handleSummarize} disabled={!input.notes.trim() || loading} className="flex-1">
                  <Sparkles className="w-4 h-4" />
                  {loading ? 'Summarizing...' : 'Summarize Notes'}
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
            {loading && <Loader label="Analyzing your meeting notes..." />}

            {!loading && !output && (
              <EmptyState
                icon={<FileText className="w-7 h-7" />}
                title="Structured summary will appear here"
                description="Paste your meeting notes and click Summarize to get key points, action items, and decisions."
              />
            )}

            {!loading && output && (
              <div className="space-y-5 animate-slide-up">
                <div className="flex items-center justify-between">
                  <Badge color="green">Summary Ready</Badge>
                  <CopyButton text={fullOutput} />
                </div>

                {/* Summary */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-2">Overview</h4>
                  <p className="text-sm text-slate-600 leading-relaxed p-3 bg-slate-50 rounded-lg border border-slate-100">
                    {output.summary}
                  </p>
                </div>

                {/* Key Points */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-2 flex items-center gap-2">
                    <CheckSquare className="w-4 h-4 text-brand-600" />
                    Key Points
                  </h4>
                  <ul className="space-y-2">
                    {output.keyPoints.map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5 flex-shrink-0"></span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Items */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-brand-600" />
                    Action Items
                  </h4>
                  <div className="space-y-2">
                    {output.actionItems.map((item, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 bg-brand-50/50 rounded-lg border border-brand-100">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-slate-700">{item.task}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-xs text-slate-500">Owner: <strong className="text-slate-700">{item.owner}</strong></span>
                            <span className="text-xs text-slate-500">Deadline: <strong className="text-brand-700">{item.deadline}</strong></span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Decisions */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-2 flex items-center gap-2">
                    <Gavel className="w-4 h-4 text-brand-600" />
                    Decisions
                  </h4>
                  <ul className="space-y-2">
                    {output.decisions.map((decision, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0"></span>
                        {decision}
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
