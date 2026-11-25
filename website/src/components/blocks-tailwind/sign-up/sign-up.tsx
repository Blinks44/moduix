'use client';

import type { FormEventHandler } from 'react';
import { Button } from '@/registry/react/ui/button';
import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/registry/react/ui/card';
import {
  Checkbox,
  CheckboxControl,
  CheckboxHiddenInput,
  CheckboxLabel,
} from '@/registry/react/ui/checkbox';
import { Field, FieldLabel } from '@/registry/react/ui/field';
import { Input } from '@/registry/react/ui/input';

export function SignUp({ onSubmit }: { onSubmit?: FormEventHandler<HTMLFormElement> }) {
  return (
    <Card className="w-[min(100%,26rem)]">
      <CardHeader className="flex flex-col gap-2 text-center">
        <CardTitle>Create your account</CardTitle>
        <CardDescription>Start building with moduix in minutes.</CardDescription>
      </CardHeader>

      <CardBody>
        <form className="grid gap-4" onSubmit={onSubmit}>
          <Field required>
            <FieldLabel>Full name</FieldLabel>
            <Input name="name" autoComplete="name" placeholder="Alex Morgan" />
          </Field>

          <Field required>
            <FieldLabel>Email address</FieldLabel>
            <Input name="email" type="email" autoComplete="email" placeholder="you@example.com" />
          </Field>

          <Field required>
            <FieldLabel>Password</FieldLabel>
            <Input name="password" type="password" autoComplete="new-password" />
          </Field>

          <Field required>
            <FieldLabel>Confirm password</FieldLabel>
            <Input name="confirm-password" type="password" autoComplete="new-password" />
          </Field>

          <Checkbox name="terms" required>
            <CheckboxHiddenInput />
            <CheckboxControl />
            <CheckboxLabel>
              I agree to the{' '}
              <a
                className="text-sm font-medium text-primary underline-offset-[0.2em] hover:text-foreground hover:underline focus-visible:rounded-xs focus-visible:outline-focus focus-visible:outline-offset-focus focus-visible:outline-ring"
                href="/terms"
              >
                Terms of service
              </a>{' '}
              and{' '}
              <a
                className="text-sm font-medium text-primary underline-offset-[0.2em] hover:text-foreground hover:underline focus-visible:rounded-xs focus-visible:outline-focus focus-visible:outline-offset-focus focus-visible:outline-ring"
                href="/privacy"
              >
                Privacy policy
              </a>
              .
            </CheckboxLabel>
          </Checkbox>

          <Button type="submit" className="w-full">
            Create account
          </Button>
        </form>
      </CardBody>

      <CardFooter className="justify-center text-center [&_p]:m-0 [&_p]:text-sm [&_p]:text-muted-foreground">
        <p>
          Already have an account?{' '}
          <a
            className="text-sm font-medium text-primary underline-offset-[0.2em] hover:text-foreground hover:underline focus-visible:rounded-xs focus-visible:outline-focus focus-visible:outline-offset-focus focus-visible:outline-ring"
            href="/sign-in"
          >
            Sign in
          </a>
        </p>
      </CardFooter>
    </Card>
  );
}