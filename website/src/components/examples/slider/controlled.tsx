import { Slider, SliderControl, SliderLabel, SliderRange, SliderThumbs, SliderTrack, SliderValueText } from '@moduix/react/slider';
import { useState } from 'react';
import styles from '@/components/examples/slider/slider-controlled.module.css';

export default function ControlledSliderDemo() {
  const [value, setValue] = useState([24]);
  return (
    <Slider value={value} onValueChange={(details) => setValue(details.value)}>
      <div className={styles.header}>
        <SliderLabel>Brightness</SliderLabel>
        <SliderValueText />
      </div>
      <SliderControl>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumbs />
      </SliderControl>
    </Slider>
  );
}