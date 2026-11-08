<script lang="ts">
  import {
    AngleSlider,
    AngleSliderDial,
    AngleSliderHiddenInput,
    AngleSliderLabel,
    AngleSliderMarks,
  } from '@moduix/svelte/angle-slider';
  import styles from '@/components/examples/angle-slider/angle-slider-form.module.css';

  let submitted = $state('Nothing submitted');
  const markerValues = [0, 45, 90, 135, 180, 225, 270, 315];

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    submitted = `${String(new FormData(form).get('rotation') ?? '')}°`;
  };
</script>

<form class={styles.layout} onsubmit={handleSubmit}>
  <AngleSlider defaultValue={135} name="rotation">
    <AngleSliderLabel>Rotation</AngleSliderLabel>
    <AngleSliderDial>
      <AngleSliderMarks values={markerValues} />
    </AngleSliderDial>
    <AngleSliderHiddenInput />
  </AngleSlider>
  <div>
    <output>Submitted: {submitted}</output>
    <button type="submit">Submit</button>
  </div>
</form>