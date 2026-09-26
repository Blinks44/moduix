import {
  Accordion,
  AccordionItem,
  AccordionItemBody,
  AccordionItemContent,
  AccordionItemIndicator,
  AccordionItemTrigger,
} from '@moduix/solid/accordion';
import styles from '@/components/examples/styling/project-checklist.module.css';

export function ProjectChecklist() {
  return (
    <section class={styles.root}>
      <Accordion class={styles.accordion} collapsible defaultValue={['outcome']}>
        <AccordionItem class={styles.item} value="outcome">
          <AccordionItemTrigger class={styles.trigger}>
            <span class={styles.triggerCopy}>
              <span class={styles.step}>01</span>
              <span class={styles.title}>Define the project outcome</span>
            </span>
            <AccordionItemIndicator class={styles.indicator} />
          </AccordionItemTrigger>
          <AccordionItemContent class={styles.content}>
            <AccordionItemBody class={styles.body}>
              <p>
                Write one sentence that makes the next decision obvious to everyone on the project.
              </p>
            </AccordionItemBody>
          </AccordionItemContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}