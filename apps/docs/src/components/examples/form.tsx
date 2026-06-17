import {
  Button,
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  Form,
  Input,
  Spinner,
} from 'moduix';
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
      validationMode="onBlur"
      className="form"
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
      validationMode="onBlur"
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
      validationMode="onSubmit"
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

export function FormActionStateExample() {
  const [state, formAction, loading] = useActionState<ActionState, FormData>(submitUsername, {});

  return (
    <Form action={formAction} errors={state.serverErrors} validationMode="onBlur" className="form">
      <Field name="username">
        <FieldLabel>Username</FieldLabel>
        <Input required defaultValue="admin" placeholder="e.g. alice132" />
        <FieldError />
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
    <Form validationMode="onBlur" className="custom-form">
      <Field name="project" className="custom-field">
        <FieldLabel className="custom-label">Project</FieldLabel>
        <Input required placeholder="Maps Platform" className="custom-input" />
        <FieldDescription className="custom-description">
          Use the public project name.
        </FieldDescription>
        <FieldError className="custom-error" match="valueMissing">
          Please enter a project name.
        </FieldError>
      </Field>
      <Button type="submit" variant="outline" className="custom-button">
        Submit
      </Button>
    </Form>
  );
}