import { Slider } from '@moduix/react/slider';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/slider/slider-vertical-with-marks.module.css';

const marks = [0, 25, 50, 75, 100];

export default function VerticalMarksSliderDemo() {
  const [value, setValue] = useState([50]);

  return (
    <div className={styles.stack}>
      <Slider
        aria-label={['Output']}
        orientation="vertical"
        value={value}
        onValueChange={(details) => setValue(details.value)}
      >
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumbs />
        </Slider.Control>
        <Slider.MarkerGroup>
          {marks.map((mark) => (
            <Slider.Marker key={mark} value={mark}>
              {mark}
            </Slider.Marker>
          ))}
        </Slider.MarkerGroup>
      </Slider>
      <PreviewMeta>
        <output>Output: {value.join(', ')}</output>
      </PreviewMeta>
    </div>
  );
}