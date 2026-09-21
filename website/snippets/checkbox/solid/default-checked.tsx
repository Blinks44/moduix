import {
  Checkbox,
  CheckboxControl,
  CheckboxHiddenInput,
  CheckboxLabel,
} from '@moduix/solid/checkbox';

export default function CheckboxDefaultCheckedDemo() {
  return (
    <Checkbox defaultChecked>
      <CheckboxControl />
      <CheckboxLabel>Enable notifications</CheckboxLabel>
      <CheckboxHiddenInput />
    </Checkbox>
  );
}