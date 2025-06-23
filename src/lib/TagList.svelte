<script>
    import { t } from "svelte-intl-precompile";
    import Body from "./Body.svelte";

    let props = $props()

    const onSelected = (option) => {
        if(props.selected === option) props.onChange(null)
        else props.onChange(option)
    }
</script>

<div class="TagList">
    {#if props.options && props.options.length > 0}
        {#if props.title}
        <div class="ListTitle">
            <Body>{$t(props.title)}</Body>
        </div>
        {/if}
        <div class="Options">
            {#each props.options as option}
                <button class={"Option" + (props.selected === option ? ' selected' : '')} onclick={(e)=>{onSelected(option)}}>
                    <Body>{$t("shop.filters." + option)}</Body>
                </button>
            {/each}
        </div>
    {/if}
</div>

<style lang="scss">
    .TagList{
        display: flex;
        flex-direction: column;
        gap:20px;

        .Options{
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            width: 100%;
            
            .Option{
                border: 1px solid var(--primary);
                border-radius: 20px;
                background-color: transparent;
                padding: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                height: 40px;
                transition: all .2s;
                
                &.selected{
                    background-color: var(--primary);
                }

                &:hover{
                    border-color: var(--primary-hover);
                    background-color: var(--primary-hover);
                }
            }
        }
    }
</style>