<script>
import { t } from "svelte-intl-precompile";
import CrossIcon from "./../assets/cross.svg";
import Body from "./Body.svelte";

let props = $props();

let imageUrl = $state("");

$effect(() => {
  if (imageUrl === "") {
    if (props.image){
      imageUrl = (import.meta.env.VITE_SERVER_URL + props.image);}
    else imageUrl = null;
  }
});

const changeImage = (image = null) => {
  let imageUrlTmp;
  if (image) imageUrlTmp = URL.createObjectURL(image);
  imageUrl = imageUrlTmp;
  console.log(imageUrl);
  if (props.setImage) props.setImage(image);
};
</script>

<div class="UploaderContent">
    {#if props.title}
        <div class="UploaderTitle">
            <Body>{$t(props.title)}</Body>
        </div>
    {/if}
    <div class={"Uploader" + (props.disabled ? " disabled" : "") + (props.portrait ? " portrait" : "")}>
        {#if imageUrl}
            <div class="UploadedImage">
                <div class='image' style={`background-image:url(${imageUrl})`}></div>
                <button class="cross" onclick={()=>{changeImage()}}>
                    <img src={CrossIcon} alt="Icone de croix" />
                </button>
            </div> 
        {:else}
            <input disabled={props.disabled} type="file" id={"uploader-input"} name={"uploader-input"} accept="image/png, image/jpeg" multiple={props.multiple} onchange={(e)=>{changeImage(e.target.files[0])}}/>
            <label for="uploader-input">+</label>
        {/if}
    </div>
</div>

<style lang="scss">
    .UploaderContent{
        display: flex;
        flex-direction: column;
        gap:10px;

        .Uploader{
            width: 350px;
            height: 350px;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 3px dashed var(--neutral0);

            &.disabled{
                opacity: .5;
                input{
                    cursor: default;
                }
                label{
                    opacity: .5;
                    cursor: default;
                }
            }

            .UploadedImage{
                width: 100%;
                height: 100%; 
                position: relative;

                .image{
                    background-position:center;
                    background-repeat: no-repeat;
                    background-size: contain;
                    width: 100%;
                    height: 100%;
                }

                .cross{
                    width: 30px;
                    height: 30px;
                    display: flex;
                    background-color: var(--neutral0);
                    border-radius: 50%;
                    align-items: center;
                    justify-content: center;
                    position: absolute;
                    right: 10px;
                    border: 0;
                    top: 10px;
                    cursor: pointer;

                    img{
                        width: 100%;
                        height: 100%;
                        pointer-events: none;
                    }
                }
                
            }

            input{
                width: 100%;
                height: 100%;
                opacity: 0;
                position: absolute;
                left: 0;
                top: 0;
                cursor: pointer;
            }

            label{
                cursor: pointer;
                font-size: 70px;
                color: white;
            }
        }
    }
    
</style>