import { Button } from '@moduix/react/button';
import { Slider, useSlider } from '@moduix/react/slider';
import { PreviewMeta } from '@/components/mdx/Components';

export default function RootProviderSliderDemo() {
  const slider = useSlider({
    defaultValue: [40],
  });
  return (
    <div
      style={{
        display: 'grid',
        justifyItems: 'center',
        gap: 'var(--moduix-spacing-4)',
      }}
    >
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
      <PreviewMeta>
        <output>Current: {slider.value.join(', ')}</output>
        <Button onClick={() => slider.focus()} size="sm">
          Focus
        </Button>
      </PreviewMeta>
    </div>
  );
}