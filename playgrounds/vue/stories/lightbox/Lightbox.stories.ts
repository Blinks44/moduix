import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { computed, defineComponent, ref } from 'vue';
import {
  Carousel,
  CarouselControl,
  CarouselIndicator,
  CarouselIndicatorGroup,
  CarouselItem,
  CarouselItemGroup,
  CarouselNextTrigger,
  CarouselPrevTrigger,
} from '@/components/carousel';
import type { LightboxImageSelectDetails } from '@/components/lightbox';
import {
  Lightbox,
  LightboxBackdrop,
  LightboxBind,
  LightboxBody,
  LightboxCloseIcon,
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
} from '@/components/lightbox';
import styles from './Lightbox.stories.module.css';

const images = [
  {
    id: 'mountain',
    src: 'https://images.unsplash.com/photo-1470259078422-826894b933aa?auto=format&fit=crop&w=1800&q=90',
    alt: 'Mountain ridge at sunset',
  },
  {
    id: 'earth',
    src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1800&q=90',
    alt: 'Earth from space',
  },
  {
    id: 'forest',
    src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1800&q=90',
    alt: 'Road through a forest',
  },
];

const lightboxComponents = {
  Carousel,
  CarouselControl,
  CarouselIndicator,
  CarouselIndicatorGroup,
  CarouselItem,
  CarouselItemGroup,
  CarouselNextTrigger,
  CarouselPrevTrigger,
  Lightbox,
  LightboxBackdrop,
  LightboxBind,
  LightboxBody,
  LightboxCloseIcon,
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

const LightboxSurface = defineComponent({
  components: lightboxComponents,
  props: {
    alt: { type: String, required: true },
    closeOnClick: Boolean,
    src: { type: String, required: true },
  },
  setup(props) {
    return { props };
  },
  template: `
    <LightboxBackdrop />
    <LightboxPositioner>
      <LightboxContent :aria-label="props.alt">
        <LightboxCloseIcon />
        <LightboxBody>
          <LightboxImage :src="props.src" :alt="props.alt" :close-on-click="props.closeOnClick" />
        </LightboxBody>
      </LightboxContent>
    </LightboxPositioner>
  `,
});

const LightboxStatus = defineComponent({
  setup() {
    return { dialog: useLightboxContext(), styles };
  },
  template: `<span :class="styles.status">Preview is {{ dialog.open ? 'open' : 'closed' }}</span>`,
});

const storyComponents = { ...lightboxComponents, LightboxStatus, LightboxSurface };

function renderStory(template: string, setup?: () => Record<string, unknown>) {
  return () =>
    defineComponent({
      components: storyComponents,
      setup() {
        return { images, styles, ...setup?.() };
      },
      template,
    });
}

const meta = {
  title: 'Components/Lightbox',
  component: Lightbox,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Lightbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: renderStory(`
    <Lightbox>
      <LightboxTrigger as-child>
        <button type="button" :class="styles.imageTrigger">
          <img :src="images[0].src" :alt="images[0].alt" />
        </button>
      </LightboxTrigger>
      <LightboxSurface :src="images[0].src" :alt="images[0].alt" />
    </Lightbox>
  `),
};

export const Controlled: Story = {
  render: renderStory(
    `
      <div :class="styles.stack">
        <span>{{ open ? 'Open' : 'Closed' }}</span>
        <Lightbox v-model:open="open">
          <LightboxTrigger :class="styles.textTrigger">Open controlled lightbox</LightboxTrigger>
          <LightboxSurface :src="images[1].src" :alt="images[1].alt" />
        </Lightbox>
      </div>
    `,
    () => ({ open: ref(false) }),
  ),
};

export const MultipleTriggers: Story = {
  render: renderStory(
    `
      <Lightbox @trigger-value-change="selectImage">
        <div :class="styles.gallery">
          <LightboxTrigger
            v-for="image in images"
            :key="image.id"
            :value="image.id"
            as-child
          >
            <button type="button" :class="styles.galleryTrigger">
              <img :src="image.src" :alt="image.alt" />
            </button>
          </LightboxTrigger>
        </div>
        <LightboxSurface :src="activeImage.src" :alt="activeImage.alt" />
      </Lightbox>
    `,
    () => {
      const activeImage = ref(images[0]);
      const selectImage = ({ value }: { value: string | null }) => {
        activeImage.value = images.find((image) => image.id === value) ?? images[0];
      };
      return { activeImage, selectImage };
    },
  ),
};

export const RootProviderAndContext: Story = {
  render: renderStory(
    `
      <div :class="styles.stack">
        <button type="button" :class="styles.textTrigger" @click="lightbox.setOpen(true)">
          Lightbox is {{ lightbox.open ? 'open' : 'closed' }}
        </button>
        <LightboxRootProvider :value="lightbox">
          <LightboxBackdrop />
          <LightboxPositioner>
            <LightboxContent :aria-label="images[2].alt">
              <LightboxCloseIcon />
              <LightboxHeader>
                <LightboxTitle>{{ images[2].alt }}</LightboxTitle>
                <LightboxDescription>State comes from useLightbox.</LightboxDescription>
              </LightboxHeader>
              <LightboxBody>
                <LightboxImage :src="images[2].src" :alt="images[2].alt" />
              </LightboxBody>
              <LightboxFooter><LightboxStatus /></LightboxFooter>
            </LightboxContent>
          </LightboxPositioner>
        </LightboxRootProvider>
      </div>
    `,
    () => ({ lightbox: useLightbox() }),
  ),
};

export const BoundContent: Story = {
  render: renderStory(
    `
      <div ref="rootRef" :class="styles.gallery">
        <button v-for="image in images" :key="image.id" type="button" :class="styles.galleryTrigger">
          <img :src="image.src" :data-lightbox-src="image.src" :alt="image.alt" />
        </button>
      </div>
      <Lightbox lazy-mount unmount-on-exit>
        <LightboxBind :root-ref="() => rootRef" selector="button" :on-image-select="selectImage" />
        <LightboxBackdrop />
        <LightboxPositioner>
          <LightboxContent :aria-label="activeImage?.alt ?? 'Image preview'">
            <LightboxCloseIcon />
            <LightboxBody>
              <LightboxImage v-if="activeImage" :src="activeImage.src" :alt="activeImage.alt ?? ''" />
            </LightboxBody>
          </LightboxContent>
        </LightboxPositioner>
      </Lightbox>
    `,
    () => {
      const rootRef = ref<HTMLElement | null>(null);
      const activeImage = ref<LightboxImageSelectDetails | null>(null);
      const selectImage = (details: LightboxImageSelectDetails) => {
        activeImage.value = details;
      };
      return { activeImage, rootRef, selectImage };
    },
  ),
};

export const GalleryFromServerData: Story = {
  render: renderStory(
    `
      <Lightbox @trigger-value-change="selectImage">
        <div :class="styles.gallery">
          <LightboxTrigger
            v-for="image in images"
            :key="image.id"
            :value="image.id"
            as-child
          >
            <button type="button" :class="styles.galleryTrigger">
              <img :src="image.src" :alt="image.alt" />
            </button>
          </LightboxTrigger>
        </div>
        <LightboxBackdrop />
        <LightboxPositioner>
          <LightboxContent :aria-label="activeImage.alt">
            <LightboxCloseIcon />
            <LightboxBody>
              <LightboxGallery>
                <Carousel
                  aria-label="Server-driven image carousel"
                  :page="activeIndex"
                  :slide-count="images.length"
                  @page-change="activeIndex = $event.page"
                >
                  <CarouselControl>
                    <CarouselPrevTrigger />
                    <CarouselItemGroup>
                      <CarouselItem v-for="(image, index) in images" :key="image.id" :index="index">
                        <img :src="image.src" :alt="image.alt" />
                      </CarouselItem>
                    </CarouselItemGroup>
                    <CarouselNextTrigger />
                  </CarouselControl>
                  <CarouselIndicatorGroup>
                    <CarouselIndicator v-for="(image, index) in images" :key="image.id" :index="index">
                      <img :src="image.src" alt="" />
                    </CarouselIndicator>
                  </CarouselIndicatorGroup>
                </Carousel>
              </LightboxGallery>
            </LightboxBody>
          </LightboxContent>
        </LightboxPositioner>
      </Lightbox>
    `,
    () => {
      const activeIndex = ref(0);
      const activeImage = computed(() => images[activeIndex.value] ?? images[0]);
      const selectImage = ({ value }: { value: string | null }) => {
        const nextIndex = images.findIndex((image) => image.id === value);
        activeIndex.value = nextIndex >= 0 ? nextIndex : 0;
      };
      return { activeImage, activeIndex, selectImage };
    },
  ),
};

export const ClickToCloseImage: Story = {
  render: renderStory(`
    <Lightbox>
      <LightboxTrigger :class="styles.textTrigger">Open click-to-close lightbox</LightboxTrigger>
      <LightboxSurface :src="images[1].src" :alt="images[1].alt" close-on-click />
    </Lightbox>
  `),
};

export const CustomStyling: Story = {
  render: renderStory(`
    <Lightbox>
      <LightboxTrigger :class="styles.textTrigger">Open styled lightbox</LightboxTrigger>
      <LightboxBackdrop :class="styles.customBackdrop" />
      <LightboxPositioner>
        <LightboxContent :class="styles.customContent" :aria-label="images[1].alt">
          <LightboxCloseIcon :class="styles.customCloseIcon" />
          <LightboxBody>
            <LightboxImage :src="images[1].src" :alt="images[1].alt" />
          </LightboxBody>
        </LightboxContent>
      </LightboxPositioner>
    </Lightbox>
  `),
};