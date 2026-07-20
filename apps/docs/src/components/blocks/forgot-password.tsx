import { Button, Card, Field, Input } from '@moduix/react';
import type { FormEventHandler } from 'react';
import styles from './forgot-password.module.css';
import '@moduix/react/style.css';

export function ForgotPassword({ onSubmit }: { onSubmit?: FormEventHandler<HTMLFormElement> }) {
  return (
    <Card className={styles.root}>
      <Card.Header className={styles.header}>
        <Card.Title>Reset your password</Card.Title>
        <Card.Description>Enter your email and we&apos;ll send you a reset link.</Card.Description>
      </Card.Header>

      <Card.Body>
        <form className={styles.form} onSubmit={onSubmit}>
          <Field.Root required>
            <Field.Label>Email address</Field.Label>
            <Input name="email" type="email" autoComplete="email" placeholder="you@example.com" />
          </Field.Root>

          <Button type="submit" className={styles.submit}>
            Send reset link
          </Button>
        </form>
      </Card.Body>

      <Card.Footer className={styles.footer}>
        <p>
          Remembered your password?{' '}
          <a className={styles.link} href="/sign-in">
            Sign in
          </a>
        </p>
      </Card.Footer>
    </Card>
  );
}