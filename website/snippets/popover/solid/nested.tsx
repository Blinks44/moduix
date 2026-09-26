import { Button } from '@moduix/solid/button';
import {
  Popover,
  PopoverBody,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverPositioner,
  PopoverTitle,
  PopoverTrigger,
} from '@moduix/solid/popover';
import styles from '@/components/examples/popover/popover-nested.module.css';

export default function NestedPopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild={(props) => <Button {...props()}>Open settings</Button>} />
      <PopoverPositioner>
        <PopoverContent>
          <PopoverHeader>
            <PopoverTitle>Settings</PopoverTitle>
            <PopoverDescription>Nested popovers keep independent state.</PopoverDescription>
          </PopoverHeader>
          <PopoverBody class={styles.body}>
            <Popover portalled={false} positioning={{ placement: 'right', gutter: 8 }}>
              <PopoverTrigger asChild={(props) => <Button {...props()}>Advanced</Button>} />
              <PopoverPositioner>
                <PopoverContent>
                  <PopoverHeader>
                    <PopoverTitle>Advanced settings</PopoverTitle>
                    <PopoverDescription>
                      This content belongs to the nested popover.
                    </PopoverDescription>
                  </PopoverHeader>
                  <PopoverFooter>
                    <PopoverCloseTrigger>Close</PopoverCloseTrigger>
                  </PopoverFooter>
                </PopoverContent>
              </PopoverPositioner>
            </Popover>
          </PopoverBody>
        </PopoverContent>
      </PopoverPositioner>
    </Popover>
  );
}