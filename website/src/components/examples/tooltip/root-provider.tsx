import {
  useTooltip,
  TooltipBody,
  TooltipRootProvider,
  TooltipTrigger,
} from '@moduix/react/tooltip';
import { PreviewMeta } from '@/components/mdx/Components';

export default function RootProviderTooltipDemo() {
  const tooltip = useTooltip();
  return (
    <>
      <TooltipRootProvider value={tooltip}>
        <TooltipTrigger>RootProvider tooltip</TooltipTrigger>
        <TooltipBody>State is owned outside the tree.</TooltipBody>
      </TooltipRootProvider>
      <PreviewMeta>
        <output>Open: {String(tooltip.open)}</output>
      </PreviewMeta>
    </>
  );
}
