import {
  Checkbox,
  CheckboxControl,
  CheckboxHiddenInput,
  CheckboxLabel,
} from '@moduix/react/checkbox';

export default function CheckboxDisabledDemo() {
  return (
    <Checkbox disabled>
      <CheckboxControl />
      <CheckboxLabel>Receive weekly summary</CheckboxLabel>
      <CheckboxHiddenInput />
    </Checkbox>
  );
}