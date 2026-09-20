# Tabs (Solid)

`Tabs` is the styled Solid wrapper around Ark UI Solid Tabs for switching between mutually
exclusive content panels.

## Public contract

`Tabs` is the short root form and is equivalent to `Tabs.Root`. Compose the Ark parts explicitly:

```tsx
import { Tabs } from '@moduix/solid/tabs';

export function Example() {
  return (
    <Tabs defaultValue="account">
      <Tabs.List>
        <Tabs.Trigger value="account">Account</Tabs.Trigger>
        <Tabs.Trigger value="password">Password</Tabs.Trigger>
        <Tabs.Indicator />
      </Tabs.List>
      <Tabs.Content value="account">Account settings</Tabs.Content>
      <Tabs.Content value="password">Password settings</Tabs.Content>
    </Tabs>
  );
}
```

The namespace exposes `Root`, `RootProvider`, `Context`, `List`, `Trigger`, `Indicator`, and
`Content`, together with `useTabs` and `useTabsContext`. `RootProvider` accepts the accessor
returned by `useTabs()`; read context values as `tabs().value`.

## Behavior and composition

Ark owns controlled and uncontrolled state, `onValueChange(details)`, focus management, keyboard
navigation, ARIA relationships, disabled triggers, `activationMode`, `orientation`, `loopFocus`,
`deselectable`, `lazyMount`, `unmountOnExit`, `ids`, and `navigate`.

Use Solid's render-function form of `asChild` for custom trigger hosts:

```tsx
<Tabs.Trigger
  value="account"
  asChild={(props) => (
    <a {...props()} href="#account">
      Account
    </a>
  )}
/>
```

Use `Tabs.RootProvider` when state is created outside the tree:

```tsx
const tabs = useTabs({ defaultValue: 'account' });

<Tabs.RootProvider value={tabs}>
  {/* the same Tabs.List, Tabs.Trigger, Tabs.Indicator, and Tabs.Content parts */}
</Tabs.RootProvider>;
```

`variant="default"` uses the filled indicator treatment. `variant="line"` uses an underline for
horizontal tabs; vertical tabs intentionally keep the filled treatment. `Tabs.RootProvider` resolves
this vertical fallback from the Ark `data-orientation` root DOM hook exposed by the `useTabs()` state;
if upstream ever drops the attribute, the regression tests catch it. `Tabs.List` does not
render an indicator automatically.

## Anatomy and styling hooks

| Part                 | `data-slot`          |
| -------------------- | -------------------- |
| `Tabs` / `Tabs.Root` | `tabs-root`          |
| `Tabs.RootProvider`  | `tabs-root-provider` |
| `Tabs.List`          | `tabs-list`          |
| `Tabs.Trigger`       | `tabs-trigger`       |
| `Tabs.Indicator`     | `tabs-indicator`     |
| `Tabs.Content`       | `tabs-content`       |

Every visual part accepts `class` and keeps the corresponding Ark `data-scope`, `data-part`,
orientation, selected, disabled, and focus attributes. The CSS Module preserves the React
component's selectors, public `--moduix-tabs-*` variables, Ark indicator variables, focus rings,
responsive layout, and reduced-motion-compatible transitions.

Ark Solid forwards ordinary refs through its parts. Its `asChild` render function does not forward
refs, so custom-host composition and ordinary refs remain separate native paths.