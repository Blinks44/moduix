import { AngleSlider } from '@moduix/solid/angle-slider';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/angle-slider/angle-slider-form.module.css';

const markerValues = [0, 45, 90, 135, 180, 225, 270, 315];

export default function AngleSliderFormDemo() {
  const [submitted, setSubmitted] = createSignal('Nothing submitted');

  const handleSubmit = (event: SubmitEvent & { currentTarget: HTMLFormElement }) => {
    event.preventDefault();
    setSubmitted(`${String(new FormData(event.currentTarget).get('rotation') ?? '')}°`);
  };

  return (
    <form class={styles.layout} onSubmit={handleSubmit}>
      <AngleSlider defaultValue={135} aria-label="Rotation" name="rotation" class={styles.root}>
        <AngleSlider.Label>Rotation</AngleSlider.Label>
        <AngleSlider.Dial>
          <AngleSlider.Marks values={markerValues} />
        </AngleSlider.Dial>
        <AngleSlider.HiddenInput />
      </AngleSlider>
      <div>
        <output>Submitted: {submitted()}</output>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}