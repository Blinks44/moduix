import { Slider } from '@moduix/react/slider';

export default function AdvancedCustomizationSliderDemo() {
  return (
    <Slider defaultValue={[40]}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--moduix-spacing-3)',
        }}
      >
        <Slider.Label>Volume</Slider.Label>
        <Slider.ValueText />
      </div>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb index={0} aria-label="Volume"></Slider.Thumb>
      </Slider.Control>
    </Slider>
  );
}