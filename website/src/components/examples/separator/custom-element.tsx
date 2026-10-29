import { Separator } from '@moduix/react/separator';
import styles from '@/components/examples/separator/separator-custom-element.module.css';

const labels = ['Before native rule', 'After native rule'];

export default function CustomElementSeparatorDemo() {
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