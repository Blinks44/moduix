import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import styles from './scaled-preview.module.css';

// Lays live content out at its natural width and scales it down to fit the frame, inert.
function ScaledPreview({
  className,
  width,
  children,
}: {
  className?: string;
  width: number;
  children: ReactNode;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ scale: 0, height: 0 });

  useEffect(() => {
    const frame = frameRef.current;
    const stage = stageRef.current;
    if (!frame || !stage) return;
    const update = () => {
      const height = stage.offsetHeight;
      const scale = Math.min(
        1,
        (frame.clientWidth - 48) / width,
        (frame.clientHeight - 32) / height,
      );
      setSize({ scale, height });
    };
    const observer = new ResizeObserver(update);
    observer.observe(frame);
    observer.observe(stage);
    return () => observer.disconnect();
  }, [width]);

  return (
    <div ref={frameRef} className={`${styles.frame} ${className ?? ''}`} aria-hidden="true" inert>
      <div
        className={styles.box}
        style={{ width: width * size.scale, height: size.height * size.scale }}
      >
        <div
          ref={stageRef}
          className={styles.stage}
          style={{ width, transform: `scale(${size.scale})`, opacity: size.scale ? 1 : 0 }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export { ScaledPreview };