<script>
import { t } from "svelte-intl-precompile";
import Body from "./Body.svelte";
import ArrowIcon from "./../assets/arrow.svg"

let props = $props();

let open = $state(false)

</script>

<div class={"FoldableFAQ" + (open ? " opened" : "")}>
    <div class="FoldableHeader">
        <div class="HeaderTitle">
            <Body size={"veryLarge"}>{$t(props.question)}</Body>
        </div>
        <button class="HeaderButton" onclick={()=>open = !open}>
            <img src={ArrowIcon} alt={"Question arrow"}/>
        </button>
    </div>
    <div class="FoldableContent">
        <div class="Answer">
            <Body>{$t(props.answer)}</Body>
        </div>
    </div>
</div>

<style>
    .FoldableFAQ{
        background-color: var(--neutral100);
        width: 100%;
        padding: 0 45px;
        display: flex;
        border-radius: 20px;
        overflow-y: hidden;
        flex-direction: column;

        &.opened{
            .FoldableHeader{
                .HeaderButton{
                    transform: rotate(180deg);
                }
            }

            .FoldableContent {
                max-height: 500px;
                opacity: 1;

                border-top: 1px solid var(--neutral150);
            }
        }

        .FoldableHeader{
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 25px 0;

            .HeaderTitle{
                width: calc(100% - 50px);
            }

            .HeaderButton{
                display: flex;
                align-items: center;
                justify-content: center;
                width: 26px;
                height: 26px;
                transition: transform .2s ease-in-out;
                background-color: transparent;
                border: none;
                cursor: pointer;

                img{
                    pointer-events: none;
                    width: 100%;
                }
            }
        }

        .FoldableContent {
            width: 100%;
            max-height: 0;
            opacity: 0;
            overflow: hidden;
            border-top: 1px solid var(--neutral150);

            transition:
                max-height .5s ease,
                opacity .35s ease;
            
            .Answer {
                padding: 25px 0;
            }
        }
    }

    @media screen and (max-width : 550px) {
        .FoldableFAQ{
            padding: 0 20px;
        }
    }
</style>