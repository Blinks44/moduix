import { Button } from '@/registry/solid/ui/button';
import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/registry/solid/ui/card';
import { Field, FieldLabel } from '@/registry/solid/ui/field';
import { Input } from '@/registry/solid/ui/input';

export function ResetPassword({ onSubmit }: { onSubmit?: (event: SubmitEvent) => void }) {
  return (
    <Card class="w-[min(100%,26rem)]">
      <CardHeader class="flex flex-col gap-2 text-center">
        <CardTitle>Create a new password</CardTitle>
        <CardDescription>Choose a strong password you don&apos;t use elsewhere.</CardDescription>
      </CardHeader>

      <CardBody>
        <form class="grid gap-4" onSubmit={onSubmit}>
          <Field required>
            <FieldLabel>New password</FieldLabel>
            <Input name="password" type="password" autocomplete="new-password" />
          </Field>

          <Field required>
            <FieldLabel>Confirm new password</FieldLabel>
            <Input name="confirm-password" type="password" autocomplete="new-password" />
          </Field>

          <Button type="submit" class="w-full">
            Reset password
          </Button>
        </form>
      </CardBody>

      <CardFooter class="justify-center text-center [&_p]:m-0 [&_p]:text-sm [&_p]:text-muted-foreground">
        <p>
          Remembered your password?{' '}
          <a
            class="text-sm font-medium text-primary underline-offset-[0.2em] hover:text-foreground hover:underline focus-visible:rounded-xs focus-visible:outline-focus focus-visible:outline-offset-focus focus-visible:outline-ring"
            href="/sign-in"
          >
            Sign in
          </a>
        </p>
      </CardFooter>
    </Card>
  );
}