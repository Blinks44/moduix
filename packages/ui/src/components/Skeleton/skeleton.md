# Skeleton

`Skeleton` is a moduix loading placeholder primitive. It does not wrap a Base UI primitive.

Use `Skeleton` for text lines and custom blocks, `SkeletonRect` and `SkeletonCircle` for common
shapes, and `SkeletonRow` / `SkeletonColumn` when the loading state should preserve layout spacing.

All parts accept standard `div` props. The base shape is `aria-hidden`, since it represents a
loading surface rather than readable content.

## Defaults

| Prop          | Default | Values                                                            |
| ------------- | ------- | ----------------------------------------------------------------- |
| `height`      | `1rem`  | Any CSS length (`number` is converted to `px`)                    |
| `animated`    | `true`  | `true`, `false`                                                   |
| `size`        | `40`    | Any CSS length (`number` is converted to `px`) (`SkeletonCircle`) |
| `height`      | `60`    | Any CSS length (`number` is converted to `px`) (`SkeletonRect`)   |
| `mobileStack` | `true`  | `true`, `false` (`SkeletonRow`)                                   |