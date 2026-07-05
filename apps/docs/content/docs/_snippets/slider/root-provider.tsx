/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { useSlider } from '@ark-ui/react/slider';
import { Button, Slider } from '@moduix/react';

export function RootProviderSliderDemo() {
  const slider = useSlider({
    defaultValue: [40],
  });
  return (
    <div className="slider-stack">
      <Button onClick={() => slider.focus()}>Focus</Button>
      <Slider.RootProvider value={slider}>
        <Slider.Label>Volume</Slider.Label>
        <Slider.ValueText />
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb index={0} aria-label="Volume">
            <Slider.HiddenInput />
          </Slider.Thumb>
        </Slider.Control>
      </Slider.RootProvider>
    </div>
  );
}

//#endregion