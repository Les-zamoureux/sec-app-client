<script>
    import Body from "../lib/Body.svelte";
    import Page from "../lib/Page.svelte";
    import products from "../data/products";
    import { t } from "svelte-intl-precompile";
    import Heading from "../lib/Heading.svelte";
    import Stars from "../lib/Stars.svelte";
    import Input from "../lib/Input.svelte";
    import Button from "../lib/Button.svelte";

    let props = $props()
    let data = $state(null)

    let quantity = $state(1)

    $effect(() => {
        console.log(props.id)
        if(products.length > props.id){
            data = products[props.id]
        }
    })

    const addToCart = () => {
        console.log('addToCart')
    }

    const buyNow = () => {
        console.log('Buy Now')
    }
</script>

<div class="ProductPage">
    <Page>
        {#if !data}
            <div></div>
        {:else}
            <div class="ProductContainer">
                <div class="ProductContent">
                    <div class="ProductPart">
                        <div class="ProductHeader">
                            <div class="ProductImage">
                                <img src={data.image} alt="Product image">
                            </div>
                            <div class="ProductInfos">
                                <div class="ProductInfo"><Body>{$t('product.type', { values: { type: data.type, category : data.category } })}</Body></div>
                                <div class="ProductInfo"><Heading>{data.name}</Heading></div>
                                <div class="ProductInfo"><Body size={'large'} uppercase>{data.genetics}</Body></div>
                                <div class="ProductInfo"><Stars left rate={data.rate} showRate/></div>
                                <div class="ProductInfo">
                                    <Body size={'veryLarge'} weight={'semiBold'} span={'product.unity'}>{$t('product.price', { values: { price: 15 } })}</Body>
                                </div>
                                <div class="ProductInfo">
                                    <Body>{$t('product.thc', { values: { count: data.thc } })}</Body>
                                </div>
                                <div class="ProductInfo">
                                    <Body>{$t('product.cbd', { values: { count: data.cbd } })}</Body>
                                </div>
                            </div>
                        </div>
                        <div class="ProductDescription">
                            <div class="DescriptionTitle"><Body weight={'bold'}>{$t("commons.description")}</Body></div>
                            <div class="DescriptionContent"><Body>{data.description}</Body></div>
                        </div>
                    </div>
                    <div class="ProductPart recap">
                        <div class="RecapContainer">
                            <div class="RecapContent">
                                <Body size={'veryLarge'} weight={'semiBold'} span={'product.unity'}>{$t('product.price', { values: { price: data.price } })}</Body>
                            </div>
                            <div class="RecapContent"><Body primary span={new Date().toDateString()}>{$t('product.free-delivery')}</Body></div>
                            <div class="RecapContent">
                                <div class="RecapPart">
                                    <Input type={'number'} title={"product.quantity-in-g"} min={1} max={100} value={quantity} onChange={(newQuantity) => quantity = newQuantity}/>
                                </div>
                                <div class="RecapPart right">
                                    <Body right weight={'semiBold'}>{$t('commons.total')}</Body>
                                    <Body right size={'veryLarge'} weight={'semiBold'}>{$t('product.price', { values : {price : data.price * quantity}})}</Body>
                                    <Body right size={'small'} weight={'thin'}>{$t('product.price-with-unity', { values : {price : data.price * quantity}})}</Body>
                                </div>
                            </div>
                            <div class="RecapContent column">
                                <Button type={1} label={'product.add-to-cart'} onClick={addToCart}/>
                                <div style="margin-top:10px;width:100%;"><Button type={2} label={'product.buy-now'} onClick={buyNow}/></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ProductContent">
                    <div class="ProductList">
                        <div class="ListTitle">

                        </div>
                        <div class="ListElements">
                            {#each data.aspects as aspect}
                                <div class="ListElement">
                                    <div class="Puce"></div>
                                    <Body>{$t(aspect)}</Body>
                                </div>
                            {/each}
                        </div>
                    </div>
                    <div class="ProductList">
                        
                    </div>
                    <div class="ProductList">
                        
                    </div>
                    <div class="ProductList">
                        
                    </div>
                </div>
            </div>
        {/if}
    </Page>
</div>


<style lang="scss">
    .ProductPage{
        width: 100%;
        height: 100%;

        .ProductContainer{
            width: 100%;
            display: flex;
            flex-direction: column;

            .ProductContent{
                display: flex;
                flex-direction: row;
                width: 100%;

                .ProductList{
                    
                }

                .ProductPart{
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    &.recap{
                        width: 500px;
                    }

                    .ProductHeader{
                        width: 100%;
                        display: flex;

                        .ProductImage{
                            img{
                                pointer-events: none;
                            }
                        }
                    }

                    .RecapContainer{
                        background-color: var(--neutral100);
                        width: 100%;
                        padding: 35px 25px;
                        border-radius: 15px;
                        gap: 25px;
                        display: flex;
                        flex-direction: column;

                        .RecapContent{
                            display: flex;
                            align-items: center;
                            flex-direction: row;
                            width: 100%;
                            justify-content: space-between;

                            &.column{
                                flex-direction: column;
                            }

                            .RecapPart{
                                width: 100%;
                                display: flex;
                                flex-direction: column;

                                &.right{
                                    justify-content: end;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>