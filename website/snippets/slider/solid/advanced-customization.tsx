import {
  Slider,
  SliderControl,
  SliderHiddenInput,
  SliderLabel,
  SliderRange,
  SliderThumb,
  SliderTrack,
  SliderValueText,
} from '@moduix/solid/slider';
import styles from '@/components/examples/slider/slider-advanced-customization.module.css';

export default function AdvancedCustomizationSliderDemo() {
  return (
    <Slider defaultValue={[40]}>
      <div class={styles.header}>
        <SliderLabel>Volume</SliderLabel>
        <SliderValueText />
      </div>
      <SliderControl>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb asChild={(props) => <span {...props()} />} index={0} aria-label="Volume">
          <SliderHiddenInput />
        </SliderThumb>
      </SliderControl>
    </Slider>
  );
}