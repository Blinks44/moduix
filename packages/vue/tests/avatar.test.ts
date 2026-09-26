import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/vue';
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
  const Harness = defineComponent({
    components: avatarComponents,
    setup() {
      return { fallbackRef, imageRef, rootRef };
    },
    template:
      '<Avatar ref="rootRef" size="lg" id="profile" aria-label="Alex T." data-probe="root" class="consumer-root"><AvatarFallback ref="fallbackRef" class="consumer-fallback">AT</AvatarFallback><AvatarImage ref="imageRef" src="/avatar.png" alt="Alex T." class="consumer-image" /></Avatar>',
  });

  render(Harness);

  const root = rootRef.value?.$el as HTMLElement;
  const fallback = screen.getByText('AT').closest('[data-part="fallback"]') as HTMLElement;
  const image = screen.getByAltText('Alex T.') as HTMLImageElement;

  expect(root).toHaveAttribute('data-slot', 'avatar-root');
  expect(root).toHaveAttribute('data-scope', 'avatar');
  expect(root).toHaveAttribute('data-part', 'root');
  expect(root).toHaveAttribute('id', 'avatar:profile');
  expect(root).toHaveAttribute('aria-label', 'Alex T.');
  expect(root).toHaveAttribute('data-probe', 'root');
  expect(root).toHaveAttribute('data-size', 'lg');
  expect(root.className.endsWith('consumer-root')).toBe(true);
  expect(fallback).toHaveAttribute('data-slot', 'avatar-fallback');
  expect(fallback).toHaveAttribute('data-state', 'visible');
  expect(fallback.className.endsWith('consumer-fallback')).toBe(true);
  expect(image).toHaveAttribute('data-slot', 'avatar-image');
  expect(image).toHaveAttribute('data-state', 'hidden');
  expect(image.className.endsWith('consumer-image')).toBe(true);
  expect(fallbackRef.value?.$el).toBe(fallback);
  expect(imageRef.value?.$el).toBe(image);
});

test('updates fallback and image visibility and emits Ark status details once', async () => {
  const statuses: string[] = [];
  const Harness = defineComponent({
    components: avatarComponents,
    setup() {
      return {
        handleStatusChange: (details: { status: string }) => statuses.push(details.status),
      };
    },
    template:
      '<Avatar @status-change="handleStatusChange"><AvatarFallback>AT</AvatarFallback><AvatarImage alt="Alex T." /></Avatar>',
  });

  render(Harness);
  const fallback = screen.getByText('AT').closest('[data-part="fallback"]') as HTMLElement;
  const image = screen.getByAltText('Alex T.') as HTMLImageElement;

  await fireEvent.load(image);

  await waitFor(() => expect(image).toHaveAttribute('data-state', 'visible'));
  expect(fallback).toHaveAttribute('data-state', 'hidden');
  expect(statuses.filter((status) => status === 'loaded')).toEqual(['loaded']);
});

test('keeps scoped AvatarContext slots and useAvatarContext reactive', async () => {
  const HookState = defineComponent({
    setup() {
      return { avatar: useAvatarContext() };
    },
    template: '<output>Hook: {{ avatar.loaded ? "loaded" : "loading" }}</output>',
  });
  const Harness = defineComponent({
    components: { ...avatarComponents, HookState },
    template:
      '<Avatar><AvatarContext v-slot="context"><output>Slot: {{ context.loaded ? "loaded" : "loading" }}</output></AvatarContext><HookState /><AvatarFallback>AT</AvatarFallback><AvatarImage src="/avatar.png" alt="Alex T." /></Avatar>',
  });

  render(Harness);
  expect(screen.getByText('Slot: loading')).toBeInTheDocument();
  expect(screen.getByText('Hook: loading')).toBeInTheDocument();

  await fireEvent.load(screen.getByAltText('Alex T.'));

  await waitFor(() => expect(screen.getByText('Slot: loaded')).toBeInTheDocument());
  expect(screen.getByText('Hook: loaded')).toBeInTheDocument();
});

test('connects useAvatar state through AvatarRootProvider', () => {
  const rootRef = ref<ComponentPublicInstance | null>(null);
  const Harness = defineComponent({
    components: avatarComponents,
    setup() {
      return { avatar: useAvatar(), rootRef };
    },
    template:
      '<AvatarRootProvider ref="rootRef" :value="avatar" size="sm" class="consumer-provider"><AvatarFallback>AT</AvatarFallback><AvatarImage src="/avatar.png" alt="Alex T." /></AvatarRootProvider>',
  });

  render(Harness);
  const root = rootRef.value?.$el as HTMLElement;

  expect(root).toHaveAttribute('data-slot', 'avatar-root-provider');
  expect(root).toHaveAttribute('data-scope', 'avatar');
  expect(root).toHaveAttribute('data-size', 'sm');
  expect(root.className.endsWith('consumer-provider')).toBe(true);
  expect(screen.getByAltText('Alex T.')).toBeInTheDocument();
});

test('preserves root and fallback asChild hosts and refs', () => {
  const rootRef = ref<ComponentPublicInstance | null>(null);
  const fallbackRef = ref<ComponentPublicInstance | null>(null);
  const Harness = defineComponent({
    components: avatarComponents,
    setup() {
      return { fallbackRef, rootRef };
    },
    template:
      '<Avatar ref="rootRef" as-child size="xl" id="avatar-link"><a href="/profile" aria-label="Alex T."><AvatarFallback ref="fallbackRef" as-child><span>AT</span></AvatarFallback></a></Avatar>',
  });

  render(Harness);
  const root = screen.getByRole('link', { name: 'Alex T.' });
  const fallback = screen.getByText('AT');

  expect(root.tagName).toBe('A');
  expect(root).toHaveAttribute('data-slot', 'avatar-root');
  expect(root).toHaveAttribute('id', 'avatar:avatar-link');
  expect(rootRef.value?.$el).toBe(root);
  expect(fallback.tagName).toBe('SPAN');
  expect(fallback).toHaveAttribute('data-slot', 'avatar-fallback');
  expect(fallbackRef.value?.$el).toBe(fallback);
});

// TODO: Re-enable after Ark UI Vue forwards the default slot for AvatarImage with asChild.
test.skip('forwards the replacement image slot to Ark asChild', async () => {
  const imageRef = ref<ComponentPublicInstance | null>(null);
  const statuses: string[] = [];
  const Harness = defineComponent({
    components: avatarComponents,
    setup() {
      return {
        handleStatusChange: (details: { status: string }) => statuses.push(details.status),
        imageRef,
      };
    },
    template:
      '<Avatar @status-change="handleStatusChange"><AvatarFallback>AT</AvatarFallback><AvatarImage ref="imageRef" as-child alt="Alex T." class="consumer-image"><img data-replacement="image" /></AvatarImage></Avatar>',
  });

  render(Harness);
  const image = screen.getByAltText('Alex T.') as HTMLImageElement;

  expect(image).toHaveAttribute('data-replacement', 'image');
  expect(image).toHaveAttribute('data-slot', 'avatar-image');
  expect(image).toHaveAttribute('data-part', 'image');
  expect(image).toHaveAttribute('data-state', 'hidden');
  expect(image.className.endsWith('consumer-image')).toBe(true);
  expect(imageRef.value?.$el).toBe(image);

  await fireEvent.load(image);

  await waitFor(() => expect(image).toHaveAttribute('data-state', 'visible'));
  expect(screen.getByText('AT').closest('[data-part="fallback"]')).toHaveAttribute(
    'data-state',
    'hidden',
  );
  expect(statuses.filter((status) => status === 'loaded')).toEqual(['loaded']);
});

test('renders and hydrates image fallback state without changing the host', async () => {
  const App = defineComponent({
    components: avatarComponents,
    template:
      '<Avatar><AvatarFallback>AT</AvatarFallback><AvatarImage src="/avatar.png" alt="Alex T." /></Avatar>',
  });

  const html = await renderToString(createSSRApp(App));
  expect(html).toContain('data-slot="avatar-root"');
  expect(html).toContain('data-slot="avatar-fallback"');

  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const app = createSSRApp(App);
  app.mount(host);

  expect(host.querySelectorAll('[data-slot="avatar-root"]')).toHaveLength(1);
  expect(host.querySelector('[data-slot="avatar-fallback"]')).toBeInTheDocument();
  expect(host.querySelector('[data-slot="avatar-image"]')).toHaveAttribute('alt', 'Alex T.');

  app.unmount();
  host.remove();
});