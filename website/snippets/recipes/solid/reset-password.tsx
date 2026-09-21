import { Button } from '@moduix/solid/button';
import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@moduix/solid/card';
import { Field, FieldLabel } from '@moduix/solid/field';
import { Input } from '@moduix/solid/input';
import styles from './reset-password-form.module.css';

export function ResetPassword({ onSubmit }: { onSubmit?: (event: SubmitEvent) => void }) {
  return (
    <Card class={styles.root}>
      <CardHeader class={styles.header}>
        <CardTitle>Create a new password</CardTitle>
        <CardDescription>Choose a strong password you don&apos;t use elsewhere.</CardDescription>
      </CardHeader>

      <CardBody>
        <form class={styles.stack} onSubmit={onSubmit}>
          <Field required>
            <FieldLabel>New password</FieldLabel>
            <Input name="password" type="password" autocomplete="new-password" />
          </Field>

          <Field required>
            <FieldLabel>Confirm new password</FieldLabel>
            <Input name="confirm-password" type="password" autocomplete="new-password" />
          </Field>

          <Button type="submit" class={styles.submit}>
            Reset password
          </Button>
        </form>
      </CardBody>

      <CardFooter class={styles.footer}>
        <p>
          Remembered your password?{' '}
          <a class={styles.link} href="/sign-in">
            Sign in
          </a>
        </p>
      </CardFooter>
    </Card>
  );
}
