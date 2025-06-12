<script>
    import Heading from "./Heading.svelte";
    import { t } from "svelte-intl-precompile";

    let props = $props()
</script>

<div class="page">
    <div class="PageHeader">
        {#if props.title}
            <Heading size={'h0'}>{$t(props.title)}</Heading>
        {/if}
    </div>
    <div class="PageContent">
        {@render props.children?.()}
    </div>
</div>

<style lang="scss">
    .page{
        width: 100%;
        height: calc(100vh - 120px);
        margin-top: 120px;
        display: flex;
        align-items: center;
        flex-direction: column;
        padding: 40px 0;

        .PageHeader{
            width: 80%;
        }

        .PageContent{
            padding: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 80%;
        }
    }
</style>