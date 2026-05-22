# Skeleton

`Skeleton` is a moduix loading placeholder primitive. It does not wrap a Base UI primitive.

Use `Skeleton`, `SkeletonRect`, and `SkeletonCircle` for visual loading shapes, then compose
layout with `SkeletonRow` and `SkeletonColumn` when placeholders must match loaded spacing.

## Defaults

| Prop          | Default | Values                                                            |
| ------------- | ------- | ----------------------------------------------------------------- |
| `height`      | `1rem`  | Any CSS length (`number` is converted to `px`)                    |
| `animated`    | `true`  | `true`, `false`                                                   |
| `size`        | `40`    | Any CSS length (`number` is converted to `px`) (`SkeletonCircle`) |
| `height`      | `60`    | Any CSS length (`number` is converted to `px`) (`SkeletonRect`)   |
| `mobileStack` | `true`  | `true`, `false` (`SkeletonRow`)                                   |