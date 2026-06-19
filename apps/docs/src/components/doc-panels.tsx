import styles from './doc-panels.module.css';

const quickStartSteps = [
  {
    title: 'Install',
    body: 'Add moduix and the current primitive peer dependencies to the application.',
    code: 'npm install moduix @ark-ui/react @base-ui/react',
  },
  {
    title: 'Connect CSS',
    body: 'Import shared tokens and base styles once from the app entry point.',
    code: "import 'moduix/style.css';",
  },
  {
    title: 'Compose',
    body: 'Use named parts and keep layout or product styling in your app.',
    code: 'import { Button, Dialog } from "moduix";',
  },
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