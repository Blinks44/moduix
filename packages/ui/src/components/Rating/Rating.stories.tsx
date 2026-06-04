import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Field, FieldDescription, FieldLabel } from '../Field';
import { Rating } from './Rating';
import storyStyles from './Rating.stories.module.css';

const meta = {
  title: 'Components/Rating',
  component: Rating,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Rating>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => {
    return (
      <Field className={storyStyles.field}>
        <FieldLabel>Overall satisfaction</FieldLabel>
        <FieldDescription>Choose the score that best matches your experience.</FieldDescription>
        <Rating aria-label="Overall satisfaction" defaultValue={4} />
      </Field>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState(3);

    return (
      <div className={storyStyles.stack}>
        <Field className={storyStyles.field}>
          <FieldLabel>Support quality</FieldLabel>
          <Rating aria-label="Support quality" onValueChange={setValue} value={value} />
        </Field>
        <span className={storyStyles.hint}>Current value: {value}</span>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    return (
      <div className={storyStyles.stack}>
        <Rating defaultValue={3} size="xs" aria-label="Extra-small rating" />
        <Rating defaultValue={3} size="sm" aria-label="Small rating" />
        <Rating defaultValue={3} size="md" aria-label="Medium rating" />
        <Rating defaultValue={3} size="lg" aria-label="Large rating" />
        <Rating defaultValue={3} size="xl" aria-label="Extra-large rating" />
      </div>
    );
  },
};

export const DisabledAndReadOnly: Story = {
  render: () => {
    return (
      <div className={storyStyles.stack}>
        <Rating defaultValue={4} disabled aria-label="Disabled rating" />
        <Rating defaultValue={2} readOnly aria-label="Read-only rating" />
      </div>
    );
  },
};

export const FormIntegration: Story = {
  render: () => {
    return (
      <Field className={storyStyles.field} name="experienceScore">
        <FieldLabel>Experience score</FieldLabel>
        <FieldDescription>Required discrete score from 1 to 5.</FieldDescription>
        <Rating required aria-label="Experience score" defaultValue={4} />
      </Field>
    );
  },
};

export const CustomStyles: Story = {
  render: () => {
    return (
      <Rating className={storyStyles.customRating} defaultValue={5} aria-label="Styled rating" />
    );
  },
};