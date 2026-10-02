# Release validation

Discover the public adapters from `packages/` and validate every shipped framework and styling
variant. React, Solid, and Vue currently provide the same 87-component catalog; Svelte is planned.

Before publishing packages or deploying release documentation, run from the repository root:

```sh
pnpm install --frozen-lockfile
pnpm run fmt:check
pnpm run lint:check
pnpm run tsc:check
pnpm run test
pnpm run build:packages
pnpm run check:packages
pnpm run build:registry
git diff --exit-code -- website/docs/public/r
pnpm run build:docs
pnpm --filter './playgrounds/*' run build:storybook
```

Commit regenerated registry artifacts before the registry diff check. Check the English, Russian,
and French setup, component, form, and recipe pages in the production documentation build.
The documentation site's interactive previews use React; Solid and Vue tabs show native source.

## Vue upstream gates

With Ark Vue 5.39.2, JavaScript compilation can exit successfully while declaration emission reports
TS2883 and omits `Select.vue.d.ts`. Both Vue package checks explicitly require a declaration for
every authored SFC. Do not bypass this check or publish the incomplete artifacts.

The isolated [Select reproduction](reproductions/ark-vue-select/README.md) uses the same
Rslib/Rsbuild toolchain without Moduix. A [public StackBlitz reproduction](https://stackblitz.com/edit/stackblitz-starters-dsdggvv6?file=README.md&view=editor)
also reproduces the same declaration diagnostics without Rspack.
[Ark PR #4118](https://github.com/chakra-ui/ark/pull/4118)
fixes context and slot typing, but explicitly does not address this declaration error.
The remaining declaration failure is tracked in [Ark issue #4156](https://github.com/chakra-ui/ark/issues/4156).

The Vue test suites currently pass with 31 CSS Modules and 34 Tailwind cases skipped for documented
Ark/Zag gaps. These include direct-upstream diagnostics as well as unavailable wrapper behavior;
a green test command is not evidence that those contracts work. Review every `test.skip` in both
Vue test directories, not only Select, Highlight, and JsonTreeView. PR #4118 does not claim to fix
these runtime gaps.

When the relevant Ark fixes are released:

1. Update the matching Ark dependencies and verify the isolated reproduction, including `check`.
   Set the Vue packages' minimum Ark peer version to the verified fixed release so consumers cannot
   install an older version with known defects. Align the supported-version tables in all locales.
2. Rebuild both Vue packages and require both package contract checks to pass.
3. Review the version-specific upstream notes in Vue tests and component pages, particularly
   Highlight attribute forwarding and JsonTreeView reactive data and controlled state. Remove
   skipped tests or warnings only after verifying the advertised behavior in both styling variants.
4. Repeat the complete release validation above. Waiting for a new Ark version alone does not
   establish that these independent defects are resolved.

Every root `publish:<adapter>` workflow builds and validates its package before publication.
`changeset:release` builds and validates every shipped package. This checklist does not publish or
deploy anything automatically.