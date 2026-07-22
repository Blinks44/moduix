import { Container, Text } from '@moduix/react';

const containerGutters = [
  { value: 'none', label: 'No gutter' },
  { value: 'sm', label: 'Small gutter' },
  { value: 'md', label: 'Medium gutter' },
  { value: 'lg', label: 'Large gutter' },
] as const;

export default function ContainerGuttersDemo() {
  return (
    <div className="stack">
      {containerGutters.map((gutter) => (
        <Container key={gutter.value} gutter={gutter.value} className="container">
          <Text>{gutter.label}</Text>
        </Container>
      ))}
    </div>
  );
}