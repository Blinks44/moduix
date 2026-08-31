import { createSignal } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import {
  Accordion,
  useAccordion,
  useAccordionContext,
  useAccordionItemContext,
} from '@/components/accordion/Accordion';
import styles from './Accordion.stories.module.css';

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
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

function FaqAccordionItems(props: { disabledValue?: string }) {
  return faqItems.map((item) => (
    <Accordion.Item value={item.value} disabled={item.value === props.disabledValue}>
      <Accordion.ItemTrigger>
        {item.title}
        <Accordion.ItemIndicator />
      </Accordion.ItemTrigger>
      <Accordion.ItemContent>
        <Accordion.ItemBody>{item.description}</Accordion.ItemBody>
      </Accordion.ItemContent>
    </Accordion.Item>
  ));
}

function AccordionState() {
  const accordion = useAccordionContext();

  return <output class={styles.state}>Open sections: {accordion().value.join(', ')}</output>;
}

function AccordionItemState() {
  const item = useAccordionItemContext();

  return <span>{item().expanded ? 'Open' : 'Closed'}</span>;
}

export const Basic: Story = {
  render: () => (
    <Accordion defaultValue={['what-is-ark-ui']} class={styles.demoRoot}>
      <FaqAccordionItems />
    </Accordion>
  ),
};

export const Collapsible: Story = {
  render: () => (
    <Accordion defaultValue={['what-is-ark-ui']} collapsible class={styles.demoRoot}>
      <FaqAccordionItems />
    </Accordion>
  ),
};

export const ContextState: Story = {
  render: () => (
    <Accordion defaultValue={['what-is-ark-ui']} class={styles.demoRoot}>
      <AccordionState />
      {faqItems.map((item) => (
        <Accordion.Item value={item.value}>
          <Accordion.ItemTrigger>
            {item.title}
            <AccordionItemState />
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Accordion.ItemBody>{item.description}</Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>
      ))}
    </Accordion>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = createSignal<string[]>(['getting-started']);

    return (
      <Accordion
        value={value()}
        onValueChange={(details) => setValue(details.value)}
        class={styles.demoRoot}
      >
        <FaqAccordionItems />
      </Accordion>
    );
  },
};

export const DisabledItem: Story = {
  render: () => (
    <Accordion defaultValue={['what-is-ark-ui']} class={styles.demoRoot}>
      <FaqAccordionItems disabledValue="getting-started" />
    </Accordion>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <Accordion orientation="horizontal" defaultValue={['what-is-ark-ui']} class={styles.demoRoot}>
      <FaqAccordionItems />
    </Accordion>
  ),
};

export const LazyMount: Story = {
  render: () => (
    <Accordion lazyMount unmountOnExit class={styles.demoRoot}>
      <FaqAccordionItems />
    </Accordion>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Accordion multiple defaultValue={['what-is-ark-ui', 'can-i-use-it']} class={styles.demoRoot}>
      <FaqAccordionItems />
    </Accordion>
  ),
};

export const RootProvider: Story = {
  render: () => {
    const accordion = useAccordion({ defaultValue: ['what-is-ark-ui'] });

    return (
      <>
        <div class={styles.state}>Open sections: {accordion().value.join(', ')}</div>
        <Accordion.RootProvider value={accordion} class={styles.demoRoot}>
          <FaqAccordionItems />
        </Accordion.RootProvider>
      </>
    );
  },
};

export const ContentStress: Story = {
  render: () => (
    <Accordion defaultValue={['long-content']} class={styles.demoRoot}>
      <Accordion.Item value="long-content">
        <Accordion.ItemTrigger>
          How does Accordion behave when a heading wraps across several lines in a narrow container?
          <Accordion.ItemIndicator />
        </Accordion.ItemTrigger>
        <Accordion.ItemContent>
          <Accordion.ItemBody>
            Long headings wrap without displacing the indicator, and multiline panel content keeps
            its spacing while the container narrows.
          </Accordion.ItemBody>
        </Accordion.ItemContent>
      </Accordion.Item>
    </Accordion>
  ),
};