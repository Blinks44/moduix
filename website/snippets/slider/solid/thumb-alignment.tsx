import { Slider } from '@moduix/solid/slider';
import styles from '@/components/examples/slider/slider-thumb-alignment.module.css';

export default function ThumbAlignmentSliderDemo() {
  return (
    <Slider defaultValue={[0]} thumbAlignment="center">
      <div class={styles.header}>
        <Slider.Label>Centered thumb</Slider.Label>
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