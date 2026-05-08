import type { AccordionProps } from 'moduix';
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
  AccordionTriggerIcon,
  ChevronDownIcon,
} from 'moduix';
import * as React from 'react';
import type { CssPropertyInput } from '../preview';
import styles from './accordion.module.css';

const accordionItems = [
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

export const accordionCssProperties: CssPropertyInput[] = [
  ['--accordion-width', '24rem', 'Controls the root accordion width.'],
  ['--accordion-max-width', 'calc(100vw - 8rem)', 'Controls the root accordion max width.'],
  ['--accordion-color', 'var(--color-foreground)', 'Controls accordion text color.'],
  ['--accordion-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled item opacity.'],
  [
    '--accordion-item-border-color',
    'var(--color-border)',
    'Controls the separator color between accordion items.',
  ],
  [
    '--accordion-trigger-gap',
    'var(--spacing-4)',
    'Controls spacing between trigger content and icon.',
  ],
  ['--accordion-trigger-padding-y', 'var(--spacing-2)', 'Controls trigger vertical padding.'],
  [
    '--accordion-trigger-padding-x-start',
    'var(--spacing-3)',
    'Controls trigger start-side horizontal padding.',
  ],
  [
    '--accordion-trigger-padding-x-end',
    'var(--spacing-1)',
    'Controls trigger end-side horizontal padding.',
  ],
  ['--accordion-trigger-bg', 'var(--color-muted)', 'Controls trigger background color.'],
  [
    '--accordion-trigger-bg-hover',
    'var(--color-accent)',
    'Controls trigger background color on hover.',
  ],
  ['--accordion-trigger-font-size', 'var(--text-md)', 'Controls trigger text font size.'],
  [
    '--accordion-trigger-line-height',
    'var(--line-height-text-md)',
    'Controls trigger text line height.',
  ],
  ['--accordion-focus-ring-color', 'var(--color-ring)', 'Controls trigger focus ring color.'],
  ['--accordion-icon-size', '0.75rem', 'Controls trigger icon size.'],
  ['--accordion-icon-margin-right', 'var(--spacing-2)', 'Controls trigger icon right margin.'],
  ['--accordion-icon-transition', 'var(--transition-default)', 'Controls trigger icon transition.'],
  [
    '--accordion-icon-open-transform',
    'rotate(45deg) scale(1.1)',
    'Controls trigger icon transform when the panel is open.',
  ],
  ['--accordion-panel-color', 'var(--color-muted-foreground)', 'Controls panel text color.'],
  ['--accordion-panel-font-size', 'var(--text-md)', 'Controls panel text font size.'],
  [
    '--accordion-panel-line-height',
    'var(--line-height-text-md)',
    'Controls panel text line height.',
  ],
  [
    '--accordion-panel-transition',
    'var(--transition-default)',
    'Controls panel open and close transition.',
  ],
];

export function AccordionExample(props: AccordionProps<string>) {
  return (
    <Accordion {...props}>
      {accordionItems.map((item) => (
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
}

export function ControlledAccordionExample() {
  const [value, setValue] = React.useState(['getting-started']);

  return <AccordionExample value={value} onValueChange={setValue} />;
}

export function DisabledItemAccordionExample() {
  return (
    <Accordion defaultValue={['what-is-base-ui']}>
      {accordionItems.map((item) => (
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
}

export function CustomStylesAccordionExample() {
  return (
    <Accordion defaultValue={['what-is-base-ui']}>
      {accordionItems.map((item) => (
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
}