import {
  NumberInput,
  NumberInputField,
  NumberInputLabel,
  NumberInputValueText,
} from '@moduix/react/number-input';

export default function ValueTextNumberInputDemo() {
  return (
    <NumberInput defaultValue="42">
      <NumberInputLabel>Value preview</NumberInputLabel>
      <NumberInputField />
      <NumberInputValueText />
    </NumberInput>
  );
}