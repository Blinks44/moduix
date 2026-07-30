import { Separator } from '@moduix/react';

const navigationItems = ['Home', 'Pricing', 'Sign in'];

export default function VerticalSeparatorDemo() {
  return (
    <nav
      aria-label="Main navigation"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--moduix-spacing-3)',
        textWrap: 'nowrap',
      }}
    >
      {navigationItems.slice(0, 2).map((item) => (
        <a
          key={item}
          href="#"
          style={{ color: 'var(--moduix-color-foreground)', textDecoration: 'none' }}
        >
          {item}
        </a>
      ))}
      <Separator orientation="vertical" />
      <a href="#" style={{ color: 'var(--moduix-color-foreground)', textDecoration: 'none' }}>
        {navigationItems[2]}
      </a>
    </nav>
  );
}