<script>
    import { t } from "svelte-intl-precompile";
    import Heading from "../../lib/Heading.svelte";
    import FetchPage from "../../lib/FetchPage.svelte";
    import TrashIcon from "./../../assets/trash.svg"
    import Request from "../../utils/Request";
    import { openPopup } from "../../stores/store";
    import ConfirmPopup from "../../lib/popups/ConfirmPopup.svelte";

    let props = $props()
    let data = $state([])
    let fetching = $state(false)
    let dataLoaded = $state(false)

    const deleteElement = (data) => {
        openPopup(ConfirmPopup, {
            onSubmitClick:()=>{
                Request.delete('/admin/user/' + data.id).then(res => {
                    fetchElements()
                }).catch(err => {
                    console.log(err)
                })
            },
            title:"admin.faq.delete", 
            description:"admin.faq.delete-description", 
        })
    }

    
    const filterData = (data, searchValue) => {
        let filterValue = searchValue.toLowerCase()
        if(data.method.toLowerCase().includes(filterValue) || data.url.toLowerCase().includes(filterValue)) return true
        else return false
    }

    const fetchElements = () => {
        fetching = true
        Request.get('/user').then((res) => {
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
        {size:100, isFixed : false, label:"admin.users.username", id:"username", type:"text"},
        {size:100, isFixed : true, label:"admin.users.is-admin", id:"is_admin", type:"boolean"},
        {size:150, isFixed : true, label:"admin.users.creation-date", id:"creation_date", type:"date"},
        {size:150, isFixed : true, label:"admin.users.verification-date", id:"verification_date", type:"date"},
        {size:140, isFixed : true, label:"", type:'actions', actions:[
            {icon:TrashIcon, onClick:(data) => deleteElement(data)}, 
        ]}
    ]
</script>

<div class="Users">
    <FetchPage 
        fetching={fetching} 
        data={data} 
        title={"menu.users"} 
        type={'user'} 
        columns={columns} 
        filterData={filterData}
    />
</div>

<style lang="scss">
    .Users{
        width: 100%;
        height: 100%;
        display: flex;
        position: relative;
    }
</style>