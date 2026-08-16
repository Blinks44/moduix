import { Slider } from '@moduix/react/slider';

const marks = [0, 25, 50, 75, 100];

export default function MarksSliderDemo() {
  return (
    <Slider defaultValue={[50]}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--moduix-spacing-3)',
        }}
      >
        <Slider.Label>Progress</Slider.Label>
        <Slider.ValueText />
      </div>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumbs />
      </Slider.Control>
      <Slider.MarkerGroup>
        {marks.map((value) => (
          <Slider.Marker key={value} value={value}>
            {value}
          </Slider.Marker>
        ))}
      </Slider.MarkerGroup>
    </Slider>
  );
}