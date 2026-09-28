import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, ref } from 'vue';
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