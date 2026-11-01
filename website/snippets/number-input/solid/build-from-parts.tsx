import {
  NumberInput,
  NumberInputControl,
  NumberInputDecrementTrigger,
  NumberInputIncrementTrigger,
  NumberInputInput,
  NumberInputLabel,
} from '@moduix/solid/number-input';
import { Minus as MinusIcon, Plus as PlusIcon } from 'lucide-solid';

export default function BuildFromPartsNumberInputDemo() {
  return (
    <NumberInput defaultValue="100">
      <NumberInputLabel>Amount</NumberInputLabel>
      <NumberInputControl>
        <NumberInputDecrementTrigger>
          <MinusIcon strokeWidth={3} />
        </NumberInputDecrementTrigger>
        <NumberInputInput />
        <NumberInputIncrementTrigger>
          <PlusIcon strokeWidth={3} />
        </NumberInputIncrementTrigger>
      </NumberInputControl>
    </NumberInput>
  );
}