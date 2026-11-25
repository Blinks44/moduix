<script setup lang="ts">
import { Button } from '@/components/ui/button';
import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Checkbox,
  CheckboxControl,
  CheckboxHiddenInput,
  CheckboxLabel,
} from '@/components/ui/checkbox';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

const emit = defineEmits<{ submit: [event: Event] }>();
</script>

<template>
  <Card class="w-[min(100%,26rem)]">
    <CardHeader class="flex flex-col gap-2 text-center">
      <CardTitle>Create your account</CardTitle>
      <CardDescription>Start building with moduix in minutes.</CardDescription>
    </CardHeader>

    <CardBody>
      <form class="grid gap-4" @submit="emit('submit', $event)">
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
            I agree to the
            <a
              class="text-sm font-medium text-primary underline-offset-[0.2em] hover:text-foreground hover:underline focus-visible:rounded-xs focus-visible:outline-focus focus-visible:outline-offset-focus focus-visible:outline-ring"
              href="/terms"
            >
              Terms of service
            </a>
            and
            <a
              class="text-sm font-medium text-primary underline-offset-[0.2em] hover:text-foreground hover:underline focus-visible:rounded-xs focus-visible:outline-focus focus-visible:outline-offset-focus focus-visible:outline-ring"
              href="/privacy"
            >
              Privacy policy
            </a>
            .
          </CheckboxLabel>
        </Checkbox>

        <Button type="submit" class="w-full"> Create account </Button>
      </form>
    </CardBody>

    <CardFooter
      class="justify-center text-center [&_p]:m-0 [&_p]:text-sm [&_p]:text-muted-foreground"
    >
      <p>
        Already have an account?
        <a
          class="text-sm font-medium text-primary underline-offset-[0.2em] hover:text-foreground hover:underline focus-visible:rounded-xs focus-visible:outline-focus focus-visible:outline-offset-focus focus-visible:outline-ring"
          href="/sign-in"
        >
          Sign in
        </a>
      </p>
    </CardFooter>
  </Card>
</template>