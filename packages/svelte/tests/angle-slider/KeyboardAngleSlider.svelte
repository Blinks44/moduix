<script lang="ts">
  import { AngleSlider, AngleSliderDial, AngleSliderLabel } from '@/components/angle-slider';

  let { changes }: { changes: Array<{ value: number; valueAsDegree: string }> } = $props();
</script>

<AngleSlider onValueChange={(details) => changes.push(details)}>
  <AngleSliderLabel>Rotation</AngleSliderLabel><AngleSliderDial />
</AngleSlider>
<AngleSlider readOnly onValueChange={(details) => changes.push(details)}>
  <AngleSliderLabel>Read-only rotation</AngleSliderLabel><AngleSliderDial />
</AngleSlider>
<AngleSlider disabled onValueChange={(details) => changes.push(details)}>
  <AngleSliderLabel>Disabled rotation</AngleSliderLabel><AngleSliderDial />
</AngleSlider>