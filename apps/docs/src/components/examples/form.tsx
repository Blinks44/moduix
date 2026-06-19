import { Button, Field, Form, Input, Spinner } from 'moduix';
import { useActionState, useRef, useState } from 'react';
import { CSSPropertiesReferenceTable } from '../preview';

type FormCssProperty = {
  name: `--${string}`;
  defaultValue: string;
  description: string;
};

const formCssProperties: FormCssProperty[] = [
  {
    name: '--form-gap',
    defaultValue: 'var(--spacing-4)',
    description: 'Controls spacing between form children.',
  },
  {
    name: '--form-max-width',
    defaultValue: 'none',
    description: 'Controls the root form max width.',
  },
  {
    name: '--form-width',
    defaultValue: '100%',
    description: 'Controls the root form width.',
  },
];

export function FormCssPropertiesPanel() {
  return <CSSPropertiesReferenceTable properties={formCssProperties} />;
}

interface ActionState {
  serverErrors?: Record<string, string>;
  message?: string;
}

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function validateHomepage(homepage: string): Promise<Record<string, string>> {
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

export function FormExample() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  return (
    <Form
      errors={errors}
      className="form"
      onFormSubmit={async (values) => {
        setSubmitting(true);
        const nextErrors = await validateHomepage(String(values.homepage ?? ''));
        setErrors(nextErrors);
        setSubmitting(false);
      }}
    >
      <Field>
        <Field.Label>Homepage</Field.Label>
        <Input
          type="url"
          required
          defaultValue="https://example.com"
          placeholder="https://example.com"
          pattern="https?://.*"
        />
        <Field.ErrorText>Please enter a homepage URL.</Field.ErrorText>
        <Field.ErrorText>Please start with http:// or https://.</Field.ErrorText>
        <Field.ErrorText />
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

export function FormNativeSubmitExample() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  return (
    <Form
      errors={errors}
      className="form"
      onSubmit={async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const homepage = String(formData.get('homepage') ?? '');

        setSubmitting(true);
        const nextErrors = await validateHomepage(homepage);
        setErrors(nextErrors);
        setSubmitting(false);
      }}
    >
      <Field>
        <Field.Label>Homepage</Field.Label>
        <Input
          type="url"
          required
          defaultValue="https://example.com"
          placeholder="https://example.com"
          pattern="https?://.*"
        />
        <Field.ErrorText>Please enter a homepage URL.</Field.ErrorText>
        <Field.ErrorText>Please start with http:// or https://.</Field.ErrorText>
        <Field.ErrorText />
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

export function FormOnFormSubmitExample() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  return (
    <Form
      errors={errors}
      className="form"
      onFormSubmit={(values) => {
        setSubmitting(true);

        const nextErrors: Record<string, string> = {};
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
      <Field>
        <Field.Label>Name</Field.Label>
        <Input placeholder="Enter your name" />
        <Field.ErrorText />
      </Field>
      <Field>
        <Field.Label>Age</Field.Label>
        <Input type="number" placeholder="18" />
        <Field.ErrorText />
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

export function FormActionsRefExample() {
  const actionsRef = useRef<{ validate: (fieldName?: string) => void } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  return (
    <Form
      actionsRef={actionsRef}
      errors={errors}
      className="form"
      onFormSubmit={(values) => {
        const nextErrors: Record<string, string> = {};
        const email = String(values.email ?? '');

        if (!email.trim()) {
          nextErrors.email = 'Email is required.';
        } else if (!email.endsWith('@test.com')) {
          nextErrors.email = 'Use a @test.com email.';
        }

        setErrors(nextErrors);
      }}
    >
      <Field>
        <Field.Label>Work Email</Field.Label>
        <Input type="email" required placeholder="name@test.com" />
        <Field.ErrorText />
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
  const [state, formAction, loading] = useActionState<ActionState, FormData>(submitUsername, {});

  return (
    <Form action={formAction} errors={state.serverErrors} className="form">
      <Field>
        <Field.Label>Username</Field.Label>
        <Input required defaultValue="admin" placeholder="e.g. alice132" />
        <Field.ErrorText />
      </Field>
      <Button type="submit" disabled={loading} aria-busy={loading || undefined}>
        {loading ? (
          <>
            <Spinner decorative size="sm" />
            Submitting
          </>
        ) : (
          'Submit'
        )}
      </Button>
      {state.message ? <p className="helper">{state.message}</p> : null}
    </Form>
  );
}

export function CustomStylingFormExample() {
  return (
    <Form className="custom-form">
      <Field className="custom-field">
        <Field.Label className="custom-label">Project</Field.Label>
        <Input required placeholder="Maps Platform" className="custom-input" />
        <Field.HelperText className="custom-description">
          Use the public project name.
        </Field.HelperText>
        <Field.ErrorText className="custom-error">Please enter a project name.</Field.ErrorText>
      </Field>
      <Button type="submit" variant="outline" className="custom-button">
        Submit
      </Button>
    </Form>
  );
}