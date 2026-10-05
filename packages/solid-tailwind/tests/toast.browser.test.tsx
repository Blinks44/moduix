import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import {
  Toast,
  ToastCloseTrigger,
  ToastDescription,
  ToastTitle,
  ToastToaster,
  createToaster,
  useToastContext,
} from '../src';

test('renders the default toaster content and keeps closable and action behavior', async () => {
  const toaster = createToaster({ placement: 'bottom', duration: Infinity });
  let actionCount = 0;

  render(() => <ToastToaster toaster={toaster} />);

  toaster.create({
    title: 'Changes saved',
    description: 'Your workspace is up to date.',
    action: { label: 'Undo', onClick: () => actionCount++ },
  });

  const title = await screen.findByText('Changes saved');
  const root = title.closest('[data-slot="toast-root"]');
  await expect.element(page.getByText('Changes saved')).toBeVisible();
  await expect.element(page.getByText('Your workspace is up to date.')).toBeVisible();
  await expect.element(page.getByRole('button', { name: 'Undo', exact: true })).toBeVisible();
  await expect
    .element(page.getByRole('button', { name: 'Close toast', exact: true }))
    .toBeVisible();
  expect([...root!.classList]).toEqual(
    expect.arrayContaining(['box-border', 'grid', 'w-80', 'gap-1', 'rounded-lg', 'bg-card', 'p-4']),
  );
  expect([...title!.classList]).toEqual(
    expect.arrayContaining(['m-0', 'text-sm', 'leading-5', 'font-semibold']),
  );
  expect([...screen.getByText('Your workspace is up to date.').classList]).toEqual(
    expect.arrayContaining(['m-0', 'text-sm', 'leading-5', 'text-muted-foreground']),
  );
  expect([...screen.getByRole('button', { name: 'Undo' }).classList]).toEqual(
    expect.arrayContaining(['mt-2', 'min-h-control-xs', 'border-border', 'px-2', 'py-1']),
  );
  expect([...screen.getByRole('button', { name: 'Close toast' }).classList]).toEqual(
    expect.arrayContaining(['absolute', 'end-2', 'top-2']),
  );

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
  const toaster = createToaster({ placement: 'bottom', duration: Infinity });

  render(() => <ToastToaster toaster={toaster} />);

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
  const toaster = createToaster({ placement: 'bottom', duration: Infinity });

  function ContextTitle() {
    const toast = useToastContext();
    return <ToastTitle>{toast().title}</ToastTitle>;
  }

  render(() => (
    <ToastToaster toaster={toaster} portalled={false}>
      {() => (
        <Toast>
          <ContextTitle />
          <ToastCloseTrigger
            asChild={(props) => (
              <button {...props()} type="button">
                Dismiss
              </button>
            )}
            aria-label="Dismiss custom toast"
          >
            Dismiss
          </ToastCloseTrigger>
        </Toast>
      )}
    </ToastToaster>
  ));

  toaster.create({ title: 'Custom toast' });

  await expect.element(page.getByText('Custom toast')).toBeVisible();
  await expect
    .element(page.locator('[data-slot="toast-root"]'))
    .toHaveAttribute('data-part', 'root');

  await page.getByRole('button', { name: 'Dismiss custom toast', exact: true }).click();
  await expect.element(page.getByText('Custom toast')).toHaveCount(0);
});

test('portals by default, supports inline rendering, and accepts a custom portal target', async () => {
  const portalledToaster = createToaster({ placement: 'bottom', duration: Infinity });
  const portalled = render(() => <ToastToaster toaster={portalledToaster} />);

  portalledToaster.create({ title: 'Portalled toast' });
  const portalledTitle = await screen.findByText('Portalled toast');
  expect(portalled.container!.contains(portalledTitle)).not.toBe(true);
  portalled.unmount();

  const inlineToaster = createToaster({ placement: 'bottom', duration: Infinity });
  const inline = render(() => <ToastToaster toaster={inlineToaster} portalled={false} />);

  inlineToaster.create({ title: 'Inline toast' });
  const inlineTitle = await screen.findByText('Inline toast');
  expect(inline.container!.contains(inlineTitle)).toBe(true);
  inline.unmount();

  const customToaster = createToaster({ placement: 'bottom', duration: Infinity });
  function CustomPortalToaster() {
    let portalRef!: HTMLDivElement;

    return (
      <>
        <div ref={(element) => (portalRef = element)} data-testid="toast-portal" />
        <ToastToaster toaster={customToaster} portalRef={() => portalRef} />
      </>
    );
  }

  render(() => <CustomPortalToaster />);
  customToaster.create({ title: 'Custom portal toast' });

  await expect
    .element(page.getByTestId('toast-portal').getByText('Custom portal toast'))
    .toBeAttached();
});

test('lets consumer Tailwind utilities override conflicting defaults', async () => {
  const toaster = createToaster({ placement: 'bottom', duration: Infinity });

  render(() => (
    <ToastToaster toaster={toaster} portalled={false}>
      {() => (
        <Toast class="w-full bg-primary p-6">
          <ToastTitle class="text-lg" />
          <ToastDescription />
        </Toast>
      )}
    </ToastToaster>
  ));

  toaster.create({ title: 'Custom styles', description: 'Consumer utilities win.' });

  const root = (await screen.findByText('Custom styles')).closest('[data-slot="toast-root"]');
  expect([...root!.classList]).toEqual(expect.arrayContaining(['w-full', 'bg-primary', 'p-6']));
  expect(['w-80', 'bg-card', 'p-4'].some((name) => root!.classList.contains(name))).toBe(false);
  expect([...screen.getByText('Custom styles').classList]).toEqual(
    expect.arrayContaining(['text-lg']),
  );
  expect(screen.getByText('Custom styles')!.classList.contains('text-sm')).toBe(false);

  await expect.element(page.locator('[data-slot="toast-root"]')).toHaveCSS('padding', '24px');
});

test.each([false, true])(
  'updates the close trigger accessible name (asChild=%s)',
  async (asChild) => {
    const toaster = createToaster({ placement: 'bottom', duration: Infinity });
    const [label, setLabel] = createSignal<string | undefined>();
    render(() => (
      <ToastToaster toaster={toaster} portalled={false}>
        {() => (
          <Toast>
            <ToastTitle />
            <ToastCloseTrigger
              aria-label={label()}
              asChild={asChild ? (props) => <button {...props()}>Clear</button> : undefined}
            />
          </Toast>
        )}
      </ToastToaster>
    ));
    toaster.create({ title: 'Reactive label' });
    const trigger = await screen.findByRole('button', { name: 'Close toast' });

    setLabel('Dismiss notification');
    expect(screen.getByRole('button', { name: 'Dismiss notification' })).toBe(trigger);
    setLabel(undefined);
    expect(screen.getByRole('button', { name: 'Close toast' })).toBe(trigger);
  },
);