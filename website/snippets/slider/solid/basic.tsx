import { Slider } from '@moduix/solid/slider';
import styles from '@/components/examples/slider/slider-basic.module.css';

export default function SliderDemo() {
  return (
    <Slider defaultValue={[40]}>
      <div class={styles.header}>
        <Slider.Label>Volume</Slider.Label>
        <Slider.ValueText />
      </div>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb index={0} aria-label="Volume">
          <Slider.HiddenInput />
        </Slider.Thumb>
      </Slider.Control>
    </Slider>
  );
}