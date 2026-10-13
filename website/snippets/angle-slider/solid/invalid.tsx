import {
  AngleSlider,
  AngleSliderDial,
  AngleSliderLabel,
  AngleSliderMarks,
} from '@moduix/solid/angle-slider';

const markerValues = [0, 45, 90, 135, 180, 225, 270, 315];

export default function InvalidAngleSliderDemo() {
  return (
    <AngleSlider defaultValue={315} invalid>
      <AngleSliderLabel>Heading</AngleSliderLabel>
      <AngleSliderDial>
        <AngleSliderMarks values={markerValues} />
      </AngleSliderDial>
    </AngleSlider>
  );
}