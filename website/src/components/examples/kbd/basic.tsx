import { Kbd, KbdGroup } from '@moduix/react/kbd';
import { Fragment } from 'react';
import styles from '@/components/examples/kbd/kbd-basic.module.css';

const shortcut = {
  label: 'Command K',
  keys: ['Cmd', 'K'],
};

export default function KbdDemo() {
  return (
    <div className={styles.root}>
      <KbdGroup aria-label={shortcut.label}>
        {shortcut.keys.map((key, index) => (
          <Fragment key={key}>
            {index > 0 && '+'}
            <Kbd>{key}</Kbd>
          </Fragment>
        ))}
      </KbdGroup>
    </div>
  );
}