import { Button } from '@moduix/solid/button';
import { Popover } from '@moduix/solid/popover';
import styles from '@/components/examples/popover/popover-advanced-customization.module.css';

export default function AdvancedCustomizationPopoverDemo() {
  return (
    <Popover positioning={{ gutter: 8 }}>
      <Popover.Trigger asChild={(props) => <Button {...props()}>Open custom popover</Button>} />
      <Popover.Positioner>
        <Popover.Content>
          <div class={styles.header}>
            <Popover.Title>Custom layout</Popover.Title>
            <Popover.CloseIcon />
          </div>
          <Popover.Description>
            Compose Ark parts directly and replace the standard arrow when the layout calls for a
            clean anchored panel.
          </Popover.Description>
        </Popover.Content>
      </Popover.Positioner>
    </Popover>
  );
}