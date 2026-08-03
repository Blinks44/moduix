import { AngleSlider } from '@moduix/react/angle-slider';
import { Button } from '@moduix/react/button';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

const markerValues = [0, 45, 90, 135, 180, 225, 270, 315];

export default function AngleSliderFormDemo() {
  const [submitted, setSubmitted] = useState('Nothing submitted');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(`${String(new FormData(event.currentTarget).get('rotation') ?? '')}°`);
  };

  return (
    <form
      className="docs-angle-slider-form-layout"
      onReset={() => setSubmitted('Nothing submitted')}
      onSubmit={handleSubmit}
    >
      <AngleSlider
        defaultValue={135}
        aria-label="Rotation"
        name="rotation"
        className="docs-angle-slider-form"
      >
        <AngleSlider.Label>Rotation</AngleSlider.Label>
        <AngleSlider.Dial>
          <AngleSlider.Marks values={markerValues} />
        </AngleSlider.Dial>
        <AngleSlider.ValueText />
      </AngleSlider>
      <PreviewMeta>
        <output>Submitted: {submitted}</output>
        <Button type="submit" size="sm">
          Submit
        </Button>
        <Button type="reset" size="sm" variant="outline">
          Reset
        </Button>
      </PreviewMeta>
    </form>
  );
}