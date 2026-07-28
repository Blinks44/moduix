import { List } from '@moduix/react';

export default function ListToneDemo() {
  return (
    <div
      style={{
        display: 'grid',
        gap: 'var(--moduix-spacing-4) var(--moduix-spacing-6)',
        gridTemplateColumns: 'repeat(auto-fit, minmax(12rem, 1fr))',
        inlineSize: '100%',
      }}
    >
      <List tone="default">
        <List.Item>Default list tone</List.Item>
      </List>
      <List tone="muted">
        <List.Item>Muted list tone</List.Item>
      </List>
      <List tone="subtle">
        <List.Item>Subtle list tone</List.Item>
      </List>
      <List tone="primary">
        <List.Item>Primary list tone</List.Item>
      </List>
      <List tone="destructive">
        <List.Item>Destructive list tone</List.Item>
      </List>
    </div>
  );
}