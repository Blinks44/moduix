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

export function LoginSimple({ onSubmit }: { onSubmit?: (event: SubmitEvent) => void }) {
  return (
    <Card class="w-[min(100%,26rem)]">
      <CardHeader class="flex flex-col gap-2 text-center">
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>Sign in to continue to your workspace.</CardDescription>
      </CardHeader>

      <CardBody>
        <form class="grid gap-4" onSubmit={onSubmit}>
          <Field required>
            <FieldLabel>Email address</FieldLabel>
            <Input name="email" type="email" autocomplete="email" placeholder="you@example.com" />
          </Field>

          <Field required>
            <div class="flex w-full flex-wrap items-baseline justify-between gap-2">
              <FieldLabel>Password</FieldLabel>
              <a
                class="text-sm font-medium text-primary underline-offset-[0.2em] hover:text-foreground hover:underline focus-visible:rounded-xs focus-visible:outline-focus focus-visible:outline-offset-focus focus-visible:outline-ring"
                href="/forgot-password"
              >
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

          <Button type="submit" class="w-full">
            Sign in
          </Button>
        </form>
      </CardBody>

      <CardFooter class="justify-center text-center [&_p]:m-0 [&_p]:text-sm [&_p]:text-muted-foreground">
        <p>
          New here?{' '}
          <a
            class="text-sm font-medium text-primary underline-offset-[0.2em] hover:text-foreground hover:underline focus-visible:rounded-xs focus-visible:outline-focus focus-visible:outline-offset-focus focus-visible:outline-ring"
            href="/sign-up"
          >
            Create an account
          </a>
        </p>
      </CardFooter>
    </Card>
  );
}