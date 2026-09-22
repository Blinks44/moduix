import { Slider, SliderControl, SliderLabel, SliderRange, SliderThumbs, SliderTrack, SliderValueText } from '@moduix/solid/slider';
import styles from '@/components/examples/slider/slider-disabled.module.css';

export default function DisabledSliderDemo() {
  return (
    <Slider defaultValue={[32]} disabled>
      <div class={styles.header}>
        <SliderLabel>Notifications</SliderLabel>
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