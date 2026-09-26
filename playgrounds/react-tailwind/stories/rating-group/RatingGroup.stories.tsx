import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ComponentProps, useState } from 'react';
import { Button } from '@/components/button/Button';
import { Field, FieldHelperText } from '@/components/field';
import {
  RatingGroup,
  RatingGroupContext,
  RatingGroupControl,
  RatingGroupHiddenInput,
  RatingGroupItem,
  RatingGroupItemIndicator,
  RatingGroupItems,
  RatingGroupLabel,
  RatingGroupRootProvider,
  useRatingGroup,
} from '@/components/rating-group/RatingGroup';

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

const fieldClass = 'w-64';
const stackClass = 'grid gap-3';
const hintClass = 'text-xs leading-4 text-muted-foreground';
const customIndicatorClass =
  'text-muted-foreground data-highlighted:text-[#f59e0b] data-highlighted:[&>svg]:fill-current [&>svg]:fill-transparent [&>svg]:stroke-current';

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
  render: () => (
    <RatingGroup defaultValue={4}>
      <RatingGroupLabel>Overall satisfaction</RatingGroupLabel>
      <RatingGroupControl>
        <RatingGroupItems />
      </RatingGroupControl>
    </RatingGroup>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState(3);

    return (
      <div className={stackClass}>
        <RatingGroup value={value} onValueChange={(details) => setValue(details.value)}>
          <RatingGroupLabel>Support quality</RatingGroupLabel>
          <RatingGroupControl>
            <RatingGroupItems />
          </RatingGroupControl>
          <RatingGroupHiddenInput />
        </RatingGroup>
        <span className={hintClass}>Current value: {value}</span>
      </div>
    );
  },
};

export const HalfRating: Story = {
  render: () => (
    <RatingGroup allowHalf defaultValue={3.5}>
      <RatingGroupLabel>Average delivery score</RatingGroupLabel>
      <RatingGroupControl>
        <RatingGroupItems />
      </RatingGroupControl>
    </RatingGroup>
  ),
};

export const RootProvider: Story = {
  render: () => {
    const ratingGroup = useRatingGroup({ count: 5, defaultValue: 3 });

    return (
      <div className={stackClass}>
        <output className={hintClass}>Current value: {ratingGroup.value}</output>
        <RatingGroupRootProvider value={ratingGroup}>
          <RatingGroupLabel>Product quality</RatingGroupLabel>
          <RatingGroupControl>
            <RatingGroupContext>
              {({ items }) =>
                items.map((item) => (
                  <RatingGroupItem key={item} index={item}>
                    <RatingGroupItemIndicator />
                  </RatingGroupItem>
                ))
              }
            </RatingGroupContext>
          </RatingGroupControl>
        </RatingGroupRootProvider>
      </div>
    );
  },
};

export const WithField: Story = {
  render: () => (
    <Field className={fieldClass}>
      <RatingGroup defaultValue={4} required>
        <RatingGroupLabel>Experience score</RatingGroupLabel>
        <RatingGroupControl>
          <RatingGroupItems />
        </RatingGroupControl>
        <RatingGroupHiddenInput />
      </RatingGroup>
      <FieldHelperText>Required score from 1 to 5.</FieldHelperText>
    </Field>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className={stackClass}>
      <RatingGroup defaultValue={3} size="xs" aria-label="Extra-small rating">
        <RatingGroupControl>
          <RatingGroupItems />
        </RatingGroupControl>
      </RatingGroup>
      <RatingGroup defaultValue={3} size="sm" aria-label="Small rating">
        <RatingGroupControl>
          <RatingGroupItems />
        </RatingGroupControl>
      </RatingGroup>
      <RatingGroup defaultValue={3} size="md" aria-label="Medium rating">
        <RatingGroupControl>
          <RatingGroupItems />
        </RatingGroupControl>
      </RatingGroup>
      <RatingGroup defaultValue={3} size="lg" aria-label="Large rating">
        <RatingGroupControl>
          <RatingGroupItems />
        </RatingGroupControl>
      </RatingGroup>
      <RatingGroup defaultValue={3} size="xl" aria-label="Extra-large rating">
        <RatingGroupControl>
          <RatingGroupItems />
        </RatingGroupControl>
      </RatingGroup>
    </div>
  ),
};

export const DisabledAndReadOnly: Story = {
  render: () => (
    <div className={stackClass}>
      <RatingGroup defaultValue={4} disabled>
        <RatingGroupLabel>Disabled rating</RatingGroupLabel>
        <RatingGroupControl>
          <RatingGroupItems />
        </RatingGroupControl>
      </RatingGroup>
      <RatingGroup defaultValue={2} readOnly>
        <RatingGroupLabel>Read-only rating</RatingGroupLabel>
        <RatingGroupControl>
          <RatingGroupItems />
        </RatingGroupControl>
      </RatingGroup>
    </div>
  ),
};

export const FormUsage: Story = {
  render: () => (
    <form className={stackClass} onSubmit={(event) => event.preventDefault()}>
      <RatingGroup name="review" defaultValue={4} required>
        <RatingGroupLabel>Review score</RatingGroupLabel>
        <RatingGroupControl>
          <RatingGroupItems />
        </RatingGroupControl>
        <RatingGroupHiddenInput />
      </RatingGroup>
      <Button type="submit">Submit</Button>
    </form>
  ),
};

export const CustomStyles: Story = {
  render: () => (
    <RatingGroup className="gap-2" defaultValue={5}>
      <RatingGroupLabel>Styled rating</RatingGroupLabel>
      <RatingGroupControl className="gap-2">
        <RatingGroupItems>
          <RatingGroupItemIndicator className={customIndicatorClass}>
            <HeartIcon />
          </RatingGroupItemIndicator>
        </RatingGroupItems>
      </RatingGroupControl>
    </RatingGroup>
  ),
};

export const CustomIcon: Story = {
  render: () => (
    <RatingGroup defaultValue={3}>
      <RatingGroupLabel>Checklist score</RatingGroupLabel>
      <RatingGroupControl>
        <RatingGroupItems>
          <RatingGroupItemIndicator className={customIndicatorClass}>
            <HeartIcon />
          </RatingGroupItemIndicator>
        </RatingGroupItems>
      </RatingGroupControl>
    </RatingGroup>
  ),
};

export const AsChild: Story = {
  render: () => (
    <RatingGroup asChild defaultValue={4}>
      <section className="rounded-md border border-border p-3">
        <RatingGroupLabel>Semantic rating section</RatingGroupLabel>
        <RatingGroupControl>
          <RatingGroupItems />
        </RatingGroupControl>
      </section>
    </RatingGroup>
  ),
};