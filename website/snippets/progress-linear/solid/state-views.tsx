import { Button } from '@moduix/solid/button';
import {
  ProgressLinear,
  ProgressLinearLabel,
  ProgressLinearValueText,
  ProgressLinearTrack,
  ProgressLinearRange,
  ProgressLinearView,
} from '@moduix/solid/progress-linear';
import { createSignal } from 'solid-js';

export default function StateViewsProgressLinearDemo() {
  const [value, setValue] = createSignal<number | null>(null);
  const state = () =>
    value() === null ? 'Indeterminate' : value() === 100 ? 'Complete' : 'Loading';

  return (
    <>
      <ProgressLinear value={value()}>
        <ProgressLinearLabel>Preparing report</ProgressLinearLabel>
        <ProgressLinearValueText />
        <ProgressLinearTrack aria-label="Preparing report">
          <ProgressLinearRange />
        </ProgressLinearTrack>
        <ProgressLinearView state="indeterminate">Waiting for source data</ProgressLinearView>
        <ProgressLinearView state="loading">Transfer in progress</ProgressLinearView>
        <ProgressLinearView state="complete">Export complete</ProgressLinearView>
      </ProgressLinear>
      <output>State: {state()}</output>
      <Button type="button" size="sm" variant="outline" onClick={() => setValue(null)}>
        Indeterminate
      </Button>
      <Button type="button" size="sm" variant="outline" onClick={() => setValue(45)}>
        Loading
      </Button>
      <Button type="button" size="sm" variant="outline" onClick={() => setValue(100)}>
        Complete
      </Button>
    </>
  );
}