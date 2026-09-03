# BUILD IT IA — AI Workplace Productivity Assistant

[![Open in Bolt](https://bolt.new/static/open-in-bolt.svg)](https://bolt.new/~/sb1-phqvcrax)

A modern, responsive web application that helps professionals automate daily work tasks using AI. Built with a clean SaaS dashboard layout, sidebar navigation, and interactive AI-powered tools.

## Features

### Smart Email Generator
Draft professional emails tailored to your audience, tone, and purpose. Choose from six tones (Professional, Friendly, Formal, Casual, Persuasive, Empathetic), four audience types, and six email purposes. The AI generates a subject line, email body, and tailored tips — all copyable with one click.

### Meeting Notes Summarizer
Transform raw, unstructured meeting notes into a structured summary with:
- **Overview** — concise recap of the meeting
- **Key Points** — main discussion topics extracted automatically
- **Action Items** — tasks with assigned owners and deadlines
- **Decisions** — agreed-upon outcomes documented

Includes a "load sample notes" button for quick testing.

### AI Task Planner
Enter your to-do list, available work hours, and deadline. The AI:
- Detects priority keywords (urgent, critical, optional, later)
- Sorts tasks by priority (High, Medium, Low)
- Creates a time-blocked schedule starting at 9 AM
- Provides rationale for each scheduling decision
- Offers productivity tips based on your workload

### AI Research Assistant
Get structured research insights on any topic at three depth levels (Brief, Standard, Comprehensive). Output includes:
- **Overview** — high-level summary
- **Key Insights** — four themed insight cards with details
- **Key Findings** — bullet-point discoveries
- **Recommendations** — actionable next steps

### AI Chatbot Interface
A full conversational chat experience with:
- Message bubbles with timestamps
- Animated typing indicators
- Suggested prompt buttons for first-time users
- Context-aware responses about emails, meetings, tasks, research, and productivity

## Tech Stack

- **React 18** with TypeScript
- **Vite** for build tooling and development
- **Tailwind CSS** for styling and responsive design
- **Lucide React** for icons
- **Supabase** backend (available for data persistence)

## Design

- **Color scheme:** Blue, white, and black
- **Layout:** Sidebar navigation + card-based dashboard
- **Responsive:** Optimized for mobile, tablet, and desktop
- **Animations:** Fade-in, slide-up, shimmer loaders, and bounce indicators
- **Typography:** Inter font family with consistent weight hierarchy

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview

# Run type checking
npm run typecheck
```

## Project Structure

```
src/
├── App.tsx                    # Main app with view routing
├── main.tsx                   # React entry point
├── index.css                  # Global styles & Tailwind
├── types.ts                   # Shared TypeScript types
├── lib/
│   └── aiEngine.ts            # AI generation engine for all features
├── components/
│   ├── Sidebar.tsx            # Navigation sidebar
│   ├── TopBar.tsx             # Top header bar
│   ├── ui/
│   │   ├── Button.tsx          # Reusable button component
│   │   ├── Card.tsx            # Card layout components
│   │   ├── CopyButton.tsx      # Copy-to-clipboard + Badge
│   │   ├── Loader.tsx          # Loading spinners & shimmer
│   │   └── Shared.tsx          # Disclaimer, headers, empty states
│   └── views/
│       ├── Dashboard.tsx       # Overview dashboard
│       ├── EmailGenerator.tsx # Smart Email Generator
│       ├── MeetingSummarizer.tsx
│       ├── TaskPlanner.tsx
│       ├── ResearchAssistant.tsx
│       └── Chatbot.tsx
```

## Disclaimer

> AI-generated content may require human review.

All AI outputs in this application are generated using structured prompt engineering patterns. While the outputs are designed to be professional and clear, they should be reviewed before use in real-world scenarios.

## License

This project is private and proprietary.
