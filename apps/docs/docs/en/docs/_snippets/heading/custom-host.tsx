import { Heading } from '@moduix/react';
import styles from '@/components/examples/heading.module.css';

const headingText = 'Factory-composed heading';

export default function CustomHostHeadingDemo() {
  return (
    <Heading asChild size="xl" className={styles.customHost}>
      <h2>{headingText}</h2>
    </Heading>
  );
}