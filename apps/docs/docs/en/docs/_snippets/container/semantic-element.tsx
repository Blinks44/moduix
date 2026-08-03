import { Container } from '@moduix/react/container';
import { Heading } from '@moduix/react/heading';
import { Text } from '@moduix/react/text';

const semanticContent = {
  title: 'Main content area',
  description: 'Use asChild when the wrapper should carry semantic meaning.',
};

export default function ContainerSemanticDemo() {
  return (
    <Container
      asChild
      size="md"
      style={{
        paddingBlock: 'var(--moduix-spacing-4)',
        borderBlock: 'var(--moduix-border-width-sm) dashed var(--moduix-color-border)',
        backgroundColor: 'var(--moduix-color-muted)',
      }}
    >
      <main>
        <Heading as="h3" size="lg">
          {semanticContent.title}
        </Heading>
        <Text tone="muted">{semanticContent.description}</Text>
      </main>
    </Container>
  );
}