/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Button, Menu } from '@moduix/react';
import styles from './menu.module.css';

export function CustomStylingMenuDemo() {
  return (
    <Menu
      positioning={{
        placement: 'right-start',
        gutter: 12,
      }}
    >
      <Menu.Trigger asChild>
        <Button>
          Export
          <Menu.Indicator />
        </Button>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content className={styles.customContent}>
          <Menu.Arrow />
          <Menu.Item value="png">Export PNG</Menu.Item>
          <Menu.Item value="pdf">Export PDF</Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu>
  );
}

//#endregion