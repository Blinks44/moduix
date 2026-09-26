import {
  Checkbox,
  CheckboxControl,
  CheckboxHiddenInput,
  CheckboxLabel,
} from '@moduix/solid/checkbox';

export default function CheckboxIndeterminateDemo() {
  return (
    <Checkbox checked="indeterminate">
      <CheckboxControl />
      <CheckboxLabel>Select all team members</CheckboxLabel>
      <CheckboxHiddenInput />
    </Checkbox>
  );
}