# RadioGroup (Solid)

`RadioGroup` is the moduix Solid wrapper around Ark UI RadioGroup. It preserves the React
wrapper's flat anatomy, state attributes, native form behavior, `RadioGroupRootProvider` composition,
and `RadioGroupOption` and `RadioGroupItemControl` conveniences.

## Composition

```tsx
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@moduix/solid/radio-group';

export function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="React">
      <RadioGroupLabel>Framework</RadioGroupLabel>
      <RadioGroupOption value="React">React</RadioGroupOption>
      <RadioGroupOption value="Solid">Solid</RadioGroupOption>
    </RadioGroup>
  );
}
```

`RadioGroupOption` includes Ark's native input in its fixed tree. Direct `RadioGroupItem`
composition requires an explicit `RadioGroupItemHiddenInput`.

The public parts are `RadioGroup`, `RadioGroupRootProvider`, `RadioGroupContext`,
`RadioGroupItemContext`, `RadioGroupLabel`, `RadioGroupItem`, `RadioGroupOption`,
`RadioGroupItemControl`, `RadioGroupItemText`, `RadioGroupItemHiddenInput`, and
`RadioGroupIndicator`. The barrel also re-exports `useRadioGroup`, `useRadioGroupContext`, and
`useRadioGroupItemContext`.

## Ark Solid behavior

Solid Ark components use a render-function `asChild` prop:

```tsx
<RadioGroupItem asChild={(props) => <label {...props()}>{props().children}</label>}>
  <RadioGroupItemControl />
  <RadioGroupItemText>React</RadioGroupItemText>
</RadioGroupItem>
```

The installed Ark Solid primitive does not forward `ref` through an `asChild` render function.
Ordinary refs and custom-host composition are therefore supported as separate native paths.