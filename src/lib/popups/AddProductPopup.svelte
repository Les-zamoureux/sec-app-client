<script>
    import { closePopup } from "../../stores/store";
    import Request from "../../utils/Request";
    import Input from "../Input.svelte";
    import PopupContent from "../PopupContent.svelte";

    let props = $props()

    const save = () => {
        if(props.save) {
            props.save({
                id: props.data ? props.data.id : null,
                // question : question,
                // answer : answer
            })
        }
    }
</script>

<div class="AddProductPopup">
    <PopupContent title={props.data ? "admin.faq.edit-popup" : "admin.faq.add-popup"} submitDisabled={false} submitLabel={props.data ? 'commons.validate':'commons.add'} onSubmitClick={save}>
        <div class="AddProductContainer">
        </div>
    </PopupContent>
</div>

<style lang="scss">
    .AddFaqPopup{
        width: 600px;
        height: 700px;

        .AddFaqContainer{
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
    }
</style>