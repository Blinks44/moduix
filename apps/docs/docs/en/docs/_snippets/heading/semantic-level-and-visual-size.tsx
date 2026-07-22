import { Heading } from '@moduix/react';
import styles from '@/components/examples/heading.module.css';

const headingText = 'Page title rendered as h2';

export default function SemanticHeadingDemo() {
  return (
    <Heading as="h2" size="2xl" className={styles.demo}>
      {headingText}
    </Heading>
  );
}