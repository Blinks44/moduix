import { Separator } from '@moduix/solid/separator';
import styles from '@/components/examples/separator/separator-custom-element.module.css';

const labels = ['Before native rule', 'After native rule'];

export default function CustomElementSeparatorDemo() {
  return (
    <div class={styles.root}>
      <span>{labels[0]}</span>
      <Separator asChild={(props) => <hr {...props()} />} />
      <span>{labels[1]}</span>
    </div>
  );
}