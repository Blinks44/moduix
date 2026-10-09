import { Button } from '@moduix/solid/button';
import { SignaturePad, SignaturePadCanvas, SignaturePadLabel } from '@moduix/solid/signature-pad';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/signature-pad/signature-pad-controlled.module.css';

const initialSignaturePaths = [
  'M6.757,45.806C11.684,39.875,17.669,32.53,24.079,29.566C26.284,28.546,27.452,29.271,27.521,31.667C27.636,35.667,22.571,44.044,25.147,44.955C29.026,46.326,39.597,31.439,42.437,34.176C44.579,36.24,37.018,46.47,40.286,47.783C45.649,49.936,60.544,38.473,67.547,36.797C72.925,35.51,72.235,43.583,76.9,43.937C82.556,44.366,91.341,36.575,96.806,34.921C101.242,33.579,100.14,40.045,104.271,40.93C110.069,42.171,119.64,35.12,125.14,33.842C128.063,33.163,128.868,34.596,129.043,37.296',
];

export default function ControlledSignaturePadDemo() {
  const [paths, setPaths] = createSignal(initialSignaturePaths);

  return (
    <div class={styles.root}>
      <SignaturePad paths={paths()} onDraw={(details) => setPaths(details.paths)}>
        <SignaturePadLabel>Sign below</SignaturePadLabel>
        <SignaturePadCanvas />
      </SignaturePad>
      <div>
        <output>Paths: {paths().length}</output>
        <Button size="sm" variant="outline" onClick={() => setPaths(initialSignaturePaths)}>
          Restore
        </Button>
        <Button size="sm" variant="outline" onClick={() => setPaths([])}>
          Clear
        </Button>
      </div>
    </div>
  );
}