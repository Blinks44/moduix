import { Slider } from '@moduix/solid/slider';
import styles from '@/components/examples/slider/slider-step.module.css';

export default function StepSliderDemo() {
  return (
    <Slider step={0.01} min={5} max={10} defaultValue={[7.5]}>
      <div class={styles.header}>
        <Slider.Label>Precision</Slider.Label>
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