import { MenuItem } from '@moduix/react/menu';
import {
  SplitButton,
  SplitButtonAction,
  SplitButtonContent,
  SplitButtonPositioner,
  SplitButtonTrigger,
} from '@moduix/react/split-button';
import styles from '@/components/examples/split-button/split-button-sizes.module.css';

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export default function SplitButtonSizesDemo() {
  return (
    <div className={styles.row}>
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
    </div>
  );
}