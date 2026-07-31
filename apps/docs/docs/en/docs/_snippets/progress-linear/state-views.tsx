import { Button } from '@moduix/react/button';
import { ProgressLinear } from '@moduix/react/progress-linear';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

export default function StateViewsProgressLinearDemo() {
  const [value, setValue] = useState<number | null>(null);
  const state = value === null ? 'Indeterminate' : value === 100 ? 'Complete' : 'Loading';

  return (
    <>
      <ProgressLinear value={value}>
        <ProgressLinear.Label>Preparing report</ProgressLinear.Label>
        <ProgressLinear.ValueText />
        <ProgressLinear.Track aria-label="Preparing report">
          <ProgressLinear.Range />
        </ProgressLinear.Track>
        <ProgressLinear.View state="indeterminate">Waiting for source data</ProgressLinear.View>
        <ProgressLinear.View state="loading">Transfer in progress</ProgressLinear.View>
        <ProgressLinear.View state="complete">Export complete</ProgressLinear.View>
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