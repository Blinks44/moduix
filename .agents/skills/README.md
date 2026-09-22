# moduix Project Skills

Local agent skills for maintaining the multi-framework `moduix` package family, registries, playgrounds, and docs. React and Solid adapters ship today; the Vue adapter is in development and Svelte adapters are planned. General skills discover the adapters that actually exist instead of treating the current package count as permanent.

The library is Ark-backed and actively developed. Skills should preserve current behavior and the
documented target public contract, keep package/docs/registry output aligned, and remove stale
instructions when behavior changes.

The target public value API is flat in every framework and styling track. Export the root as the
family name, other parts with the family prefix, and hooks as top-level functions. For example:
`Accordion`, `AccordionItem`, `AccordionItemTrigger`, `AccordionRootProvider`, `AccordionContext`,
and `useAccordion`. Skills must not introduce compound `Component.Part` APIs, namespace objects,
`Object.assign` assembly, or duplicate `ComponentRoot` aliases.

The React and Solid flat-API migration is complete. Flat names are the existing repository contract.
The current temporary rollout is the native Vue adapter, which implements that contract directly.

Skills are intentionally narrow and composable:

- `AGENTS.md` owns routing, repo-wide rules, and validation.
- Each skill owns one technical surface; it links to adjacent skills instead of copying their rules.
- Conditional details live in `references/`, not in every task's initial context.
- Framework-specific convention skills stay narrow. Add a native skill when a new adapter enters
  development; do not teach future Vue or Svelte mechanics inside React or Solid skills.
- Finite repository migrations live in the gitignored local `plans/` directory, reference permanent
  skills for implementation, and are deleted after their completion condition is met. Plans are not
  repository documentation and must not be committed.

## Skills

- `engineering-principles`: baseline behavior for all coding work.
- `changeset-workflow`: an explicitly requested `.changeset` entry.
- `component-workflow`: coordinates component contracts across every shipped framework and styling adapter.
- `conventions-css`: CSS, CSS Modules, Tailwind, selectors, and public CSS-variable contracts.
- `conventions-react`: React and TypeScript implementation conventions.
- `conventions-solid`: Solid and TypeScript implementation conventions.
- `conventions-vue`: Vue and TypeScript implementation conventions for the in-development Vue adapter.
- `component-contract-docs`: maintainers' markdown beside a component source file.
- `research-upstream-libraries`: current Ark UI, Chakra UI, and shadcn research.
- `rstest-best-practices`: Rstest configuration and test design.
- `rslib-best-practices`: Rslib configuration, outputs, and build troubleshooting.
- `docs-workflow`: localized MDX, page-type structure, framework synchronization, previews, package-manager-neutral commands, CSS-variable references, and registry guidance in `website`.
- `rspress-best-practices`: Rspress configuration, navigation, search, assets, deployment, and debugging.
- `rspress-custom-theme`: the Rspress visual shell, theme variables, slots, wrappers, and ejection.
- `rspress-description-generator`: description frontmatter and search/AI metadata.
- `rspress-localization`: locale structure, translated MDX, runtime text, parity, and localization review.

## Source Of Truth

Use `AGENTS.md` in the repo root as the source of truth for skill routing, global repository rules,
and required validation. Keep individual skills focused on their own workflow instead of repeating
the same validation matrix.