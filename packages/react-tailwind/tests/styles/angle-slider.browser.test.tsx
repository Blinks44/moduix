import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/react';
import { AngleSlider, AngleSliderDial } from '@/index';

test('preserves Tailwind overrides, masked fill, and pressed thumb styling', async () => {
  const { container } = render(
    <AngleSlider className="gap-0" defaultValue={135} invalid aria-label="Rotation">
      <AngleSliderDial />
    </AngleSlider>,
  );
  const root = container.querySelector('[data-slot="angle-slider-root"]')!;
  const control = container.querySelector('[data-slot="angle-slider-control"]')!;
  const thumb = container.querySelector('[role="slider"]')!;
  await expect.element(page.locator('[data-slot="angle-slider-root"]')).toHaveCSS('gap', '0px');
  expect(root.classList.contains('gap-0')).toBe(true);
  const track = getComputedStyle(control, '::before');
  expect(track.backgroundImage).toContain('conic-gradient');
  expect(track.backgroundImage).toContain('135deg');
  expect(track.maskImage).toContain('radial-gradient');
  expect(track.maskImage).toContain('calc(100% - 9px)');
  expect(track.maskImage).toContain('calc(100% - 8px)');
  const controlStyle = getComputedStyle(control);
  expect(controlStyle.getPropertyValue('--_angle-slider-fill').trim()).toBe(
    controlStyle.getPropertyValue('--color-destructive').trim(),
  );
  expect(getComputedStyle(thumb, '::before').translate).toBe('-50% -50%');
});