import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@solidjs/testing-library';
import {
  Slider,
  SliderControl,
  SliderHiddenInput,
  SliderLabel,
  SliderMarker,
  SliderMarkerGroup,
  SliderRange,
  SliderThumb,
  SliderTrack,
} from '@/index';

test('uses Tailwind-owned visual defaults and lets consumer utilities win', async () => {
  const { container } = render(() => (
    <Slider defaultValue={[40]} class="w-64">
      <SliderLabel>Volume</SliderLabel>
      <SliderControl>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb index={0} aria-label="Volume">
          <SliderHiddenInput />
        </SliderThumb>
      </SliderControl>
      <SliderMarkerGroup>
        <SliderMarker value={0}>0</SliderMarker>
      </SliderMarkerGroup>
    </Slider>
  ));

  const marker = container.querySelector('[data-slot="slider-marker"]')!;

  await expect.element(page.locator('[data-slot="slider-track"]')).toHaveCSS('height', '6px');
  await expect.element(page.getByRole('slider', { name: 'Volume' })).toHaveCSS('width', '16px');
  expect(getComputedStyle(marker, '::before').width).toBe('4px');
});