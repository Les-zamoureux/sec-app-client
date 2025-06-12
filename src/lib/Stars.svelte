<script>
    import Star from './../assets/star.svg'
    import Half from './../assets/half.svg'
    import Empty from './../assets/empty.svg'
    
    let props = $props()
</script>

<div class="Stars">
    {#each {length:5}, i}
        <div class="Star">
            {#if (props.rate - (i+1) > 0)}
                <img src={Star} alt="Full star">
            {:else if (props.rate - (i+0.5) > 0)}
                <img src={Half} alt="Half star">
            {:else}
                <img src={Empty} alt="Empty star">
            {/if}
        </div>
    {/each}
</div>

<style lang="scss">
    .Stars{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;

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
    }
</style>