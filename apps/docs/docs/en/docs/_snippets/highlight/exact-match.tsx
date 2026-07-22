import { Highlight, Text } from '@moduix/react';
import { PreviewLayout } from '@/components/examples/preview-layout';
import styles from '@/components/examples/highlight.module.css';

export default function HighlightExactMatchDemo() {
  return (
    <PreviewLayout maxWidth="24rem">
      <div className={styles.comparison}>
        <div>
          <div className={styles.label}>Partial match</div>
          <Text>
            <Highlight
              matchAll
              query="box"
              text="The checkbox component renders a box element. Use combobox for autocomplete."
            />
          </Text>
        </div>
        <div>
          <div className={styles.label}>Exact match</div>
          <Text>
            <Highlight
              exactMatch
              matchAll
              query="box"
              text="The checkbox component renders a box element. Use combobox for autocomplete."
            />
          </Text>
        </div>
      </div>
    </PreviewLayout>
  );
}