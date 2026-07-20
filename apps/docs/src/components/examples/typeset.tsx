import { Typeset } from '@moduix/react';
import type { CssPropertyInput } from '../mdx/preview';
import { CSSPropertiesReferenceTable } from '../mdx/preview';
import styles from './typeset.module.css';

export const typesetOverrideCssProperties: CssPropertyInput[] = [
  ['--typeset-flow', '1.25em', 'Controls space before each rendered block.'],
  ['--typeset-font-body', 'inherit', 'Controls body font family.'],
  ['--typeset-font-heading', 'var(--font-sans)', 'Controls heading font family.'],
  ['--typeset-leading', '1.75', 'Controls body line height.'],
  ['--typeset-font-mono', 'var(--font-mono)', 'Controls inline and block code font family.'],
  ['--typeset-size', '1em', 'Controls the container-relative body font size.'],
];

export function TypesetCssPropertiesPanel() {
  return (
    <CSSPropertiesReferenceTable
      properties={typesetOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property))
    return { name: property[0], defaultValue: property[1], description: property[2] };
  return property;
}

export function TypesetExample() {
  return (
    <Typeset asChild className={styles.article}>
      <article>
        <h1>Ship readable content by default</h1>
        <p>
          Typeset gives rendered Markdown, CMS content, and AI answers a shared rhythm while your
          application keeps ownership of the content and layout. It styles ordinary{' '}
          <a href="https://developer.mozilla.org/en-US/docs/Web/HTML">semantic HTML</a>, including
          inline <code>code</code>.
        </p>
        <h2>Everyday Markdown</h2>
        <p>
          Write a normal <code>ul</code> for bullets—no utility class is required. Nested lists use
          a distinct marker, so their structure stays easy to scan.
        </p>
        <ul>
          <li>
            Top-level items receive solid bullets.
            <ul>
              <li>
                Nested items receive hollow bullets.
                <ul>
                  <li>Third-level items receive square bullets.</li>
                </ul>
              </li>
            </ul>
          </li>
          <li>Links, emphasis, and inline code stay part of the sentence.</li>
          <li>
            Use an <code>ol</code> when the order carries meaning.
          </li>
        </ul>
        <ol>
          <li>Render sanitized HTML from your source.</li>
          <li>
            Wrap the result in <code>Typeset</code>.
          </li>
          <li>Keep the reading width in the surrounding layout.</li>
        </ol>
        <blockquote>
          Typeset supplies the reading rhythm; your application still owns the content and its
          maximum width.
        </blockquote>
        <hr />
        <h2>Longer blocks stay legible</h2>
        <pre>
          <code>{`<Typeset asChild>
  <article>{content}</article>
</Typeset>`}</code>
        </pre>
        <table>
          <caption>Common content surfaces</caption>
          <thead>
            <tr>
              <th>Element</th>
              <th>Use</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>blockquote</code>
              </td>
              <td>Call out a quoted idea.</td>
            </tr>
            <tr>
              <td>
                <code>pre</code>
              </td>
              <td>Keep a code example readable.</td>
            </tr>
          </tbody>
        </table>
        <details open>
          <summary>What does Typeset not do?</summary>
          <p>
            It does not parse Markdown, sanitize untrusted HTML, or choose the page layout. It only
            gives the semantic elements you render a consistent visual treatment.
          </p>
        </details>
      </article>
    </Typeset>
  );
}

export function TypesetReadingExample() {
  return (
    <Typeset asChild className={`${styles.article} ${styles.reading}`}>
      <article>
        <h2>Reading mode</h2>
        <p>A roomier preset can make long-form content more comfortable without adding props.</p>
        <p>Use a class to keep a page, CMS entry, or product setting in control of the rhythm.</p>
      </article>
    </Typeset>
  );
}

export function TypesetStreamingExample() {
  return (
    <Typeset className={styles.chat}>
      <p>The first rendered block keeps its spacing as content arrives.</p>
      <p>Each new block contributes only its own margin, so the message does not jump.</p>
      <pre>
        <code>{'const answer = await streamText(prompt);'}</code>
      </pre>
    </Typeset>
  );
}

export function TypesetScrollableTableExample() {
  return (
    <Typeset className={styles.article}>
      <Typeset.Scroll>
        <table className={styles.wideTable}>
          <thead>
            <tr>
              <th>Context</th>
              <th>Size</th>
              <th>Leading</th>
              <th>Flow</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Documentation</td>
              <td>1.125rem</td>
              <td>1.9</td>
              <td>1.75em</td>
            </tr>
            <tr>
              <td>Streaming chat</td>
              <td>1em</td>
              <td>1.6</td>
              <td>0.875em</td>
            </tr>
          </tbody>
        </table>
      </Typeset.Scroll>
    </Typeset>
  );
}

export function TypesetExcludedSubtreeExample() {
  return (
    <Typeset className={styles.article}>
      <p>This paragraph uses the Typeset rhythm.</p>
      <section className={`not-typeset ${styles.excluded}`}>
        <strong>Application-owned surface</strong>
        <p>This nested subtree keeps its local styles.</p>
      </section>
      <p>Typeset resumes for following rendered content.</p>
    </Typeset>
  );
}

export function TypesetMarkdownExtensionsExample() {
  return (
    <Typeset asChild className={styles.article}>
      <article>
        <h2 id="markdown-extensions">Markdown extensions</h2>
        <ul className="contains-task-list">
          <li className="task-list-item">
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
        <section className="footnotes">
          <p>1. Footnotes use a compact, separated treatment.</p>
        </section>
      </article>
    </Typeset>
  );
}