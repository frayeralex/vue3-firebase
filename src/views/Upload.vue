<template>
  <div class="upload">
    <h1>Upload</h1>
    <form @submit.prevent="handleUpload">
      <div class="progress">
        <div
          class="determinate"
          :style="{
            width: uploadProgressCSS
          }"
        ></div>
      </div>
      <div v-if="publicUrl" class="row">
        <h3>
          <a :href="publicUrl" target="_blank">Public url</a>
        </h3>
      </div>
      <div class="row">
        <div class="file-field input-field">
          <div class="btn">
            <span>File</span>
            <input type="file" @change="processFile" />
          </div>
          <div class="file-path-wrapper">
            <input class="file-path validate" type="text" />
          </div>
        </div>
      </div>
      <button type="submit" class="btn">Upload</button>
    </form>
  </div>
</template>

<script>
import { storage } from "../services/firebase";

export default {
  name: "Upload",
  data() {
    return {
      file: null,
      uploadProgress: 0,
      publicUrl: null
    };
  },
  computed: {
    uploadProgressCSS() {
      return `${this.uploadProgress.toFixed(0)}%`;
    }
  },
  methods: {
    async handleUpload() {
      const rootRef = storage.ref();
      const imageRef = rootRef.child(`images/${this.file.name}`);
      const metadata = {
        contentType: this.file.type
      };
      try {
        const uploadTask = imageRef.put(this.file, metadata);
        uploadTask.on("state_changed", snapshot => {
          this.uploadProgress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        });
        await uploadTask;
        this.publicUrl = await uploadTask.snapshot.ref.getDownloadURL();
      } catch (e) {
        this.uploadProgress = 0;
      }
    },
    processFile(event) {
      this.file = event.target.files[0];
    }
  }
};
</script>

<style scoped></style>
