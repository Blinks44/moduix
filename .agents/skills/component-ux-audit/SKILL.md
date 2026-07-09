---
name: component-ux-audit
description: Audit and, when requested, update moduix React components as Ark-first, Chakra-leaning wrappers with narrow shadcn-informed migration guidance. Use for component UX/API reviews, sugar/composition decisions, docs examples, local component docs, and registry-shipped package changes.
---

# Component UX Audit

Use this skill to check whether a moduix component stays Ark-first, gains Chakra-like ergonomics,
and borrows from shadcn only where that helps docs flow or migration clarity without copying shadcn
composition or API shape.

## Task Mode

- If the user asks for an audit, review only and return findings ordered by user impact.
- If the user asks to fix, improve, update, or apply findings, implement narrowly scoped changes and update package/docs/registry surfaces.
- If upstream behavior matters, use `upstream-library-docs` and current online Ark UI, Chakra UI, and shadcn references. Treat Ark as the behavior source, Chakra as the primary ergonomics reference, and shadcn as a secondary migration/examples reference only.

## Audit Prompt Template

When the user names a component, instantiate this template:

```text
Давай проведем аудит пользователя для компонента `component`

- https://ui.shadcn.com/docs/components/base/component
- https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/bases/base/ui/component.tsx

Критерии проверки:
- мы хотим быть что-то между chakra и shadcn, при этом удобнее и интереснее обоих
- пользователю должно быть понятно и удобно пользоваться компонентом
- код компонента и стили не переусложнены
- проверить, стоит ли добавить какой-то сахар или упростить композицию компонента, чтобы пользователю было удобнее перейти с shadcn к нам? Нам не нужно перенимать полный нейминги, делать алиасы и тд, пусть пользователи учатся нашей стилистике, но при этом чтобы им все равно было удобно переезжать к нам
```

Replace `component` in URLs with the shadcn base component slug. If no matching shadcn base exists,
say so and continue from Ark/Chakra/local patterns.

Interpret the template conservatively: the goal is not to land "between Chakra and shadcn" as equal
forces. Bias toward Ark fidelity and Chakra-like ergonomics. Use shadcn only to inspect migration
friction, example readability, and whether a small convenience helper would help users coming from
that ecosystem.

## Review Checklist

- Preserve Ark contracts: anatomy, controlled/uncontrolled state, callback detail objects, refs,
  `asChild`, provider/context hooks, `HiddenInput`, data attributes, and accessibility behavior.
- Prefer Ark/Chakra composition when choosing the recommended moduix path. Only deviate when there is
  a clear local DX win that still feels like a thin Ark wrapper.
- Do not add shadcn-compatible aliases, renamed event props, date/string translators, or hidden state
  machines only to mimic shadcn. Users can learn moduix naming.
- Do not recreate shadcn wrapper structure just because it looks familiar. If Ark or Chakra already
  provides a cleaner mental model, keep that model and add only narrow sugar on top.
- Look for small sugar that removes repeated boilerplate while keeping low-level composition intact.
  Good examples from this session: `DateInput.Segments`, `DatePicker.Field`,
  `DatePicker.RangeField`, and `DatePicker.DayTable`.
- Keep sugar stylable for npm consumers: accept `className` where useful, expose targeted slot props
  when sugar renders nested parts, preserve data attributes, CSS variables, and predictable class hooks.
- Model sugar styling after `DateInput`: convenience parts may assemble lower-level anatomy, but each
  meaningful nested part still needs an intentional styling path through `className`, slot props,
  data attributes, CSS variables, or exported lower-level composition.
- Avoid god components and opaque bundles such as a single prop-heavy component that hides portal,
  positioning, content, parsing, focus, or date math behind configuration.
- Prefer moduix-owned exports for common advanced surfaces. If docs/stories need context, item
  context, or hooks as a normal path, export them through the component namespace/barrel instead of
  teaching users to import `ArkComponent.Context` directly. Direct Ark imports are escape hatches.
- Keep a component's consumer-facing value exports together in one final export statement in its
  implementation file. If a moduix component re-exports an Ark hook, import it there and include it
  in that final export; keep the local `index.ts` as a re-export-only barrel rather than scattering
  exports across both files.
- Make recommended usage the first docs path. Put full low-level composition in a separate example
  titled `Advanced Customization`.
- Check docs example ordering: `Root` or `Basic` first, feature examples alphabetically after that,
  and `Advanced Customization` last. Do not leave `Root` in the middle or at the end.
- Keep code and styles simple. Do not introduce local engines for behavior already owned by Ark/Zag.
- Check stories, package exports, local component markdown, public docs, snippets, and registry output
  whenever behavior, API, styling contract, or recommended usage changes.

## Update Workflow

1. Read the local component implementation, styles, stories, local markdown, docs page, examples, and
   registry entry if present.
2. Compare against current upstream Ark, Chakra, and shadcn references in that order of priority.
   Record differences as:
   keep, simplify, add sugar, document, or reject.
3. Implement only the changes that improve user comprehension, migration ergonomics, or styling
   without weakening Ark contracts.
4. Update docs so the sweet-path example uses the new sugar and `Advanced Customization` shows the
   full composition without sugar.
5. Order docs examples as `Root`/`Basic`, then alphabetized feature examples, then
   `Advanced Customization`.
6. Keep public docs imports on moduix surfaces such as `@moduix/react`; avoid primary examples that
   teach direct Ark imports.
7. Run the validation required by `AGENTS.md` for the files touched. If package source changed,
   build React before typecheck and rebuild registry after validation.

## Output

For audits, return concise findings with file references and recommended actions. For implementations,
summarize changed files, explain any intentional API choices, and list validation commands run.