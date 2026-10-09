import { Typeset, TypesetScroll } from '@moduix/solid/typeset';
import styles from '@/components/examples/typeset/typeset-scrollable-table.module.css';

export default function TypesetScrollableTableDemo() {
  return (
    <Typeset>
      <TypesetScroll aria-label="Typeset settings comparison">
        <table class={styles.table}>
          <thead>
            <tr>
              <th>Context</th>
              <th>Size</th>
              <th>Leading</th>
              <th>Flow</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Documentation</td>
              <td>1.125rem</td>
              <td>1.9</td>
              <td>1.75em</td>
            </tr>
          </tbody>
        </table>
      </TypesetScroll>
    </Typeset>
  );
}