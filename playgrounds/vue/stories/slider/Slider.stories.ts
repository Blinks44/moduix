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
import styles from './Slider.stories.module.css';

const markerValues = [0, 25, 50, 75, 100];
const getAriaValueText = ({ value }: { value: number }) => `$${value}`;

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
    return { slider: useSliderContext(), styles };
  },
  template: `
    <div :class="styles.header">
      <SliderLabel>Dragging: {{ String(slider.dragging) }}</SliderLabel>
      <span :class="styles.value">{{ slider.value.join(', ') }}</span>
    </div>
  `,
});

const storyComponents = { ...sliderComponents, SliderContextStatus };

function renderStory(template: string, setup?: () => Record<string, unknown>) {
  return () =>
    defineComponent({
      components: storyComponents,
      setup() {
        return { markerValues, styles, getAriaValueText, ...setup?.() };
      },
      template,
    });
}

export const Basic: Story = {
  render: renderStory(`
    <Slider :default-value="[40]">
      <div :class="styles.header">
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
        <div :class="styles.header">
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
      <div :class="styles.header">
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
      <div :class="styles.header">
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
    <div :class="styles.verticalContainer">
      <Slider orientation="vertical" :default-value="[60]" :class="styles.verticalSlider">
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
    <Slider orientation="vertical" :default-value="[50]" :class="styles.verticalSlider">
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
      <div :class="styles.header">
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
      <div :class="styles.header">
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
      <div :class="styles.header">
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
    return { slider: useSlider({ defaultValue: [40] }), styles };
  },
  template: `
    <div :class="styles.stack">
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
        <div :class="styles.header">
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
  render: renderStory(`
    <Slider :default-value="[56]" :class="styles.customSlider">
      <SliderLabel>Temperature</SliderLabel>
      <SliderValueText />
      <SliderControl :class="styles.customControl">
        <SliderTrack :class="styles.customTrack">
          <SliderRange :class="styles.customRange" />
        </SliderTrack>
        <SliderThumb :index="0" aria-label="Temperature" :class="styles.customThumb">
          <SliderHiddenInput />
        </SliderThumb>
      </SliderControl>
    </Slider>
  `),
};