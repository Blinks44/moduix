import { Card } from '@moduix/react/card';
import { useEffect, useState } from 'react';
import Tilt from 'react-parallax-tilt';
import styles from './parallax-card.module.css';

function useTiltEnabled() {
  const [tiltEnabled, setTiltEnabled] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
    );
    const updateTiltEnabled = () => setTiltEnabled(mediaQuery.matches);

    updateTiltEnabled();
    mediaQuery.addEventListener('change', updateTiltEnabled);

    return () => mediaQuery.removeEventListener('change', updateTiltEnabled);
  }, []);

  return tiltEnabled;
}

export function ParallaxCard() {
  const tiltEnabled = useTiltEnabled();

  return (
    <Tilt
      className={styles.tilt}
      perspective={1200}
      scale={1.015}
      tiltEnable={tiltEnabled}
      tiltMaxAngleX={5}
      tiltMaxAngleY={5}
      transitionSpeed={1200}
    >
      <Card className={styles.card} variant="elevated">
        <Card.Background>
          <img
            className={styles.image}
            src="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=85"
            alt=""
          />
          <div aria-hidden="true" className={styles.overlay} />
        </Card.Background>
        <Card.Header className={styles.header}>
          <span className={styles.eyebrow}>Weekend guide</span>
          <Card.Title className={styles.title}>A quieter way to travel</Card.Title>
          <Card.Description className={styles.description}>
            Three places to slow down, look around, and stay a little longer.
          </Card.Description>
        </Card.Header>
      </Card>
    </Tilt>
  );
}