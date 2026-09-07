import { Button } from '@moduix/solid/button';
import styles from '@/components/examples/button/button-disabled.module.css';

const labels = {
  button: 'Disabled',
  link: 'Disabled Link',
};

export default function ButtonDisabledDemo() {
  return (
    <div class={styles.root}>
      <Button disabled>{labels.button}</Button>
      <Button
        asChild={(props) => (
          <a {...props()} href="#button">
            {labels.link}
          </a>
        )}
        disabled
        variant="outline"
      />
    </div>
  );
}