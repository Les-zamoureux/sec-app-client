<script>
    import Star from './../assets/star.svg'
    import Half from './../assets/half.svg'
    import Empty from './../assets/empty.svg'
    import Body from './Body.svelte';
    
    let props = $props()
</script>

<div class={"Stars" + (props.left ? ' left' : "")}>
    {#each {length:5}, i}
        <div class="Star">
            {#if (props.rate - (i+1) >= 0)}
                <img src={Star} alt="Full star">
            {:else if (props.rate - (i+0.5) >= 0)}
                <img src={Half} alt="Half star">
            {:else}
                <img src={Empty} alt="Empty star">
            {/if}
        </div>
    {/each}

    {#if props.showRate}
        <div class="StarsText"><Body size={'small'} uppercase>{props.rate + '/5'}</Body></div>
    {/if}
</div>

<style lang="scss">
    .Stars{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;

        &.left{
            justify-content: left;
        }

        .Star{
            width: 15px;
            height: 15px;
            display: flex;
            align-items: center;
            justify-content: center;

            img{
                width: 100%;
                pointer-events: none;
            }
        }

        .StarsText{
            margin-left: 5px;
        }
    }
</style>