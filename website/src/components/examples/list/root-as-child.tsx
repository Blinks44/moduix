import { List, ListItem } from '@moduix/react/list';
import type { ComponentProps } from 'react';
import { forwardRef } from 'react';

const ReleaseList = forwardRef<HTMLUListElement, ComponentProps<'ul'>>(
  function ReleaseList(props, ref) {
    return <ul ref={ref} {...props} />;
  },
);

export default function RootAsChildListDemo() {
  return (
    <List asChild>
      <ReleaseList>
        <ListItem>Prepare the release notes.</ListItem>
        <ListItem>Publish the package.</ListItem>
        <ListItem>Announce the release.</ListItem>
      </ReleaseList>
    </List>
  );
}