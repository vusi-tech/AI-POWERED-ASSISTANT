import pptxgenjs from 'pptxgenjs';

const BRAND_BLUE = '2563EB';
const LIGHT_BLUE = 'DBEAFE';
const DARK_BG = '0F172A';
const DARK_SLATE = '1E293B';
const WHITE = 'FFFFFF';
const SLATE_400 = '94A3B8';
const SLATE_300 = 'CBD5E1';
const AMBER = 'F59E0B';

export async function downloadPresentation() {
  const pptx = new pptxgenjs();
  pptx.defineLayout({ name: 'WIDE', width: 13.333, height: 7.5 });
  pptx.layout = 'WIDE';
  pptx.author = 'BUILD IT IA';
  pptx.title = 'BUILD IT IA — How We Built It';

  const titleFont = { fontFace: 'Arial', bold: true };
  const bodyFont = { fontFace: 'Arial' };

  const addDarkSlide = () => {
    const slide = pptx.addSlide();
    slide.background = { color: DARK_BG };
    return slide;
  };

  // ── Slide 1: Title ────────────────────────────────────────────────
  {
    const slide = addDarkSlide();
    slide.addText('BUILD IT IA', {
      x: 0.5, y: 2.2, w: 12.3, h: 1.2,
      fontSize: 54, fontFace: 'Arial', bold: true, color: WHITE, align: 'center',
    });
    slide.addText('AI Workplace Productivity Assistant', {
      x: 0.5, y: 3.4, w: 12.3, h: 0.6,
      fontSize: 24, ...bodyFont, color: LIGHT_BLUE, align: 'center',
    });
    slide.addText('Presentation — How We Built It', {
      x: 0.5, y: 5.5, w: 12.3, h: 0.5,
      fontSize: 14, ...bodyFont, color: SLATE_400, align: 'center',
    });
    slide.addShape('roundRect', {
      x: 4.5, y: 1.0, w: 4.3, h: 0.5, fill: { color: BRAND_BLUE },
    });
    slide.addText('AI-POWERED PRODUCTIVITY', {
      x: 4.5, y: 1.0, w: 4.3, h: 0.5,
      fontSize: 12, ...bodyFont, color: WHITE, align: 'center', valign: 'middle',
    });
  }

  // ── Slide 2: The Original Prompt ─────────────────────────────────
  {
    const slide = addDarkSlide();
    slide.addText('The Original Prompt', { x: 0.6, y: 0.4, w: 12, h: 0.7, fontSize: 32, ...titleFont, color: WHITE });
    slide.addText(
      'We were asked to build a modern, responsive AI Workplace Productivity Assistant that helps professionals automate daily work tasks using AI — with a clean SaaS dashboard, sidebar navigation, and interactive components.',
      { x: 0.6, y: 1.3, w: 12, h: 0.9, fontSize: 14, ...bodyFont, color: SLATE_300, lineSpacingMultiple: 1.4 }
    );

    slide.addText('Core Features Requested', {
      x: 0.6, y: 2.5, w: 5.8, h: 0.4, fontSize: 14, ...titleFont, color: LIGHT_BLUE,
    });
    const features = [
      'Smart Email Generator (tone + audience)',
      'Meeting Notes Summarizer',
      'AI Task Planner',
      'AI Research Assistant',
      'AI Chatbot Interface',
    ];
    features.forEach((f, i) => {
      slide.addText(`•  ${f}`, {
        x: 0.8, y: 3.0 + i * 0.45, w: 5.5, h: 0.4, fontSize: 12, ...bodyFont, color: SLATE_300,
      });
    });

    slide.addText('Design Requirements', {
      x: 7.0, y: 2.5, w: 5.5, h: 0.4, fontSize: 14, ...titleFont, color: LIGHT_BLUE,
    });
    const designReqs = [
      'Modern SaaS UI — clean & minimal',
      'Sidebar navigation + card layout',
      'Loading states & responsive design',
      'AI disclaimer on all outputs',
      'Colors: Blue, White & Black',
    ];
    designReqs.forEach((d, i) => {
      slide.addText(`•  ${d}`, {
        x: 7.2, y: 3.0 + i * 0.45, w: 5.3, h: 0.4, fontSize: 12, ...bodyFont, color: SLATE_300,
      });
    });
  }

  // ── Slide 3: The Problem ───────────────────────────────────────────
  {
    const slide = addDarkSlide();
    slide.addText('The Problem We Are Solving', { x: 0.6, y: 0.4, w: 12, h: 0.7, fontSize: 32, ...titleFont, color: WHITE });
    slide.addText(
      'Professionals spend hours every day on repetitive tasks — drafting emails, summarizing meetings, planning schedules, and researching topics. This is time that could be spent on higher-value work.',
      { x: 0.6, y: 1.3, w: 12, h: 0.9, fontSize: 14, ...bodyFont, color: SLATE_300, lineSpacingMultiple: 1.4 }
    );

    const stats = [
      { stat: '2.5 hrs', label: 'Daily time spent on email' },
      { stat: '31%', label: 'Of meetings feel unproductive' },
      { stat: '4.3 hrs', label: 'Weekly on research & summaries' },
    ];
    stats.forEach((s, i) => {
      const x = 0.6 + i * 4.1;
      slide.addShape('roundRect', { x, y: 2.6, w: 3.7, h: 1.6, fill: { color: DARK_SLATE } });
      slide.addText(s.stat, { x, y: 2.75, w: 3.7, h: 0.6, fontSize: 32, ...titleFont, color: WHITE, align: 'center' });
      slide.addText(s.label, { x, y: 3.4, w: 3.7, h: 0.5, fontSize: 12, ...bodyFont, color: SLATE_400, align: 'center' });
    });

    slide.addText(
      'The goal: Build a single AI-powered workspace that automates these daily tasks — producing professional, ready-to-review output in seconds, not hours.',
      { x: 0.6, y: 4.6, w: 12, h: 0.8, fontSize: 14, ...bodyFont, color: LIGHT_BLUE, bold: true, lineSpacingMultiple: 1.3 }
    );
  }

  // ── Slide 4: Architecture ─────────────────────────────────────────
  {
    const slide = addDarkSlide();
    slide.addText('How We Designed It', { x: 0.6, y: 0.4, w: 12, h: 0.7, fontSize: 32, ...titleFont, color: WHITE });
    slide.addText(
      'We chose a component-driven architecture with React, TypeScript, and Tailwind CSS — separating the AI logic from the UI for maintainability and scalability.',
      { x: 0.6, y: 1.3, w: 12, h: 0.8, fontSize: 14, ...bodyFont, color: SLATE_300, lineSpacingMultiple: 1.4 }
    );

    slide.addText('Tech Stack', { x: 0.6, y: 2.4, w: 5.8, h: 0.4, fontSize: 14, ...titleFont, color: LIGHT_BLUE });
    const stack = [
      'React 18 + TypeScript — type-safe components',
      'Vite — fast build & dev tooling',
      'Tailwind CSS — utility-first styling',
      'Lucide React — consistent icon set',
      'Supabase — backend for data persistence',
    ];
    stack.forEach((s, i) => {
      slide.addText(`•  ${s}`, { x: 0.8, y: 2.9 + i * 0.45, w: 5.5, h: 0.4, fontSize: 12, ...bodyFont, color: SLATE_300 });
    });

    slide.addText('Project Structure', { x: 7.0, y: 2.4, w: 5.5, h: 0.4, fontSize: 14, ...titleFont, color: LIGHT_BLUE });
    slide.addText(
      'src/\n  ├── App.tsx — view routing\n  ├── types.ts — shared types\n  ├── lib/aiEngine.ts — AI logic\n  ├── components/\n  │     ├── ui/ — reusable components\n  │     └── views/ — feature pages',
      { x: 7.2, y: 2.9, w: 5.3, h: 2.8, fontSize: 11, fontFace: 'Courier New', color: SLATE_300, lineSpacingMultiple: 1.3 }
    );
  }

  // ── Slide 5: AI Engine ─────────────────────────────────────────────
  {
    const slide = addDarkSlide();
    slide.addText('The AI Engine — Structured Prompt Engineering', {
      x: 0.6, y: 0.4, w: 12, h: 0.7, fontSize: 28, ...titleFont, color: WHITE,
    });
    slide.addText(
      'Each feature uses structured prompt engineering — the AI receives formatted input parameters and generates professional, well-structured output using deterministic templates and keyword analysis.',
      { x: 0.6, y: 1.2, w: 12, h: 0.8, fontSize: 13, ...bodyFont, color: SLATE_300, lineSpacingMultiple: 1.3 }
    );

    const engineFeatures = [
      { feature: 'Email Generator', prompt: 'Topic + Tone + Audience + Purpose + Length → Subject line, body, tips' },
      { feature: 'Meeting Summarizer', prompt: 'Raw notes → Summary, key points, action items (owner + deadline), decisions' },
      { feature: 'Task Planner', prompt: 'Task list + work hours + deadline → Prioritized schedule with time blocks + rationale' },
      { feature: 'Research Assistant', prompt: 'Topic + depth → Overview, insights, key findings, recommendations' },
      { feature: 'Chatbot', prompt: 'User message → Context-aware professional response with suggestions' },
    ];
    engineFeatures.forEach((item, i) => {
      const y = 2.3 + i * 0.85;
      slide.addShape('roundRect', { x: 0.6, y, w: 12, h: 0.7, fill: { color: DARK_SLATE } });
      slide.addText(item.feature, { x: 0.8, y: y + 0.05, w: 3, h: 0.6, fontSize: 13, ...titleFont, color: WHITE, valign: 'middle' });
      slide.addText(item.prompt, { x: 4.0, y: y + 0.05, w: 8.4, h: 0.6, fontSize: 11, fontFace: 'Courier New', color: SLATE_400, valign: 'middle' });
    });
  }

  // ── Slide 6: Challenges ────────────────────────────────────────────
  {
    const slide = addDarkSlide();
    slide.addText('Challenges We Faced', { x: 0.6, y: 0.4, w: 12, h: 0.7, fontSize: 32, ...titleFont, color: WHITE });

    const challenges = [
      { num: '01', title: 'AI Output Quality', desc: 'Generating professional, consistent output across five features required carefully designed templates and keyword detection logic.' },
      { num: '02', title: 'Tone & Audience Matching', desc: 'The email generator needed to adapt language, greetings, and closings based on six tones and four audience types.' },
      { num: '03', title: 'Meeting Note Parsing', desc: 'Raw meeting notes come in wildly different formats. We built pattern matching for bullet points, action keywords, and deadlines.' },
      { num: '04', title: 'Task Prioritization Logic', desc: 'Detecting priority from free-text task descriptions required keyword analysis and a time-blocking algorithm.' },
      { num: '05', title: 'Responsive Design', desc: 'The sidebar, card layouts, and chat interface all needed to work seamlessly from mobile to desktop with a collapsible drawer.' },
      { num: '06', title: 'Loading & Empty States', desc: 'Every feature needed clear loading indicators and empty states so users always know what is happening and what to do next.' },
    ];
    challenges.forEach((c, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = 0.6 + col * 6.2;
      const y = 1.4 + row * 1.9;
      slide.addShape('roundRect', { x, y, w: 5.8, h: 1.7, fill: { color: DARK_SLATE } });
      slide.addText(c.num, { x: x + 0.15, y: y + 0.1, w: 0.6, h: 0.5, fontSize: 20, ...titleFont, color: AMBER, bold: true });
      slide.addText(c.title, { x: x + 0.8, y: y + 0.1, w: 4.8, h: 0.4, fontSize: 13, ...titleFont, color: WHITE });
      slide.addText(c.desc, { x: x + 0.8, y: y + 0.5, w: 4.8, h: 1.1, fontSize: 10, ...bodyFont, color: SLATE_400, lineSpacingMultiple: 1.3 });
    });
  }

  // ── Slide 7: Design System ──────────────────────────────────────────
  {
    const slide = addDarkSlide();
    slide.addText('Design System & UI', { x: 0.6, y: 0.4, w: 12, h: 0.7, fontSize: 32, ...titleFont, color: WHITE });
    slide.addText(
      'We built a cohesive design system using a blue, white, and black palette with consistent spacing, typography, and interactive states.',
      { x: 0.6, y: 1.3, w: 12, h: 0.7, fontSize: 14, ...bodyFont, color: SLATE_300, lineSpacingMultiple: 1.3 }
    );

    slide.addText('Color Palette', { x: 0.6, y: 2.3, w: 5.8, h: 0.4, fontSize: 14, ...titleFont, color: LIGHT_BLUE });
    const colors = [
      { hex: '2563EB', name: 'Brand Blue' },
      { hex: '3B82F6', name: 'Blue 500' },
      { hex: '60A5FA', name: 'Blue 400' },
      { hex: 'DBEAFE', name: 'Blue 100' },
      { hex: '0F172A', name: 'Dark' },
      { hex: '1E293B', name: 'Slate' },
      { hex: 'F8FAFC', name: 'Light' },
      { hex: 'FFFFFF', name: 'White' },
    ];
    colors.forEach((c, i) => {
      const col = i % 4;
      const row = Math.floor(i / 4);
      const x = 0.6 + col * 1.5;
      const y = 2.8 + row * 1.2;
      slide.addShape('roundRect', { x, y, w: 1.3, h: 0.7, fill: { color: c.hex }, line: { color: SLATE_400, width: 0.5 } });
      slide.addText(c.name, { x, y: y + 0.75, w: 1.3, h: 0.3, fontSize: 8, ...bodyFont, color: SLATE_400, align: 'center' });
    });

    slide.addText('Design Principles', { x: 7.0, y: 2.3, w: 5.5, h: 0.4, fontSize: 14, ...titleFont, color: LIGHT_BLUE });
    const principles = [
      '8px spacing system for consistency',
      'Inter font — 3 weights max',
      'Card-based layout with hover effects',
      'Fade-in, slide-up, shimmer animations',
      'Dark sidebar + light content area',
    ];
    principles.forEach((p, i) => {
      slide.addText(`•  ${p}`, { x: 7.2, y: 2.8 + i * 0.4, w: 5.3, h: 0.35, fontSize: 11, ...bodyFont, color: SLATE_300 });
    });

    slide.addText('Reusable Components: Card, Button, Loader, ShimmerLines, Badge, CopyButton, Disclaimer, FeatureHeader, EmptyState', {
      x: 0.6, y: 5.5, w: 12, h: 0.5, fontSize: 10, fontFace: 'Courier New', color: SLATE_400,
    });
  }

  // ── Slide 8: Implementation ────────────────────────────────────────
  {
    const slide = addDarkSlide();
    slide.addText('Implementation — Feature by Feature', { x: 0.6, y: 0.4, w: 12, h: 0.7, fontSize: 28, ...titleFont, color: WHITE });

    const impls = [
      { feature: 'Smart Email Generator', approach: 'Tone-adjective mapping, audience-based greetings, purpose-specific templates, length guidance, and contextual tips generation.' },
      { feature: 'Meeting Notes Summarizer', approach: 'Line-by-line parsing with bullet-point detection, action-item extraction (owner + deadline regex), and decision keyword matching.' },
      { feature: 'AI Task Planner', approach: 'Priority keyword detection, sort by urgency, time-block scheduling from 9 AM, and rationale per priority level.' },
      { feature: 'AI Research Assistant', approach: 'Depth-aware overview generation, four themed insight cards, findings list, and actionable recommendations.' },
      { feature: 'AI Chatbot Interface', approach: 'Context-aware response matching on keywords, typing indicators, and suggested prompts for first-time users.' },
    ];
    impls.forEach((item, i) => {
      const y = 1.4 + i * 1.1;
      slide.addShape('roundRect', { x: 0.6, y, w: 12, h: 0.95, fill: { color: DARK_SLATE } });
      slide.addText(item.feature, { x: 0.8, y: y + 0.08, w: 4, h: 0.35, fontSize: 13, ...titleFont, color: WHITE });
      slide.addText(item.approach, { x: 0.8, y: y + 0.45, w: 11.5, h: 0.45, fontSize: 10, ...bodyFont, color: SLATE_400, lineSpacingMultiple: 1.2 });
    });
  }

  // ── Slide 9: Solutions ──────────────────────────────────────────────
  {
    const slide = addDarkSlide();
    slide.addText('How We Solved the Challenges', { x: 0.6, y: 0.4, w: 12, h: 0.7, fontSize: 28, ...titleFont, color: WHITE });

    const solutions = [
      { challenge: 'AI Output Quality', solution: 'Built deterministic template functions with parameterized content generation for each feature.' },
      { challenge: 'Tone & Audience Matching', solution: 'Created a tone-to-adjective mapping system and audience-specific greeting/closing logic.' },
      { challenge: 'Meeting Note Parsing', solution: 'Implemented multi-pattern detection: bullet markers, numbered lists, action keywords, and deadline phrases via regex.' },
      { challenge: 'Task Prioritization', solution: 'Developed keyword-based priority detection with a sorting algorithm and time-block scheduler.' },
      { challenge: 'Responsive Design', solution: 'Used Tailwind responsive breakpoints with a collapsible sidebar drawer and adaptive grid layouts.' },
      { challenge: 'Loading & Empty States', solution: 'Built reusable Loader, ShimmerLines, and EmptyState components used across all five features.' },
    ];
    solutions.forEach((item, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = 0.6 + col * 6.2;
      const y = 1.3 + row * 1.9;
      slide.addShape('roundRect', { x, y, w: 5.8, h: 1.7, fill: { color: DARK_SLATE } });
      slide.addText(`⚠  ${item.challenge}`, { x: x + 0.15, y: y + 0.1, w: 5.5, h: 0.35, fontSize: 11, ...titleFont, color: AMBER });
      slide.addText(`✓  ${item.solution}`, { x: x + 0.15, y: y + 0.55, w: 5.5, h: 1.0, fontSize: 10, ...bodyFont, color: SLATE_300, lineSpacingMultiple: 1.3 });
    });
  }

  // ── Slide 10: The Final Product ─────────────────────────────────────
  {
    const slide = addDarkSlide();
    slide.addText('The Final Product', { x: 0.6, y: 0.4, w: 12, h: 0.7, fontSize: 32, ...titleFont, color: WHITE });
    slide.addText(
      'BUILD IT IA is a fully functional prototype with five interactive AI-powered features, a professional SaaS dashboard, and a responsive design that works across all devices.',
      { x: 0.6, y: 1.3, w: 12, h: 0.8, fontSize: 14, ...bodyFont, color: SLATE_300, lineSpacingMultiple: 1.3 }
    );

    const stats = [
      { label: 'AI Features', value: '5' },
      { label: 'Components Built', value: '15+' },
      { label: 'Responsive Breakpoints', value: '4' },
      { label: 'Email Tones', value: '6' },
      { label: 'Audience Types', value: '4' },
      { label: 'Research Depths', value: '3' },
    ];
    stats.forEach((s, i) => {
      const col = i % 3;
      const row = Math.floor(i / 3);
      const x = 0.6 + col * 4.1;
      const y = 2.4 + row * 1.6;
      slide.addShape('roundRect', { x, y, w: 3.7, h: 1.3, fill: { color: DARK_SLATE } });
      slide.addText(s.value, { x, y: y + 0.15, w: 3.7, h: 0.6, fontSize: 32, ...titleFont, color: WHITE, align: 'center' });
      slide.addText(s.label, { x, y: y + 0.8, w: 3.7, h: 0.4, fontSize: 12, ...bodyFont, color: SLATE_400, align: 'center' });
    });

    slide.addText(
      'Includes a dashboard with stats and feature cards, a dark sidebar with navigation, loading states with spinners and shimmer effects, copy-to-clipboard on all outputs, and the required AI disclaimer on every feature.',
      { x: 0.6, y: 5.8, w: 12, h: 0.8, fontSize: 11, ...bodyFont, color: LIGHT_BLUE, lineSpacingMultiple: 1.3 }
    );
  }

  // ── Slide 11: Key Takeaways ─────────────────────────────────────────
  {
    const slide = addDarkSlide();
    slide.addText('Key Takeaways', { x: 0.6, y: 0.4, w: 12, h: 0.7, fontSize: 32, ...titleFont, color: WHITE });

    const takeaways = [
      { num: '01', title: 'Structured Prompt Engineering Works', desc: 'By treating each AI feature as a structured input-to-output pipeline, we achieved consistent, professional results without unpredictable outputs.' },
      { num: '02', title: 'Component-Driven Architecture Scales', desc: 'Separating AI logic from UI components made it easy to build five distinct features that share a consistent design language.' },
      { num: '03', title: 'Design Systems Prevent Drift', desc: 'A reusable component library with a defined color palette and spacing system kept the UI cohesive across all views.' },
      { num: '04', title: 'Loading & Empty States Matter', desc: 'Every feature communicates clearly when processing and when idle — users always know what to do next, which builds trust in the AI.' },
      { num: '05', title: 'Responsiveness Is Non-Negotiable', desc: 'Mobile-first design with a collapsible sidebar and adaptive grids ensured the app works from phone to desktop without compromise.' },
    ];
    takeaways.forEach((t, i) => {
      const y = 1.3 + i * 1.15;
      slide.addShape('roundRect', { x: 0.6, y, w: 12, h: 1.0, fill: { color: DARK_SLATE } });
      slide.addText(t.num, { x: 0.8, y: y + 0.1, w: 0.6, h: 0.4, fontSize: 18, ...titleFont, color: BRAND_BLUE });
      slide.addText(t.title, { x: 1.5, y: y + 0.1, w: 10.5, h: 0.35, fontSize: 13, ...titleFont, color: WHITE });
      slide.addText(t.desc, { x: 1.5, y: y + 0.5, w: 10.8, h: 0.45, fontSize: 10, ...bodyFont, color: SLATE_400, lineSpacingMultiple: 1.2 });
    });
  }

  // ── Slide 12: Thank You ─────────────────────────────────────────────
  {
    const slide = addDarkSlide();
    slide.addText('Thank You', { x: 0.5, y: 2.5, w: 12.3, h: 1.0, fontSize: 48, ...titleFont, color: WHITE, align: 'center' });
    slide.addText('BUILD IT IA — AI Workplace Productivity Assistant', {
      x: 0.5, y: 3.5, w: 12.3, h: 0.6, fontSize: 20, ...bodyFont, color: LIGHT_BLUE, align: 'center',
    });
    slide.addText('A fully functional prototype with interactive UI and AI-powered features — built from prompt to production.', {
      x: 0.5, y: 4.5, w: 12.3, h: 0.6, fontSize: 13, ...bodyFont, color: SLATE_400, align: 'center',
    });
    slide.addText('AI-generated content may require human review.', {
      x: 0.5, y: 6.0, w: 12.3, h: 0.4, fontSize: 10, ...bodyFont, color: AMBER, align: 'center',
    });
  }

  await pptx.writeFile({ fileName: 'BUILD-IT-IA-Presentation.pptx' });
}
