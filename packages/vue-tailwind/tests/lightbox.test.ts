import { expect, rs, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, mergeProps, ref, shallowRef } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import {
  Lightbox,
  LightboxBackdrop,
  LightboxBind,
  LightboxBody,
  LightboxCloseIcon,
  LightboxCloseTrigger,
  LightboxContent,
  LightboxDescription,
  LightboxFooter,
  LightboxGallery,
  LightboxHeader,
  LightboxImage,
  LightboxPositioner,
  LightboxRootProvider,
  LightboxTitle,
  LightboxTrigger,
  useLightbox,
  useLightboxContext,
} from '../src';
import type { LightboxImageSelectDetails } from '../src';
import { resolveRootNode } from '../src/components/lightbox/lightbox';

const lightboxComponents = {
  Lightbox,
  LightboxBackdrop,
  LightboxBind,
  LightboxBody,
  LightboxCloseIcon,
  LightboxCloseTrigger,
  LightboxContent,
  LightboxDescription,
  LightboxFooter,
  LightboxGallery,
  LightboxHeader,
  LightboxImage,
  LightboxPositioner,
  LightboxRootProvider,
  LightboxTitle,
  LightboxTrigger,
};

test('resolves Bind elements, refs, getters, and selector fallbacks', () => {
  render({ template: '<section id="bind-root" data-testid="bind-root" />' });
  const root = screen.getByTestId('bind-root');
  const otherRoot = document.createElement('section');
  const rootRef = shallowRef<HTMLElement | null>(root);
  const getRoot = rs.fn(() => rootRef.value);

  expect(resolveRootNode(root, '#missing-root')).toBe(root);
  expect(resolveRootNode(rootRef, '#missing-root')).toBe(root);
  expect(resolveRootNode(getRoot, '#missing-root')).toBe(root);
  expect(getRoot).toHaveBeenCalledTimes(1);

  rootRef.value = otherRoot;
  expect(resolveRootNode(rootRef, '#bind-root')).toBe(otherRoot);
  expect(resolveRootNode(getRoot, '#bind-root')).toBe(otherRoot);
  expect(getRoot).toHaveBeenCalledTimes(2);

  rootRef.value = null;
  expect(resolveRootNode(rootRef, '#bind-root')).toBe(root);
  expect(resolveRootNode(getRoot, '#bind-root')).toBe(root);
  expect(getRoot).toHaveBeenCalledTimes(3);
  expect(resolveRootNode(undefined, '#bind-root')).toBe(root);
  expect(resolveRootNode(() => undefined, '#bind-root')).toBe(root);
  expect(resolveRootNode(undefined, '#missing-root')).toBeNull();
  expect(resolveRootNode(undefined, undefined)).toBeNull();
});

test('opens from a semantic Bind selector', async () => {
  const rootRef = ref<HTMLElement | null>(null);
  const BoundLightbox = defineComponent({
    components: lightboxComponents,
    setup() {
      const image = ref<LightboxImageSelectDetails | null>(null);
      return { image, rootRef };
    },
    template: `
      <div ref="rootRef">
        <button type="button">
          <img src="/thumbnail.jpg" data-lightbox-src="/full-size.jpg" alt="Mountain ridge" />
        </button>
      </div>
      <Lightbox :portalled="false">
        <LightboxBind :root-ref="() => rootRef" selector="button" :on-image-select="(details) => (image = details)" />
        <LightboxPositioner>
          <LightboxContent aria-label="Image preview">
            <LightboxImage v-if="image" :src="image.src" :alt="image.alt ?? ''" />
          </LightboxContent>
        </LightboxPositioner>
      </Lightbox>
    `,
  });

  render(BoundLightbox);
  await fireEvent.click(screen.getByRole('button'));

  const dialog = await screen.findByRole('dialog', { name: 'Image preview' });
  expect(dialog).toBeInTheDocument();
  expect(within(dialog).getByRole('img', { name: 'Mountain ridge' })).toHaveAttribute(
    'src',
    '/full-size.jpg',
  );
});

test('keeps the lightbox open when an image click is prevented', () => {
  render({
    components: lightboxComponents,
    template: `
      <Lightbox default-open :portalled="false">
        <LightboxPositioner>
          <LightboxContent aria-label="Image preview">
            <LightboxImage
              src="/full-size.jpg"
              alt="Mountain ridge"
              close-on-click
              @click="(event) => event.preventDefault()"
            />
          </LightboxContent>
        </LightboxPositioner>
      </Lightbox>
    `,
  });

  fireEvent.click(screen.getByRole('img', { name: 'Mountain ridge' }));
  expect(screen.getByRole('dialog', { name: 'Image preview' })).toBeInTheDocument();
});

test.each([false, true])(
  'composes image listeners before click-to-close (cancel=%s)',
  async (cancel) => {
    const calls: string[] = [];
    const listeners = mergeProps(
      {
        onClick: (event: MouseEvent) => {
          calls.push('first');
          if (cancel) event.preventDefault();
        },
      },
      { onClick: () => calls.push('second') },
    );
    render({
      components: lightboxComponents,
      setup: () => ({ listeners }),
      template: `
      <Lightbox :portalled="false">
        <LightboxTrigger>Open preview</LightboxTrigger>
        <LightboxPositioner>
          <LightboxContent aria-label="Image preview">
            <LightboxImage v-bind="listeners" src="/full-size.jpg" alt="Mountain ridge" close-on-click />
          </LightboxContent>
        </LightboxPositioner>
      </Lightbox>
    `,
    });
    await fireEvent.click(screen.getByRole('button', { name: 'Open preview' }));
    await fireEvent.click(await screen.findByRole('img', { name: 'Mountain ridge' }));
    expect(calls).toEqual(['first', 'second']);
    await waitFor(() => {
      if (cancel) expect(screen.getByRole('dialog', { name: 'Image preview' })).toBeInTheDocument();
      else expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  },
);

test('closes a click-to-close image and restores focus to its trigger', async () => {
  render({
    components: lightboxComponents,
    template: `
      <Lightbox :portalled="false">
        <LightboxTrigger>Open preview</LightboxTrigger>
        <LightboxPositioner>
          <LightboxContent aria-label="Image preview">
            <LightboxImage src="/full-size.jpg" alt="Mountain ridge" close-on-click />
          </LightboxContent>
        </LightboxPositioner>
      </Lightbox>
    `,
  });

  const trigger = screen.getByRole('button', { name: 'Open preview' });
  trigger.focus();
  await fireEvent.click(trigger);
  await fireEvent.click(await screen.findByRole('img', { name: 'Mountain ridge' }));

  await waitFor(() => {
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});

test('closes from its accessible close icon and restores focus to its trigger', async () => {
  render({
    components: lightboxComponents,
    template: `
      <Lightbox :portalled="false">
        <LightboxTrigger>Open preview</LightboxTrigger>
        <LightboxPositioner>
          <LightboxCloseIcon />
          <LightboxContent aria-label="Image preview">
            <LightboxImage src="/full-size.jpg" alt="Mountain ridge" />
          </LightboxContent>
        </LightboxPositioner>
      </Lightbox>
    `,
  });

  const trigger = screen.getByRole('button', { name: 'Open preview' });
  trigger.focus();
  await fireEvent.click(trigger);
  await fireEvent.click(await screen.findByRole('button', { name: 'Close image' }));

  await waitFor(() => {
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});

test('exposes RootProvider state through useLightboxContext', async () => {
  const LightboxStatus = defineComponent({
    setup() {
      return { dialog: useLightboxContext() };
    },
    template: '<output>Open: {{ dialog.open }}</output>',
  });
  const ProviderLightbox = defineComponent({
    components: { ...lightboxComponents, LightboxStatus },
    setup() {
      return { lightbox: useLightbox() };
    },
    template: `
      <button type="button" @click="lightbox.setOpen(true)">Open preview</button>
      <LightboxRootProvider :value="lightbox" :portalled="false">
        <LightboxPositioner>
          <LightboxContent aria-label="Image preview"><LightboxStatus /></LightboxContent>
        </LightboxPositioner>
      </LightboxRootProvider>
    `,
  });

  render(ProviderLightbox);
  await fireEvent.click(screen.getByRole('button', { name: 'Open preview' }));

  expect(await screen.findByRole('dialog', { name: 'Image preview' })).toBeInTheDocument();
  expect(screen.getByText('Open: true')).toBeInTheDocument();
});

test('mounts lazy content on first open and unmounts it after close', async () => {
  render({
    components: lightboxComponents,
    template: `
      <Lightbox lazy-mount unmount-on-exit :portalled="false">
        <LightboxTrigger>Open preview</LightboxTrigger>
        <LightboxPositioner>
          <LightboxContent aria-label="Image preview">
            <LightboxImage src="/full-size.jpg" alt="Mountain ridge" close-on-click />
          </LightboxContent>
        </LightboxPositioner>
      </Lightbox>
    `,
  });

  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  await fireEvent.click(screen.getByRole('button', { name: 'Open preview' }));
  await fireEvent.click(await screen.findByRole('img', { name: 'Mountain ridge' }));
  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
});

test('forwards refs through native parts and keeps asChild composition native', () => {
  const refs = {
    trigger: ref<ComponentPublicInstance>(),
    backdrop: ref<ComponentPublicInstance>(),
    positioner: ref<ComponentPublicInstance>(),
    content: ref<ComponentPublicInstance>(),
    title: ref<ComponentPublicInstance>(),
    description: ref<ComponentPublicInstance>(),
    closeTrigger: ref<ComponentPublicInstance>(),
    image: ref<ComponentPublicInstance>(),
    gallery: ref<ComponentPublicInstance>(),
    header: ref<ComponentPublicInstance>(),
    body: ref<ComponentPublicInstance>(),
    footer: ref<ComponentPublicInstance>(),
    closeIcon: ref<ComponentPublicInstance>(),
  };
  const Harness = defineComponent({
    components: lightboxComponents,
    setup() {
      return refs;
    },
    template: `
      <Lightbox default-open :portalled="false">
        <LightboxTrigger ref="trigger">Open preview</LightboxTrigger>
        <LightboxBackdrop ref="backdrop" />
        <LightboxPositioner ref="positioner">
          <LightboxCloseIcon ref="closeIcon" />
          <LightboxContent ref="content" aria-label="Image preview">
            <LightboxHeader ref="header">
              <LightboxTitle ref="title">Preview</LightboxTitle>
              <LightboxDescription ref="description">Description</LightboxDescription>
            </LightboxHeader>
            <LightboxBody ref="body">
              <LightboxImage ref="image" src="/full-size.jpg" alt="Mountain ridge" />
              <LightboxGallery ref="gallery" />
            </LightboxBody>
            <LightboxFooter ref="footer" />
            <LightboxCloseTrigger ref="closeTrigger">Close</LightboxCloseTrigger>
          </LightboxContent>
        </LightboxPositioner>
      </Lightbox>
    `,
  });

  render(Harness);
  for (const [name, instance] of Object.entries(refs)) {
    const element = instance.value?.$el as HTMLElement;
    const slotName =
      name === 'closeIcon' ? 'close-icon' : name === 'closeTrigger' ? 'close-trigger' : name;
    expect(element).toHaveAttribute('data-slot', `lightbox-${slotName}`);
  }

  const composedRef = ref<ComponentPublicInstance>();
  const Composed = defineComponent({
    components: lightboxComponents,
    setup() {
      return { composedRef };
    },
    template: `
      <Lightbox>
        <LightboxTrigger ref="composedRef" as-child><a href="/preview">Composed trigger</a></LightboxTrigger>
      </Lightbox>
    `,
  });
  render(Composed);
  const composedTrigger = screen.getByRole('link', { name: 'Composed trigger' });
  expect(composedTrigger).toHaveAttribute('data-slot', 'lightbox-trigger');
  expect(composedRef.value?.$el).toBe(composedTrigger);
});

test('merges consumer utilities over Tailwind defaults', () => {
  render({
    components: lightboxComponents,
    template: `
      <Lightbox default-open :portalled="false">
        <LightboxBackdrop class="bg-red-500" />
        <LightboxPositioner class="p-8">
          <LightboxCloseIcon class="size-10" />
          <LightboxContent class="max-w-full" aria-label="Image preview">
            <LightboxImage class="rounded-none" src="/full-size.jpg" alt="Mountain ridge" />
          </LightboxContent>
        </LightboxPositioner>
      </Lightbox>
    `,
  });

  expect(document.querySelector('[data-slot="lightbox-backdrop"]')).toHaveClass('bg-red-500');
  expect(document.querySelector('[data-slot="lightbox-backdrop"]')).not.toHaveClass('bg-overlay');
  expect(document.querySelector('[data-slot="lightbox-positioner"]')).toHaveClass('p-8');
  expect(document.querySelector('[data-slot="lightbox-positioner"]')).not.toHaveClass('p-4');
  expect(document.querySelector('[data-slot="lightbox-close-icon"]')).toHaveClass('size-10');
  expect(document.querySelector('[data-slot="lightbox-close-icon"]')).not.toHaveClass('size-8');
  expect(document.querySelector('[data-slot="lightbox-content"]')).toHaveClass('max-w-full');
  expect(document.querySelector('[data-slot="lightbox-content"]')).not.toHaveClass(
    'max-w-[min(80vw,calc(100vw-2rem))]',
  );
  expect(document.querySelector('[data-slot="lightbox-image"]')).toHaveClass('rounded-none');
  expect(document.querySelector('[data-slot="lightbox-image"]')).not.toHaveClass('rounded-md');
});

test('applies component-owned visual utilities to every visual part', () => {
  render({
    components: lightboxComponents,
    template: `
      <Lightbox default-open :portalled="false">
        <LightboxBackdrop />
        <LightboxPositioner>
          <LightboxCloseIcon />
          <LightboxContent aria-label="Image preview">
            <LightboxHeader>
              <LightboxTitle>Preview</LightboxTitle>
              <LightboxDescription>Description</LightboxDescription>
            </LightboxHeader>
            <LightboxBody>
              <LightboxImage src="/full-size.jpg" alt="Mountain ridge" />
              <LightboxGallery />
            </LightboxBody>
            <LightboxFooter>Footer</LightboxFooter>
          </LightboxContent>
        </LightboxPositioner>
      </Lightbox>
    `,
  });

  expect(document.querySelector('[data-slot="lightbox-backdrop"]')).toHaveClass(
    'fixed',
    'min-h-dvh',
    'bg-overlay',
  );
  expect(document.querySelector('[data-slot="lightbox-positioner"]')).toHaveClass(
    'grid',
    'place-items-center',
    'p-4',
  );
  expect(document.querySelector('[data-slot="lightbox-content"]')).toHaveClass(
    'grid',
    'w-fit',
    'gap-3',
  );
  expect(document.querySelector('[data-slot="lightbox-close-icon"]')).toHaveClass(
    'fixed',
    'size-8',
  );
  expect(document.querySelector('[data-slot="lightbox-title"]')).toHaveClass(
    'text-md',
    'font-semibold',
  );
  expect(document.querySelector('[data-slot="lightbox-description"]')).toHaveClass('text-sm');
  expect(document.querySelector('[data-slot="lightbox-header"]')).toHaveClass('grid', 'gap-1');
  expect(document.querySelector('[data-slot="lightbox-body"]')).toHaveClass('grid', 'gap-3');
  expect(document.querySelector('[data-slot="lightbox-footer"]')).toHaveClass(
    'flex',
    'items-center',
  );
  expect(document.querySelector('[data-slot="lightbox-image"]')).toHaveClass(
    'block',
    'rounded-md',
    'shadow-lg',
  );
  expect(document.querySelector('[data-slot="lightbox-gallery"]')).toHaveClass(
    'justify-self-center',
    '[&_[data-slot=carousel-indicator-group]]:mx-auto',
  );
});

test('keeps the close-on-click marker aligned with its behavior', () => {
  render({
    components: lightboxComponents,
    template: `
      <div>
        <Lightbox default-open :portalled="false">
          <LightboxPositioner>
            <LightboxContent aria-label="First preview">
              <LightboxImage alt="Closes" close-on-click data-close-on-click="" src="/first.jpg" />
            </LightboxContent>
          </LightboxPositioner>
        </Lightbox>
        <Lightbox default-open :portalled="false">
          <LightboxPositioner>
            <LightboxContent aria-label="Second preview">
              <LightboxImage alt="Stays open" data-close-on-click="" src="/second.jpg" />
            </LightboxContent>
          </LightboxPositioner>
        </Lightbox>
      </div>
    `,
  });

  expect(screen.getByRole('img', { name: 'Closes' })).toHaveAttribute('data-close-on-click');
  expect(screen.getByRole('img', { name: 'Stays open' })).not.toHaveAttribute(
    'data-close-on-click',
  );
});

test('renders and hydrates the public anatomy on the server', async () => {
  const App = defineComponent({
    components: lightboxComponents,
    template: `
      <Lightbox default-open :portalled="false">
        <LightboxPositioner>
          <LightboxContent aria-label="Image preview">
            <LightboxTitle>Preview</LightboxTitle>
            <LightboxImage src="/full-size.jpg" alt="Mountain ridge" />
          </LightboxContent>
        </LightboxPositioner>
      </Lightbox>
    `,
  });

  const html = await renderToString(createSSRApp(App));
  expect(html).toContain('data-slot="lightbox-content"');
  expect(html).toContain('data-slot="lightbox-image"');
  expect(html).toContain('role="dialog"');

  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  const app = createSSRApp(App);
  app.mount(host);
  expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);
  app.unmount();
  host.remove();
});

test.each([
  { name: 'empty currentSrc', currentSrc: '', override: undefined, selected: 'fallback' },
  {
    name: 'responsive source',
    currentSrc: '/responsive.jpg',
    override: undefined,
    selected: '/responsive.jpg',
  },
  {
    name: 'source override',
    currentSrc: '/responsive.jpg',
    override: '/full.jpg',
    selected: '/full.jpg',
  },
  { name: 'explicit empty override', currentSrc: '/responsive.jpg', override: '', selected: null },
])('resolves bound images with $name', async ({ currentSrc, override, selected }) => {
  const root = ref<HTMLElement>();
  const onImageSelect = rs.fn();
  render(
    defineComponent({
      components: lightboxComponents,
      setup: () => ({ root, onImageSelect }),
      template: `
      <div ref="root"><button type="button"><img src="/thumbnail.jpg" alt="Bound image" /></button></div>
      <Lightbox :portalled="false">
        <LightboxBind :root-ref="() => root" selector="button" :on-image-select="onImageSelect" />
        <LightboxPositioner><LightboxContent aria-label="Bound preview" /></LightboxPositioner>
      </Lightbox>
    `,
    }),
  );
  const image = screen.getByRole('img', { name: 'Bound image' }) as HTMLImageElement;
  Object.defineProperty(image, 'currentSrc', { configurable: true, value: currentSrc });
  if (override !== undefined) image.dataset.lightboxSrc = override;
  await fireEvent.click(image);
  if (selected === null) {
    expect(onImageSelect).not.toHaveBeenCalled();
    expect(screen.queryByRole('dialog')).toBeNull();
  } else {
    expect(onImageSelect).toHaveBeenCalledExactlyOnceWith({
      src: selected === 'fallback' ? image.src : selected,
      alt: image.alt,
      element: image,
    });
    expect(await screen.findByRole('dialog', { name: 'Bound preview' })).toBeVisible();
  }
});

test('keeps close-icon labels, attrs and fallback content reactive', async () => {
  const label = ref<string | undefined>('Dismiss first');
  const labelledby = ref<string | undefined>();
  const custom = ref(false);
  render({
    components: lightboxComponents,
    setup: () => ({ label, labelledby, custom }),
    template: `
      <Lightbox default-open :portalled="false">
        <LightboxPositioner><LightboxContent>
          <LightboxTitle>Preview</LightboxTitle>
          <LightboxCloseIcon :aria-label="label" :aria-labelledby="labelledby"
            class="consumer-close" style="color: red" title="Dismiss preview" data-testid="close">
            <template v-if="custom" #default><span>Custom close</span></template>
          </LightboxCloseIcon>
        </LightboxContent></LightboxPositioner>
      </Lightbox>
    `,
  });
  const button = await screen.findByTestId('close');
  expect(button.tagName).toBe('BUTTON');
  expect(button).toHaveAttribute('aria-label', 'Dismiss first');
  expect(button).toHaveClass('consumer-close');
  expect(button).toHaveStyle({ color: 'red' });
  expect(button).toHaveAttribute('title', 'Dismiss preview');
  expect(button.querySelector('svg')).toBeInTheDocument();
  label.value = 'Dismiss second';
  await waitFor(() => expect(button).toHaveAttribute('aria-label', 'Dismiss second'));
  labelledby.value = 'dismiss-label';
  label.value = undefined;
  await waitFor(() => {
    expect(button).toHaveAttribute('aria-labelledby', 'dismiss-label');
    expect(button).toHaveAttribute('aria-label', 'Close image');
  });
  label.value = '';
  await waitFor(() => expect(button).toHaveAttribute('aria-label', ''));
  custom.value = true;
  await waitFor(() => expect(screen.getByTestId('close')).toHaveTextContent('Custom close'));
  expect(screen.getByTestId('close').querySelector('svg')).toBeNull();
  custom.value = false;
  await waitFor(() => expect(screen.getByTestId('close').querySelector('svg')).toBeInTheDocument());
});