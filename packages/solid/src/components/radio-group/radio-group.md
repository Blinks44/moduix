# RadioGroup (Solid)

`RadioGroup` is the moduix Solid wrapper around Ark UI RadioGroup. It preserves the React
wrapper's compound anatomy, state attributes, native form behavior, `RootProvider` composition,
and `Option` and `ItemControl` conveniences.

## Composition

```tsx
import { RadioGroup } from '@moduix/solid/radio-group';

export function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="React">
      <RadioGroup.Label>Framework</RadioGroup.Label>
      <RadioGroup.Option value="React">React</RadioGroup.Option>
      <RadioGroup.Option value="Solid">Solid</RadioGroup.Option>
    </RadioGroup>
  );
}
```

`RadioGroup.Option` includes Ark's native input in its fixed tree. Direct `RadioGroup.Item`
composition requires an explicit `RadioGroup.ItemHiddenInput`.

The public parts are `Root`, `RootProvider`, `Context`, `ItemContext`, `Label`, `Item`, `Option`,
`ItemControl`, `ItemText`, and `Indicator`. The barrel also re-exports `useRadioGroup`,
`useRadioGroupContext`, and `useRadioGroupItemContext`.

## Ark Solid behavior

Solid Ark components use a render-function `asChild` prop:

```tsx
<RadioGroup.Item asChild={(props) => <label {...props()}>{props().children}</label>}>
  <RadioGroup.ItemControl />
  <RadioGroup.ItemText>React</RadioGroup.ItemText>
</RadioGroup.Item>
```

The installed Ark Solid primitive does not forward `ref` through an `asChild` render function.
Ordinary refs and custom-host composition are therefore supported as separate native paths.