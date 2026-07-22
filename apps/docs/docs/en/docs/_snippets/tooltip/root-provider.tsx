import { Tooltip, useTooltip } from '@moduix/react';
import styles from '@/components/examples/tooltip.module.css';

export default function RootProviderTooltipDemo() {
  const tooltip = useTooltip();
  return (
    <div className={styles.stack}>
      <output className={styles.output}>Open: {String(tooltip.open)}</output>
      <Tooltip.RootProvider value={tooltip}>
        <Tooltip.Trigger>RootProvider tooltip</Tooltip.Trigger>
        <Tooltip.Body>State is owned outside the tree.</Tooltip.Body>
      </Tooltip.RootProvider>
    </div>
  );
}