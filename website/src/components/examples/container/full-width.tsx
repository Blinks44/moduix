import { Container } from '@moduix/react/container';
import { Heading } from '@moduix/react/heading';
import { Text } from '@moduix/react/text';
import styles from '@/components/examples/container/container-full-width.module.css';

const fullWidthContent = {
  title: 'Full-width section',
  description:
    'The content can use all available width while the selected gutter protects it from viewport edges.',
};

export default function ContainerFullWidthDemo() {
  return (
    <Container size="full" gutter="lg" className={styles.root}>
      <Heading as="h3" size="lg">
        {fullWidthContent.title}
      </Heading>
      <Text tone="muted">{fullWidthContent.description}</Text>
    </Container>
  );
}