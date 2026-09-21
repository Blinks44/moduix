# Flat component API migration

## Objective

Migrate every moduix component, styling track, framework adapter, registry source, test, story, and
documentation example to one flat public value API. Complete the migration before releasing the
branch. Do not preserve the old compound API with compatibility aliases.

This is a naming and distribution migration. Do not change component behavior, DOM anatomy,
accessibility, styling defaults, props, events, state ownership, or framework-native mechanics
unless an independently confirmed defect requires a separate fix.

## Target contract

Use these mappings everywhere:

| Previous shape                  | Target value            |
| ------------------------------- | ----------------------- |
| `Accordion` or `Accordion.Root` | `Accordion`             |
| `Accordion.Item`                | `AccordionItem`         |
| `Accordion.ItemTrigger`         | `AccordionItemTrigger`  |
| `Accordion.RootProvider`        | `AccordionRootProvider` |
| `Accordion.Context`             | `AccordionContext`      |
| `Accordion.ItemContext`         | `AccordionItemContext`  |
| `Accordion.useAccordion`        | `useAccordion`          |
| `Accordion.useAccordionContext` | `useAccordionContext`   |

Apply the same rule to every family:

- the family name is the only public root value;
- every other component value is `<Family><Part>`;
- hooks remain top-level `use*` exports;
- context components and providers are ordinary family-prefixed values;
- other static component members become `<Family><Member>` values unless they are conventional
  top-level hooks;
- keep established public type names unless a type is inaccessible or incorrect;
- remove public `<Family>Root` duplicates, static properties, namespace objects, and
  `Object.assign` assembly;
- do not add deprecated aliases, compatibility layers, proxies, or codemod runtime helpers.

Examples after migration:

```tsx
import {
  Accordion,
  AccordionItem,
  AccordionItemBody,
  AccordionItemContent,
  AccordionItemIndicator,
  AccordionItemTrigger,
} from '@moduix/react/accordion';

export function Example() {
  return (
    <Accordion defaultValue={['first']}>
      <AccordionItem value="first">
        <AccordionItemTrigger>
          First item
          <AccordionItemIndicator />
        </AccordionItemTrigger>
        <AccordionItemContent>
          <AccordionItemBody>First content</AccordionItemBody>
        </AccordionItemContent>
      </AccordionItem>
    </Accordion>
  );
}
```

```vue
<script setup lang="ts">
import {
  Accordion,
  AccordionItem,
  AccordionItemBody,
  AccordionItemContent,
  AccordionItemTrigger,
} from '@moduix/vue/accordion';
</script>

<template>
  <Accordion :default-value="['first']">
    <AccordionItem value="first">
      <AccordionItemTrigger>First item</AccordionItemTrigger>
      <AccordionItemContent>
        <AccordionItemBody>First content</AccordionItemBody>
      </AccordionItemContent>
    </AccordionItem>
  </Accordion>
</template>
```

## Completed reference: Accordion

Accordion is the completed end-to-end reference for this migration. Before changing another family,
inspect how the same flat values are represented across these surfaces:

- React and Solid implementations and barrels:
  `packages/{react,react-tailwind,solid,solid-tailwind}/src/components/accordion`;
- native Vue root SFCs at
  `packages/vue/src/components/accordion/Accordion.vue` and
  `packages/vue-tailwind/src/components/accordion/Accordion.vue`, with their sibling parts and
  re-export-only barrels in the same directories;
- behavior tests: `packages/*/tests/accordion.test.*`;
- parity stories: `playgrounds/*/stories/accordion`;
- package registry entries: `packages/*/registry.json`;
- maintainer contract: `packages/react/src/components/accordion/accordion.md`;
- localized public page: `website/docs/{en,fr,ru}/docs/accordion.mdx`;
- runnable React source and native Solid/Vue snippets under
  `website/src/components/examples/accordion` and `website/snippets/accordion`;
- root and package README examples.

Use Accordion as a structural reference, not as code to copy blindly. Preserve each target family's
own Ark parts, props, events, generics, contexts, styling, and tests. In Vue, follow Accordion's
native file shape: the public root lives in `<Family>.vue`, not `<Family>Root.vue`; the barrel exports
that SFC as `<Family>`, and the registry installs the same filename. Ark's internal root primitive may
still be imported under an explicitly upstream-prefixed local name such as `ArkAccordionRoot`.

## Required skills

Follow `AGENTS.md`. Use `engineering-principles` and `component-workflow` for the whole migration,
the applicable framework convention skills for implementation, `rstest-best-practices` for tests,
and `docs-workflow` plus `rspress-localization` for documentation. Use
`component-contract-docs` when a component has maintainer markdown. Use
`research-upstream-libraries` only when an existing name cannot be mapped without understanding the
current Ark part.

## Migration strategy

Migrate one component family at a time across every existing adapter and styling track. Keep each
family internally complete before starting the next one. Do not run a blind repository-wide text
replacement because dotted expressions can refer to Ark primitives, JavaScript properties, CSS
Modules, or unrelated libraries.

Order families by dependency: migrate components imported by other components before their
consumers. Derive the order from real package imports. Accordion is already complete, so start with
the next family in that dependency-aware order and keep the repository buildable after every family.

### Phase 1: inventory and baseline

1. Confirm the worktree state and preserve unrelated changes.
2. Discover component directories from `packages/<framework>/src/components`, package subpath
   exports, registry manifests, playground stories, component-local markdown, website examples,
   snippets, recipes, and all configured locales.
3. Record every current compound member for each family before deleting the assembly object. The
   object may include convenience parts, contexts, providers, hooks, or components not obvious from
   filenames.
4. Identify cross-component imports and produce a dependency-aware migration order.
5. Capture a baseline with the current package tests, package builds, TypeScript, and docs build.

Useful discovery commands:

```bash
rg -n 'Object\.assign\(' packages/*/src/components
rg -n '\b[A-Z][A-Za-z0-9]*\.(Root|RootProvider|Context|Item|Trigger|Content|Control|Indicator|use[A-Z])\b' \
  packages playgrounds website
rg -n "from ['\"]@moduix/(react|react-tailwind|solid|solid-tailwind|vue|vue-tailwind)/" \
  packages playgrounds website
```

Treat these searches as candidate lists, not automatic edit sets.

### Phase 2: migrate one family

For each component family:

1. Inspect all existing React, Solid, and Vue implementations in both styling tracks.
2. Expand the current compound object into an explicit old-to-new value map.
3. Rename the root implementation value to the family name when practical. Export every part,
   provider, context, convenience component, and hook directly under its flat name.
4. Delete `Object.assign` and any namespace assembly. Do not keep `.Root`, `.Item`, or
   `<Family>Root` compatibility exports.
5. Keep component-local `index.ts` files as re-export-only barrels. For Vue, rename the root SFC to
   `<Family>.vue`, export it as `<Family>`, remove the public `<Family>Root` value, and update the
   registry source and target paths. Do not rename Ark's upstream root prop and emit types.
6. Update cross-component imports inside packages. Never reach into another component's private
   implementation file to avoid its public migration.
7. Update behavior tests and consumer fixtures in every affected package. Assertions must stay
   behaviorally equivalent.
8. Update matching stories in every playground without changing their scenario inventory.
9. Update each package registry source item so copied source exposes the same flat API. Add or
   remove registry files only when the actual source graph changes.
10. Update component-local maintainer markdown.
11. Update all public usage for that family:
    - root and package README examples;
    - `website/src/components/examples`;
    - `website/snippets` for every framework;
    - every component page and recipe in every configured locale;
    - imports, JSX or Vue tags, anatomy trees, part tables, prose, RootProvider guidance, and code
      shown inline in MDX.
12. Run focused tests and builds for every changed package before moving to the next family.

### Phase 3: documentation rules

- Keep one shared source snippet per example and reuse it across locales.
- Preserve framework-native state and event syntax while keeping component value names identical.
- Anatomy trees and tables list `Accordion`, `AccordionItem`, and `AccordionRootProvider`, never
  `Accordion.Root` or `Accordion.Item`.
- RootProvider prose uses the flat provider value and top-level hook.
- Do not translate public identifiers in localized prose.
- Keep live previews and copied snippets aligned with the package imports that actually build.
- Do not claim a Vue component is available until its Vue package export and registry item exist.
- Do not update generated `website/docs/public/r/**` files manually.

### Phase 4: registry and distribution

After a source batch is complete:

1. Run `pnpm run build:registry`.
2. Inspect only generated items belonging to migrated source entries.
3. Build every affected public package and inspect declarations for its component subpath.
4. Verify both consumer paths:
   - npm package imports resolve every flat value;
   - shadcn-copied source exposes the same imports without relying on package internals.
5. Keep React, Solid, and Vue implementation source native. The flat API does not authorize a
   shared runtime or generated cross-framework component layer.

## Per-family completion checklist

- [ ] All existing framework and styling variants export the same flat value names.
- [ ] The root is exported only as the family name.
- [ ] Every old static member has an explicit flat counterpart or a documented reason for removal.
- [ ] No `Object.assign`, namespace assembly, static part property, or duplicate root alias remains.
- [ ] Hooks, providers, contexts, convenience parts, and public types remain usable.
- [ ] Cross-component imports use public flat exports.
- [ ] Tests and consumer fixtures pass in every affected package.
- [ ] Story names and scenarios remain in parity across playgrounds.
- [ ] npm and registry source expose the same API.
- [ ] Component-local markdown is updated.
- [ ] React, Solid, and Vue snippets are updated for every documented example.
- [ ] English, Russian, and French pages have matching API coverage and structure.
- [ ] Focused package, Storybook, and documentation checks pass.

## Final repository gates

Run the complete validation only after all families have passed their focused checks:

```bash
pnpm run fmt:fix
pnpm run lint:check
pnpm run tsc:check
pnpm run build:packages
pnpm run check:packages
pnpm run build:registry
pnpm run build:docs
```

Build every affected playground Storybook using its package script. Run all public package test
suites, including Vue packages that already contain the migrated component.

Perform final searches and classify every remaining match:

```bash
rg -n 'Object\.assign\(' packages/*/src/components
rg -n '\b[A-Z][A-Za-z0-9]*\.(Root|RootProvider|Context|Item|Trigger|Content|Control|Indicator|use[A-Z])\b' \
  packages playgrounds website
```

Remaining dotted component names are allowed only for external libraries or an explicitly recorded
non-moduix API. There must be no moduix compound component use in source, declarations, tests,
stories, registries, READMEs, snippets, MDX, or generated registry artifacts.

## Stop conditions and handoff

Stop and report rather than guessing when:

- two current adapters expose different members and tests or Ark behavior do not resolve the
  intended contract;
- a public static member has no clear flat name;
- a Vue generic loses inference after a barrel export change;
- a registry consumer requires a different import surface from the npm package;
- unrelated worktree changes overlap a required file.

Do not hide a blocker with aliases, type assertions, ignored diagnostics, or compatibility wrappers.
The final handoff must list migrated families, removed old names, validation results, any intentional
external namespace matches, and concrete remaining work. Do not call the migration complete while a
moduix compound API or stale documentation example remains.

## Assignment prompt

Give the next agent this instruction together with this file:

> Follow `plans/flat-component-api-migration.md`. Use Accordion as the completed reference. Migrate
> the next dependency-safe component family across every existing framework and styling track,
> including implementation, exports, tests, stories, registries, package and maintainer docs,
> website examples, snippets, and all locales. Remove the old compound API without compatibility
> aliases. Preserve behavior and framework-native mechanics, run the per-family checks, and stop
> after the family is fully green. Do not modify unrelated families.