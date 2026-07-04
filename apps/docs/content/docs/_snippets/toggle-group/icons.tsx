/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { ToggleGroup } from '@moduix/react';
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from 'lucide-react';
import styles from './toggle-group.module.css';

const defaultValue = ['left'];

export function IconToggleGroupDemo() {
  return (
    <ToggleGroup
      defaultValue={['left']}
      aria-label="Text alignment"
      size="md"
      className={styles.iconGroup}
    >
      <ToggleGroup.Item value="left" aria-label="Align left">
        <AlignLeftIcon />
      </ToggleGroup.Item>
      <ToggleGroup.Item value="center" aria-label="Align center">
        <AlignCenterIcon />
      </ToggleGroup.Item>
      <ToggleGroup.Item value="right" aria-label="Align right">
        <AlignRightIcon />
      </ToggleGroup.Item>
    </ToggleGroup>
  );
}

//#endregion