import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { ChevronDownIcon } from '@/lib/moduix/icons/ui';
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
    <AccordionItem key={item.value} value={item.value} disabled={item.value === disabledValue}>
      <AccordionHeader>
        <AccordionTrigger>
          {item.title}
          <AccordionTriggerIcon className={iconClassName}>{icon}</AccordionTriggerIcon>
        </AccordionTrigger>
      </AccordionHeader>
      <AccordionPanel>
        <div className={styles.panelContent}>{item.description}</div>
      </AccordionPanel>
    </AccordionItem>
  ));
}

export const Basic: Story = {
  render: () => {
    return (
      <Accordion defaultValue={['what-is-base-ui']} className={styles.demoRoot}>
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
        defaultValue={['what-is-base-ui', 'can-i-use-it']}
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
      <Accordion defaultValue={['what-is-base-ui']} className={styles.demoRoot}>
        <FaqAccordionItems disabledValue="getting-started" />
      </Accordion>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['getting-started']);

    return (
      <Accordion value={value} onValueChange={setValue} className={styles.demoRoot}>
        <FaqAccordionItems />
      </Accordion>
    );
  },
};

export const CustomStyling: Story = {
  render: () => {
    return (
      <Accordion defaultValue={['what-is-base-ui']} className={styles.demoRoot}>
        <FaqAccordionItems icon={<ChevronDownIcon />} iconClassName={styles.customIcon} />
      </Accordion>
    );
  },
};