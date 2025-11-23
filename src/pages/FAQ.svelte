<script>
import Page from "../lib/Page.svelte";
import faq from "../data/faq";
import FoldableFAQ from "../lib/FoldableFAQ.svelte";
</script>

<div class="FAQPage">
    <Page title="nav.faq" slogan="faq.slogan">
        <div class="FaqContainer">
            {#each faq as question}
                <FoldableFAQ {...question}/>
            {/each}
        </div>
    </Page>
</div>

<style lang="scss">
    .FAQPage{
        width: 100%;
        height: 100%;
        
        .FaqContainer{
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 25px;
        }
    }
</style>