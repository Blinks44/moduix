import { Slider } from '@moduix/solid/slider';
import styles from '@/components/examples/slider/slider-thumb-collision.module.css';

export default function ThumbCollisionSliderDemo() {
  return (
    <Slider defaultValue={[25, 60]} thumbCollisionBehavior="push">
      <div class={styles.header}>
        <Slider.Label>Linked range</Slider.Label>
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