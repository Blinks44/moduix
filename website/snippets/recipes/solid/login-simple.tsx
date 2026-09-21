import { Button } from '@moduix/solid/button';
import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@moduix/solid/card';
import {
  Checkbox,
  CheckboxControl,
  CheckboxHiddenInput,
  CheckboxLabel,
} from '@moduix/solid/checkbox';
import { Field } from '@moduix/solid/field';
import { Input } from '@moduix/solid/input';
import styles from './login-simple-form.module.css';

export function LoginSimple({ onSubmit }: { onSubmit?: (event: SubmitEvent) => void }) {
  return (
    <Card class={styles.root}>
      <CardHeader class={styles.header}>
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>Sign in to continue to your workspace.</CardDescription>
      </CardHeader>

      <CardBody>
        <form class={styles.stack} onSubmit={onSubmit}>
          <Field required>
            <Field.Label>Email address</Field.Label>
            <Input name="email" type="email" autocomplete="email" placeholder="you@example.com" />
          </Field>

          <Field required>
            <div class={styles.passwordLabel}>
              <Field.Label>Password</Field.Label>
              <a class={styles.link} href="/forgot-password">
                Forgot password?
              </a>
            </div>
            <Input name="password" type="password" autocomplete="current-password" />
          </Field>

          <Checkbox name="remember">
            <CheckboxHiddenInput />
            <CheckboxControl />
            <CheckboxLabel>Remember me</CheckboxLabel>
          </Checkbox>

          <Button type="submit" class={styles.submit}>
            Sign in
          </Button>
        </form>
      </CardBody>

      <CardFooter class={styles.footer}>
        <p>
          New here?{' '}
          <a class={styles.link} href="/sign-up">
            Create an account
          </a>
        </p>
      </CardFooter>
    </Card>
  );
}