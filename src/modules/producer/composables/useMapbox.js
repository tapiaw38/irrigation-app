import mapboxgl from "mapbox-gl";

const useMapbox = () => {

  const createMap = (
    {
      container = "map",
      center = [0, 0],
      zoom = 11,
      markers = [],
      line = null,
    }) => {
    mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN;
    const map = new mapboxgl.Map({
      container,
      style: "mapbox://styles/mapbox/streets-v11",
      center,
      zoom,
    });

    map.on('load', () => {
      if (line && line.coordinates && line.coordinates.length > 0) {
        map.addSource('route', {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: line.coordinates
            }
          }
        });

        map.addLayer({
          id: 'route',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': line.color || '#3b9ddd',
            'line-width': line.width || 3
          }
        });
      }

      markers.forEach(m => {
        if (m.coordinates && m.coordinates.length === 2) {
          new mapboxgl.Marker({
            draggable: false,
          })
            .setLngLat(m.coordinates)
            .setPopup(new mapboxgl.Popup().setHTML(m.title))
            .addTo(map);
        }
      });
    });
  };

  return {
    createMap,
  }

}

export default useMapbox;
