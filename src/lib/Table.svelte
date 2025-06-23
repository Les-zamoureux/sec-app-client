<script>
    import { t } from "svelte-intl-precompile";
    import Body from "./Body.svelte";
    import TableCase from "./TableCase.svelte";

    let props = $props()

    const getColumnsTemplate = () => {
        let gridTemplate = props.count ? "50px " : ""
        for(let i = 0; i < props.columns.length; i++){
            let col = props.columns[i]
            gridTemplate += (col.size + (col.isFixed ? "px":"fr") + (i === props.columns.length-1 ? "" : " "))
        }
        return gridTemplate
    }
</script>

{#if props.columns}
<div class="Table">
    <div class="TableHeader" style={`grid-template-columns: ${getColumnsTemplate()};`}>
        {#if props.count}
            <div class="TableHeaderCol NumberContent">#</div>
        {/if}
        {#if props.columns}
            {#each props.columns as col}
                <div class="TableHeaderCol">
                    {#if col.label}
                        <div class="ColumnLabel"><Body>{$t(col.label)}</Body></div>
                    {/if}
                </div>
            {/each}
        {/if}
    </div>
    <div class="TableContent">
        {#if props.data && props.data.length > 0}
            {#each props.data as row}
                <div class="Row" style={`grid-template-columns: ${getColumnsTemplate()};`}>
                    {#each props.columns as col}
                        <TableCase row={row} column={col} data={row[col.id]}/>
                    {/each}
                </div>
            {/each}
        {:else}
            <div class="Row empty">
                <div class="Case">
                    <Body>{$t(props.emptyLabel || "table.empty")}</Body>
                </div>
            </div>
        {/if}
    </div>
</div>
{/if}

<style lang="scss">
    .Table{
        width: 100%;
        height: 100%;

        .TableHeader{
            width: 100%;
            height: 70px;
            color: white;
            display: grid;
            border: 2px solid var(--neutral150);

            .TableHeaderCol{
                width: 100%;
                height: 100%;
                background-color: var(--neutral100);
                display: flex;
                align-items: center;
                padding-left: 10px;
                box-sizing: border-box;

                &.NumberContent{
                    justify-content: center;
                }
            }
        }

        .TableContent{
            width: 100%;
            height: 100%;

            .Row{
                display: grid;
                width: 100%;
                min-width: 0;
                height: 135px;
                border: 1px solid var(--neutral150);
                background-color: var(--neutral100);
                border-top: none;

                &.empty{
                    height: 50px;
                }

                .Case{
                    display: flex;
                    align-items: center;
                    min-width: 0;
                    padding-left: 10px;
                }
            }
        }
    }
</style>