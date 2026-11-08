<script lang="ts">
  import {
    AngleSliderDial,
    AngleSliderLabel,
    AngleSliderMarks,
    AngleSliderRootProvider,
    useAngleSlider,
  } from '@moduix/svelte/angle-slider';
  import { Stack } from '@moduix/svelte/stack';

  const id = $props.id();
  const angleSlider = useAngleSlider({ id, defaultValue: 45 });
  const markerValues = [0, 45, 90, 135, 180, 225, 270, 315];
</script>

<Stack align="center" gap="3">
  <AngleSliderRootProvider value={angleSlider}>
    <AngleSliderLabel>Rotation</AngleSliderLabel>
    <AngleSliderDial>
      <AngleSliderMarks values={markerValues} />
    </AngleSliderDial>
  </AngleSliderRootProvider>
  <output>Current angle: {angleSlider().value}°</output>
</Stack>