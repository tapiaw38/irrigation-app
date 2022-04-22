import { ref } from 'vue'
import { Camera, CameraResultType } from '@capacitor/camera'

const useCamera = () => {

  const imageSrc = ref('')

  const captureImage = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    })

    // The result will vary on the value of the resultType option.
    // CameraResultType.Uri - Get the result from image.webPath
    // CameraResultType.Base64 - Get the result from image.base64String
    // CameraResultType.DataUrl - Get the result from image.dataUrl
    imageSrc.value = image.webPath
  }

  return {
    imageSrc,
    captureImage
  };

};


export default useCamera;
