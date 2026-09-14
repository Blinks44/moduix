import { Heading } from '@moduix/solid/heading';

const headingText = 'Page title rendered as h2';

export default function SemanticHeadingDemo() {
  return (
    <Heading as="h2" size="2xl">
      {headingText}
    </Heading>
  );
}