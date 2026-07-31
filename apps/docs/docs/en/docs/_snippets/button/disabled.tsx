import { Button } from '@moduix/react/button';

const labels = {
  button: 'Disabled',
  link: 'Disabled Link',
};

export default function ButtonDisabledDemo() {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 'var(--moduix-spacing-3)',
      }}
    >
      <Button disabled>{labels.button}</Button>
      <Button asChild disabled variant="outline">
        <a href="#button">{labels.link}</a>
      </Button>
    </div>
  );
}