import { Container } from '@moduix/react/container';
import { Heading } from '@moduix/react/heading';
import { Text } from '@moduix/react/text';
import styles from '@/components/examples/container/container-basic.module.css';

const containerContent = {
  title: 'Responsive page content',
  description: 'The content column stays readable while inline gutters fluidly adapt.',
};

export default function ContainerDemo() {
  return (
    <Container className={styles.root}>
      <Heading as="h3" size="lg">
        {containerContent.title}
      </Heading>
      <Text tone="muted">{containerContent.description}</Text>
    </Container>
  );
}