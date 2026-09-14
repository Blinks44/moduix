import { Accordion } from '@moduix/solid/accordion';
import styles from '@/components/examples/styling/project-checklist.module.css';

export function ProjectChecklist() {
  return (
    <section class={styles.root}>
      <Accordion class={styles.accordion} collapsible defaultValue={['outcome']}>
        <Accordion.Item class={styles.item} value="outcome">
          <Accordion.ItemTrigger class={styles.trigger}>
            <span class={styles.triggerCopy}>
              <span class={styles.step}>01</span>
              <span class={styles.title}>Define the project outcome</span>
            </span>
            <Accordion.ItemIndicator class={styles.indicator} />
          </Accordion.ItemTrigger>
          <Accordion.ItemContent class={styles.content}>
            <Accordion.ItemBody class={styles.body}>
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