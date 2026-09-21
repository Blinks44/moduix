import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type ReactNode } from 'react';
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
} from '@/components/accordion/Accordion';
import { ChevronDownIcon } from '@/lib/moduix/icons/ui';
import { Slider } from '../../../../packages/react-tailwind/src/components/slider';

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

const demoRootClassName = 'w-full max-w-88';
const stateClassName = 'mt-3 text-sm text-muted-foreground';
const customIconClassName = 'data-[state=open]:rotate-180';

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
    <AccordionItem key={item.value} value={item.value} disabled={item.value === disabledValue}>
      <AccordionItemTrigger>
        {item.title}
        <AccordionItemIndicator className={iconClassName}>{icon}</AccordionItemIndicator>
      </AccordionItemTrigger>
      <AccordionItemContent>
        <AccordionItemBody>{item.description}</AccordionItemBody>
      </AccordionItemContent>
    </AccordionItem>
  ));
}

export const Basic: Story = {
  render: () => (
    <Accordion defaultValue={['what-is-ark-ui']} className={demoRootClassName}>
      <FaqAccordionItems />
    </Accordion>
  ),
};

export const Collapsible: Story = {
  render: () => (
    <Accordion defaultValue={['what-is-ark-ui']} collapsible className={demoRootClassName}>
      <FaqAccordionItems />
    </Accordion>
  ),
};

export const ContextState: Story = {
  render: () => (
    <Accordion defaultValue={['what-is-ark-ui']} className={demoRootClassName}>
      <AccordionContext>
        {(context) => (
          <output className={stateClassName}>Open sections: {context.value.join(', ')}</output>
        )}
      </AccordionContext>
      {faqItems.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionItemTrigger>
            {item.title}
            <AccordionItemContext>
              {(context) => <span>{context.expanded ? 'Open' : 'Closed'}</span>}
            </AccordionItemContext>
          </AccordionItemTrigger>
          <AccordionItemContent>
            <AccordionItemBody>{item.description}</AccordionItemBody>
          </AccordionItemContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['getting-started']);

    return (
      <Accordion
        value={value}
        onValueChange={(details) => setValue(details.value)}
        className={demoRootClassName}
      >
        <FaqAccordionItems />
      </Accordion>
    );
  },
};

export const DisabledItem: Story = {
  render: () => (
    <Accordion defaultValue={['what-is-ark-ui']} className={demoRootClassName}>
      <FaqAccordionItems disabledValue="getting-started" />
    </Accordion>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <Accordion
      orientation="horizontal"
      defaultValue={['what-is-ark-ui']}
      className={demoRootClassName}
    >
      <FaqAccordionItems />
    </Accordion>
  ),
};

export const LazyMount: Story = {
  render: () => (
    <Accordion lazyMount unmountOnExit className={demoRootClassName}>
      <FaqAccordionItems />
    </Accordion>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Accordion
      multiple
      defaultValue={['what-is-ark-ui', 'can-i-use-it']}
      className={demoRootClassName}
    >
      <FaqAccordionItems />
    </Accordion>
  ),
};

export const RootProvider: Story = {
  render: () => {
    const accordion = useAccordion({ defaultValue: ['what-is-ark-ui'] });

    return (
      <>
        <div className={stateClassName}>Open sections: {accordion.value.join(', ')}</div>
        <AccordionRootProvider value={accordion} className={demoRootClassName}>
          <FaqAccordionItems />
        </AccordionRootProvider>
      </>
    );
  },
};

export const AdvancedCustomization: Story = {
  render: () => (
    <Accordion defaultValue={['what-is-ark-ui']} className={demoRootClassName}>
      {faqItems.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionItemTrigger>
            {item.title}
            <AccordionItemIndicator />
          </AccordionItemTrigger>
          <AccordionItemContent>
            <AccordionItemBody>
              <span>{item.description}</span>
              <Slider defaultValue={[40]}>
                <Slider.Label>{item.title} priority</Slider.Label>
                <Slider.Control>
                  <Slider.Track>
                    <Slider.Range />
                  </Slider.Track>
                  <Slider.Thumb index={0}>
                    <Slider.HiddenInput />
                  </Slider.Thumb>
                </Slider.Control>
              </Slider>
            </AccordionItemBody>
          </AccordionItemContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
};

export const ContentStress: Story = {
  render: () => (
    <Accordion defaultValue={['long-content']} className={demoRootClassName}>
      <AccordionItem value="long-content">
        <AccordionItemTrigger>
          How does Accordion behave when a heading wraps across several lines in a narrow container?
          <AccordionItemIndicator />
        </AccordionItemTrigger>
        <AccordionItemContent>
          <AccordionItemBody>
            Long headings wrap without displacing the indicator, and multiline panel content keeps
            its spacing while the container narrows.
          </AccordionItemBody>
        </AccordionItemContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <Accordion defaultValue={['what-is-ark-ui']} className={demoRootClassName}>
      <FaqAccordionItems icon={<ChevronDownIcon />} iconClassName={customIconClassName} />
    </Accordion>
  ),
};