# Stack

`Stack` is a small flex layout primitive for vertical and horizontal composition.

Use it when you want a predictable flex wrapper without repeating `display: flex`,
`flex-direction`, `gap`, or common alignment styles. Keep responsive or custom layout rules in
`className` or `style`.

## Defaults

| Prop        | Default    | Values                              |
| ----------- | ---------- | ----------------------------------- |
| `direction` | `column`   | `column`, `row`                     |
| `gap`       | -          | CSS length (`number` becomes `px`)  |
| `align`     | `stretch`  | Any valid `align-items` value       |
| `justify`   | `flex-start` | Any valid `justify-content` value |
| `wrap`      | `nowrap`   | Any valid `flex-wrap` value         |
| `as`        | `div`      | Any React element type              |
