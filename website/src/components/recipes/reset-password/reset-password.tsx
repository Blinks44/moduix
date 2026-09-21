import { Button } from '@moduix/react/button';
import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@moduix/react/card';
import { Field, FieldLabel } from '@moduix/react/field';
import { Input } from '@moduix/react/input';
import type { FormEventHandler } from 'react';
import styles from './reset-password-form.module.css';

export function ResetPassword({ onSubmit }: { onSubmit?: FormEventHandler<HTMLFormElement> }) {
  return (
    <Card className={styles.root}>
      <CardHeader className={styles.header}>
        <CardTitle>Create a new password</CardTitle>
        <CardDescription>Choose a strong password you don&apos;t use elsewhere.</CardDescription>
      </CardHeader>

      <CardBody>
        <form className={styles.stack} onSubmit={onSubmit}>
          <Field required>
            <FieldLabel>New password</FieldLabel>
            <Input name="password" type="password" autoComplete="new-password" />
          </Field>

          <Field required>
            <FieldLabel>Confirm new password</FieldLabel>
            <Input name="confirm-password" type="password" autoComplete="new-password" />
          </Field>

          <Button type="submit" className={styles.submit}>
            Reset password
          </Button>
        </form>
      </CardBody>

      <CardFooter className={styles.footer}>
        <p>
          Remembered your password?{' '}
          <a className={styles.link} href="/sign-in">
            Sign in
          </a>
        </p>
      </CardFooter>
    </Card>
  );
}
