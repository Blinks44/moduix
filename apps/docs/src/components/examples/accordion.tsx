import { Accordion, ChevronDownIcon } from 'moduix';
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
    value: 'what-is-ark-ui',
    title: 'What is Ark UI?',
    description: 'Ark UI is a headless component library for building accessible web interfaces.',
  },
  {
    value: 'getting-started',
    title: 'How do I get started?',
    description:
      'Install the package, import Accordion parts, and style the composition to match your product.',
  },
  {
    value: 'can-i-use-it',
    title: 'Can I use it for my project?',
    description: 'Yes. Ark UI is open source and designed for production design systems.',
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
    'Controls indicator transform when the item is open.',
  ],
  ['--accordion-icon-size', '0.75rem', 'Controls indicator icon size.'],
  ['--accordion-icon-transition', 'var(--transition-default)', 'Controls indicator transition.'],
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
  [
    '--accordion-item-content-color',
    'var(--color-muted-foreground)',
    'Controls item content text color.',
  ],
  ['--accordion-item-content-font-size', 'var(--text-md)', 'Controls item content font size.'],
  [
    '--accordion-item-content-line-height',
    'var(--line-height-text-md)',
    'Controls item content line height.',
  ],
  [
    '--accordion-item-content-transition',
    'var(--transition-default)',
    'Controls item content open and close animation timing.',
  ],
  ['--accordion-max-width', '100%', 'Controls the maximum accordion width.'],
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
    'Controls spacing between trigger content and indicator.',
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
  ['--accordion-icon-size', '0.75rem', 'Controls indicator size.'],
  ['--accordion-item-border-color', 'var(--color-border)', 'Controls separator color.'],
  ['--accordion-item-border-width', 'var(--border-width-sm)', 'Controls separator width.'],
  [
    '--accordion-item-content-color',
    'var(--color-muted-foreground)',
    'Controls content text color.',
  ],
  [
    '--accordion-item-content-transition',
    'var(--transition-default)',
    'Controls content animation timing.',
  ],
  ['--accordion-max-width', '100%', 'Controls the maximum accordion width.'],
  ['--accordion-trigger-bg', 'var(--color-muted)', 'Controls trigger background color.'],
  ['--accordion-trigger-bg-hover', 'var(--color-accent)', 'Controls trigger hover background.'],
  [
    '--accordion-trigger-gap',
    'var(--spacing-4)',
    'Controls trigger content and indicator spacing.',
  ],
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
    <Accordion.Item key={item.value} value={item.value} disabled={item.value === disabledValue}>
      <Accordion.ItemTrigger>
        {item.title}
        <Accordion.ItemIndicator className={iconClassName}>
          {icon ?? <ChevronDownIcon />}
        </Accordion.ItemIndicator>
      </Accordion.ItemTrigger>
      <Accordion.ItemContent>
        <div className="accordion-panel-content">{item.description}</div>
      </Accordion.ItemContent>
    </Accordion.Item>
  ));
}

export function AccordionExample({ className, ...props }: ComponentProps<typeof Accordion.Root>) {
  return (
    <>
      <style>{accordionExampleCss}</style>
      <Accordion.Root className={className} {...props}>
        <AccordionItems />
      </Accordion.Root>
    </>
  );
}

export function MultipleAccordionExample() {
  return <AccordionExample multiple defaultValue={['what-is-ark-ui', 'can-i-use-it']} />;
}

export function ControlledAccordionExample() {
  const [value, setValue] = useState(['getting-started']);

  return <AccordionExample value={value} onValueChange={(details) => setValue(details.value)} />;
}

export function DisabledItemAccordionExample() {
  return (
    <>
      <style>{accordionExampleCss}</style>
      <Accordion.Root defaultValue={['what-is-ark-ui']}>
        <AccordionItems disabledValue="getting-started" />
      </Accordion.Root>
    </>
  );
}

export function CollapsibleAccordionExample() {
  return (
    <>
      <style>{accordionExampleCss}</style>
      <Accordion.Root defaultValue={['what-is-ark-ui']} collapsible>
        <AccordionItems />
      </Accordion.Root>
    </>
  );
}

export function LazyMountAccordionExample() {
  return (
    <>
      <style>{accordionExampleCss}</style>
      <Accordion.Root lazyMount unmountOnExit>
        <AccordionItems />
      </Accordion.Root>
    </>
  );
}

export function CustomStylingAccordionExample() {
  return (
    <>
      <style>{accordionCustomStylingCss}</style>
      <Accordion.Root defaultValue={['what-is-ark-ui']}>
        <AccordionItems icon={<ChevronDownIcon />} iconClassName="accordion-custom-icon" />
      </Accordion.Root>
    </>
  );
}