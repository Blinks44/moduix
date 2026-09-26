import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent, ref } from 'vue';
import {
  AngleSlider,
  AngleSliderControl,
  AngleSliderDial,
  AngleSliderHiddenInput,
  AngleSliderLabel,
  AngleSliderMarker,
  AngleSliderMarkerGroup,
  AngleSliderMarks,
  AngleSliderRootProvider,
  AngleSliderThumb,
  AngleSliderValueText,
  useAngleSlider,
} from '@/components/angle-slider';
import styles from './AngleSlider.stories.module.css';

const markerValues = Array.from({ length: 8 }, (_, index) => index * 45);

const meta = {
  title: 'Components/AngleSlider',
  component: AngleSlider,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof AngleSlider>;

export default meta;

type Story = StoryObj<typeof meta>;

const angleSliderComponents: Record<string, any> = {
  AngleSlider,
  AngleSliderControl,
  AngleSliderDial,
  AngleSliderHiddenInput,
  AngleSliderLabel,
  AngleSliderMarker,
  AngleSliderMarkerGroup,
  AngleSliderMarks,
  AngleSliderRootProvider,
  AngleSliderThumb,
  AngleSliderValueText,
};

const AngleSliderMarkedParts = defineComponent({
  components: angleSliderComponents,
  setup() {
    return { markerValues };
  },
  template: `
    <AngleSliderDial><AngleSliderMarks :values="markerValues" /></AngleSliderDial>
    <AngleSliderHiddenInput />
  `,
});

const storyComponents = { ...angleSliderComponents, AngleSliderMarkedParts };

function renderStory(template: string, setup?: () => Record<string, unknown>) {
  return () =>
    defineComponent({
      components: storyComponents,
      setup() {
        return { markerValues, styles, ...setup?.() };
      },
      template,
    });
}

export const Basic: Story = {
  render: renderStory(`
    <AngleSlider :default-value="135" aria-label="Rotation" :class="styles.demoRoot">
      <AngleSliderDial />
      <AngleSliderHiddenInput />
    </AngleSlider>
  `),
};

export const AsChild: Story = {
  render: renderStory(`
    <AngleSlider as-child :default-value="135" aria-label="Rotation" :class="styles.demoRoot">
      <section>
        <AngleSliderDial />
        <AngleSliderHiddenInput />
      </section>
    </AngleSlider>
  `),
};

export const Controlled: Story = {
  render: renderStory(
    `
      <AngleSlider v-model="value" aria-label="Heading" :class="styles.demoRoot">
        <AngleSliderLabel>Heading</AngleSliderLabel>
        <AngleSliderMarkedParts />
      </AngleSlider>
      <output>Angle: {{ value }}°</output>
    `,
    () => ({ value: ref(210) }),
  ),
};

export const Disabled: Story = {
  render: renderStory(`
    <AngleSlider :default-value="45" disabled aria-label="Disabled rotation" :class="styles.demoRoot">
      <AngleSliderLabel>Rotation</AngleSliderLabel>
      <AngleSliderMarkedParts />
    </AngleSlider>
  `),
};

const FormStory = defineComponent({
  components: angleSliderComponents,
  setup() {
    const submitted = ref('Nothing submitted');

    const handleSubmit = (event: SubmitEvent) => {
      const form = event.currentTarget as HTMLFormElement;
      submitted.value = `${String(new FormData(form).get('rotation') ?? '')}°`;
    };
    const handleReset = () => {
      submitted.value = 'Nothing submitted';
    };

    return { handleReset, handleSubmit, markerValues, styles, submitted };
  },
  template: `
    <form :class="styles.form" @reset="handleReset" @submit.prevent="handleSubmit">
      <AngleSlider :default-value="135" aria-label="Rotation" name="rotation" :class="styles.demoRoot">
        <AngleSliderLabel>Rotation</AngleSliderLabel>
        <AngleSliderDial><AngleSliderMarks :values="markerValues" /></AngleSliderDial>
        <AngleSliderHiddenInput />
      </AngleSlider>
      <div :class="styles.formActions">
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
        <output>Submitted: {{ submitted }}</output>
      </div>
    </form>
  `,
});

export const Form: Story = {
  render: () => FormStory,
};

export const Invalid: Story = {
  render: renderStory(`
    <AngleSlider :default-value="315" invalid aria-label="Invalid heading" :class="styles.demoRoot">
      <AngleSliderLabel>Heading</AngleSliderLabel>
      <AngleSliderMarkedParts />
    </AngleSlider>
  `),
};

export const ReadOnly: Story = {
  render: renderStory(`
    <AngleSlider :default-value="300" read-only aria-label="Locked angle" :class="styles.demoRoot">
      <AngleSliderLabel>Locked angle</AngleSliderLabel>
      <AngleSliderMarkedParts />
    </AngleSlider>
  `),
};

const RootProviderStory = defineComponent({
  components: storyComponents,
  setup() {
    const angleSlider = useAngleSlider({ defaultValue: 45, 'aria-label': 'Rotation' });

    return { angleSlider, styles };
  },
  template: `
    <div :class="styles.providerLayout">
      <AngleSliderRootProvider :value="angleSlider" :class="styles.demoRoot">
        <AngleSliderLabel>Rotation</AngleSliderLabel>
        <AngleSliderMarkedParts />
      </AngleSliderRootProvider>
      <button type="button" :class="styles.providerButton" @click="angleSlider.setValue(90)">
        Set to 90°
      </button>
    </div>
  `,
});

export const RootProvider: Story = {
  render: () => RootProviderStory,
};

export const Steps: Story = {
  render: renderStory(`
    <AngleSlider :default-value="60" :step="15" aria-label="Snap angle" :class="styles.demoRoot">
      <AngleSliderLabel>Snap angle</AngleSliderLabel>
      <AngleSliderMarkedParts />
    </AngleSlider>
  `),
};

export const WithMarks: Story = {
  render: renderStory(`
    <AngleSlider :default-value="135" aria-label="Rotation" :class="styles.demoRoot">
      <AngleSliderLabel>Rotation</AngleSliderLabel>
      <AngleSliderMarkedParts />
    </AngleSlider>
  `),
};

export const ContentStress: Story = {
  render: renderStory(`
    <AngleSlider
      :default-value="225"
      aria-label="Direction of the primary studio spotlight"
      :class="styles.stressRoot"
    >
      <AngleSliderLabel>Direction of the primary studio spotlight</AngleSliderLabel>
      <AngleSliderMarkedParts />
    </AngleSlider>
  `),
};

export const CustomStyling: Story = {
  render: renderStory(`
    <AngleSlider :default-value="45" aria-label="Compass heading" :class="styles.customRoot">
      <AngleSliderLabel>Compass</AngleSliderLabel>
      <AngleSliderMarkedParts />
    </AngleSlider>
  `),
};