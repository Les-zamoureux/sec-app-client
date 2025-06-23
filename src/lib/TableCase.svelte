<script>
import { t } from "svelte-intl-precompile";
import Body from "./Body.svelte";
import Button from "./Button.svelte";

let props = $props();
</script>

{#if props.column && props.column.type}
<div class="Case">
    {#if props.column.type === "image"}
        <img src={import.meta.env.VITE_SERVER_URL + props.data} alt="Image de la ligne">
    {:else if props.column.type === "date"}
       {#if props.data}
        <Body>{new Date(props.data).toLocaleDateString()}</Body>
    {/if}
    {:else if props.column.type === "boolean"}
       <Body>{$t(props.data ? "admin.true" : "admin.false")}</Body>
    {:else if props.column.type === "actions" && props.column.actions && props.column.actions.length > 0}
        <div class="Actions">
            {#each props.column.actions as action}
                <Button size={'small'} icon={action.icon} onClick={()=>{action.onClick(props.row)}}/>
            {/each}
        </div>
    {:else}
       <Body>{props.data}</Body>
    {/if}
</div>
{/if}

<style lang="scss">
  .Case{
        display: flex;
        align-items: center;
        min-width: 0;
        padding-left: 10px;
        box-sizing: border-box;

        img{
            width: 100%;
        }

        .Actions{
            display: flex;
            gap: 10px;
            width: 100%;
            flex-direction: row;
            justify-content: center;
            align-items: center;
        }
    }
</style>