import { Badge } from '@moduix/react';

const link = {
  href: '#styling',
  label: 'Badge styling guidance',
};

export default function BadgeLinkDemo() {
  return (
    <Badge asChild variant="link">
      <a href={link.href}>{link.label}</a>
    </Badge>
  );
}