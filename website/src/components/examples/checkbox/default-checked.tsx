import {
  Checkbox,
  CheckboxControl,
  CheckboxHiddenInput,
  CheckboxLabel,
} from '@moduix/react/checkbox';

export default function CheckboxDefaultCheckedDemo() {
  return (
    <Checkbox defaultChecked>
      <CheckboxControl />
      <CheckboxLabel>Enable notifications</CheckboxLabel>
      <CheckboxHiddenInput />
    </Checkbox>
  );
}