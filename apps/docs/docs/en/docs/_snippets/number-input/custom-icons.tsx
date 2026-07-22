import { NumberInput } from '@moduix/react';
import { ChevronDown as ChevronDownIcon, ChevronUp as ChevronUpIcon } from 'lucide-react';

export default function CustomIconsNumberInputDemo() {
  return (
    <NumberInput defaultValue="8">
      <NumberInput.Label>Floors</NumberInput.Label>
      <NumberInput.Control>
        <NumberInput.DecrementTrigger className="number-input-custom-button">
          <ChevronDownIcon />
        </NumberInput.DecrementTrigger>
        <NumberInput.Input className="number-input-custom-input" />
        <NumberInput.IncrementTrigger className="number-input-custom-button">
          <ChevronUpIcon />
        </NumberInput.IncrementTrigger>
      </NumberInput.Control>
    </NumberInput>
  );
}