import {
  AngleSlider,
  AngleSliderControl,
  AngleSliderLabel,
  AngleSliderMarker,
  AngleSliderMarkerGroup,
  AngleSliderThumb,
  AngleSliderValueText,
} from '@moduix/react/angle-slider';

const markerValues = [0, 45, 90, 135, 180, 225, 270, 315];

export default function AdvancedCustomizationAngleSliderDemo() {
  return (
    <AngleSlider defaultValue={135}>
      <AngleSliderLabel>Rotation</AngleSliderLabel>
      <AngleSliderControl>
        <AngleSliderValueText />
        <AngleSliderMarkerGroup>
          {markerValues.map((value) => (
            <AngleSliderMarker key={value} value={value} />
          ))}
        </AngleSliderMarkerGroup>
        <AngleSliderThumb />
      </AngleSliderControl>
    </AngleSlider>
  );
}