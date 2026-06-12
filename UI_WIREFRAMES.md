# UI/UX Wireframes

## Design System

### Color Palette
```
Primary: #0A66C2 (LinkedIn Blue)
Secondary: #00A0DC
Success: #10B981
Warning: #F59E0B
Error: #EF4444
Background Light: #FFFFFF
Background Dark: #1A1A1A
Text Primary: #1F2937
Text Secondary: #6B7280
```

### Typography
```
Font Family: Inter, system-ui, sans-serif
Headings: Bold, 24-32px
Subheadings: Semibold, 18-20px
Body: Regular, 14-16px
Small: Regular, 12-14px
```

## 1. Landing Page

```
┌─────────────────────────────────────────────────────────┐
│ [Logo] LinkedIn AI Outreach    [Features] [Pricing] [Login] [Sign Up] │
├─────────────────────────────────────────────────────────┤
│                                                         │
│         Transform LinkedIn Profiles into                │
│         Personalized Email Outreach                     │
│         [Get Started Free] [Watch Demo]                 │
│                                                         │
│         [Hero Image/Animation]                          │
├─────────────────────────────────────────────────────────┤
│  Features Section:                                      │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐               │
│  │ AI Profile│ │   Email  │ │ Chatbot  │               │
│  │ Analysis │ │ Generator│ │ Assistant│               │
│  └──────────┘ └──────────┘ └──────────┘               │
├─────────────────────────────────────────────────────────┤
│  Footer: © 2026 LinkedIn AI | Terms | Privacy          │
└─────────────────────────────────────────────────────────┘
```

## 2. Login Page

```
┌─────────────────────────────────────────────────────────┐
│                    [Logo]                               │
│                 Welcome Back                            │
│                                                         │
│  ┌───────────────────────────────────────┐            │
│  │ Email Address                          │            │
│  │ [                                    ] │            │
│  └───────────────────────────────────────┘            │
│  ┌───────────────────────────────────────┐            │
│  │ Password                               │            │
│  │ [                                    ] │            │
│  └───────────────────────────────────────┘            │
│  [Remember Me]        [Forgot Password?]              │
│  [         Login Button         ]                      │
│                                                         │
│  Don't have an account? [Sign Up]                     │
└─────────────────────────────────────────────────────────┘
```


## 3. Dashboard Page

```
┌─────────────────────────────────────────────────────────┐
│ [≡] LinkedIn AI Outreach      [Search]  [🔔] [👤]      │
├───┬─────────────────────────────────────────────────────┤
│   │ Dashboard Overview                                  │
│   │                                                     │
│ S │ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐              │
│ I │ │ 150  │ │ 450  │ │  25  │ │ 82%  │              │
│ D │ │Profile│ │Emails│ │Users │ │Score │              │
│ E │ └──────┘ └──────┘ └──────┘ └──────┘              │
│   │                                                     │
│ B │ Recent Activity                                     │
│ A │ ┌─────────────────────────────────────────┐       │
│ R │ │ Profile analyzed: Jane Smith            │       │
│   │ │ Email generated: Recruitment Outreach   │       │
│   │ │ Chatbot conversation started            │       │
│   │ └─────────────────────────────────────────┘       │
│   │                                                     │
│   │ Usage Trends                                        │
│   │ [Chart showing profiles/emails over time]          │
└───┴─────────────────────────────────────────────────────┘
```

## 4. LinkedIn Analysis Page

```
┌─────────────────────────────────────────────────────────┐
│ LinkedIn Profile Analysis                               │
├─────────────────────────────────────────────────────────┤
│ Input Method:                                           │
│ ○ LinkedIn URL  ● Manual Entry                          │
│                                                         │
│ ┌──────────────────────────────────────────────────┐  │
│ │ LinkedIn Profile URL                              │  │
│ │ [https://linkedin.com/in/username               ] │  │
│ │ [Analyze Profile]                                 │  │
│ └──────────────────────────────────────────────────┘  │
│                                                         │
│ Analysis Results:                                       │
│ ┌──────────────────────────────────────────────────┐  │
│ │ Name: Jane Smith                                  │  │
│ │ Headline: Senior Software Engineer                │  │
│ │ Matching Score: ████████░░ 85/100                │  │
│ │                                                    │  │
│ │ Skills Summary:                                    │  │
│ │ • Python, React, Node.js, AWS                     │  │
│ │ • 8 years of experience                           │  │
│ │ • Strong full-stack background                    │  │
│ │                                                    │  │
│ │ Career Insights:                                   │  │
│ │ Well-rounded professional with leadership...       │  │
│ │                                                    │  │
│ │ [Generate Email] [View Details] [Save]           │  │
│ └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

## 5. Email Generator Page

```
┌─────────────────────────────────────────────────────────┐
│ AI Email Generator                                      │
├─────────────────────────────────────────────────────────┤
│ Select Profile:                                         │
│ [Jane Smith - Senior Software Engineer           ▼]    │
│                                                         │
│ Email Type:                                             │
│ [Recruitment ▼]                                         │
│                                                         │
│ Tone:                                                   │
│ ○ Professional ● Friendly ○ Formal                     │
│                                                         │
│ Custom Prompt (Optional):                               │
│ ┌──────────────────────────────────────────────────┐  │
│ │ Mention remote work opportunity and competitive   │  │
│ │ salary...                                         │  │
│ └──────────────────────────────────────────────────┘  │
│                                                         │
│ [Generate Email]                                        │
│                                                         │
│ Generated Email:                                        │
│ ┌──────────────────────────────────────────────────┐  │
│ │ Subject: Exciting Senior Developer Role at...    │  │
│ │                                                    │  │
│ │ Dear Jane,                                        │  │
│ │                                                    │  │
│ │ I came across your impressive LinkedIn profile... │  │
│ │                                                    │  │
│ │ [Edit] [Regenerate] [Save] [Export PDF]          │  │
│ └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

## 6. Chatbot Page

```
┌─────────────────────────────────────────────────────────┐
│ AI Assistant                                  [New Chat]│
├─────────────────────────────────────────────────────────┤
│                                                         │
│ ┌─────────────────────────────────────────────────┐   │
│ │ 🤖 Hello! I'm your AI assistant. How can I help? │   │
│ │                                            10:30  │   │
│ └─────────────────────────────────────────────────┘   │
│                                                         │
│ ┌─────────────────────────────────────────────────┐   │
│ │ How can I improve my recruitment email?      👤  │   │
│ │                                            10:31  │   │
│ └─────────────────────────────────────────────────┘   │
│                                                         │
│ ┌─────────────────────────────────────────────────┐   │
│ │ 🤖 Here are some suggestions:                     │   │
│ │ 1. Personalize the subject line...               │   │
│ │ 2. Highlight specific achievements...            │   │
│ │ 3. Include a clear call-to-action...             │   │
│ │                                            10:31  │   │
│ └─────────────────────────────────────────────────┘   │
│                                                         │
│ ┌─────────────────────────────────────────────────┐   │
│ │ Type your message...                     [Send]  │   │
│ └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

## 7. Analytics Page

```
┌─────────────────────────────────────────────────────────┐
│ Analytics Dashboard                    [Last 30 Days ▼]│
├─────────────────────────────────────────────────────────┤
│                                                         │
│ Key Metrics:                                            │
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                  │
│ │ 150  │ │ 450  │ │  25  │ │ 82%  │                  │
│ │Profile│ │Emails│ │Active│ │ Avg  │                  │
│ │ Total │ │Total │ │Users │ │Score │                  │
│ └──────┘ └──────┘ └──────┘ └──────┘                  │
│                                                         │
│ Emails by Type:                                         │
│ ┌────────────────────────────────────────────────┐    │
│ │ [Pie Chart]                                     │    │
│ │ Recruitment: 44%                                │    │
│ │ Networking: 22%                                 │    │
│ │ Internship: 18%                                 │    │
│ │ Marketing: 16%                                  │    │
│ └────────────────────────────────────────────────┘    │
│                                                         │
│ Activity Trends:                                        │
│ ┌────────────────────────────────────────────────┐    │
│ │ [Line Chart showing profiles/emails over time]  │    │
│ └────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
```

## 8. Admin Dashboard

```
┌─────────────────────────────────────────────────────────┐
│ Admin Dashboard                                         │
├─────────────────────────────────────────────────────────┤
│ System Overview:                                        │
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                  │
│ │ 100  │ │ 500  │ │ 1500 │ │ 4500 │                  │
│ │Users │ │Profile│ │Emails│ │ API  │                  │
│ │Total │ │Total │ │Total │ │Calls │                  │
│ └──────┘ └──────┘ └──────┘ └──────┘                  │
│                                                         │
│ User Management:                                        │
│ [Search users...]                         [Add User]    │
│ ┌────────────────────────────────────────────────┐    │
│ │ Name      Email         Role    Status  Action │    │
│ ├────────────────────────────────────────────────┤    │
│ │ John Doe  john@...      User    Active  [⋮]   │    │
│ │ Jane Smith jane@...     Admin   Active  [⋮]   │    │
│ │ Bob Wilson bob@...      User    Inactive[⋮]   │    │
│ └────────────────────────────────────────────────┘    │
│                                                         │
│ Recent System Activity:                                 │
│ • New user registration: john@example.com               │
│ • Email generated: recruitment outreach                 │
│ • Profile analyzed: Jane Smith                          │
└─────────────────────────────────────────────────────────┘
```

## Responsive Design Breakpoints

```
Mobile: < 640px
Tablet: 640px - 1024px
Desktop: > 1024px
```

## Component States

### Buttons
- Default: Primary color with shadow
- Hover: Darker shade with scale
- Active: Pressed state
- Disabled: Gray with reduced opacity

### Input Fields
- Default: Gray border
- Focus: Blue border with shadow
- Error: Red border with error message
- Success: Green border with checkmark

### Cards
- Default: White bg with subtle shadow
- Hover: Elevated shadow
- Active: Selected state with border

## Dark Mode

All pages support dark mode with:
- Dark backgrounds (#1A1A1A)
- Light text (#F9FAFB)
- Adjusted component colors
- Preserved contrast ratios
