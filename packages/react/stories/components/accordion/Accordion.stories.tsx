import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { Accordion, useAccordion } from '@/components/accordion/Accordion';
import { Slider } from '@/components/slider';
import { ChevronDownIcon } from '@/lib/moduix/icons/ui';
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
      <Accordion defaultValue={['what-is-ark-ui']} className={styles.demoRoot}>
        <FaqAccordionItems />
      </Accordion>
    );
  },
};

export const Collapsible: Story = {
  render: () => {
    return (
      <Accordion defaultValue={['what-is-ark-ui']} collapsible className={styles.demoRoot}>
        <FaqAccordionItems />
      </Accordion>
    );
  },
};

export const ContextState: Story = {
  render: () => {
    return (
      <Accordion defaultValue={['what-is-ark-ui']} className={styles.demoRoot}>
        <Accordion.Context>
          {(context) => (
            <output className={styles.state}>Open sections: {context.value.join(', ')}</output>
          )}
        </Accordion.Context>
        {faqItems.map((item) => (
          <Accordion.Item key={item.value} value={item.value}>
            <Accordion.ItemTrigger>
              {item.title}
              <Accordion.ItemContext>
                {(context) => <span>{context.expanded ? 'Open' : 'Closed'}</span>}
              </Accordion.ItemContext>
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>
              <Accordion.ItemBody>{item.description}</Accordion.ItemBody>
            </Accordion.ItemContent>
          </Accordion.Item>
        ))}
      </Accordion>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['getting-started']);

    return (
      <Accordion
        value={value}
        onValueChange={(details) => setValue(details.value)}
        className={styles.demoRoot}
      >
        <FaqAccordionItems />
      </Accordion>
    );
  },
};

export const DisabledItem: Story = {
  render: () => {
    return (
      <Accordion defaultValue={['what-is-ark-ui']} className={styles.demoRoot}>
        <FaqAccordionItems disabledValue="getting-started" />
      </Accordion>
    );
  },
};

export const Horizontal: Story = {
  render: () => {
    return (
      <Accordion
        orientation="horizontal"
        defaultValue={['what-is-ark-ui']}
        className={styles.demoRoot}
      >
        <FaqAccordionItems />
      </Accordion>
    );
  },
};

export const LazyMount: Story = {
  render: () => {
    return (
      <Accordion lazyMount unmountOnExit className={styles.demoRoot}>
        <FaqAccordionItems />
      </Accordion>
    );
  },
};

export const Multiple: Story = {
  render: () => {
    return (
      <Accordion
        multiple
        defaultValue={['what-is-ark-ui', 'can-i-use-it']}
        className={styles.demoRoot}
      >
        <FaqAccordionItems />
      </Accordion>
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
      <Accordion defaultValue={['what-is-ark-ui']} className={styles.demoRoot}>
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
      </Accordion>
    );
  },
};

export const ContentStress: Story = {
  render: () => {
    return (
      <Accordion defaultValue={['long-content']} className={styles.demoRoot}>
        <Accordion.Item value="long-content">
          <Accordion.ItemTrigger>
            How does Accordion behave when a heading wraps across several lines in a narrow
            container?
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
    );
  },
};

export const CustomStyling: Story = {
  render: () => {
    return (
      <Accordion defaultValue={['what-is-ark-ui']} className={styles.demoRoot}>
        <FaqAccordionItems icon={<ChevronDownIcon />} iconClassName={styles.customIcon} />
      </Accordion>
    );
  },
};