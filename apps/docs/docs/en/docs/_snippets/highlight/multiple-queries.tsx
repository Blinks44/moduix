import { Highlight, Text } from '@moduix/react';

export default function HighlightMultipleQueriesDemo() {
  return (
    <Text>
      <Highlight
        query={['React', 'Vue']}
        text="Ark UI provides React, Solid, Vue, and Svelte components that are accessible and customizable."
      />
    </Text>
  );
}