//#region demo
import { Bleed, Container, Heading, Text } from '@moduix/react';

const bleedContent = {
  title: 'Article body',
  description:
    'Keep the reading width constrained, then use Bleed for content that should stretch wider.',
  callout: 'Bleed content escapes the constrained column.',
};

export function ContainerBleedDemo() {
  return (
    <Container className="container">
      <Heading as="h3" size="lg">
        {bleedContent.title}
      </Heading>
      <Text tone="muted">{bleedContent.description}</Text>
      <Bleed inline="md">
        <div className="bleedSurface">{bleedContent.callout}</div>
      </Bleed>
    </Container>
  );
}
//#endregion