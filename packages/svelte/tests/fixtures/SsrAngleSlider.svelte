<script lang="ts">
  import {
    AngleSlider,
    AngleSliderDial,
    AngleSliderHiddenInput,
    AngleSliderLabel,
    AngleSliderMarks,
  } from '@/components/angle-slider';

  const markerValues = [0, 45, 90, 135, 180, 225, 270, 315];
</script>

<AngleSlider defaultValue={135}>
  <AngleSliderLabel>Rotation</AngleSliderLabel>
  <AngleSliderDial><AngleSliderMarks values={markerValues} /></AngleSliderDial>
  <AngleSliderHiddenInput />
</AngleSlider>