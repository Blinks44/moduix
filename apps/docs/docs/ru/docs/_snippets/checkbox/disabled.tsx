import { Checkbox } from '@moduix/react/checkbox';

export default function CheckboxDisabledDemo() {
  return (
    <Checkbox disabled>
      <Checkbox.Control />
      <Checkbox.Label>Receive weekly summary</Checkbox.Label>
    </Checkbox>
  );
}