import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import AttrsPad from './signature-pad/AttrsPad.svelte';
import CallbackPad from './signature-pad/CallbackPad.svelte';
import CanvasPad from './signature-pad/CanvasPad.svelte';
import ClassPad from './signature-pad/ClassPad.svelte';
import ControlledPad from './signature-pad/ControlledPad.svelte';
import DirectArkPad from './signature-pad/DirectArkPad.svelte';
import DrawPad from './signature-pad/DrawPad.svelte';
import FieldPad from './signature-pad/FieldPad.svelte';
import FormPad from './signature-pad/FormPad.svelte';
import GuardsPad from './signature-pad/GuardsPad.svelte';
import HookReadOnlyPad from './signature-pad/HookReadOnlyPad.svelte';
import ProviderPad from './signature-pad/ProviderPad.svelte';
import RawArkPad from './signature-pad/RawArkPad.svelte';

const defaultPaths = ['M1,1 L2,2'];

test.each([false, true])(
  'preserves omitted disabled and read-only clear guards with asChild=%s',
  async (asChild) => {
    const changes = rs.fn();
    const click = rs.fn();
    const { component, rerender } = render(GuardsPad, {
      props: { asChild, changes, click, rootDisabled: true, readOnly: false },
    });

    const trigger = screen.getByTestId('clear');
    await expect.element(page.getByTestId('clear')).toBeDisabled();
    expect(trigger).toBe(
      screen.getByRole(trigger!.getAttribute('role') || 'button', { name: 'Reset signature' }),
    );
    expect(component.getState().triggerRef).toBe(trigger);
    await expect
      .element(page.getByTestId('clear'))
      .toHaveAttribute('data-slot', 'signature-pad-clear-trigger');
    expect([...trigger!.classList]).toEqual(expect.arrayContaining(['consumer-clear']));
    await expect.element(page.getByTestId('clear')).toHaveAttribute('title', 'Reset drawing');
    expect(trigger.querySelector('svg') !== null).toBe(!asChild);
    if ((trigger as HTMLButtonElement).disabled) {
      (trigger as HTMLButtonElement).click();
    } else {
      await page.getByTestId('clear').click();
    }
    expect(changes).not.toHaveBeenCalled();
    expect(component.getState().paths).toEqual(defaultPaths);

    await rerender({ rootDisabled: false });
    await expect.element(page.getByTestId('clear')).not.toBeDisabled();
    await rerender({ disabled: true });
    await expect.element(page.getByTestId('clear')).toBeDisabled();
    await rerender({ disabled: false });
    await expect.element(page.getByTestId('clear')).not.toBeDisabled();
    await rerender({ readOnly: true });
    await expect.element(page.getByTestId('clear')).not.toBeVisible();
    await rerender({ readOnly: false, disabled: undefined });
    await expect.element(page.getByTestId('clear')).not.toBeDisabled();
    click.mockClear();
    if ((trigger as HTMLButtonElement).disabled) {
      (trigger as HTMLButtonElement).click();
    } else {
      await page.getByTestId('clear').click();
    }
    await expect.poll(() => component.getState().paths).toEqual([]);
    expect(changes).toHaveBeenCalledTimes(1);
    expect(click).toHaveBeenCalledTimes(1);
    await expect.element(page.getByTestId('clear')).toHaveAttribute('hidden');
    expect(component.getState().triggerRef).toBe(trigger);
  },
);

test('serializes an explicit hidden input with Ark defaults', async () => {
  const { container } = render(FormPad);
  const form = container.querySelector('form');

  await expect.element(page.locator('input[hidden]')).toHaveAttribute('name', 'signature');
  expect(new FormData(form! as HTMLFormElement).get('signature')).toBe(defaultPaths.join(' '));
});

test('keeps the clear action and callback details Ark-shaped', async () => {
  const drawEnds: string[][] = [];
  render(CallbackPad, { props: { drawEnds } });
  await page.getByRole('button', { name: 'Clear signature', exact: true }).click();

  await expect.element(page.locator('input[hidden]')).toHaveValue('');
  await expect.poll(() => [...drawEnds]).toEqual([[]]);
});

test('keeps the disabled control and clear action unavailable', async () => {
  render(CallbackPad, { props: { disabled: true, label: 'Disabled signature' } });

  await expect
    .element(page.getByRole('application', { name: 'Signature drawing area', exact: true }))
    .toHaveAttribute('aria-disabled', 'true');
  await expect
    .element(page.getByRole('button', { name: 'Clear signature', exact: true }))
    .toBeDisabled();
});

test('hides the clear action for read-only signatures', async () => {
  render(FieldPad);

  await expect.element(page.locator('[data-slot="signature-pad-clear-trigger"]')).not.toBeVisible();
});

test('forwards Canvas control props and ref', async () => {
  const { component } = render(CanvasPad);

  const canvas = screen.getByTestId('canvas');
  expect(component.getRefs().canvasRef).toBe(canvas);
  await expect
    .element(page.getByTestId('canvas'))
    .toHaveAttribute('data-slot', 'signature-pad-control');
  expect(canvas).toBe(
    screen.getByRole(canvas!.getAttribute('role') || 'button', { name: 'Contract signature area' }),
  );
});

test('preserves RootProvider state and moduix read-only behavior', async () => {
  render(ProviderPad);

  const provider = screen
    .getByText('Provider signature')
    .closest('[data-slot="signature-pad-root-provider"]')!;
  expect(provider!.getAttribute('data-probe')).toBe('provider');
  expect(provider.querySelector<HTMLInputElement>('input[hidden]')!.value).toBe(
    defaultPaths.join(' '),
  );
  await expect
    .element(page.locator('[data-slot="signature-pad-clear-trigger"]').nth(0))
    .toBeVisible();
  await expect
    .element(page.locator('[data-slot="signature-pad-clear-trigger"]').nth(1))
    .not.toBeVisible();
});

test('updates clear-trigger attrs and preserves one consumer class through asChild', async () => {
  const { component, rerender } = render(AttrsPad, {
    props: { label: 'Clear initial signature', probe: 'initial' },
  });
  await rerender({ label: 'Clear updated signature', probe: 'updated' });
  await expect
    .element(page.getByRole('button', { name: 'Clear updated signature', exact: true }))
    .toBeAttached();
  const trigger = screen.getByRole('button', { name: 'Clear updated signature' });
  await expect
    .element(page.getByRole('button', { name: 'Clear updated signature', exact: true }))
    .toHaveAttribute('data-probe', 'updated');
  expect(trigger.className.split(' ').filter((name) => name === 'consumer-trigger')).toHaveLength(
    1,
  );
  await expect.poll(() => component.getRefs().triggerRef).toBe(trigger);
});

test('commits pointer strokes and preserves uncontrolled drawing details', async () => {
  const draws: { paths: string[]; currentPath: string | null }[] = [];
  const ends: { paths: string[]; getDataUrl: (type: 'image/png') => Promise<string> }[] = [];
  const { component } = render(DrawPad, {
    props: {
      onDraw: (details) => draws.push(details),
      onDrawEnd: (details) => ends.push(details),
    },
  });
  const control = screen.getByRole('application', { name: 'Signature drawing area' });
  const area = page.getByRole('application', { name: 'Signature drawing area' });
  await area.hover({ position: { x: 20, y: 25 } });
  const { left, top } = control.getBoundingClientRect();
  // Rstest has no drag API; native hover registers the mouse pointer for capture.
  const pointer = {
    bubbles: true,
    cancelable: true,
    button: 0,
    buttons: 1,
    pointerId: 1,
    pointerType: 'mouse',
    clientX: left + 20,
    clientY: top + 25,
  };
  await area.dispatchEvent('pointerdown', pointer);
  await expect.element(page.locator('[data-part="segment-path"]')).toHaveAttribute('d');
  await area.dispatchEvent('pointermove', { ...pointer, clientX: left + 60, clientY: top + 55 });
  await area.dispatchEvent('pointerup', {
    ...pointer,
    buttons: 0,
    clientX: left + 80,
    clientY: top + 70,
  });
  await expect.poll(() => component.getPaths()).toHaveLength(1);
  const paths = component.getPaths();
  expect(paths[0]).toMatch(/^M/);
  expect(draws.some((details) => details.currentPath !== null)).toBe(true);
  expect(ends).toHaveLength(1);
  expect(ends[0].paths).toEqual(paths);
  expect(await ends[0].getDataUrl('image/png')).toMatch(/^data:image\/png;base64,/);
  await expect.element(page.locator('[data-part="segment-path"]')).toHaveAttribute('d', paths[0]);
});

test('includes the committed paths in controlled drawEnd details in direct Ark', async () => {
  const { component } = render(DirectArkPad);
  const control = screen.getByRole('application', { name: 'Signature drawing area' });
  const area = page.getByRole('application', { name: 'Signature drawing area' });
  await area.hover({ position: { x: 20, y: 25 } });
  const { left, top } = control.getBoundingClientRect();
  const pointer = {
    bubbles: true,
    cancelable: true,
    button: 0,
    buttons: 1,
    pointerId: 1,
    pointerType: 'mouse',
    clientX: left + 20,
    clientY: top + 25,
  };
  await area.dispatchEvent('pointerdown', pointer);
  await expect.element(page.locator('[data-part="segment-path"]')).toHaveAttribute('d');
  await area.dispatchEvent('pointermove', { ...pointer, clientX: left + 60, clientY: top + 55 });
  await area.dispatchEvent('pointerup', {
    ...pointer,
    buttons: 0,
    clientX: left + 80,
    clientY: top + 70,
  });
  await expect.poll(() => component.getState().paths).toHaveLength(1);
  expect([...component.getState().committed]).toEqual([component.getState().paths]);
});

test('accepts the raw Ark API without read-only metadata', async () => {
  render(RawArkPad);
  await expect.element(page.locator('[data-slot="signature-pad-clear-trigger"]')).toBeVisible();
});

test('keeps hook metadata reactive and lets explicit false override Field read-only', async () => {
  const { rerender } = render(HookReadOnlyPad);
  await expect.element(page.locator('[data-slot="signature-pad-clear-trigger"]')).not.toBeVisible();
  await expect.element(page.getByTestId('read-only')).toContainText('true');
  await rerender({ readOnly: false });
  await expect.element(page.locator('[data-slot="signature-pad-clear-trigger"]')).toBeVisible();
  await expect.element(page.getByTestId('read-only')).toContainText('false');
  await rerender({ readOnly: true });
  await expect.element(page.locator('[data-slot="signature-pad-clear-trigger"]')).not.toBeVisible();
  await expect.element(page.getByTestId('read-only')).toContainText('true');
});

test('supports controlled paths through bind:paths and preserves root asChild composition', async () => {
  const changes: string[][] = [];
  const { component } = render(ControlledPad, { props: { changes } });

  const root = screen.getByRole('region', { name: 'Custom signature' });
  expect(root.tagName).toBe('SECTION');
  expect(component.getState().rootRef).toBe(root);
  await expect
    .element(page.getByRole('region', { name: 'Custom signature', exact: true }))
    .toHaveAttribute('data-slot', 'signature-pad-root');
  await expect
    .element(page.getByRole('region', { name: 'Custom signature', exact: true }))
    .toHaveAttribute('data-probe', 'root');

  await page.getByRole('button', { name: /clear signature/i, exact: true }).click();
  await expect.element(page.getByText('Paths: 0')).toBeAttached();
  expect(component.getState().paths).toEqual([]);
  expect(changes).toEqual([[]]);
});

test('renders Ark anatomy and lets consumer classes win', () => {
  const { container } = render(ClassPad);
  const root = container.querySelector('[data-slot="signature-pad-root"]');

  expect(root?.className.endsWith('consumer-root')).toBe(true);
});