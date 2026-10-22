# Steps (Solid)

Same contract as the React `steps.md`.

- `useSteps()`, `useStepsContext()`, and `useStepsItemContext()` return accessors: pass the
  `useSteps()` accessor to `StepsRootProvider value` and call methods as `steps().goToNextStep()`.
- `asChild` takes a render function: `asChild={(props) => <a {...props()} href="#billing" />}`.