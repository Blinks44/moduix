import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import ControlledDateInput from './date-input/ControlledDateInput.svelte';
import FormDateInput from './date-input/FormDateInput.svelte';
import RefsDateInput from './date-input/RefsDateInput.svelte';
import StatusDateInput from './date-input/StatusDateInput.svelte';

test('submits through explicit Ark hidden inputs', async () => {
  const { container } = render(FormDateInput);

  const form = container.querySelector('form')!;

  expect(container.querySelectorAll('input[type="hidden"]')).toHaveLength(3);
  expect(Array.from(new FormData(form).entries())).toEqual([
    ['check-in[0]', '6/22/2026'],
    ['check-out[1]', '6/26/2026'],
    ['report-date', '6/22/2026'],
  ]);
  await page.getByRole('spinbutton').nth(0).press('ArrowUp');
  expect(new FormData(form).get('check-in[0]')).toBe('7/22/2026');
});

test('preserves Ark segment semantics, styling hooks, consumer attrs, and part refs', async () => {
  const { component } = render(RefsDateInput);

  const { controlRef, rootRef, segmentRef } = component.getRefs();
  const root = rootRef!;
  const control = controlRef!;
  const segment = segmentRef!;

  expect(root.getAttribute('data-slot')).toBe('date-input-root');
  expect(root.getAttribute('data-scope')).toBe('date-input');
  expect(root.getAttribute('data-probe')).toBe('root');
  expect(root.classList.contains('consumer-root')).toBe(true);
  expect(control.getAttribute('data-part')).toBe('control');
  expect(control.hasAttribute('data-invalid')).toBe(true);
  expect(control.getAttribute('data-slot')).toBe('date-input-control');
  expect(segment.getAttribute('data-part')).toBe('segment');
  expect(segment.getAttribute('data-slot')).toBe('date-input-segment');
  expect(screen.getAllByRole('spinbutton')).toHaveLength(3);
});

test('supports controlled bind:value and preserves Ark value details', async () => {
  const onChange = rs.fn((details: { value: { toString: () => string }[] }) => details);
  render(ControlledDateInput, { props: { onChange } });
  await page.getByRole('button', { name: 'Change date', exact: true }).click();

  await expect.element(page.getByText('2026-07-04')).toBeAttached();
  expect(
    onChange.mock.calls.map(([details]) => details.value.map((date) => date.toString())),
  ).toEqual([['2026-07-04']]);
});

test('exposes reactive state through useDateInputContext', async () => {
  render(StatusDateInput);

  await expect.element(page.getByRole('status')).toContainText('6/22/2026');
});