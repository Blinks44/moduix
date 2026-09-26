import { Card, CardBackground, CardDescription, CardHeader, CardTitle } from '@moduix/react/card';
import type { PointerEvent } from 'react';
import styles from './parallax-card.module.css';

function updateTilt(event: PointerEvent<HTMLDivElement>) {
  const bounds = event.currentTarget.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width - 0.5;
  const y = (event.clientY - bounds.top) / bounds.height - 0.5;

  event.currentTarget.style.setProperty('--parallax-rotate-x', `${-y * 10}deg`);
  event.currentTarget.style.setProperty('--parallax-rotate-y', `${x * 10}deg`);
}

function resetTilt(event: PointerEvent<HTMLDivElement>) {
  event.currentTarget.style.removeProperty('--parallax-rotate-x');
  event.currentTarget.style.removeProperty('--parallax-rotate-y');
}

export function ParallaxCard() {
  return (
    <div className={styles.tilt} onPointerMove={updateTilt} onPointerLeave={resetTilt}>
      <Card className={styles.card} variant="elevated">
        <CardBackground>
          <img
            className={styles.image}
            src="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=85"
            alt=""
          />
          <div aria-hidden="true" className={styles.overlay} />
        </CardBackground>
        <CardHeader className={styles.header}>
          <span className={styles.eyebrow}>Weekend guide</span>
          <CardTitle className={styles.title}>A quieter way to travel</CardTitle>
          <CardDescription className={styles.description}>
            Three places to slow down, look around, and stay a little longer.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}