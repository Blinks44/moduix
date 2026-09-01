import { Slider } from '@moduix/react/slider';
import styles from '@/components/examples/slider/slider-marks.module.css';

const marks = [0, 25, 50, 75, 100];

export default function MarksSliderDemo() {
  return (
    <Slider defaultValue={[50]}>
      <div className={styles.header}>
        <Slider.Label>Progress</Slider.Label>
        <Slider.ValueText />
      </div>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumbs />
      </Slider.Control>
      <Slider.MarkerGroup className={styles.markerGroup}>
        {marks.map((value) => (
          <Slider.Marker key={value} value={value}>
            {value}
          </Slider.Marker>
        ))}
      </Slider.MarkerGroup>
    </Slider>
  );
}