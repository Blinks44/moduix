import { Tooltip, useTooltip } from '@moduix/react/tooltip';
import { PreviewMeta } from '@/components/mdx/Components';

export default function RootProviderTooltipDemo() {
  const tooltip = useTooltip();
  return (
    <>
      <Tooltip.RootProvider value={tooltip}>
        <Tooltip.Trigger>RootProvider tooltip</Tooltip.Trigger>
        <Tooltip.Body>State is owned outside the tree.</Tooltip.Body>
      </Tooltip.RootProvider>
      <PreviewMeta>
        <output>Open: {String(tooltip.open)}</output>
      </PreviewMeta>
    </>
  );
}