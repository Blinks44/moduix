import { Slider } from '@moduix/react/slider';
import { useState } from 'react';
import styles from '@/components/examples/slider/slider-controlled.module.css';

export default function ControlledSliderDemo() {
  const [value, setValue] = useState([24]);
  return (
    <Slider value={value} onValueChange={(details) => setValue(details.value)}>
      <div className={styles.header}>
        <Slider.Label>Brightness</Slider.Label>
        <Slider.ValueText />
      </div>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumbs />
      </Slider.Control>
    </Slider>
  );
}