import { Button, Card, Checkbox, Field, Input } from '@moduix/react';
import type { FormEventHandler } from 'react';
import styles from './sign-up.module.css';
import '@moduix/react/style.css';

export function SignUp({ onSubmit }: { onSubmit?: FormEventHandler<HTMLFormElement> }) {
  return (
    <Card className={styles.root}>
      <Card.Header className={styles.header}>
        <Card.Title>Create your account</Card.Title>
        <Card.Description>Start building with moduix in minutes.</Card.Description>
      </Card.Header>

      <Card.Body>
        <form className={styles.form} onSubmit={onSubmit}>
          <Field.Root required>
            <Field.Label>Full name</Field.Label>
            <Input name="name" autoComplete="name" placeholder="Alex Morgan" />
          </Field.Root>

          <Field.Root required>
            <Field.Label>Email address</Field.Label>
            <Input name="email" type="email" autoComplete="email" placeholder="you@example.com" />
          </Field.Root>

          <Field.Root required>
            <Field.Label>Password</Field.Label>
            <Input name="password" type="password" autoComplete="new-password" />
          </Field.Root>

          <Field.Root required>
            <Field.Label>Confirm password</Field.Label>
            <Input name="confirm-password" type="password" autoComplete="new-password" />
          </Field.Root>

          <Checkbox name="terms" required>
            <Checkbox.Control />
            <Checkbox.Label>
              I agree to the{' '}
              <a className={styles.link} href="/terms">
                Terms of service
              </a>{' '}
              and{' '}
              <a className={styles.link} href="/privacy">
                Privacy policy
              </a>
              .
            </Checkbox.Label>
          </Checkbox>

          <Button type="submit" className={styles.submit}>
            Create account
          </Button>
        </form>
      </Card.Body>

      <Card.Footer className={styles.footer}>
        <p>
          Already have an account?{' '}
          <a className={styles.link} href="/sign-in">
            Sign in
          </a>
        </p>
      </Card.Footer>
    </Card>
  );
}