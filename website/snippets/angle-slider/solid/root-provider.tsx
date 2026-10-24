import {
  AngleSliderDial,
  AngleSliderLabel,
  AngleSliderMarks,
  AngleSliderRootProvider,
  useAngleSlider,
} from '@moduix/solid/angle-slider';
import styles from '@/components/examples/angle-slider/angle-slider-root-provider.module.css';

const initialValue = 45;
const markerValues = [0, 45, 90, 135, 180, 225, 270, 315];

export default function RootProviderAngleSliderDemo() {
  const angleSlider = useAngleSlider({
    defaultValue: initialValue,
  });

  return (
    <div class={styles.layout}>
      <AngleSliderRootProvider value={angleSlider}>
        <AngleSliderLabel>Rotation</AngleSliderLabel>
        <AngleSliderDial>
          <AngleSliderMarks values={markerValues} />
        </AngleSliderDial>
      </AngleSliderRootProvider>
      <output>Current angle: {angleSlider().value}°</output>
    </div>
  );
}