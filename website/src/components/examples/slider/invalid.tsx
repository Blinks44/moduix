import { Slider } from '@moduix/react/slider';
import styles from '@/components/examples/slider/slider-invalid.module.css';

export default function InvalidSliderDemo() {
  return (
    <Slider defaultValue={[32]} invalid>
      <div className={styles.header}>
        <Slider.Label>Volume</Slider.Label>
        <Slider.ValueText />
      </div>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumbs />
      </Slider.Control>
      <Slider.MarkerGroup className={styles.markerGroup}>
        {[0, 50, 100].map((value) => (
          <Slider.Marker key={value} value={value}>
            {value}
          </Slider.Marker>
        ))}
      </Slider.MarkerGroup>
    </Slider>
  );
}