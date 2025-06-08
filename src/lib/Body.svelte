<script>
    import { t } from "svelte-intl-precompile";
    let props = $props()

    let classnames = "Body"
    if(props.size) classnames += ' ' + props.size
</script>

<p class={classnames + (props.primary ? ' primary' : "") + (props.underline ? ' underline' : "") + (props.error ? ' error' : "")}>
    <slot/>
    {#if props.error}
    <em>{$t(props.error)}</em>
    {/if}
</p>

<style lang="scss">
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap');

    .Body{
        color: white;
        font-family: "Noto Sans", sans-serif;
        font-optical-sizing: auto;
        font-style: normal;
        font-variation-settings: "wdth" 100;
        font-size: 14px;

        &.primary{
            color: var(--primary);
        }

        &.underline{
            text-decoration: underline;
        }

        &.error{
            color: var(--red-100);
        }
    }
</style>