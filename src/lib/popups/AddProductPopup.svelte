<script>
import { closePopup } from "../../stores/store";
import Request from "../../utils/Request";
import Input from "../Input.svelte";
import PopupContent from "../PopupContent.svelte";
import TagList from "../TagList.svelte";
import Uploader from "../Uploader.svelte";

let props = $props();

let image = $state(props.data?.image || "");
let name = $state(props.data?.name || "");
let description = $state(props.data?.description || "");
let genetics = $state(props.data?.genetics || "");
let category = $state(props.data?.categories[0]?.name || "");
let type = $state(props.data?.type || "");
let price = $state(props.data?.price || 0);
let stock = $state(props.data?.stock || 0);
let thc = $state(props.data?.thc_rate || 0);
let cbd = $state(props.data?.cbd_rate || 0);
let aspects = $state(
  props.data?.aspects?.map((val) => val.name).join(";") || "",
);
let idealFor = $state(
  props.data?.idealfors?.map((val) => val.name).join(";") || "",
);
let flavors = $state(
  props.data?.flavors?.map((val) => val.name).join(";") || "",
);
let effects = $state(
  props.data?.effects?.map((val) => val.name).join(";") || "",
);

let disabled = $state(false);

const categoriesOptions = [
  "ice-o-lator",
  "weed-flower",
  "traditional-hash",
  "modern-hash",
];

const typesOptions = ["hash", "weed"];

const isDisabled = () => {
  console.log(props.data.aspects.every((val) => aspects.includes(val.name)));
  if (
    !image ||
    !name ||
    !description ||
    !genetics ||
    !category ||
    !type ||
    price == null ||
    stock == null ||
    thc == null ||
    cbd == null ||
    !aspects ||
    !idealFor ||
    !flavors ||
    !effects
  )
    return true;
  console.log("cbon");
  if (
    props.data &&
    image === props.data.image &&
    name === props.data.name &&
    description === props.description &&
    genetics === props.data.genetics &&
    category === props.data.category &&
    type === props.data.type &&
    price === props.data.price &&
    stock === props.data.stock &&
    thc === props.data.thc &&
    cbd === props.data.cbd &&
    props.data.aspects.every((val) => aspects.includes(val.name)) &&
    props.data.idealfors.every((val) => idealFor.includes(val.name)) &&
    props.data.aspects.every((val) => flavors.includes(val.name)) &&
    props.data.aspects.every((val) => effects.includes(val.name))
  )
    return true;
  else false;
};

const save = () => {
  console.log(isDisabled());
  if (props.save && !isDisabled()) {
    const product = {
      id: props.data ? props.data?.id : null,
      name: name,
      description: description,
      genetics: genetics,
      categories: [{ name: category }],
      type: type,
      image: image,
      imageUpdated: image !== props.data?.image,
      price: Number(price),
      stock: Number(stock),
      thc_rate: Number(thc),
      cbd_rate: Number(cbd),
      aspects: aspects.split(";").map((val) => {
        return { name: val };
      }),
      idealfors: idealFor.split(";").map((val) => {
        return { name: val };
      }),
      flavors: flavors.split(";").map((val) => {
        return { name: val };
      }),
      effects: effects.split(";").map((val) => {
        return { name: val };
      }),
    };

    console.log(product, props.data?.image, image);

    props.save(product);
  }
};
</script>

<div class="AddProductPopup">
    <PopupContent title={props.data ? "admin.faq.edit-popup" : "admin.faq.add-popup"} submitLabel={props.data ? 'commons.validate':'commons.add'} onSubmitClick={save}>
        <div class="AddProductContainer">
            <Uploader title={'admin.product.image-title'} image={image} setImage={(img)=>{image = img}}/>
            <Input title={'admin.product.name-title'} value={name} onChange={(val) => name = val}/>
            <Input title={'admin.product.description-title'} type={'textarea'} value={description} onChange={(val) => description = val}/>
            <Input title={'admin.product.genetics-title'} value={genetics} onChange={(val) => genetics = val}/>
            <TagList options={typesOptions} selected={type} onChange={(id)=>type = id} title={'admin.product.type-title'}/>
            <TagList options={categoriesOptions} selected={category} onChange={(id)=>category = id} title={'admin.product.category-title'}/>
            <Input title={'admin.product.price-title'} type={"number"} min={0.01} step={0.01} value={price} onChange={(val) => price = val}/>
            <Input title={'admin.product.stock-title'} type={"number"} min={0} value={stock} onChange={(val) => stock = val}/>
            <Input title={'admin.product.thc-title'} type={"number"} min={0} max={100} step={0.1} value={thc} onChange={(val) => thc = val}/>
            <Input title={'admin.product.cbd-title'} type={"number"} min={0} max={100} step={0.1} value={cbd} onChange={(val) => cbd = val}/>
            <Input title={'admin.product.aspects-title'} type={'textarea'} value={aspects} onChange={(val) => aspects = val}/>
            <Input title={'admin.product.ideal-for-title'} type={'textarea'} value={idealFor} onChange={(val) => idealFor = val}/>
            <Input title={'admin.product.flavors-title'} type={'textarea'} value={flavors} onChange={(val) => flavors = val}/>
            <Input title={'admin.product.effects-title'} type={'textarea'} value={effects} onChange={(val) => effects = val}/>
        </div>
    </PopupContent>
</div>

<style lang="scss">
    .AddProductPopup{
        width: 800px;
        height: 700px;

        .AddProductContainer{
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
    }
</style>