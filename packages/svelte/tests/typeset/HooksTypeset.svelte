<script lang="ts">
  import { Typeset, TypesetScroll } from '@/components/typeset';
</script>

<Typeset
  data-part="overridden-root"
  data-scope="overridden"
  data-slot="overridden-root"
  data-testid="root"
>
  <p>Readable content</p>
</Typeset>
<TypesetScroll
  data-part="overridden-scroll"
  data-scope="overridden"
  data-slot="overridden-scroll"
  data-testid="scroll"
>
  <table>
    <tbody>
      <tr><td>Wide content</td></tr>
    </tbody>
  </table>
</TypesetScroll>