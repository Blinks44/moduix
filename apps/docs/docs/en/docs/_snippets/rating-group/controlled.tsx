import { RatingGroup } from '@moduix/react';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

export default function ControlledRatingGroupDemo() {
  const [value, setValue] = useState(3);
  return (
    <div className="rating-group-stack">
      <RatingGroup value={value} onValueChange={(details) => setValue(details.value)}>
        <RatingGroup.Label>Support quality</RatingGroup.Label>
        <RatingGroup.Control>
          <RatingGroup.Items />
        </RatingGroup.Control>
      </RatingGroup>
      <PreviewMeta>
        <output className="rating-group-hint">Current value: {value}</output>
      </PreviewMeta>
    </div>
  );
}