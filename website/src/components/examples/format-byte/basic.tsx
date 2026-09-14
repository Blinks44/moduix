import { Format } from '@ark-ui/react';

export default function FormatByteBasicDemo() {
  return (
    <p>
      Download size:{' '}
      <strong>
        <Format.Byte value={1_450_450} />
      </strong>
    </p>
  );
}