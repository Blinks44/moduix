//#region demo
import { useAngleSlider } from '@ark-ui/react/angle-slider';
import { AngleSlider } from '@moduix/react';

const initialValue = 45;
const targetValue = 90;
const markerValues = [0, 45, 90, 135, 180, 225, 270, 315];

export function RootProviderAngleSliderDemo() {
  const angleSlider = useAngleSlider({
    defaultValue: initialValue,
    'aria-label': 'Rotation',
  });

  return (
    <div className="docs-angle-slider-provider-layout">
      <AngleSlider.RootProvider value={angleSlider} className="docs-angle-slider-provider">
        <AngleSlider.Label>Rotation</AngleSlider.Label>
        <AngleSlider.Control>
          <AngleSlider.Marks values={markerValues} />
          <AngleSlider.Thumb />
        </AngleSlider.Control>
        <AngleSlider.ValueText />
      </AngleSlider.RootProvider>
      <button
        type="button"
        className="docs-angle-slider-provider-button"
        onClick={() => angleSlider.setValue(targetValue)}
      >
        Set to 90°
      </button>
    </div>
  );
}
//#endregion