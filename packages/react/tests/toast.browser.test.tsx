import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen, within } from '@testing-library/react';
import {
  Popover,
  PopoverContent,
  PopoverPositioner,
  PopoverTrigger,
  Toast,
  ToastCloseTrigger,
  ToastTitle,
  ToastToaster,
  createToaster,
  useToastContext,
} from '../src';

test('renders the default toaster content and keeps closable and action behavior', async () => {
  const toaster = createToaster({ duration: Infinity });
  let actionCount = 0;

  render(<ToastToaster toaster={toaster} />);

  toaster.create({
    title: 'Changes saved',
    description: 'Your workspace is up to date.',
    action: { label: 'Undo', onClick: () => actionCount++ },
  });

  await expect.element(page.getByText('Changes saved')).toBeVisible();
  await expect.element(page.getByText('Your workspace is up to date.')).toBeVisible();
  await expect.element(page.getByRole('button', { name: 'Undo', exact: true })).toBeVisible();
  await expect
    .element(page.getByRole('button', { name: 'Close toast', exact: true }))
    .toBeVisible();

  await page.getByRole('button', { name: 'Undo', exact: true }).click();
  expect(actionCount).toBe(1);
  await expect.element(page.getByText('Changes saved')).toHaveCount(0);

  toaster.create({ title: 'Persistent notice', closable: false });
  await expect.element(page.getByText('Persistent notice')).toBeVisible();
  await expect
    .element(page.getByRole('button', { name: 'Close toast', exact: true }))
    .toHaveCount(0);
});

test('uses info for implicit and explicit info toast types', async () => {
  const toaster = createToaster({ duration: Infinity });

  render(<ToastToaster toaster={toaster} />);

  toaster.create({ title: 'Implicit info toast' });
  expect(
    (await screen.findByText('Implicit info toast'))
      .closest('[data-slot="toast-root"]')!
      .getAttribute('data-type'),
  ).toBe('info');

  toaster.create({ title: 'Explicit info toast', type: 'info' });
  expect(
    (await screen.findByText('Explicit info toast'))
      .closest('[data-slot="toast-root"]')!
      .getAttribute('data-type'),
  ).toBe('info');
});

test('keeps the short Toast root form and exported context hook available for custom composition', async () => {
  const toaster = createToaster({ duration: Infinity });

  function ContextTitle() {
    const toast = useToastContext();
    return <ToastTitle>{toast.title}</ToastTitle>;
  }

  render(
    <ToastToaster toaster={toaster}>
      {(toast) => (
        <Toast key={toast.id}>
          <ContextTitle />
          <ToastCloseTrigger asChild aria-label="Dismiss custom toast">
            <button type="button">Dismiss</button>
          </ToastCloseTrigger>
        </Toast>
      )}
    </ToastToaster>,
  );

  toaster.create({ title: 'Custom toast' });

  await expect.element(page.getByText('Custom toast')).toBeVisible();
  await expect
    .element(page.locator('[data-slot="toast-root"]'))
    .toHaveAttribute('data-part', 'root');

  await page.getByRole('button', { name: 'Dismiss custom toast', exact: true }).click();
  await expect.element(page.getByText('Custom toast')).toHaveCount(0);
});

test('portals by default, supports inline rendering, and accepts a custom portal target', async () => {
  const portalledToaster = createToaster({ duration: Infinity });
  const portalled = render(<ToastToaster toaster={portalledToaster} />);

  portalledToaster.create({ title: 'Portalled toast' });
  const portalledTitle = await screen.findByText('Portalled toast');
  expect(portalled.container!.contains(portalledTitle)).not.toBe(true);
  portalled.unmount();

  const inlineToaster = createToaster({ duration: Infinity });
  const inline = render(<ToastToaster toaster={inlineToaster} portalled={false} />);

  inlineToaster.create({ title: 'Inline toast' });
  const inlineTitle = await screen.findByText('Inline toast');
  expect(inline.container!.contains(inlineTitle)).toBe(true);
  inline.unmount();

  const customToaster = createToaster({ duration: Infinity });
  const portalRef = { current: document.createElement('div') };
  document.body.append(portalRef.current);
  const custom = render(<ToastToaster toaster={customToaster} portalRef={portalRef} />);
  customToaster.create({ title: 'Custom portal toast' });

  expect(
    Boolean((await within(portalRef.current).findByText('Custom portal toast'))?.isConnected),
  ).toBe(true);
  custom.unmount();
  portalRef.current.remove();
});

test.each([true, false])(
  "preserves a nested popover's own portalled=%s setting",
  async (portalled) => {
    const toaster = createToaster({ duration: Infinity });
    const portalRef = { current: document.createElement('div') };
    document.body.append(portalRef.current);
    const view = render(
      <ToastToaster toaster={toaster} portalRef={portalRef}>
        {(toast) => (
          <Toast key={toast.id}>
            <ToastTitle />
            <Popover portalled={portalled}>
              <PopoverTrigger>Toast details</PopoverTrigger>
              <PopoverPositioner>
                <PopoverContent>Nested toast details</PopoverContent>
              </PopoverPositioner>
            </Popover>
          </Toast>
        )}
      </ToastToaster>,
    );
    toaster.create({ title: 'Toast with popover' });
    await page.getByRole('button', { name: 'Toast details', exact: true }).click();
    const content = await screen.findByText('Nested toast details');
    expect(portalRef.current.contains(content)).toBe(!portalled);
    view.unmount();
    portalRef.current.remove();
  },
);