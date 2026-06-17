# Form

Upstream primitive docs: https://base-ui.com/react/components/form

## Purpose

`Form` is the moduix wrapper around Base UI's form primitive. It keeps the native `<form>` element,
adds the library root styling contract, and coordinates validation timing plus externally supplied
field errors.

Use it as the top-level form root together with `Field`, `Fieldset`, `Input`, `Textarea`, `Button`,
and the rest of the form controls.

## Current behavior contract

- `Form` renders the Base UI form root on a native `<form>` element by default.
- The wrapper adds only three library-level concerns: `data-slot="form-root"`, the default vertical
  layout styles from `Form.module.css`, and merged `className` support through `mergeClassName`.
- `className` keeps Base UI callback class names working, so both string and function forms remain
  valid.
- The component now forwards its ref to the underlying native `<form>` element, so consumers can use
  methods such as `requestSubmit()` or `reset()` without reaching into Base UI directly.
- `validationMode` sets the default validation timing for nested fields. A nested `Field` can still
  override that timing with its own `validationMode`.
- `errors` is the bridge for server or action validation. Keys must match the `name` of the nested
  `Field`, and the values are surfaced through that field's `FieldError`.
- `onFormSubmit` is the convenience submit path for object-shaped form values. Base UI calls
  `preventDefault()` on the native submit event before invoking this handler.
- Native `onSubmit` remains available for lower-level flows where you need the real submit event,
  `event.currentTarget`, `FormData`, or custom event orchestration.
- Native `action` also remains available, including React `useActionState` / server-action flows.
- `actionsRef` exposes a single imperative entry point: `validate(fieldName?)`.
- The wrapper does not add variants, slot prop bags, helper props, or built-in submit controls.

## Composition

Basic submit flow with object-shaped values:

```tsx
import { Button, Field, FieldError, FieldLabel, Form, Input, Spinner } from 'moduix';
import { useState } from 'react';

async function validateHomepage(homepage: string) {
  await new Promise((resolve) => {
    setTimeout(resolve, 500);
  });

  try {
    const value = new URL(homepage);

    if (value.hostname.endsWith('example.com')) {
      return {
        homepage: 'The example.com domain is not allowed.',
      };
    }

    return {};
  } catch {
    return {
      homepage: 'Please enter a valid URL.',
    };
  }
}

export function HomepageForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  return (
    <Form
      errors={errors}
      validationMode="onBlur"
      onFormSubmit={async (values) => {
        setSubmitting(true);
        const nextErrors = await validateHomepage(String(values.homepage ?? ''));
        setErrors(nextErrors);
        setSubmitting(false);
      }}
    >
      <Field name="homepage">
        <FieldLabel>Homepage</FieldLabel>
        <Input
          type="url"
          required
          defaultValue="https://example.com"
          placeholder="https://example.com"
          pattern="https?://.*"
        />
        <FieldError match="valueMissing">Please enter a homepage URL.</FieldError>
        <FieldError match="patternMismatch">Please start with http:// or https://.</FieldError>
        <FieldError />
      </Field>

      <Button type="submit" disabled={submitting} aria-busy={submitting || undefined}>
        {submitting ? (
          <>
            <Spinner decorative size="sm" />
            Submitting
          </>
        ) : (
          'Submit'
        )}
      </Button>
    </Form>
  );
}
```

Native submit event with explicit `FormData`:

```tsx
import { Button, Field, FieldError, FieldLabel, Form, Input } from 'moduix';
import { useState } from 'react';

export function NativeSubmitForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  return (
    <Form
      errors={errors}
      onSubmit={(event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const homepage = String(formData.get('homepage') ?? '');

        setErrors(
          homepage.startsWith('https://') ? {} : { homepage: 'Please use an https:// URL.' },
        );
      }}
    >
      <Field name="homepage" validationMode="onBlur">
        <FieldLabel>Homepage</FieldLabel>
        <Input type="url" required placeholder="https://example.com" />
        <FieldError />
      </Field>

      <Button type="submit">Submit</Button>
    </Form>
  );
}
```

React `useActionState` with server-side errors:

```tsx
import { Button, Field, FieldError, FieldLabel, Form, Input } from 'moduix';
import { useActionState } from 'react';

interface ActionState {
  serverErrors?: Record<string, string>;
  message?: string;
}

async function submitUsername(
  _previousState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const username = String(formData.get('username') ?? '');

  if (!username.trim()) {
    return {
      serverErrors: {
        username: 'Username is required.',
      },
    };
  }

  if (username.toLowerCase() === 'admin') {
    return {
      serverErrors: {
        username: "'admin' is reserved for system use.",
      },
    };
  }

  return {
    serverErrors: {},
    message: `Saved as ${username}.`,
  };
}

export function ActionStateForm() {
  const [state, formAction, loading] = useActionState<ActionState, FormData>(submitUsername, {});

  return (
    <Form action={formAction} errors={state.serverErrors} validationMode="onBlur">
      <Field name="username">
        <FieldLabel>Username</FieldLabel>
        <Input required defaultValue="admin" placeholder="e.g. alice132" />
        <FieldError />
      </Field>

      <Button type="submit" disabled={loading} aria-busy={loading || undefined}>
        Submit
      </Button>
    </Form>
  );
}
```

Imperative validation:

```tsx
import { Button, Field, FieldError, FieldLabel, Form, Input } from 'moduix';
import { useRef, useState } from 'react';

export function ActionsRefForm() {
  const actionsRef = useRef<{ validate: (fieldName?: string) => void } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  return (
    <Form
      actionsRef={actionsRef}
      errors={errors}
      validationMode="onSubmit"
      onFormSubmit={(values) => {
        const email = String(values.email ?? '');

        setErrors(
          !email.trim()
            ? { email: 'Email is required.' }
            : !email.endsWith('@test.com')
              ? { email: 'Use a @test.com email.' }
              : {},
        );
      }}
    >
      <Field name="email">
        <FieldLabel>Work Email</FieldLabel>
        <Input type="email" required placeholder="name@test.com" />
        <FieldError />
      </Field>

      <Button
        type="button"
        variant="outline"
        onClick={() => {
          actionsRef.current?.validate('email');
        }}
      >
        Validate Email
      </Button>

      <Button type="submit">Submit</Button>
    </Form>
  );
}
```

Custom styling:

```tsx
import { Button, Field, FieldDescription, FieldError, FieldLabel, Form, Input } from 'moduix';
import styles from './form.module.css';

export function StyledForm() {
  return (
    <Form validationMode="onBlur" className={styles.form}>
      <Field name="project" className={styles.field}>
        <FieldLabel className={styles.label}>Project</FieldLabel>
        <Input required placeholder="Maps Platform" className={styles.input} />
        <FieldDescription className={styles.description}>
          Use the public project name.
        </FieldDescription>
        <FieldError className={styles.error} match="valueMissing">
          Please enter a project name.
        </FieldError>
      </Field>

      <Button type="submit" variant="outline" className={styles.button}>
        Submit
      </Button>
    </Form>
  );
}
```

```css
.form {
  width: min(20rem, 100%);
  gap: var(--spacing-3);
  padding: var(--spacing-4);
  border: var(--border-width-sm) solid color-mix(in srgb, var(--color-primary) 30%, transparent);
  border-radius: var(--radius-lg);
}

.field {
  gap: var(--spacing-2);
}

.label,
.error,
.button {
  color: var(--color-primary);
}

.input,
.button {
  border-color: color-mix(in srgb, var(--color-primary) 40%, transparent);
}

.input:focus {
  outline-color: var(--color-primary);
}

.description {
  color: var(--color-muted-foreground);
}
```

## Exported parts

| Part   | Element/primitive | Purpose                                                       |
| ------ | ----------------- | ------------------------------------------------------------- |
| `Form` | `FormPrimitive`   | Root `<form>` wrapper that coordinates submit and validation. |

## Public props

`Form` accepts `FormPrimitive.Props`. The most relevant props are:

| Prop             | Type                                                                   | Default      | Notes                                                                                       |
| ---------------- | ---------------------------------------------------------------------- | ------------ | ------------------------------------------------------------------------------------------- |
| `validationMode` | `'onSubmit' \| 'onBlur' \| 'onChange'`                                 | `'onSubmit'` | Default validation timing for nested fields. Individual `Field` components can override it. |
| `errors`         | `Record<string, string \| string[]>`                                   | —            | External field errors keyed by nested `Field` `name`.                                       |
| `onFormSubmit`   | `(values, eventDetails) => void`                                       | —            | Convenience submit callback; Base UI prevents the native submit event default first.        |
| `actionsRef`     | `React.RefObject<{ validate: (fieldName?: string) => void } \| null>`  | —            | Imperative validation handle for all fields or one named field.                             |
| `action`         | native `<form>` `action` prop                                          | —            | Use for URL submission or React server-action / `useActionState` flows.                     |
| `onSubmit`       | native React form submit handler                                       | —            | Use when you need direct event / `FormData` control.                                        |
| `render`         | `ReactElement \| ((props, state) => ReactElement)`                     | `form`       | Advanced escape hatch to replace or compose the root element.                               |
| `className`      | `string \| ((state) => string \| undefined)`                           | —            | Merged with the moduix root class.                                                          |
| `style`          | `React.CSSProperties \| ((state) => React.CSSProperties \| undefined)` | —            | Forwarded directly to Base UI.                                                              |

The wrapper also forwards standard native `<form>` props such as `method`, `noValidate`, `target`,
`name`, and `autoComplete`.

## Styling API

Public `data-slot` values:

| Part   | `data-slot` |
| ------ | ----------- |
| `Form` | `form-root` |

Public CSS variables:

| Variable           | Default fallback   | Purpose                    |
| ------------------ | ------------------ | -------------------------- |
| `--form-gap`       | `var(--spacing-4)` | Gap between root children. |
| `--form-max-width` | `none`             | Root max width.            |
| `--form-width`     | `100%`             | Root width.                |

There are no built-in visual variants and no form-specific state data attributes. Customize the root
through `className`, `data-slot="form-root"`, and the `--form-*` CSS variables.

## UX and accessibility

- `Form` only owns the form root. Labels, descriptions, field-level errors, and control semantics come
  from `Field`, `Fieldset`, and the composed control components.
- Every control still needs an accessible name. In practice that means using `FieldLabel`, or another
  explicit label strategy when composing advanced controls.
- Prefer `validationMode="onBlur"` for text-entry forms where immediate submit blocking is helpful but
  per-keystroke validation would be noisy.
- Prefer `onSubmit` over `onFormSubmit` when you need submitter inspection, custom `FormData`
  processing, or other native event details.
- Make sure every key in `errors` matches a real field `name`; unmatched keys do not produce any
  visible feedback.
- Keep submit controls native (`<Button type="submit" />`) so keyboard submit and form semantics stay
  intact.
- Keyboard navigation, submit lifecycle, ARIA wiring for error messages, and validation state
  coordination are owned by Base UI and the composed field primitives. The wrapper should stay thin.

## Intentional differences from Base UI

- moduix documents a flat `Form` export instead of teaching the upstream namespaced types as the main
  entry point.
- The wrapper is styled by default through CSS Modules, `data-slot`, and the `--form-*` variables.
- Local docs describe the moduix wrapper contract and recommended composition, not the full upstream
  Base UI API reference.

## Agent notes

- Keep `Form` thin. Do not add submit helpers, layout props, class-name maps, or field-owned sugar to
  the root component.
- `Form`, `Fieldset`, and `Field` are the three structural form wrappers in moduix. Preserve their
  boundaries: `Form` owns the form element, `Fieldset` owns grouped-section semantics, and `Field`
  owns per-control labeling and validation.
- Preserve ref forwarding on `Form`; it is now part of the public wrapper contract.
- If root styling hooks change, update `Form.module.css`, `theme.css`, Storybook examples, docs
  examples, and this file in the same task.
- Keep `errors`, `onFormSubmit`, native `onSubmit`, and `action` documented together. Consumers need
  to understand when each submit path is the right one.

## Local changelog

- Rewrote the local documentation to describe the actual moduix `Form` wrapper contract: real props,
  composition paths, styling hooks, validation flow, accessibility guidance, and the supported submit
  patterns.
- Preserved and documented the thin-wrapper architecture while adding ref forwarding to the native
  `<form>` root for parity with common native form workflows.