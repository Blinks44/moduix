import { Bleed, Container, Heading, Text } from '@moduix/react';

const bleedContent = {
  title: 'Article body',
  description:
    'Keep the reading width constrained, then use Bleed for content that should stretch wider.',
  callout: 'Bleed content escapes the constrained column.',
};

export default function ContainerBleedDemo() {
  return (
    <Container
      style={{
        paddingBlock: 'var(--moduix-spacing-4)',
        borderBlock: 'var(--moduix-border-width-sm) dashed var(--moduix-color-border)',
        backgroundColor: 'var(--moduix-color-muted)',
      }}
    >
      <Heading as="h3" size="lg">
        {bleedContent.title}
      </Heading>
      <Text tone="muted">{bleedContent.description}</Text>
      <Bleed inline="md">
        <div
          style={{
            padding: 'var(--moduix-spacing-4)',
            border: 'var(--moduix-border-width-sm) solid var(--moduix-color-border)',
            backgroundColor: 'var(--moduix-color-background)',
          }}
        >
          {bleedContent.callout}
        </div>
      </Bleed>
    </Container>
  );
}