import type {
  EmailInput,
  EmailOutput,
  MeetingInput,
  MeetingOutput,
  TaskInput,
  TaskOutput,
  ResearchInput,
  ResearchOutput,
} from '@/types';

// Simulated AI engine that uses structured prompt engineering patterns
// to generate professional, clear outputs for each feature.

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function pickToneAdjectives(tone: string): string {
  const map: Record<string, string> = {
    Professional: 'polished, respectful, and business-appropriate',
    Friendly: 'warm, approachable, and conversational',
    Formal: 'highly formal, structured, and authoritative',
    Casual: 'relaxed, natural, and easygoing',
    Persuasive: 'compelling, confident, and action-oriented',
    Empathetic: 'understanding, considerate, and supportive',
  };
  return map[tone] || map['Professional'];
}

function pickLengthGuidance(length: string): string {
  const map: Record<string, string> = {
    Short: '2-3 concise paragraphs, no more than 150 words',
    Medium: '3-4 well-structured paragraphs, 150-300 words',
    Long: '5+ detailed paragraphs, 300-500 words with elaboration',
  };
  return map[length] || map['Medium'];
}

export async function generateEmail(input: EmailInput): Promise<EmailOutput> {
  await delay(1200 + Math.random() * 800);
  const toneAdj = pickToneAdjectives(input.tone);
  const lengthGuide = pickLengthGuidance(input.length);

  const subject = buildEmailSubject(input);
  const body = buildEmailBody(input, toneAdj, lengthGuide);
  const tips = buildEmailTips(input);

  return { subject, body, tips };
}

function buildEmailSubject(input: EmailInput): string {
  const topic = input.topic || 'Your Project Update';
  const purposeMap: Record<string, string> = {
    'Request a meeting': `Request for Meeting: ${topic}`,
    'Follow up': `Follow-Up: ${topic}`,
    'Share an update': `Update: ${topic}`,
    'Make an introduction': `Introduction: ${topic}`,
    'Send a proposal': `Proposal: ${topic}`,
    'Express appreciation': `Thank You: ${topic}`,
  };
  return purposeMap[input.purpose] || `Regarding: ${topic}`;
}

function buildEmailBody(input: EmailInput, toneAdj: string, lengthGuide: string): string {
  const greeting = input.audience === 'Internal Team'
    ? 'Hi Team,'
    : input.audience === 'Client'
    ? 'Dear Client,'
    : input.audience === 'Manager'
    ? 'Dear [Manager Name],'
    : 'Hello,';

  const purposeMap: Record<string, string> = {
    'Request a meeting': `I hope this message finds you well. I'd like to schedule a meeting to discuss ${input.topic || 'an important matter'} at your earliest convenience. I believe a brief discussion would help us align on next steps and ensure everyone is on the same page.`,
    'Follow up': `I hope you're doing well. I wanted to follow up on ${input.topic || 'our previous conversation'} to check if there are any updates or if you need any additional information from my end. Please let me know how I can support moving forward.`,
    'Share an update': `I wanted to share a quick update on ${input.topic || 'our current initiative'}. We've made solid progress and I wanted to keep you informed. Below is a summary of where things stand and what's coming next.`,
    'Make an introduction': `I'd like to introduce you to ${input.topic || 'a key contact'} who I believe would be a valuable connection. I think there's strong potential for collaboration, and I'm happy to facilitate an initial conversation at your convenience.`,
    'Send a proposal': `Please find below a proposal regarding ${input.topic || 'the project we discussed'}. I've outlined the scope, approach, and expected outcomes. I welcome your feedback and am ready to refine any areas based on your input.`,
    'Express appreciation': `I wanted to take a moment to express my sincere appreciation for ${input.topic || 'your recent support'}. Your contribution made a meaningful difference, and I'm grateful for the effort and dedication you brought to this.`,
  };

  const core = purposeMap[input.purpose] || `I'm writing to you regarding ${input.topic || 'an important matter'}.`;
  const closing = input.tone === 'Formal'
    ? 'I look forward to your response at your earliest convenience.'
    : input.tone === 'Casual'
    ? 'Let me know what you think!'
    : 'I look forward to hearing from you.';

  return `${greeting}\n\n${core}\n\n${closing}\n\nBest regards,\n[Your Name]`;
}

function buildEmailTips(input: EmailInput): string[] {
  const tips = [
    `Keep the tone ${pickToneAdjectives(input.tone)} throughout.`,
    `Address your ${input.audience.toLowerCase()} directly and acknowledge their perspective.`,
    `Proofread for clarity and conciseness before sending.`,
  ];
  if (input.purpose === 'Request a meeting') {
    tips.push('Include 2-3 proposed time slots to make scheduling effortless.');
  }
  if (input.purpose === 'Send a proposal') {
    tips.push('Attach supporting documents and reference any prior discussions.');
  }
  if (input.tone === 'Persuasive') {
    tips.push('End with a clear, specific call-to-action that drives a response.');
  }
  return tips;
}

// ── Meeting Notes Summarizer ──────────────────────────────────────────

export async function summarizeMeeting(input: MeetingInput): Promise<MeetingOutput> {
  await delay(1200 + Math.random() * 800);
  const notes = input.notes || '';
  const lines = notes.split('\n').map((l) => l.trim()).filter(Boolean);

  const summary = `This meeting covered ${lines.length || 'several'} discussion points. The primary focus was on aligning stakeholders, identifying action items, and setting clear deadlines for follow-up. Key decisions were documented and responsibilities assigned.`;

  const keyPoints = extractKeyPoints(lines);
  const actionItems = extractActionItems(lines);
  const decisions = extractDecisions(lines);

  return { summary, keyPoints, actionItems, decisions };
}

function extractKeyPoints(lines: string[]): string[] {
  const points: string[] = [];
  for (const line of lines) {
    const lower = line.toLowerCase();
    if (
      lower.startsWith('-') ||
      lower.startsWith('*') ||
      lower.startsWith('•') ||
      /^\d+\./.test(lower) ||
      lower.includes('discussed') ||
      lower.includes('reviewed') ||
      lower.includes('presented')
    ) {
      const cleaned = line.replace(/^[-*•]\s*/, '').replace(/^\d+\.\s*/, '');
      if (cleaned.length > 5) points.push(cleaned);
    }
  }
  if (points.length === 0 && lines.length > 0) {
    return lines.slice(0, 5).map((l) => l.replace(/^[-*•]\s*/, ''));
  }
  return points.slice(0, 8);
}

function extractActionItems(lines: string[]): { task: string; owner: string; deadline: string }[] {
  const items: { task: string; owner: string; deadline: string }[] = [];
  for (const line of lines) {
    const lower = line.toLowerCase();
    if (
      lower.includes('action') ||
      lower.includes('todo') ||
      lower.includes('follow up') ||
      lower.includes('assign') ||
      lower.includes('responsible') ||
      lower.includes('by ')
    ) {
      const cleaned = line.replace(/^[-*•]\s*/, '').replace(/^\d+\.\s*/, '');
      const ownerMatch = cleaned.match(/(?:by|owner:|assigned to)\s+([A-Z][a-z]+)/);
      const deadlineMatch = cleaned.match(/by\s+(monday|tuesday|wednesday|thursday|friday|next week|eod|tomorrow|end of week)/i);
      items.push({
        task: cleaned,
        owner: ownerMatch ? ownerMatch[1] : 'Unassigned',
        deadline: deadlineMatch ? deadlineMatch[1] : 'This week',
      });
    }
  }
  if (items.length === 0) {
    return [
      { task: 'Review meeting notes and confirm understanding', owner: 'All attendees', deadline: 'This week' },
      { task: 'Follow up on open discussion items', owner: 'Meeting organizer', deadline: 'Next meeting' },
    ];
  }
  return items.slice(0, 6);
}

function extractDecisions(lines: string[]): string[] {
  const decisions: string[] = [];
  for (const line of lines) {
    const lower = line.toLowerCase();
    if (lower.includes('decided') || lower.includes('agreed') || lower.includes('approved') || lower.includes('confirmed')) {
      const cleaned = line.replace(/^[-*•]\s*/, '').replace(/^\d+\.\s*/, '');
      decisions.push(cleaned);
    }
  }
  if (decisions.length === 0) {
    return ['Proceed with the discussed approach and revisit at the next checkpoint.'];
  }
  return decisions.slice(0, 5);
}

// ── AI Task Planner ────────────────────────────────────────────────────

export async function planTasks(input: TaskInput): Promise<TaskOutput> {
  await delay(1200 + Math.random() * 800);
  const rawTasks = input.tasks.split('\n').map((t) => t.trim()).filter(Boolean);
  const workHours = parseInt(input.workHours) || 8;
  const deadline = input.deadline || 'End of week';

  const prioritized = prioritizeTasks(rawTasks);
  const schedule = buildSchedule(prioritized, workHours, deadline);
  const tips = buildTaskTips(prioritized, deadline);

  return { schedule, tips };
}

function prioritizeTasks(tasks: string[]): { text: string; priority: 'High' | 'Medium' | 'Low' }[] {
  return tasks.map((task) => {
    const lower = task.toLowerCase();
    let priority: 'High' | 'Medium' | 'Low' = 'Medium';
    if (lower.includes('urgent') || lower.includes('asap') || lower.includes('critical') || lower.includes('deadline') || lower.includes('important')) {
      priority = 'High';
    } else if (lower.includes('review') || lower.includes('optional') || lower.includes('later') || lower.includes('someday')) {
      priority = 'Low';
    }
    return { text: task, priority };
  }).sort((a, b) => {
    const order = { High: 0, Medium: 1, Low: 2 };
    return order[a.priority] - order[b.priority];
  });
}

function buildSchedule(
  tasks: { text: string; priority: string }[],
  workHours: number,
  deadline: string
): { priority: string; task: string; time: string; rationale: string }[] {
  const slotDuration = Math.max(1, Math.floor((workHours * 60) / Math.max(tasks.length, 1)));
  const rationaleMap: Record<string, string> = {
    High: 'Tackled first when energy and focus are at their peak — highest impact with deadline pressure.',
    Medium: 'Scheduled mid-day after critical items are cleared — maintains steady momentum.',
    Low: 'Batched in the afternoon — important but flexible, can shift if higher-priority work arises.',
  };

  let currentTime = 9; // 9 AM start
  return tasks.slice(0, 10).map((task) => {
    const hour = Math.floor(currentTime);
    const minute = Math.round((currentTime - hour) * 60);
    const timeStr = `${hour % 12 || 12}:${minute.toString().padStart(2, '0')} ${hour >= 12 ? 'PM' : 'AM'}`;
    const end = currentTime + slotDuration / 60;
    const endHour = Math.floor(end);
    const endMinute = Math.round((end - endHour) * 60);
    const endStr = `${endHour % 12 || 12}:${endMinute.toString().padStart(2, '0')} ${endHour >= 12 ? 'PM' : 'AM'}`;
    currentTime = end;
    return {
      priority: task.priority,
      task: task.text.replace(/^[-*•\d.\s]+/, ''),
      time: `${timeStr} – ${endStr}`,
      rationale: rationaleMap[task.priority] || rationaleMap['Medium'],
    };
  });
}

function buildTaskTips(tasks: { priority: string }[], deadline: string): string[] {
  const highCount = tasks.filter((t) => t.priority === 'High').length;
  const tips = [
    `You have ${highCount} high-priority task(s) — complete them before ${deadline}.`,
    'Group similar tasks together to reduce context-switching overhead.',
    'Block calendar time for deep work and protect it from interruptions.',
  ];
  if (highCount > 3) {
    tips.push('Consider delegating or deferring some high-priority items to avoid burnout.');
  }
  tips.push('Review your schedule at the end of each day and adjust for the next.');
  return tips;
}

// ── AI Research Assistant ─────────────────────────────────────────────

export async function researchTopic(input: ResearchInput): Promise<ResearchOutput> {
  await delay(1500 + Math.random() * 1000);
  const topic = input.topic || 'the requested topic';
  const depth = input.depth;

  const overview = `This research overview examines ${topic} at a ${depth.toLowerCase()} level. The analysis synthesizes key themes, identifies notable patterns, and provides actionable recommendations. This summary is designed to give you a well-rounded understanding without requiring you to read multiple sources independently.`;

  const insights = [
    {
      title: 'Current Landscape',
      detail: `${topic} is an evolving area with active development across multiple sectors. Organizations are investing in capabilities that improve efficiency, reduce costs, and create competitive advantage. Understanding the current state helps contextualize where opportunities lie.`,
    },
    {
      title: 'Key Trends',
      detail: `Several trends are shaping the future of ${topic}. These include increased adoption of data-driven approaches, growing emphasis on automation, and a shift toward more integrated, user-centric solutions. Staying ahead of these trends can provide a strategic edge.`,
    },
    {
      title: 'Challenges & Risks',
      detail: `Despite the promise, ${topic} presents challenges including implementation complexity, resource constraints, and the need for ongoing skill development. A phased approach with clear milestones can mitigate these risks effectively.`,
    },
    {
      title: 'Opportunities',
      detail: `There are significant opportunities for early movers in ${topic}. Organizations that invest now in foundational capabilities will be well-positioned to scale quickly and capture market share as the space matures.`,
    },
  ];

  const keyFindings = [
    `${topic} is gaining momentum across industries with measurable ROI.`,
    'Organizations that adopt early see compounding benefits over time.',
    'A structured, phased implementation reduces risk and improves outcomes.',
    'Cross-functional collaboration is critical to successful adoption.',
    'Continuous learning and adaptation are essential as the field evolves.',
  ];

  const recommendations = [
    `Start with a pilot project focused on a specific, measurable use case within ${topic}.`,
    'Invest in team training and upskilling to build internal capability.',
    'Establish clear KPIs and review them monthly to track progress.',
    'Engage stakeholders early to ensure alignment and smooth adoption.',
    'Document lessons learned and iterate on your approach regularly.',
  ];

  return { overview, insights, keyFindings, recommendations };
}

// ── AI Chatbot ─────────────────────────────────────────────────────────

export async function generateChatResponse(userMessage: string): Promise<string> {
  await delay(800 + Math.random() * 700);
  const msg = userMessage.toLowerCase().trim();

  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
    return "Hello! I'm BUILD IT IA, your AI workplace productivity assistant. I can help you draft emails, summarize meeting notes, plan your tasks, research topics, or answer work-related questions. What would you like to work on today?";
  }

  if (msg.includes('email')) {
    return "I can help you craft professional emails! Head over to the Smart Email Generator where you can specify your topic, tone, audience, and purpose. I'll generate a polished draft you can refine. What kind of email are you looking to write?";
  }

  if (msg.includes('meeting') || msg.includes('notes') || msg.includes('summarize')) {
    return "The Meeting Notes Summarizer can transform your raw meeting notes into structured summaries with key points, action items, and decisions. Just paste your notes into the tool and I'll organize them for you. Would you like to try it?";
  }

  if (msg.includes('task') || msg.includes('schedule') || msg.includes('plan')) {
    return "The AI Task Planner can help you prioritize and schedule your workday. Enter your tasks, available work hours, and deadline — I'll create an optimized schedule with time blocks and priority levels. What tasks are you juggling today?";
  }

  if (msg.includes('research') || msg.includes('insight') || msg.includes('summary of')) {
    return "The AI Research Assistant provides structured insights on any topic. You'll get an overview, key trends, findings, and actionable recommendations. What topic would you like me to research?";
  }

  if (msg.includes('help') || msg.includes('what can you do')) {
    return "I'm BUILD IT IA — here's what I can do:\n\n• Smart Email Generator — draft professional emails with the right tone and audience\n• Meeting Notes Summarizer — turn raw notes into structured summaries\n• AI Task Planner — prioritize and schedule your tasks\n• AI Research Assistant — get insights and recommendations on any topic\n• AI Chatbot — ask me anything work-related\n\nWhich feature would you like to explore?";
  }

  if (msg.includes('thank')) {
    return "You're welcome! I'm always here to help you work smarter. Is there anything else you'd like assistance with?";
  }

  if (msg.includes('productivity') || msg.includes('tip')) {
    return "Here are a few productivity tips:\n\n1. Start your day with your highest-priority task when your energy is at its peak.\n2. Use time-blocking to protect deep work from interruptions.\n3. Batch similar tasks together to reduce context-switching.\n4. Take short breaks every 90 minutes to maintain focus.\n5. End each day by reviewing what you accomplished and planning tomorrow.\n\nWould you like me to help you plan your day with the AI Task Planner?";
  }

  // Generic professional response
  return `That's a great question. Based on what you've shared, here's my perspective:\n\n${capitalizeFirst(userMessage)} — this is an area where a structured approach can help. I'd recommend breaking it down into smaller, actionable steps and tackling them in priority order.\n\nWould you like me to help you with this using one of the specialized tools? I can draft an email, summarize notes, plan tasks, or research this topic in more depth.`;
}

function capitalizeFirst(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
