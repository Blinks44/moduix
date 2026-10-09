import {
  Checkbox,
  CheckboxControl,
  CheckboxHiddenInput,
  CheckboxLabel,
} from '@moduix/react/checkbox';

export default function CheckboxReadOnlyDemo() {
  return (
    <Checkbox readOnly defaultChecked>
      <CheckboxControl />
      <CheckboxLabel>Preserve existing setting</CheckboxLabel>
      <CheckboxHiddenInput />
    </Checkbox>
  );
}