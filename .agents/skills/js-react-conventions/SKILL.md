---
name: js-react-conventions
description: Use for JS/TS React work in this repo. Prefer plain function components, inline prop typing, and composition over configuration.
---

# Skill: js-react-conventions

Use this skill for JS/TS React work in this repo.

## Scope

- React components in JS/TS/TSX
- local helpers and handler naming
- `memo` and `forwardRef` usage

## Core Rules

- Prefer plain function components.
- Type props inline unless a named type adds real meaning or reuse.
- Do not export prop aliases that only restate primitive props.
- Avoid helper types, generics, `Pick`, and `Omit` unless they solve a real API problem.
- Prefer composition over configuration.
- Avoid booleans, render helpers, slot bags, or class-name maps when children or adjacent parts express the same thing more clearly.
- Keep the public type surface small.
- Do not narrow primitive props without a clear behavior or safety reason.
- Keep APIs consistent across semantically similar components. If two controls solve the same kind of
  problem, prefer the same prop names, controlled/uncontrolled contracts, event names, and ref
  behavior unless there is a documented, defensible reason to differ.
- Do not add `memo` by default.
- Do not add `forwardRef` unless the ref is part of the real consumer API or required by the primitive.
- When `forwardRef` is needed, use `React.ComponentRef`.
- Do not add `displayName` when React can infer it from the named function.
- Use arrow functions for local helpers and handlers.
- Use `handleX` for internal handlers.
- Use `onX` for callback props from outside.
- Keep render flow direct. Avoid intermediate variables when an inline expression is clearer.