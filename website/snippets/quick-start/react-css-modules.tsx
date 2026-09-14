import { Accordion } from '@moduix/react/accordion';

export function Example() {
  return (
    <Accordion defaultValue={['first']}>
      <Accordion.Item value="first">
        <Accordion.ItemTrigger>What is moduix?</Accordion.ItemTrigger>
        <Accordion.ItemContent>
          <Accordion.ItemBody>
            A multi-framework component system built on Ark UI.
          </Accordion.ItemBody>
        </Accordion.ItemContent>
      </Accordion.Item>
    </Accordion>
  );
}