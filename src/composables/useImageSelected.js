import { ref } from "vue";

const useImageSelected = () => {

  // upload image
  let imageSelected = ref(null);
  let image = ref(null);

  const onSelectedImage = (file) => {
    if (!file) {
      imageSelected.value = null;
      image.value = null;
      return;
    }
    image.value = file;
    const fr = new FileReader();
    fr.onload = () => (imageSelected.value = fr.result);
    fr.readAsDataURL(file);
  };


  return {
    imageSelected,
    image,
    onSelectedImage,
  }

}

export default useImageSelected;
