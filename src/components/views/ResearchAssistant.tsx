import { useState } from 'react';
import { Search, Sparkles, RotateCcw, Lightbulb, Target, CheckCircle2, TrendingUp } from 'lucide-react';
import { Card, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Loader } from '@/components/ui/Loader';
import { Disclaimer, FeatureHeader, EmptyState } from '@/components/ui/Shared';
import { CopyButton, Badge } from '@/components/ui/CopyButton';
import { researchTopic } from '@/lib/aiEngine';
import type { ResearchInput, ResearchOutput } from '@/types';

const depths = ['Brief', 'Standard', 'Comprehensive'];

export function ResearchAssistant() {
  const [input, setInput] = useState<ResearchInput>({ topic: '', depth: 'Standard' });
  const [output, setOutput] = useState<ResearchOutput | null>(null);
  const [loading, setLoading] = useState(false);

  const handleResearch = async () => {
    if (!input.topic.trim()) return;
    setLoading(true);
    setOutput(null);
    const result = await researchTopic(input);
    setOutput(result);
    setLoading(false);
  };

  const handleReset = () => {
    setOutput(null);
    setInput({ topic: '', depth: 'Standard' });
  };

  const fullOutput = output
    ? `Overview:\n${output.overview}\n\nInsights:\n${output.insights.map((i) => `• ${i.title}: ${i.detail}`).join('\n\n')}\n\nKey Findings:\n${output.keyFindings.map((f) => `• ${f}`).join('\n')}\n\nRecommendations:\n${output.recommendations.map((r) => `• ${r}`).join('\n')}`
    : '';

  return (
    <div className="animate-fade-in">
      <FeatureHeader
        icon={<Search className="w-6 h-6" />}
        title="AI Research Assistant"
        description="Get structured insights, key findings, and actionable recommendations on any topic."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <Card>
          <CardBody>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Research Topic</label>
                <textarea
                  value={input.topic}
                  onChange={(e) => setInput({ ...input, topic: e.target.value })}
                  placeholder="e.g., The impact of AI on workplace productivity in 2026"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-400 transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Research Depth</label>
                <div className="flex gap-2">
                  {depths.map((d) => (
                    <button
                      key={d}
                      onClick={() => setInput({ ...input, depth: d })}
                      className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        input.depth === d
                          ? 'bg-brand-600 text-white shadow-sm'
                          : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button onClick={handleResearch} disabled={!input.topic.trim() || loading} className="flex-1">
                  <Sparkles className="w-4 h-4" />
                  {loading ? 'Researching...' : 'Research Topic'}
                </Button>
                {output && (
                  <Button variant="outline" onClick={handleReset}>
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                )}
              </div>

              <div className="p-4 bg-amber-50/50 rounded-lg border border-amber-100">
                <p className="text-xs text-amber-700 leading-relaxed">
                  <strong>Note:</strong> This is an AI-generated research overview based on general knowledge patterns. For critical decisions, verify findings with authoritative sources.
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Output */}
        <Card>
          <CardBody className="overflow-y-auto max-h-[700px] scrollbar-thin">
            {loading && <Loader label="Researching your topic..." />}

            {!loading && !output && (
              <EmptyState
                icon={<Search className="w-7 h-7" />}
                title="Research insights will appear here"
                description="Enter a topic and click Research to get an overview, insights, findings, and recommendations."
              />
            )}

            {!loading && output && (
              <div className="space-y-5 animate-slide-up">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge color="blue">{input.depth} Analysis</Badge>
                  </div>
                  <CopyButton text={fullOutput} />
                </div>

                {/* Overview */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-2">Overview</h4>
                  <p className="text-sm text-slate-600 leading-relaxed p-3 bg-slate-50 rounded-lg border border-slate-100">
                    {output.overview}
                  </p>
                </div>

                {/* Insights */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-brand-600" />
                    Key Insights
                  </h4>
                  <div className="space-y-3">
                    {output.insights.map((insight, i) => (
                      <div key={i} className="p-4 rounded-lg border border-slate-100 hover:border-brand-200 transition-all">
                        <p className="text-sm font-semibold text-slate-900 mb-1">{insight.title}</p>
                        <p className="text-sm text-slate-600 leading-relaxed">{insight.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Findings */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-600" />
                    Key Findings
                  </h4>
                  <ul className="space-y-2">
                    {output.keyFindings.map((finding, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5 flex-shrink-0"></span>
                        {finding}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommendations */}
                <div className="p-4 bg-brand-50/50 rounded-lg border border-brand-100">
                  <h4 className="text-sm font-semibold text-slate-900 mb-2 flex items-center gap-2">
                    <Target className="w-4 h-4 text-brand-600" />
                    Recommendations
                  </h4>
                  <ul className="space-y-2">
                    {output.recommendations.map((rec, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                        <TrendingUp className="w-3.5 h-3.5 text-brand-600 mt-1 flex-shrink-0" />
                        {rec}
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
