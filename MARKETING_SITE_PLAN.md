# Marketing Site Implementation Plan

## Overview
This document outlines the complete plan for building the StayDue marketing website, including landing page, pricing page, legal pages, and all necessary components to create a professional SaaS/indie hacker website.

---

## 1. Project Structure & Navigation

### Shared Components
- **Marketing Layout Component**: Shared layout for all marketing pages
- **Navigation Bar**:
  - Logo (StayDue)
  - Navigation Links (Features, Pricing, About)
  - Sign In button
  - Get Started CTA button
- **Footer**:
  - Legal links (Terms, Privacy)
  - Social media links
  - Copyright information
  - Newsletter signup (optional)
- **Mobile Menu**: Responsive hamburger menu for mobile devices

---

## 2. Landing Page (`/`)

### Hero Section
- **Compelling Headline**: Catchy tagline about student task management
- **Subheadline**: Value proposition (automated task tracking with Google Calendar sync)
- **Primary CTA**: "Get Started Free" button (links to sign up)
- **Secondary CTA**: "View Pricing" button
- **Hero Visual**: Illustration or screenshot placeholder showcasing the app

### Features Section
- **4-6 Feature Cards** with icons:
  - Course Management
  - Task Tracking
  - Google Calendar Sync
  - Syllabus Upload & Extraction
  - Due Date Reminders
  - Progress Tracking
- Each card with icon, title, and description

### Social Proof/Testimonials
- Testimonial cards (can start with placeholders)
- Stats display (e.g., "Trusted by X students")
- University logos (optional)

### How It Works Section
- 3-4 step process explaining:
  1. Sign up with Google
  2. Add your courses
  3. Upload syllabi or add tasks manually
  4. Stay organized with calendar sync

### Final CTA Section
- "Ready to stay on top of your assignments?"
- Prominent sign up button

---

## 3. Pricing Page (`/pricing`)

### Pricing Plans Section
- **Free Plan**:
  - Basic features
  - Limited courses/tasks
  - Community support
  
- **Pro Plan** (Highlighted as "Most Popular"):
  - All features
  - Unlimited courses/tasks
  - Priority support
  - Advanced calendar sync
  
- **Enterprise Plan** (Optional):
  - Team features
  - Custom integrations
  - Dedicated support

### Feature Comparison Table
- Side-by-side comparison of all plans
- Clear checkmarks for included features

### Monthly/Annual Toggle
- Option to switch between monthly and annual pricing
- Show savings for annual plans

### FAQ Section
- Common pricing questions:
  - "Can I cancel anytime?"
  - "What payment methods do you accept?"
  - "Do you offer student discounts?"
  - "Can I upgrade/downgrade my plan?"

### Pricing CTA
- "Start your free trial" buttons on each plan card

---

## 4. Legal Pages

### Terms of Service (`/terms`)
- Standard SaaS terms structure:
  - Service description
  - User responsibilities
  - Payment terms
  - Cancellation policy
  - Limitation of liability
  - Last updated date

### Privacy Policy (`/privacy`)
- Comprehensive privacy policy:
  - Data collection practices
  - How data is used
  - Data storage and security
  - Cookie usage
  - User rights (GDPR compliance)
  - Contact information
  - Last updated date

### Design
- Clean, readable layout
- Proper heading hierarchy
- Easy to scan format
- Mobile-friendly

---

## 5. SEO & Meta Tags

### Dynamic Metadata Per Page
- **Title tags**: Unique, descriptive titles for each page
- **Meta descriptions**: Compelling descriptions (150-160 characters)
- **Open Graph tags**: For social media sharing
  - og:title
  - og:description
  - og:image
  - og:url
  - og:type
- **Twitter Card tags**:
  - twitter:card
  - twitter:title
  - twitter:description
  - twitter:image
- **Canonical URLs**: Prevent duplicate content issues

### Structured Data (JSON-LD)
- **Organization schema**: Company information
- **SoftwareApplication schema**: App details for landing page
- **BreadcrumbList**: For navigation structure

### Additional SEO
- **Sitemap generation**: `/sitemap.xml`
- **Robots.txt**: Proper crawl directives
- **Alt tags**: All images have descriptive alt text

---

## 6. Responsive Design

### Breakpoints
- **Mobile**: 320px and up
- **Tablet**: 768px and up
- **Desktop**: 1024px and up
- **Large Desktop**: 1280px and up

### Mobile-First Approach
- Design for mobile first, then scale up
- Touch-friendly buttons (minimum 44x44px)
- Responsive typography
- Responsive images and illustrations
- Test on multiple screen sizes

### Responsive Features
- Hamburger menu for mobile navigation
- Stacked layouts on mobile
- Horizontal layouts on desktop
- Optimized image loading for different screen sizes

---

## 7. Additional Components & Features

### Reusable Components
- **Button Components**: Primary, Secondary, Outline variants
- **Card Components**: Feature cards, pricing cards, testimonial cards
- **Section Components**: Reusable section wrappers

### Interactive Elements
- **Loading States**: For CTA buttons during sign-up flow
- **Smooth Scroll Animations**: Optional, for polish (using CSS or Framer Motion)
- **Hover Effects**: Subtle interactions on buttons and cards

### Optional Features
- **Newsletter Signup Form**: Email collection for marketing
- **Blog Section Link**: Placeholder for future blog
- **Contact Page**: Or contact link in footer

---

## 8. Technical Implementation Details

### Route Structure
```
/                    → Landing page (NEW)
/pricing             → Pricing page (NEW)
/terms               → Terms of Service (NEW)
/privacy             → Privacy Policy (NEW)
/auth/signin         → Existing sign-in (KEEP AS IS)
/dashboard           → Existing dashboard (KEEP AS IS)
```

### Shared Components Location
- `components/marketing/Navbar.tsx`
- `components/marketing/Footer.tsx`
- `components/marketing/PricingCard.tsx`
- `components/marketing/FeatureCard.tsx`
- `components/marketing/CTASection.tsx`

### Styling
- Use Tailwind CSS (already configured)
- **Color Palette**:
  - Primary Blue: `#5aa9e6` (main brand color)
  - Light Blue: `#7fc8f8` (secondary/accent)
  - Background Light: `#f9f9f9` (light backgrounds)
  - Accent Yellow: `#ffe45e` (highlights, CTAs)
  - Accent Pink: `#ff6392` (special accents, highlights)
- Colors are defined in `globals.css` as CSS custom properties
- Use Tailwind classes: `bg-primary`, `text-primary-light`, `bg-accent-yellow`, etc.
- Modern gradients and shadows
- Smooth transitions and animations
- Typography scale for headings

### Page Structure
- Each page should have its own `page.tsx` file
- Use Next.js App Router structure
- Implement proper TypeScript types

---

## 9. Content & Copy

### Landing Page Copy
- **Headline**: Compelling, benefit-focused
- **Value Propositions**: Clear, concise
- **Feature Descriptions**: Action-oriented
- **CTAs**: Action verbs ("Get Started", "Try Free", etc.)

### Pricing Copy
- Clear plan names and descriptions
- Feature lists with benefits
- Pricing transparency
- FAQ answers

### Legal Page Content
- Use standard SaaS legal templates
- **Important**: Must be reviewed by legal counsel before going live
- Include last updated dates
- Make content accessible and readable

### Tone & Voice
- Student-friendly and approachable
- Professional but not corporate
- Clear and concise
- Focus on benefits, not just features

---

## 10. Integration Points

### Authentication Flow
- **Sign Up CTAs**: Link to `/auth/signin` (existing Google OAuth flow)
- **Sign In Button**: Link to `/auth/signin`
- Ensure smooth transition from marketing to app

### Existing Routes
- Keep `/dashboard` and `/auth/*` routes unchanged
- Redirect current `/` sign-in page to new landing page
- Consider creating `/app` route group for authenticated pages (optional)

### Public vs Protected
- All marketing pages should be public (no auth required)
- Dashboard and app routes remain protected

---

## 11. Performance Optimization

### Image Optimization
- Use Next.js `Image` component
- Optimize all images (WebP format where possible)
- Lazy load images below the fold
- Proper image sizing for different viewports

### Code Optimization
- Code splitting for marketing pages
- Lazy load sections below the fold
- Minimize bundle size
- Fast page loads (< 3 seconds)

### Best Practices
- Minimize external dependencies
- Use CSS for animations where possible
- Optimize fonts (already using Next.js font optimization)

---

## 12. Testing Checklist

### Functionality Testing
- [ ] All navigation links work correctly
- [ ] CTAs redirect properly to sign-up flow
- [ ] Pricing page displays correctly
- [ ] Legal pages are accessible
- [ ] Sign-up flow works from marketing pages

### Responsive Testing
- [ ] Test on mobile devices (iPhone, Android)
- [ ] Test on tablets (iPad, Android tablets)
- [ ] Test on desktop (various screen sizes)
- [ ] Test on different browsers (Chrome, Firefox, Safari, Edge)

### SEO Testing
- [ ] Meta tags are correct on all pages
- [ ] Structured data validates
- [ ] Sitemap is accessible
- [ ] Robots.txt is configured correctly

### Performance Testing
- [ ] Page load times are acceptable
- [ ] Images load efficiently
- [ ] No console errors
- [ ] Lighthouse score > 90

---

## Implementation Order

1. **Project Structure & Shared Components**
   - Create marketing layout
   - Build Navbar component
   - Build Footer component

2. **Landing Page**
   - Hero section
   - Features section
   - Social proof section
   - How it works section
   - Final CTA section

3. **Pricing Page**
   - Pricing plans cards
   - Feature comparison table
   - FAQ section

4. **Legal Pages**
   - Terms of Service page
   - Privacy Policy page

5. **SEO Optimization**
   - Add meta tags to all pages
   - Implement structured data
   - Create sitemap
   - Configure robots.txt

6. **Responsive Polish**
   - Mobile optimization
   - Tablet optimization
   - Desktop refinement
   - Cross-browser testing

7. **Final Review**
   - Content review
   - Design polish
   - Performance check
   - User testing (if possible)

---

## Important Notes

- **Keep existing functionality**: Don't break `/dashboard` or `/auth` routes
- **Current `/` page**: Move current sign-in page logic to `/auth/signin` or redirect
- **Legal content**: Templates should be reviewed by legal counsel
- **Placeholder content**: Can use placeholders initially, but replace with real content before launch
- **Future enhancements**: Blog, case studies, detailed feature pages can be added later

---

## Future Enhancements (Post-Launch)

- Blog section for SEO and content marketing
- Case studies or success stories
- Detailed feature pages
- Video demonstrations
- Integration showcase
- User testimonials (real ones)
- Comparison page (vs competitors)
- API documentation (if applicable)

---

**Last Updated**: [Date]
**Status**: Planning Phase
**Next Steps**: Begin implementation with shared components

