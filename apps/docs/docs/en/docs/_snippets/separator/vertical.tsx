import { Separator } from '@moduix/react';

const navigationItems = ['Home', 'Pricing', 'Sign in'];

export default function VerticalSeparatorDemo() {
  return (
    <nav className="nav" aria-label="Main navigation">
      {navigationItems.slice(0, 2).map((item) => (
        <a key={item} href="#" className="link">
          {item}
        </a>
      ))}
      <Separator orientation="vertical" />
      <a href="#" className="link">
        {navigationItems[2]}
      </a>
    </nav>
  );
}