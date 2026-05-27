# InputGroup

`InputGroup` is a thin composition wrapper for decorating `Input` with inline addons, text, and
actions inside one shared shell.

## Parts

- `InputGroup` renders the visual root and controls size, border, focus ring, and invalid state.
- `InputGroupInput` renders the existing `Input` inside the group and inherits the group `size` by
  default.
- `InputGroupAddon` renders a filled prefix or suffix surface.
- `InputGroupText` renders inline text without the filled addon background.
- `InputGroupButton` renders a grouped `Button` action. It defaults to `variant="ghost"` and
  `type="button"` and also inherits the group `size` unless you override it directly.

## Example

```tsx
<InputGroup>
  <InputGroupAddon>@</InputGroupAddon>
  <InputGroupInput placeholder="workspace" />
  <InputGroupButton>Check</InputGroupButton>
</InputGroup>
```
