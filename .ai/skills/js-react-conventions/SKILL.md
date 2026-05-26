# Skill: js-react-conventions

Use this skill for JS/TS work in this repo.

## Scope

- React components in JS/TS/TSX
- Local helpers and handler naming
- `memo` and `forwardRef` usage

## Core Rules

- Prefer plain function components.

```tsx
function Component(props) {
  return <div {...props} />;
}
```

- Type props inline unless a named type adds clear reuse or meaning.

```tsx
function Component(props: Primitive.Component.Props) {
  return <Primitive.Component {...props} />;
}
```

- Do not create exported prop aliases that only restate primitive props.
- Do not create named local prop types for one component unless they add real meaning or reuse.
- Avoid helper types, generics, `Pick`, and `Omit` unless they solve a real API problem.
- Prefer composition over configuration by default. Small, predictable DX sugar is acceptable when
  it removes common boilerplate, improves the default path, and does not turn the component into a
  combinator.
- Do not add booleans, render helpers, slot bags, class-name maps, or escape hatches when children
  or adjacent parts express the same thing more clearly, unless the prop is a narrow high-frequency
  DX shortcut with clear user value.
- Keep the public type surface small. If a type only forwards a primitive type, keep it inline and local.
- Do not narrow primitive props without a clear behavior or safety reason.

## `memo` and `forwardRef`

- Do not add `memo` by default. Use it only when there is measured or obvious value.
- Do not add `forwardRef` by default. Keep it only when the ref is part of the real consumer API or required by the primitive.
- When `memo` or `forwardRef` is needed, use `const` with a named function.

```tsx
const Component = forwardRef(function Component(props, ref) {
  return <div ref={ref} {...props} />;
});
```

- Use `React.ComponentRef` for `forwardRef` typing, not `React.ElementRef`.
- Do not add `displayName` when React can infer it from the named function.

## Local Code Style

- Use arrow functions for local helpers and handlers.
- Use `handleX` for internal handlers.
- Use `onX` for callback props received from outside.
- Keep render flow direct. Avoid intermediate variables and branches when an inline expression is clear enough.
- If the same behavior can be expressed either by a prop or by composition, prefer composition
  unless the prop is a very small, high-frequency DX shortcut that keeps the API easier to use and
  still leaves the composition path intact.