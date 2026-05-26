# InputGroup

`InputGroup` is a thin composition wrapper for decorating `Input` with inline addons, text, and
actions inside one shared shell.

## Parts

- `InputGroup` renders the visual root and controls size, border, focus ring, and invalid state.
- `InputGroupInput` renders the existing `Input` inside the group.
- `InputGroupAddon` renders a filled prefix or suffix surface.
- `InputGroupText` renders inline text without the filled addon background.
- `InputGroupButton` renders a grouped `Button` action.

## Example

```tsx
<InputGroup>
  <InputGroupAddon>@</InputGroupAddon>
  <InputGroupInput placeholder="workspace" />
  <InputGroupButton>Check</InputGroupButton>
</InputGroup>
```