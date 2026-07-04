/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Field, Input } from '@moduix/react';

export function SecurityCodeDemo() {
  return (
    <Field className="input-demo-field">
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

//#endregion