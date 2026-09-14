# Documentation page types

Use this reference when creating or substantially restructuring a page in `website/docs`. It defines stable information architecture, not a page generator. Keep page-specific sections only when they teach something useful.

## Shared contract

Every localized page has:

1. localized `title` and `description` frontmatter, while public identifiers remain unchanged;
2. a concise introduction that explains purpose and the recommended use case;
3. the same information hierarchy in every configured locale;
4. native source for every shipped framework that supports the example;
5. only verified imports, package paths, registry commands, and public behavior.

Use `groupId="framework"` for framework tabs. Framework-neutral prose, anatomy, accessibility, styling, and conceptual guidance stay outside those tabs. Add a framework tab only after that adapter and the documented API actually ship.

Use Rspress `PackageManagerTabs` for package installation, dependency updates, executable packages, registry CLIs, and skill installation. Give it a manager-neutral `command`, use `dlx` for temporary executables, and keep it inside a framework tab only when the packages or command differ by framework.

## Quick Start

Quick Start is the canonical setup page for the whole library. It keeps four independent choices
separate: shipped framework, CSS Modules or Tailwind, package or shadcn registry, and package
manager. Use this order:

1. state the supported frameworks and the prerequisites for an existing application;
2. explain package-managed and source-owned distribution without coupling either one to a styling track;
3. show the framework package and registry namespaces in one compact matrix;
4. document the package workflow with styling tabs outside framework tabs, including installation,
   the required global stylesheet, one first component, and a concrete verification result;
5. document the registry workflow with styling-specific `components.json`, framework-specific
   registry commands, generated stylesheet setup, one import, and a concrete verification result;
6. keep shared portal layering, styling guidance, troubleshooting, and next steps after both workflows.

Use a component that ships in every documented framework and styling variant. Keep future frameworks
out of commands and tabs until their adapters ship, but describe the surrounding choices so another
adapter can be added without restructuring the page.

## Framework setup pages

Framework setup pages explain where moduix connects to an existing application created with that
framework. Quick Start remains the source of truth for package, registry, and styling details. Use
this order:

1. state the supported moduix runtimes for that framework and the assumed existing setup;
2. add `Choose your setup` with the available runtime, styling, and distribution choices, then link
   to the exact Quick Start sections that own their shared configuration;
3. show the shortest package integration with the correct application entry point, global stylesheet,
   and one component import;
4. show only the registry-specific alias, bundler, RSC, island, SSR, or generated-style steps that
   differ for this framework, while offering every shipped styling namespace;
5. explain the framework-specific rendering boundary, hydration, route, or client directive near the
   code it affects;
6. finish with a concrete verification checklist and official framework references.

Use the same top-level heading sequence in every framework guide. Keep runtime tabs only on guides
that genuinely support multiple shipped runtimes. Do not duplicate `components.json`, token, reset,
or Tailwind setup from Quick Start unless a framework requires a different value or file location.

## Component pages

Read [the component-page contract](component-pages.md) for the full structure. Its canonical order is:

1. `API Reference`
2. `Choosing the right component`, only when close alternatives exist
3. `Basic`
4. `Install with shadcn`, when applicable
5. `Anatomy`
6. `Composition`, only for a meaningful choice
7. `Examples`
8. `Styling`, when the public styling contract is meaningful

Accordion is the current structural reference. It is not the source of truth for which frameworks or styling variants ship.

## Utility pages

Use this structure for Ark utilities that are not moduix components:

1. `API Reference` with the exact upstream Ark UI page and a compact import example for every shipped framework;
2. a recommended basic use case with one live preview when rendering or interaction helps understanding;
3. native framework source tabs for each applicable preview;
4. additional usage sections only for distinct behavior, configuration, lifecycle, accessibility, or integration concerns.

Keep utility pages concise. Do not reproduce the upstream prop table or every example. Explain the local happy path, important constraints, and the boundary between Ark behavior and application-owned behavior.

Use `ExampleFrame variant="component"` for a displayed example. Wrap its content in `<PreviewFrame maxWidth="sm">` by default because utilities do not need a full-width canvas. Choose another existing size only when the example itself requires it and keep the choice consistent across locales. Source-only examples do not need an empty visual preview.

## Collection pages

Use this structure for Ark collection APIs that manage data without owning the complete interface:

1. `API Reference` with the exact upstream Ark UI page and a compact import example for every shipped framework;
2. a recommended basic use case with one live preview when rendering helps explain the data contract;
3. native framework source tabs for each applicable preview;
4. focused usage sections for distinct concerns such as item mapping, asynchronous loading, selection, querying, traversal, filtering, or immutable updates;
5. `API essentials` only when a compact configuration, state, or action summary helps readers choose the right API;
6. integration and accessibility guidance that clearly separates collection-owned data behavior from application-owned or component-owned interaction.

Prefer the Ark UI collection entry point when documenting an API that consumers use directly. If Moduix re-exports a helper as part of a component contract, explain that relationship and let component-based examples use the matching Moduix entry point.

Do not reproduce every upstream method or example. Teach the basic data model, the operations needed for common integration, and the state or lifecycle constraints that are easy to misuse. Keep framework differences next to the code or API shape they affect.

Use `ExampleFrame variant="component"` for a displayed example and wrap its content in `<PreviewFrame maxWidth="sm">` by default. Collection examples are data-focused and should not expand to the full documentation canvas. Choose another existing size only when the rendered interface genuinely needs it and keep the choice consistent across locales.

List Collection is the current structural reference. It is not the source of truth for which collection APIs or framework adapters ship.

## Form pages

Form documentation has two related page types.

The Forms overview uses this order:

1. `Choose an approach` with native forms first and form libraries only for state or validation needs that justify them;
2. `Framework support` that distinguishes multi-framework libraries from framework-specific integrations;
3. core composition and native form participation rules;
4. one complete native form with source for every shipped framework;
5. validation, reset, submission, repeated-field, and server-error guidance only to the depth shared by every approach.

A form-library integration guide uses this order:

1. framework availability and installation through `PackageManagerTabs`;
2. the smallest complete mapping between library field state and Moduix controls;
3. validation and reset behavior;
4. one complete form with native source for every framework supported by both the library and Moduix;
5. concise guidance for repeated fields, server errors, focus, and behavioral constraints.

Keep framework support truthful. A framework-specific library page must state that constraint near the beginning and must not show empty or fictional tabs for other adapters. Link readers to a real alternative when another shipped framework needs the same capability.

Keep responsibilities explicit: the form library owns application state, validation timing, and submission lifecycle; Moduix owns the visible controls, field semantics, and required native form parts. Do not register or render a second hidden input for a value already supplied by a Moduix component.

Use `groupId="framework"` for framework installation and source tabs. Put shared prose and shared styles outside those tabs. The documentation preview may render the React source, but say so and provide native source for every other supported shipped framework.

Wrap complete form previews in `<PreviewFrame maxWidth="sm">` by default. Forms are narrow reading and input flows, so they should not expand to the full documentation canvas. Reuse one example stylesheet across framework snippets when their visual contract is the same.

Forms is the current overview reference. Formisch is the current multi-framework integration reference. Neither page determines which adapters a third-party form library supports.

## Guides

Guides share a decision flow, not one rigid list of headings. Use this order as the common backbone:

1. state the outcome and the recommended default near the beginning;
2. help readers choose the correct scope, ownership layer, installation path, or API before showing details;
3. present the smallest complete setup or workflow;
4. keep framework-specific imports, source, and runtime mechanics in `groupId="framework"` tabs;
5. explain the page-specific edge cases that can invalidate the basic setup;
6. finish with a compact verification checklist, troubleshooting table, or next-step links when they add practical value.

Keep the sections that belong to the guide's purpose:

- system styling guides such as Animations, Dark mode, and Styling lead with the styling track and scope of the change, then show tokens, classes, or attributes at the layer that owns them;
- composition guides progress from shipped parts to re-exports, focused product wrappers, and external state, in that order;
- environment and localization guides such as RTL start with platform-level configuration, then provider setup, component integration, portal behavior, and a release checklist;
- update guides branch first by distribution method, then by shipped framework and styling adapter, and end with application-level verification.

Do not add framework tabs to CSS, HTML, commands, or conceptual prose that is genuinely shared. Do not make React the conceptual default because the documentation application renders React previews. When a guide includes a live preview, label its runtime honestly, provide native source for every applicable shipped framework, and choose the narrowest existing `PreviewFrame` size that preserves the lesson. A focused control or surface normally uses `maxWidth="sm"`. A comparison gallery whose grid benefits from the full canvas may omit `PreviewFrame`; Animations is the current example.

Animations is the reference for a system styling guide, Composition Patterns for API ownership, RTL for environment setup, and Update and migration for distribution workflows. These references establish information flow, not identical headings.

## Recipe pages

Recipes are application-owned compositions assembled from shipped components. They demonstrate a complete product pattern, but they are not new components exported by moduix.

Use this structure:

1. state the product outcome, when the recipe fits, and the boundary between the copied composition and application-owned logic;
2. show one complete live preview before the source;
3. provide native source for every shipped framework that supports the recipe in `groupId="framework"` tabs, followed by shared styles outside those tabs;
4. provide the registry installation and any extra dependencies through `ShadcnInstall`, `ShadcnInstallOptions`, or `PackageManagerTabs` without hardcoded package-manager commands;
5. explain the smallest integration step for routes, data, authentication, uploads, or other product logic owned by the application;
6. finish with only the customization, responsive, accessibility, motion, and production-state guidance that is specific to the recipe.

Label the documentation runtime honestly: `ExampleFrame` currently renders the React source, while the source tabs contain native implementations for the other supported shipped frameworks. Keep one framework-neutral stylesheet when the visual contract is shared. Do not place styles, fixtures, or conceptual prose inside framework tabs.

Use `ExampleFrame variant="recipe"` for the preview. A recipe may use the full documentation canvas when its layout, spatial relationships, or responsive shell are part of the lesson. Wrap narrow flows such as authentication forms in `<PreviewFrame maxWidth="sm">`; keep that width consistent across locales.

Keep framework availability truthful. When an essential third-party dependency supports only one shipped framework, state the limitation near the beginning, show only the real implementation, and point other frameworks to the closest shipped or framework-neutral path. Do not create fictional parity by transliterating framework-specific hooks or types.

Recipes is the overview reference. App Header and Sign in are the current references for a full-width application composition and a narrow product flow. Data Table is the reference for a multi-framework third-party integration with framework-specific packages and runtime APIs.