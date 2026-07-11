/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Button, Slider, useSlider } from '@moduix/react';

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
          <Slider.Thumbs />
        </Slider.Control>
      </Slider.RootProvider>
    </div>
  );
}

//#endregion