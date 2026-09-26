import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { Spinner } from '../src';

test('exposes only the flat root value', () => {
  expect(Spinner).not.toHaveProperty('Root');
});

test('renders the default status with stable styling hooks', () => {
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

  const spinner = screen.getByRole('status', { name: 'Syncing files' });

  expect(spinner).toHaveAttribute('data-scope', 'spinner');
  expect(spinner).toHaveAttribute('data-part', 'root');
  expect(spinner).toHaveAttribute('data-slot', 'spinner-root');
  expect(spinner).toHaveAttribute('data-size', 'md');
  expect(spinner.querySelector('[data-slot="spinner-indicator"]')).toHaveAttribute(
    'aria-hidden',
    'true',
  );
  expect(spinner.querySelector('[data-slot="spinner-ring"]')).toBeTruthy();
});

test('uses the inherited font size when requested', () => {
  render({
    components: { Spinner },
    template: '<Spinner decorative size="inherit" data-testid="spinner" />',
  });

  expect(screen.getByTestId('spinner')).toHaveAttribute('data-size', 'inherit');
});

test('keeps decorative default spinners out of the accessibility tree', () => {
  render({
    components: { Spinner },
    template: '<Spinner decorative data-testid="spinner" />',
  });

  const spinner = screen.getByTestId('spinner');

  expect(spinner).toHaveAttribute('role', 'presentation');
  expect(spinner).toHaveAttribute('aria-hidden', 'true');
});

test('uses an external label instead of the default accessible name', () => {
  render({
    components: { Spinner },
    template: `
      <span id="spinner-label">Syncing files</span>
      <Spinner aria-labelledby="spinner-label" />
    `,
  });

  const spinner = screen.getByRole('status', { name: 'Syncing files' });

  expect(spinner).toHaveAttribute('aria-labelledby', 'spinner-label');
  expect(spinner).not.toHaveAttribute('aria-label');
});

test('preserves a custom host and its semantics with decorative asChild composition', () => {
  const spinnerRef = ref<ComponentPublicInstance | null>(null);
  const Harness = defineComponent({
    components: { Spinner },
    setup() {
      return { spinnerRef };
    },
    template: `
      <Spinner ref="spinnerRef" decorative as-child>
        <button type="button">Refresh</button>
      </Spinner>
    `,
  });

  render(Harness);

  const button = screen.getByRole('button', { name: 'Refresh' });

  expect(spinnerRef.value?.$el).toBe(button);
  expect(button).not.toHaveAttribute('aria-hidden');
  expect(button).not.toHaveAttribute('role');
  expect(button).toHaveAttribute('data-slot', 'spinner-root');
});

test('forwards status semantics and the ref to a non-decorative asChild host', () => {
  const spinnerRef = ref<ComponentPublicInstance | null>(null);
  const Harness = defineComponent({
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
  });

  render(Harness);

  const spinner = screen.getByRole('status', { name: 'Loading report' });

  expect(spinnerRef.value?.$el).toBe(spinner);
  expect(spinner).toHaveAttribute('data-size', 'lg');
  expect(spinner).toHaveAttribute('data-slot', 'spinner-root');
});

test('keeps custom indicator content inside the hidden rotating wrapper', () => {
  render({
    components: { Spinner },
    template: `
      <Spinner aria-label="Syncing">
        <svg aria-hidden="true" data-testid="custom-indicator" />
      </Spinner>
    `,
  });

  const spinner = screen.getByRole('status', { name: 'Syncing' });

  expect(spinner.querySelector('[data-slot="spinner-ring"]')).toBeNull();
  expect(screen.getByTestId('custom-indicator').parentElement).toHaveAttribute(
    'data-slot',
    'spinner-indicator',
  );
});

test('renders and hydrates an asChild host without changing its semantics', async () => {
  const App = defineComponent({
    components: { Spinner },
    template: `
      <Spinner as-child size="lg" aria-label="Loading report">
        <span data-testid="spinner-host">Loading report</span>
      </Spinner>
    `,
  });

  const html = await renderToString(createSSRApp(App));

  expect(html).toContain('<span');
  expect(html).toContain('data-slot="spinner-root"');

  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const app = createSSRApp(App);
  app.mount(host);

  expect(host.querySelectorAll('[data-testid="spinner-host"]')).toHaveLength(1);
  expect(host.querySelector('[data-testid="spinner-host"]')).toHaveAttribute(
    'data-slot',
    'spinner-root',
  );

  app.unmount();
  host.remove();
});