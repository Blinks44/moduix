import { Typeset } from '@moduix/react/typeset';
import styles from '@/components/examples/typeset/typeset-excluded-subtree.module.css';

export default function TypesetExcludedSubtreeDemo() {
  return (
    <Typeset>
      <p>This paragraph uses the Typeset rhythm.</p>
      <section className={styles.surface} data-not-typeset>
        <strong>Application-owned surface</strong>
        <p>This nested subtree keeps its local styles.</p>
      </section>
      <p>Typeset resumes for following rendered content.</p>
    </Typeset>
  );
}