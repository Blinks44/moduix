import { List } from '@moduix/react/list';
import type { ComponentProps } from 'react';
import { forwardRef } from 'react';

const ReleaseListItem = forwardRef<HTMLLIElement, ComponentProps<'li'>>(function ReleaseListItem(
  { style, ...props },
  ref,
) {
  return (
    <li ref={ref} {...props} style={{ fontWeight: 'var(--moduix-weight-semibold)', ...style }} />
  );
});

export default function CustomCompositionListDemo() {
  return (
    <List>
      <List.Item asChild>
        <ReleaseListItem>Custom items can own their local styling.</ReleaseListItem>
      </List.Item>
      <List.Item asChild>
        <ReleaseListItem>List still provides its spacing and marker contract.</ReleaseListItem>
      </List.Item>
      <List.Item asChild>
        <ReleaseListItem>asChild keeps the semantic li contract for custom items.</ReleaseListItem>
      </List.Item>
    </List>
  );
}