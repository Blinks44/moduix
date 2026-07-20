import { Button, Card, Field, Input } from '@moduix/react';
import type { FormEventHandler } from 'react';
import styles from './reset-password.module.css';
import '@moduix/react/style.css';

export function ResetPassword({ onSubmit }: { onSubmit?: FormEventHandler<HTMLFormElement> }) {
  return (
    <Card className={styles.root}>
      <Card.Header className={styles.header}>
        <Card.Title>Create a new password</Card.Title>
        <Card.Description>Choose a strong password you don&apos;t use elsewhere.</Card.Description>
      </Card.Header>

      <Card.Body>
        <form className={styles.form} onSubmit={onSubmit}>
          <Field.Root required>
            <Field.Label>New password</Field.Label>
            <Input name="password" type="password" autoComplete="new-password" />
          </Field.Root>

          <Field.Root required>
            <Field.Label>Confirm new password</Field.Label>
            <Input name="confirm-password" type="password" autoComplete="new-password" />
          </Field.Root>

          <Button type="submit" className={styles.submit}>
            Reset password
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