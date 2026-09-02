import { Slider } from '@moduix/react/slider';
import styles from '@/components/examples/slider/slider-basic.module.css';

export default function SliderDemo() {
  return (
    <Slider defaultValue={[40]}>
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
    </Slider>
  );
}