import {
  Slider,
  SliderControl,
  SliderHiddenInput,
  SliderLabel,
  SliderRange,
  SliderThumb,
  SliderTrack,
  SliderValueText,
} from '@moduix/react/slider';
import styles from '@/components/examples/slider/slider-advanced-customization.module.css';

export default function AdvancedCustomizationSliderDemo() {
  return (
    <Slider defaultValue={[40]}>
      <div className={styles.header}>
        <SliderLabel>Volume</SliderLabel>
        <SliderValueText />
      </div>
      <SliderControl>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb asChild index={0} aria-label="Volume">
          <span>
            <SliderHiddenInput />
          </span>
        </SliderThumb>
      </SliderControl>
    </Slider>
  );
}