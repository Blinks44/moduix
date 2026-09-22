import { Button } from '@moduix/react/button';
import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@moduix/react/card';
import {
  Checkbox,
  CheckboxControl,
  CheckboxHiddenInput,
  CheckboxLabel,
} from '@moduix/react/checkbox';
import { Field, FieldLabel } from '@moduix/react/field';
import { Input } from '@moduix/react/input';
import type { FormEventHandler } from 'react';
import styles from './login-simple-form.module.css';

export function LoginSimple({ onSubmit }: { onSubmit?: FormEventHandler<HTMLFormElement> }) {
  return (
    <Card className={styles.root}>
      <CardHeader className={styles.header}>
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>Sign in to continue to your workspace.</CardDescription>
      </CardHeader>

      <CardBody>
        <form className={styles.stack} onSubmit={onSubmit}>
          <Field required>
            <FieldLabel>Email address</FieldLabel>
            <Input name="email" type="email" autoComplete="email" placeholder="you@example.com" />
          </Field>

          <Field required>
            <div className={styles.passwordLabel}>
              <FieldLabel>Password</FieldLabel>
              <a className={styles.link} href="/forgot-password">
                Forgot password?
              </a>
            </div>
            <Input name="password" type="password" autoComplete="current-password" />
          </Field>

          <Checkbox name="remember">
            <CheckboxHiddenInput />
            <CheckboxControl />
            <CheckboxLabel>Remember me</CheckboxLabel>
          </Checkbox>

          <Button type="submit" className={styles.submit}>
            Sign in
          </Button>
        </form>
      </CardBody>

      <CardFooter className={styles.footer}>
        <p>
          New here?{' '}
          <a className={styles.link} href="/sign-up">
            Create an account
          </a>
        </p>
      </CardFooter>
    </Card>
  );
}