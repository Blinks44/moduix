import { Input } from '@moduix/react/input';
import styles from '@/components/examples/input/input-standalone-input.module.css';

export default function StandaloneInputDemo() {
  return (
    <Input className={styles.root} aria-label="Search projects" placeholder="Search projects" />
  );
}