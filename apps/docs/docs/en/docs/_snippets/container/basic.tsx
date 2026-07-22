import { Container, Heading, Text } from '@moduix/react';

const containerContent = {
  title: 'Responsive page content',
  description: 'The content column stays readable while inline gutters fluidly adapt.',
};

export default function ContainerDemo() {
  return (
    <Container className="container">
      <Heading as="h3" size="lg">
        {containerContent.title}
      </Heading>
      <Text tone="muted">{containerContent.description}</Text>
    </Container>
  );
}