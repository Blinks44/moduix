import { Card } from '@moduix/solid/card';
import styles from './parallax-card.module.css';

function updateTilt(event: PointerEvent & { currentTarget: HTMLDivElement }) {
  const bounds = event.currentTarget.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width - 0.5;
  const y = (event.clientY - bounds.top) / bounds.height - 0.5;

  event.currentTarget.style.setProperty('--parallax-rotate-x', `${-y * 10}deg`);
  event.currentTarget.style.setProperty('--parallax-rotate-y', `${x * 10}deg`);
}

function resetTilt(event: PointerEvent & { currentTarget: HTMLDivElement }) {
  event.currentTarget.style.removeProperty('--parallax-rotate-x');
  event.currentTarget.style.removeProperty('--parallax-rotate-y');
}

export function ParallaxCard() {
  return (
    <div class={styles.tilt} onPointerMove={updateTilt} onPointerLeave={resetTilt}>
      <Card class={styles.card} variant="elevated">
        <Card.Background>
          <img
            class={styles.image}
            src="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=85"
            alt=""
          />
          <div aria-hidden="true" class={styles.overlay} />
        </Card.Background>
        <Card.Header class={styles.header}>
          <span class={styles.eyebrow}>Weekend guide</span>
          <Card.Title class={styles.title}>A quieter way to travel</Card.Title>
          <Card.Description class={styles.description}>
            Three places to slow down, look around, and stay a little longer.
          </Card.Description>
        </Card.Header>
      </Card>
    </div>
  );
}