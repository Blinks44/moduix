# Card

Upstream docs:

- Ark UI: https://ark-ui.com/docs/guides/composition
- Ark UI styling: https://ark-ui.com/docs/guides/styling
- Ark UI refs: https://ark-ui.com/docs/guides/ref
- Chakra UI: https://chakra-ui.com/docs/components/card
- shadcn/ui: https://ui.shadcn.com/docs/components/card

Reviewed on 2026-08-09.

## Purpose

`Card` is a standalone moduix surface component.

Ark UI does not ship a dedicated Card primitive, so moduix models it as an Ark-style multipart
component built with `@ark-ui/react/factory` and Chakra's Card anatomy.

## Upstream model to preserve

- Uses the official Ark factory instead of a dedicated Ark primitive.
- Keeps a Chakra-aligned multipart card model centered on root, header, title, description, body,
  and footer.
- Follows Ark composition, styling, and ref guidance: `asChild` for host-element composition,
  `data-scope` / `data-part` hooks for parts, and forwarded refs to rendered elements.
- Keeps Ark-style DOM ownership through `asChild` while leaving card state and workflow logic
  outside the component.

Release comparison:

| Source    | Useful difference                                                                                       | Decision                                                                                              |
| --------- | ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Ark UI    | Factory parts preserve `asChild`, merged props, and rendered-element refs.                              | Required correctness; preserved.                                                                      |
| Chakra UI | `sm` / `md` / `lg` sizes and `elevated` / `outline` / `subtle` variants form a compact recipe contract. | Consumer friction; preserved with independent variant CSS variables.                                  |
| shadcn/ui | A header action, shared spacing hook, and explicit image composition are easy to discover.              | Optional sugar; covered by `CardAction`, `--moduix-card-spacing*`, `CardMedia`, and `CardBackground`. |
| moduix    | A flat part-prefixed API and `CardBody` fit adjacent components better than shadcn's `CardContent`.     | Intentional difference.                                                                               |
| Chakra UI | An `unstyled` prop would create a parallel styling mode.                                                | Rejected complexity; use parts, `className`, and CSS variables instead.                               |

## Current behavior contract

- Public API is flat: `Card`, `CardHeader`, `CardBody`, `CardFooter`, `CardMedia`, `CardBackground`,
  `CardTitle`, `CardDescription`, `CardAction`, and `CardLink`.
- `Card` is the only public root value; every other part is a `Card`-prefixed named export.
- The component keeps the Chakra and shadcn card mental model while renaming shadcn's
  `CardContent` to `CardBody` and keeping every visual part under the `Card` family prefix.
- `Card` defaults `size` to `'md'`.
- `Card` defaults `variant` to `'outline'`.
- `CardTitle` renders `h3` by default and uses Ark `asChild` for heading-level changes.
- All exported parts accept Ark factory props, including `className` and `asChild`.
- Props and variant unions are inferred from the exported values instead of being re-exported as
  duplicate aliases.

## Anatomy and exported parts

```text
Card
├─ CardBackground (optional)
├─ CardMedia (optional)
├─ CardHeader
│  ├─ CardTitle
│  ├─ CardDescription
│  └─ CardAction (optional)
├─ CardBody
└─ CardFooter (optional)
```

Every exported part accepts `className` and keeps stable hooks:

| Part              | `data-slot`        | Notes                                                  |
| ----------------- | ------------------ | ------------------------------------------------------ |
| `Card`            | `card-root`        | Root surface with size, variant, and background.       |
| `CardBackground`  | `card-background`  | Optional decorative full-card media layer.             |
| `CardMedia`       | `card-media`       | Optional edge-to-edge media wrapper with top clipping. |
| `CardHeader`      | `card-header`      | Header grid for title, description, and action.        |
| `CardBody`        | `card-body`        | Main body area with content spacing.                   |
| `CardFooter`      | `card-footer`      | Wrapping footer row for actions or metadata.           |
| `CardTitle`       | `card-title`       | Heading part, defaults to `h3`.                        |
| `CardDescription` | `card-description` | Supporting text under the title.                       |
| `CardAction`      | `card-action`      | Optional trailing header slot.                         |
| `CardLink`        | `card-link`        | Stretched overlay link for cards with nested actions.  |

## Composition

```tsx
import { Button } from '@moduix/react/button';
import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardMedia,
  CardTitle,
} from '@moduix/react/card';

export function CardDemo() {
  return (
    <Card>
      <CardMedia>
        <img alt="Warehouse capacity" src="/warehouse.jpg" />
      </CardMedia>
      <CardHeader>
        <CardTitle>Release health</CardTitle>
        <CardDescription>Summary for the current production rollout.</CardDescription>
      </CardHeader>
      <CardBody>
        <div>
          <strong>98.4%</strong> successful sessions
        </div>
      </CardBody>
      <CardFooter>
        <Button variant="outline">View log</Button>
        <Button>Promote release</Button>
      </CardFooter>
    </Card>
  );
}
```

Use `CardMedia` when leading media should bleed to the card edges with predictable clipping.

Use `CardBackground` for decorative media behind the whole card. It layers the other direct card
children above the background, but leaves overlays and contrast styling to the consumer:

```tsx
<Card>
  <CardBackground>
    <img alt="" src="/forest.jpg" />
  </CardBackground>
  <CardHeader>{/* readable content with consumer-owned contrast styles */}</CardHeader>
</Card>
```

Use `asChild` on the root when the whole card is one link and there are no nested interactive
controls:

```tsx
<Card asChild>
  <a href="/reports/release-health">
    <CardHeader>
      <CardTitle>Release health</CardTitle>
      <CardDescription>Summary for the current rollout.</CardDescription>
    </CardHeader>
    <CardBody>98.4% successful sessions</CardBody>
  </a>
</Card>
```

Use `CardLink` inside `CardTitle` when the card must navigate and still keep nested actions:

```tsx
<Card>
  <CardHeader>
    <CardTitle>
      <CardLink href="/incidents/response">Incident response</CardLink>
    </CardTitle>
    <CardDescription>Owner rotation and escalation readiness.</CardDescription>
    <CardAction>
      <Button variant="outline" size="sm">
        Acknowledge
      </Button>
    </CardAction>
  </CardHeader>
  <CardBody>18 min median response</CardBody>
</Card>
```

Decision guide:

| Situation                                                              | Recommended API                                                                     |
| ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Whole card is one link and there are no nested controls.               | `Card asChild` with an anchor child.                                                |
| Card should navigate and also expose separate buttons or menu actions. | `CardLink` inside `CardTitle`, plus `CardAction` when a trailing control is needed. |
| Card is presentational only.                                           | Plain `Card` composition with no link sugar.                                        |

## Upstream feature coverage

- `Multipart anatomy`: preserved through the exported card parts.
- `Composition`: preserved through Ark factory `asChild` behavior on every part.
- `Dedicated Ark primitive features`: not applicable because Ark has no dedicated `Card` page for
  this wrapper to mirror.
- `Chakra card mental model`: preserved for the root/header/body/footer/title/description surface.
- `Variants`: covered by `elevated`, `outline`, and `subtle`.
- `Sizes`: covered by `sm`, `md`, and `lg`.
- `Within Form`: supported through `Card asChild` with a semantic `form`.
- `With Image`, `Horizontal`, and `With Avatar`: supported through normal child composition and
  consumer layout CSS, with `CardMedia` as the recommended leading-media sugar.
- `Full-card decorative image`: covered by `CardBackground`; consumers own overlays and text contrast.
- `Overlay-link pattern`: intentionally added by moduix through `CardLink` and `CardAction`.

## Accessibility and state

- Exported parts write Ark-style hooks:
  - `data-scope="card"`
  - `data-part="root" | "background" | "media" | "header" | "body" | "footer" | "title" | "description" | "action" | "link"`
- `Card` also writes:
  - `data-slot="card-root"`
  - `data-size="sm" | "md" | "lg"`
  - `data-variant="elevated" | "outline" | "subtle"`
- `Card` is presentational by default.
- Every part forwards an `HTMLElement` ref to its rendered DOM element, including when `asChild`
  changes that element.
- `asChild` requires one semantic child that can accept the merged props and ref.
- `CardMedia` is layout-only sugar and does not create ownership or ARIA relationships.
- `CardBackground` is layout-only sugar for decorative media. Use an empty image alternative text;
  use `CardMedia` when the image itself conveys required information.
- `CardAction` is layout only and does not create ownership or ARIA relationships.
- `CardLink` owns the overlay click target and focus ring for the linked-card stretched-link
  pattern.
- When `Card asChild` renders an interactive anchor, button, role button, or focusable custom
  element, the root owns the same visible focus-ring contract as `CardLink`.
- Card has no managed state, callback details, provider/context API, form context integration,
  `HiddenInput`, or runtime CSS variables because it is not an interactive Ark primitive.

## Defaults and styling

| Part   | Prop      | Default     | Notes                                         |
| ------ | --------- | ----------- | --------------------------------------------- |
| `Card` | `size`    | `'md'`      | Accepts `'sm' \| 'md' \| 'lg'`                |
| `Card` | `variant` | `'outline'` | Accepts `'elevated' \| 'outline' \| 'subtle'` |

Public CSS variables:

| Variable                                | Default/fallback                                                                     | Applies to                    |
| --------------------------------------- | ------------------------------------------------------------------------------------ | ----------------------------- |
| `--moduix-card-action-gap`              | `var(--moduix-spacing-2)`                                                            | `CardAction`                  |
| `--moduix-card-bg`                      | `var(--moduix-color-card)`                                                           | `Card`                        |
| `--moduix-card-spacing`                 | size-specific fallback                                                               | `Card`                        |
| `--moduix-card-spacing-lg`              | `var(--moduix-card-spacing, var(--moduix-card-padding-lg, var(--moduix-spacing-8)))` | `Card`                        |
| `--moduix-card-spacing-sm`              | `var(--moduix-card-spacing, var(--moduix-card-padding-sm, var(--moduix-spacing-4)))` | `Card`                        |
| `--moduix-card-subtle-bg`               | `var(--moduix-color-muted)`                                                          | subtle root                   |
| `--moduix-card-subtle-border-color`     | `transparent`                                                                        | subtle root                   |
| `--moduix-card-subtle-border-width`     | `0`                                                                                  | subtle root                   |
| `--moduix-card-subtle-color`            | `var(--moduix-color-card-foreground)`                                                | subtle root                   |
| `--moduix-card-subtle-shadow`           | `none`                                                                               | subtle root                   |
| `--moduix-card-body-color`              | `var(--moduix-color-muted-foreground)`                                               | `CardBody`                    |
| `--moduix-card-body-font-size`          | `var(--moduix-text-sm)`                                                              | `CardBody`                    |
| `--moduix-card-body-line-height`        | `var(--moduix-line-height-text-sm)`                                                  | `CardBody`                    |
| `--moduix-card-body-padding-top`        | `var(--moduix-spacing-4)`                                                            | `CardBody`                    |
| `--moduix-card-border-color`            | `var(--moduix-color-border)`                                                         | `Card`                        |
| `--moduix-card-border-width`            | `var(--moduix-border-width-sm)`                                                      | `Card`                        |
| `--moduix-card-color`                   | `var(--moduix-color-card-foreground)`                                                | `Card`                        |
| `--moduix-card-description-color`       | `var(--moduix-color-muted-foreground)`                                               | `CardDescription`             |
| `--moduix-card-description-font-size`   | `var(--moduix-text-sm)`                                                              | `CardDescription`             |
| `--moduix-card-description-line-height` | `var(--moduix-line-height-text-sm)`                                                  | `CardDescription`             |
| `--moduix-card-elevated-bg`             | `var(--moduix-color-card)`                                                           | elevated root                 |
| `--moduix-card-elevated-border-color`   | `transparent`                                                                        | elevated root                 |
| `--moduix-card-elevated-border-width`   | `0`                                                                                  | elevated root                 |
| `--moduix-card-elevated-color`          | `var(--moduix-color-card-foreground)`                                                | elevated root                 |
| `--moduix-card-elevated-shadow`         | `var(--moduix-shadow-md)`                                                            | elevated root                 |
| `--moduix-card-footer-gap`              | `var(--moduix-spacing-2)`                                                            | `CardFooter`                  |
| `--moduix-card-focus-ring-color`        | `var(--moduix-color-ring)`                                                           | interactive root / `CardLink` |
| `--moduix-card-focus-ring-offset`       | `var(--moduix-border-width-sm)`                                                      | interactive root / `CardLink` |
| `--moduix-card-focus-ring-width`        | `var(--moduix-focus-ring-width, var(--moduix-border-width-md))`                      | interactive root / `CardLink` |
| `--moduix-card-header-gap`              | `var(--moduix-spacing-1)`                                                            | `CardHeader`                  |
| `--moduix-card-outline-bg`              | `var(--moduix-color-card)`                                                           | outline root                  |
| `--moduix-card-outline-border-color`    | `var(--moduix-color-border)`                                                         | outline root                  |
| `--moduix-card-outline-border-width`    | `var(--moduix-border-width-sm)`                                                      | outline root                  |
| `--moduix-card-outline-color`           | `var(--moduix-color-card-foreground)`                                                | outline root                  |
| `--moduix-card-outline-shadow`          | `none`                                                                               | outline root                  |
| `--moduix-card-padding`                 | `var(--moduix-spacing-6)`                                                            | `Card`                        |
| `--moduix-card-padding-lg`              | `var(--moduix-spacing-8)`                                                            | `Card`                        |
| `--moduix-card-padding-sm`              | `var(--moduix-spacing-4)`                                                            | `Card`                        |
| `--moduix-card-radius`                  | `var(--moduix-radius-lg)`                                                            | `Card`                        |
| `--moduix-card-shadow`                  | `none`                                                                               | `Card`                        |
| `--moduix-card-title-color`             | `currentColor`                                                                       | `CardTitle`                   |
| `--moduix-card-title-font-size`         | `var(--moduix-text-lg)`                                                              | `CardTitle`                   |
| `--moduix-card-title-font-size-lg`      | `var(--moduix-text-xl)`                                                              | `CardTitle`                   |
| `--moduix-card-title-font-size-sm`      | `var(--moduix-text-md)`                                                              | `CardTitle`                   |
| `--moduix-card-title-font-weight`       | `var(--moduix-weight-semibold)`                                                      | `CardTitle`                   |
| `--moduix-card-title-line-height`       | `var(--moduix-line-height-text-lg)`                                                  | `CardTitle`                   |
| `--moduix-card-title-line-height-lg`    | `var(--moduix-line-height-text-xl)`                                                  | `CardTitle`                   |
| `--moduix-card-title-line-height-sm`    | `var(--moduix-line-height-text-md)`                                                  | `CardTitle`                   |

## Intentional sugar and differences from upstream

- Ark UI has no dedicated Card primitive here; moduix uses Ark factory parts and Chakra's Card
  anatomy as the contract reference.
- moduix preserves Chakra's `sm`, `md`, and `lg` sizes plus the `elevated`, `outline`, and `subtle`
  variants. Horizontal layout remains composition-driven CSS rather than a root prop.
- moduix keeps a flat part-prefixed API and intentionally renames `CardContent` to `CardBody`.
- moduix adds `CardMedia` as a narrow leading-media helper and `CardBackground` as a decorative
  full-card-media helper instead of presentation props on the root.
- `CardAction` and `CardLink` remain narrow moduix extensions for header-side actions and the
  stretched overlay-link pattern.

## Agent notes

- Keep the exported part names stable and aligned with the card docs page.
- Preserve `CardMedia` as optional sugar; advanced docs should still show the low-level path without it.
- Preserve `CardBackground` as decorative media only; keep contrast treatments and overlays consumer-owned.
- Preserve the distinction between `Card asChild` for single-link cards and `CardLink` for
  cards that still contain nested actions.
- Keep `CardBody` spacing aligned with the CSS contract; direct child margins remain consumer-owned.

## Local changelog

- 2026-09-21: Replaced the compound `Card.*` value surface with the shared flat API. `Card` is now
  the only root value; every other part uses a `Card`-prefixed named export (`CardHeader`,
  `CardBody`, `CardFooter`, `CardMedia`, `CardBackground`, `CardTitle`, `CardDescription`,
  `CardAction`, `CardLink`).
- 2026-09-07: Stopped resetting margins on arbitrary `CardBody` children; consumer content owns its
  own spacing consistently across all package variants.
- 2026-08-10: Added `CardBackground` for decorative full-card media with stable styling hooks and
  automatic foreground layering; gradients and contrast remain consumer-owned.
- 2026-08-09: Added independent background, foreground, border, and shadow variables for every
  variant, and gave interactive `Card asChild` compositions the same themeable focus-ring
  contract as `CardLink`.
- 2026-07-26: Made every part's public ref polymorphic for `asChild`, added focused root and
  overlay-link regression coverage, and made documentation previews self-contained.
- 2026-07-21: Routed shared dimensions, spacing, icon geometry, and focus-ring fallbacks through foundation tokens so density and theme presets can retune the component consistently.
- 2026-07-09: Added `CardMedia` for predictable edge-to-edge leading media, introduced shared
  `--moduix-card-spacing*` hooks for shadcn-style spacing control, and moved public docs to an explicit
  sweet-path plus advanced-customization split.
- 2026-07-07: Clarified the shadcn migration path, documented the `CardContent` to `CardBody`
  rename explicitly, and tightened the linked-card guidance around `Card asChild` versus
  `CardLink`.
- 2026-07-02: Removed duplicate prop and variant type exports while preserving the callable root,
  every visual part, and the moduix size, variant, action, and overlay-link sugar.
- 2026-06-24: Finalized the Ark factory migration review by aligning public docs with the
  required local-only primitive reference text, removing an unused docs example export, and
  normalizing demo avatar sizing to the standard rem scale.
- 2026-06-18: Completed the Ark factory migration audit: removed the stale legacy registry
  dependency, added Chakra-aligned `lg` sizing and `elevated` / `outline` / `subtle` variants,
  documented all current Chakra Card example categories, and standardized docs previews with
  Code, Styles, and Data tabs.
- 2026-06: Migrated `Card` to an Ark-style multipart API based on `Card`, `CardHeader`,
  `CardBody`, `CardFooter`, `CardTitle`, and `CardDescription`; replaced legacy `render` with
  Ark `asChild`; renamed `CardContent` to `CardBody`; and added Ark-style `data-scope` /
  `data-part` hooks across all parts.