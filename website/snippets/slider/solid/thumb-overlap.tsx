import { Slider } from '@moduix/solid/slider';
import styles from '@/components/examples/slider/slider-thumb-overlap.module.css';

export default function ThumbOverlapSliderDemo() {
  return (
    <Slider defaultValue={[25, 60]} minStepsBetweenThumbs={5}>
      <div class={styles.header}>
        <Slider.Label>Minimum gap</Slider.Label>
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