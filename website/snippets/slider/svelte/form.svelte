<script lang="ts">
  import {
    Slider,
    SliderControl,
    SliderHiddenInput,
    SliderLabel,
    SliderRange,
    SliderThumb,
    SliderTrack,
    SliderValueText,
  } from '@moduix/svelte/slider';
  import styles from '@/components/examples/slider/slider-form.module.css';

  let submitted = $state('Nothing submitted');

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    submitted = String(new FormData(form).get('volume') ?? '');
  };

  const handleReset = () => {
    submitted = 'Nothing submitted';
  };
</script>

<form class={styles.stack} onreset={handleReset} onsubmit={handleSubmit}>
  <Slider defaultValue={[40]} name="volume">
    <SliderLabel>Volume</SliderLabel>
    <SliderValueText />
    <SliderControl>
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      <SliderThumb index={0} aria-label="Volume">
        <SliderHiddenInput />
      </SliderThumb>
    </SliderControl>
  </Slider>
  <div data-preview-meta>
    <output>Submitted: {submitted}</output>
    <button type="submit">Submit</button>
    <button type="reset">Reset</button>
  </div>
</form>