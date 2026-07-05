//#region demo
import { Button } from '@moduix/react';

const variants = [
  'default',
  'outline',
  'secondary',
  'destructive',
  'destructive-outline',
  'ghost',
  'link',
] as const;

export function ButtonVariantsDemo() {
  return (
    <div className="button-demo-row">
      {variants.map((variant) => (
        <Button key={variant} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  );
}
//#endregion