import { NumberInput } from '@moduix/react/number-input';

export default function DisabledAndReadOnlyNumberInputDemo() {
  return (
    <div style={{ display: 'grid', gap: '0.75rem', justifyItems: 'start' }}>
      <NumberInput defaultValue="4" disabled>
        <NumberInput.Label>Disabled quantity</NumberInput.Label>
        <NumberInput.Field />
      </NumberInput>
      <NumberInput defaultValue="8" readOnly>
        <NumberInput.Label>Read-only quantity</NumberInput.Label>
        <NumberInput.Field />
      </NumberInput>
    </div>
  );
}