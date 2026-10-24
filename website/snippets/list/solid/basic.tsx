import { List, ListItem } from '@moduix/solid/list';

export default function ListDemo() {
  return (
    <List>
      <ListItem>Use semantic list markup for grouped content.</ListItem>
      <ListItem>Keep spacing and typography on the library scale.</ListItem>
      <ListItem>Style markers with native ::marker selectors.</ListItem>
    </List>
  );
}