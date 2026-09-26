import { Button } from '@moduix/solid/button';
import {
  Popover,
  PopoverCloseIcon,
  PopoverContent,
  PopoverDescription,
  PopoverPositioner,
  PopoverTitle,
  PopoverTrigger,
} from '@moduix/solid/popover';
import styles from '@/components/examples/popover/popover-advanced-customization.module.css';

export default function AdvancedCustomizationPopoverDemo() {
  return (
    <Popover positioning={{ gutter: 8 }}>
      <PopoverTrigger asChild={(props) => <Button {...props()}>Open custom popover</Button>} />
      <PopoverPositioner>
        <PopoverContent>
          <div class={styles.header}>
            <PopoverTitle>Custom layout</PopoverTitle>
            <PopoverCloseIcon />
          </div>
          <PopoverDescription>
            Compose Ark parts directly and replace the standard arrow when the layout calls for a
            clean anchored panel.
          </PopoverDescription>
        </PopoverContent>
      </PopoverPositioner>
    </Popover>
  );
}