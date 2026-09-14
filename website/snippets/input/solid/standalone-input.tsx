import { Input } from '@moduix/solid/input';
import styles from '@/components/examples/input/input-standalone-input.module.css';

export default function StandaloneInputDemo() {
  return <Input class={styles.root} aria-label="Search projects" placeholder="Search projects" />;
}