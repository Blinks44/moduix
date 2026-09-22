import { Button } from '@moduix/react/button';
import { SliderControl, SliderLabel, SliderRange, SliderRootProvider, SliderThumbs, SliderTrack, SliderValueText, useSlider } from '@moduix/react/slider';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/slider/slider-root-provider.module.css';

export default function RootProviderSliderDemo() {
  const slider = useSlider({
    defaultValue: [40],
  });
  return (
    <div className={styles.stack}>
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
      <PreviewMeta>
        <output>Current: {slider.value.join(', ')}</output>
        <Button onClick={() => slider.focus()} size="sm">
          Focus
        </Button>
      </PreviewMeta>
    </div>
  );
}
