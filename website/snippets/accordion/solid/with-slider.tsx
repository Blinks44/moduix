import {
  Accordion,
  AccordionItem,
  AccordionItemBody,
  AccordionItemContent,
  AccordionItemIndicator,
  AccordionItemTrigger,
} from '@moduix/solid/accordion';
import { Slider, SliderControl, SliderHiddenInput, SliderLabel, SliderRange, SliderThumb, SliderTrack } from '@moduix/solid/slider';
import styles from '@/components/examples/accordion/accordion-with-slider.module.css';

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

export default function WithSliderAccordionDemo() {
  return (
    <Accordion class={styles.root} defaultValue={['what-is-ark-ui']}>
      {items.map((item) => (
        <AccordionItem value={item.value}>
          <AccordionItemTrigger>
            {item.title}
            <AccordionItemIndicator />
          </AccordionItemTrigger>
          <AccordionItemContent>
            <AccordionItemBody>
              <span>{item.description}</span>
              <Slider defaultValue={[40]}>
                <SliderLabel>{item.title} priority</SliderLabel>
                <SliderControl>
                  <SliderTrack>
                    <SliderRange />
                  </SliderTrack>
                  <SliderThumb index={0}>
                    <SliderHiddenInput />
                  </SliderThumb>
                </SliderControl>
              </Slider>
            </AccordionItemBody>
          </AccordionItemContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}