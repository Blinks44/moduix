# Checkbox

`Checkbox` is a thin styled wrapper over the Base UI checkbox primitive with a built-in indicator
and a small size scale.

Use `CheckboxField` and `CheckboxLabel` for the default wrapping-label pattern. `Checkbox` renders
`CheckboxIndicator` with `CheckboxIndicatorIcon` by default, so the common path stays short:

```tsx
<CheckboxField>
  <Checkbox defaultChecked />
  <CheckboxLabel>Enable notifications</CheckboxLabel>
</CheckboxField>
```

When the default indicator is not enough, compose the same parts explicitly:

```tsx
<CheckboxField>
  <Checkbox defaultChecked>
    <CheckboxIndicator>
      <CheckboxIndicatorIcon />
    </CheckboxIndicator>
  </Checkbox>
  <CheckboxLabel>Enable notifications</CheckboxLabel>
</CheckboxField>
```

Keep the API small:

- use `defaultChecked` for uncontrolled mode
- use `checked` with `onCheckedChange` for controlled mode
- use `indeterminate` for mixed parent-selection states
- use `size` for the built-in control scale
- use `nativeButton` with `render={<button />}` when the label must be a sibling instead of a
  wrapping `<label>`

`Checkbox` forwards the Base UI root props. `CheckboxIndicator` forwards the Base UI indicator
props, including primitive features such as `keepMounted`, state-aware `className`, and `render`.
