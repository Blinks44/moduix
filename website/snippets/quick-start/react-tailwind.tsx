import {
  Accordion,
  AccordionItem,
  AccordionItemBody,
  AccordionItemContent,
  AccordionItemTrigger,
} from '@moduix/react-tailwind/accordion';

export function Example() {
  return (
    <Accordion defaultValue={['first']}>
      <AccordionItem value="first">
        <AccordionItemTrigger>What is moduix?</AccordionItemTrigger>
        <AccordionItemContent>
          <AccordionItemBody>A multi-framework component system built on Ark UI.</AccordionItemBody>
        </AccordionItemContent>
      </AccordionItem>
    </Accordion>
  );
}