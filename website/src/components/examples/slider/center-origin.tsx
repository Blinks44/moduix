import {
  Slider,
  SliderControl,
  SliderLabel,
  SliderRange,
  SliderThumbs,
  SliderTrack,
  SliderValueText,
} from '@moduix/react/slider';
import styles from '@/components/examples/slider/slider-center-origin.module.css';

export default function CenterOriginSliderDemo() {
  return (
    <Slider min={-50} max={50} defaultValue={[20]} origin="center">
      <div className={styles.header}>
        <SliderLabel>Balance</SliderLabel>
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