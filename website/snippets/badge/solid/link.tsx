import { Badge } from '@moduix/solid/badge';

const link = {
  href: '#styling',
  label: 'Badge styling guidance',
};

export default function BadgeLinkDemo() {
  return (
    <Badge
      variant="link"
      asChild={(props) => (
        <a {...props()} href={link.href}>
          {link.label}
        </a>
      )}
    />
  );
}