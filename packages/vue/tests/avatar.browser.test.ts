import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import {
  Avatar,
  AvatarContext,
  AvatarFallback,
  AvatarImage,
  AvatarRootProvider,
  useAvatar,
  useAvatarContext,
} from '../src';
import SsrAvatar from './fixtures/SsrAvatar.vue';

const imageUrl = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"/>')}`;

const avatarComponents = {
  Avatar,
  AvatarContext,
  AvatarFallback,
  AvatarImage,
  AvatarRootProvider,
};

test('preserves Ark anatomy, attrs, consumer classes, size, and Vue refs', () => {
  const rootRef = ref<ComponentPublicInstance | null>(null);
  const fallbackRef = ref<ComponentPublicInstance | null>(null);
  const imageRef = ref<ComponentPublicInstance | null>(null);
  render({
    components: avatarComponents,
    setup() {
      return { fallbackRef, imageRef, rootRef };
    },
    template:
      '<Avatar ref="rootRef" size="lg" id="profile" aria-label="Alex T." data-probe="root" class="consumer-root"><AvatarFallback ref="fallbackRef" class="consumer-fallback">AT</AvatarFallback><AvatarImage ref="imageRef" alt="Alex T." class="consumer-image" /></Avatar>',
  });

  const root = rootRef.value?.$el as HTMLElement;
  const fallback = screen.getByText('AT').closest('[data-part="fallback"]') as HTMLElement;
  const image = screen.getByAltText('Alex T.') as HTMLImageElement;

  expect(root.getAttribute('data-slot')).toBe('avatar-root');
  expect(root.getAttribute('data-scope')).toBe('avatar');
  expect(root.getAttribute('data-part')).toBe('root');
  expect(root.getAttribute('id')).toBe('avatar:profile');
  expect(root.getAttribute('aria-label')).toBe('Alex T.');
  expect(root.getAttribute('data-probe')).toBe('root');
  expect(root.getAttribute('data-size')).toBe('lg');
  expect(root.className.endsWith('consumer-root')).toBe(true);
  expect(fallback.getAttribute('data-slot')).toBe('avatar-fallback');
  expect(fallback.getAttribute('data-state')).toBe('visible');
  expect(fallback.className.endsWith('consumer-fallback')).toBe(true);
  expect(image.getAttribute('data-slot')).toBe('avatar-image');
  expect(image.getAttribute('data-state')).toBe('hidden');
  expect(image.className.endsWith('consumer-image')).toBe(true);
  expect(fallbackRef.value?.$el).toBe(fallback);
  expect(imageRef.value?.$el).toBe(image);
});

test('keeps image status, fallback, scoped slots, and context reactive after real loading', async () => {
  const src = ref<string>();
  const onStatusChange = rs.fn();
  const HookState = defineComponent({
    setup: () => ({ avatar: useAvatarContext() }),
    template: '<output>Hook: {{ avatar.loaded ? "loaded" : "loading" }}</output>',
  });
  render({
    components: { ...avatarComponents, HookState },
    setup: () => ({ src, onStatusChange }),
    template: `
      <Avatar @status-change="onStatusChange">
        <AvatarContext v-slot="context"><output>Slot: {{ context.loaded ? "loaded" : "loading" }}</output></AvatarContext>
        <HookState />
        <AvatarFallback>AT</AvatarFallback>
        <AvatarImage :src="src" alt="Alex T." />
      </Avatar>
    `,
  });
  const image = page.getByAltText('Alex T.');
  const fallback = page.locator('[data-part="fallback"]');
  await expect.element(image).toHaveAttribute('data-state', 'hidden');
  await expect.element(fallback).toHaveAttribute('data-state', 'visible');
  await expect.element(page.getByText('Slot: loading')).toBeVisible();
  await expect.element(page.getByText('Hook: loading')).toBeVisible();

  src.value = imageUrl;
  await expect.element(image).toHaveAttribute('data-state', 'visible');
  await expect.element(fallback).toHaveAttribute('data-state', 'hidden');
  await expect.element(page.getByText('Slot: loaded')).toBeVisible();
  await expect.element(page.getByText('Hook: loaded')).toBeVisible();
  await expect
    .poll(() => onStatusChange.mock.calls.filter(([details]) => details.status === 'loaded'))
    .toEqual([[{ status: 'loaded' }]]);
  expect((screen.getByAltText('Alex T.') as HTMLImageElement).naturalWidth).toBe(64);
});
test('keeps the fallback visible when a real image fails', async () => {
  const onStatusChange = rs.fn();
  render({
    components: avatarComponents,
    setup: () => ({ onStatusChange }),
    template:
      '<Avatar @status-change="onStatusChange"><AvatarFallback>AT</AvatarFallback><AvatarImage src="data:image/png;base64,invalid" alt="Alex T." /></Avatar>',
  });
  await expect.poll(() => onStatusChange.mock.calls.at(-1)).toEqual([{ status: 'error' }]);
  await expect
    .element(page.locator('[data-part="fallback"]'))
    .toHaveAttribute('data-state', 'visible');
  await expect.element(page.getByAltText('Alex T.')).toHaveAttribute('data-state', 'hidden');
});
test('connects useAvatar state through AvatarRootProvider', () => {
  const rootRef = ref<ComponentPublicInstance | null>(null);
  render({
    components: avatarComponents,
    setup() {
      return { avatar: useAvatar(), rootRef };
    },
    template:
      '<AvatarRootProvider ref="rootRef" :value="avatar" size="sm" class="consumer-provider"><AvatarFallback>AT</AvatarFallback><AvatarImage alt="Alex T." /></AvatarRootProvider>',
  });
  const root = rootRef.value?.$el as HTMLElement;

  expect(root.getAttribute('data-slot')).toBe('avatar-root-provider');
  expect(root.getAttribute('data-scope')).toBe('avatar');
  expect(root.getAttribute('data-size')).toBe('sm');
  expect(root.className.endsWith('consumer-provider')).toBe(true);
  expect(screen.getByAltText('Alex T.')?.isConnected).toBe(true);
});

test('preserves root and fallback asChild hosts and refs', () => {
  const rootRef = ref<ComponentPublicInstance | null>(null);
  const fallbackRef = ref<ComponentPublicInstance | null>(null);
  render({
    components: avatarComponents,
    setup() {
      return { fallbackRef, rootRef };
    },
    template:
      '<Avatar ref="rootRef" as-child size="xl" id="avatar-link"><a href="/profile" aria-label="Alex T."><AvatarFallback ref="fallbackRef" as-child><span>AT</span></AvatarFallback></a></Avatar>',
  });
  const root = screen.getByRole('link', { name: 'Alex T.' });
  const fallback = screen.getByText('AT');

  expect(root.tagName).toBe('A');
  expect(root.getAttribute('data-slot')).toBe('avatar-root');
  expect(root.getAttribute('id')).toBe('avatar:avatar-link');
  expect(rootRef.value?.$el).toBe(root);
  expect(fallback.tagName).toBe('SPAN');
  expect(fallback.getAttribute('data-slot')).toBe('avatar-fallback');
  expect(fallbackRef.value?.$el).toBe(fallback);
});

// TODO: Re-enable after Ark UI Vue forwards the default slot for AvatarImage with asChild.
test.skip('forwards the replacement image slot to Ark asChild', async () => {
  const imageRef = ref<ComponentPublicInstance | null>(null);
  const statuses: string[] = [];
  const src = ref<string>();
  render({
    components: avatarComponents,
    setup() {
      return {
        handleStatusChange: (details: { status: string }) => statuses.push(details.status),
        imageRef,
        src,
      };
    },
    template:
      '<Avatar @status-change="handleStatusChange"><AvatarFallback>AT</AvatarFallback><AvatarImage ref="imageRef" :src="src" as-child alt="Alex T." class="consumer-image"><img data-replacement="image" /></AvatarImage></Avatar>',
  });
  const image = screen.getByAltText('Alex T.') as HTMLImageElement;

  expect(image.getAttribute('data-replacement')).toBe('image');
  expect(image.getAttribute('data-slot')).toBe('avatar-image');
  expect(image.getAttribute('data-part')).toBe('image');
  expect(image.getAttribute('data-state')).toBe('hidden');
  expect(image.className.endsWith('consumer-image')).toBe(true);
  expect(imageRef.value?.$el).toBe(image);

  src.value = imageUrl;

  await expect.element(page.getByAltText('Alex T.')).toHaveAttribute('data-state', 'visible');
  expect(screen.getByText('AT').closest('[data-part="fallback"]')?.getAttribute('data-state')).toBe(
    'hidden',
  );
  expect(statuses.filter((status) => status === 'loaded')).toEqual(['loaded']);
});

test('hydrates avatar fallback without replacing hosts or IDs', async () => {
  const host = document.createElement('div');
  host.innerHTML = await renderToString(createSSRApp(SsrAvatar));
  document.body.append(host);
  const nodes = [...host.querySelectorAll('[data-slot]')];
  const ids = [...host.querySelectorAll('[id]')].map((node) => node.id);
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  const app = createSSRApp(SsrAvatar);
  try {
    app.mount(host);
    expect(host.querySelectorAll('[data-slot="avatar-root"]')).toHaveLength(1);
    const hydrated = [...host.querySelectorAll('[data-slot]')];
    expect(hydrated).toHaveLength(nodes.length);
    hydrated.forEach((node, index) => expect(node).toBe(nodes[index]));
    expect([...host.querySelectorAll('[id]')].map((node) => node.id)).toEqual(ids);
    expect(host.querySelector('[data-slot="avatar-fallback"]')?.getAttribute('data-state')).toBe(
      'visible',
    );
    expect(host.querySelector('[data-slot="avatar-image"]')?.getAttribute('alt')).toBe('Alex T.');
    expect(warn).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
  } finally {
    app.unmount();
    host.remove();
    warn.mockRestore();
    error.mockRestore();
  }
});