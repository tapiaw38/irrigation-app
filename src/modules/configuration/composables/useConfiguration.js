import { ref, onMounted } from "vue";
import axios from "axios";

const configuration = ref(null);
const loading = ref(false);
const error = ref(null);

const useConfiguration = () => {
  const fetchConfiguration = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await axios.get(
        `${process.env.VUE_APP_APIBASEURL}/configuration/`
      );
      configuration.value = response.data.response;
    } catch (err) {
      error.value = err.message;
      console.error("Error fetching configuration:", err);
      configuration.value = {
        default_location: {
          latitude: -28.065752,
          longitude: -67.564368,
          zoom: 13,
        },
        watering_hour_factor: 2,
      };
    } finally {
      loading.value = false;
    }
  };

  const updateConfiguration = async (config) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await axios.put(
        `${process.env.VUE_APP_APIBASEURL}/configuration/update`,
        config
      );
      configuration.value = response.data.response;
      return { ok: true, message: "Configuration updated successfully" };
    } catch (err) {
      error.value = err.message;
      console.error("Error updating configuration:", err);
      return { ok: false, message: err.message };
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    if (!configuration.value) {
      fetchConfiguration();
    }
  });

  return {
    configuration,
    loading,
    error,
    fetchConfiguration,
    updateConfiguration,
  };
};

export default useConfiguration;
