import {
  Checkbox,
  CheckboxControl,
  CheckboxHiddenInput,
  CheckboxIndicator,
  CheckboxLabel,
} from '@moduix/react/checkbox';
import { Check as CheckIcon, Minus as MinusIcon } from 'lucide-react';

export default function BuildFromPartsCheckboxDemo() {
  return (
    <Checkbox>
      <CheckboxControl>
        <CheckboxIndicator>
          <CheckIcon strokeWidth={3} />
        </CheckboxIndicator>
        <CheckboxIndicator indeterminate>
          <MinusIcon strokeWidth={3} />
        </CheckboxIndicator>
      </CheckboxControl>
      <CheckboxLabel>Enable notifications</CheckboxLabel>
      <CheckboxHiddenInput />
    </Checkbox>
  );
}