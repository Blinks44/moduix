import { List, ListItem } from '@moduix/solid/list';

export default function RootAsChildListDemo() {
  return (
    <List
      asChild={(props) => (
        <ul {...props()} aria-label="Release tasks">
          <ListItem>Prepare the release notes.</ListItem>
          <ListItem>Publish the package.</ListItem>
          <ListItem>Announce the release.</ListItem>
        </ul>
      )}
    />
  );
}
