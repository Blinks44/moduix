import type { Meta, StoryObj } from '@storybook/react-vite';
import { useActionState, useRef, useState } from 'react';
import { Button } from '../button';
import { Field, FieldError, FieldLabel } from '../field';
import { Input } from '../input';
import { Spinner } from '../spinner';
import { Form } from './Form';
import storyStyles from './Form.stories.module.css';

const meta = {
  title: 'Components/Form',
  component: Form,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Form>;

export default meta;

type Story = StoryObj<typeof meta>;

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

interface ActionState {
  serverErrors?: Record<string, string>;
  message?: string;
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

export const Basic: Story = {
  render: () => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitting, setSubmitting] = useState(false);

    return (
      <Form
        errors={errors}
        validationMode="onBlur"
        className={storyStyles.form}
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
        <Button
          type="submit"
          disabled={submitting}
          focusableWhenDisabled
          aria-busy={submitting || undefined}
        >
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
  },
};

export const WithNativeSubmit: Story = {
  render: () => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitting, setSubmitting] = useState(false);

    return (
      <Form
        errors={errors}
        className={storyStyles.form}
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
        <Button
          type="submit"
          disabled={submitting}
          focusableWhenDisabled
          aria-busy={submitting || undefined}
        >
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
  },
};

export const WithActionsRef: Story = {
  render: () => {
    const actionsRef = useRef<{ validate: (fieldName?: string) => void } | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});

    return (
      <Form
        actionsRef={actionsRef}
        errors={errors}
        validationMode="onSubmit"
        className={storyStyles.form}
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
  },
};

export const WithActionState: Story = {
  render: () => {
    const [state, formAction, loading] = useActionState<ActionState, FormData>(submitUsername, {});

    return (
      <Form
        action={formAction}
        errors={state.serverErrors}
        validationMode="onBlur"
        className={storyStyles.form}
      >
        <Field name="username">
          <FieldLabel>Username</FieldLabel>
          <Input required defaultValue="admin" placeholder="e.g. alice132" />
          <FieldError />
        </Field>
        <Button
          type="submit"
          disabled={loading}
          focusableWhenDisabled
          aria-busy={loading || undefined}
        >
          {loading ? (
            <>
              <Spinner decorative size="sm" />
              Submitting
            </>
          ) : (
            'Submit'
          )}
        </Button>
        {state.message ? <p className={storyStyles.helper}>{state.message}</p> : null}
      </Form>
    );
  },
};