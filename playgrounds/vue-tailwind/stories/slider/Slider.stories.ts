import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent, ref } from 'vue';
import {
  Slider,
  SliderControl,
  SliderDraggingIndicator,
  SliderHiddenInput,
  SliderLabel,
  SliderMarker,
  SliderMarkerGroup,
  SliderRange,
  SliderRootProvider,
  SliderThumb,
  SliderThumbs,
  SliderTrack,
  SliderValueText,
  useSlider,
  useSliderContext,
} from '@/components/slider';

const markerValues = [0, 25, 50, 75, 100];
const getAriaValueText = ({ value }: { value: number }) => `$${value}`;

const stackClass = 'grid gap-4';
const headerClass = 'flex items-center justify-between gap-3';
const valueClass = 'text-sm leading-5 text-muted-foreground';
const verticalContainerClass = 'flex h-56';
const verticalSliderClass = 'h-48 w-auto';
const customSliderClass = 'w-64';
const customControlClass = 'min-h-6';
const customTrackClass =
  'h-2.5 bg-[color-mix(in_oklab,var(--color-chart-4)_18%,var(--color-muted))] ring-0';
const customRangeClass = 'bg-chart-4';
const customThumbClass = 'size-5 border-background bg-chart-4';

const meta = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Slider>;

export default meta;

type Story = StoryObj<typeof meta>;

const sliderComponents: Record<string, any> = {
  Slider,
  SliderControl,
  SliderDraggingIndicator,
  SliderHiddenInput,
  SliderLabel,
  SliderMarker,
  SliderMarkerGroup,
  SliderRange,
  SliderRootProvider,
  SliderThumb,
  SliderThumbs,
  SliderTrack,
  SliderValueText,
};

const SliderContextStatus = defineComponent({
  components: sliderComponents,
  setup() {
    return { slider: useSliderContext(), headerClass, valueClass };
  },
  template: `
    <div :class="headerClass">
      <SliderLabel>Dragging: {{ String(slider.dragging) }}</SliderLabel>
      <span :class="valueClass">{{ slider.value.join(', ') }}</span>
    </div>
  `,
});

const storyComponents = { ...sliderComponents, SliderContextStatus };

function renderStory(template: string, setup?: () => Record<string, unknown>) {
  return () =>
    defineComponent({
      components: storyComponents,
      setup() {
        return {
          getAriaValueText,
          headerClass,
          markerValues,
          stackClass,
          valueClass,
          verticalContainerClass,
          verticalSliderClass,
          ...setup?.(),
        };
      },
      template,
    });
}

export const Basic: Story = {
  render: renderStory(`
    <Slider :default-value="[40]">
      <div :class="headerClass">
        <SliderLabel>Volume</SliderLabel>
        <SliderValueText />
      </div>
      <SliderControl>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb :index="0" aria-label="Volume">
          <SliderHiddenInput />
        </SliderThumb>
      </SliderControl>
    </Slider>
  `),
};

export const Controlled: Story = {
  render: renderStory(
    `
      <Slider v-model="value">
        <div :class="headerClass">
          <SliderLabel>Brightness</SliderLabel>
          <SliderValueText />
        </div>
        <SliderControl>
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          <SliderThumb :index="0" aria-label="Brightness">
            <SliderHiddenInput />
          </SliderThumb>
        </SliderControl>
      </Slider>
    `,
    () => ({ value: ref([24]) }),
  ),
};

export const Range: Story = {
  render: renderStory(
    `
      <Slider v-model="value" :min="0" :max="100">
        <SliderLabel>Price range</SliderLabel>
        <SliderControl>
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          <SliderThumb :index="0" aria-label="Minimum price">
            <SliderHiddenInput />
          </SliderThumb>
          <SliderThumb :index="1" aria-label="Maximum price">
            <SliderHiddenInput />
          </SliderThumb>
        </SliderControl>
        <SliderValueText />
      </Slider>
    `,
    () => ({ value: ref([20, 70]) }),
  ),
};

export const StepsAndConstraints: Story = {
  render: renderStory(`
    <Slider
      :default-value="[250, 750]"
      :min="0"
      :max="1000"
      :step="50"
      :min-steps-between-thumbs="2"
      thumb-collision-behavior="push"
      :get-aria-value-text="getAriaValueText"
    >
      <div :class="headerClass">
        <SliderLabel>Budget</SliderLabel>
        <SliderValueText />
      </div>
      <SliderControl>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb :index="0" aria-label="Minimum budget">
          <SliderHiddenInput />
        </SliderThumb>
        <SliderThumb :index="1" aria-label="Maximum budget">
          <SliderHiddenInput />
        </SliderThumb>
      </SliderControl>
    </Slider>
  `),
};

export const Marks: Story = {
  render: renderStory(`
    <Slider :default-value="[50]">
      <div :class="headerClass">
        <SliderLabel>Progress</SliderLabel>
        <SliderValueText />
      </div>
      <SliderControl>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb :index="0" aria-label="Progress">
          <SliderHiddenInput />
        </SliderThumb>
      </SliderControl>
      <SliderMarkerGroup>
        <SliderMarker v-for="value in markerValues" :key="value" :value="value">{{ value }}</SliderMarker>
      </SliderMarkerGroup>
    </Slider>
  `),
};

export const DraggingIndicator: Story = {
  render: renderStory(`
    <Slider :default-value="[40]">
      <SliderLabel>Gain</SliderLabel>
      <SliderControl>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb :index="0" aria-label="Gain">
          <SliderDraggingIndicator />
          <SliderHiddenInput />
        </SliderThumb>
      </SliderControl>
    </Slider>
  `),
};

export const Vertical: Story = {
  render: renderStory(`
    <div :class="verticalContainerClass">
      <Slider orientation="vertical" :default-value="[60]" :class="verticalSliderClass">
        <SliderLabel>Output</SliderLabel>
        <SliderValueText />
        <SliderControl>
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          <SliderThumb :index="0" aria-label="Output">
            <SliderHiddenInput />
          </SliderThumb>
        </SliderControl>
      </Slider>
    </div>
  `),
};

export const VerticalWithMarks: Story = {
  render: renderStory(`
    <Slider orientation="vertical" :default-value="[50]" :class="verticalSliderClass">
      <SliderLabel>Output</SliderLabel>
      <SliderValueText />
      <SliderControl>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumbs />
      </SliderControl>
      <SliderMarkerGroup>
        <SliderMarker v-for="value in markerValues" :key="value" :value="value">{{ value }}</SliderMarker>
      </SliderMarkerGroup>
    </Slider>
  `),
};

export const Disabled: Story = {
  render: renderStory(`
    <Slider :default-value="[32]" disabled>
      <div :class="headerClass">
        <SliderLabel>Notifications</SliderLabel>
        <SliderValueText />
      </div>
      <SliderControl>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb :index="0" aria-label="Notifications">
          <SliderHiddenInput />
        </SliderThumb>
      </SliderControl>
    </Slider>
  `),
};

export const Invalid: Story = {
  render: renderStory(`
    <Slider :default-value="[32]" invalid>
      <div :class="headerClass">
        <SliderLabel>Invalid volume</SliderLabel>
        <SliderValueText />
      </div>
      <SliderControl>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumbs />
      </SliderControl>
      <SliderMarkerGroup>
        <SliderMarker v-for="value in [0, 50, 100]" :key="value" :value="value">{{ value }}</SliderMarker>
      </SliderMarkerGroup>
    </Slider>
  `),
};

export const ReadOnly: Story = {
  render: renderStory(`
    <Slider :default-value="[32]" read-only>
      <div :class="headerClass">
        <SliderLabel>Read-only volume</SliderLabel>
        <SliderValueText />
      </div>
      <SliderControl>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumbs />
      </SliderControl>
    </Slider>
  `),
};

export const Context: Story = {
  render: renderStory(`
    <Slider :default-value="[40]">
      <SliderContextStatus />
      <SliderControl>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb :index="0" aria-label="Context value">
          <SliderHiddenInput />
        </SliderThumb>
      </SliderControl>
    </Slider>
  `),
};

const RootProviderStory = defineComponent({
  components: storyComponents,
  setup() {
    return { slider: useSlider({ defaultValue: [40] }), stackClass };
  },
  template: `
    <div :class="stackClass">
      <button type="button" @click="slider.focus()">Focus</button>
      <SliderRootProvider :value="slider">
        <SliderLabel>Volume</SliderLabel>
        <SliderValueText />
        <SliderControl>
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          <SliderThumb :index="0" aria-label="Volume">
            <SliderHiddenInput />
          </SliderThumb>
        </SliderControl>
      </SliderRootProvider>
    </div>
  `,
});

export const RootProvider: Story = {
  render: () => RootProviderStory,
};

export const AsChild: Story = {
  render: renderStory(`
    <Slider as-child :default-value="[40]">
      <section>
        <div :class="headerClass">
          <SliderLabel>Volume</SliderLabel>
          <SliderValueText />
        </div>
        <SliderControl>
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          <SliderThumb as-child :index="0" aria-label="Volume">
            <span><SliderHiddenInput /></span>
          </SliderThumb>
        </SliderControl>
      </section>
    </Slider>
  `),
};

export const CustomStyling: Story = {
  render: renderStory(
    `
    <Slider :default-value="[56]" :class="customSliderClass">
      <SliderLabel>Temperature</SliderLabel>
      <SliderValueText />
      <SliderControl :class="customControlClass">
        <SliderTrack :class="customTrackClass">
          <SliderRange :class="customRangeClass" />
        </SliderTrack>
        <SliderThumb :index="0" aria-label="Temperature" :class="customThumbClass">
          <SliderHiddenInput />
        </SliderThumb>
      </SliderControl>
    </Slider>
  `,
    () => ({
      customControlClass,
      customRangeClass,
      customSliderClass,
      customThumbClass,
      customTrackClass,
    }),
  ),
};