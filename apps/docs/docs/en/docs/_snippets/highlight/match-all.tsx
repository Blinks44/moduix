import { Highlight } from '@moduix/react/highlight';
import { Text } from '@moduix/react/text';
import styles from '@/components/examples/highlight.module.css';

export default function HighlightMatchAllDemo() {
  return (
    <div className={styles.comparison}>
      <div>
        <div className={styles.label}>Match all</div>
        <Text>
          <Highlight
            matchAll
            query="component"
            text="Each component follows WAI-ARIA guidelines. Every component is rigorously tested to ensure accessibility."
          />
        </Text>
      </div>
      <div>
        <div className={styles.label}>First match only</div>
        <Text>
          <Highlight
            matchAll={false}
            query="component"
            text="Each component follows WAI-ARIA guidelines. Every component is rigorously tested to ensure accessibility."
          />
        </Text>
      </div>
    </div>
  );
}