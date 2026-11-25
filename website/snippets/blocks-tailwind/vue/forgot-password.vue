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
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

const emit = defineEmits<{ submit: [event: Event] }>();
</script>

<template>
  <Card class="w-[min(100%,26rem)]">
    <CardHeader class="flex flex-col gap-2 text-center">
      <CardTitle>Reset your password</CardTitle>
      <CardDescription>Enter your email and we&apos;ll send you a reset link.</CardDescription>
    </CardHeader>

    <CardBody>
      <form class="grid gap-4" @submit="emit('submit', $event)">
        <Field required>
          <FieldLabel>Email address</FieldLabel>
          <Input name="email" type="email" autocomplete="email" placeholder="you@example.com" />
        </Field>

        <Button type="submit" class="w-full"> Send reset link </Button>
      </form>
    </CardBody>

    <CardFooter
      class="justify-center text-center [&_p]:m-0 [&_p]:text-sm [&_p]:text-muted-foreground"
    >
      <p>
        Remembered your password?
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