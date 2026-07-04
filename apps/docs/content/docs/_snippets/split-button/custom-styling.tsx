/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Menu, SplitButton } from '@moduix/react';
import styles from './split-button.module.css';

export function SplitButtonStylingDemo() {
  return (
    <SplitButton className={styles.brandSplitButton} variant="outline">
      <SplitButton.Action>Review</SplitButton.Action>
      <SplitButton.Trigger aria-label="More review actions" />
      <SplitButton.Positioner>
        <SplitButton.Content>
          <Menu.Item value="approve">Approve</Menu.Item>
          <Menu.Item value="request-changes">Request Changes</Menu.Item>
        </SplitButton.Content>
      </SplitButton.Positioner>
    </SplitButton>
  );
}

//#endregion