import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import {
  Alert,
  AlertActions,
  AlertContent,
  AlertDescription,
  AlertIndicator,
  AlertTitle,
} from '../src';
import TestAlert from './fixtures/TestAlert.vue';

const alertComponents = {
  Alert,
  AlertActions,
  AlertContent,
  AlertDescription,
  AlertIndicator,
  AlertTitle,
};

test('applies status semantics and stable data hooks', async () => {
  const { container } = render({
    components: alertComponents,
    template: `
      <div>
        <Alert id="storage-alert" data-probe="root" class="consumer-class" role="status">
          <AlertContent>
            <AlertTitle>Update available</AlertTitle>
            <AlertDescription>Install the latest version.</AlertDescription>
          </AlertContent>
        </Alert>
        <Alert status="error" role="alert">
          <AlertIndicator>!</AlertIndicator>
          <AlertContent>
            <AlertTitle>Payment failed</AlertTitle>
          </AlertContent>
        </Alert>
      </div>
    `,
  });

  await expect.element(page.getByRole('status')).toHaveCount(1);
  const statusAlert = screen.getByRole('status');
  const errorAlert = screen.getByRole('alert');
  expect(statusAlert.id).toBe('storage-alert');
  expect(statusAlert.getAttribute('data-probe')).toBe('root');
  expect(statusAlert.classList.contains('consumer-class')).toBe(true);

  expect(statusAlert.dataset).toMatchObject({
    scope: 'alert',
    part: 'root',
    slot: 'alert-root',
    status: 'info',
  });
  expect(statusAlert.classList.contains('border-border')).toBe(true);
  expect(errorAlert.getAttribute('data-status')).toBe('error');
  expect(errorAlert.classList.contains('border-destructive/35')).toBe(true);
  expect(errorAlert.classList.contains('border-border')).toBe(false);
  expect(container.querySelector('[data-part="indicator"]')?.getAttribute('aria-hidden')).toBe(
    'true',
  );
  await expect.element(page.getByRole('status')).toHaveCSS('display', 'flex');
  await expect.element(page.getByRole('alert')).toHaveCSS('border-top-width', '1px');
  expect(getComputedStyle(errorAlert).borderTopColor).not.toBe(
    getComputedStyle(statusAlert).borderTopColor,
  );
});

test('preserves semantic children and refs with asChild', async () => {
  const rootRef = ref<ComponentPublicInstance>();
  const titleRef = ref<ComponentPublicInstance>();
  const Harness = {
    components: alertComponents,
    setup() {
      return { rootRef, titleRef };
    },
    template: `
      <Alert ref="rootRef" as-child role="status">
        <section aria-label="Release notes">
          <AlertContent>
            <AlertTitle ref="titleRef" as-child>
              <h2>Update available</h2>
            </AlertTitle>
          </AlertContent>
        </section>
      </Alert>
    `,
  };

  render(Harness);

  await expect.element(page.getByRole('status', { name: 'Release notes' })).toHaveCount(1);
  const root = screen.getByRole('status', { name: 'Release notes' });
  const title = screen.getByRole('heading', { name: 'Update available', level: 2 });

  expect(root.tagName).toBe('SECTION');
  expect(rootRef.value?.$el).toBe(root);
  expect(titleRef.value?.$el).toBe(title);
  expect(title.getAttribute('data-part')).toBe('title');
});

test('forwards refs and data hooks for every optional part', async () => {
  const rootRef = ref<ComponentPublicInstance>();
  const indicatorRef = ref<ComponentPublicInstance>();
  const contentRef = ref<ComponentPublicInstance>();
  const descriptionRef = ref<ComponentPublicInstance>();
  const actionsRef = ref<ComponentPublicInstance>();
  const Harness = {
    components: alertComponents,
    setup() {
      return { rootRef, indicatorRef, contentRef, descriptionRef, actionsRef };
    },
    template: `
      <Alert ref="rootRef" role="note">
        <AlertIndicator ref="indicatorRef" aria-hidden="false">i</AlertIndicator>
        <AlertContent ref="contentRef">
          <AlertDescription ref="descriptionRef">Scheduled maintenance</AlertDescription>
          <AlertActions ref="actionsRef">No action required</AlertActions>
        </AlertContent>
      </Alert>
    `,
  };

  render(Harness);

  await expect.element(page.getByRole('note')).toHaveCount(1);
  const root = screen.getByRole('note');

  expect(rootRef.value?.$el).toBe(root);
  expect(root.getAttribute('data-status')).toBe('info');
  expect(indicatorRef.value?.$el?.getAttribute('data-slot')).toBe('alert-indicator');
  expect(indicatorRef.value?.$el?.getAttribute('aria-hidden')).toBe('false');
  expect(contentRef.value?.$el?.getAttribute('data-slot')).toBe('alert-content');
  expect(descriptionRef.value?.$el?.getAttribute('data-slot')).toBe('alert-description');
  expect(actionsRef.value?.$el?.getAttribute('data-slot')).toBe('alert-actions');
});

test('lets consumer utilities override default classes', async () => {
  render({
    components: alertComponents,
    template: `<Alert class="w-auto" role="status" />`,
  });

  await expect.element(page.getByRole('status')).toHaveCount(1);
  const root = screen.getByRole('status');

  expect(root.classList.contains('w-auto')).toBe(true);
  expect(root.classList.contains('w-full')).toBe(false);
});

test('hydrates alert without replacing the server host', async () => {
  const host = document.createElement('div');
  host.innerHTML = await renderToString(createSSRApp(TestAlert));
  document.body.append(host);
  const serverRoot = host.querySelector<HTMLElement>('[data-slot="alert-root"]')!;
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  const app = createSSRApp(TestAlert);
  try {
    app.mount(host);
    await expect
      .element(page.getByRole('status'))
      .toHaveText('Update availableInstall the latest version.');
    expect(host.querySelector('[data-slot="alert-root"]')).toBe(serverRoot);
    expect(warn).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
  } finally {
    app.unmount();
    host.remove();
    warn.mockRestore();
    error.mockRestore();
  }
});