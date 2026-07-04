/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { List } from '@moduix/react';

export function MarkerlessListDemo() {
  return (
    <List marker="none">
      <List.Item>Semantics stay intact without visible markers.</List.Item>
      <List.Item>Useful for grouped metadata or key-value blocks.</List.Item>
      <List.Item>Spacing and text tokens still come from the root.</List.Item>
    </List>
  );
}

//#endregion