import {
  Checkbox,
  CheckboxControl,
  CheckboxHiddenInput,
  CheckboxLabel,
} from '@moduix/react/checkbox';

export default function CheckboxSizesDemo() {
  return (
    <Checkbox size="lg" defaultChecked>
      <CheckboxControl />
      <CheckboxLabel>Large</CheckboxLabel>
      <CheckboxHiddenInput />
    </Checkbox>
  );
}