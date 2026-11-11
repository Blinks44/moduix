<script lang="ts">
  import { Dialog, DialogContent, DialogPositioner, DialogTitle } from '@/components/dialog';
  import {
    Tour,
    TourBackdrop,
    TourContent,
    TourDescription,
    TourPositioner,
    TourTitle,
    useTour,
  } from '@/components/tour';
  import { steps } from './steps';

  const tour = useTour({ id: 'dialog-tour', steps });
</script>

<Dialog defaultOpen>
  <DialogPositioner>
    <DialogContent>
      <DialogTitle>Settings</DialogTitle>
      <button type="button" onclick={() => tour().start()}>Start dialog tour</button>
    </DialogContent>
  </DialogPositioner>
  <Tour {tour}>
    <TourBackdrop />
    <TourPositioner>
      <TourContent>
        <TourTitle />
        <TourDescription />
      </TourContent>
    </TourPositioner>
  </Tour>
</Dialog>