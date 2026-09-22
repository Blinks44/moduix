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
import styles from './forgot-password-form.module.css';

export function ForgotPassword({ onSubmit }: { onSubmit?: (event: SubmitEvent) => void }) {
  return (
    <Card class={styles.root}>
      <CardHeader class={styles.header}>
        <CardTitle>Reset your password</CardTitle>
        <CardDescription>Enter your email and we&apos;ll send you a reset link.</CardDescription>
      </CardHeader>

      <CardBody>
        <form class={styles.stack} onSubmit={onSubmit}>
          <Field required>
            <FieldLabel>Email address</FieldLabel>
            <Input name="email" type="email" autocomplete="email" placeholder="you@example.com" />
          </Field>

          <Button type="submit" class={styles.submit}>
            Send reset link
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