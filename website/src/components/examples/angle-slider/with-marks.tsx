import {
  AngleSlider,
  AngleSliderDial,
  AngleSliderLabel,
  AngleSliderMarks,
} from '@moduix/react/angle-slider';

const markerValues = [0, 45, 90, 135, 180, 225, 270, 315];

export default function AngleSliderWithMarksDemo() {
  return (
    <AngleSlider defaultValue={135}>
      <AngleSliderLabel>Rotation</AngleSliderLabel>
      <AngleSliderDial>
        <AngleSliderMarks values={markerValues} />
      </AngleSliderDial>
    </AngleSlider>
  );
}