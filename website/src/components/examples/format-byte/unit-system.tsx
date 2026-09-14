import { Format } from '@ark-ui/react';

const storageSize = 1_024_000;

export default function FormatByteUnitSystemDemo() {
  return (
    <dl>
      <div>
        <dt>Decimal (1000)</dt>
        <dd>
          <Format.Byte unitSystem="decimal" value={storageSize} />
        </dd>
      </div>
      <div>
        <dt>Binary (1024)</dt>
        <dd>
          <Format.Byte unitSystem="binary" value={storageSize} />
        </dd>
      </div>
    </dl>
  );
}