import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { ChevronDownIcon } from '@/icons/ui';
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
  AccordionTriggerIcon,
} from './Accordion';
import styles from './Accordion.stories.module.css';

const meta = {
  title: 'Components/Accordion',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const faqItems = [
  {
    value: 'what-is-base-ui',
    title: 'What is Base UI?',
    description:
      'Base UI is a library of high-quality unstyled React components for design systems and web apps.',
  },
  {
    value: 'getting-started',
    title: 'How do I get started?',
    description:
      'Head to the Quick start guide in the docs. If you have used unstyled libraries before, you will feel at home.',
  },
  {
    value: 'can-i-use-it',
    title: 'Can I use it for my project?',
    description: 'Of course. Base UI is free and open source.',
  },
];

export const Basic: Story = {
  render: () => {
    return (
      <Accordion defaultValue={['what-is-base-ui']}>
        {faqItems.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionHeader>
              <AccordionTrigger>
                {item.title}
                <AccordionTriggerIcon />
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionPanel>
              <div className={styles.panelContent}>{item.description}</div>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    );
  },
};

export const Multiple: Story = {
  render: () => {
    return (
      <Accordion multiple defaultValue={['what-is-base-ui', 'can-i-use-it']}>
        {faqItems.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionHeader>
              <AccordionTrigger>
                {item.title}
                <AccordionTriggerIcon />
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionPanel>
              <div className={styles.panelContent}>{item.description}</div>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    );
  },
};

export const DisabledItem: Story = {
  render: () => {
    return (
      <Accordion defaultValue={['what-is-base-ui']}>
        {faqItems.map((item) => (
          <AccordionItem
            key={item.value}
            value={item.value}
            disabled={item.value === 'getting-started'}
          >
            <AccordionHeader>
              <AccordionTrigger>
                {item.title}
                <AccordionTriggerIcon />
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionPanel>
              <div className={styles.panelContent}>{item.description}</div>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState<string[]>(['getting-started']);

    return (
      <Accordion value={value} onValueChange={setValue}>
        {faqItems.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionHeader>
              <AccordionTrigger>
                {item.title}
                <AccordionTriggerIcon />
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionPanel>
              <div className={styles.panelContent}>{item.description}</div>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    );
  },
};

export const CustomComposition: Story = {
  render: () => {
    return (
      <Accordion defaultValue={['what-is-base-ui']}>
        {faqItems.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionHeader>
              <AccordionTrigger>
                {item.title}
                <AccordionTriggerIcon className={styles.customIcon}>
                  <ChevronDownIcon />
                </AccordionTriggerIcon>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionPanel>
              <div className={styles.panelContent}>{item.description}</div>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    );
  },
};