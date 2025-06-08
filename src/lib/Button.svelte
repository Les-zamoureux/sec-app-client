<script>
    import Body from "./Body.svelte";
    import {t} from "svelte-intl-precompile"

    let props = $props()

    let hover = $state(false)

    let classnames = $state("Button")
    if(props.size) classnames += ' ' + props.size
    classnames += props.type ? (' type' + props.type) : " type1"

    const onClickButton = () => {
        if(props.onClick && !props.disabled) props.onClick()
    }
</script>

{#if (props.label && props.onClick)}
<!-- A11y: <div> with click handler must have an ARIA role -->
<button class={classnames + (props.disabled ? ' disabled' : "") + (hover && !props.disabled ? ' hover' : "")} onclick={()=>onClickButton()} onmouseenter={() => hover = true} onmouseleave={() => hover = false}>
    {#if props.label}
    <Body underline={props.type === 3} hover primary={(props.type === 1 || !props.type) && (!hover || (hover && props.disabled)) || (props.type === 3)}>{$t(props.label)}</Body>
    {/if}
</button>
{/if}

<style lang="scss">
    .Button{
        width: 100%;
        background-color: transparent;
        height: 50px;
        cursor: pointer;
        display: flex;
        align-items: center;
        transition: all .2s;
        justify-content: center;
        border: 2px solid;

        &.disabled{
            cursor: default;
            opacity: .4;
        }

        &.small{
            width: 160px;
            height: 40px;
        }

        &.type1{
            border-color: var(--primary);

            &.hover{
                background-color: var(--primary);
            }
        }

        &.type2{
            border-color: white;
        }

        &.type3{
            border: none;
            height: auto;   
            justify-content: start;
        }
    }
</style>