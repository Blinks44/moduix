import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import AsChildDatePicker from './date-picker/AsChildDatePicker.svelte';
import CalendarDatePicker from './date-picker/CalendarDatePicker.svelte';
import ClearTriggerDatePicker from './date-picker/ClearTriggerDatePicker.svelte';
import ControlledDatePicker from './date-picker/ControlledDatePicker.svelte';
import ConvenienceDatePicker from './date-picker/ConvenienceDatePicker.svelte';
import FieldStateDatePicker from './date-picker/FieldStateDatePicker.svelte';
import FixedFieldDatePicker from './date-picker/FixedFieldDatePicker.svelte';
import FixedTableDatePicker from './date-picker/FixedTableDatePicker.svelte';
import LocalizedDatePicker from './date-picker/LocalizedDatePicker.svelte';
import NativeSelectsDatePicker from './date-picker/NativeSelectsDatePicker.svelte';
import PortalDatePicker from './date-picker/PortalDatePicker.svelte';
import PresetDatePicker from './date-picker/PresetDatePicker.svelte';
import RangeFormDatePicker from './date-picker/RangeFormDatePicker.svelte';
import SelectDatePicker from './date-picker/SelectDatePicker.svelte';
import TriggerAsChildDatePicker from './date-picker/TriggerAsChildDatePicker.svelte';
import ValueTextDatePicker from './date-picker/ValueTextDatePicker.svelte';
import YearPickerDatePicker from './date-picker/YearPickerDatePicker.svelte';

test.each([false, true])(
  'keeps clear-trigger accessible names reactive (asChild=%s)',
  async (asChild) => {
    const { rerender } = render(ClearTriggerDatePicker, {
      props: { asChild, label: 'Clear initial date' },
    });
    await expect
      .element(page.getByRole('button', { name: 'Clear initial date', exact: true }))
      .toBeVisible();
    await rerender({ label: 'Clear updated date' });
    await expect
      .element(page.getByRole('button', { name: 'Clear updated date', exact: true }))
      .toBeVisible();
    await rerender({ labelledby: 'clear-date-label' });
    await expect
      .element(page.getByRole('button', { name: 'Clear labelled date', exact: true }))
      .toBeAttached();

    await expect
      .element(page.getByRole('button', { name: 'Clear labelled date', exact: true }))
      .toHaveAttribute('aria-labelledby', 'clear-date-label');
  },
);

test.each(['month', 'year'] as const)(
  'preserves reactive native select attributes and ref for the %s select',
  async (component) => {
    const { component: harness, rerender } = render(SelectDatePicker, {
      props: { component, multiple: false },
    });
    const select = screen.getByTestId('navigation-select');
    expect(select.tagName).toBe('SELECT');
    expect(harness.getRefs().selectRef).toBe(select);
    await expect
      .element(page.getByTestId('navigation-select'))
      .toHaveAttribute('name', 'navigation');
    expect(select.classList.contains('consumer-select')).toBe(true);
    await expect
      .element(page.getByTestId('navigation-select'))
      .toHaveCSS('color', 'rgb(255, 0, 0)');
    await expect.element(page.getByTestId('navigation-select')).not.toHaveAttribute('multiple');
    await expect.element(page.getByTestId('navigation-select')).not.toHaveAttribute('size');
    await rerender({ multiple: true });
    await expect.element(page.getByTestId('navigation-select')).toHaveAttribute('multiple');
    await rerender({ multiple: false, size: 4 });
    await expect.element(page.getByTestId('navigation-select')).not.toHaveAttribute('multiple');
    await expect.element(page.getByTestId('navigation-select')).toHaveAttribute('size', '4');
    await rerender({ size: 1 });
    await expect.element(page.getByTestId('navigation-select')).toHaveAttribute('size', '1');
    await rerender({ size: undefined });
    await expect.element(page.getByTestId('navigation-select')).not.toHaveAttribute('size');
    expect(screen.getByRole('combobox', { name: 'Date navigation' })).toBe(select);
    expect(harness.getRefs().selectRef).toBe(select);
    expect(select.querySelectorAll('option').length).toBeGreaterThan(0);
  },
);

test('preserves default value text and reactive render-snippet rendering', async () => {
  const warn = rs.spyOn(console, 'warn');
  const { component, rerender } = render(ValueTextDatePicker, { props: { custom: false } });
  const defaultText = screen.getByText('06/22/2026 | 06/26/2026');
  expect(defaultText.tagName).toBe('SPAN');
  await expect
    .element(page.getByText('06/22/2026 | 06/26/2026'))
    .toHaveAttribute('data-slot', 'date-picker-value-text');
  await rerender({ custom: true });

  await page.getByRole('button', { name: 'Remove 0: 06/22/2026 (day 22)', exact: true }).click();
  await expect.poll(() => component.getValue()).toHaveLength(1);
  await expect
    .element(page.getByRole('button', { name: 'Remove 0: 06/26/2026 (day 26)', exact: true }))
    .toBeVisible();
  await rerender({ custom: false });
  expect((await screen.findByText('06/26/2026')).tagName).toBe('SPAN');
  component.clear();
  await expect.element(page.getByText('Pick a date')).toBeAttached();
  await rerender({ custom: true });
  await expect.element(page.getByText('Pick a date')).toBeAttached();
  await expect.poll(() => screen.queryByRole('button', { name: /^Remove/ })).toBeNull();
  expect(warn).not.toHaveBeenCalled();
});

test('renders Ark month and year primitives as native selects', async () => {
  render(NativeSelectsDatePicker);

  const monthSelect = screen.getByRole('combobox', { name: 'Month' });
  const yearSelect = screen.getByRole('combobox', { name: 'Year' });

  expect(monthSelect.tagName).toBe('SELECT');
  expect(monthSelect.querySelectorAll('option')).toHaveLength(12);
  expect(yearSelect.tagName).toBe('SELECT');
  expect(yearSelect.querySelector('option[value="2026"]')).not.toBeNull();
});

test('keeps Ark localization and convenience field labels', async () => {
  render(LocalizedDatePicker);

  await expect
    .element(page.getByRole('textbox', { name: 'Localized date', exact: true }))
    .toHaveAttribute('placeholder', 'mm/dd/yyyy');
  await expect
    .element(page.getByRole('button', { name: 'Remove date', exact: true }))
    .toBeVisible();
  await expect
    .element(page.getByRole('button', { name: 'Open date picker', exact: true }))
    .toBeVisible();
});

test('preserves native form values and range input indexes', async () => {
  const { container } = render(RangeFormDatePicker);
  const inputs = screen.getAllByRole('textbox');
  expect(inputs).toHaveLength(2);
  expect(inputs.map((input) => input.getAttribute('data-index'))).toEqual(['0', '1']);
  // Ark Svelte sets the input value as a DOM property, not an attribute.
  expect(inputs.map((input) => (input as HTMLInputElement).value)).toEqual([
    '06/22/2026',
    '06/26/2026',
  ]);
  expect(Array.from(new FormData(container.querySelector('form')!).entries())).toEqual([
    ['travel-date', '06/22/2026'],
    ['travel-date', '06/26/2026'],
  ]);
});

test('applies date range presets through the Ark trigger', async () => {
  render(PresetDatePicker);
  await page.getByRole('button', { name: /select/, exact: true }).click();

  await expect
    .poll(() => screen.getAllByRole('textbox').map((input) => (input as HTMLInputElement).value))
    .toEqual([
      expect.stringMatching(/^\d{2}\/\d{2}\/\d{4}$/),
      expect.stringMatching(/^\d{2}\/\d{2}\/\d{4}$/),
    ]);
});

test('inherits Field and Fieldset state on the editable input', async () => {
  render(FieldStateDatePicker);

  await expect
    .element(page.getByRole('textbox', { name: 'Scheduled date', exact: true }))
    .toBeDisabled();
  await expect
    .element(page.getByRole('textbox', { name: 'Scheduled date', exact: true }))
    .toHaveAttribute('readonly');
  await expect
    .element(page.getByRole('textbox', { name: 'Scheduled date', exact: true }))
    .toHaveAttribute('aria-invalid', 'true');
  await expect
    .element(page.getByRole('textbox', { name: 'Fieldset date', exact: true }))
    .toHaveAttribute('aria-invalid', 'true');
});

test('preserves portalling, root refs, and open-change details', async () => {
  const openStates: boolean[] = [];
  const { component, container } = render(PortalDatePicker, {
    props: { onOpenChange: (details: { open: boolean }) => openStates.push(details.open) },
  });
  expect(component.getRefs().rootRef!.getAttribute('data-slot')).toBe('date-picker-root');
  expect(screen.queryByTestId('date-picker-content')).toBeNull();

  await page.getByRole('button', { name: 'Open date picker', exact: true }).click();
  const content = await screen.findByTestId('date-picker-content');
  expect(container.contains(content)).toBe(false);
  expect(document.body.contains(content)).toBe(true);
  expect(openStates).toEqual([true]);

  await page.getByTestId('date-picker-content').press('Escape');
  await expect.poll(() => openStates).toEqual([true, false]);
});

test('keeps controlled values, context, and RootProvider state consumer-owned', async () => {
  render(ControlledDatePicker);
  await expect
    .element(page.getByRole('textbox', { name: 'Controlled date', exact: true }))
    .toHaveValue('06/22/2026');
  await expect
    .element(page.getByRole('textbox', { name: 'Provider date', exact: true }))
    .toHaveValue('07/01/2026');
  await expect
    .element(page.getByTestId('provider-date-picker'))
    .toHaveAttribute('data-slot', 'date-picker-root-provider');

  await page.getByRole('button', { name: 'Set controlled date', exact: true }).click();
  await expect
    .element(page.getByRole('textbox', { name: 'Controlled date', exact: true }))
    .toHaveValue('06/23/2026');
  await expect.element(page.getByTestId('controlled-date-value')).toContainText('2026-06-23');

  await page.getByRole('button', { name: 'Clear provider date', exact: true }).click();
  await expect
    .element(page.getByRole('textbox', { name: 'Provider date', exact: true }))
    .toHaveValue('');
});

test('renders and selects years in a year-only picker', async () => {
  const onValueChange = rs.fn();
  render(YearPickerDatePicker, { props: { onValueChange } });

  await expect
    .element(page.getByRole('textbox', { name: 'Year', exact: true }))
    .toHaveValue('2026');
  await page.getByRole('button', { name: 'Open years', exact: true }).click();
  await expect.element(page.getByRole('button', { name: '2020', exact: true })).toBeVisible();
  await expect.element(page.getByRole('button', { name: '2026', exact: true })).toBeFocused();

  await page.getByRole('button', { name: '2020', exact: true }).click();
  await expect
    .poll(() => onValueChange)
    .toHaveBeenCalledWith(expect.objectContaining({ valueAsString: ['2020'] }));
  await expect
    .element(page.getByRole('textbox', { name: 'Year', exact: true }))
    .toHaveValue('2020');
});

test('preserves semantic hosts and refs through Ark asChild', async () => {
  const { component } = render(AsChildDatePicker);
  const root = screen.getByRole('region', { name: 'Date picker' });
  expect(root.tagName).toBe('SECTION');
  await expect
    .element(page.getByRole('region', { name: 'Date picker', exact: true }))
    .toHaveAttribute('data-slot', 'date-picker-root');
  expect(component.getRefs().rootRef).toBe(root);
});

test('composes styled trigger parts through asChild', async () => {
  render(TriggerAsChildDatePicker);
  await expect
    .element(page.getByRole('button', { name: 'Open calendar', exact: true }))
    .toHaveAttribute('data-slot', 'date-picker-trigger');
});

test.each([
  { component: 'field', count: 1 },
  { component: 'range', count: 2 },
] as const)(
  'preserves fixed $component anatomy when JavaScript passes asChild',
  async ({ component, count }) => {
    render(FixedFieldDatePicker, { props: { component } });
    expect(screen.getByTestId('fixed-control').tagName).toBe('DIV');
    expect(screen.getAllByRole('textbox')).toHaveLength(count);
    expect(screen.queryByText('Ignored content')).toBeNull();
    await expect
      .element(page.getByRole('button', { name: 'Clear localized date', exact: true }))
      .toBeVisible();
    await expect
      .element(page.getByRole('button', { name: 'Open localized calendar', exact: true }))
      .toBeVisible();
    expect(
      screen.getAllByRole('textbox').map((input) => input.getAttribute('placeholder')),
    ).toEqual(Array(count).fill('mm/dd/yyyy'));
  },
);

test('preserves the fixed day table despite unsupported JavaScript composition', async () => {
  render(FixedTableDatePicker);
  expect((await screen.findByTestId('fixed-table')).tagName).toBe('TABLE');
  expect(screen.getAllByRole('columnheader', { hidden: true })).toHaveLength(8);
  expect(screen.queryByText('Ignored table content')).toBeNull();
});

test.each(['field', 'range'] as const)(
  'keeps the %s convenience props reactive and consumer overrides last',
  async (component) => {
    const { rerender } = render(ConvenienceDatePicker, {
      props: {
        component,
        placeholder: 'Convenience placeholder',
        clearLabel: 'Convenience clear',
        triggerLabel: 'Convenience trigger',
      },
    });
    await expect
      .element(page.getByRole('button', { name: 'Convenience clear', exact: true }))
      .toBeVisible();
    await expect
      .element(page.getByRole('button', { name: 'Convenience trigger', exact: true }))
      .toBeVisible();
    await rerender({
      placeholder: 'Updated placeholder',
      clearLabel: 'Updated clear',
      triggerLabel: 'Updated trigger',
    });
    await expect
      .element(page.getByRole('button', { name: 'Updated clear', exact: true }))
      .toBeVisible();
    await expect
      .element(page.getByRole('button', { name: 'Updated trigger', exact: true }))
      .toBeVisible();
    for (const input of screen.getAllByRole('textbox'))
      await expect.poll(() => input.getAttribute('placeholder')).toBe('Updated placeholder');
    await rerender({ overrides: true });
    await expect
      .element(page.getByRole('button', { name: 'Override clear', exact: true }))
      .toBeVisible();
    await expect
      .element(page.getByRole('button', { name: 'Override trigger', exact: true }))
      .toBeVisible();
    for (const input of screen.getAllByRole('textbox'))
      await expect.poll(() => input.getAttribute('placeholder')).toBe('Override placeholder');
    expect(screen.getAllByRole('textbox').map((input) => input.getAttribute('data-index'))).toEqual(
      component === 'range' ? ['0', '1'] : ['0'],
    );
  },
);

test('renders month and year tables with a navigation header', () => {
  const { unmount } = render(CalendarDatePicker, { props: { table: 'month' } });
  expect(document.querySelectorAll('[data-slot="date-picker-table-cell-trigger"]')).toHaveLength(
    12,
  );
  expect(document.querySelector('[data-slot="date-picker-view-trigger"]')).not.toBeNull();
  unmount();

  render(CalendarDatePicker, { props: { table: 'year', showHeader: false } });
  expect(document.querySelectorAll('[data-slot="date-picker-table-cell-trigger"]')).toHaveLength(
    10,
  );
  expect(document.querySelector('[data-slot="date-picker-view-trigger"]')).toBeNull();
});

test('reads week numbers from the root and offsets the day table by months', () => {
  render(CalendarDatePicker, {
    props: { table: 'day', showHeader: false, showWeekNumbers: true, offset: 1 },
  });
  expect(document.querySelector('[data-slot="date-picker-week-number-cell"]')).not.toBeNull();
  expect(
    document.querySelector('[data-slot="date-picker-table-cell-trigger"][data-value="2026-07-15"]'),
  ).not.toBeNull();
});