import {
  AngleSlider,
  AngleSliderControl,
  AngleSliderHiddenInput,
  AngleSliderLabel,
  AngleSliderMarker,
  AngleSliderMarkerGroup,
  AngleSliderThumb,
  AngleSliderValueText,
} from '@moduix/solid/angle-slider';
import styles from '@/components/examples/angle-slider/angle-slider-advanced-customization.module.css';

const markerValues = [0, 45, 90, 135, 180, 225, 270, 315];

export default function AdvancedCustomizationAngleSliderDemo() {
  return (
    <AngleSlider defaultValue={135} aria-label="Rotation" class={styles.root}>
      <AngleSliderLabel>Rotation</AngleSliderLabel>
      <AngleSliderControl>
        <AngleSliderValueText />
        <AngleSliderMarkerGroup>
          {markerValues.map((value) => (
            <AngleSliderMarker value={value} />
          ))}
        </AngleSliderMarkerGroup>
        <AngleSliderThumb />
      </AngleSliderControl>
      <AngleSliderHiddenInput />
    </AngleSlider>
  );
}