import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { Badge, BadgeDot, BadgeLabel } from '../src';
import TestBadge from './fixtures/TestBadge.vue';

const badgeComponents = { Badge, BadgeDot, BadgeLabel };

test('protects variants, accessibility, and stable data hooks', async () => {
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

  await expect.element(page.getByTestId('badge')).toHaveCount(1);
  const badge = screen.getByTestId('badge');
  const dot = screen.getByTestId('dot');

  expect(badge.tagName).toBe('SPAN');
  expect(badge.getAttribute('data-scope')).toBe('badge');
  expect(badge.getAttribute('data-part')).toBe('root');
  expect(badge.getAttribute('data-slot')).toBe('badge-root');
  expect(badge.getAttribute('data-variant')).toBe('secondary');
  expect(dot.getAttribute('data-part')).toBe('dot');
  expect(dot.getAttribute('data-slot')).toBe('badge-dot');
  expect(dot.getAttribute('aria-hidden')).toBe('true');
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
        Ready for stakeholder review
      </Badge>
    `,
  });

  await expect.element(page.getByRole('status')).toHaveCount(1);
  const badge = screen.getByRole('status');

  expect(badge.getAttribute('id')).toBe('release-badge');
  expect(badge.getAttribute('data-probe')).toBe('root');
  expect(badge.classList.contains('consumer-class')).toBe(true);

  expect(badge.firstElementChild).toBeNull();
  expect(badge.textContent).toContain('Ready for stakeholder review');
  await page.getByRole('status').click();
  expect(state.clicks).toBe(1);
});

test('exposes component refs through $el for the root and each part', async () => {
  const rootRef = ref<ComponentPublicInstance>();
  const dotRef = ref<ComponentPublicInstance>();
  const labelRef = ref<ComponentPublicInstance>();
  const Harness = {
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
  };

  render(Harness);

  await expect.element(page.getByText('Production ready')).toHaveCount(1);
  const root = screen.getByText('Production ready').parentElement!;
  const dot = root.querySelector('[data-part="dot"]');
  const label = screen.getByText('Production ready');

  expect(rootRef.value?.$el).toBe(root);
  expect(dotRef.value?.$el).toBe(dot);
  expect(labelRef.value?.$el).toBe(label);
  expect(label.dataset).toMatchObject({
    scope: 'badge',
    part: 'label',
    slot: 'badge-label',
  });
});

test('preserves semantic asChild hosts and component refs', async () => {
  const rootRef = ref<ComponentPublicInstance>();
  const labelRef = ref<ComponentPublicInstance>();
  const Harness = {
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
  };

  render(Harness);

  await expect.element(page.getByRole('link', { name: 'Badge styling guidance' })).toHaveCount(1);
  const link = screen.getByRole('link', { name: 'Badge styling guidance' });
  const label = screen.getByText('Open guide');

  expect(link.tagName).toBe('A');
  expect(link.getAttribute('href')).toBe('#styling');
  expect(link.dataset).toMatchObject({
    slot: 'badge-root',
    variant: 'link',
  });
  expect(rootRef.value?.$el).toBe(link);
  expect(label.tagName).toBe('STRONG');
  expect(label.dataset).toMatchObject({
    scope: 'badge',
    part: 'label',
    slot: 'badge-label',
  });
  expect(labelRef.value?.$el).toBe(label);
});

test('preserves native disabled button semantics with asChild', async () => {
  render({
    components: badgeComponents,
    template: `
      <Badge variant="secondary" as-child>
        <button disabled>Archived</button>
      </Badge>
    `,
  });

  await expect.element(page.getByRole('button', { name: 'Archived' })).toBeDisabled();
});

test('hydrates badge without replacing the server host', async () => {
  const host = document.createElement('div');
  host.innerHTML = await renderToString(createSSRApp(TestBadge));
  document.body.append(host);
  const serverRoot = host.querySelector<HTMLElement>('[data-slot="badge-root"]')!;
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  const app = createSSRApp(TestBadge);
  try {
    app.mount(host);
    await expect
      .element(page.getByRole('link', { name: 'Badge styling guidance' }))
      .toHaveAttribute('href', '#styling');
    expect(host.querySelector('a')).toBe(serverRoot);
    expect(warn).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
  } finally {
    app.unmount();
    host.remove();
    warn.mockRestore();
    error.mockRestore();
  }
});