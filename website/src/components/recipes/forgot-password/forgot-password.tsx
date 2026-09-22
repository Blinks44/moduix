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
import styles from './forgot-password-form.module.css';

export function ForgotPassword({ onSubmit }: { onSubmit?: FormEventHandler<HTMLFormElement> }) {
  return (
    <Card className={styles.root}>
      <CardHeader className={styles.header}>
        <CardTitle>Reset your password</CardTitle>
        <CardDescription>Enter your email and we&apos;ll send you a reset link.</CardDescription>
      </CardHeader>

      <CardBody>
        <form className={styles.stack} onSubmit={onSubmit}>
          <Field required>
            <FieldLabel>Email address</FieldLabel>
            <Input name="email" type="email" autoComplete="email" placeholder="you@example.com" />
          </Field>

          <Button type="submit" className={styles.submit}>
            Send reset link
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