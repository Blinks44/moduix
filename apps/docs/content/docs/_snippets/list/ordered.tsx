/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { List } from '@moduix/react';

export function OrderedListDemo() {
  return (
    <List as="ol" start={3}>
      <List.Item>Prepare the release notes.</List.Item>
      <List.Item>Publish the package.</List.Item>
      <List.Item>Announce the release.</List.Item>
    </List>
  );
}

//#endregion