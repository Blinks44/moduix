import { List } from '@moduix/react';
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
        <List.Item>Prepare the release notes.</List.Item>
        <List.Item>Publish the package.</List.Item>
        <List.Item>Announce the release.</List.Item>
      </ReleaseList>
    </List>
  );
}