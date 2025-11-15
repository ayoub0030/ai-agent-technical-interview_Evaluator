# AceUp Interview Platform - Complete Analysis

## 📋 Project Overview

**Name:** AceUp Interview (sherm-team-6)  
**Purpose:** AI-powered system design interview platform with real-time proctoring and automated grading  
**Status:** ✅ Fully Functional

---

## 🏗️ Architecture Overview

### **Three-Tier Architecture**

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React + Vite)                  │
│                      Port 5173                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ • Interview Pages (System Design, MCQ, LeetCode)    │   │
│  │ • Admin Dashboard                                    │   │
│  │ • Canvas Diagram Editor (ReactFlow)                 │   │
│  │ • Proctoring Monitor (Webcam)                       │   │
│  │ • Eleven Labs Voice Agent Integration               │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                   BACKEND (Next.js)                         │
│                      Port 3000                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ API Endpoints:                                       │   │
│  │ • POST /api/grade-interview (Gemini grading)        │   │
│  │ • POST /api/proctoring/analyze (Vision analysis)    │   │
│  │ • POST /api/proctoring/violation (Log violations)   │   │
│  │ • POST /api/send-interview-link (Email invites)     │   │
│  │ • GET/POST /api/interviews/* (Interview mgmt)       │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                  DATABASE (Supabase)                        │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Tables:                                              │   │
│  │ • design_assessments (Interview problems)           │   │
│  │ • design_assessment_results (Grading results)       │   │
│  │ • proctoring_frames (Webcam frames & scores)        │   │
│  │ • proctoring_violations (Tab switches, etc.)        │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 Core Workflows

### **1. Interview Workflow**

```
Admin Creates Assessment
    ↓
Candidate Receives Email Link (via Resend)
    ↓
Pre-Interview Page
    ├─ Consent form
    ├─ Webcam permission check
    └─ System check
    ↓
Interview Starts (45 minutes)
    ├─ Eleven Labs Voice Agent connects (WebRTC)
    ├─ Candidate designs system using Canvas editor
    ├─ Diagram updates sync to agent in real-time
    ├─ Proctoring monitors every 1 minute
    │  ├─ Webcam frame capture
    │  ├─ Gemini vision analysis
    │  ├─ Suspicion scoring (0-100)
    │  └─ Tab switch detection
    └─ Conversation recorded
    ↓
Interview Ends (Time or Manual)
    ↓
Grading Process (10-30 seconds)
    ├─ Fetch transcript from Eleven Labs API
    ├─ Send to Gemini for grading
    ├─ Grade on 5 pillars (0-10 each)
    └─ Save results to database
    ↓
Results Page
    ├─ Scores breakdown
    ├─ Strengths & weaknesses
    ├─ Transcript
    └─ Diagram visualization
```

### **2. Grading Pipeline**

```
Interview Ends
    ↓
1. Capture Diagram State (JSON)
2. Get Conversation ID from Eleven Labs
    ↓
3. Fetch Problem Details (Supabase)
   └─ Problem description, rubric, requirements
    ↓
4. Fetch Transcript (Eleven Labs API)
   └─ With retry logic (3 attempts, 3s apart)
    ↓
5. Normalize Diagram JSON to Standard Format
    ↓
6. Send to Backend API: POST /api/grade-interview
    ├─ Input: Problem, rubric, transcript, diagram
    └─ Uses: GeminiGradingService (Gemini 2.0 Flash)
    ↓
7. Gemini Grades on 5 Pillars (0-10 each):
   • Reliability - Fault tolerance, error handling
   • Scalability - Horizontal scaling, load balancing
   • Availability - Redundancy, failover
   • Communication - Clarity, justification
   • Trade-off Analysis - Competing concerns
    ↓
8. Calculate Overall Score = Average of 5 pillars
    ↓
9. Save Results to Database
    ├─ Individual scores
    ├─ Overall score
    ├─ Summary & feedback
    ├─ Strengths & weaknesses
    ├─ Full transcript
    └─ Diagram JSON
    ↓
10. Display Results Page
```

### **3. Proctoring Process**

```
Interview Running
    ↓
Every 1 Minute:
    ├─ Capture Webcam Frame
    ├─ Send to Backend: POST /api/proctoring/analyze
    ├─ Gemini Vision Analyzes Frame
    ├─ Returns Suspicion Score (0-100)
    └─ If Score > 70: Log Violation
    ↓
Tab Switch Detected:
    ├─ Log as "tab_switch" violation
    └─ Increment suspicion counter
    ↓
Results Saved to Supabase
```

---

## 🛠️ Tech Stack Details

### **Frontend**
- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite
- **Styling:** TailwindCSS 4.1
- **UI Components:** shadcn/ui
- **Diagram Editor:** ReactFlow
- **Voice Agent:** Eleven Labs (WebRTC)
- **Database Client:** Supabase JS SDK
- **HTTP Client:** Fetch API

### **Backend**
- **Framework:** Next.js 16
- **Runtime:** Node.js
- **API:** REST endpoints
- **AI/ML:** Google Gemini API (2.0 Flash)
- **Email:** Resend
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth

### **External Services**
- **Gemini AI:** Grading & vision analysis
- **Eleven Labs:** Voice agent & conversation management
- **Supabase:** Database, auth, storage
- **Resend:** Email delivery

---

## 📁 Project Structure

```
/
├── app/                              # Next.js Backend (Port 3000)
│   ├── api/
│   │   ├── grade-interview/          # POST - Grades interviews
│   │   │   └── route.ts
│   │   ├── interviews/
│   │   │   ├── route.ts              # GET/POST interviews
│   │   │   └── [interviewId]/
│   │   │       └── submit/           # POST - Submit interview
│   │   ├── proctoring/
│   │   │   ├── analyze/              # POST - Analyze frames
│   │   │   └── violation/            # POST - Log violations
│   │   └── send-interview-link/      # POST - Send email
│   ├── interview/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── frontend/                         # React Frontend (Port 5173)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Admin/                # Admin dashboard
│   │   │   ├── Interview/
│   │   │   │   ├── SystemDesignInterviewPage.tsx  # Main interview
│   │   │   │   ├── PreInterviewPage.tsx           # Consent & setup
│   │   │   │   └── AssessmentFinishedPage.tsx     # Results
│   │   │   └── Auth/                 # Login/Register
│   │   │
│   │   ├── components/
│   │   │   ├── admin/                # Admin components
│   │   │   ├── ui/                   # shadcn/ui components
│   │   │   └── effects/              # Visual effects
│   │   │
│   │   ├── features/
│   │   │   └── system-design/
│   │   │       └── components/
│   │   │           ├── Canvas.tsx    # Diagram editor
│   │   │           ├── Timer.tsx     # 45-min countdown
│   │   │           └── Proctoring.tsx # Webcam monitor
│   │   │
│   │   ├── services/
│   │   │   ├── grading.service.ts    # Grading orchestration
│   │   │   ├── interview.service.ts  # Interview management
│   │   │   ├── proctoring.service.ts # Proctoring logic
│   │   │   └── api.ts                # API client
│   │   │
│   │   ├── hooks/
│   │   │   ├── useConversation.ts    # Eleven Labs integration
│   │   │   └── useDiagramElevenSync.ts # Sync diagram with agent
│   │   │
│   │   ├── types/
│   │   └── lib/
│   │
│   ├── .env.local                    # Frontend env vars
│   ├── vite.config.ts
│   └── tailwind.config.js
│
├── backend/
│   ├── gemini-grader.ts              # Grading engine
│   └── proctoring-analyzer.ts        # Vision analysis
│
├── supabase/
│   ├── migrations/                   # Database migrations
│   │   ├── create_proctoring_frames_table.sql
│   │   ├── add_assessment_id_to_proctoring_frames.sql
│   │   ├── add_status_and_duration_to_design_assessments.sql
│   │   └── add_grading_columns_to_design_assessment_results.sql
│   └── functions/
│       └── grade-interview/          # Edge Function (fallback)
│
├── types/                            # Shared TypeScript types
├── lib/                              # Shared utilities
├── emails/                           # Email templates
│
├── package.json                      # Root dependencies
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
├── Dockerfile                        # Docker configuration
├── docker-compose.yml
│
└── Documentation/
    ├── README.md                     # Project overview
    ├── PROJECT_SUMMARY.md            # Detailed summary
    ├── GRADING_FLOW.md               # Grading process
    ├── PROCTORING_SETUP.md           # Proctoring setup
    ├── FIXES_APPLIED.md              # Recent fixes
    └── ELEVEN_LABS_SETUP.md          # Voice agent setup
```

---

## 🔑 Key Features

### **1. AI-Powered System Design Interviews**
- Interactive diagram editor (ReactFlow-based)
- Real-time collaboration with Eleven Labs voice agent
- 45-minute timed interviews
- Automated grading on 5 pillars

### **2. AI Proctoring**
- Real-time webcam monitoring
- Suspicious activity detection (Gemini vision)
- Tab switching detection
- Behavioral analysis
- Violation logging

### **3. Interview Management**
- Candidate invitation system (email)
- Interview scheduling
- Results dashboard
- Detailed performance analytics

### **4. Automated Grading**
- 5-pillar evaluation system
- Prompt injection detection
- Transcript analysis
- Diagram evaluation
- Comprehensive feedback

---

## 🔐 Security Features

### **Prompt Injection Detection**
The Gemini grader detects suspicious keywords:
- "ignore previous", "ignore all", "new instructions"
- "act as", "pretend you are", "system prompt"
- "give me a 10", "perfect score", "maximum score"

**If detected:** Returns all scores as 0 and marks interview as invalidated

### **Proctoring Violations**
- Tab switches detected and logged
- Webcam monitoring for multiple people
- Suspicion scoring based on engagement

---

## 📊 Grading Rubric (5 Pillars)

### **1. Reliability (0-10)**
- Fault tolerance and error handling
- Data consistency strategies
- Failure recovery mechanisms
- Backup and restore plans

### **2. Scalability (0-10)**
- Horizontal scaling strategy
- Load balancing implementation
- Database scaling (sharding, replicas)
- Caching layers

### **3. Availability (0-10)**
- Redundancy and failover
- Service uptime strategies
- Geographic distribution
- Health checks and monitoring

### **4. Communication (0-10)**
- Clarity of explanation
- Justification of design choices
- Responsiveness to feedback
- Understanding of trade-offs

### **5. Trade-off Analysis (0-10)**
- Identifies competing concerns
- Compares alternatives
- Understands CAP theorem
- Acknowledges limitations

---

## 🚀 Environment Variables Required

### **Backend (.env)**
```
GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
RESEND_API_KEY=your_resend_api_key
APP_BASE_URL=http://localhost:5173
COMPANY_NAME=Your Company Name
```

### **Frontend (.env.local)**
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_ELEVEN_API_KEY=your_eleven_labs_api_key
VITE_ELEVEN_AGENT_ID=agent_your_agent_id
```

---

## 🗄️ Database Schema

### **design_assessments**
- `id` (UUID, PK)
- `title` (text)
- `description` (text)
- `problem_description` (text)
- `rubric` (JSON)
- `requirements` (JSON)
- `status` (enum: draft, active, completed)
- `duration` (integer, minutes)
- `created_at` (timestamp)

### **design_assessment_results**
- `id` (UUID, PK)
- `assessment_id` (FK)
- `candidate_id` (FK)
- `reliability` (0-10)
- `scalability` (0-10)
- `availability` (0-10)
- `communication` (0-10)
- `trade_off_analysis` (0-10)
- `overall_score` (0-100)
- `summary` (text)
- `strengths` (JSON array)
- `weaknesses` (JSON array)
- `transcript` (text)
- `diagram_json` (JSON)
- `created_at` (timestamp)

### **proctoring_frames**
- `id` (UUID, PK)
- `assessment_id` (FK)
- `frame_data` (bytea)
- `suspicion_score` (0-100)
- `analysis` (JSON)
- `timestamp` (timestamp)

### **proctoring_violations**
- `id` (UUID, PK)
- `assessment_id` (FK)
- `violation_type` (enum: tab_switch, multiple_people, etc.)
- `severity` (low, medium, high)
- `timestamp` (timestamp)

---

## 🔄 API Endpoints

### **Grading**
- `POST /api/grade-interview` - Grade an interview
  - Input: `{ assessmentId, conversationId, diagramJson, transcript }`
  - Output: `{ scores, overall_score, summary, strengths, weaknesses }`

### **Proctoring**
- `POST /api/proctoring/analyze` - Analyze webcam frame
  - Input: `{ frameData, assessmentId }`
  - Output: `{ suspicion_score, analysis }`

- `POST /api/proctoring/violation` - Log violation
  - Input: `{ assessmentId, violation_type, severity }`
  - Output: `{ success }`

### **Interviews**
- `GET /api/interviews` - List interviews
- `GET /api/interviews/[id]` - Get interview details
- `POST /api/interviews/[id]/submit` - Submit interview
- `POST /api/send-interview-link` - Send email invitation

---

## 🎯 Current Status

### **✅ Fully Implemented**
- Eleven Labs voice agent integration
- Real-time diagram synchronization
- Interview grading with Gemini AI
- Results saved to database
- Proctoring with webcam monitoring
- Security: Prompt injection detection
- Email invitations via Resend
- Admin dashboard

### **🚀 Upcoming Features**
- Multiple Choice Questions (MCQ) module
- LeetCode integration
- Enhanced HR reporting
- Mobile app development
- Advanced proctoring features
- ATS integration

---

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+
- npm or yarn
- Supabase account
- Google Gemini API key
- Eleven Labs API key
- Resend API key

### **Installation**

1. **Clone repository**
   ```bash
   git clone https://github.com/your-org/aceup-interview.git
   cd aceup-interview
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd frontend && npm install
   ```

3. **Set up environment variables**
   - Create `.env` in root (backend)
   - Create `.env.local` in `frontend/` (frontend)

4. **Start development servers**
   ```bash
   # Terminal 1: Backend (port 3000)
   npm run dev
   
   # Terminal 2: Frontend (port 5173)
   cd frontend && npm run dev
   ```

5. **Access application**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:3000

---

## 📝 Key Files to Understand

### **Frontend Services**
- `frontend/src/services/grading.service.ts` - Grading orchestration
- `frontend/src/services/interview.service.ts` - Interview management
- `frontend/src/services/proctoring.service.ts` - Proctoring logic

### **Frontend Components**
- `frontend/src/features/system-design/components/Canvas.tsx` - Diagram editor
- `frontend/src/pages/Interview/SystemDesignInterviewPage.tsx` - Main interview
- `frontend/src/pages/Interview/AssessmentFinishedPage.tsx` - Results page

### **Frontend Hooks**
- `frontend/src/hooks/useConversation.ts` - Eleven Labs integration
- `frontend/src/hooks/useDiagramElevenSync.ts` - Diagram sync

### **Backend Services**
- `backend/gemini-grader.ts` - Grading engine
- `backend/proctoring-analyzer.ts` - Vision analysis

### **Backend API**
- `app/api/grade-interview/route.ts` - Grading endpoint
- `app/api/proctoring/analyze/route.ts` - Proctoring endpoint

---

## 🐛 Common Issues & Solutions

### **Grading Fails**
- Check `GEMINI_API_KEY` is set in `.env`
- Ensure backend server running on port 3000
- Check browser console for error details

### **Transcript Not Fetching**
- Verify `VITE_ELEVEN_API_KEY` has transcript permission
- Check Eleven Labs API key is valid
- Retry logic waits 3 seconds between attempts

### **Diagram Not Syncing**
- Verify `VITE_ELEVEN_AGENT_ID` is correct
- Check agent has `diagram_json` variable configured
- Look for `[DiagramSync]` logs in console

### **Proctoring Issues**
- Check webcam permission granted
- Verify `GEMINI_API_KEY` for vision analysis
- Check suspicion scores in console

---

## 📚 Documentation Files

- `README.md` - Project overview
- `PROJECT_SUMMARY.md` - Detailed technical summary
- `GRADING_FLOW.md` - Grading process documentation
- `PROCTORING_SETUP.md` - Proctoring setup guide
- `FIXES_APPLIED.md` - Recent fixes and changes
- `ELEVEN_LABS_SETUP.md` - Voice agent setup guide

---

## 🎯 Next Steps for Development

1. **Set up environment variables** - Configure all API keys
2. **Start backend server** - `npm run dev` (port 3000)
3. **Start frontend server** - `cd frontend && npm run dev` (port 5173)
4. **Test interview flow** - Create assessment → Send invite → Complete interview
5. **Verify grading** - Check console logs and database results
6. **Monitor proctoring** - Verify webcam monitoring and violation logging
7. **Review results** - Check results page and analytics

---

**Last Updated:** November 15, 2025  
**Status:** ✅ Fully Functional & Ready for Development
