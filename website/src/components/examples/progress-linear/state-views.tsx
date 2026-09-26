import { Button } from '@moduix/react/button';
import {
  ProgressLinear,
  ProgressLinearLabel,
  ProgressLinearValueText,
  ProgressLinearTrack,
  ProgressLinearRange,
  ProgressLinearView,
} from '@moduix/react/progress-linear';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

export default function StateViewsProgressLinearDemo() {
  const [value, setValue] = useState<number | null>(null);
  const state = value === null ? 'Indeterminate' : value === 100 ? 'Complete' : 'Loading';

  return (
    <>
      <ProgressLinear value={value}>
        <ProgressLinearLabel>Preparing report</ProgressLinearLabel>
        <ProgressLinearValueText />
        <ProgressLinearTrack aria-label="Preparing report">
          <ProgressLinearRange />
        </ProgressLinearTrack>
        <ProgressLinearView state="indeterminate">Waiting for source data</ProgressLinearView>
        <ProgressLinearView state="loading">Transfer in progress</ProgressLinearView>
        <ProgressLinearView state="complete">Export complete</ProgressLinearView>
      </ProgressLinear>
      <PreviewMeta>
        <output>State: {state}</output>
        <Button type="button" size="sm" variant="outline" onClick={() => setValue(null)}>
          Indeterminate
        </Button>
        <Button type="button" size="sm" variant="outline" onClick={() => setValue(45)}>
          Loading
        </Button>
        <Button type="button" size="sm" variant="outline" onClick={() => setValue(100)}>
          Complete
        </Button>
      </PreviewMeta>
    </>
  );
}