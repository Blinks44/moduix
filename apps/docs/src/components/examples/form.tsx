import {
  Button,
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  Form,
  Input,
  type FormActions,
  type FormProps,
} from 'moduix';
import * as React from 'react';
import type { CssPropertyInput } from '../preview';
import styles from './form.module.css';

export const formCssProperties: CssPropertyInput[] = [
  ['--form-width', '100%', 'Controls the root form width.'],
  ['--form-max-width', 'none', 'Controls the root form max width.'],
  ['--form-gap', 'var(--spacing-4)', 'Controls spacing between form children.'],
];

interface ActionState {
  serverErrors?: FormProps['errors'];
  message?: string;
}

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function validateHomepage(homepage: string): Promise<FormProps['errors']> {
  await sleep(500);

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

async function submitUsername(
  _previousState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await sleep(500);

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

export function FormExample(props: FormProps) {
  const [errors, setErrors] = React.useState<FormProps['errors']>({});
  const [submitting, setSubmitting] = React.useState(false);

  return (
    <Form
      errors={errors}
      className={styles.form}
      onSubmit={async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const homepage = String(formData.get('homepage') ?? '');

        setSubmitting(true);
        const nextErrors = await validateHomepage(homepage);
        setErrors(nextErrors);
        setSubmitting(false);
      }}
      {...props}
    >
      <Field name="homepage" validationMode="onBlur">
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
      <Button type="submit" loading={submitting}>
        Submit
      </Button>
    </Form>
  );
}

export function FormOnFormSubmitExample() {
  const [errors, setErrors] = React.useState<FormProps['errors']>({});
  const [submitting, setSubmitting] = React.useState(false);

  return (
    <Form
      errors={errors}
      validationMode="onBlur"
      className={styles.form}
      onFormSubmit={(values) => {
        setSubmitting(true);

        const nextErrors: FormProps['errors'] = {};
        const age = Number(values.age);

        if (!values.name?.trim()) {
          nextErrors.name = 'Name is required.';
        }

        if (!values.age?.trim()) {
          nextErrors.age = 'Age is required.';
        } else if (!Number.isFinite(age) || age < 18) {
          nextErrors.age = 'Age should be 18 or greater.';
        }

        setErrors(nextErrors);
        setSubmitting(false);
      }}
    >
      <Field name="name">
        <FieldLabel>Name</FieldLabel>
        <Input placeholder="Enter your name" />
        <FieldError />
      </Field>
      <Field name="age">
        <FieldLabel>Age</FieldLabel>
        <Input type="number" placeholder="18" />
        <FieldError />
      </Field>
      <Button type="submit" loading={submitting}>
        Submit
      </Button>
    </Form>
  );
}

export function FormActionsRefExample() {
  const actionsRef = React.useRef<FormActions | null>(null);
  const [errors, setErrors] = React.useState<FormProps['errors']>({});

  return (
    <Form
      actionsRef={actionsRef}
      errors={errors}
      validationMode="onSubmit"
      className={styles.form}
      onFormSubmit={(values) => {
        const nextErrors: FormProps['errors'] = {};
        const email = String(values.email ?? '');

        if (!email.trim()) {
          nextErrors.email = 'Email is required.';
        } else if (!email.endsWith('@2gis.com')) {
          nextErrors.email = 'Use a @2gis.com email.';
        }

        setErrors(nextErrors);
      }}
    >
      <Field name="email">
        <FieldLabel>Work Email</FieldLabel>
        <Input type="email" required placeholder="name@2gis.com" />
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

export function FormActionStateExample() {
  const [state, formAction, loading] = React.useActionState<ActionState, FormData>(
    submitUsername,
    {},
  );

  return (
    <Form
      action={formAction}
      errors={state.serverErrors}
      validationMode="onBlur"
      className={styles.form}
    >
      <Field name="username">
        <FieldLabel>Username</FieldLabel>
        <Input required defaultValue="admin" placeholder="e.g. alice132" />
        <FieldError />
      </Field>
      <Button type="submit" loading={loading}>
        Submit
      </Button>
      {state.message ? <p className={styles.helper}>{state.message}</p> : null}
    </Form>
  );
}

export function CustomStylesFormExample() {
  return (
    <Form validationMode="onBlur" className={styles.customForm}>
      <Field name="project" className={styles.customField}>
        <FieldLabel className={styles.customLabel}>Project</FieldLabel>
        <Input required placeholder="Maps Platform" className={styles.customInput} />
        <FieldDescription className={styles.customDescription}>
          Use the public project name.
        </FieldDescription>
        <FieldError className={styles.customError} match="valueMissing">
          Please enter a project name.
        </FieldError>
      </Field>
      <Button type="submit" variant="outline" className={styles.customButton}>
        Submit
      </Button>
    </Form>
  );
}