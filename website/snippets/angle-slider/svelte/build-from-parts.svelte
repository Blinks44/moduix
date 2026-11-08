<script lang="ts">
  import {
    AngleSlider,
    AngleSliderControl,
    AngleSliderThumb,
    AngleSliderValueText,
  } from '@moduix/svelte/angle-slider';
</script>

<AngleSlider defaultValue={135} aria-label="Rotation">
  <AngleSliderControl>
    <AngleSliderValueText />
    <AngleSliderThumb />
  </AngleSliderControl>
</AngleSlider>