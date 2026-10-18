import { CloseButton } from '@moduix/react/close-button';
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
} from '@moduix/react/popover';
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
          <div className={styles.header}>
            <PopoverTitle>Custom layout</PopoverTitle>
            <PopoverCloseTrigger asChild>
              <CloseButton aria-label="Close popover" />
            </PopoverCloseTrigger>
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