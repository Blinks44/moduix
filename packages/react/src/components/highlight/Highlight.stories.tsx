import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Input } from '../input';
import { Text } from '../text';
import { Highlight } from './Highlight';
import storyStyles from './Highlight.stories.module.css';

const meta = {
  title: 'Components/Highlight',
  component: Highlight,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    query: 'component',
    text: 'Ark UI is a headless component library for building accessible web applications.',
  },
  render: (args) => (
    <Text>
      <Highlight {...args} />
    </Text>
  ),
} satisfies Meta<typeof Highlight>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const DynamicQuery: Story = {
  render: () => {
    const [query, setQuery] = useState('component');

    return (
      <div className={storyStyles.stack}>
        <Input
          aria-label="Search text"
          className={storyStyles.field}
          value={query}
          onChange={(event) => setQuery(event.currentTarget.value)}
          placeholder="Search text..."
        />
        <Text>
          <Highlight
            query={query}
            text="With Ark UI, you can build accessible, custom components. Each component is fully typed and works seamlessly with React, Solid, Svelte, and Vue."
          />
        </Text>
      </div>
    );
  },
};

export const MultipleQueries: Story = {
  render: () => (
    <Text>
      <Highlight
        query={['React', 'Vue']}
        text="Ark UI provides React, Solid, Vue, and Svelte components that are accessible and customizable."
      />
    </Text>
  ),
};

export const IgnoreCase: Story = {
  render: () => (
    <Text>
      <Highlight
        ignoreCase
        query="typescript"
        text="TypeScript provides static type checking. Using typescript helps catch errors early in development."
      />
    </Text>
  ),
};

export const MatchAll: Story = {
  render: () => (
    <div className={storyStyles.comparison}>
      <div>
        <div className={storyStyles.label}>Match all</div>
        <Text>
          <Highlight
            matchAll
            query="component"
            text="Each component follows WAI-ARIA guidelines. Every component is rigorously tested to ensure accessibility."
          />
        </Text>
      </div>
      <div>
        <div className={storyStyles.label}>First match only</div>
        <Text>
          <Highlight
            matchAll={false}
            query="component"
            text="Each component follows WAI-ARIA guidelines. Every component is rigorously tested to ensure accessibility."
          />
        </Text>
      </div>
    </div>
  ),
};

export const ExactMatch: Story = {
  render: () => (
    <div className={storyStyles.comparison}>
      <div>
        <div className={storyStyles.label}>Partial match</div>
        <Text>
          <Highlight
            matchAll
            query="box"
            text="The checkbox component renders a box element. Use combobox for autocomplete."
          />
        </Text>
      </div>
      <div>
        <div className={storyStyles.label}>Exact match</div>
        <Text>
          <Highlight
            exactMatch
            matchAll
            query="box"
            text="The checkbox component renders a box element. Use combobox for autocomplete."
          />
        </Text>
      </div>
    </div>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <Text>
      <Highlight
        className={storyStyles.custom}
        query="moduix"
        text="moduix keeps highlight styling aligned with the rest of the component library."
      />
    </Text>
  ),
};