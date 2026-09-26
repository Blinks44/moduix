import { expect, test } from '@rstest/core';
import { fireEvent, render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { Badge, BadgeDot, BadgeLabel } from '../src';

const badgeComponents = { Badge, BadgeDot, BadgeLabel };

test('protects variants, accessibility, and stable data hooks', () => {
  render({
    components: badgeComponents,
    template: `
      <Badge
        variant="secondary"
        data-testid="badge"
        data-scope="custom"
        data-part="custom"
        data-slot="custom"
        data-variant="outline"
      >
        <BadgeDot data-testid="dot" data-part="custom" aria-hidden="false" />
        Draft
      </Badge>
    `,
  });

  const badge = screen.getByTestId('badge');
  const dot = screen.getByTestId('dot');

  expect(badge.tagName).toBe('SPAN');
  expect(badge).toHaveAttribute('data-scope', 'badge');
  expect(badge).toHaveAttribute('data-part', 'root');
  expect(badge).toHaveAttribute('data-slot', 'badge-root');
  expect(badge).toHaveAttribute('data-variant', 'secondary');
  expect(dot).toHaveAttribute('data-part', 'dot');
  expect(dot).toHaveAttribute('data-slot', 'badge-dot');
  expect(dot).toHaveAttribute('aria-hidden', 'true');
});

test('forwards fallthrough attrs, native events, and consumer classes', async () => {
  const state = { clicks: 0 };

  render({
    components: badgeComponents,
    setup() {
      return {
        onClick: () => {
          state.clicks += 1;
        },
      };
    },
    template: `
      <Badge
        id="release-badge"
        data-probe="root"
        class="consumer-class"
        role="status"
        @click="onClick"
      >
        Ready
      </Badge>
    `,
  });

  const badge = screen.getByRole('status');

  expect(badge).toHaveAttribute('id', 'release-badge');
  expect(badge).toHaveAttribute('data-probe', 'root');
  expect(badge).toHaveClass('consumer-class');

  await fireEvent.click(badge);
  expect(state.clicks).toBe(1);
});

test('renders direct text without inserting an implicit label part', () => {
  render({
    components: badgeComponents,
    template: '<Badge data-testid="badge">Ready for stakeholder review</Badge>',
  });

  const badge = screen.getByTestId('badge');

  expect(badge.firstElementChild).toBeNull();
  expect(badge).toHaveTextContent('Ready for stakeholder review');
});

test('exposes component refs through $el for the root and each part', () => {
  const rootRef = ref<ComponentPublicInstance>();
  const dotRef = ref<ComponentPublicInstance>();
  const labelRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
    components: badgeComponents,
    setup() {
      return { rootRef, dotRef, labelRef };
    },
    template: `
      <Badge ref="rootRef">
        <BadgeDot ref="dotRef" />
        <BadgeLabel ref="labelRef">Production ready</BadgeLabel>
      </Badge>
    `,
  });

  render(Harness);

  const root = screen.getByText('Production ready').parentElement;
  const dot = root?.querySelector('[data-part="dot"]');
  const label = screen.getByText('Production ready');

  expect(rootRef.value?.$el).toBe(root);
  expect(dotRef.value?.$el).toBe(dot);
  expect(labelRef.value?.$el).toBe(label);
  expect(label).toHaveAttribute('data-scope', 'badge');
  expect(label).toHaveAttribute('data-part', 'label');
  expect(label).toHaveAttribute('data-slot', 'badge-label');
});

test('preserves semantic asChild hosts and component refs', () => {
  const rootRef = ref<ComponentPublicInstance>();
  const labelRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
    components: badgeComponents,
    setup() {
      return { rootRef, labelRef };
    },
    template: `
      <Badge ref="rootRef" variant="link" as-child>
        <a href="#styling" aria-label="Badge styling guidance">
          <BadgeLabel ref="labelRef" as-child data-part="custom">
            <strong>Open guide</strong>
          </BadgeLabel>
        </a>
      </Badge>
    `,
  });

  render(Harness);

  const link = screen.getByRole('link', { name: 'Badge styling guidance' });
  const label = screen.getByText('Open guide');

  expect(link.tagName).toBe('A');
  expect(link).toHaveAttribute('href', '#styling');
  expect(link).toHaveAttribute('data-slot', 'badge-root');
  expect(link).toHaveAttribute('data-variant', 'link');
  expect(rootRef.value?.$el).toBe(link);
  expect(label.tagName).toBe('STRONG');
  expect(label).toHaveAttribute('data-scope', 'badge');
  expect(label).toHaveAttribute('data-part', 'label');
  expect(label).toHaveAttribute('data-slot', 'badge-label');
  expect(labelRef.value?.$el).toBe(label);
});

test('preserves native disabled button semantics with asChild', () => {
  render({
    components: badgeComponents,
    template: `
      <Badge variant="secondary" as-child>
        <button disabled>Archived</button>
      </Badge>
    `,
  });

  expect(screen.getByRole('button', { name: 'Archived' })).toBeDisabled();
});

test('renders and hydrates the public asChild host on the server', async () => {
  const App = defineComponent({
    components: badgeComponents,
    template: `
      <Badge variant="link" as-child>
        <a href="#styling">Badge styling guidance</a>
      </Badge>
    `,
  });

  const html = await renderToString(createSSRApp(App));

  expect(html).toContain('<a');
  expect(html).toContain('data-slot="badge-root"');
  expect(html).toContain('data-variant="link"');

  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const app = createSSRApp(App);
  app.mount(host);

  expect(host.querySelector('[data-slot="badge-root"]')).toHaveAttribute('href', '#styling');

  app.unmount();
  host.remove();
});