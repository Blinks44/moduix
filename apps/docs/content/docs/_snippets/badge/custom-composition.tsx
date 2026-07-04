//#region demo
import { Badge } from '@moduix/react';

const link = {
  href: '#styling',
  label: 'Badge styling guidance',
};

export function BadgeAsChildDemo() {
  return (
    <Badge asChild variant="outline">
      <a className="badge-demo-link" href={link.href}>
        {link.label}
      </a>
    </Badge>
  );
}
//#endregion