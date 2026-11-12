import {
  AngleSlider,
  AngleSliderDial,
  AngleSliderHiddenInput,
  AngleSliderLabel,
  AngleSliderMarks,
} from '@moduix/react/angle-slider';
import { Button } from '@moduix/react/button';
import type { FormEvent } from 'react';
import { useState } from 'react';
import styles from '@/components/examples/angle-slider/angle-slider-form.module.css';

const markerValues = [0, 45, 90, 135, 180, 225, 270, 315];

export default function AngleSliderFormDemo() {
  const [submitted, setSubmitted] = useState('Nothing submitted');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(`${String(new FormData(event.currentTarget).get('rotation') ?? '')}°`);
  };

  return (
    <form className={styles.layout} onSubmit={handleSubmit}>
      <AngleSlider defaultValue={135} name="rotation">
        <AngleSliderLabel>Rotation</AngleSliderLabel>
        <AngleSliderDial>
          <AngleSliderMarks values={markerValues} />
        </AngleSliderDial>
        <AngleSliderHiddenInput />
      </AngleSlider>
      <div data-preview-meta>
        <output>Submitted: {submitted}</output>
        <Button type="submit" size="sm">
          Submit
        </Button>
      </div>
    </form>
  );
}