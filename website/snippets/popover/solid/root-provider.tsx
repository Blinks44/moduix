import { Button } from '@moduix/solid/button';
import {
  PopoverCloseTrigger,
  PopoverContent,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverPositioner,
  PopoverRootProvider,
  PopoverTitle,
  PopoverTrigger,
  usePopover,
} from '@moduix/solid/popover';
import styles from '@/components/examples/popover/popover-root-provider.module.css';

export default function RootProviderDemo() {
  const popover = usePopover({ positioning: { placement: 'bottom-start', gutter: 8 } });

  return (
    <div class={styles.root}>
      <PopoverRootProvider value={popover}>
        <PopoverTrigger asChild={(props) => <Button {...props()}>Open from trigger</Button>} />
        <PopoverPositioner>
          <PopoverContent>
            <PopoverHeader>
              <PopoverTitle>External state</PopoverTitle>
              <PopoverDescription>
                The usePopover hook owns this popover state.
              </PopoverDescription>
            </PopoverHeader>
            <PopoverFooter>
              <PopoverCloseTrigger>Close</PopoverCloseTrigger>
            </PopoverFooter>
          </PopoverContent>
        </PopoverPositioner>
      </PopoverRootProvider>
      <output>Open: {popover().open ? 'yes' : 'no'}</output>
      <Button size="sm" onClick={() => popover().setOpen(!popover().open)}>
        Toggle externally
      </Button>
    </div>
  );
}
