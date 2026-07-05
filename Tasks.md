# Booking Calendar + Google Calendar Auth Tasks

## Summary

Replace the zcal experiment with a native Markosh booking flow: static Astro page, small React scheduler island, and server-side Google Calendar API calls through Cloudflare Pages Functions. The UI must stay monochrome, fast, and fully brand-matched.

## Key Changes

- Build `/book-a-call` as a static Astro page with a native calendar section: meeting details, month picker, date grid, time slots, booking questions, and confirmation state.
- Add a small `BookingScheduler` React island only for interactivity; do not load zcal, iframe schedulers, Calendly, Google frontend scripts, or other third-party scheduler UI.
- Use Cloudflare Pages Functions for:
  - `GET /api/booking/availability?date=YYYY-MM-DD`
  - `POST /api/booking/create`
- Use Google Calendar API server-side only:
  - `freeBusy.query` to calculate blocked times.
  - `events.insert` with `conferenceData.createRequest` to create Google Meet.
  - `sendUpdates=all` so both host and guest receive invites.
- Add a local auth helper script that prints a Google OAuth refresh token without writing secrets to tracked files.

## Calendar Section Design

- Match the existing Markosh visual system: off-white page, white content panels, dark ink CTA, monochrome accents, 8-12px radius where appropriate, no blue Google styling.
- Desktop layout: left panel for meeting context and trust notes, right panel for calendar/date/time/form workflow.
- Mobile layout: single-column step flow: date, time, details, confirm.
- Default meeting rules:
  - Duration: 30 minutes.
  - Availability window: Monday-Friday, 9:00 AM-1:00 PM `America/New_York`.
  - Slot interval: 30 minutes.
  - Buffer: 15 minutes after each meeting.
  - Minimum notice: 12 hours.
  - Booking window: next 30 days.
  - Visitor sees times in their local browser timezone.
- Booking questions:
  - Name
  - Work email
  - Company
  - Company website
  - What would you like to discuss?
  - Timeline
  - Additional context
- Confirmation view shows selected date/time, Google Meet expectation, and "calendar invite sent" messaging.

## Auth Script

- Add `scripts/google-calendar-auth.mjs`.
- Inputs: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, optional redirect URI defaulting to `http://localhost:8787/oauth/callback`.
- Scopes:
  - `https://www.googleapis.com/auth/calendar.events`
  - `https://www.googleapis.com/auth/calendar.freebusy`
- Script flow:
  - Prints Google OAuth URL.
  - User opens it, approves access, and pastes the returned code.
  - Script exchanges code for tokens.
  - Script prints `GOOGLE_REFRESH_TOKEN`.
  - Script does not write secrets by default.
- Required deployment secrets:
  - `GOOGLE_CLIENT_ID`
  - `GOOGLE_CLIENT_SECRET`
  - `GOOGLE_REFRESH_TOKEN`
  - `GOOGLE_CALENDAR_ID=primary`
  - `BOOKING_HOST_NAME=Markosh`
  - `BOOKING_HOST_EMAIL=business@markosh.com`

## Test Plan

- Run `npm run type-check`.
- Run `npm run build`.
- Verify `/book-a-call` renders without loading third-party scheduler scripts.
- Test availability API with mock Google responses for busy slots, empty calendar, and fully booked day.
- Test booking API validation: missing fields, invalid email, unavailable slot, and valid booking.
- Test successful event payload includes attendee, Google Meet creation, custom answers in description, and `sendUpdates=all`.
- Browser-check desktop and mobile layouts for no overlap, clean wrapping, and accessible focus states.

## Assumptions

- Implementation targets Cloudflare Pages with Pages Functions while preserving static Astro rendering for the public page.
- OAuth refresh token is for the owner's Google account, not a service account.
- Secrets are never committed.
- The first version does not support rescheduling, cancellation, payment, multi-host routing, or multiple meeting types.
