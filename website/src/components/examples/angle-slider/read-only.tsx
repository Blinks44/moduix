import {
  AngleSlider,
  AngleSliderDial,
  AngleSliderLabel,
  AngleSliderMarks,
} from '@moduix/react/angle-slider';

const initialValue = 300;
const markerValues = [0, 45, 90, 135, 180, 225, 270, 315];

export default function ReadOnlyAngleSliderDemo() {
  return (
    <AngleSlider defaultValue={initialValue} readOnly>
      <AngleSliderLabel>Locked angle</AngleSliderLabel>
      <AngleSliderDial>
        <AngleSliderMarks values={markerValues} />
      </AngleSliderDial>
    </AngleSlider>
  );
}