import { Container } from '@moduix/react/container';
import { Text } from '@moduix/react/text';

const containerGutters = [
  { value: 'none', label: 'No gutter' },
  { value: 'sm', label: 'Small gutter' },
  { value: 'md', label: 'Medium gutter' },
  { value: 'lg', label: 'Large gutter' },
] as const;

export default function ContainerGuttersDemo() {
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        gap: 'var(--moduix-spacing-4)',
      }}
    >
      {containerGutters.map((gutter) => (
        <Container
          key={gutter.value}
          gutter={gutter.value}
          style={{
            paddingBlock: 'var(--moduix-spacing-4)',
            borderBlock: 'var(--moduix-border-width-sm) dashed var(--moduix-color-border)',
            backgroundColor: 'var(--moduix-color-muted)',
          }}
        >
          <Text>{gutter.label}</Text>
        </Container>
      ))}
    </div>
  );
}