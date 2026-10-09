import {
  Accordion,
  AccordionItem,
  AccordionItemBody,
  AccordionItemContent,
  AccordionItemIndicator,
  AccordionItemTrigger,
} from '@moduix/react/accordion';
import styles from './project-checklist.module.css';

export function ProjectChecklist() {
  return (
    <section className={styles.root}>
      <Accordion className={styles.accordion} collapsible defaultValue={['outcome']}>
        <AccordionItem className={styles.item} value="outcome">
          <AccordionItemTrigger className={styles.trigger}>
            <span className={styles.triggerCopy}>
              <span className={styles.step}>01</span>
              <span className={styles.title}>Define the project outcome</span>
            </span>
            <AccordionItemIndicator className={styles.indicator} />
          </AccordionItemTrigger>
          <AccordionItemContent className={styles.content}>
            <AccordionItemBody className={styles.body}>
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