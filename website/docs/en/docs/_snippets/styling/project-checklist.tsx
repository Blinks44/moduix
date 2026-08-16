import { Accordion } from '@moduix/react/accordion';
import styles from './project-checklist.module.css';

export function ProjectChecklist() {
  return (
    <section className={styles.root}>
      <Accordion className={styles.accordion} collapsible defaultValue={['outcome']}>
        <Accordion.Item className={styles.item} value="outcome">
          <Accordion.ItemTrigger className={styles.trigger}>
            <span className={styles.triggerCopy}>
              <span className={styles.step}>01</span>
              <span className={styles.title}>Define the project outcome</span>
            </span>
            <Accordion.ItemIndicator className={styles.indicator} />
          </Accordion.ItemTrigger>
          <Accordion.ItemContent className={styles.content}>
            <Accordion.ItemBody className={styles.body}>
              <p>
                Write one sentence that makes the next decision obvious to everyone on the project.
              </p>
            </Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>
      </Accordion>
    </section>
  );
}