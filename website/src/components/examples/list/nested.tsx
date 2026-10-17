import { List, ListItem } from '@moduix/react/list';

export default function NestedListDemo() {
  return (
    <List>
      <ListItem>
        Prepare the release
        <List as="ol">
          <ListItem>Update the changelog.</ListItem>
          <ListItem>Bump the package versions.</ListItem>
        </List>
      </ListItem>
      <ListItem>Publish the packages.</ListItem>
    </List>
  );
}