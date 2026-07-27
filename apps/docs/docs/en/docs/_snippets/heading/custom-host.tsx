import { Heading } from '@moduix/react';

const headingText = 'Factory-composed heading';

export default function CustomHostHeadingDemo() {
  return (
    <Heading asChild size="xl">
      <h2>{headingText}</h2>
    </Heading>
  );
}