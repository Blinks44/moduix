import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import type { FormActions, FormProps } from './Form';
import { Button } from '../Button';
import { Field, FieldError, FieldLabel } from '../Field';
import { Input } from '../Input';
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
  serverErrors?: FormProps['errors'];
  message?: string;
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

export const Basic: Story = {
  render: () => {
    const [errors, setErrors] = React.useState<FormProps['errors']>({});
    const [submitting, setSubmitting] = React.useState(false);

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
        <Button type="submit" loading={submitting}>
          Submit
        </Button>
      </Form>
    );
  },
};

export const WithOnFormSubmit: Story = {
  render: () => {
    const [errors, setErrors] = React.useState<FormProps['errors']>({});
    const [submitting, setSubmitting] = React.useState(false);

    return (
      <Form
        errors={errors}
        validationMode="onBlur"
        className={storyStyles.form}
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
  },
};

export const WithActionsRef: Story = {
  render: () => {
    const actionsRef = React.useRef<FormActions | null>(null);
    const [errors, setErrors] = React.useState<FormProps['errors']>({});

    return (
      <Form
        actionsRef={actionsRef}
        errors={errors}
        validationMode="onSubmit"
        className={storyStyles.form}
        onFormSubmit={(values) => {
          const nextErrors: FormProps['errors'] = {};
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
    const [state, formAction, loading] = React.useActionState<ActionState, FormData>(
      submitUsername,
      {},
    );

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
        <Button type="submit" loading={loading}>
          Submit
        </Button>
        {state.message ? <p className={storyStyles.helper}>{state.message}</p> : null}
      </Form>
    );
  },
};