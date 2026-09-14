# Framework-support contract

Read this reference when a supported runtime becomes public or its coverage changes across moduix
documentation. Use `website/docs/en/docs/quick-start.mdx` as the canonical reference for runtime,
styling, distribution, and package-manager choices. Component pages use Accordion as their
structural reference and link to Quick Start instead of repeating its full setup.

## Establish the shipped contract

Verify the framework package and registry rather than copying another framework's instructions:

- public package name, peer dependencies, subpath exports, style and preset exports;
- registry namespace, generated file aliases, framework-specific dependencies, and client/SSR rules;
- whether CSS Modules and Tailwind variants have the same component coverage;
- native syntax differences such as `className`/`class`, state APIs, refs, and framework directives.

Do not describe a planned package or incomplete styling track as fully available. Keep the React
implementation of the documentation site separate from the runtimes the library supports.

## Model current and future frameworks

moduix is multi-framework by design. React and Solid adapters ship today; Vue and Svelte are planned.
Shared prose and workflows must speak about framework adapters without implying that the current set
is permanent. Availability claims, tabs, commands, and examples must include only adapters verified
against current packages and registries.

When an adapter ships, add it to the runtime choice and affected pages without changing the surrounding
information architecture. Do not make React the permanent conceptual owner merely because the Rspress
application uses React.

## Keep choices distinct

Documentation may vary across four independent axes:

| Axis            | moduix choices                 |
| --------------- | ------------------------------ |
| Runtime         | Any shipped framework adapter  |
| Styling         | CSS Modules or Tailwind        |
| Distribution    | npm package or shadcn registry |
| Package manager | npm, yarn, pnpm, bun, or deno  |

Use neutral prose for shared behavior and show variants only where commands, imports, source, or
runtime behavior differ.

- Use Rspress `Tabs` with the same `groupId="framework"` for framework-specific code and commands on one
  page. Do not add a custom global framework store or header switcher.
- Use `PackageManagerTabs` for every package, dependency, executable, registry CLI, or skill installation command. Keep it inside the selected framework tab when the command differs by framework; it owns only package-manager syntax.
- Introduce styling choice separately. Do not imply npm means CSS Modules or shadcn means Tailwind.
- Keep shared anatomy, accessibility, tokens, themes, and ownership guidance outside runtime tabs.

## Review the affected surfaces

When the framework change reaches them, update the equivalent page in every configured locale:

1. Homepage route frontmatter in `website/docs/<locale>/index.mdx`, site metadata, lead copy, and
   framework availability indicator.
2. Introduction package matrix, ownership model, and styling model.
3. Components index scope and honest component availability.
4. Migration guide imports, registry commands, native state examples, and styling guidance.
5. Themes package and registry imports; theme behavior itself stays framework-neutral.
6. Tokens style/reset entrypoints; the token contract stays framework-neutral.
7. Quick Start peer dependencies, package imports, registry namespaces, generated paths, and
   framework-specific client/SSR notes.

Also inspect framework-specific installation pages, navigation, reusable MDX components,
`i18n.json`, and site metadata. Change them only when the new framework makes their current claim
incomplete.

Quick Start owns the reusable installation mechanics. Framework setup pages link to those mechanics
and document only the integration points that change for the framework, such as entry files, aliases,
RSC boundaries, island directives, SSR behavior, and hydration checks. Every setup page must still
make the available runtime, styling, and distribution choices explicit before narrowing to its
framework-specific steps.

## Examples and previews

Keep one source-language copyable example per shipped runtime. Locale pages reference the same source or
keep inline code byte-identical across languages. Do not translate identifiers or example UI copy.

Rspress renders the documentation application with React. A React-powered visual preview may
represent a shared visual contract, but do not label it as a native preview for another framework.
Add another runtime preview only through an established build path; do not introduce a compatibility
adapter for ordinary documentation work.

## Verification

- Compare heading order, commands, package names, registry namespaces, and claims across locales.
- Check every runtime/styling combination when a page teaches package or registry entry points.
- Search the affected surfaces for stale single-framework wording.
- Validate public commands and imports against package exports and registry manifests.
- Run the documentation build, then complete the repository checks required by `AGENTS.md`.