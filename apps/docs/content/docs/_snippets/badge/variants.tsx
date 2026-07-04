//#region demo
import { Badge } from '@moduix/react';

const variants = ['default', 'secondary', 'destructive', 'outline', 'ghost'] as const;

export function BadgeVariantsDemo() {
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
//#endregion