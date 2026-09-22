# Tabs (Solid)

`Tabs` is the styled Solid wrapper around Ark UI Solid Tabs for switching between mutually
exclusive content panels.

## Public contract

`Tabs` is the root component. Compose the Ark parts explicitly:

```tsx
import {
  Tabs,
  TabsContent,
  TabsIndicator,
  TabsList,
  TabsRootProvider,
  TabsTrigger,
} from '@moduix/solid/tabs';

export function Example() {
  return (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsIndicator />
      </TabsList>
      <TabsContent value="account">Account settings</TabsContent>
      <TabsContent value="password">Password settings</TabsContent>
    </Tabs>
  );
}
```

The flat API exposes `TabsRootProvider`, `TabsContext`, `TabsList`, `TabsTrigger`,
`TabsIndicator`, and `TabsContent`, together with `useTabs` and `useTabsContext`.
`TabsRootProvider` accepts the accessor returned by `useTabs()`; read context values as
`tabs().value`.

## Behavior and composition

Ark owns controlled and uncontrolled state, `onValueChange(details)`, focus management, keyboard
navigation, ARIA relationships, disabled triggers, `activationMode`, `orientation`, `loopFocus`,
`deselectable`, `lazyMount`, `unmountOnExit`, `ids`, and `navigate`.

Use Solid's render-function form of `asChild` for custom trigger hosts:

```tsx
<TabsTrigger
  value="account"
  asChild={(props) => (
    <a {...props()} href="#account">
      Account
    </a>
  )}
/>
```

Use `TabsRootProvider` when state is created outside the tree:

```tsx
const tabs = useTabs({ defaultValue: 'account' });

<TabsRootProvider value={tabs}>
  {/* the same TabsList, TabsTrigger, TabsIndicator, and TabsContent parts */}
</TabsRootProvider>;
```

`variant="default"` uses the filled indicator treatment. `variant="line"` uses an underline for
horizontal tabs; vertical tabs intentionally keep the filled treatment. `TabsRootProvider` resolves
this vertical fallback from the Ark `data-orientation` root DOM hook exposed by the `useTabs()` state;
if upstream ever drops the attribute, the regression tests catch it. `TabsList` does not
render an indicator automatically.

## Anatomy and styling hooks

| Part                 | `data-slot`          |
| -------------------- | -------------------- |
| `Tabs`               | `tabs-root`          |
| `TabsRootProvider`  | `tabs-root-provider` |
| `TabsContext`       | -                    |
| `TabsList`          | `tabs-list`          |
| `TabsTrigger`       | `tabs-trigger`       |
| `TabsIndicator`     | `tabs-indicator`     |
| `TabsContent`       | `tabs-content`       |

Every visual part accepts `class` and keeps the corresponding Ark `data-scope`, `data-part`,
orientation, selected, disabled, and focus attributes. The CSS Module preserves the React
component's selectors, public `--moduix-tabs-*` variables, Ark indicator variables, focus rings,
responsive layout, and reduced-motion-compatible transitions.

Ark Solid forwards ordinary refs through its parts. Its `asChild` render function does not forward
refs, so custom-host composition and ordinary refs remain separate native paths.
