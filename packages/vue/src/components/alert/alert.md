# Alert (Vue)

The React adapter's `alert.md` holds the full shared contract: flat part anatomy, statuses, data
hooks, CSS variables, and the rule that `Alert` never sets a `role`. This file records the Vue
specifics. The Vue Tailwind adapter shares this behavior contract.

## Composition

```vue
<Alert status="warning">
  <AlertIndicator><InfoIcon /></AlertIndicator>
  <AlertContent>
    <AlertTitle>Storage is almost full</AlertTitle>
    <AlertDescription>Archive old uploads or upgrade the plan.</AlertDescription>
  </AlertContent>
</Alert>
```

## Public contract

- Exports `Alert`, `AlertIndicator`, `AlertContent`, `AlertTitle`, `AlertDescription`, and
  `AlertActions`, one single-file component per part.
- `status` is the only declared prop besides `class`; every other attribute, including `role`,
  `as-child`, and listeners, reaches the rendered element through `attrs`.
- `AlertIndicator` renders only its slot content; there is no default icon.
- `index.ts` exports the `AlertRootProps` and `AlertStatus` types from `Alert.vue`.
- `aria-hidden="true"` on `AlertIndicator` is bound before `attrs`, so consumers can override it.
- Use `as-child` with a single child element, for example `<AlertTitle as-child><h2>…</h2></AlertTitle>`.
- Template refs resolve to the component instance; read the element from `$el`.

## Tests

Browser tests cover data hooks, `as-child`, refs, the absent default `role`, styles, and hydration without replacing the server host. `alert.ssr.test.ts` renders the anatomy
without browser globals.