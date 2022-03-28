import mapboxgl from "mapbox-gl";
import { onMounted } from "vue";

const useMapbox = () => {

  const createMap = () => {
    mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN;
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-74.5, 40],
      zoom: 9,
    });
    map.addControl(new mapboxgl.Navigation());
  };

  onMounted(() => {
    createMap();
  });


  return {
    createMap,
  }

}

export default useMapbox;
