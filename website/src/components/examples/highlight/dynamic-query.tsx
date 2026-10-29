import { Highlight } from '@moduix/react/highlight';
import { Input } from '@moduix/react/input';
import { Stack } from '@moduix/react/stack';
import { Text } from '@moduix/react/text';
import { useState } from 'react';

export default function HighlightDynamicQueryDemo() {
  const [query, setQuery] = useState('component');

  return (
    <Stack gap="4">
      <Input
        aria-label="Search text"
        value={query}
        onChange={(event) => setQuery(event.currentTarget.value)}
        placeholder="Search text..."
      />
      <Text>
        <Highlight
          query={query}
          text="Choose a component from the list. Open its documentation to see examples, props, and keyboard controls."
        />
      </Text>
    </Stack>
  );
}