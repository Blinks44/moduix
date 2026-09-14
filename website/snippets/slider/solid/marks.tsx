import { Slider } from '@moduix/solid/slider';
import styles from '@/components/examples/slider/slider-marks.module.css';

const marks = [0, 25, 50, 75, 100];

export default function MarksSliderDemo() {
  return (
    <Slider defaultValue={[50]}>
      <div class={styles.header}>
        <Slider.Label>Progress</Slider.Label>
        <Slider.ValueText />
      </div>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumbs />
      </Slider.Control>
      <Slider.MarkerGroup class={styles.markerGroup}>
        {marks.map((value) => (
          <Slider.Marker value={value}>{value}</Slider.Marker>
        ))}
      </Slider.MarkerGroup>
    </Slider>
  );
}