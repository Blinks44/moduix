import { Button } from '@moduix/react/button';
import {
  Clipboard,
  ClipboardControl,
  ClipboardIndicator,
  ClipboardInput,
  ClipboardLabel,
  ClipboardTrigger,
} from '@moduix/react/clipboard';
import { Input } from '@moduix/react/input';
import styles from '@/components/examples/clipboard/component-custom-elements.module.css';

export default function CustomElementsClipboardDemo() {
  return (
    <Clipboard className={styles.root} defaultValue="https://moduix.dev/docs/clipboard">
      <ClipboardLabel>Reuse moduix Input and Button</ClipboardLabel>
      <ClipboardControl>
        <ClipboardInput asChild>
          <Input readOnly />
        </ClipboardInput>
        <ClipboardTrigger asChild>
          <Button variant="outline">
            <ClipboardIndicator />
          </Button>
        </ClipboardTrigger>
      </ClipboardControl>
    </Clipboard>
  );
}