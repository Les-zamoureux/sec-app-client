<script>
import { closePopup } from "../../stores/store";
import Request from "../../utils/Request";
import Input from "../Input.svelte";
import PopupContent from "../PopupContent.svelte";

let props = $props();

let question = $state(props.data?.question || "");
let answer = $state(props.data?.answer || "");

const save = () => {
  if (props.save) {
    props.save({
      id: props.data ? props.data.id : null,
      question: question,
      answer: answer,
    });
  }
};
</script>

<div class="AddFaqPopup">
    <PopupContent title={props.data ? "admin.faq.edit-popup" : "admin.faq.add-popup"} submitDisabled={!question || !answer} submitLabel={props.data ? 'commons.validate':'commons.add'} onSubmitClick={save}>
        <div class="AddFaqContainer">
            <Input placeholder={"admin.faq.question-placeholder"} title={"admin.faq.question"} type={'textarea'} value={question} onChange={(val) => question = val}/>
            <Input placeholder={"admin.faq.answer-placeholder"} title={"admin.faq.answer"} type={'textarea'} value={answer} onChange={(val) => answer = val}/>
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