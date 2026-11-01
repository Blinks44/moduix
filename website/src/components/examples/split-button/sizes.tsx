import { MenuItem } from '@moduix/react/menu';
import {
  SplitButton,
  SplitButtonAction,
  SplitButtonContent,
  SplitButtonPositioner,
  SplitButtonTrigger,
} from '@moduix/react/split-button';
import { Stack } from '@moduix/react/stack';

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export default function SplitButtonSizesDemo() {
  return (
    <Stack direction="row" align="center" justify="center" wrap="wrap" gap="3">
      {sizes.map((size) => (
        <SplitButton key={size} aria-label={`${size} create actions`} size={size} variant="outline">
          <SplitButtonAction>{size}</SplitButtonAction>
          <SplitButtonTrigger />
          <SplitButtonPositioner>
            <SplitButtonContent>
              <MenuItem value={`${size}-create`}>Create</MenuItem>
              <MenuItem value={`${size}-create-open`}>Create and Open</MenuItem>
            </SplitButtonContent>
          </SplitButtonPositioner>
        </SplitButton>
      ))}
    </Stack>
  );
}