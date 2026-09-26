import {
  Checkbox,
  CheckboxControl,
  CheckboxHiddenInput,
  CheckboxLabel,
} from '@moduix/solid/checkbox';

export default function CheckboxDisabledDemo() {
  return (
    <Checkbox disabled>
      <CheckboxControl />
      <CheckboxLabel>Receive weekly summary</CheckboxLabel>
      <CheckboxHiddenInput />
    </Checkbox>
  );
}