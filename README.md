# HeloZy landing page

The marketing site for HeloZy (helozy.com). Static Next.js site with GSAP + ScrollTrigger + SplitText and Lenis for the animations. The product itself is a separate repository (`../source`).

```bash
pnpm install
pnpm dev        # http://localhost:3002
pnpm build      # static files in out/
```

- Colours and fonts only through `src/theme/tokens.css` (a copy of the app's tokens plus the dark "Marketing site" block). No hex codes in components.
- Every animation runs inside `gsap.matchMedia()` with `prefers-reduced-motion: no-preference`; without it the page shows its final state.
- Buttons link to the app: set `NEXT_PUBLIC_APP_URL` (default `https://app.helozy.com`).
- Plan and copy: `../marketing/LANDING_PAGE_PLAN.md` (local only).
