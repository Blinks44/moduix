import { Field, Input } from '@moduix/react';

export default function SecurityCodeDemo() {
  return (
    <Field>
      <Field.Label>Security code</Field.Label>
      <Input
        htmlSize={8}
        inputMode="numeric"
        maxLength={6}
        name="security-code"
        autoComplete="one-time-code"
        placeholder="000000"
      />
    </Field>
  );
}