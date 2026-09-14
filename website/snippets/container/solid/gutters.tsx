import { Container } from '@moduix/solid/container';
import { Text } from '@moduix/solid/text';
import styles from '@/components/examples/container/container-gutters.module.css';

const containerGutters = [
  { value: 'none', label: 'No gutter' },
  { value: 'sm', label: 'Small gutter' },
  { value: 'md', label: 'Medium gutter' },
  { value: 'lg', label: 'Large gutter' },
] as const;

export default function ContainerGuttersDemo() {
  return (
    <div class={styles.stack}>
      {containerGutters.map((gutter) => (
        <Container gutter={gutter.value} class={styles.container}>
          <Text>{gutter.label}</Text>
        </Container>
      ))}
    </div>
  );
}