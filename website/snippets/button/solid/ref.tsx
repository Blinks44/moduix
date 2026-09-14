import { Button } from '@moduix/solid/button';
import styles from '@/components/examples/button/button-ref.module.css';

const labels = {
  target: 'Focus target',
  trigger: 'Focus first button',
};

export default function ButtonRefDemo() {
  let buttonRef: HTMLButtonElement | undefined;

  return (
    <div class={styles.root}>
      <Button ref={(element) => (buttonRef = element)}>{labels.target}</Button>
      <Button size="sm" variant="outline" onClick={() => buttonRef?.focus()}>
        {labels.trigger}
      </Button>
    </div>
  );
}