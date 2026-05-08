import { createFileRoute, Link } from '@tanstack/react-router';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { ArrowRight, Code2, Component, Layers3, PackageCheck, Sparkles } from 'lucide-react';
import { baseOptions } from '@/lib/layout.shared';
import styles from './index.module.css';

export const Route = createFileRoute('/')({
  component: Home,
});

const highlights = [
  {
    icon: Layers3,
    label: 'Composable primitives',
  },
  {
    icon: Code2,
    label: 'Typed React API',
  },
  {
    icon: PackageCheck,
    label: 'Base UI as the foundation',
  },
];

function Home() {
  return (
    <HomeLayout {...baseOptions()}>
      <div className={styles.home}>
        <div className={styles.spotlight} />
        <section className={styles.hero} aria-labelledby="home-title">
          <div className={styles.content}>
            <div className={styles.badge}>
              <Sparkles size={14} aria-hidden="true" />
              Base UI powered components
            </div>
            <h1 id="home-title" className={styles.title}>
              moduix
            </h1>
            <p className={styles.lead}>
              A precise React component library for teams shipping calm, consistent product
              interfaces.
            </p>
            <div className={styles.actions}>
              <Link
                to="/docs/$"
                params={{
                  _splat: '',
                }}
                className={styles.primary}
              >
                Open documentation
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link
                to="/docs/$"
                params={{
                  _splat: 'accordion',
                }}
                className={styles.secondary}
              >
                Components
                <Component size={18} aria-hidden="true" />
              </Link>
            </div>
            <div className={styles.highlights} aria-label="Library highlights">
              {highlights.map(({ icon: Icon, label }) => (
                <div className={styles.highlight} key={label}>
                  <Icon size={16} aria-hidden="true" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.showcase} aria-hidden="true">
            <div className={`${styles.panel} ${styles.panelMain}`}>
              <div className={styles.panelHeader}>
                <span />
                <span />
                <span />
              </div>
              <div className={styles.tabs}>
                <span data-active="true">Button</span>
                <span>Dialog</span>
                <span>Select</span>
              </div>
              <div className={styles.canvas}>
                <div className={`${styles.component} ${styles.componentButton}`}>
                  Confirm changes
                </div>
                <div className={`${styles.component} ${styles.componentField}`}>
                  <span>Project name</span>
                  <strong>moduix-kit</strong>
                </div>
                <div className={`${styles.component} ${styles.componentSwitch}`}>
                  <span />
                  <strong />
                </div>
                <div className={`${styles.component} ${styles.componentProgress}`}>
                  <span />
                </div>
              </div>
            </div>

            <div className={`${styles.panel} ${styles.floatPanel}`}>
              <div className={styles.menuLine} />
              <div className={styles.menuLine} />
              <div className={styles.menuLine} />
            </div>
          </div>
        </section>
      </div>
    </HomeLayout>
  );
}