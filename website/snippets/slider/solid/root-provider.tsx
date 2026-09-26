import {
  SliderControl,
  SliderLabel,
  SliderRange,
  SliderRootProvider,
  SliderThumbs,
  SliderTrack,
  SliderValueText,
  useSlider,
} from '@moduix/solid/slider';
import styles from '@/components/examples/slider/slider-root-provider.module.css';

export default function RootProviderSliderDemo() {
  const slider = useSlider({
    defaultValue: [40],
  });

  return (
    <div class={styles.stack}>
      <SliderRootProvider value={slider}>
        <SliderLabel>Volume</SliderLabel>
        <SliderValueText />
        <SliderControl>
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          <SliderThumbs />
        </SliderControl>
      </SliderRootProvider>
      <output>Current: {slider().value.join(', ')}</output>
      <button type="button" onClick={() => slider().focus()}>
        Focus
      </button>
    </div>
  );
}