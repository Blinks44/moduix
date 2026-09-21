import { List, ListItem } from '@moduix/solid/list';

export default function OrderedListDemo() {
  return (
    <List as="ol" start={3}>
      <ListItem>Prepare the release notes.</ListItem>
      <ListItem>Publish the package.</ListItem>
      <ListItem>Announce the release.</ListItem>
    </List>
  );
}
