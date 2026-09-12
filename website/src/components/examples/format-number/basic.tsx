import { Format } from '@ark-ui/react';

export default function FormatNumberBasicDemo() {
  return (
    <p>
      Available balance:{' '}
      <strong>
        <Format.Number value={12_345.67} />
      </strong>
    </p>
  );
}