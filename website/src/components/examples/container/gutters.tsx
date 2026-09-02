import { Container } from '@moduix/react/container';
import { Text } from '@moduix/react/text';
import styles from '@/components/examples/container/container-gutters.module.css';

const containerGutters = [
  { value: 'none', label: 'No gutter' },
  { value: 'sm', label: 'Small gutter' },
  { value: 'md', label: 'Medium gutter' },
  { value: 'lg', label: 'Large gutter' },
] as const;

export default function ContainerGuttersDemo() {
  return (
    <div className={styles.stack}>
      {containerGutters.map((gutter) => (
        <Container key={gutter.value} gutter={gutter.value} className={styles.container}>
          <Text>{gutter.label}</Text>
        </Container>
      ))}
    </div>
  );
}