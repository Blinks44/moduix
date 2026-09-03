import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ComponentProps, useState } from 'react';
import { Button } from '@/components/button/Button';
import { Field } from '@/components/field';
import { RatingGroup, useRatingGroup } from '@/components/rating-group/RatingGroup';
import storyStyles from './RatingGroup.stories.module.css';

const meta = {
  title: 'Components/RatingGroup',
  component: RatingGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof RatingGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

function HeartIcon(props: ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
    </svg>
  );
}

export const Basic: Story = {
  render: () => {
    return (
      <RatingGroup defaultValue={4}>
        <RatingGroup.Label>Overall satisfaction</RatingGroup.Label>
        <RatingGroup.Control>
          <RatingGroup.Items />
        </RatingGroup.Control>
      </RatingGroup>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState(3);

    return (
      <div className={storyStyles.stack}>
        <RatingGroup value={value} onValueChange={(details) => setValue(details.value)}>
          <RatingGroup.Label>Support quality</RatingGroup.Label>
          <RatingGroup.Control>
            <RatingGroup.Items />
          </RatingGroup.Control>
        </RatingGroup>
        <span className={storyStyles.hint}>Current value: {value}</span>
      </div>
    );
  },
};

export const HalfRating: Story = {
  render: () => {
    return (
      <RatingGroup allowHalf defaultValue={3.5}>
        <RatingGroup.Label>Average delivery score</RatingGroup.Label>
        <RatingGroup.Control>
          <RatingGroup.Items />
        </RatingGroup.Control>
      </RatingGroup>
    );
  },
};

export const RootProvider: Story = {
  render: () => {
    const ratingGroup = useRatingGroup({ count: 5, defaultValue: 3 });

    return (
      <div className={storyStyles.stack}>
        <output className={storyStyles.hint}>Current value: {ratingGroup.value}</output>
        <RatingGroup.RootProvider value={ratingGroup}>
          <RatingGroup.Label>Product quality</RatingGroup.Label>
          <RatingGroup.Control>
            <RatingGroup.Context>
              {({ items }) =>
                items.map((item) => (
                  <RatingGroup.Item key={item} index={item}>
                    <RatingGroup.ItemIndicator />
                  </RatingGroup.Item>
                ))
              }
            </RatingGroup.Context>
          </RatingGroup.Control>
        </RatingGroup.RootProvider>
      </div>
    );
  },
};

export const WithField: Story = {
  render: () => {
    return (
      <Field className={storyStyles.field}>
        <RatingGroup defaultValue={4} required>
          <RatingGroup.Label>Experience score</RatingGroup.Label>
          <RatingGroup.Control>
            <RatingGroup.Items />
          </RatingGroup.Control>
        </RatingGroup>
        <Field.HelperText>Required score from 1 to 5.</Field.HelperText>
      </Field>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    return (
      <div className={storyStyles.stack}>
        <RatingGroup defaultValue={3} size="xs" aria-label="Extra-small rating">
          <RatingGroup.Control>
            <RatingGroup.Items />
          </RatingGroup.Control>
        </RatingGroup>
        <RatingGroup defaultValue={3} size="sm" aria-label="Small rating">
          <RatingGroup.Control>
            <RatingGroup.Items />
          </RatingGroup.Control>
        </RatingGroup>
        <RatingGroup defaultValue={3} size="md" aria-label="Medium rating">
          <RatingGroup.Control>
            <RatingGroup.Items />
          </RatingGroup.Control>
        </RatingGroup>
        <RatingGroup defaultValue={3} size="lg" aria-label="Large rating">
          <RatingGroup.Control>
            <RatingGroup.Items />
          </RatingGroup.Control>
        </RatingGroup>
        <RatingGroup defaultValue={3} size="xl" aria-label="Extra-large rating">
          <RatingGroup.Control>
            <RatingGroup.Items />
          </RatingGroup.Control>
        </RatingGroup>
      </div>
    );
  },
};

export const DisabledAndReadOnly: Story = {
  render: () => {
    return (
      <div className={storyStyles.stack}>
        <RatingGroup defaultValue={4} disabled>
          <RatingGroup.Label>Disabled rating</RatingGroup.Label>
          <RatingGroup.Control>
            <RatingGroup.Items />
          </RatingGroup.Control>
        </RatingGroup>
        <RatingGroup defaultValue={2} readOnly>
          <RatingGroup.Label>Read-only rating</RatingGroup.Label>
          <RatingGroup.Control>
            <RatingGroup.Items />
          </RatingGroup.Control>
        </RatingGroup>
      </div>
    );
  },
};

export const FormUsage: Story = {
  render: () => {
    return (
      <form
        className={storyStyles.stack}
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <RatingGroup name="review" defaultValue={4} required>
          <RatingGroup.Label>Review score</RatingGroup.Label>
          <RatingGroup.Control>
            <RatingGroup.Items />
          </RatingGroup.Control>
        </RatingGroup>
        <Button type="submit">Submit</Button>
      </form>
    );
  },
};

export const CustomStyles: Story = {
  render: () => {
    return (
      <RatingGroup className={storyStyles.customRatingGroup} defaultValue={5}>
        <RatingGroup.Label>Styled rating</RatingGroup.Label>
        <RatingGroup.Control>
          <RatingGroup.Items />
        </RatingGroup.Control>
      </RatingGroup>
    );
  },
};

export const CustomIcon: Story = {
  render: () => {
    return (
      <RatingGroup defaultValue={3}>
        <RatingGroup.Label>Checklist score</RatingGroup.Label>
        <RatingGroup.Control>
          <RatingGroup.Items>
            <RatingGroup.ItemIndicator className={storyStyles.customIcon}>
              <HeartIcon />
            </RatingGroup.ItemIndicator>
          </RatingGroup.Items>
        </RatingGroup.Control>
      </RatingGroup>
    );
  },
};

export const AsChild: Story = {
  render: () => {
    return (
      <RatingGroup asChild defaultValue={4}>
        <section className={storyStyles.asChild}>
          <RatingGroup.Label>Semantic rating section</RatingGroup.Label>
          <RatingGroup.Control>
            <RatingGroup.Items />
          </RatingGroup.Control>
        </section>
      </RatingGroup>
    );
  },
};