//#region demo
import { Button, Checkbox } from '@moduix/react';
import { useState } from 'react';

const _name = 'terms';
const _value = 'accepted';

export function CheckboxWithFormDemo() {
  const [submitted, setSubmitted] = useState('terms: none');

  return (
    <form
      className="checkbox-stack"
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        setSubmitted(`terms: ${formData.get('terms') ?? 'none'}`);
      }}
    >
      <Checkbox name="terms" value="accepted">
        <Checkbox.Control />
        <Checkbox.Label>I agree to the terms and conditions</Checkbox.Label>
      </Checkbox>
      <Button type="submit">Submit</Button>
      <output className="checkbox-result">{submitted}</output>
    </form>
  );
}
//#endregion