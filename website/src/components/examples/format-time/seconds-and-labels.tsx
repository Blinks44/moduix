import { Format } from '@ark-ui/react';

export default function FormatTimeSecondsAndLabelsDemo() {
  return (
    <dl>
      <div>
        <dt>Last sync</dt>
        <dd>
          <Format.Time value="09:08:12" withSeconds />
        </dd>
      </div>
      <div>
        <dt>Support window</dt>
        <dd>
          <Format.Time value="17:15" format="12h" amLabel="morning" pmLabel="evening" />
        </dd>
      </div>
    </dl>
  );
}