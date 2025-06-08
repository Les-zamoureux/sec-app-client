<script>
    let props = $props()

    let classname = $state("Heading")
    if(props.caca) classname += ' ' + props.caca
</script>

{#if props.size === "h2"}
<h2 class={classname}>{@render props.children?.()}</h2>
{:else if props.size === "h3"}
<h3 class={classname}>{@render props.children?.()}</h3>
{:else if props.size === "h4"}
<h4 class={classname}>{@render props.children?.()}</h4>
{:else if props.size === "h5"}
<h5 class={classname}>{@render props.children?.()}</h5>
{:else if props.size === "h6"}
<h6 class={classname}>{@render props.children?.()}</h6>
{:else}
<h1 class={classname}>{@render props.children?.()}</h1>
{/if}

<style lang="scss">
    @import url('https://fonts.googleapis.com/css2?family=Bungee&display=swap');

    .Heading{
        color: white;
        font-family: "Bungee", sans-serif;
        font-weight: 400;
        font-style: normal;
    }
</style>