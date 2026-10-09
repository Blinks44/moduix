import { Button } from '@/registry/solid/ui/button';
import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/registry/solid/ui/card';
import {
  Checkbox,
  CheckboxControl,
  CheckboxHiddenInput,
  CheckboxLabel,
} from '@/registry/solid/ui/checkbox';
import { Field, FieldLabel } from '@/registry/solid/ui/field';
import { Input } from '@/registry/solid/ui/input';
import styles from './sign-up-form.module.css';

export function SignUp({ onSubmit }: { onSubmit?: (event: SubmitEvent) => void }) {
  return (
    <Card class={styles.root}>
      <CardHeader class={styles.header}>
        <CardTitle>Create your account</CardTitle>
        <CardDescription>Start building with moduix in minutes.</CardDescription>
      </CardHeader>

      <CardBody>
        <form class={styles.stack} onSubmit={onSubmit}>
          <Field required>
            <FieldLabel>Full name</FieldLabel>
            <Input name="name" autocomplete="name" placeholder="Alex Morgan" />
          </Field>

          <Field required>
            <FieldLabel>Email address</FieldLabel>
            <Input name="email" type="email" autocomplete="email" placeholder="you@example.com" />
          </Field>

          <Field required>
            <FieldLabel>Password</FieldLabel>
            <Input name="password" type="password" autocomplete="new-password" />
          </Field>

          <Field required>
            <FieldLabel>Confirm password</FieldLabel>
            <Input name="confirm-password" type="password" autocomplete="new-password" />
          </Field>

          <Checkbox name="terms" required>
            <CheckboxHiddenInput />
            <CheckboxControl />
            <CheckboxLabel>
              I agree to the{' '}
              <a class={styles.link} href="/terms">
                Terms of service
              </a>{' '}
              and{' '}
              <a class={styles.link} href="/privacy">
                Privacy policy
              </a>
              .
            </CheckboxLabel>
          </Checkbox>

          <Button type="submit" class={styles.submit}>
            Create account
          </Button>
        </form>
      </CardBody>

      <CardFooter class={styles.footer}>
        <p>
          Already have an account?{' '}
          <a class={styles.link} href="/sign-in">
            Sign in
          </a>
        </p>
      </CardFooter>
    </Card>
  );
}