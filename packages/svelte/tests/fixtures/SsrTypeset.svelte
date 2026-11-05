<script lang="ts">
  import { Typeset, TypesetScroll } from '@/components/typeset';
</script>

<Typeset>
  {#snippet asChild(props)}
    <article {...props()}>
      <h1>Readable content</h1>
      <TypesetScroll aria-label="Wide comparison table">
        <table>
          <tbody>
            <tr>
              <td>Wide content</td>
            </tr>
          </tbody>
        </table>
      </TypesetScroll>
    </article>
  {/snippet}
</Typeset>