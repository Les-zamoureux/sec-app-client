<script>
import { t } from "svelte-intl-precompile";
import Heading from "../../lib/Heading.svelte";
import FetchPage from "../../lib/FetchPage.svelte";
import TrashIcon from "./../../assets/trash.svg";
import { openPopup } from "../../stores/store";
import ConfirmPopup from "../../lib/popups/ConfirmPopup.svelte";
import Request from "../../utils/Request";

let props = $props();
let data = $state([]);
let fetching = $state(false);
let dataLoaded = $state(false);

const deleteElement = (data) => {
  openPopup(ConfirmPopup, {
    onSubmitClick: () => {
      Request.delete("/log/" + data.id)
        .then((res) => {
          fetchElements();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    title: "admin.faq.delete",
    description: "admin.faq.delete-description",
  });
};

const filterData = (data, searchValue) => {
  let filterValue = searchValue.toLowerCase();
  if (
    data.method.toLowerCase().includes(filterValue) ||
    data.url.toLowerCase().includes(filterValue)
  )
    return true;
  else return false;
};

const fetchElements = () => {
  fetching = true;
  Request.get("/log")
    .then((res) => {
      console.log(res);
      data = res.logs;
      fetching = false;
    })
    .catch((err) => {
      console.log(err);
      data = [];
      fetching = false;
    });
};

$effect(() => {
  if (!dataLoaded) {
    fetchElements();
    dataLoaded = true;
  }
});

const columns = [
  { size: 50, isFixed: true, label: "table.id", id: "id", type: "text" },
  {
    size: 150,
    isFixed: true,
    label: "admin.logs.method",
    id: "method",
    type: "text",
  },
  {
    size: 50,
    isFixed: false,
    label: "admin.logs.url",
    id: "url",
    type: "text",
  },
  {
    size: 50,
    isFixed: false,
    label: "admin.logs.user-id",
    id: "user_id",
    type: "text",
  },
  {
    size: 140,
    isFixed: true,
    label: "",
    type: "actions",
    actions: [{ icon: TrashIcon, onClick: (data) => deleteElement(data) }],
  },
];
</script>

<div class="Logs">
    <FetchPage 
        fetching={fetching} 
        data={data} 
        title={"menu.logs"} 
        type={'log'} 
        columns={columns} 
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