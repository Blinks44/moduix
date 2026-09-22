import { Slider, SliderControl, SliderLabel, SliderRange, SliderThumbs, SliderTrack, SliderValueText } from '@moduix/react/slider';
import styles from '@/components/examples/slider/slider-thumb-collision.module.css';

export default function ThumbCollisionSliderDemo() {
  return (
    <Slider defaultValue={[25, 60]} thumbCollisionBehavior="push">
      <div className={styles.header}>
        <SliderLabel>Linked range</SliderLabel>
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