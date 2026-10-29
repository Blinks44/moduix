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
} from '@/index';
import TestAlert from './fixtures/TestAlert.vue';

const alertComponents = {
  Alert,
  AlertActions,
  AlertContent,
  AlertDescription,
  AlertIndicator,
  AlertTitle,
};

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

test('does not add a live-region role by default', async () => {
  render({
    components: alertComponents,
    template: `
      <Alert status="error" data-testid="plain-alert">
        <AlertContent>
          <AlertTitle>Payment failed</AlertTitle>
        </AlertContent>
      </Alert>
    `,
  });

  await expect.element(page.getByTestId('plain-alert')).toHaveAttribute('data-status', 'error');
  expect(screen.getByTestId('plain-alert').hasAttribute('role')).toBe(false);
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