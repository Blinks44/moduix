# Alert

`Alert` is a standalone moduix component for inline status, validation, and system messages. It
does not wrap a Base UI primitive and has no built-in dismiss, action, or state management API.
Use normal React composition for icons, links, actions, and additional content.

## Basic usage

```tsx
import { Alert, AlertContent, AlertDescription, AlertTitle } from 'moduix';

export function AlertDemo() {
  return (
    <Alert>
      <AlertContent>
        <AlertTitle>Update available</AlertTitle>
        <AlertDescription>
          Install the latest version when your workflow allows it.
        </AlertDescription>
      </AlertContent>
    </Alert>
  );
}
```

Add an icon only when it helps recognition:

```tsx
<Alert variant="info">
  <AlertIcon>
    <InfoIcon />
  </AlertIcon>
  <AlertContent>
    <AlertTitle>Workspace sync is active</AlertTitle>
    <AlertDescription>Changes are being synced across all connected devices.</AlertDescription>
  </AlertContent>
</Alert>
```

## Parts

| Part               | Element | Slot data attribute             | Purpose                                      |
| ------------------ | ------- | ------------------------------- | -------------------------------------------- |
| `Alert`            | `div`   | `data-slot="alert-root"`        | Root surface, variant, and live-region role. |
| `AlertIcon`        | `span`  | `data-slot="alert-icon"`        | Optional leading visual cue.                 |
| `AlertContent`     | `div`   | `data-slot="alert-content"`     | Text/content column.                         |
| `AlertTitle`       | heading | `data-slot="alert-title"`       | Short message title.                         |
| `AlertDescription` | `div`   | `data-slot="alert-description"` | Supporting message body.                     |

Recommended anatomy:

```text
Alert
├─ AlertIcon (optional)
└─ AlertContent
   ├─ AlertTitle
   └─ AlertDescription
```

Keep extra links or controls inside `AlertContent`:

```tsx
function StorageAlert() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <Alert variant="warning">
      <AlertIcon>
        <InfoIcon />
      </AlertIcon>
      <AlertContent>
        <AlertTitle>Storage is almost full</AlertTitle>
        <AlertDescription>Archive old uploads or upgrade the plan.</AlertDescription>
        <div className={styles.actions}>
          <Button size="sm">Review uploads</Button>
          <Button size="sm" variant="outline" onClick={() => setVisible(false)}>
            Dismiss
          </Button>
        </div>
      </AlertContent>
    </Alert>
  );
}
```

## Public props

### `Alert`

Extends native `div` props.

| Prop        | Type                                                             | Default                                    |
| ----------- | ---------------------------------------------------------------- | ------------------------------------------ |
| `variant`   | `'default' \| 'info' \| 'success' \| 'warning' \| 'destructive'` | `'default'`                                |
| `role`      | native `div` `role`                                              | `'status'`, or `'alert'` for `destructive` |
| `className` | `string`                                                         | -                                          |

`variant` is also written to `data-variant` on the root.

### `AlertIcon`

Extends native `span` props. The component defaults to `aria-hidden="true"`, so do not put
meaningful text in this slot unless you intentionally override the ARIA attribute. SVG children are
sized by `--alert-icon-size` and inherit the slot color.

### `AlertContent`

Extends native `div` props. Use it as the layout wrapper for title, description, and optional
custom content. If `AlertIcon` is omitted, CSS makes the content span the full alert width.

### `AlertTitle`

Extends heading props and renders `h3` by default.

| Prop | Type                                           | Default |
| ---- | ---------------------------------------------- | ------- |
| `as` | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6'` | `'h3'`  |

Use `as` to keep the document outline correct:

```tsx
<AlertTitle as="h2">Billing issue</AlertTitle>
```

### `AlertDescription`

Extends native `div` props. The styles reset margins for the first and last direct child, so
paragraphs or lists can be composed inside without adding extra outer spacing.

## Styling API

Every part accepts `className`. The root exposes `data-variant`, and all parts expose the
`data-slot` attributes listed above for selectors and tests.

The component uses CSS variables from `Alert.module.css`; `theme.css` registers the public
`--alert-*` variables as theme-level overrides. Override variables on the root for one alert or on a
higher scope for a theme.

The built-in semantic variants also read these shared palette tokens:

| Variant       | Shared token          | Default                      |
| ------------- | --------------------- | ---------------------------- |
| `success`     | `--color-success`     | `oklch(0.627 0.194 149.214)` |
| `warning`     | `--color-warning`     | `oklch(0.795 0.184 86.047)`  |
| `destructive` | `--color-destructive` | current theme destructive    |

| Variable                          | Default/fallback                                           | Affects                        |
| --------------------------------- | ---------------------------------------------------------- | ------------------------------ |
| `--alert-bg`                      | `var(--alert-bg-default, var(--color-card))`               | Root background                |
| `--alert-border-color`            | `var(--alert-border-color-default, var(--color-border))`   | Root border color              |
| `--alert-border-width`            | `var(--border-width-sm)`                                   | Root border width              |
| `--alert-color`                   | `var(--alert-color-default, var(--color-card-foreground))` | Root text color                |
| `--alert-gap`                     | `var(--spacing-3)`                                         | Gap between icon and content   |
| `--alert-padding`                 | `var(--spacing-4)`                                         | Root padding                   |
| `--alert-radius`                  | `var(--radius-lg)`                                         | Root radius                    |
| `--alert-shadow`                  | `none`                                                     | Root shadow                    |
| `--alert-content-gap`             | `var(--spacing-1)`                                         | Gap inside `AlertContent`      |
| `--alert-icon-color`              | `var(--alert-icon-color-default, currentColor)`            | Icon slot color                |
| `--alert-icon-offset`             | `0.125rem`                                                 | Icon vertical alignment offset |
| `--alert-icon-size`               | `1rem`                                                     | Icon slot and SVG size         |
| `--alert-title-color`             | `var(--alert-color, var(--alert-color-default))`           | Title color                    |
| `--alert-title-font-size`         | `var(--text-sm)`                                           | Title font size                |
| `--alert-title-font-weight`       | `var(--weight-semibold)`                                   | Title weight                   |
| `--alert-title-line-height`       | `var(--line-height-text-sm)`                               | Title line-height              |
| `--alert-description-color`       | `var(--color-muted-foreground)`                            | Description color              |
| `--alert-description-font-size`   | `var(--text-sm)`                                           | Description font size          |
| `--alert-description-line-height` | `var(--line-height-text-sm)`                               | Description line-height        |

Variant defaults are internal CSS variables derived from `data-variant`:
`--alert-bg-default`, `--alert-border-color-default`, `--alert-color-default`, and
`--alert-icon-color-default`. Override the public variables above instead of depending on those
internal defaults directly. The built-in `success` and `warning` variants derive their accents from
the shared `--color-success` and `--color-warning` tokens.

## UX and accessibility

- `Alert` defaults to `role="status"` for polite announcements.
- `variant="destructive"` defaults to `role="alert"` for assertive announcements.
- Pass `role` explicitly when the message should not use the variant default.
- `AlertIcon` is decorative (`aria-hidden="true"`). Put essential meaning in title or description.
- The component is not interactive by itself and does not manage focus or keyboard behavior. Use
  `Button`, links, or other focusable components inside `AlertContent` for actions.
- Use `AlertTitle as` when the surrounding page needs a heading level other than `h3`.

## Limitations and recommendations

- Use `Alert` for inline messages that remain in the page layout. Use `Toast` for transient
  notifications and a modal dialog for blocking confirmations.
- Avoid stacking many assertive (`role="alert"`) messages; screen readers announce each one.
- Do not rely on `AlertIcon` as the only indicator of severity.
- There is no dedicated action slot by design; compose actions inside `AlertContent`.
- There are no hover, open, checked, disabled, or read-only states because the component is
  presentational.

## Local changelog

- 2026-06: Moved the success and warning accents onto shared `--color-success` and
  `--color-warning` tokens so alert variants use the common palette instead of private color vars.