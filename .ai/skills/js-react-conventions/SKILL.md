# Skill: js-react-conventions

Use this skill for JS/TS coding tasks in this repo.

## Scope

- React components in JS/TS/TSX
- Local helper functions and handler naming
- `memo` and `forwardRef` component shape conventions

## Conventions

- Regular components: use function declarations.

```js
function Component(props) {
  // ...
}
```

- Components wrapped in `memo` or `forwardRef`: use `const` + named function inside wrapper.

```js
const Component = memo(function Component(props) {
  // ...
});
```

```js
const Component = forwardRef(function Component(props, ref) {
  // ...
});
```

- Do not add `displayName` when the wrapped function is already named and React can infer it.
- Add `displayName` only when the wrapper uses an anonymous function or the name would otherwise be unclear in DevTools.

- Functions inside components and local helpers: use arrow function assignments.

```js
const someFunc = () => {
  // ...
};
```

- Naming rules:
  - `handleX` for internal component handlers.
  - `onX` for callback props received from outside.