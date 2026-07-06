//#region demo
import { useAccordion } from '@ark-ui/react/accordion';
import { Accordion } from '@moduix/react';

const items = [
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

export function RootProviderAccordionDemo() {
  const accordion = useAccordion({ defaultValue: ['what-is-ark-ui'] });

  return (
    <div className="accordion-provider-stack">
      <div className="accordion-state">Open sections: {accordion.value.join(', ')}</div>
      <Accordion.RootProvider value={accordion}>
        {items.map((item) => (
          <Accordion.Item key={item.value} value={item.value}>
            <Accordion.ItemTrigger>
              {item.title}
              <Accordion.ItemIndicator />
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>
              <Accordion.ItemBody>{item.description}</Accordion.ItemBody>
            </Accordion.ItemContent>
          </Accordion.Item>
        ))}
      </Accordion.RootProvider>
    </div>
  );
}
//#endregion