<template>
  <vue-editor
    v-model="content"
    useCustomImageHandler
    @image-added="handleImageAdded"
  ></vue-editor>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { upload } from '@/api/category'
export default {
  components: {
    VueEditor
  },
  props: {
    value: {
      type: String,
      default: null
    }
  },
  data() {
    return {
    };
  },
  computed: {
    content: {
      get() {
        return this.value
      },
      set(newValue) {
        this.$emit('input', newValue)
      }
    }
  },
  methods: {
    handleImageAdded(file, Editor, cursorLocation, resetUploader) {

      var formData = new FormData();
      formData.append("file", file);
      upload(formData)
        .then(result => {
          const url = result.data.message; // Get url from response
          Editor.insertEmbed(cursorLocation, "image", url);
          resetUploader();
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

};
</script>

<style>
</style>