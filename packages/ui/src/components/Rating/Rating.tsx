import { Radio as RadioPrimitive } from '@base-ui/react/radio';
import { RadioGroup as RadioGroupPrimitive } from '@base-ui/react/radio-group';
import { forwardRef, type ComponentRef, useState } from 'react';
import { RatingStarIcon } from '@/icons/ui';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Rating.module.css';

type RatingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type RatingProps = Omit<
  RadioGroupPrimitive.Props,
  'children' | 'defaultValue' | 'orientation' | 'onValueChange' | 'value'
> & {
  defaultValue?: number;
  max?: number;
  onValueChange?: (value: number) => void;
  size?: RatingSize;
  value?: number;
};

const DEFAULT_MAX = 5;

const Rating = forwardRef<ComponentRef<typeof RadioGroupPrimitive>, RatingProps>(function Rating(
  {
    className,
    defaultValue,
    disabled,
    max = DEFAULT_MAX,
    onValueChange,
    readOnly,
    size = 'md',
    value,
    ...props
  },
  ref,
) {
  const normalizedMax = normalizeMax(max);
  const [uncontrolledValue, setUncontrolledValue] = useState<number | undefined>(() =>
    normalizeRatingValue(defaultValue, normalizedMax),
  );
  const currentValue = normalizeRatingValue(value ?? uncontrolledValue, normalizedMax);

  const handleValueChange = (nextValue: string | number) => {
    const normalizedValue = normalizeRatingValue(Number(nextValue), normalizedMax);

    if (normalizedValue == null) {
      return;
    }

    if (value === undefined) {
      setUncontrolledValue(normalizedValue);
    }

    onValueChange?.(normalizedValue);
  };

  return (
    <RadioGroupPrimitive
      ref={ref}
      data-slot="rating-root"
      data-size={size}
      className={mergeClassName(className, styles.root)}
      disabled={disabled}
      onValueChange={handleValueChange}
      readOnly={readOnly}
      value={currentValue?.toString()}
      {...props}
    >
      {Array.from({ length: normalizedMax }, (_, index) => {
        const ratingValue = index + 1;
        const isFilled = currentValue != null && ratingValue <= currentValue;

        return (
          <RadioPrimitive.Root
            key={ratingValue}
            aria-label={
              readOnly
                ? `${ratingValue} out of ${normalizedMax}`
                : `Rate ${ratingValue} out of ${normalizedMax}`
            }
            data-empty={isFilled ? undefined : ''}
            data-filled={isFilled ? '' : undefined}
            data-slot="rating-item"
            className={styles.item}
            disabled={disabled}
            readOnly={readOnly}
            value={ratingValue.toString()}
          >
            <RatingStarIcon data-slot="rating-icon" className={styles.icon} />
          </RadioPrimitive.Root>
        );
      })}
    </RadioGroupPrimitive>
  );
});

function normalizeMax(max: number) {
  if (!Number.isFinite(max)) {
    return DEFAULT_MAX;
  }

  return Math.max(1, Math.floor(max));
}

function normalizeRatingValue(value: number | undefined, max: number) {
  if (value == null || !Number.isFinite(value)) {
    return undefined;
  }

  const normalizedValue = Math.floor(value);

  if (normalizedValue < 1) {
    return undefined;
  }

  return Math.min(normalizedValue, max);
}

export { Rating };
export type { RatingProps, RatingSize };