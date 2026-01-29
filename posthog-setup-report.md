# PostHog post-wizard report

The wizard has completed a deep integration of your Next.js Developer Events application. PostHog analytics has been set up using the recommended `instrumentation-client.ts` approach for Next.js 15.3+, with a reverse proxy configured through Next.js rewrites to improve tracking reliability. Event tracking has been added to key user interaction points throughout the application.

## Integration Summary

- **PostHog JS SDK** installed via npm
- **Client-side initialization** via `instrumentation-client.ts` (Next.js 15.3+ best practice)
- **Reverse proxy** configured in `next.config.ts` for improved ad-blocker bypass
- **Environment variables** set up in `.env` file
- **Exception capture** enabled for automatic error tracking
- **Debug mode** enabled in development environment

## Events Implemented

| Event Name | Description | File |
|------------|-------------|------|
| `explore_events_clicked` | User clicked the 'Explore Events' button to scroll down to the events section | `components/ExploreBtn.tsx` |
| `enter_experience_clicked` | User clicked the main 'Enter Experience' call-to-action button on the homepage | `app/page.tsx` |
| `event_card_clicked` | User clicked on an event card to view event details (includes event_title, event_slug, event_location, event_date properties) | `components/EventCard.tsx` |
| `nav_home_clicked` | User clicked the Home link in the navigation bar | `components/Navbar.tsx` |
| `nav_events_clicked` | User clicked the Events link in the navigation bar | `components/Navbar.tsx` |
| `nav_create_clicked` | User clicked the Create link in the navigation bar | `components/Navbar.tsx` |
| `nav_logo_clicked` | User clicked the logo in the navigation bar to go to homepage | `components/Navbar.tsx` |

## Files Modified

| File | Changes |
|------|---------|
| `instrumentation-client.ts` | Created - PostHog client-side initialization |
| `.env` | Created - Environment variables for PostHog API key and host |
| `next.config.ts` | Modified - Added reverse proxy rewrites and skipTrailingSlashRedirect |
| `components/ExploreBtn.tsx` | Modified - Added PostHog capture for explore button clicks |
| `components/EventCard.tsx` | Modified - Added PostHog capture with event properties for card clicks |
| `components/Navbar.tsx` | Modified - Added PostHog capture for all navigation link clicks |
| `app/page.tsx` | Modified - Added PostHog capture for Enter Experience button |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

### Dashboard
- [Analytics basics](https://us.posthog.com/project/300894/dashboard/1159191) - Main dashboard with all insights

### Insights
- [Event Card Clicks Over Time](https://us.posthog.com/project/300894/insights/yYIceAtv) - Track how many users click on event cards
- [Navigation Engagement](https://us.posthog.com/project/300894/insights/oktIUDhu) - Track navigation clicks across the site
- [CTA Button Engagement](https://us.posthog.com/project/300894/insights/z6Xm8txJ) - Track clicks on main call-to-action buttons
- [Homepage to Event View Funnel](https://us.posthog.com/project/300894/insights/m0LQP9Ak) - Conversion funnel from exploring to clicking events
- [Popular Events by Clicks](https://us.posthog.com/project/300894/insights/mtJB0xdF) - Breakdown of which events receive the most clicks

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/nextjs-app-router/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.
