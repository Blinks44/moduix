import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import {
  Alert,
  AlertActions,
  AlertContent,
  AlertDescription,
  AlertIndicator,
  AlertTitle,
} from '../src';

const alertComponents = {
  Alert,
  AlertActions,
  AlertContent,
  AlertDescription,
  AlertIndicator,
  AlertTitle,
};

test('applies status semantics and stable data hooks', () => {
  const { container } = render({
    components: alertComponents,
    template: `
      <div>
        <Alert role="status">
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

  const statusAlert = screen.getByRole('status');
  const errorAlert = screen.getByRole('alert');

  expect(statusAlert).toHaveAttribute('data-scope', 'alert');
  expect(statusAlert).toHaveAttribute('data-part', 'root');
  expect(statusAlert).toHaveAttribute('data-slot', 'alert-root');
  expect(statusAlert).toHaveAttribute('data-status', 'info');
  expect(statusAlert).toHaveClass('border-border');
  expect(errorAlert).toHaveAttribute('data-status', 'error');
  expect(errorAlert).toHaveClass('border-destructive/35');
  expect(errorAlert).not.toHaveClass('border-border');
  expect(container.querySelector('[data-part="indicator"]')).toHaveAttribute('aria-hidden', 'true');
});

test('forwards fallthrough attrs and merges consumer classes', () => {
  render({
    components: alertComponents,
    template: `
      <Alert id="storage-alert" data-probe="root" class="consumer-class" role="status">
        <AlertContent><AlertTitle>Update available</AlertTitle></AlertContent>
      </Alert>
    `,
  });

  const root = screen.getByRole('status');

  expect(root).toHaveAttribute('id', 'storage-alert');
  expect(root).toHaveAttribute('data-probe', 'root');
  expect(root).toHaveClass('consumer-class');
});

test('preserves semantic children and refs with asChild', () => {
  const rootRef = ref<ComponentPublicInstance>();
  const titleRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
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
  });

  render(Harness);

  const root = screen.getByRole('status', { name: 'Release notes' });
  const title = screen.getByRole('heading', { name: 'Update available', level: 2 });

  expect(root.tagName).toBe('SECTION');
  expect(rootRef.value?.$el).toBe(root);
  expect(titleRef.value?.$el).toBe(title);
  expect(title).toHaveAttribute('data-part', 'title');
});

test('forwards refs and data hooks for every optional part', () => {
  const rootRef = ref<ComponentPublicInstance>();
  const indicatorRef = ref<ComponentPublicInstance>();
  const contentRef = ref<ComponentPublicInstance>();
  const descriptionRef = ref<ComponentPublicInstance>();
  const actionsRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
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
  });

  render(Harness);

  const root = screen.getByRole('note');

  expect(rootRef.value?.$el).toBe(root);
  expect(root).toHaveAttribute('data-status', 'info');
  expect(indicatorRef.value?.$el).toHaveAttribute('data-slot', 'alert-indicator');
  expect(indicatorRef.value?.$el).toHaveAttribute('aria-hidden', 'false');
  expect(contentRef.value?.$el).toHaveAttribute('data-slot', 'alert-content');
  expect(descriptionRef.value?.$el).toHaveAttribute('data-slot', 'alert-description');
  expect(actionsRef.value?.$el).toHaveAttribute('data-slot', 'alert-actions');
});

test('lets consumer utilities override default classes', () => {
  render({
    components: alertComponents,
    template: `<Alert class="w-auto" role="status" />`,
  });

  const root = screen.getByRole('status');

  expect(root).toHaveClass('w-auto');
  expect(root).not.toHaveClass('w-full');
});

test('renders the public anatomy on the server', async () => {
  const App = defineComponent({
    components: alertComponents,
    template: `
      <Alert role="status">
        <AlertContent>
          <AlertTitle>Update available</AlertTitle>
          <AlertDescription>Install the latest version.</AlertDescription>
        </AlertContent>
      </Alert>
    `,
  });

  const html = await renderToString(createSSRApp(App));
  expect(html).toContain('data-slot="alert-root"');
  expect(html).toContain('data-slot="alert-content"');
  expect(html).toContain('data-slot="alert-title"');
  expect(html).toContain('role="status"');

  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const app = createSSRApp(App);
  app.mount(host);
  expect(host.querySelector('[data-slot="alert-root"]')).toBeInTheDocument();
  app.unmount();
  host.remove();
});