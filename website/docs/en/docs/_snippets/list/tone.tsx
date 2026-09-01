import { List } from '@moduix/react/list';
import styles from '@/components/examples/list/list-tone.module.css';

export default function ListToneDemo() {
  return (
    <div className={styles.root}>
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