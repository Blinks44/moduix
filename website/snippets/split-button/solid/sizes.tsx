import { MenuItem } from '@moduix/solid/menu';
import {
  SplitButton,
  SplitButtonAction,
  SplitButtonContent,
  SplitButtonPositioner,
  SplitButtonTrigger,
} from '@moduix/solid/split-button';
import styles from '@/components/examples/split-button/split-button-sizes.module.css';

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export default function SplitButtonSizesDemo() {
  return (
    <div class={styles.row}>
      {sizes.map((size) => (
        <SplitButton aria-label={`${size} create actions`} size={size} variant="outline">
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
    </div>
  );
}