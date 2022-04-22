import { ref, onMounted, onBeforeUnmount } from "vue";
import { Geolocation } from "@capacitor/geolocation";

const useGeolocation = () => {

  const position = ref("");
  let positionLoader = ref(null);
  let geoId;

  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition().then((newPosition) => {
      position.value = newPosition;
    });
  };

  onMounted(() => {
    getCurrentPosition();
    // we start listening
    geoId = Geolocation.watchPosition({}, (newPosition, err) => {
      position.value = newPosition;
    });
  });

  onBeforeUnmount(() => {
    // we do cleanup
    Geolocation.clearWatch(geoId);
  });

  return {
    position,
    positionLoader,
  };
};

export default useGeolocation;
