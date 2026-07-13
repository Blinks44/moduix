import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { ChevronDownIcon } from '@/lib/moduix/icons/ui';
import { Slider } from '../slider';
import { Accordion, useAccordion } from './Accordion';
import styles from './Accordion.stories.module.css';

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
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

function FaqAccordionItems({
  disabledValue,
  icon,
  iconClassName,
}: {
  disabledValue?: string;
  icon?: ReactNode;
  iconClassName?: string;
}) {
  return faqItems.map((item) => (
    <Accordion.Item key={item.value} value={item.value} disabled={item.value === disabledValue}>
      <Accordion.ItemTrigger>
        {item.title}
        <Accordion.ItemIndicator className={iconClassName}>{icon}</Accordion.ItemIndicator>
      </Accordion.ItemTrigger>
      <Accordion.ItemContent>
        <Accordion.ItemBody>{item.description}</Accordion.ItemBody>
      </Accordion.ItemContent>
    </Accordion.Item>
  ));
}

export const Basic: Story = {
  render: () => {
    return (
      <Accordion.Root defaultValue={['what-is-ark-ui']} className={styles.demoRoot}>
        <FaqAccordionItems />
      </Accordion.Root>
    );
  },
};

export const Collapsible: Story = {
  render: () => {
    return (
      <Accordion.Root defaultValue={['what-is-ark-ui']} collapsible className={styles.demoRoot}>
        <FaqAccordionItems />
      </Accordion.Root>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['getting-started']);

    return (
      <Accordion.Root
        value={value}
        onValueChange={(details) => setValue(details.value)}
        className={styles.demoRoot}
      >
        <FaqAccordionItems />
      </Accordion.Root>
    );
  },
};

export const DisabledItem: Story = {
  render: () => {
    return (
      <Accordion.Root defaultValue={['what-is-ark-ui']} className={styles.demoRoot}>
        <FaqAccordionItems disabledValue="getting-started" />
      </Accordion.Root>
    );
  },
};

export const Horizontal: Story = {
  render: () => {
    return (
      <Accordion.Root
        orientation="horizontal"
        defaultValue={['what-is-ark-ui']}
        className={styles.demoRoot}
      >
        <FaqAccordionItems />
      </Accordion.Root>
    );
  },
};

export const LazyMount: Story = {
  render: () => {
    return (
      <Accordion.Root lazyMount unmountOnExit className={styles.demoRoot}>
        <FaqAccordionItems />
      </Accordion.Root>
    );
  },
};

export const Multiple: Story = {
  render: () => {
    return (
      <Accordion.Root
        multiple
        defaultValue={['what-is-ark-ui', 'can-i-use-it']}
        className={styles.demoRoot}
      >
        <FaqAccordionItems />
      </Accordion.Root>
    );
  },
};

export const RootProvider: Story = {
  render: () => {
    const accordion = useAccordion({ defaultValue: ['what-is-ark-ui'] });

    return (
      <>
        <div className={styles.state}>Open sections: {accordion.value.join(', ')}</div>
        <Accordion.RootProvider value={accordion} className={styles.demoRoot}>
          <FaqAccordionItems />
        </Accordion.RootProvider>
      </>
    );
  },
};

export const AdvancedCustomization: Story = {
  render: () => {
    return (
      <Accordion.Root defaultValue={['what-is-ark-ui']} className={styles.demoRoot}>
        {faqItems.map((item) => (
          <Accordion.Item key={item.value} value={item.value}>
            <Accordion.ItemTrigger>
              {item.title}
              <Accordion.ItemIndicator />
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>
              <Accordion.ItemBody>
                <span>{item.description}</span>
                <Slider defaultValue={[40]}>
                  <Slider.Label>{item.title} priority</Slider.Label>
                  <Slider.Control>
                    <Slider.Track>
                      <Slider.Range />
                    </Slider.Track>
                    <Slider.Thumb index={0}></Slider.Thumb>
                  </Slider.Control>
                </Slider>
              </Accordion.ItemBody>
            </Accordion.ItemContent>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    );
  },
};

export const CustomStyling: Story = {
  render: () => {
    return (
      <Accordion.Root defaultValue={['what-is-ark-ui']} className={styles.demoRoot}>
        <FaqAccordionItems icon={<ChevronDownIcon />} iconClassName={styles.customIcon} />
      </Accordion.Root>
    );
  },
};