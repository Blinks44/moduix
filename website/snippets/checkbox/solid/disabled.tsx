import { Checkbox } from '@moduix/solid/checkbox';

export default function CheckboxDisabledDemo() {
  return (
    <Checkbox disabled>
      <Checkbox.Control />
      <Checkbox.Label>Receive weekly summary</Checkbox.Label>
      <Checkbox.HiddenInput />
    </Checkbox>
  );
}