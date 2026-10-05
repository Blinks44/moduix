import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, nextTick, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { Spinner } from '../src';
import TestSpinner from './fixtures/TestSpinner.vue';

test('renders the default status with stable styling hooks', async () => {
  expect(Spinner).not.toHaveProperty('Root');
  render({
    components: { Spinner },
    template: `
      <Spinner
        aria-label="Syncing files"
        data-part="custom"
        data-slot="custom"
        data-scope="custom"
        data-size="custom"
        role="alert"
      />
    `,
  });

  await expect.element(page.getByRole('status', { name: 'Syncing files' })).toHaveCount(1);
  const spinner = screen.getByRole('status', { name: 'Syncing files' });

  expect(spinner.dataset).toMatchObject({
    scope: 'spinner',
    part: 'root',
    slot: 'spinner-root',
    size: 'md',
  });
  expect(
    spinner.querySelector('[data-slot="spinner-indicator"]')?.getAttribute('aria-hidden'),
  ).toBe('true');
  expect(spinner.querySelector('[data-slot="spinner-ring"]')).toBeTruthy();
});

test.each([false, true])(
  'updates accessible names and decorative semantics on the same host (asChild=%s)',
  async (asChild) => {
    const label = ref<string | undefined>('Syncing');
    const labelledBy = ref<string | undefined>();
    const decorative = ref(false);
    render({
      components: { Spinner },
      setup: () => ({ asChild, label, labelledBy, decorative }),
      template: `
      <span id="progress-label">Uploading</span>
      <Spinner :as-child="asChild" :aria-label="label" :aria-labelledby="labelledBy" :decorative="decorative" data-testid="spinner">
        <span v-if="asChild" />
      </Spinner>
    `,
    });
    await expect.element(page.getByRole('status', { name: 'Syncing' })).toHaveCount(1);
    const host = screen.getByRole('status', { name: 'Syncing' });
    label.value = 'Processing';
    await nextTick();
    await expect.element(page.getByRole('status', { name: 'Processing' })).toHaveCount(1);
    label.value = undefined;
    labelledBy.value = 'progress-label';
    await nextTick();
    await expect.element(page.getByRole('status', { name: 'Uploading' })).toHaveCount(1);
    expect(host.hasAttribute('aria-label')).toBe(false);
    decorative.value = true;
    await nextTick();
    expect(host.hasAttribute('aria-label')).toBe(false);
    expect(host.hasAttribute('aria-labelledby')).toBe(false);
    decorative.value = false;
    labelledBy.value = undefined;
    await nextTick();
    expect(screen.getByRole('status', { name: 'Loading' })).toBe(host);
  },
);

test('keeps decorative default spinners out of the accessibility tree', async () => {
  render({
    components: { Spinner },
    template: '<Spinner decorative size="inherit" data-testid="spinner" />',
  });

  await expect.element(page.getByTestId('spinner')).toHaveCount(1);
  const spinner = screen.getByTestId('spinner');

  expect(spinner.getAttribute('data-size')).toBe('inherit');
  expect(spinner.getAttribute('role')).toBe('presentation');
  expect(spinner.getAttribute('aria-hidden')).toBe('true');
});

test('uses an external label instead of the default accessible name', async () => {
  render({
    components: { Spinner },
    template: `
      <span id="spinner-label">Syncing files</span>
      <Spinner aria-labelledby="spinner-label" />
    `,
  });

  await expect.element(page.getByRole('status', { name: 'Syncing files' })).toHaveCount(1);
  const spinner = screen.getByRole('status', { name: 'Syncing files' });

  expect(spinner.getAttribute('aria-labelledby')).toBe('spinner-label');
  expect(spinner.hasAttribute('aria-label')).toBe(false);
});

test('preserves a custom host and its semantics with decorative asChild composition', async () => {
  const spinnerRef = ref<ComponentPublicInstance | null>(null);
  const Harness = {
    components: { Spinner },
    setup() {
      return { spinnerRef };
    },
    template: `
      <Spinner ref="spinnerRef" decorative as-child>
        <button type="button">Refresh</button>
      </Spinner>
    `,
  };

  render(Harness);

  await expect.element(page.getByRole('button', { name: 'Refresh' })).toHaveCount(1);
  const button = screen.getByRole('button', { name: 'Refresh' });

  expect(spinnerRef.value?.$el).toBe(button);
  expect(button.hasAttribute('aria-hidden')).toBe(false);
  expect(button.hasAttribute('role')).toBe(false);
  expect(button.getAttribute('data-slot')).toBe('spinner-root');
});

test('forwards status semantics and the ref to a non-decorative asChild host', async () => {
  const spinnerRef = ref<ComponentPublicInstance | null>(null);
  const Harness = {
    components: { Spinner },
    setup() {
      return { spinnerRef };
    },
    template: `
      <Spinner ref="spinnerRef" as-child size="lg" aria-label="Loading report">
        <span>
          <span data-scope="spinner" data-part="indicator" data-slot="spinner-indicator">
            <span data-scope="spinner" data-part="ring" data-slot="spinner-ring" />
          </span>
        </span>
      </Spinner>
    `,
  };

  render(Harness);

  await expect.element(page.getByRole('status', { name: 'Loading report' })).toHaveCount(1);
  const spinner = screen.getByRole('status', { name: 'Loading report' });

  expect(spinnerRef.value?.$el).toBe(spinner);
  expect(spinner.dataset).toMatchObject({
    size: 'lg',
    slot: 'spinner-root',
  });
});

test('keeps custom indicator content inside the hidden rotating wrapper', async () => {
  render({
    components: { Spinner },
    template: `
      <Spinner aria-label="Syncing">
        <svg aria-hidden="true" data-testid="custom-indicator" />
      </Spinner>
    `,
  });

  await expect.element(page.getByRole('status', { name: 'Syncing' })).toHaveCount(1);
  const spinner = screen.getByRole('status', { name: 'Syncing' });

  expect(spinner.querySelector('[data-slot="spinner-ring"]')).toBeNull();
  expect(screen.getByTestId('custom-indicator').parentElement?.getAttribute('data-slot')).toBe(
    'spinner-indicator',
  );
});

test('hydrates spinner without replacing the server host', async () => {
  const host = document.createElement('div');
  host.innerHTML = await renderToString(createSSRApp(TestSpinner));
  document.body.append(host);
  const serverRoot = host.querySelector<HTMLElement>('[data-slot="spinner-root"]')!;
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  const app = createSSRApp(TestSpinner);
  try {
    app.mount(host);
    await expect
      .element(page.getByRole('status', { name: 'Loading report' }))
      .toHaveAttribute('data-slot', 'spinner-root');
    expect(host.querySelectorAll('[data-testid="spinner-host"]')).toHaveLength(1);
    expect(host.querySelector('[data-testid="spinner-host"]')).toBe(serverRoot);
    expect(warn).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
  } finally {
    app.unmount();
    host.remove();
    warn.mockRestore();
    error.mockRestore();
  }
});