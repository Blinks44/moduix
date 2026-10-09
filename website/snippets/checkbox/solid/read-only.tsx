import {
  Checkbox,
  CheckboxControl,
  CheckboxHiddenInput,
  CheckboxLabel,
} from '@moduix/solid/checkbox';

export default function CheckboxReadOnlyDemo() {
  return (
    <Checkbox readOnly defaultChecked>
      <CheckboxControl />
      <CheckboxLabel>Preserve existing setting</CheckboxLabel>
      <CheckboxHiddenInput />
    </Checkbox>
  );
}