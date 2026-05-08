import styles from './doc-panels.module.css';

const quickStartSteps = [
  {
    title: 'Install',
    body: 'Add moduix and the Base UI peer dependency to the application.',
    code: 'npm install moduix @base-ui/react',
  },
  {
    title: 'Connect CSS',
    body: 'Import the component stylesheet once from the app entry point.',
    code: "import 'moduix/style.css';",
  },
  {
    title: 'Compose',
    body: 'Use named parts and keep layout or product styling in your app.',
    code: 'import { Button, Dialog } from "moduix";',
  },
];

const roadmapItems = [
  ['Components', 'Carousel, date inputs, form patterns, navigation, and overlay examples.'],
  ['Documentation', 'More real flows, theming guidance, state coverage, and styling recipes.'],
  ['Direction', 'Prepared React primitives that stay close to Base UI and remain easy to inspect.'],
];

export function QuickStartOverview() {
  return (
    <div className={styles.quickStart}>
      {quickStartSteps.map((step, index) => (
        <article className={styles.stepCard} key={step.title}>
          <span className={styles.stepIndex}>{index + 1}</span>
          <div>
            <h2>{step.title}</h2>
            <p>{step.body}</p>
          </div>
          <code>{step.code}</code>
        </article>
      ))}
    </div>
  );
}

export function RoadmapOverview() {
  return (
    <div className={styles.roadmap}>
      {roadmapItems.map(([title, body], index) => (
        <article className={styles.roadmapItem} data-step={index + 1} key={title}>
          <div className={styles.roadmapMarker} aria-hidden="true" />
          <div>
            <h2>{title}</h2>
            <p>{body}</p>
          </div>
        </article>
      ))}
    </div>
  );
}