import { Button } from '@moduix/solid/button';
import {
  Clipboard,
  ClipboardControl,
  ClipboardIndicator,
  ClipboardInput,
  ClipboardLabel,
  ClipboardTrigger,
} from '@moduix/solid/clipboard';
import { Input } from '@moduix/solid/input';
import styles from '@/components/examples/clipboard/component-advanced-customization.module.css';

export default function AsChildClipboardDemo() {
  return (
    <Clipboard class={styles.root} defaultValue="https://moduix.dev/docs/clipboard">
      <ClipboardLabel>Reuse moduix Input and Button</ClipboardLabel>
      <ClipboardControl>
        <ClipboardInput asChild={(props) => <Input {...props()} readOnly />} />
        <ClipboardTrigger asChild={(props) => <Button {...props()} variant="outline" />}>
          <ClipboardIndicator />
        </ClipboardTrigger>
      </ClipboardControl>
    </Clipboard>
  );
}