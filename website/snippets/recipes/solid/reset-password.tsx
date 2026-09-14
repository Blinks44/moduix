import { Button } from '@moduix/solid/button';
import { Card } from '@moduix/solid/card';
import { Field } from '@moduix/solid/field';
import { Input } from '@moduix/solid/input';
import styles from './reset-password-form.module.css';

export function ResetPassword({ onSubmit }: { onSubmit?: (event: SubmitEvent) => void }) {
  return (
    <Card class={styles.root}>
      <Card.Header class={styles.header}>
        <Card.Title>Create a new password</Card.Title>
        <Card.Description>Choose a strong password you don&apos;t use elsewhere.</Card.Description>
      </Card.Header>

      <Card.Body>
        <form class={styles.stack} onSubmit={onSubmit}>
          <Field required>
            <Field.Label>New password</Field.Label>
            <Input name="password" type="password" autocomplete="new-password" />
          </Field>

          <Field required>
            <Field.Label>Confirm new password</Field.Label>
            <Input name="confirm-password" type="password" autocomplete="new-password" />
          </Field>

          <Button type="submit" class={styles.submit}>
            Reset password
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