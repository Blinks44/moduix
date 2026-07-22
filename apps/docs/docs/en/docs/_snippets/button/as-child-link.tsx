import { Button } from '@moduix/react';

const link = {
  href: '#button',
  label: 'Open Button Docs',
};

export default function ButtonLinkDemo() {
  return (
    <Button asChild variant="outline">
      <a href={link.href}>{link.label}</a>
    </Button>
  );
}