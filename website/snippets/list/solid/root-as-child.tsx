import { List } from '@moduix/solid/list';

export default function RootAsChildListDemo() {
  return (
    <List
      asChild={(props) => (
        <ul {...props()} aria-label="Release tasks">
          <List.Item>Prepare the release notes.</List.Item>
          <List.Item>Publish the package.</List.Item>
          <List.Item>Announce the release.</List.Item>
        </ul>
      )}
    />
  );
}