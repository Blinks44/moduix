import { Checkbox } from '@moduix/react/checkbox';

export default function CheckboxSizesDemo() {
  return (
    <Checkbox size="lg" defaultChecked>
      <Checkbox.Control />
      <Checkbox.Label>Large</Checkbox.Label>
    </Checkbox>
  );
}