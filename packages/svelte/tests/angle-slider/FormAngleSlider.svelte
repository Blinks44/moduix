<script lang="ts">
  import {
    AngleSlider,
    AngleSliderDial,
    AngleSliderHiddenInput,
    AngleSliderLabel,
    AngleSliderRootProvider,
    useAngleSlider,
  } from '@/components/angle-slider';

  const angleSlider = useAngleSlider({
    id: 'provider-angle',
    defaultValue: 45,
    name: 'provider-rotation',
  });
</script>

<form id="angle-form"></form>
<AngleSlider defaultValue={135} name="rotation">
  <AngleSliderDial />
  <AngleSliderHiddenInput form="angle-form" />
</AngleSlider>
<AngleSliderRootProvider value={angleSlider}>
  <AngleSliderLabel>Provider rotation</AngleSliderLabel>
  <AngleSliderDial />
  <AngleSliderHiddenInput form="angle-form" />
</AngleSliderRootProvider>
<button type="button" onclick={() => angleSlider().setValue(90)}>Set to 90 degrees</button>