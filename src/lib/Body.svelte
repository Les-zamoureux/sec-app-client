<script>
    import { t } from "svelte-intl-precompile";
    let props = $props()

    let classnames = $state("Body")
    if(props.size) classnames += ' ' + props.size
</script>

<p class={classnames + 
    (props.primary ? ' primary' : "") + 
    (props.underline ? ' underline' : "") + 
    (props.error ? ' error' : "") + 
    (props.success ? ' primary' : "") +
    (props.uppercase ? ' uppercase' : "") +
    (props.large ? ' large' : "") +
    (props.hover ? ' hover' : "")
}>
    {@render props.children?.()}
    {#if props.error}
    <em>{$t(props.error)}</em>
    {/if}
    {#if props.success}
    <em>{$t(props.success)}</em>
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
        transition: all .2s;

        &.large{
            font-size: 16px;
        }

        &.hover{
            &:hover{
                color: rgb(153, 153, 153);
            }
        }

        &.primary{
            color: var(--primary);

            &.hover{
                &:hover{
                    color: var(--primary-hover);
                }
            }
        }

        &.underline{
            text-decoration: underline;
        }

        &.error{
            color: var(--red-100);
        }

        &.uppercase{
            text-transform: uppercase;
        }
    }
</style>