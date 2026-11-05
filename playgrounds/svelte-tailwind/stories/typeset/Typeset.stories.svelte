<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Typeset, TypesetScroll } from '@/components/typeset';

  const articleClass = 'w-[min(42rem,100%)]';
  const compactClass = '[--moduix-typeset-flow:0.875em] [--moduix-typeset-leading:1.6]';
  const excludedClass =
    'mt-[var(--moduix-typeset-flow,1.25em)] rounded-md border border-border bg-muted p-4';
  const wideTableClass = 'min-w-[36rem]';
  const basicCode = '<Typeset as-child>\n  <article>{{ content }}</article>\n</Typeset>';

  const { Story } = defineMeta({
    title: 'Components/Typeset',
    component: Typeset,
    parameters: { layout: 'padded' },
  });
</script>

<Story name="Basic" asChild>
  <Typeset class={articleClass}
    >{#snippet asChild(props)}<article {...props()}>
        <h1>Reading rhythm for rendered Markdown</h1>
        <p>
          Typeset styles semantic HTML while the application keeps ownership of the content, layout,
          and reading measure. Links such as <a href="https://moduix.dev">moduix.dev</a> and inline
          <code>code</code> stay in the flow of the text.
        </p>
        <h2>Lists need no extra classes</h2>
        <p>
          Use a normal <code>ul</code> for bullets. Nested lists get a different marker so the hierarchy
          remains visible.
        </p>
        <ul>
          <li>
            Solid markers identify top-level items.
            <ul>
              <li>
                Hollow markers identify nested items.
                <ul><li>Square markers identify a third level.</li></ul>
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
        <pre><code>{basicCode}</code></pre>
        <table>
          <caption>Rendered HTML at a glance</caption>
          <thead><tr><th>Element</th><th>Result</th></tr></thead>
          <tbody
            ><tr><td><code>blockquote</code></td><td>A calm, separated quotation.</td></tr><tr
              ><td><code>pre</code></td><td>A readable code block.</td></tr
            ></tbody
          >
        </table>
        <details open>
          <summary>What stays outside Typeset?</summary>
          <p>
            Markdown parsing, HTML sanitization, and the page layout remain application concerns.
          </p>
        </details>
      </article>{/snippet}</Typeset
  >
</Story>

<Story name="Compact" asChild>
  <Typeset class={compactClass}>
    <p>Compact chat messages can keep the same semantics with a tighter rhythm.</p>
    <p>New blocks add their own space without changing the blocks already rendered.</p>
  </Typeset>
</Story>

<Story name="Scrollable Table" asChild>
  <Typeset class={articleClass}>
    <TypesetScroll aria-label="Content comparison table">
      <table class={wideTableClass}>
        <thead
          ><tr><th>Feature</th><th>Blog</th><th>Documentation</th><th>Streaming chat</th></tr
          ></thead
        >
        <tbody><tr><td>Container-aware type</td><td>Yes</td><td>Yes</td><td>Yes</td></tr></tbody>
      </table>
    </TypesetScroll>
  </Typeset>
</Story>

<Story name="Excluded Subtree" asChild>
  <Typeset class={articleClass}>
    <p>This paragraph participates in the typesetting rhythm.</p>
    <section class={['not-typeset', excludedClass]}>
      <p>This subtree keeps its own component styles.</p>
    </section>
    <p>Typesetting resumes after the excluded subtree.</p>
  </Typeset>
</Story>

<Story name="Markdown Extensions" asChild>
  <Typeset class={articleClass}
    >{#snippet asChild(props)}<article {...props()}>
        <h2 id="markdown-extensions">Markdown extensions</h2>
        <ul class="contains-task-list">
          <li class="task-list-item">
            <input type="checkbox" checked readonly /> Keep rendered task lists readable.
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
        <section class="footnotes"><p>1. Footnotes use a compact, separated treatment.</p></section>
      </article>{/snippet}</Typeset
  >
</Story>