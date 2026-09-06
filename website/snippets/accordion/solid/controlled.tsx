import { Accordion } from '@moduix/solid/accordion';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/accordion/accordion-controlled.module.css';

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

export default function ControlledAccordionDemo() {
  const [value, setValue] = createSignal<string[]>(['getting-started']);

  return (
    <Accordion
      class={styles.root}
      value={value()}
      onValueChange={(details) => setValue(details.value)}
    >
      {items.map((item) => (
        <Accordion.Item value={item.value}>
          <Accordion.ItemTrigger>
            {item.title}
            <Accordion.ItemIndicator />
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Accordion.ItemBody>{item.description}</Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}