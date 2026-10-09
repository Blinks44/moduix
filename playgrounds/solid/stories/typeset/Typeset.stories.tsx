import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Typeset, TypesetScroll } from '@/components/typeset/Typeset';
import styles from './Typeset.stories.module.css';

const meta = {
  title: 'Components/Typeset',
  component: Typeset,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Typeset>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Typeset
      asChild={(props) => (
        <article {...props()}>
          <h1>Reading rhythm for rendered Markdown</h1>
          <p>
            Typeset styles semantic HTML while the application keeps ownership of the content,
            layout, and reading measure. Links such as <a href="https://moduix.dev">moduix.dev</a>{' '}
            and inline <code>code</code> stay in the flow of the text.
          </p>
          <h2>Lists need no extra classes</h2>
          <p>
            Use a normal <code>ul</code> for bullets. Nested lists get a different marker so the
            hierarchy remains visible.
          </p>
          <ul>
            <li>
              Solid markers identify top-level items.
              <ul>
                <li>
                  Hollow markers identify nested items.
                  <ul>
                    <li>Square markers identify a third level.</li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>Ordered lists keep their native sequence.</li>
          </ul>
          <ol>
            <li>Render semantic HTML.</li>
            <li>Wrap it in Typeset.</li>
            <li>Choose the reading width outside the component.</li>
          </ol>
          <blockquote>Typeset supplies reading rhythm, not the page layout.</blockquote>
          <hr />
          <h2>Long-form content</h2>
          <pre>
            <code>{`<Typeset asChild>
  <article>{content}</article>
</Typeset>`}</code>
          </pre>
          <table>
            <caption>Rendered HTML at a glance</caption>
            <thead>
              <tr>
                <th>Element</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>blockquote</code>
                </td>
                <td>A calm, separated quotation.</td>
              </tr>
              <tr>
                <td>
                  <code>pre</code>
                </td>
                <td>A readable code block.</td>
              </tr>
            </tbody>
          </table>
          <details open>
            <summary>What stays outside Typeset?</summary>
            <p>
              Markdown parsing, HTML sanitization, and the page layout remain application concerns.
            </p>
          </details>
        </article>
      )}
      class={styles.article}
    />
  ),
};

export const Compact: Story = {
  render: () => (
    <Typeset class={styles.compact}>
      <p>Compact chat messages can keep the same semantics with a tighter rhythm.</p>
      <p>New blocks add their own space without changing the blocks already rendered.</p>
    </Typeset>
  ),
};

export const ScrollableTable: Story = {
  render: () => (
    <Typeset class={styles.article}>
      <TypesetScroll aria-label="Content comparison table">
        <table class={styles.wideTable}>
          <thead>
            <tr>
              <th>Feature</th>
              <th>Blog</th>
              <th>Documentation</th>
              <th>Streaming chat</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Container-aware type</td>
              <td>Yes</td>
              <td>Yes</td>
              <td>Yes</td>
            </tr>
          </tbody>
        </table>
      </TypesetScroll>
    </Typeset>
  ),
};

export const ExcludedSubtree: Story = {
  render: () => (
    <Typeset class={styles.article}>
      <p>This paragraph participates in the typesetting rhythm.</p>
      <section class={`not-typeset ${styles.excluded}`}>
        <p>This subtree keeps its own component styles.</p>
      </section>
      <p>Typesetting resumes after the excluded subtree.</p>
    </Typeset>
  ),
};

export const MarkdownExtensions: Story = {
  render: () => (
    <Typeset
      asChild={(props) => (
        <article {...props()}>
          <h2 id="markdown-extensions">Markdown extensions</h2>
          <ul class="contains-task-list">
            <li class="task-list-item">
              <input type="checkbox" checked readOnly /> Keep rendered task lists readable.
            </li>
          </ul>
          <details>
            <summary>Show implementation note</summary>
            <p>Disclosures, definition lists, and GFM footnotes receive the same reading rhythm.</p>
          </details>
          <dl>
            <dt>Flow</dt>
            <dd>Space before a rendered block.</dd>
          </dl>
          <section class="footnotes">
            <p>1. Footnotes use a compact, separated treatment.</p>
          </section>
        </article>
      )}
      class={styles.article}
    />
  ),
};