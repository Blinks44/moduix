import { Separator } from '@moduix/solid/separator';
import styles from '@/components/examples/separator/separator-as-child.module.css';

const labels = ['Before native rule', 'After native rule'];

export default function SeparatorAsChildDemo() {
  return (
    <div class={styles.root}>
      <span>{labels[0]}</span>
      <Separator asChild={(props) => <hr {...props()} />} />
      <span>{labels[1]}</span>
    </div>
  );
}