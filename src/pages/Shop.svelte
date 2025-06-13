<script>
    import Body from "../lib/Body.svelte";
    import Heading from "../lib/Heading.svelte";
    import List from "../lib/List.svelte";
    import Page from "../lib/Page.svelte";
    import { t } from "svelte-intl-precompile";
    import products from "../data/products";
    import { navigate } from "svelte-routing";

    let props = $props()

    const onNavigate = (product) => {
        navigate('/shop/' + product.id)
    }
</script>

<div class="ShopPage">
    <Page title="shop">
        <div class="ShopContainer">
            <div class="ShopTitle">
                <Heading size={'h6'}>{$t("slogan")}</Heading>
            </div>
            <div class="ShopContent">
                <div class="ShopContentDescription">
                    <Body size={'large'} weight={'light'} uppercase>{$t("popularProducts")}</Body>
                </div>
                <div class="ShopContentList">
                    <List onItemClick={onNavigate} data={products && products.length > 0 ? products.filter((p) => p.star) : []}/>
                </div>
            </div>
            <div class="ShopContent" style="margin-top: 60px;">
                <div class="ShopContentTitle">
                    <Heading size={'h5'}>{$t("products")}</Heading>
                </div>
                <div class="ShopContentDescription">
                    <Body size={'large'} weight={'light'} uppercase>{$t("popularProducts")}</Body>
                </div>
                <div class="ShopContentList">
                    <List data={products}/>
                </div>
            </div>
        </div>
    </Page>
</div>

<style lang="scss">
    .ShopPage{
        width: 100%;
        height: 100%;

        .ShopContainer{
            width: 100%;
            height: 100%;

            .ShopContent{
                margin-top: 40px;

                .ShopContentList{
                    padding: 20px 0;
                }
            }

            
        }
    }
</style>