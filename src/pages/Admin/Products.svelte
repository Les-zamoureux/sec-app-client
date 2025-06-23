<script>
    import { t } from "svelte-intl-precompile";
    import Heading from "../../lib/Heading.svelte";
    import FetchPage from "../../lib/FetchPage.svelte";
    import { openPopup } from "../../stores/store";
    import ConfirmPopup from "../../lib/popups/ConfirmPopup.svelte";
    import Request from "../../utils/Request";
    import AddProductPopup from "../../lib/popups/AddProductPopup.svelte";
    import TrashIcon from "./../../assets/trash.svg"
    import EditIcon from "./../../assets/edit.svg"

    let props = $props()
    
    let data = $state([])
    let fetching = $state(false)
    let dataLoaded = $state(false)

    const deleteElement = (data) => {
        openPopup(ConfirmPopup, {
            onSubmitClick:()=>{
                Request.delete('/product/' + data.id).then(res => {
                    fetchElements()
                }).catch(err => {
                    console.log(err)
                })
            },
            title:"admin.faq.delete", 
            description:"admin.faq.delete-description", 
        })
    }

    const updateElement = (data) => {
        openPopup(AddProductPopup, {
            data:data,
            save:(object)=>{
                Request.put('/product/'+data.id, object).then(res => {
                    fetchElements()
                }).catch(err => {
                    console.log(err)
                })
            }
        })
    }

    const addElement = () => {
        openPopup(AddProductPopup, {
            save:(object)=>{
                Request.post('/product', {...object, image:null}).then(res => {
                    let productID = res.productID
                    let formData = new FormData()
                    formData.append("image", object.image)
                    Request.post('/product/' + productID + '/image', formData).then(res => {
                        console.log(res)
                        fetchElements()
                    }).catch(err => {
                        console.log(err)
                    })
                }).catch(err => {
                    console.log(err)
                })
            }
        })
    }

    const filterData = (data, searchValue) => {
        let filterValue = searchValue.toLowerCase()
        if(data.name.toLowerCase().includes(filterValue)) return true
        else return false
    }

    const fetchElements = () => {
        fetching = true
        Request.get('/product').then((res) => {
            console.log(res)
            data = res
            fetching = false
        }).catch(err => {
            console.log(err)
            data = []
            fetching = false
        })
    }

    $effect(()=>{
        if(!dataLoaded) {
            fetchElements()
            dataLoaded = true
        }
    })

    const columns = [
        {size:50, isFixed : true, label:"table.id", id:"id", type:"text"},
        {size:200, isFixed : true, label:"admin.product.image", id:"image_path", type:"image"},
        {size:100, isFixed : false, label:"admin.product.name", id:"name", type:"text"},
        {size:150, isFixed : true, label:"admin.product.category", id:"category", type:"text"},
        {size:150, isFixed : true, label:"admin.product.type", id:"type", type:"text"},
        {size:100, isFixed : true, label:"admin.product.stock", id:"stock", type:"text"},
        {size:100, isFixed : true, label:"admin.product.price", id:"price", type:"text"},
        {size:140, isFixed : true, label:"", type:'actions', actions:[
            {icon:EditIcon, onClick:(data) => updateElement(data)}, 
            {icon:TrashIcon, onClick:(data) => deleteElement(data)}, 
        ]}
    ]
</script>

<div class="Products">
    <FetchPage 
        fetching={fetching} 
        data={data} 
        title={"menu.products"} 
        type={'product'} 
        columns={columns} 
        addData={addElement} 
        filterData={filterData}
    />
</div>

<style lang="scss">
    .Products{
        width: 100%;
        height: 100%;
        display: flex;
        position: relative;
    }
</style>