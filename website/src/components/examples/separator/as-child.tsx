import { Separator } from '@moduix/react/separator';
import styles from '@/components/examples/separator/separator-as-child.module.css';

const labels = ['Before native rule', 'After native rule'];

export default function SeparatorAsChildDemo() {
  return (
    <div className={styles.root}>
      <span>{labels[0]}</span>
      <Separator asChild>
        <hr />
      </Separator>
      <span>{labels[1]}</span>
    </div>
  );
}