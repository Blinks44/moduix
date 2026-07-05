//#region demo
import { Checkbox } from '@moduix/react';

const _name = 'terms';
const _value = 'accepted';

export function CheckboxWithFormDemo() {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log(formData.get('terms'));
      }}
    >
      <Checkbox name="terms" value="accepted">
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        <Checkbox.Label>I agree to the terms and conditions</Checkbox.Label>
        <Checkbox.HiddenInput />
      </Checkbox>
      <button type="submit">Submit</button>
    </form>
  );
}
//#endregion