import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import {
  Popover,
  PopoverContent,
  PopoverPositioner,
  PopoverTrigger,
  Toast,
  ToastCloseTrigger,
  ToastDescription,
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

test('shows a spinner next to the title of loading toasts only', async () => {
  const toaster = createToaster({ duration: Infinity });

  render(<ToastToaster toaster={toaster} />);

  const id = toaster.create({ title: 'Saving changes', type: 'loading' });
  const loadingTitle = (await screen.findByText('Saving changes')).closest(
    '[data-slot="toast-title"]',
  )!;
  expect(loadingTitle.querySelector('[data-slot="spinner-root"]')).not.toBeNull();
  expect(loadingTitle.querySelector('[role="status"]')).toBeNull();

  toaster.update(id, { title: 'Changes saved', type: 'success' });
  const successTitle = (await screen.findByText('Changes saved')).closest(
    '[data-slot="toast-title"]',
  )!;
  expect(successTitle.querySelector('[data-slot="spinner-root"]')).toBeNull();
});

test('reserves inline-end space only for a rendered close trigger', async () => {
  const toaster = createToaster({ duration: Infinity });

  render(<ToastToaster toaster={toaster} />);

  toaster.create({ title: 'Closable toast' });
  toaster.create({ title: 'Persistent toast', closable: false });

  const closable = (await screen.findByText('Closable toast')).closest('[data-slot="toast-root"]')!;
  const persistent = (await screen.findByText('Persistent toast')).closest(
    '[data-slot="toast-root"]',
  )!;
  expect(getComputedStyle(closable).paddingInlineEnd).toBe('44px');
  expect(getComputedStyle(persistent).paddingInlineEnd).toBe('16px');
});

test('paints status toasts with an opaque background', async () => {
  const toaster = createToaster({ duration: Infinity });

  render(<ToastToaster toaster={toaster} />);

  toaster.success({ title: 'Success toast' });
  toaster.warning({ title: 'Warning toast' });
  toaster.error({ title: 'Error toast' });

  for (const title of ['Success toast', 'Warning toast', 'Error toast']) {
    const root = (await screen.findByText(title)).closest('[data-slot="toast-root"]')!;
    // Toasts overlay page content, so a translucent status tint would let it show through.
    expect(getComputedStyle(root).backgroundColor).not.toMatch(/\/\s*0?\.\d+\s*\)$|^rgba\(/);
  }
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
  portalRef.current.dataset.testid = 'toast-portal';
  document.body.append(portalRef.current);
  const custom = render(<ToastToaster toaster={customToaster} portalRef={portalRef} />);
  customToaster.create({ title: 'Custom portal toast' });

  await expect
    .element(page.getByTestId('toast-portal').getByText('Custom portal toast'))
    .toBeAttached();
  custom.unmount();
  portalRef.current.remove();
});

test('lets consumer Tailwind utilities override conflicting defaults', async () => {
  const toaster = createToaster({ duration: Infinity });

  render(
    <ToastToaster toaster={toaster} portalled={false}>
      {(toast) => (
        <Toast key={toast.id} className="w-full bg-primary p-6">
          <ToastTitle className="text-lg" />
          <ToastDescription />
        </Toast>
      )}
    </ToastToaster>,
  );

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

const responsivePlacements = [
  'top-start',
  'top',
  'top-end',
  'bottom-start',
  'bottom',
  'bottom-end',
] as const;

test.each(
  responsivePlacements.flatMap((placement) =>
    (['ltr', 'rtl'] as const).map((dir) => ({ placement, dir })),
  ),
)(
  'keeps $placement toasts inside the viewport in $dir at the mobile breakpoint',
  async ({ placement, dir }) => {
    const toaster = createToaster({ placement, duration: Infinity, offsets: '24px', gap: 48 });
    const view = render(<ToastToaster toaster={toaster} dir={dir} />);
    // Copy the mounted group into a real viewport to test its responsive CSS.
    const frame = document.createElement('iframe');
    frame.style.cssText = 'width:320px;height:800px;border:0';
    document.body.append(frame);
    try {
      toaster.create({ title: 'Responsive notification' });
      await expect
        .element(page.locator('[data-slot="toast-root"]'))
        .toHaveAttribute('data-mounted', '');
      const frameDocument = frame.contentDocument!;
      const style = frameDocument.createElement('style');
      style.textContent = [...document.styleSheets]
        .flatMap((sheet) => [...sheet.cssRules].map((rule) => rule.cssText))
        .join('\n');
      frameDocument.head.append(style);
      const source = screen
        .getByText('Responsive notification')
        .closest('[data-slot="toast-toaster"]')!;
      frameDocument.body.append(source.cloneNode(true));
      const root = frameDocument.querySelector('[data-slot="toast-root"]')!;
      for (const width of [320, 500, 640, 641, 640]) {
        frame.style.width = `${width}px`;
        const toastWidth = width <= 640 ? Math.min(320, width - 48) : 320;
        await expect.poll(() => root.getBoundingClientRect().width).toBeCloseTo(toastWidth, 0);
        if (width <= 640) {
          expect(root.getBoundingClientRect().left).toBeCloseTo((width - toastWidth) / 2, 0);
          expect(root.getBoundingClientRect().right).toBeCloseTo((width + toastWidth) / 2, 0);
        }
        expect(
          placement.startsWith('top')
            ? root.getBoundingClientRect().top
            : frame.contentWindow!.innerHeight - root.getBoundingClientRect().bottom,
        ).toBeCloseTo(24, 0);
      }
    } finally {
      view.unmount();
      frame.remove();
    }
  },
);