import { Button } from '@moduix/solid/button';
import { Card } from '@moduix/solid/card';
import { Field } from '@moduix/solid/field';
import { Input } from '@moduix/solid/input';
import styles from './forgot-password-form.module.css';

export function ForgotPassword({ onSubmit }: { onSubmit?: (event: SubmitEvent) => void }) {
  return (
    <Card class={styles.root}>
      <Card.Header class={styles.header}>
        <Card.Title>Reset your password</Card.Title>
        <Card.Description>Enter your email and we&apos;ll send you a reset link.</Card.Description>
      </Card.Header>

      <Card.Body>
        <form class={styles.stack} onSubmit={onSubmit}>
          <Field required>
            <Field.Label>Email address</Field.Label>
            <Input name="email" type="email" autocomplete="email" placeholder="you@example.com" />
          </Field>

          <Button type="submit" class={styles.submit}>
            Send reset link
          </Button>
        </form>
      </Card.Body>

      <Card.Footer class={styles.footer}>
        <p>
          Remembered your password?{' '}
          <a class={styles.link} href="/sign-in">
            Sign in
          </a>
        </p>
      </Card.Footer>
    </Card>
  );
}