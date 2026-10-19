# MilaanSutra product design brief

MilaanSutra is a premium Indian matrimony app. The product is about meaningful compatibility, family participation, privacy, and trust.

The screen at `src/app/index.tsx` is temporary scaffolding. It is not the approved design. Do not treat it as a visual reference.

## Brand

The interface should feel elegant, warm, sophisticated, culturally relevant, and modern. Use strong typography, intentional spacing, clear hierarchy, refined components, and carefully composed layouts.

Approved palette:

| Role | Name | Hex |
|---|---|---|
| Primary brand | Burgundy | `#7A1638` |
| Primary background | Ivory | `#FFF8F0` |
| Secondary accent | Rose | `#E8A5B1` |
| Soft surfaces | Blush | `#F8EAE9` |
| Restrained accent | Teal | `#2B685B` |
| Subtle premium accent | Champagne | `#D4AF72` |

Avoid generic SaaS templates, generic dating-app styling, excessive pink, indiscriminate gradients, glassmorphism, unnecessary decoration, and repetitive card layouts.

There is no approved logo in the repository. `assets/images/` and `assets/expo.icon/` contain Expo and React starter artwork only. Do not draw, generate, or substitute a logo. Wait for the approved asset.

## What to replace later

Replace these when the first approved screen is implemented. Do not restyle them ahead of that approval.

- `src/constants/theme.ts` — scaffolding palette (`paper`, `ink`, `accent` `#8C3A3A`, and the rest). It does not match the palette above.
- `src/app/index.tsx` — phone-only form, Georgia “Milaan” wordmark, maroon button, and the “code screen comes next” message. The real sign-in screen includes email/password, Google, and phone, and it waits for its own approved mockup.
- `app.json` — display name `MilaanApp`, splash background `#F3EEE6`, Android icon background `#E6F4FE`, and the Expo icon and splash image paths.
- `assets/images/*` and `assets/expo.icon/` — starter icons, not brand assets.

Keep the current architecture: Expo Router screens in `src/app/`, shared tokens in `src/constants/theme.ts`, and network calls only in `src/lib/api/`. `requestPhoneOtp` stays the phone-auth seam. Do not add backend behavior while building screens.

## How a screen gets built

1. You describe that one screen.
2. A high-fidelity mockup is produced and reviewed outside this implementation step.
3. You approve the design.
4. The app is updated to match that approved reference only.
5. The screen is tested before the next one starts.

Do not invent missing requirements. Do not redesign an approved screen without permission. If a requirement is genuinely ambiguous, ask before coding.

Out of scope until you explicitly request them: homepage, discovery, swipe, chat, and settings.

## Onboarding sequence

Onboarding is the first phase. These groups are the working order. They are not approval to build the screens.

Sign-in sits before the numbered steps. It offers account creation and sign-in with email/password, Google, and phone.

The progress indicator then counts six steps:

1. **Who the profile is for** — the user, or a family member. This comes first because later copy depends on it.
2. **Personal details and date of birth.**
3. **Contact information.**
4. **Religion, community, and regional details** — one cultural step, not three screens, unless an approved mockup splits it.
5. **Education and occupation.**
6. **Biography and profile photographs.**

Each numbered group is one screen until its own brief says otherwise.

## Adding an approved screen

- Put the route in `src/app/`. Keep components, tokens, and API calls outside that folder.
- Read colors, spacing, and type from `src/constants/theme.ts`. When an approved screen introduces a value, add it there. Do not leave one-off hex values in the screen.
- Build a shared component only when an approved design repeats a control, or when a second screen needs the same one.
- Keep the layout usable on a phone width in the browser and on device. Forms must stay reachable with the keyboard open. Text and controls need accessible contrast. Back and forward behavior stays consistent with screens already approved.
- Screens call functions in `src/lib/api/`. Use mock data or the existing local fallback. Do not invent endpoints, persistence, or auth providers while implementing a screen.
- Match the approved mockup. Where the mockup is silent, use the palette and the rules in this brief, and ask if the gap changes the layout.
