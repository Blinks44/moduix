import { List, ListItem } from '@moduix/solid/list';

export default function MarkerlessListDemo() {
  return (
    <List marker="none">
      <ListItem>Semantics stay intact without visible markers.</ListItem>
      <ListItem>Useful for grouped metadata or key-value blocks.</ListItem>
      <ListItem>Spacing and text tokens still come from the root.</ListItem>
    </List>
  );
}
