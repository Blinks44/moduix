/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { List } from '@moduix/react';
import type { ComponentProps } from 'react';
import { forwardRef } from 'react';

const AccentListItem = forwardRef<HTMLLIElement, ComponentProps<'li'>>(function AccentListItem(
  { className, ...props },
  ref,
) {
  return (
    <li
      ref={ref}
      {...props}
      className={className ? `list-demo-accent-item ${className}` : 'list-demo-accent-item'}
    />
  );
});

export function CustomCompositionListDemo() {
  return (
    <List className="list-demo-accent">
      <List.Item asChild>
        <AccentListItem>Native markers stay available for per-item styling.</AccentListItem>
      </List.Item>
      <List.Item asChild>
        <AccentListItem>Root CSS variables still control spacing and indentation.</AccentListItem>
      </List.Item>
      <List.Item asChild>
        <AccentListItem>asChild keeps the semantic li contract for a custom item.</AccentListItem>
      </List.Item>
    </List>
  );
}

//#endregion