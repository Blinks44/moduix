import { Field } from '@moduix/react/field';
import { Textarea } from '@moduix/react/textarea';
import { useState } from 'react';

export default function TextareaControlledDemo() {
  const [value, setValue] = useState('');

  return (
    <Field>
      <Field.Label>Feedback</Field.Label>
      <Textarea
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
        placeholder="Type to control value"
      />
    </Field>
  );
}