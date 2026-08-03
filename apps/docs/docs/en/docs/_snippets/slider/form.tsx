import { Button } from '@moduix/react/button';
import { Slider } from '@moduix/react/slider';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

export default function SliderFormDemo() {
  const [submitted, setSubmitted] = useState('Nothing submitted');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(String(new FormData(event.currentTarget).get('volume') ?? ''));
  };

  return (
    <form
      onSubmit={handleSubmit}
      onReset={() => setSubmitted('Nothing submitted')}
      style={{
        display: 'grid',
        justifyItems: 'center',
        gap: 'var(--moduix-spacing-4)',
      }}
    >
      <Slider defaultValue={[40]} name="volume">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--moduix-spacing-3)',
          }}
        >
          <Slider.Label>Volume</Slider.Label>
          <Slider.ValueText />
        </div>
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumbs />
        </Slider.Control>
      </Slider>
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