import { Button } from '@moduix/react/button';
import { Card } from '@moduix/react/card';
import { Checkbox } from '@moduix/react/checkbox';
import { Field } from '@moduix/react/field';
import { Input } from '@moduix/react/input';
import type { FormEventHandler } from 'react';
import styles from './login-simple.module.css';

export function LoginSimple({ onSubmit }: { onSubmit?: FormEventHandler<HTMLFormElement> }) {
  return (
    <Card className={styles.root}>
      <Card.Header className={styles.header}>
        <Card.Title>Welcome back</Card.Title>
        <Card.Description>Sign in to continue to your workspace.</Card.Description>
      </Card.Header>

      <Card.Body>
        <form className={styles.form} onSubmit={onSubmit}>
          <Field.Root required>
            <Field.Label>Email address</Field.Label>
            <Input name="email" type="email" autoComplete="email" placeholder="you@example.com" />
          </Field.Root>

          <Field.Root required>
            <div className={styles.passwordLabel}>
              <Field.Label>Password</Field.Label>
              <a className={styles.link} href="/forgot-password">
                Forgot password?
              </a>
            </div>
            <Input name="password" type="password" autoComplete="current-password" />
          </Field.Root>

          <Checkbox name="remember">
            <Checkbox.Control />
            <Checkbox.Label>Remember me</Checkbox.Label>
          </Checkbox>

          <Button type="submit" className={styles.submit}>
            Sign in
          </Button>
        </form>
      </Card.Body>

      <Card.Footer className={styles.footer}>
        <p>
          New here?{' '}
          <a className={styles.link} href="/sign-up">
            Create an account
          </a>
        </p>
      </Card.Footer>
    </Card>
  );
}