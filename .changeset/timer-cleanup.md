---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

Timer: CSS Modules drop all 31 `--moduix-timer-*` variables; styles come from foundation tokens, so override a part with a class or a `data-slot` selector.
The time area now uses the `text-2xl` line height instead of `text-sm`, so wrapped rows no longer overlap; it is 12px taller by default. The letter-spacing reset is removed.
`TimerActionTrigger` transitions only its background color, and its disabled styles apply to the native `disabled` state only, without the `aria-disabled` rule.
React and Solid export the Ark part prop types, `UseTimerProps`, `UseTimerReturn`, `UseTimerContext`, and `TimerTickDetails`, as Vue already did.