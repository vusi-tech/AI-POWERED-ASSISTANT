import { useState } from 'react';
import { Mail, Send, RotateCcw } from 'lucide-react';
import { Card, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Loader } from '@/components/ui/Loader';
import { Disclaimer, FeatureHeader, EmptyState } from '@/components/ui/Shared';
import { CopyButton, Badge } from '@/components/ui/CopyButton';
import { generateEmail } from '@/lib/aiEngine';
import type { EmailInput, EmailOutput } from '@/types';

const tones = ['Professional', 'Friendly', 'Formal', 'Casual', 'Persuasive', 'Empathetic'];
const audiences = ['Client', 'Internal Team', 'Manager', 'General'];
const purposes = ['Request a meeting', 'Follow up', 'Share an update', 'Make an introduction', 'Send a proposal', 'Express appreciation'];
const lengths = ['Short', 'Medium', 'Long'];

export function EmailGenerator() {
  const [input, setInput] = useState<EmailInput>({
    topic: '',
    tone: 'Professional',
    audience: 'Client',
    length: 'Medium',
    purpose: 'Request a meeting',
  });
  const [output, setOutput] = useState<EmailOutput | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!input.topic.trim()) return;
    setLoading(true);
    setOutput(null);
    const result = await generateEmail(input);
    setOutput(result);
    setLoading(false);
  };

  const handleReset = () => {
    setOutput(null);
    setInput({ topic: '', tone: 'Professional', audience: 'Client', length: 'Medium', purpose: 'Request a meeting' });
  };

  return (
    <div className="animate-fade-in">
      <FeatureHeader
        icon={<Mail className="w-6 h-6" />}
        title="Smart Email Generator"
        description="Draft professional emails tailored to your audience, tone, and purpose."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <Card>
          <CardBody>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email Topic</label>
                <textarea
                  value={input.topic}
                  onChange={(e) => setInput({ ...input, topic: e.target.value })}
                  placeholder="e.g., Q3 product roadmap review with the engineering team"
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-400 transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Purpose</label>
                <div className="flex flex-wrap gap-2">
                  {purposes.map((p) => (
                    <button
                      key={p}
                      onClick={() => setInput({ ...input, purpose: p })}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        input.purpose === p
                          ? 'bg-brand-600 text-white shadow-sm'
                          : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Tone</label>
                <div className="flex flex-wrap gap-2">
                  {tones.map((t) => (
                    <button
                      key={t}
                      onClick={() => setInput({ ...input, tone: t })}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        input.tone === t
                          ? 'bg-brand-600 text-white shadow-sm'
                          : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Audience</label>
                  <select
                    value={input.audience}
                    onChange={(e) => setInput({ ...input, audience: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-400 transition-all"
                  >
                    {audiences.map((a) => (
                      <option key={a} value={a}>{a}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Length</label>
                  <select
                    value={input.length}
                    onChange={(e) => setInput({ ...input, length: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-400 transition-all"
                  >
                    {lengths.map((l) => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button onClick={handleGenerate} disabled={!input.topic.trim() || loading} className="flex-1">
                  <Send className="w-4 h-4" />
                  {loading ? 'Generating...' : 'Generate Email'}
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

        {/* Output Panel */}
        <Card>
          <CardBody>
            {loading && <Loader label="Crafting your email..." />}

            {!loading && !output && (
              <EmptyState
                icon={<Mail className="w-7 h-7" />}
                title="Your email will appear here"
                description="Fill in the details on the left and click Generate to create a professional email draft."
              />
            )}

            {!loading && output && (
              <div className="space-y-5 animate-slide-up">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge color="blue">{input.tone}</Badge>
                    <Badge color="slate">{input.audience}</Badge>
                    <Badge color="slate">{input.length}</Badge>
                  </div>
                  <CopyButton text={`Subject: ${output.subject}\n\n${output.body}`} />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Subject Line</label>
                  <p className="text-sm font-semibold text-slate-900 mt-1 p-3 bg-slate-50 rounded-lg border border-slate-100">
                    {output.subject}
                  </p>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Body</label>
                  <div className="mt-1 p-4 bg-slate-50 rounded-lg border border-slate-100">
                    <pre className="text-sm text-slate-700 whitespace-pre-wrap font-sans leading-relaxed">{output.body}</pre>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Tips</label>
                  <ul className="mt-2 space-y-2">
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
