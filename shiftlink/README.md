# ShiftLink

A verified shift marketplace connecting Egyptian private hospitals with freelance doctors — replacing chaotic WhatsApp/Telegram shift-posting groups with a structured, filterable, ratings-backed system.

Runs entirely on mock data, no backend required.

## The problem

Private hospitals in Egypt fill open shifts (ICU coverage, radiology on-call, weekend GP shifts) by posting in WhatsApp groups. Doctors miss opportunities buried in group spam, hospitals can't verify who's applying, and pay gets negotiated in DMs.

## The solution

ShiftLink structures the whole flow: hospitals post a shift with specialty, pay, and requirements, doctors browse and apply in one tap, hospitals review verified profiles and confirm, and both sides rate each other afterward to build trust scores.

## Try it

Switch between **Hospital** and **Doctor** in the top-right toggle to see both sides of the marketplace:

- **As a hospital** — post a new shift, review applicants, confirm a doctor, rate them after the shift.
- **As a doctor** — browse open shifts filtered by specialty, apply, track your applications, rate the hospital after a completed shift.

State persists in `localStorage`, so your actions stick around on refresh. To reset to the seed data, clear the `shiftlink_shifts` key in your browser's dev tools.

## Tech stack

| Layer | Choice |
|---|---|
| Frontend | React 19 + Vite |
| State | React hooks + `localStorage` (no backend in this demo) |
| Styling | Plain CSS with a design-token system (no framework) |

This demo intentionally ships without a backend so it's a single `npm install && npm run dev` away from running anywhere. The production version of ShiftLink uses Node.js/Express, MongoDB, and Firebase phone-OTP auth for real hospital and doctor accounts.

## Features

- Shift posting with specialty, pay rate, timing, and free-text requirements
- Specialty-filtered shift feed for doctors
- One-tap apply with simulated push notifications
- Applicant review and one-tap confirm for hospitals
- Two-way post-shift rating (doctor and hospital)
- Urgent-shift badges for shifts within 48 hours

## Run locally

```bash
git clone https://github.com/<your-username>/shiftlink.git
cd shiftlink
npm install
npm run dev
```

Open http://localhost:5173.

## Roadmap

- [ ] Node.js/Express + MongoDB backend
- [ ] Firebase phone-OTP auth for real accounts
- [ ] Admin verification panel for medical licenses
- [ ] In-app messaging between hospital and doctor
- [ ] React Native mobile app

## License

MIT
