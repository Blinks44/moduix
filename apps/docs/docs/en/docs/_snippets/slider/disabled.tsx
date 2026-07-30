import { Slider } from '@moduix/react';

export default function DisabledSliderDemo() {
  return (
    <Slider defaultValue={[32]} disabled>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--moduix-spacing-3)',
        }}
      >
        <Slider.Label>Notifications</Slider.Label>
        <Slider.ValueText />
      </div>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumbs />
      </Slider.Control>
    </Slider>
  );
}