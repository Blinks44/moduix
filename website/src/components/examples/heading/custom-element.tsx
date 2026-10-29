import { Heading } from '@moduix/react/heading';

const headingText = 'Factory-composed heading';

export default function CustomElementHeadingDemo() {
  return (
    <Heading asChild size="xl">
      <h2>{headingText}</h2>
    </Heading>
  );
}