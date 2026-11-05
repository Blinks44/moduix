<script lang="ts">
  import {
    AngleSliderDial,
    AngleSliderHiddenInput,
    AngleSliderMarks,
  } from '@/components/angle-slider';

  const markerValues = Array.from({ length: 8 }, (_, index) => index * 45);
</script>

<AngleSliderDial>
  <AngleSliderMarks values={markerValues} />
</AngleSliderDial>
<AngleSliderHiddenInput />