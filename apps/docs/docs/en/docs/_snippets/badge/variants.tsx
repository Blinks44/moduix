import { Badge } from '@moduix/react';

const variants = ['default', 'secondary', 'destructive', 'outline', 'ghost', 'link'] as const;

export default function BadgeVariantsDemo() {
  return (
    <div className="badge-demo-row">
      {variants.map((variant) => (
        <Badge key={variant} variant={variant}>
          {variant}
        </Badge>
      ))}
    </div>
  );
}