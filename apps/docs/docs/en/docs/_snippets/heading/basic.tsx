import { Heading } from '@moduix/react';
import styles from '@/components/examples/heading.module.css';

const headingText = 'Build reliable interfaces';

export default function HeadingDemo() {
  return <Heading className={styles.demo}>{headingText}</Heading>;
}