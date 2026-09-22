import { Slider, SliderControl, SliderLabel, SliderRange, SliderThumbs, SliderTrack, SliderValueText } from '@moduix/solid/slider';
import styles from '@/components/examples/slider/slider-step.module.css';

export default function StepSliderDemo() {
  return (
    <Slider step={0.01} min={5} max={10} defaultValue={[7.5]}>
      <div class={styles.header}>
        <SliderLabel>Precision</SliderLabel>
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