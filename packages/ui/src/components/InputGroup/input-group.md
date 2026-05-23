# InputGroup

`InputGroup` is a standalone composition component for decorating `Input` with inline icons,
prefixes, suffixes, text, and actions. It does not wrap a Base UI primitive.

## Parts

- `InputGroup` renders the visual root and controls size, border, focus ring, and invalid state.
- `InputGroupInput` renders the existing `Input` inside the group.
- `InputGroupAddon` renders a separated prefix or suffix surface.
- `InputGroupText` renders inline helper text without a filled addon background.
- `InputGroupButton` renders a grouped `Button` action.

## Example

```tsx
<InputGroup>
  <InputGroupAddon>@</InputGroupAddon>
  <InputGroupInput placeholder="workspace" />
  <InputGroupButton>Check</InputGroupButton>
</InputGroup>
```