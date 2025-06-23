<script>
    import { t } from "svelte-intl-precompile";
    import Heading from "../../lib/Heading.svelte";
    import FetchPage from "../../lib/FetchPage.svelte";
    import TrashIcon from "./../../assets/trash.svg"
    import EditIcon from "./../../assets/edit.svg"
    import { openPopup } from "../../stores/store";
    import AddFaqPopup from "../../lib/popups/AddFaqPopup.svelte";
    import Request from "../../utils/Request";
    import ConfirmPopup from "../../lib/popups/ConfirmPopup.svelte";

    let props = $props()

    let data = $state([])
    let fetching = $state(false)
    let dataLoaded = $state(false)

    const deleteElement = (data) => {
        openPopup(ConfirmPopup, {
            onSubmitClick:()=>{
                Request.delete('/faq/' + data.id).then(res => {
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
        openPopup(AddFaqPopup, {
            data:data,
            save:(object)=>{
                Request.put('/faq/'+data.id, object).then(res => {
                    fetchElements()
                }).catch(err => {
                    console.log(err)
                })
            }
        })
    }

    const addElement = () => {
        openPopup(AddFaqPopup, {
            save:(object)=>{
                Request.post('/faq', object).then(res => {
                    fetchElements()
                }).catch(err => {
                    console.log(err)
                })
            }
        })
    }

    const filterData = (data, searchValue) => {
        let filterValue = searchValue.toLowerCase()
        if(data.question.toLowerCase().includes(filterValue)) return true
        else return false
    }

    const fetchElements = () => {
        fetching = true
        Request.get('/faq').then((res) => {
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
        {size:50, isFixed : false, label:"admin.faq.question", id:"question", type:"text"},
        {size:50, isFixed : false, label:"admin.faq.answer", id:"answer", type:"text"},
        {size:140, isFixed : true, label:"", type:'actions', actions:[
            {icon:EditIcon, onClick:(data) => updateElement(data)}, 
            {icon:TrashIcon, onClick:(data) => deleteElement(data)}, 
        ]}
    ]
</script>

<div class="Logs">
    <FetchPage 
        fetching={fetching} 
        data={data} 
        title={"menu.faq"} 
        type={'faq'} 
        columns={columns} 
        addData={addElement} 
        filterData={filterData}
    />
</div>

<style lang="scss">
    .Logs{
        width: 100%;
        height: 100%;
        display: flex;
        position: relative;
    }
</style>