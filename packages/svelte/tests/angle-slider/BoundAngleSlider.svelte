<script lang="ts">
  import { AngleSlider, AngleSliderDial, AngleSliderLabel } from '@/components/angle-slider';

  let { details }: { details: number[] } = $props();
  let value = $state(45);
</script>

<AngleSlider bind:value onValueChange={(event) => details.push(event.value)}>
  <AngleSliderLabel>Rotation</AngleSliderLabel><AngleSliderDial />
</AngleSlider>
<output>Angle: {value}</output>