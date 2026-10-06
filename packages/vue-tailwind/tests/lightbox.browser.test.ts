import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
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
import SsrLightbox from './fixtures/SsrLightbox.vue';

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
  await page.getByRole('button').click();

  await expect
    .element(page.getByRole('dialog', { name: 'Image preview', exact: true }))
    .toBeAttached();
  await expect
    .element(
      page
        .getByRole('dialog', { name: 'Image preview', exact: true })
        .getByRole('img', { name: 'Mountain ridge' }),
    )
    .toHaveAttribute('src', '/full-size.jpg');
});

test('keeps the lightbox open when an image click is prevented', async () => {
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

  await page.getByRole('img', { name: 'Mountain ridge', exact: true }).click();
  await expect
    .element(page.getByRole('dialog', { name: 'Image preview', exact: true }))
    .toBeAttached();
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
    await page.getByRole('button', { name: 'Open preview', exact: true }).click();
    await page.getByRole('img', { name: 'Mountain ridge', exact: true }).click();
    expect(calls).toEqual(['first', 'second']);
    if (cancel)
      await expect.element(page.getByRole('dialog', { name: 'Image preview' })).toBeVisible();
    else await expect.element(page.getByRole('dialog')).toHaveCount(0);
  },
);

test('lazily mounts, closes a click-to-close image, and restores focus', async () => {
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

  await expect.element(page.getByRole('dialog')).toHaveCount(0);
  await page.getByRole('button', { name: 'Open preview', exact: true }).click();
  await page.getByRole('img', { name: 'Mountain ridge', exact: true }).click();

  await expect.element(page.getByRole('dialog')).toHaveCount(0);
  await expect
    .element(page.getByRole('button', { name: 'Open preview', exact: true }))
    .toBeFocused();
});

test('keeps its close icon accessible and viewport-fixed, then restores trigger focus', async () => {
  render({
    components: lightboxComponents,
    template: `
      <Lightbox :portalled="false">
        <LightboxTrigger>Open preview</LightboxTrigger>
        <LightboxPositioner>
          <LightboxContent aria-label="Image preview">
            <LightboxCloseIcon />
            <LightboxBody style="width: 240px; height: 160px">
              <LightboxImage src="/full-size.jpg" alt="Mountain ridge" />
            </LightboxBody>
          </LightboxContent>
        </LightboxPositioner>
      </Lightbox>
    `,
  });

  await page.getByRole('button', { name: 'Open preview', exact: true }).click();
  const closeIcon = page.getByRole('button', { name: 'Close image', exact: true });
  await expect.element(closeIcon).toBeFocused();
  await expect.element(closeIcon).toBeVisible();
  const dialog = screen.getByRole('dialog', { name: 'Image preview' });
  const button = screen.getByRole('button', { name: 'Close image' });
  expect(dialog.contains(button)).toBe(true);
  expect(getComputedStyle(dialog).scale).toBe('none');
  expect(getComputedStyle(dialog).translate).toBe('none');
  const rect = button.getBoundingClientRect();
  expect(rect.top).toBeCloseTo(16);
  expect(window.innerWidth - rect.right).toBeCloseTo(16);
  await expect
    .element(page.locator('[data-slot="lightbox-body"]'))
    .toHaveCSS('animation-name', 'moduix-lightbox-body-in');
  await closeIcon.press('Tab');
  await expect.element(closeIcon).toBeFocused();
  await closeIcon.click();

  await expect.element(page.getByRole('dialog')).toHaveCount(0);
  await expect
    .element(page.getByRole('button', { name: 'Open preview', exact: true }))
    .toBeFocused();
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
  await page.getByRole('button', { name: 'Open preview', exact: true }).click();

  await expect
    .element(page.getByRole('dialog', { name: 'Image preview', exact: true }))
    .toBeAttached();
  await expect.element(page.getByText('Open: true')).toBeAttached();
});

test('forwards refs through native parts and keeps asChild composition native', async () => {
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
          <LightboxContent ref="content" aria-label="Image preview">
            <LightboxCloseIcon ref="closeIcon" />
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
    expect(element!.getAttribute('data-slot')).toBe(`lightbox-${slotName}`);
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
  const composedTrigger = document.querySelector('a[href="/preview"]')!;
  await expect
    .element(page.locator('a[href="/preview"]'))
    .toHaveAttribute('data-slot', 'lightbox-trigger');
  expect(composedRef.value?.$el).toBe(composedTrigger);
});

test('merges consumer utilities over Tailwind defaults', async () => {
  render({
    components: lightboxComponents,
    template: `
      <Lightbox default-open :portalled="false">
        <LightboxBackdrop class="bg-red-500" />
        <LightboxPositioner class="p-8">
          <LightboxContent class="max-w-full" aria-label="Image preview">
            <LightboxCloseIcon class="size-10" />
            <LightboxImage class="rounded-none" src="/full-size.jpg" alt="Mountain ridge" />
          </LightboxContent>
        </LightboxPositioner>
      </Lightbox>
    `,
  });

  expect([...document.querySelector('[data-slot="lightbox-backdrop"]')!.classList]).toEqual(
    expect.arrayContaining(['bg-red-500']),
  );
  expect(
    document.querySelector('[data-slot="lightbox-backdrop"]')!.classList.contains('bg-overlay'),
  ).toBe(false);
  expect([...document.querySelector('[data-slot="lightbox-positioner"]')!.classList]).toEqual(
    expect.arrayContaining(['p-8']),
  );
  expect(
    document.querySelector('[data-slot="lightbox-positioner"]')!.classList.contains('p-4'),
  ).toBe(false);
  expect([...document.querySelector('[data-slot="lightbox-close-icon"]')!.classList]).toEqual(
    expect.arrayContaining(['size-10']),
  );
  expect(
    document.querySelector('[data-slot="lightbox-close-icon"]')!.classList.contains('size-8'),
  ).toBe(false);
  expect([...document.querySelector('[data-slot="lightbox-content"]')!.classList]).toEqual(
    expect.arrayContaining(['max-w-full']),
  );
  expect(
    document
      .querySelector('[data-slot="lightbox-content"]')!
      .classList.contains('max-w-[min(80vw,calc(100vw-2rem))]'),
  ).toBe(false);
  expect([...document.querySelector('[data-slot="lightbox-image"]')!.classList]).toEqual(
    expect.arrayContaining(['rounded-none']),
  );
  expect(
    document.querySelector('[data-slot="lightbox-image"]')!.classList.contains('rounded-md'),
  ).toBe(false);

  await expect
    .element(page.locator('[data-slot="lightbox-positioner"]'))
    .toHaveCSS('padding', '32px');
  await expect
    .element(page.locator('[data-slot="lightbox-close-icon"]'))
    .toHaveCSS('width', '40px');
  await expect
    .element(page.locator('[data-slot="lightbox-image"]'))
    .toHaveCSS('border-radius', '0px');
});

test('applies component-owned visual utilities to every visual part', async () => {
  render({
    components: lightboxComponents,
    template: `
      <Lightbox default-open :portalled="false">
        <LightboxBackdrop />
        <LightboxPositioner>
          <LightboxContent aria-label="Image preview">
            <LightboxCloseIcon />
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

  expect([...document.querySelector('[data-slot="lightbox-backdrop"]')!.classList]).toEqual(
    expect.arrayContaining(['fixed', 'min-h-dvh', 'bg-overlay']),
  );
  expect([...document.querySelector('[data-slot="lightbox-positioner"]')!.classList]).toEqual(
    expect.arrayContaining(['grid', 'place-items-center', 'p-4']),
  );
  expect([...document.querySelector('[data-slot="lightbox-content"]')!.classList]).toEqual(
    expect.arrayContaining(['grid', 'w-fit', 'gap-3']),
  );
  expect([...document.querySelector('[data-slot="lightbox-close-icon"]')!.classList]).toEqual(
    expect.arrayContaining(['fixed', 'size-8']),
  );
  expect([...document.querySelector('[data-slot="lightbox-title"]')!.classList]).toEqual(
    expect.arrayContaining(['text-md', 'font-semibold']),
  );
  expect([...document.querySelector('[data-slot="lightbox-description"]')!.classList]).toEqual(
    expect.arrayContaining(['text-sm']),
  );
  expect([...document.querySelector('[data-slot="lightbox-header"]')!.classList]).toEqual(
    expect.arrayContaining(['grid', 'gap-1']),
  );
  expect([...document.querySelector('[data-slot="lightbox-body"]')!.classList]).toEqual(
    expect.arrayContaining(['grid', 'gap-3']),
  );
  expect([...document.querySelector('[data-slot="lightbox-footer"]')!.classList]).toEqual(
    expect.arrayContaining(['flex', 'items-center']),
  );
  expect([...document.querySelector('[data-slot="lightbox-image"]')!.classList]).toEqual(
    expect.arrayContaining(['block', 'rounded-md', 'shadow-lg']),
  );
  expect([...document.querySelector('[data-slot="lightbox-gallery"]')!.classList]).toEqual(
    expect.arrayContaining([
      'justify-self-center',
      '[&_[data-slot=carousel-indicator-group]]:mx-auto',
    ]),
  );
});

test('keeps the close-on-click marker aligned with its behavior', async () => {
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

  await expect.element(page.locator('img[alt="Closes"]')).toHaveAttribute('data-close-on-click');
  await expect
    .element(page.locator('img[alt="Stays open"]'))
    .not.toHaveAttribute('data-close-on-click');
});

test('renders and hydrates lightbox without replacing server hosts or IDs', async () => {
  const html = await renderToString(createSSRApp(SsrLightbox));
  expect(html).toContain('data-slot="lightbox-content"');
  expect(html).toContain('data-slot="lightbox-image"');
  expect(html).toContain('role="dialog"');
  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const serverParts = [...host.querySelectorAll('[data-slot]')];
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  expect(serverIds.length).toBeGreaterThan(0);
  expect(serverIds.every(Boolean)).toBe(true);
  const app = createSSRApp(SsrLightbox);
  try {
    app.mount(host);
    expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);
    const hydratedParts = [...host.querySelectorAll('[data-slot]')];
    expect(hydratedParts).toHaveLength(serverParts.length);
    hydratedParts.forEach((part, index) => expect(part).toBe(serverParts[index]));
    await page.getByRole('dialog', { name: 'Preview', exact: true }).press('Escape');
    await expect.element(page.getByRole('dialog')).toHaveCount(0);
  } finally {
    app.unmount();
    host.remove();
  }
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
        <LightboxPositioner><LightboxContent aria-label="Bound preview">Bound image preview</LightboxContent></LightboxPositioner>
      </Lightbox>
    `,
    }),
  );
  const image = screen.getByRole('img', { name: 'Bound image' }) as HTMLImageElement;
  Object.defineProperty(image, 'currentSrc', { configurable: true, value: currentSrc });
  if (override !== undefined) image.dataset.lightboxSrc = override;
  await page.getByRole('img', { name: 'Bound image', exact: true }).click();
  if (selected === null) {
    expect(onImageSelect).not.toHaveBeenCalled();
    expect(screen.queryByRole('dialog')).toBeNull();
  } else {
    expect(onImageSelect).toHaveBeenCalledExactlyOnceWith({
      src: selected === 'fallback' ? image.src : selected,
      alt: image.alt,
      element: image,
    });
    await expect
      .element(page.getByRole('dialog', { name: 'Bound preview', exact: true }))
      .toBeVisible();
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
  await expect.element(page.getByTestId('close')).toHaveAttribute('aria-label', 'Dismiss first');
  expect([...button!.classList]).toEqual(expect.arrayContaining(['consumer-close']));
  await expect.element(page.getByTestId('close')).toHaveCSS('color', 'rgb(255, 0, 0)');
  await expect.element(page.getByTestId('close')).toHaveAttribute('title', 'Dismiss preview');
  expect(Boolean(button.querySelector('svg')?.isConnected)).toBe(true);
  label.value = 'Dismiss second';
  await expect.element(page.getByTestId('close')).toHaveAttribute('aria-label', 'Dismiss second');
  labelledby.value = 'dismiss-label';
  label.value = undefined;
  await expect
    .element(page.getByTestId('close'))
    .toHaveAttribute('aria-labelledby', 'dismiss-label');
  await expect.element(page.getByTestId('close')).toHaveAttribute('aria-label', 'Close image');
  label.value = '';
  await expect.element(page.getByTestId('close')).toHaveAttribute('aria-label', '');
  custom.value = true;
  await expect.element(page.getByTestId('close')).toContainText('Custom close');
  expect(screen.getByTestId('close').querySelector('svg')).toBeNull();
  custom.value = false;
  await expect
    .poll(() => Boolean(screen.getByTestId('close').querySelector('svg')?.isConnected))
    .toBe(true);
});