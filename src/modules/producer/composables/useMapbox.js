import mapboxgl from "mapbox-gl";

const useMapbox = () => {

  const createMap = (
    {
      container = "map",
      center = [0, 0],
      zoom = 11,
      markers = [],
    }) => {
    mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN;
    const map = new mapboxgl.Map({
      container,
      style: "mapbox://styles/mapbox/streets-v11",
      center,
      zoom,
    });

    markers.map(m => {
      new mapboxgl.Marker({
        draggable: false,
      })
        .setLngLat(m.coordinates)
        .setPopup(new mapboxgl.Popup().setHTML(m.title))
        .addTo(map);
    });
  };

  return {
    createMap,
  }

}

export default useMapbox;
