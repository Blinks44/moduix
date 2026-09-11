import { Slider, useSlider } from '@moduix/solid/slider';
import styles from '@/components/examples/slider/slider-root-provider.module.css';

export default function RootProviderSliderDemo() {
  const slider = useSlider({
    defaultValue: [40],
  });

  return (
    <div class={styles.stack}>
      <Slider.RootProvider value={slider}>
        <Slider.Label>Volume</Slider.Label>
        <Slider.ValueText />
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumbs />
        </Slider.Control>
      </Slider.RootProvider>
      <output>Current: {slider().value.join(', ')}</output>
      <button type="button" onClick={() => slider().focus()}>
        Focus
      </button>
    </div>
  );
}