import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen, within } from '@testing-library/svelte';
import { createRawSnippet } from 'svelte';
import { createToaster } from '@/index';
import AnatomyHarness from './toast/AnatomyHarness.svelte';
import ContextHarness from './toast/ContextHarness.svelte';
import ExplicitHarness from './toast/ExplicitHarness.svelte';
import LabelsHarness from './toast/LabelsHarness.svelte';
import MovingHarness from './toast/MovingHarness.svelte';
import NativeRootHarness from './toast/NativeRootHarness.svelte';
import PopoverHarness from './toast/PopoverHarness.svelte';
import ToasterHarness from './toast/ToasterHarness.svelte';

const renderToaster = (toaster: ReturnType<typeof createToaster>, portalled?: boolean) =>
  render(ToasterHarness, { props: { toaster, portalled } });

const responsivePlacements = [
  'top-start',
  'top',
  'top-end',
  'bottom-start',
  'bottom',
  'bottom-end',
] as const;

test('keeps rendered snippet content and context fallbacks reactive across store updates', async () => {
  const toaster = createToaster({ placement: 'bottom', duration: Infinity });
  renderToaster(toaster, false);
  const id = toaster.create({
    title: createRawSnippet(() => ({
      render: () => '<strong data-testid="rich-title">Rich title</strong>',
    })),
    description: createRawSnippet(() => ({ render: () => '<em>Rich description</em>' })),
    action: { label: 'Rich action', onClick: () => {} },
  });
  const title = await screen.findByTestId('rich-title');
  const root = title.closest('[data-slot="toast-root"]');
  expect(title.tagName).toBe('STRONG');
  expect(screen.getByText('Rich description').tagName).toBe('EM');
  await expect
    .element(page.getByRole('button', { name: 'Rich action', exact: true }))
    .toBeVisible();

  toaster.update(id, {
    title: 'Updated title',
    description: null,
    action: undefined,
    closable: false,
  });
  await expect.element(page.getByText('Updated title')).toBeVisible();
  expect(screen.getByText('Updated title').closest('[data-slot="toast-root"]')).toBe(root);
  expect(root?.querySelector('[data-slot="toast-description"]')).toBeNull();
  expect(root?.querySelector('[data-slot="toast-action-trigger"]')).toBeNull();
  expect(root?.querySelector('[data-slot="toast-close-trigger"]')).toBeNull();
});

test('preserves explicit children content and semantic asChild title, description, and action hosts', async () => {
  const toaster = createToaster({ placement: 'bottom', duration: Infinity });
  const handleAction = rs.fn();
  const handleClick = rs.fn();
  const { component } = render(ExplicitHarness, { props: { toaster, handleClick } });
  const id = toaster.create({
    title: 'Store title',
    description: 'Store description',
    action: { label: 'Store action', onClick: handleAction },
  });
  const title = await screen.findByRole('heading', { name: 'Consumer title' });
  const description = screen.getByText('Consumer description');
  const action = screen.getByRole('button', { name: 'Consumer action' });
  const refs = component.getRefs();
  expect(title.closest('[data-slot="toast-root"]')!.getAttribute('data-toast-id')).toBe(id);
  expect(refs.titleRef).toBe(title);
  expect(refs.descriptionRef).toBe(description);
  expect(description.tagName).toBe('P');
  expect(refs.actionRef).toBe(action);
  expect(action.className).toBe('consumer-action');
  expect(screen.queryByText('Store title')).toBeNull();
  expect(screen.queryByText('Store description')).toBeNull();
  await page.getByRole('button', { name: 'Consumer action', exact: true }).click();
  expect(handleAction).toHaveBeenCalledTimes(1);
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test('updates close accessible names reactively and forwards listeners once', async () => {
  const toaster = createToaster({ placement: 'bottom', duration: Infinity });
  const handleClick = rs.fn();
  const { component } = render(LabelsHarness, { props: { toaster, handleClick } });
  toaster.create({ title: 'Reactive labels' });
  await screen.findByText('Reactive labels');
  expect(screen.getAllByRole('button', { name: 'Dismiss first' })).toHaveLength(2);
  component.set({ label: 'Dismiss second' });
  await expect
    .poll(() => screen.queryAllByRole('button', { name: 'Dismiss second' }))
    .toHaveLength(2);
  component.set({ labelledby: 'close-label' });
  await expect
    .poll(() => screen.queryAllByRole('button', { name: 'Dismiss by reference' }))
    .toHaveLength(2);
  const buttons = screen.getAllByRole('button', { name: 'Dismiss by reference' });
  for (const button of buttons) {
    expect(button!.getAttribute('aria-labelledby')).toBe('close-label');
    expect(button!.getAttribute('aria-label')).not.toBe('Close toast');
  }
  component.set({});
  await expect.poll(() => screen.queryAllByRole('button', { name: 'Close toast' })).toHaveLength(2);
  await page.locator('[data-slot="toast-close-trigger"]').first().click();
  expect(handleClick).toHaveBeenCalledTimes(1);
  await expect.poll(() => screen.queryByText('Reactive labels')).toBeNull();
});

test('keeps queue limits, toast status details, dismissal, and replacement content', async () => {
  const toaster = createToaster({
    placement: 'bottom-end',
    duration: Infinity,
    removeDelay: 0,
    max: 1,
  });
  const handleStatus = rs.fn();
  renderToaster(toaster, false);
  const id = toaster.create({ title: 'First notification', onStatusChange: handleStatus });
  toaster.create({ title: 'Queued notification' });
  const first = await screen.findByText('First notification');
  expect(screen.queryByText('Queued notification')).toBeNull();
  expect(first.closest('[data-slot="toast-root"]')!.getAttribute('data-placement')).toBe(
    'bottom-end',
  );
  await expect.poll(() => handleStatus).toHaveBeenCalledWith({ status: 'visible' });
  toaster.dismiss(id);
  await expect.poll(() => screen.queryByText('First notification')).toBeNull();
  await expect.element(page.getByText('Queued notification')).toBeVisible();
  expect(handleStatus).toHaveBeenCalledWith({ status: 'dismissing', src: 'programmatic' });
  expect(handleStatus).toHaveBeenCalledWith({ status: 'unmounted' });
});

test('preserves the native Ark root asChild host', async () => {
  const toaster = createToaster({ placement: 'bottom', duration: Infinity });
  render(NativeRootHarness, { props: { toaster } });
  toaster.create({ title: 'Native root' });
  const root = await screen.findByTestId('native-toast');
  await expect.element(page.getByTestId('native-toast')).toHaveAttribute('data-part', 'root');
  expect(root.parentElement!.getAttribute('data-part')).toBe('group');
});

test('renders default content and keeps closable and action behavior', async () => {
  const toaster = createToaster({ placement: 'bottom', duration: Infinity });
  let actionCount = 0;

  renderToaster(toaster);

  toaster.create({
    title: 'Changes saved',
    description: 'Your workspace is up to date.',
    action: { label: 'Undo', onClick: () => actionCount++ },
  });

  await expect.element(page.getByText('Changes saved')).toBeVisible();
  await expect.element(page.getByText('Your workspace is up to date.')).toBeVisible();
  await expect.element(page.getByRole('button', { name: 'Undo', exact: true })).toBeVisible();
  expect(
    Boolean(screen.getByRole('button', { name: 'Close toast' }).querySelector('svg')?.isConnected),
  ).toBe(true);

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

  renderToaster(toaster);

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
  const toaster = createToaster({ placement: 'bottom', duration: Infinity });

  renderToaster(toaster);

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

test('keeps custom composition connected to the Svelte context hook', async () => {
  const toaster = createToaster({ placement: 'bottom', duration: Infinity });

  render(ContextHarness, { props: { toaster } });
  toaster.create({ title: 'Custom toast' });

  await expect.element(page.getByText('Custom toast')).toBeVisible();
  await expect
    .element(page.locator('[data-slot="toast-root"]'))
    .toHaveAttribute('data-part', 'root');

  await page.getByRole('button', { name: 'Dismiss custom toast', exact: true }).click();
  await expect.element(page.getByText('Custom toast')).toHaveCount(0);
});

test('preserves anatomy, attrs, refs, and native asChild hosts', async () => {
  const toaster = createToaster({ placement: 'bottom', duration: Infinity });
  const { component } = render(AnatomyHarness, { props: { toaster } });
  toaster.create({ title: 'Native parts', description: 'Description' });

  const title = await screen.findByText('Native parts');
  const root = title.closest('[data-slot="toast-root"]');
  const description = screen.getByText('Description');
  const action = screen.getByRole('button', { name: 'Undo' });
  const close = screen.getByRole('button', { name: 'Close toast' });
  const composedClose = screen.getByRole('button', { name: 'Custom close' });
  const refs = component.getRefs();
  expect(root?.tagName).toBe('DIV');
  expect(root!.getAttribute('data-slot')).toBe('toast-root');
  expect(root!.getAttribute('data-part')).toBe('root');
  expect(root!.getAttribute('data-probe')).toBe('root');
  expect(refs.rootRef).toBe(root);
  await expect.element(page.getByText('Native parts')).toHaveAttribute('data-slot', 'toast-title');
  expect(refs.titleRef).toBe(title);
  await expect
    .element(page.getByText('Description'))
    .toHaveAttribute('data-slot', 'toast-description');
  expect(refs.descriptionRef).toBe(description);
  await expect
    .element(page.getByRole('button', { name: 'Undo', exact: true }))
    .toHaveAttribute('data-slot', 'toast-action-trigger');
  expect(refs.actionRef).toBe(action);
  await expect
    .element(page.getByRole('button', { name: 'Close toast', exact: true }))
    .toHaveAttribute('data-slot', 'toast-close-trigger');
  expect(refs.closeRef).toBe(close);
  await expect
    .element(page.getByRole('button', { name: 'Custom close', exact: true }))
    .toHaveAttribute('data-slot', 'toast-close-trigger');
  expect(refs.composedCloseRef).toBe(composedClose);
});

test('portals by default, supports inline rendering, and accepts a custom portal target', async () => {
  const portalledToaster = createToaster({ placement: 'bottom', duration: Infinity });
  const portalled = renderToaster(portalledToaster);

  portalledToaster.create({ title: 'Portalled toast' });
  const portalledTitle = await screen.findByText('Portalled toast');
  expect(portalled.container!.contains(portalledTitle)).not.toBe(true);
  portalled.unmount();

  const inlineToaster = createToaster({ placement: 'bottom', duration: Infinity });
  const inline = renderToaster(inlineToaster, false);

  inlineToaster.create({ title: 'Inline toast' });
  const inlineTitle = await screen.findByText('Inline toast');
  expect(inline.container!.contains(inlineTitle)).toBe(true);
  inline.unmount();

  const customToaster = createToaster({ placement: 'bottom', duration: Infinity });
  const portalTarget = document.createElement('div');
  portalTarget.dataset.testid = 'toast-portal';
  document.body.append(portalTarget);

  render(ToasterHarness, {
    props: { toaster: customToaster, portalRef: () => portalTarget },
  });
  customToaster.create({ title: 'Custom portal toast' });

  expect(Boolean((await within(portalTarget).findByText('Custom portal toast'))?.isConnected)).toBe(
    true,
  );
  portalTarget.remove();
});

// Ark Svelte's Portal remounts its content when the container changes, so the toaster host is a
// new element after each move (Vue Teleport moves the same host). The toast content still follows.
test.each([false, true])(
  'moves the toaster content when portal options change reactively (getter=%s)',
  async (getter) => {
    const first = document.createElement('div');
    const second = document.createElement('div');
    document.body.append(first, second);
    const toaster = createToaster({ placement: 'bottom', duration: Infinity });
    const { component, container, unmount } = render(MovingHarness, {
      props: { first, second, getter, toaster },
    });
    toaster.create({ title: 'Moving toast' });
    await within(first).findByText('Moving toast');
    component.setTarget('second');
    await expect.poll(() => second.contains(screen.queryByText('Moving toast'))).toBe(true);
    expect(first.contains(screen.queryByText('Moving toast'))).toBe(false);
    component.setPortalled(false);
    await expect.poll(() => container.contains(screen.queryByText('Moving toast'))).toBe(true);
    component.setPortalled(true);
    await expect.poll(() => second.contains(screen.queryByText('Moving toast'))).toBe(true);
    unmount();
    first.remove();
    second.remove();
  },
);

test.each([false, true])(
  'keeps nested Popover portal independent (toaster portalled=%s)',
  async (portalled) => {
    const target = document.createElement('div');
    document.body.append(target);
    const toaster = createToaster({ placement: 'bottom', duration: Infinity });
    const { container, unmount } = render(PopoverHarness, {
      props: { toaster, portalled, target },
    });
    toaster.create({ title: 'Toast with popover' });
    const title = await screen.findByText('Toast with popover');
    const popover = await screen.findByTestId('nested-popover');
    expect((portalled ? target : container)!.contains(title)).toBe(true);
    expect(target!.contains(popover)).not.toBe(true);
    expect(container!.contains(popover)).not.toBe(true);
    expect(document.body!.contains(popover)).toBe(true);
    unmount();
    target.remove();
  },
);

test.each(
  responsivePlacements.flatMap((placement) =>
    (['ltr', 'rtl'] as const).map((dir) => ({ placement, dir })),
  ),
)(
  'keeps $placement toasts inside the viewport in $dir at the mobile breakpoint',
  async ({ placement, dir }) => {
    const toaster = createToaster({ placement, duration: Infinity, offsets: '24px', gap: 48 });
    const view = render(ToasterHarness, { props: { toaster, dir } });
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