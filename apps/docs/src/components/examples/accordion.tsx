import { Accordion, Slider, useAccordion } from '@moduix/react';
import { useState, type ComponentProps, type ReactNode } from 'react';
import type { CssPropertyInput } from '../preview';

export const accordionExampleCss = `
  [data-slot='accordion-root'],
  [data-slot='accordion-root-provider'] {
    width: 100%;
    max-width: 22rem;
  }

  .accordion-provider-stack {
    display: grid;
    gap: var(--spacing-3);
    width: fit-content;
    max-width: 100%;
  }

  .accordion-provider-stack .accordion-state {
    margin-top: 0;
  }

  .accordion-state {
    margin-top: var(--spacing-3);
    color: var(--color-muted-foreground);
    font-size: var(--text-sm);
    line-height: var(--line-height-text-sm);
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
    '--accordion-horizontal-content-width',
    '16rem',
    'Controls the inner content width for horizontal accordions.',
  ],
  ['--accordion-horizontal-height', '20rem', 'Controls horizontal accordion height.'],
  ['--accordion-horizontal-max-height', '100%', 'Controls horizontal accordion maximum height.'],
  [
    '--accordion-horizontal-trigger-width',
    '2.5rem',
    'Controls trigger width in horizontal orientation.',
  ],
  ['--accordion-horizontal-width', 'auto', 'Controls horizontal accordion width.'],
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
    '--accordion-item-body-gap',
    'var(--spacing-3)',
    'Controls spacing between elements in item body.',
  ],
  ['--accordion-item-body-padding', 'var(--spacing-3)', 'Controls item body padding.'],
  [
    '--accordion-item-content-closed-opacity',
    '0.01',
    'Controls content opacity at the closed end of the animation.',
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
    '--accordion-item-content-open-opacity',
    '1',
    'Controls content opacity at the open end of the animation.',
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
  ['--accordion-width', '100%', 'Controls the default accordion width.'],
];

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
        <Accordion.ItemIndicator className={iconClassName}>{icon}</Accordion.ItemIndicator>
      </Accordion.ItemTrigger>
      <Accordion.ItemContent>
        <Accordion.ItemBody>{item.description}</Accordion.ItemBody>
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

export function HorizontalAccordionExample() {
  return (
    <>
      <style>{accordionExampleCss}</style>
      <Accordion.Root orientation="horizontal" defaultValue={['what-is-ark-ui']}>
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

export function MultipleAccordionExample() {
  return <AccordionExample multiple defaultValue={['what-is-ark-ui', 'can-i-use-it']} />;
}

export function RootProviderAccordionExample() {
  const accordion = useAccordion({ defaultValue: ['what-is-ark-ui'] });

  return (
    <>
      <style>{accordionExampleCss}</style>
      <div className="accordion-provider-stack">
        <div className="accordion-state">Open sections: {accordion.value.join(', ')}</div>
        <Accordion.RootProvider value={accordion}>
          <AccordionItems />
        </Accordion.RootProvider>
      </div>
    </>
  );
}

export function AdvancedCustomizationAccordionExample() {
  return (
    <>
      <style>{accordionExampleCss}</style>
      <Accordion.Root defaultValue={['what-is-ark-ui']}>
        {accordionItems.map((item) => (
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
    </>
  );
}