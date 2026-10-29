import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/vue';
import {
  Slider,
  SliderContext,
  SliderControl,
  SliderHiddenInput,
  SliderLabel,
  SliderMarker,
  SliderMarkerGroup,
  SliderRange,
  SliderRootProvider,
  SliderThumb,
  SliderThumbs,
  SliderTrack,
  SliderValueText,
} from '@/index';

const sliderComponents = {
  Slider,
  SliderContext,
  SliderControl,
  SliderHiddenInput,
  SliderLabel,
  SliderRange,
  SliderRootProvider,
  SliderThumb,
  SliderThumbs,
  SliderTrack,
  SliderValueText,
  SliderMarker,
  SliderMarkerGroup,
};

test('uses Tailwind-owned visual defaults and lets consumer utilities win', async () => {
  const { container } = render({
    components: sliderComponents,
    template: `
      <Slider class="w-64" :default-value="[40]">
        <SliderLabel class="text-primary">Volume</SliderLabel>
        <SliderControl class="min-h-6">
          <SliderTrack><SliderRange /></SliderTrack>
          <SliderThumb class="border-primary" :index="0" aria-label="Volume">
            <SliderHiddenInput />
          </SliderThumb>
        </SliderControl>
        <SliderMarkerGroup>
          <SliderMarker :value="0" class="text-primary">0</SliderMarker>
        </SliderMarkerGroup>
      </Slider>
    `,
  });

  const label = container.querySelector('[data-slot="slider-label"]')!;
  const control = container.querySelector('[data-slot="slider-control"]')!;
  const marker = container.querySelector('[data-slot="slider-marker"]')!;

  expect([...label.classList]).toContain('text-primary');
  expect([...control.classList]).toContain('min-h-6');
  await expect.element(page.locator('[data-slot="slider-root"]')).toHaveCSS('width', '256px');
  await expect
    .element(page.locator('[data-slot="slider-control"]'))
    .toHaveCSS('min-height', '24px');
  await expect.element(page.locator('[data-slot="slider-track"]')).toHaveCSS('height', '6px');
  await expect.element(page.getByRole('slider', { name: 'Volume' })).toHaveCSS('width', '16px');
  expect(getComputedStyle(marker, '::before').width).toBe('4px');
});