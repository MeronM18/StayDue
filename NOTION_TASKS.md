# StayDue - Task Management & Progress Tracker

## Week 1 — Foundation & Auth ✅ (In Progress)

### Infrastructure Setup ✅
- [x] Buy domain (StayDue.com)
- [x] Set up Vercel project
- [x] Create GitHub repo (private)
- [x] Commit all files to GitHub
- [x] Configure Vercel for monorepo
- [x] Fix Vercel build configuration
- [x] Domain connected and working

### Supabase Setup ✅
- [x] Provision Supabase project
- [x] Get API keys (URL, Anon Key, Service Role Key)
- [x] Get database connection string
- [x] Configure authentication redirect URLs
- [ ] Build database tables
- [ ] Set up Row Level Security (RLS)
- [ ] Test database connection

### External Services Setup ✅
- [x] Set up Sentry (error tracking)
- [x] Set up Resend (email service)
- [x] Verify domain in Resend
- [x] Test email sending
- [ ] Set up Twilio (SMS/text messaging)
- [ ] Get Twilio phone number
- [ ] Test SMS sending
- [ ] Set up PostHog (analytics) - Optional
- [ ] Set up Stripe (payments) - Later
- [ ] Set up Upstash (rate limiting) - Later

### Authentication Implementation ⬜
- [ ] Implement email magic link auth
- [ ] Implement Google OAuth
- [ ] Create auth callback page
- [ ] Set up user session management
- [ ] Create protected routes
- [ ] Test authentication flow

### Database & Tables ⬜
- [ ] Design database schema
- [ ] Create users table (extended profiles)
- [ ] Create organizations/workspaces table
- [ ] Create tasks table
- [ ] Create projects table
- [ ] Set up relationships between tables
- [ ] Configure Row Level Security policies
- [ ] Test database queries

### Marketing Site ⬜
- [ ] Build landing page
- [ ] Create pricing page
- [ ] Create legal pages (Terms, Privacy Policy)
- [ ] Add sign up CTA
- [ ] Add pricing plans display
- [ ] Make it responsive
- [ ] Add SEO meta tags

### App Shell ⬜
- [x] Next.js app structure
- [x] Tailwind CSS configured
- [x] shadcn/ui components ready
- [ ] Set up routing structure
- [ ] Create layout components
- [ ] Add navigation
- [ ] Create dashboard shell

### Monitoring & Analytics ⬜
- [x] Sentry configured
- [ ] PostHog integration (optional)
- [ ] Set up error tracking in production
- [ ] Set up analytics tracking
- [ ] Monitor performance

### Testing ⬜
- [ ] Test authentication flows
- [ ] Test database operations
- [ ] Test email sending
- [ ] Test error tracking
- [ ] Test on mobile devices
- [ ] Test on different browsers

---

## Week 2+ — Core Features (Future)

### Task Management
- [ ] Create task functionality
- [ ] Edit tasks
- [ ] Delete tasks
- [ ] Task categories/tags
- [ ] Task due dates
- [ ] Task priorities
- [ ] Task search and filters

### Projects & Organization
- [ ] Create projects
- [ ] Organize tasks by project
- [ ] Team collaboration
- [ ] Workspace management
- [ ] User permissions

### User Features
- [ ] User profiles
- [ ] Settings page
- [ ] Notifications (email)
- [ ] SMS notifications (Twilio)
- [ ] Two-factor authentication (2FA) via SMS
- [ ] Email preferences
- [ ] SMS preferences
- [ ] Account management

### Payments (When Ready)
- [ ] Set up Stripe
- [ ] Create pricing plans
- [ ] Build checkout flow
- [ ] Handle subscriptions
- [ ] Manage billing
- [ ] Webhook handling

---

## Completed Tasks ✅

### Foundation (Week 1)
- [x] GitHub repository created
- [x] Vercel project deployed
- [x] Domain purchased (staydue.com)
- [x] Supabase project provisioned
- [x] Supabase API keys configured
- [x] Sentry configured
- [x] Resend configured and tested
- [x] Monorepo structure set up
- [x] Next.js app running
- [x] Workspace packages configured
- [x] TypeScript configured
- [x] Tailwind CSS configured
- [x] Basic app shell working

---

## Quick Reference

### Current Status
- ✅ **Infrastructure**: Complete
- ✅ **Services**: Supabase, Sentry, Resend configured
- ⬜ **SMS/Text**: Twilio not set up yet
- ⬜ **Authentication**: Not started
- ⬜ **Database Tables**: Not created
- ⬜ **Marketing Site**: Not built
- ⬜ **Core Features**: Not started

### Next Steps (Priority Order)
1. Implement authentication (email + Google)
2. Design and create database tables
3. Set up Row Level Security
4. Build marketing site (landing, pricing, legal)
5. Create basic app shell with navigation
6. Test everything end-to-end

### Important Links
- **GitHub**: https://github.com/MeronM18/StayDue
- **Vercel**: https://vercel.com (stay-due-web project)
- **Domain**: https://staydue.com
- **Supabase**: https://supabase.com/dashboard
- **Sentry**: https://sentry.io
- **Resend**: https://resend.com

---

## Notes

- All API keys are stored in `.env.local` (gitignored)
- Production keys should be added to Vercel Environment Variables
- Domain verification completed for Resend
- Test email sent successfully to meronmatti123@gmail.com
- App is live and accessible at staydue.com

---

**Last Updated**: Today
**Status**: Foundation complete, ready to start Week 1 coding tasks

