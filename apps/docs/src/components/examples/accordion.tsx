import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
  AccordionTriggerIcon,
  ChevronDownIcon,
} from 'moduix';
import { useState, type ComponentProps, type ReactNode } from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';

export const accordionExampleCss = `
  .accordion-panel-content {
    padding: var(--spacing-3);
  }
`;

export const accordionCustomStylingCss = `
  .accordion-panel-content {
    padding: var(--spacing-3);
  }

  .accordion-custom-icon {
    --accordion-icon-open-transform: rotate(180deg);
  }
`;

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

export const accordionOverrideCssProperties: CssPropertyInput[] = [
  ['--accordion-color', 'var(--color-foreground)', 'Controls accordion text color.'],
  ['--accordion-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled item opacity.'],
  ['--accordion-focus-ring-color', 'var(--color-ring)', 'Controls trigger focus ring color.'],
  [
    '--accordion-focus-ring-offset',
    'var(--border-width-sm)',
    'Controls trigger focus ring offset from trigger edge.',
  ],
  [
    '--accordion-focus-ring-width',
    'var(--border-width-md)',
    'Controls trigger focus ring outline width.',
  ],
  [
    '--accordion-icon-open-transform',
    'rotate(45deg) scale(1.1)',
    'Controls trigger icon transform when the panel is open.',
  ],
  ['--accordion-icon-size', '0.75rem', 'Controls trigger icon size.'],
  ['--accordion-icon-transition', 'var(--transition-default)', 'Controls trigger icon transition.'],
  [
    '--accordion-item-border-color',
    'var(--color-border)',
    'Controls the separator color between accordion items.',
  ],
  [
    '--accordion-item-border-width',
    'var(--border-width-sm)',
    'Controls the separator width between accordion items.',
  ],
  ['--accordion-max-width', '100%', 'Controls the maximum accordion width.'],
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
  ['--accordion-trigger-bg', 'var(--color-muted)', 'Controls trigger background color.'],
  [
    '--accordion-trigger-bg-hover',
    'var(--color-accent)',
    'Controls trigger background color on hover.',
  ],
  ['--accordion-trigger-font-size', 'var(--text-md)', 'Controls trigger text font size.'],
  [
    '--accordion-trigger-gap',
    'var(--spacing-4)',
    'Controls spacing between trigger content and icon.',
  ],
  [
    '--accordion-trigger-line-height',
    'var(--line-height-text-md)',
    'Controls trigger text line height.',
  ],
  ['--accordion-trigger-padding-x', 'var(--spacing-3)', 'Controls trigger horizontal padding.'],
  ['--accordion-trigger-padding-y', 'var(--spacing-2)', 'Controls trigger vertical padding.'],
  ['--accordion-width', '22rem', 'Controls the default accordion width.'],
];

export const accordionPlaygroundCssProperties: CssPropertyInput[] = [
  ['--accordion-color', 'var(--color-foreground)', 'Controls accordion text color.'],
  ['--accordion-focus-ring-color', 'var(--color-ring)', 'Controls trigger focus ring color.'],
  ['--accordion-icon-size', '0.75rem', 'Controls trigger icon size.'],
  ['--accordion-item-border-color', 'var(--color-border)', 'Controls separator color.'],
  ['--accordion-item-border-width', 'var(--border-width-sm)', 'Controls separator width.'],
  ['--accordion-max-width', '100%', 'Controls the maximum accordion width.'],
  ['--accordion-panel-color', 'var(--color-muted-foreground)', 'Controls panel text color.'],
  ['--accordion-trigger-bg', 'var(--color-muted)', 'Controls trigger background color.'],
  ['--accordion-trigger-bg-hover', 'var(--color-accent)', 'Controls trigger hover background.'],
  ['--accordion-trigger-gap', 'var(--spacing-4)', 'Controls trigger content and icon spacing.'],
  ['--accordion-trigger-padding-x', 'var(--spacing-3)', 'Controls trigger horizontal padding.'],
  ['--accordion-trigger-padding-y', 'var(--spacing-2)', 'Controls trigger vertical padding.'],
  ['--accordion-width', '22rem', 'Controls the default accordion width.'],
];

const accordionCssPropertiesReference = accordionOverrideCssProperties.map(normalizeCssProperty);
const accordionCssPlaygroundReference = accordionPlaygroundCssProperties.map(normalizeCssProperty);

export function AccordionCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <div className="space-y-2">
      <CSSPropertiesReferenceTable properties={accordionCssPropertiesReference} />
    </div>
  );
}

export function AccordionCssPlaygroundPanel({
  values,
  onChange,
  onReset,
}: CSSPropertiesEditorContext) {
  return (
    <div className="space-y-2">
      <CSSPropertiesEditor
        properties={accordionCssPlaygroundReference}
        values={values}
        onChange={onChange}
        onReset={onReset}
      />
    </div>
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}

function AccordionItems({
  disabledValue,
  icon,
  iconClassName,
}: {
  disabledValue?: string;
  icon?: ReactNode;
  iconClassName?: string;
}) {
  return accordionItems.map((item) => (
    <AccordionItem key={item.value} value={item.value} disabled={item.value === disabledValue}>
      <AccordionHeader>
        <AccordionTrigger>
          {item.title}
          <AccordionTriggerIcon className={iconClassName}>{icon}</AccordionTriggerIcon>
        </AccordionTrigger>
      </AccordionHeader>
      <AccordionPanel>
        <div className="accordion-panel-content">{item.description}</div>
      </AccordionPanel>
    </AccordionItem>
  ));
}

export function AccordionExample({ className, ...props }: ComponentProps<typeof Accordion>) {
  return (
    <>
      <style>{accordionExampleCss}</style>
      <Accordion className={className} {...props}>
        <AccordionItems />
      </Accordion>
    </>
  );
}

export function MultipleAccordionExample() {
  return <AccordionExample multiple defaultValue={['what-is-base-ui', 'can-i-use-it']} />;
}

export function ControlledAccordionExample() {
  const [value, setValue] = useState(['getting-started']);

  return <AccordionExample value={value} onValueChange={setValue} />;
}

export function DisabledItemAccordionExample() {
  return (
    <>
      <style>{accordionExampleCss}</style>
      <Accordion defaultValue={['what-is-base-ui']}>
        <AccordionItems disabledValue="getting-started" />
      </Accordion>
    </>
  );
}

export function CustomStylingAccordionExample() {
  return (
    <>
      <style>{accordionCustomStylingCss}</style>
      <Accordion defaultValue={['what-is-base-ui']}>
        <AccordionItems icon={<ChevronDownIcon />} iconClassName="accordion-custom-icon" />
      </Accordion>
    </>
  );
}