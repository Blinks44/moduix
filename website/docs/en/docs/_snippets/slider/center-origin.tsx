import { Slider } from '@moduix/react/slider';
import styles from '@/components/examples/slider/slider-center-origin.module.css';

export default function CenterOriginSliderDemo() {
  return (
    <Slider min={-50} max={50} defaultValue={[20]} origin="center">
      <div className={styles.header}>
        <Slider.Label>Balance</Slider.Label>
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