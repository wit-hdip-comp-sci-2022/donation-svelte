<script lang="ts">
  import Header from "$lib/ui/Header.svelte";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";
  import MainNavigator from "$lib/ui/MainNavigator.svelte";
  import { onMount } from "svelte";
  import { donationService } from "$lib/services/donation-service";
  import { getMarkerLayer } from "$lib/services/donation-utils";

  let map: LeafletMap;

  onMount(async () => {
    const donations = await donationService.getDonations();
    const donationMarkerLayer = getMarkerLayer(donations);
    map.populateLayer(donationMarkerLayer);
  });
</script>

<Header>
  <MainNavigator />
</Header>

<LeafletMap bind:this={map} />
