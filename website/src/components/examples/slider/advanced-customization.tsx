import { Slider } from '@moduix/react/slider';
import styles from '@/components/examples/slider/slider-advanced-customization.module.css';

export default function AdvancedCustomizationSliderDemo() {
  return (
    <Slider defaultValue={[40]}>
      <div className={styles.header}>
        <Slider.Label>Volume</Slider.Label>
        <Slider.ValueText />
      </div>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb asChild index={0} aria-label="Volume">
          <span />
        </Slider.Thumb>
      </Slider.Control>
    </Slider>
  );
}