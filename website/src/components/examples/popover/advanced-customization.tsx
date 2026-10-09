import { Button } from '@moduix/react/button';
import {
  Popover,
  PopoverCloseIcon,
  PopoverContent,
  PopoverDescription,
  PopoverPositioner,
  PopoverTitle,
  PopoverTrigger,
} from '@moduix/react/popover';
import styles from '@/components/examples/popover/popover-advanced-customization.module.css';

export default function AdvancedCustomizationPopoverDemo() {
  return (
    <Popover
      positioning={{
        gutter: 8,
      }}
    >
      <PopoverTrigger asChild>
        <Button>Open custom popover</Button>
      </PopoverTrigger>
      <PopoverPositioner>
        <PopoverContent>
          <div className={styles.header}>
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