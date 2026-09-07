import { Button } from '@moduix/solid/button';

const link = {
  href: '#button',
  label: 'Open Button Docs',
};

export default function ButtonLinkDemo() {
  return (
    <Button
      asChild={(props) => (
        <a {...props()} href={link.href}>
          {link.label}
        </a>
      )}
      variant="outline"
    />
  );
}