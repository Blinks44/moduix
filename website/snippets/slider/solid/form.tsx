import { Slider } from '@moduix/solid/slider';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/slider/slider-form.module.css';

export default function SliderFormDemo() {
  const [submitted, setSubmitted] = createSignal('Nothing submitted');

  return (
    <form
      class={styles.stack}
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(String(new FormData(event.currentTarget).get('volume') ?? ''));
      }}
      onReset={() => setSubmitted('Nothing submitted')}
    >
      <Slider defaultValue={[40]} name="volume">
        <div class={styles.header}>
          <Slider.Label>Volume</Slider.Label>
          <Slider.ValueText />
        </div>
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb index={0} aria-label="Volume">
            <Slider.HiddenInput />
          </Slider.Thumb>
        </Slider.Control>
      </Slider>
      <output>Submitted: {submitted()}</output>
      <button type="submit">Submit</button>
      <button type="reset">Reset</button>
    </form>
  );
}