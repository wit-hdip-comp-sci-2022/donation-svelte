<script>
  import TitleBar from "./TitleBar.svelte";
</script>

<div class="columns is-vcentered">
  <div class="column is-two-thirds">
    <TitleBar title={"Donation Services Inc."} subTitle={"Sign up or Log in"} />
  </div>
  <div class="column">
    <slot />
  </div>
</div>
