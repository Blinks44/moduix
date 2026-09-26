import { MenuItem } from '@moduix/solid/menu';
import {
  SplitButton,
  SplitButtonAction,
  SplitButtonContent,
  SplitButtonPositioner,
  SplitButtonTrigger,
} from '@moduix/solid/split-button';
import styles from '@/components/examples/split-button/split-button-variants.module.css';

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
    <div class={styles.row}>
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
    </div>
  );
}