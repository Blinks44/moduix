/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Typeset } from '@moduix/react';

export function TypesetDemo() {
  return (
    <Typeset asChild className="article">
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

//#endregion