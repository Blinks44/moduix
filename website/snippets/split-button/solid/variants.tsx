import { MenuItem } from '@moduix/solid/menu';
import {
  SplitButton,
  SplitButtonAction,
  SplitButtonContent,
  SplitButtonPositioner,
  SplitButtonTrigger,
} from '@moduix/solid/split-button';
import { Stack } from '@moduix/solid/stack';

const variants = [
  'default',
  'outline',
  'secondary',
  'destructive',
  'destructive-outline',
  'ghost',
] as const;

export default function SplitButtonVariantsDemo() {
  return (
    <Stack direction="row" align="center" justify="center" wrap="wrap" gap="3">
      {variants.map((variant) => (
        <SplitButton aria-label={`${variant} actions`} variant={variant}>
          <SplitButtonAction>{variant}</SplitButtonAction>
          <SplitButtonTrigger />
          <SplitButtonPositioner>
            <SplitButtonContent>
              <MenuItem value={`${variant}-edit`}>Edit</MenuItem>
              <MenuItem value={`${variant}-duplicate`}>Duplicate</MenuItem>
            </SplitButtonContent>
          </SplitButtonPositioner>
        </SplitButton>
      ))}
    </Stack>
  );
}