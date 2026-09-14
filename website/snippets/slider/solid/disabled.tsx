import { Slider } from '@moduix/solid/slider';
import styles from '@/components/examples/slider/slider-disabled.module.css';

export default function DisabledSliderDemo() {
  return (
    <Slider defaultValue={[32]} disabled>
      <div class={styles.header}>
        <Slider.Label>Notifications</Slider.Label>
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