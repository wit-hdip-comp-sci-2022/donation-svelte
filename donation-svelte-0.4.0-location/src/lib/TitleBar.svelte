<script>
  import { user } from "../stores.js";
  export let title = "";
  export let subTitle = "";
</script>

<div class="box has-text-centered columns m-2">
  <div class="column">
    <img src="/homer.png" width="60" alt="img" />
  </div>
  <div class="column">
    <div class="title is-5">{title}</div>
    <div class="subtitle is-5">{subTitle}</div>
  </div>
  <div class="column">
    <i class="fas fa-donate fa-3x" style="color:rgb(95, 96, 173)" />
    {#if $user.email}
      <div class="is-size-7">{$user.email}</div>
    {:else}
      <div class="is-size-7">Donation-Svelte 0.2</div>
    {/if}
  </div>
</div>
