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

const markerValues = Array.from({ length: 8 }, (_, index) => index * 45);

const meta = {
  title: 'Components/AngleSlider',
  component: AngleSlider,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof AngleSlider>;

export default meta;

type Story = StoryObj<typeof meta>;

const demoRootClass = '[&_[data-slot=angle-slider-control]]:w-36';
const stressRootClass = 'max-w-48 [&_[data-slot=angle-slider-control]]:w-36';
const customControlClass =
  'w-40 bg-[color-mix(in_oklab,var(--color-chart-4)_16%,var(--color-muted))] after:inset-4 after:bg-[color-mix(in_oklab,var(--color-chart-4)_10%,var(--color-card))]';
const customThumbClass =
  'before:top-4 before:size-[1.125rem] before:border-background before:bg-chart-4 after:top-[2.375rem] after:h-[calc(50%-2.5rem)] after:from-chart-4';
const customMarkerClass =
  'before:top-4.5 before:bg-[color-mix(in_oklab,var(--color-chart-4)_18%,var(--color-border))] data-[state=under-value]:before:bg-[color-mix(in_oklab,var(--color-chart-4)_65%,var(--color-foreground))]';
const providerLayoutClass = 'flex items-center gap-8';
const providerButtonClass =
  'min-h-10 cursor-pointer rounded-md border border-border bg-background px-4 text-foreground [font:inherit] hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring';
const formClass = 'grid justify-items-center gap-3';
const formActionsClass = 'flex flex-wrap items-center justify-center gap-2';

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
        return {
          demoRootClass,
          formActionsClass,
          formClass,
          markerValues,
          providerButtonClass,
          providerLayoutClass,
          stressRootClass,
          ...setup?.(),
        };
      },
      template,
    });
}

export const Basic: Story = {
  render: renderStory(`
    <AngleSlider :default-value="135" aria-label="Rotation" :class="demoRootClass">
      <AngleSliderDial />
      <AngleSliderHiddenInput />
    </AngleSlider>
  `),
};

export const AsChild: Story = {
  render: renderStory(`
    <AngleSlider as-child :default-value="135" aria-label="Rotation" :class="demoRootClass">
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
      <AngleSlider v-model="value" aria-label="Heading" :class="demoRootClass">
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
    <AngleSlider :default-value="45" disabled aria-label="Disabled rotation" :class="demoRootClass">
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

    return {
      demoRootClass,
      formActionsClass,
      formClass,
      handleReset,
      handleSubmit,
      markerValues,
      submitted,
    };
  },
  template: `
    <form :class="formClass" @reset="handleReset" @submit.prevent="handleSubmit">
      <AngleSlider :default-value="135" aria-label="Rotation" name="rotation" :class="demoRootClass">
        <AngleSliderLabel>Rotation</AngleSliderLabel>
        <AngleSliderDial><AngleSliderMarks :values="markerValues" /></AngleSliderDial>
        <AngleSliderHiddenInput />
      </AngleSlider>
      <div :class="formActionsClass">
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
    <AngleSlider :default-value="315" invalid aria-label="Invalid heading" :class="demoRootClass">
      <AngleSliderLabel>Heading</AngleSliderLabel>
      <AngleSliderMarkedParts />
    </AngleSlider>
  `),
};

export const ReadOnly: Story = {
  render: renderStory(`
    <AngleSlider :default-value="300" read-only aria-label="Locked angle" :class="demoRootClass">
      <AngleSliderLabel>Locked angle</AngleSliderLabel>
      <AngleSliderMarkedParts />
    </AngleSlider>
  `),
};

const RootProviderStory = defineComponent({
  components: storyComponents,
  setup() {
    const angleSlider = useAngleSlider({ defaultValue: 45, 'aria-label': 'Rotation' });

    return { angleSlider, demoRootClass, providerButtonClass, providerLayoutClass };
  },
  template: `
    <div :class="providerLayoutClass">
      <AngleSliderRootProvider :value="angleSlider" :class="demoRootClass">
        <AngleSliderLabel>Rotation</AngleSliderLabel>
        <AngleSliderMarkedParts />
      </AngleSliderRootProvider>
      <button type="button" :class="providerButtonClass" @click="angleSlider.setValue(90)">
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
    <AngleSlider :default-value="60" :step="15" aria-label="Snap angle" :class="demoRootClass">
      <AngleSliderLabel>Snap angle</AngleSliderLabel>
      <AngleSliderMarkedParts />
    </AngleSlider>
  `),
};

export const WithMarks: Story = {
  render: renderStory(`
    <AngleSlider :default-value="135" aria-label="Rotation" :class="demoRootClass">
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
      :class="stressRootClass"
    >
      <AngleSliderLabel>Direction of the primary studio spotlight</AngleSliderLabel>
      <AngleSliderMarkedParts />
    </AngleSlider>
  `),
};

export const CustomStyling: Story = {
  render: renderStory(
    `
    <AngleSlider :default-value="45" aria-label="Compass heading">
      <AngleSliderLabel>Compass</AngleSliderLabel>
      <AngleSliderControl :class="customControlClass">
        <AngleSliderValueText />
        <AngleSliderMarkerGroup>
          <AngleSliderMarker
            v-for="value in markerValues"
            :key="value"
            :value="value"
            :class="customMarkerClass"
          />
        </AngleSliderMarkerGroup>
        <AngleSliderThumb :class="customThumbClass" />
      </AngleSliderControl>
      <AngleSliderHiddenInput />
    </AngleSlider>
  `,
    () => ({ customControlClass, customMarkerClass, customThumbClass }),
  ),
};