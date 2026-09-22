import { Button } from '@moduix/react/button';
import { Slider, SliderControl, SliderHiddenInput, SliderLabel, SliderRange, SliderThumb, SliderTrack, SliderValueText } from '@moduix/react/slider';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/slider/slider-form.module.css';

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
      className={styles.stack}
    >
      <Slider defaultValue={[40]} name="volume">
        <div className={styles.header}>
          <SliderLabel>Volume</SliderLabel>
          <SliderValueText />
        </div>
        <SliderControl>
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          <SliderThumb index={0} aria-label="Volume">
            <SliderHiddenInput />
          </SliderThumb>
        </SliderControl>
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