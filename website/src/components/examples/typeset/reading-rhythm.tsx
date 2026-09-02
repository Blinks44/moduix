import { Typeset } from '@moduix/react/typeset';
import styles from '@/components/examples/typeset/typeset-reading-rhythm.module.css';

export default function TypesetReadingDemo() {
  return (
    <Typeset asChild className={styles.root}>
      <article>
        <h2>Reading mode</h2>
        <p>A roomier preset can make long-form content more comfortable without adding props.</p>
        <p>Use a class to keep the page and its layout in control of the rhythm.</p>
      </article>
    </Typeset>
  );
}