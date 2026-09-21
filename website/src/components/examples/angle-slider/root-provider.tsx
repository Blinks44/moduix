import {
  AngleSliderDial,
  AngleSliderHiddenInput,
  AngleSliderLabel,
  AngleSliderMarks,
  AngleSliderRootProvider,
  useAngleSlider,
} from '@moduix/react/angle-slider';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/angle-slider/angle-slider-root-provider.module.css';

const initialValue = 45;
const markerValues = [0, 45, 90, 135, 180, 225, 270, 315];

export default function RootProviderAngleSliderDemo() {
  const angleSlider = useAngleSlider({
    defaultValue: initialValue,
    'aria-label': 'Rotation',
  });

  return (
    <div className={styles.layout}>
      <AngleSliderRootProvider value={angleSlider} className={styles.root}>
        <AngleSliderLabel>Rotation</AngleSliderLabel>
        <AngleSliderDial>
          <AngleSliderMarks values={markerValues} />
        </AngleSliderDial>
        <AngleSliderHiddenInput />
      </AngleSliderRootProvider>
      <PreviewMeta>
        <output>Current angle: {angleSlider.value}°</output>
      </PreviewMeta>
    </div>
  );
}