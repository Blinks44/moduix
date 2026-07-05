/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { List } from '@moduix/react';

export function CustomCompositionListDemo() {
  return (
    <List className="list-demo-accent">
      <List.Item asChild>
        <li className="list-demo-accent-item">
          Native markers stay available for per-item styling.
        </li>
      </List.Item>
      <List.Item asChild>
        <li className="list-demo-accent-item">
          Root CSS variables still control spacing and indentation.
        </li>
      </List.Item>
      <List.Item asChild>
        <li className="list-demo-accent-item">
          asChild keeps the slot contract while handing markup to the caller.
        </li>
      </List.Item>
    </List>
  );
}

//#endregion