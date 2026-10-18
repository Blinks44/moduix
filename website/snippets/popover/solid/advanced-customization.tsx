import { CloseButton } from '@moduix/solid/close-button';
import {
  Popover,
  PopoverArrow,
  PopoverArrowTip,
  PopoverCloseTrigger,
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
      <PopoverTrigger>Open custom popover</PopoverTrigger>
      <PopoverPositioner>
        <PopoverContent>
          <PopoverArrow>
            <PopoverArrowTip />
          </PopoverArrow>
          <div class={styles.header}>
            <PopoverTitle>Custom layout</PopoverTitle>
            <PopoverCloseTrigger
              asChild={(props) => <CloseButton {...props()} aria-label="Close popover" />}
            />
          </div>
          <PopoverDescription>
            Build the popup from the low-level parts when the header, body, and footer helpers do
            not fit the layout.
          </PopoverDescription>
        </PopoverContent>
      </PopoverPositioner>
    </Popover>
  );
}