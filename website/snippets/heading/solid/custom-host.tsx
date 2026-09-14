import { Heading } from '@moduix/solid/heading';

const headingText = 'Factory-composed heading';

export default function CustomHostHeadingDemo() {
  return <Heading asChild={(props) => <h2 {...props()}>{headingText}</h2>} size="xl" />;
}