//#region demo
import { Container, Heading, Text } from '@moduix/react';

const semanticContent = {
  title: 'Main content area',
  description: 'Use asChild when the wrapper should carry semantic meaning.',
};

export function ContainerSemanticDemo() {
  return (
    <Container asChild size="md" className="container">
      <main>
        <Heading as="h3" size="lg">
          {semanticContent.title}
        </Heading>
        <Text tone="muted">{semanticContent.description}</Text>
      </main>
    </Container>
  );
}
//#endregion