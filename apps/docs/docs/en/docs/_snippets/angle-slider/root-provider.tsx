import { AngleSlider, Button, useAngleSlider } from '@moduix/react';

const initialValue = 45;
const targetValue = 90;
const markerValues = [0, 45, 90, 135, 180, 225, 270, 315];

export default function RootProviderAngleSliderDemo() {
  const angleSlider = useAngleSlider({
    defaultValue: initialValue,
    'aria-label': 'Rotation',
  });

  return (
    <div className="docs-angle-slider-provider-layout">
      <AngleSlider.RootProvider value={angleSlider} className="docs-angle-slider-provider">
        <AngleSlider.Label>Rotation</AngleSlider.Label>
        <AngleSlider.Dial>
          <AngleSlider.Marks values={markerValues} />
        </AngleSlider.Dial>
        <AngleSlider.ValueText />
      </AngleSlider.RootProvider>
      <Button onClick={() => angleSlider.setValue(targetValue)}>Set to 90°</Button>
    </div>
  );
}