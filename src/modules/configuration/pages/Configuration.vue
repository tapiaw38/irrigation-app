<template>
  <div class="q-pa-lg">
    <div class="q-gutter-md">
      <q-toolbar-title>
        <span class="text-h6 q-mb-md q-pa-xs">Configuración del Sistema</span>
      </q-toolbar-title>

      <alert
        :dialog="isAlertOpen"
        :headerMessage="headerMessage"
        :message="alertMessage"
        :icon="alertIcon"
        :iconColor="alertIconColor"
        :showIcon="true"
        @close="closeAlert()"
      />

      <q-card class="q-pa-md">
        <q-card-section>
          <div class="text-subtitle1">Ubicación Predeterminada del Mapa</div>
          <div class="text-caption text-grey-7 q-mb-md">
            Configura el centro y zoom inicial para todos los mapas del sistema
          </div>

          <div class="row q-gutter-md">
            <q-input
              v-model.number="formData.default_location.latitude"
              type="number"
              step="0.000001"
              label="Latitud"
              outlined
              dense
              class="col"
              :rules="[(val) => val !== null || 'Campo requerido']"
            />
            <q-input
              v-model.number="formData.default_location.longitude"
              type="number"
              step="0.000001"
              label="Longitud"
              outlined
              dense
              class="col"
              :rules="[(val) => val !== null || 'Campo requerido']"
            />
            <q-input
              v-model.number="formData.default_location.zoom"
              type="number"
              min="1"
              max="20"
              label="Zoom"
              outlined
              dense
              class="col-2"
              :rules="[(val) => (val >= 1 && val <= 20) || 'Entre 1 y 20']"
            />
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <div class="text-subtitle1">Factor de Horas de Riego</div>
          <div class="text-caption text-grey-7 q-mb-md">
            Factor multiplicador para calcular las horas de riego (Horas =
            Factor × Área)
          </div>

          <q-input
            v-model.number="formData.watering_hour_factor"
            type="number"
            step="0.1"
            min="0.1"
            label="Factor de Horas de Riego"
            outlined
            dense
            style="max-width: 300px"
            :rules="[(val) => val > 0 || 'Debe ser mayor a 0']"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            label="Cancelar"
            flat
            color="grey"
            @click="resetForm"
            :disable="loading"
          />
          <q-btn
            label="Guardar Cambios"
            color="primary"
            @click="saveConfiguration"
            :loading="loading"
          />
        </q-card-actions>
      </q-card>

      <q-card class="q-pa-md q-mt-md">
        <q-card-section>
          <div class="text-subtitle1">Vista Previa de Configuración Actual</div>
          <div class="q-mt-md text-caption">
            <div>
              <strong>Centro del mapa:</strong>
              {{ configuration?.default_location?.latitude }},
              {{ configuration?.default_location?.longitude }}
            </div>
            <div>
              <strong>Zoom:</strong> {{ configuration?.default_location?.zoom }}
            </div>
            <div>
              <strong>Factor de riego:</strong>
              {{ configuration?.watering_hour_factor }}
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, watch, onMounted } from "vue";
import useConfiguration from "../composables/useConfiguration";
import useAlert from "../../../composables/useAlert";
import Alert from "../../../components/Alert.vue";

export default defineComponent({
  name: "ConfigurationPage",
  components: {
    Alert,
  },
  setup() {
    const { configuration, loading, fetchConfiguration, updateConfiguration } =
      useConfiguration();
    const { headerMessage, alertMessage, isAlertOpen, closeAlert, openAlert } =
      useAlert();

    const alertIcon = ref("las la-info-circle");
    const alertIconColor = ref("primary");

    const formData = ref({
      default_location: {
        latitude: -28.065752,
        longitude: -67.564368,
        zoom: 13,
      },
      watering_hour_factor: 2.0,
    });

    const loadFormData = () => {
      if (configuration.value) {
        formData.value = {
          default_location: {
            latitude: configuration.value.default_location.latitude,
            longitude: configuration.value.default_location.longitude,
            zoom: configuration.value.default_location.zoom,
          },
          watering_hour_factor: configuration.value.watering_hour_factor,
        };
      }
    };

    const resetForm = () => {
      loadFormData();
    };

    const saveConfiguration = async () => {
      const result = await updateConfiguration(formData.value);

      if (result.ok) {
        alertIcon.value = "las la-check-circle";
        alertIconColor.value = "positive";
        openAlert("Éxito", "La configuración se guardó exitosamente");
      } else {
        alertIcon.value = "las la-exclamation-triangle";
        alertIconColor.value = "negative";
        openAlert(
          "Error",
          "Error al actualizar la configuración: " + result.message
        );
      }
    };

    watch(configuration, () => {
      if (configuration.value) {
        loadFormData();
      }
    });

    onMounted(() => {
      if (!configuration.value) {
        fetchConfiguration();
      } else {
        loadFormData();
      }
    });

    return {
      configuration,
      formData,
      loading,
      saveConfiguration,
      resetForm,
      headerMessage,
      alertMessage,
      alertIcon,
      alertIconColor,
      isAlertOpen,
      closeAlert,
    };
  },
});
</script>
