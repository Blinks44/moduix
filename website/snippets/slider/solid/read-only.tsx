import { Slider } from '@moduix/solid/slider';
import styles from '@/components/examples/slider/slider-read-only.module.css';

export default function ReadOnlySliderDemo() {
  return (
    <Slider defaultValue={[32]} readOnly>
      <div class={styles.header}>
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
  );
}