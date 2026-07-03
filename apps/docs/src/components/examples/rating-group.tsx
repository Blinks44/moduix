import { RatingGroup as RatingGroupPrimitive, useRatingGroup } from '@ark-ui/react/rating-group';
import { Button, Field, RatingGroup } from '@moduix/react';
import { Heart as HeartIcon } from 'lucide-react';
import { useState, type ComponentProps } from 'react';
import type { CssPropertyInput } from '../preview';
import { CSSPropertiesReferenceTable } from '../preview';

export const ratingGroupExampleCss = `
  .rating-group-stack {
    display: grid;
    gap: var(--spacing-3);
    justify-items: center;
    width: min(20rem, 100%);
  }

  .rating-group-field {
    align-items: center;
    text-align: center;
    width: min(20rem, 100%);
  }

  .rating-group-hint {
    color: var(--color-muted-foreground);
    font-size: var(--text-xs);
    line-height: var(--line-height-text-xs);
  }
`;

export const ratingGroupCustomStylingCss = `
  .rating-group-custom {
    --rating-group-active-color: #f59e0b;
    --rating-group-color: color-mix(in srgb, #f59e0b 35%, var(--color-muted-foreground));
    --rating-group-focus-ring-color: #f59e0b;
    --rating-group-gap: var(--spacing-2);
  }
`;

export const ratingGroupCustomIconCss = `
  .rating-group-custom-icon {
    color: var(--rating-group-active-color, var(--color-primary));

    & > svg {
      fill: currentColor;
      stroke: currentColor;
    }
  }

  .rating-group-custom-icon:not([data-highlighted]) {
    color: var(--rating-group-color, var(--color-muted-foreground));

    & > svg {
      fill: transparent;
      stroke: currentColor;
    }
  }
`;

export const ratingGroupItemsData = `function RatingGroupItems() {
  return (
    <RatingGroupPrimitive.Context>
      {({ items }) =>
        items.map((item) => (
          <RatingGroup.Item key={item} index={item}>
            <RatingGroup.ItemIndicator />
          </RatingGroup.Item>
        ))
      }
    </RatingGroupPrimitive.Context>
  );
}`;

export const ratingGroupCustomIconData = `function RatingGroupHeartItems() {
  return (
    <RatingGroupPrimitive.Context>
      {({ items }) =>
        items.map((item) => (
          <RatingGroup.Item key={item} index={item}>
            <RatingGroup.ItemIndicator className="rating-group-custom-icon">
              <HeartIcon />
            </RatingGroup.ItemIndicator>
          </RatingGroup.Item>
        ))
      }
    </RatingGroupPrimitive.Context>
  );
}`;

export const ratingGroupOverrideCssProperties: CssPropertyInput[] = [
  ['--rating-group-active-color', 'var(--color-primary)', 'Controls highlighted star color.'],
  ['--rating-group-color', 'var(--color-muted-foreground)', 'Controls empty star color.'],
  [
    '--rating-group-disabled-opacity',
    'var(--opacity-disabled)',
    'Controls disabled label and control opacity.',
  ],
  ['--rating-group-focus-ring-color', 'var(--color-ring)', 'Controls item focus ring color.'],
  [
    '--rating-group-focus-ring-offset',
    'var(--border-width-sm)',
    'Controls item focus ring offset.',
  ],
  ['--rating-group-focus-ring-width', 'var(--border-width-sm)', 'Controls item focus ring width.'],
  ['--rating-group-gap', 'var(--spacing-1)', 'Controls gap between rating items.'],
  ['--rating-group-root-gap', 'var(--spacing-1)', 'Controls gap between label and control.'],
  ['--rating-group-icon-size-xs', '0.875rem', 'Controls icon size for `xs`.'],
  ['--rating-group-icon-size-sm', '1rem', 'Controls icon size for `sm`.'],
  ['--rating-group-icon-size-md', '1.25rem', 'Controls icon size for `md`.'],
  ['--rating-group-icon-size-lg', '1.5rem', 'Controls icon size for `lg`.'],
  ['--rating-group-icon-size-xl', '1.75rem', 'Controls icon size for `xl`.'],
  ['--rating-group-label-color', 'var(--color-foreground)', 'Controls label text color.'],
  ['--rating-group-label-font-size', 'var(--text-sm)', 'Controls label font size.'],
  ['--rating-group-label-font-weight', 'var(--weight-semibold)', 'Controls label weight.'],
  ['--rating-group-label-line-height', 'var(--line-height-text-sm)', 'Controls label line height.'],
  [
    '--rating-group-transition',
    'var(--transition-default)',
    'Controls icon color, fill, and clip transition timing.',
  ],
];

const ratingGroupCssPropertiesReference =
  ratingGroupOverrideCssProperties.map(normalizeCssProperty);

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}

function RatingGroupItems() {
  return (
    <RatingGroupPrimitive.Context>
      {({ items }) =>
        items.map((item) => (
          <RatingGroup.Item key={item} index={item}>
            <RatingGroup.ItemIndicator />
          </RatingGroup.Item>
        ))
      }
    </RatingGroupPrimitive.Context>
  );
}

function RatingGroupHeartItems() {
  return (
    <RatingGroupPrimitive.Context>
      {({ items }) =>
        items.map((item) => (
          <RatingGroup.Item key={item} index={item}>
            <RatingGroup.ItemIndicator className="rating-group-custom-icon">
              <HeartIcon />
            </RatingGroup.ItemIndicator>
          </RatingGroup.Item>
        ))
      }
    </RatingGroupPrimitive.Context>
  );
}

export function RatingGroupCssPropertiesPanel() {
  return <CSSPropertiesReferenceTable properties={ratingGroupCssPropertiesReference} />;
}

export function RatingGroupExample(props: ComponentProps<typeof RatingGroup>) {
  return (
    <RatingGroup defaultValue={4} {...props}>
      <RatingGroup.Label>Overall satisfaction</RatingGroup.Label>
      <RatingGroup.Control>
        <RatingGroupItems />
        <RatingGroup.HiddenInput />
      </RatingGroup.Control>
    </RatingGroup>
  );
}

export function ControlledRatingGroupExample() {
  const [value, setValue] = useState(3);

  return (
    <div className="rating-group-stack">
      <RatingGroup value={value} onValueChange={(details) => setValue(details.value)}>
        <RatingGroup.Label>Support quality</RatingGroup.Label>
        <RatingGroup.Control>
          <RatingGroupItems />
          <RatingGroup.HiddenInput />
        </RatingGroup.Control>
      </RatingGroup>
      <span className="rating-group-hint">Current value: {value}</span>
    </div>
  );
}

export function RootProviderRatingGroupExample() {
  const ratingGroup = useRatingGroup({ count: 5, defaultValue: 3 });

  return (
    <div className="rating-group-stack">
      <output className="rating-group-hint">Current value: {ratingGroup.value}</output>
      <RatingGroup.RootProvider value={ratingGroup}>
        <RatingGroup.Label>Product quality</RatingGroup.Label>
        <RatingGroup.Control>
          <RatingGroupItems />
          <RatingGroup.HiddenInput />
        </RatingGroup.Control>
      </RatingGroup.RootProvider>
    </div>
  );
}

export function WithFieldRatingGroupExample() {
  return (
    <Field className="rating-group-field">
      <RatingGroup defaultValue={4} required>
        <RatingGroup.Label>Experience score</RatingGroup.Label>
        <RatingGroup.Control>
          <RatingGroupItems />
          <RatingGroup.HiddenInput />
        </RatingGroup.Control>
      </RatingGroup>
      <Field.HelperText>Required score from 1 to 5.</Field.HelperText>
      <Field.ErrorText>Choose a score before continuing.</Field.ErrorText>
    </Field>
  );
}

export function HalfRatingGroupExample() {
  return (
    <RatingGroup allowHalf defaultValue={3.5}>
      <RatingGroup.Label>Average delivery score</RatingGroup.Label>
      <RatingGroup.Control>
        <RatingGroupItems />
        <RatingGroup.HiddenInput />
      </RatingGroup.Control>
    </RatingGroup>
  );
}

export function FormRatingGroupExample() {
  return (
    <form
      className="rating-group-stack"
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <RatingGroup name="review" defaultValue={4} required>
        <RatingGroup.Label>Review score</RatingGroup.Label>
        <RatingGroup.Control>
          <RatingGroupItems />
          <RatingGroup.HiddenInput />
        </RatingGroup.Control>
      </RatingGroup>
      <Button type="submit">Submit</Button>
    </form>
  );
}

export function DisabledRatingGroupExample() {
  return (
    <div className="rating-group-stack">
      <RatingGroup defaultValue={4} disabled>
        <RatingGroup.Label>Disabled rating</RatingGroup.Label>
        <RatingGroup.Control>
          <RatingGroupItems />
          <RatingGroup.HiddenInput />
        </RatingGroup.Control>
      </RatingGroup>
      <RatingGroup defaultValue={2} readOnly>
        <RatingGroup.Label>Read-only rating</RatingGroup.Label>
        <RatingGroup.Control>
          <RatingGroupItems />
          <RatingGroup.HiddenInput />
        </RatingGroup.Control>
      </RatingGroup>
    </div>
  );
}

export function RatingGroupSizesExample() {
  return (
    <div className="rating-group-stack">
      <RatingGroup defaultValue={3} size="xs" aria-label="Extra-small rating">
        <RatingGroup.Control>
          <RatingGroupItems />
        </RatingGroup.Control>
      </RatingGroup>
      <RatingGroup defaultValue={3} size="sm" aria-label="Small rating">
        <RatingGroup.Control>
          <RatingGroupItems />
        </RatingGroup.Control>
      </RatingGroup>
      <RatingGroup defaultValue={3} size="md" aria-label="Medium rating">
        <RatingGroup.Control>
          <RatingGroupItems />
        </RatingGroup.Control>
      </RatingGroup>
      <RatingGroup defaultValue={3} size="lg" aria-label="Large rating">
        <RatingGroup.Control>
          <RatingGroupItems />
        </RatingGroup.Control>
      </RatingGroup>
      <RatingGroup defaultValue={3} size="xl" aria-label="Extra-large rating">
        <RatingGroup.Control>
          <RatingGroupItems />
        </RatingGroup.Control>
      </RatingGroup>
    </div>
  );
}

export function CustomStylesRatingGroupExample() {
  return (
    <RatingGroup className="rating-group-custom" defaultValue={5}>
      <RatingGroup.Label>Styled rating</RatingGroup.Label>
      <RatingGroup.Control>
        <RatingGroupItems />
        <RatingGroup.HiddenInput />
      </RatingGroup.Control>
    </RatingGroup>
  );
}

export function CustomIconRatingGroupExample() {
  return (
    <RatingGroup defaultValue={3}>
      <RatingGroup.Label>Checklist score</RatingGroup.Label>
      <RatingGroup.Control>
        <RatingGroupHeartItems />
        <RatingGroup.HiddenInput />
      </RatingGroup.Control>
    </RatingGroup>
  );
}