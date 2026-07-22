import { List } from '@moduix/react';

export default function NativeItemsListDemo() {
  return (
    <List>
      <li>Use native li elements when a wrapper component is unnecessary.</li>
      <li>The root still controls spacing, marker style, size, and tone.</li>
      <li>Reach for List.Item when you want the stable item slot.</li>
    </List>
  );
}