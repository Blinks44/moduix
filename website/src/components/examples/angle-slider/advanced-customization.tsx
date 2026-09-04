import { AngleSlider } from '@moduix/react/angle-slider';
import styles from '@/components/examples/angle-slider/angle-slider-advanced-customization.module.css';

const markerValues = [0, 45, 90, 135, 180, 225, 270, 315];

export default function AdvancedCustomizationAngleSliderDemo() {
  return (
    <AngleSlider defaultValue={135} aria-label="Rotation" className={styles.root}>
      <AngleSlider.Label>Rotation</AngleSlider.Label>
      <AngleSlider.Control>
        <AngleSlider.MarkerGroup>
          {markerValues.map((value) => (
            <AngleSlider.Marker key={value} value={value} />
          ))}
        </AngleSlider.MarkerGroup>
        <AngleSlider.Thumb />
      </AngleSlider.Control>
      <AngleSlider.ValueText />
      <AngleSlider.HiddenInput />
    </AngleSlider>
  );
}