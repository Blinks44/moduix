import { Button } from '@moduix/solid/button';
import { Card } from '@moduix/solid/card';
import { Checkbox } from '@moduix/solid/checkbox';
import { Field } from '@moduix/solid/field';
import { Input } from '@moduix/solid/input';
import styles from './sign-up-form.module.css';

export function SignUp({ onSubmit }: { onSubmit?: (event: SubmitEvent) => void }) {
  return (
    <Card class={styles.root}>
      <Card.Header class={styles.header}>
        <Card.Title>Create your account</Card.Title>
        <Card.Description>Start building with moduix in minutes.</Card.Description>
      </Card.Header>

      <Card.Body>
        <form class={styles.stack} onSubmit={onSubmit}>
          <Field required>
            <Field.Label>Full name</Field.Label>
            <Input name="name" autocomplete="name" placeholder="Alex Morgan" />
          </Field>

          <Field required>
            <Field.Label>Email address</Field.Label>
            <Input name="email" type="email" autocomplete="email" placeholder="you@example.com" />
          </Field>

          <Field required>
            <Field.Label>Password</Field.Label>
            <Input name="password" type="password" autocomplete="new-password" />
          </Field>

          <Field required>
            <Field.Label>Confirm password</Field.Label>
            <Input name="confirm-password" type="password" autocomplete="new-password" />
          </Field>

          <Checkbox name="terms" required>
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Checkbox.Label>
              I agree to the{' '}
              <a class={styles.link} href="/terms">
                Terms of service
              </a>{' '}
              and{' '}
              <a class={styles.link} href="/privacy">
                Privacy policy
              </a>
              .
            </Checkbox.Label>
          </Checkbox>

          <Button type="submit" class={styles.submit}>
            Create account
          </Button>
        </form>
      </Card.Body>

      <Card.Footer class={styles.footer}>
        <p>
          Already have an account?{' '}
          <a class={styles.link} href="/sign-in">
            Sign in
          </a>
        </p>
      </Card.Footer>
    </Card>
  );
}