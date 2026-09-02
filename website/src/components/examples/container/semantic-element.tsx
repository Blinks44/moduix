import { Container } from '@moduix/react/container';
import { Heading } from '@moduix/react/heading';
import { Text } from '@moduix/react/text';
import styles from '@/components/examples/container/container-semantic-element.module.css';

const semanticContent = {
  title: 'Main content area',
  description: 'Use asChild when the wrapper should carry semantic meaning.',
};

export default function ContainerSemanticDemo() {
  return (
    <Container asChild size="md" className={styles.root}>
      <main>
        <Heading as="h3" size="lg">
          {semanticContent.title}
        </Heading>
        <Text tone="muted">{semanticContent.description}</Text>
      </main>
    </Container>
  );
}