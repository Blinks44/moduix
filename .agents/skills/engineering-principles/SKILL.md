---
name: engineering-principles
description: Apply to any task that implements, changes, or reviews code. Prefer simple, maintainable, and understandable solutions without overengineering.
---

# Engineering Principles

## Goal

Build the smallest solution that fully solves the current task, follows existing project conventions,
and remains clear to the next developer.

Simplicity does not mean weakening requirements or skipping verification. A simple solution handles
real scenarios correctly without adding capabilities for hypothetical future needs.

## Before Implementation

- Inspect the existing code, dependencies, configuration, and tests in the affected area first.
- For a non-trivial or recurring task, evaluate the standard platform capabilities, dependencies
  already installed in the project, a mature external library, and a local implementation.
- State the expected outcome and how it will be verified.
- If requirements are ambiguous or involve a meaningful tradeoff, explain the options and ask for a
  decision instead of choosing silently.
- Reuse existing project patterns, utilities, and components when they solve the task without making
  the result less clear.

## Simplicity and Change Boundaries

- Implement exactly what is required now. Do not add unrequested features, configuration, flags,
  abstraction layers, or extensibility.
- Do not extract an abstraction for one simple use. Extract one when it removes existing duplication
  or materially simplifies complex logic.
- Do not refactor adjacent code, change unrelated formatting, or remove existing code outside the task
  without a separate request.
- Remove imports, variables, and code made unused specifically by your change.
- Every changed file and meaningful line should be connected to the task.

## Code and Automation

- Prefer clear names, direct data flow, and small cohesive changes over complex indirection.
- Use comments to explain a decision or constraint that is not obvious from the code; do not narrate
  what the code already says.
- Do not build large one-off scripts, generators, or infrastructure for a single operation. Use
  existing tools and small direct changes first.
- Add automation only when an operation genuinely recurs, is unsafe to perform manually, or needs to
  be reproducible. Keep it small and documented.

## Dependencies

- Check standard platform capabilities and libraries already installed in the project first.
- For non-trivial, widely solved functionality, prefer a mature, maintained, and compatible library
  over a custom implementation.
- Do not choose a library merely because it exists. Compare implementation and maintenance complexity,
  API quality, compatibility, size, performance, security, and dependency cost.
- When several options are reasonable, recommend one and explain its benefits and tradeoffs, including
  a local implementation as an alternative. Agree on material dependency changes before installation.
- Prefer a custom solution for small local logic when it is simpler, transparent, and does not
  reimplement complex, well-known functionality.
- Do not add a dependency for a few lines of clear code or when it does not fit project constraints.
- Before adding a library, assess its maintenance activity, license, size, compatibility, security,
  and practical value. Use only the API surface the task needs.

## Completion

- Verify the change with the commands and tests established by the project.
- If verification is not possible, state why and describe the alternative checks performed.
- Review the diff before finishing; the solution should be no more complex than the task requires.