Campus Connect: Product Requirements Document (PRD)

Product Name

Campus Connect

Version

1.0

Status

In Development

Date

July 10, 2025

Author

[Your Name]

1. Introduction & Vision
1.1. The Problem
University students worldwide are academically and socially siloed within their own institutions. A computer science student at Babcock University has limited visibility into the projects, resources, and perspectives of their peers at MIT, Oxford, or even neighboring institutions like UNILAG, UI, or FUTA. This isolation restricts knowledge sharing, hinders cross-institutional collaboration, and limits students' professional networks before they even enter the workforce. Existing platforms like LinkedIn are too broad and professionally focused, while informal channels like WhatsApp are unstructured and lack discovery features.

1.2. The Vision
Campus Connect will be the definitive academic social network for university students globally. Starting with a strategic pilot at Babcock University, it is a web-based platform designed to break down institutional barriers worldwide by connecting students through a structured University -> Department identity. Our vision is to create a vibrant global ecosystem where students can collaborate on projects, share academic resources, discover opportunities, and build meaningful professional networks based on merit and shared interests, not just proximity or geographic limitations.

1.3. Strategic Goals

Become the primary platform for inter-university academic collaboration globally.

Create a trusted, verified network of university students worldwide.

Provide a platform for students to showcase their work and build credible academic portfolios internationally.

Position Babcock University as a leader in educational technology through a successful pilot program.

Establish a scalable model for global university network expansion.

2. Target Audience
Primary: Undergraduate students currently enrolled in universities globally, starting with Nigerian institutions.

Secondary: University lecturers and administrators, recent graduates, corporate recruiters seeking emerging talent, and international academic collaborators.

Pilot Focus: Babcock University students as the initial validation market before global expansion.

3. Product Scope & Phased Rollout
Our development will be phased to ensure we deliver value quickly and iterate based on user feedback.

Phase 1: The MVP (Minimum Viable Product) - "The Core Connection"
Goal: Validate the core hypothesis that students want to discover and connect with peers from other universities. The entire focus is on registration, discovery, and basic interaction.

MVP Features:

User Authentication:

Secure sign-up using email and password.

Login for returning users.

Post-MVP Goal: Enforce university email for verification.

Profile Creation & Management:

Users must select their University and Department from pre-populated lists.

Basic profile fields: Full Name, Profile Picture, Bio.

The "Currently working on..." Field: A dynamic, editable field to showcase current projects or focus areas.

Student Discovery:

A "Discover" page with search and filter functionality.

Filter by University, Department, and Name.

"First Connections" Suggestion List: On first login, new users see a list of suggested peers to connect with.

Connection System:

Users can send, accept, or decline connection requests.

The connection status is visible on user profiles (e.g., "Connect", "Pending", "Connected").

Basic Interaction & Retention Hooks:

Direct Messaging: Simple 1-on-1 text messaging between connected users.

The "Wave": A low-stakes, one-click interaction to show interest in another user's profile.

Profile View Notifications: A simple notification or dashboard stat: "Your profile was viewed X times this week, including by students from [University Name]."

MVP Success Metrics:

Achieve 500 verified users from Babcock University within the first month of the pilot.

50% of new users complete their profile (bio + picture) within 48 hours.

40% of active users send at least one connection request or "wave" within their first week.

Demonstrate a clear week-over-week user retention rate during the pilot.

Phase 2: Collaboration & Engagement (Post-MVP)
Goal: Deepen engagement by providing tools for meaningful academic collaboration.

Study Groups: User-created public and private groups.

Resource Sharing: A central library for course materials and notes.

Events Calendar: A shared calendar for academic events and workshops.

Advanced Notifications: Weekly digest emails and in-app alerts.

Milestone Badges: Gamification to reward user activity and contributions.

Phase 3: The Global Vision (Long-Term)
Goal: Establish Campus Connect as an indispensable part of the global academic and professional ecosystem.

Student & University Rankings: The peer-reviewed ranking system with international scope.

Global Monetization: Premium features for "power users," universities, or recruiters (e.g., advanced search for international recruiters). Multi-currency support and regional payment integration.

International Job Board: Global internship and graduate job postings with cross-border opportunities.

Alumni Network: Features to keep graduates connected globally and providing international mentorship.

Multi-language Support: Platform localization for major global markets.

Regional Customization: Adapt to different educational systems and cultural contexts worldwide.

4. Technical Stack & Architecture
Frontend: React with TypeScript, styled with Tailwind CSS and Shadcn/ui components.

Backend & Database: Supabase (PostgreSQL, Auth, Realtime, Storage).

Deployment: Vercel for the frontend.

Initial Platform: Web-first (Progressive Web App).

5. Go-to-Market Strategy
The project's global success starts with a focused, successful pilot program that can be replicated worldwide.

Secure Institutional Backing: The primary dependency is the support of the HOD at Babcock University to champion the project as a model for global expansion.

Pilot at Babcock: Launch the MVP exclusively to Babcock students. Use official university channels (email, student forums) for promotion and validation.

Gather Feedback: Actively solicit feedback through surveys and direct conversations to rapidly iterate on the MVP for global applicability.

Regional Expansion: Use the success of the Babcock pilot and the HOD's academic connections to expand to other key Nigerian universities (UI, UNILAG, Covenant, FUTA).

International Scaling: Leverage proven model and institutional partnerships to expand to universities globally, starting with English-speaking institutions before adding multi-language support.

6. Implementation Phases & Progress Tracking

Phase 1A: MVP Foundation (Complete ✅)
Frontend UI/UX Implementation

✅ User Authentication UI
  - ✅ Login page with email/password fields
  - ✅ Signup page with university/department dropdowns
  - ✅ Landing page with navigation to auth pages
  - ❌ Form validation with error handling
  - ❌ Loading states and user feedback

✅ Profile Creation & Management UI
  - ✅ University and Department selection dropdowns
  - ✅ Basic profile fields (Full Name, Bio)
  - ✅ "Currently working on..." editable field
  - ❌ Profile picture upload functionality
  - ❌ Profile completion progress indicator

✅ Student Discovery UI
  - ✅ "Discover" page with search and filter functionality
  - ✅ Filter by University, Department, and Name
  - ✅ Responsive grid layout for user cards
  - ❌ "First Connections" suggestion algorithm
  - ❌ Advanced search with multiple criteria

✅ Connection System UI
  - ✅ UserCard component with Connect/Pending/Connected states
  - ✅ Connection request buttons with visual feedback
  - ✅ Connection status display on user profiles
  - ❌ Connection request notifications
  - ❌ Connection management (view all connections)

✅ Basic Interaction UI
  - ✅ Direct messaging interface (two-pane layout)
  - ✅ "Wave" button functionality
  - ✅ Chat interface with message history area
  - ❌ Real-time message updates
  - ❌ Message status indicators (sent/delivered/read)

✅ Dashboard & Engagement Hooks UI
  - ✅ Dashboard with activity stats cards
  - ✅ Connection requests section
  - ✅ Student suggestions with horizontal scroll
  - ❌ Profile view notifications with university data
  - ❌ Weekly activity digest

✅ Navigation & Layout
  - ✅ AppLayout with responsive sidebar
  - ✅ Complete routing system (8 pages)
  - ✅ Mobile-first responsive design
  - ✅ Coming soon overlays for future features
  - ✅ Page transitions and animations

Phase 1B: Backend Integration & MVP Launch (Next Sprint)
Backend Development & Data Integration

❌ Supabase Setup
  - ❌ Database schema design (users, connections, messages, universities)
  - ❌ Authentication system setup
  - ❌ Row Level Security (RLS) policies
  - ❌ Storage bucket for profile pictures

❌ University Data Integration
  - ❌ Nigerian universities database seeding
  - ❌ Department lists for each university
  - ❌ International universities for demo (MIT, Oxford, Stanford)
  - ❌ University email domain verification list

❌ Core Backend Features
  - ❌ User registration and authentication
  - ❌ Profile creation and management
  - ❌ Connection request system
  - ❌ Basic messaging functionality
  - ❌ "Wave" interaction tracking

❌ Analytics & Tracking
  - ❌ User registration tracking
  - ❌ Profile completion rate monitoring
  - ❌ Connection request/wave engagement tracking
  - ❌ Weekly retention rate calculation
  - ❌ Dashboard for success metrics

❌ Demo Preparation
  - ❌ Sample student profiles for demonstration
  - ❌ Cross-university connection examples
  - ❌ Mobile-optimized demo flow
  - ❌ HOD presentation materials

Phase 1C: Pilot Launch & Iteration (Post-Demo)
Production Readiness & User Testing

❌ Production Deployment
  - ❌ Vercel deployment pipeline
  - ❌ Environment configuration (dev/staging/prod)
  - ❌ Domain setup and SSL certificates
  - ❌ Performance optimization

❌ University Email Verification
  - ❌ Babcock University email domain verification
  - ❌ Email verification workflow
  - ❌ Account approval process
  - ❌ Student registration validation

❌ User Onboarding Flow
  - ❌ Welcome email sequence
  - ❌ Profile completion prompts
  - ❌ First connection suggestions
  - ❌ Tutorial/walkthrough for new users

❌ Feedback Collection System
  - ❌ In-app feedback forms
  - ❌ User survey integration
  - ❌ Bug reporting mechanism
  - ❌ Feature request tracking

Phase 2: Collaboration & Engagement Features (Post-Pilot Success)

❌ Study Groups
  - ❌ Group creation and management
  - ❌ Public and private group settings
  - ❌ Group messaging and discussions
  - ❌ Member invitation system

❌ Resource Sharing
  - ❌ File upload and storage system
  - ❌ Course materials categorization
  - ❌ Resource rating and reviews
  - ❌ Search and filter functionality

❌ Events Calendar
  - ❌ Event creation and management
  - ❌ RSVP functionality
  - ❌ Calendar integration
  - ❌ Event notifications

❌ Advanced Notifications
  - ❌ Email notification system
  - ❌ In-app notification center
  - ❌ Weekly digest emails
  - ❌ Push notifications (PWA)

❌ Milestone Badges
  - ❌ Achievement system design
  - ❌ Badge criteria and logic
  - ❌ Progress tracking
  - ❌ Social sharing features

Phase 3: Global Vision Features (Long-term)

❌ University Rankings
  - ❌ Peer review system
  - ❌ Ranking algorithm development
  - ❌ University profiles and statistics
  - ❌ International ranking integration

❌ Monetization Features
  - ❌ Premium user subscriptions
  - ❌ Recruiter tools and advanced search
  - ❌ University partnership features
  - ❌ Multi-currency payment integration

❌ International Job Board
  - ❌ Job posting system
  - ❌ Application tracking
  - ❌ Cross-border opportunity matching
  - ❌ Employer verification system

❌ Alumni Network
  - ❌ Graduate transition features
  - ❌ Mentorship matching system
  - ❌ Professional networking tools
  - ❌ Career guidance resources

❌ Global Expansion
  - ❌ Multi-language support (5+ languages)
  - ❌ Regional customization
  - ❌ Local payment methods
  - ❌ Cultural adaptation features

Success Metrics Tracking:
❌ 500 verified Babcock users in first month
❌ 50% profile completion rate within 48 hours
❌ 40% engagement rate (connections/waves) in first week
❌ Positive week-over-week retention rate
❌ HOD endorsement and institutional backing secured

Current Status: Phase 1A Complete (Frontend UI/UX) ✅
Next Milestone: Phase 1B Backend Integration (Target: 2 weeks)