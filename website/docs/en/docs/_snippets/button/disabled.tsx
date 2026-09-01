import { Button } from '@moduix/react/button';
import styles from '@/components/examples/button-disabled.module.css';

const labels = {
  button: 'Disabled',
  link: 'Disabled Link',
};

export default function ButtonDisabledDemo() {
  return (
    <div className={styles.root}>
      <Button disabled>{labels.button}</Button>
      <Button asChild disabled variant="outline">
        <a href="#button">{labels.link}</a>
      </Button>
    </div>
  );
}