---
name: moduix
description: Build or modify applications with moduix components and recipes. Use when adding, composing, installing, updating, or reviewing moduix UI; preserve the project's package-managed or copy-owned ownership model.
---

# moduix

Build from the public moduix docs. Preserve the project's ownership model and keep Ark composition
explicit. The Skills CLI installs this guide for AI agents; the shadcn registry is a separate
distribution channel for component source files. Do not choose package-managed or copy-owned
installation for the user.

## Inspect the project

1. Read existing moduix imports and look for `components.json`.
2. For package-managed code, use the import path documented for each component, usually
   `@moduix/react/<component>`, and load `@moduix/react/style.css` once in the application entry
   point.
3. For copy-owned code, use the project's package runner to run
   `shadcn@latest info --json`. Confirm the `@moduix-react` registry, aliases, installed items, and
   resolved paths before changing files.
4. If neither model is established, ask the user which ownership model to use. Do not initialize
   shadcn only to use package-managed moduix.

## Discover before generating

Read [references/discovery.md](references/discovery.md) for the docs, registry, and recipe lookup
paths.

1. Read the canonical moduix documentation page for the component, recipe, or guide.
2. For copy-owned work, use the project's package runner with `shadcn@latest search @moduix-react --query "<product need>"` and `shadcn@latest view @moduix-react/<item>` before adding an item. Search
   for the interface or workflow; moduix registry items include components, themes, and shared
   support items. Recipes are documentation and are not registry items.
3. Use the configured shadcn MCP server for discovery when available; otherwise use the CLI. Do not
   initialize MCP or change an AI client's configuration unless the user asks. The consumer setup is
   documented at `https://moduix.dev/docs/ai.md`.
4. Prefer documented components and recipes to custom markup when they fit the product need. For a
   recipe, install the registry components it names and connect the application-owned behavior
   yourself.

## Build and review

1. Follow the documented Ark-shaped part tree, callback detail objects, context hooks, form
   behavior, and accessibility contract. Do not invent shadcn-like aliases.
2. Keep package imports and copy-owned imports separate. Preserve the required stylesheet for the
   selected model.
3. Read existing copy-owned files before editing them. Do not overwrite local customizations without
   the user's direction.
4. Before adding a copy-owned registry item, use `shadcn@latest add <item> --dry-run`. Before
   updating an installed item, use `shadcn@latest add <item> --diff [path]`. Never use
   `--overwrite` without explicit approval.
5. Validate the consumer project with its normal typecheck, tests, and accessibility checks.