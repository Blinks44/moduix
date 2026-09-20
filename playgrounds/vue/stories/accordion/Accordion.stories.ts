import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent, ref } from 'vue';
import {
  Accordion,
  AccordionContext,
  AccordionItem,
  AccordionItemBody,
  AccordionItemContent,
  AccordionItemContext,
  AccordionItemIndicator,
  AccordionItemTrigger,
  AccordionRootProvider,
  useAccordion,
} from '@/components/accordion';
import { ChevronDownIcon } from '@/lib/moduix/icons/ui/Icons';
import styles from './Accordion.stories.module.css';

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

const faqItems = [
  {
    value: 'what-is-ark-ui',
    title: 'What is Ark UI?',
    description: 'Ark UI is a headless component library for building accessible web interfaces.',
  },
  {
    value: 'getting-started',
    title: 'How do I get started?',
    description: 'Install the package and compose the parts you need in your own UI layer.',
  },
  {
    value: 'can-i-use-it',
    title: 'Can I use it for my project?',
    description: 'Yes. Ark UI is open source and designed for production design systems.',
  },
];

const accordionComponents = {
  Accordion,
  AccordionContext,
  AccordionItem,
  AccordionItemBody,
  AccordionItemContent,
  AccordionItemContext,
  AccordionItemIndicator,
  AccordionItemTrigger,
  AccordionRootProvider,
  ChevronDownIcon,
};

const FaqAccordionItems = defineComponent({
  components: accordionComponents,
  props: {
    customIcon: Boolean,
    disabledValue: { type: String, default: undefined },
    iconClass: { type: String, default: undefined },
  },
  setup() {
    return { faqItems };
  },
  template: `
    <AccordionItem
      v-for="item in faqItems"
      :key="item.value"
      :disabled="item.value === disabledValue"
      :value="item.value"
    >
      <AccordionItemTrigger>
        {{ item.title }}
        <AccordionItemIndicator v-if="customIcon" :class="iconClass"><ChevronDownIcon /></AccordionItemIndicator>
        <AccordionItemIndicator v-else />
      </AccordionItemTrigger>
      <AccordionItemContent><AccordionItemBody>{{ item.description }}</AccordionItemBody></AccordionItemContent>
    </AccordionItem>
  `,
});

const storyComponents = { ...accordionComponents, FaqAccordionItems };

function renderStory(template: string, setup?: () => Record<string, unknown>) {
  return () =>
    defineComponent({
      components: storyComponents,
      setup() {
        return { faqItems, styles, ...setup?.() };
      },
      template,
    });
}

export const Basic: Story = {
  render: renderStory(`
    <Accordion :default-value="['what-is-ark-ui']" :class="styles.demoRoot">
      <FaqAccordionItems />
    </Accordion>
  `),
};

export const Collapsible: Story = {
  render: renderStory(`
    <Accordion :default-value="['what-is-ark-ui']" collapsible :class="styles.demoRoot">
      <FaqAccordionItems />
    </Accordion>
  `),
};

export const ContextState: Story = {
  render: renderStory(`
    <Accordion :default-value="['what-is-ark-ui']" :class="styles.demoRoot">
      <AccordionContext v-slot="context">
        <output :class="styles.state">Open sections: {{ context.value.join(', ') }}</output>
      </AccordionContext>
      <AccordionItem v-for="item in faqItems" :key="item.value" :value="item.value">
        <AccordionItemTrigger>
          {{ item.title }}
          <AccordionItemContext v-slot="context"><span>{{ context.expanded ? 'Open' : 'Closed' }}</span></AccordionItemContext>
        </AccordionItemTrigger>
        <AccordionItemContent><AccordionItemBody>{{ item.description }}</AccordionItemBody></AccordionItemContent>
      </AccordionItem>
    </Accordion>
  `),
};

export const Controlled: Story = {
  render: renderStory(
    `
      <Accordion v-model="value" :class="styles.demoRoot">
        <FaqAccordionItems />
      </Accordion>
    `,
    () => ({ value: ref(['getting-started']) }),
  ),
};

export const DisabledItem: Story = {
  render: renderStory(`
    <Accordion :default-value="['what-is-ark-ui']" :class="styles.demoRoot">
      <FaqAccordionItems disabled-value="getting-started" />
    </Accordion>
  `),
};

export const Horizontal: Story = {
  render: renderStory(`
    <Accordion orientation="horizontal" :default-value="['what-is-ark-ui']" :class="styles.demoRoot">
      <FaqAccordionItems />
    </Accordion>
  `),
};

export const LazyMount: Story = {
  render: renderStory(`
    <Accordion lazy-mount unmount-on-exit :class="styles.demoRoot"><FaqAccordionItems /></Accordion>
  `),
};

export const Multiple: Story = {
  render: renderStory(`
    <Accordion multiple :default-value="['what-is-ark-ui', 'can-i-use-it']" :class="styles.demoRoot">
      <FaqAccordionItems />
    </Accordion>
  `),
};

export const RootProvider: Story = {
  render: renderStory(
    `
      <div :class="styles.state">Open sections: {{ accordion.value.join(', ') }}</div>
      <AccordionRootProvider :value="accordion" :class="styles.demoRoot"><FaqAccordionItems /></AccordionRootProvider>
    `,
    () => ({ accordion: useAccordion({ defaultValue: ['what-is-ark-ui'] }) }),
  ),
};

export const AdvancedCustomization: Story = {
  render: renderStory(`
    <Accordion :default-value="['what-is-ark-ui']" :class="styles.demoRoot">
      <AccordionItem v-for="item in faqItems" :key="item.value" :value="item.value">
        <AccordionItemTrigger>{{ item.title }}<AccordionItemIndicator /></AccordionItemTrigger>
        <AccordionItemContent>
          <AccordionItemBody>
            <span>{{ item.description }}</span>
            <label>{{ item.title }} priority <input type="range" value="40" :class="styles.nestedControl" /></label>
          </AccordionItemBody>
        </AccordionItemContent>
      </AccordionItem>
    </Accordion>
  `),
};

export const ContentStress: Story = {
  render: renderStory(`
    <Accordion :default-value="['long-content']" :class="styles.demoRoot">
      <AccordionItem value="long-content">
        <AccordionItemTrigger>
          How does Accordion behave when a heading wraps across several lines in a narrow container?
          <AccordionItemIndicator />
        </AccordionItemTrigger>
        <AccordionItemContent>
          <AccordionItemBody>
            Long headings wrap without displacing the indicator, and multiline panel content keeps its spacing while the container narrows.
          </AccordionItemBody>
        </AccordionItemContent>
      </AccordionItem>
    </Accordion>
  `),
};

export const CustomStyling: Story = {
  render: renderStory(`
    <Accordion :default-value="['what-is-ark-ui']" :class="styles.demoRoot">
      <FaqAccordionItems custom-icon :icon-class="styles.customIcon" />
    </Accordion>
  `),
};