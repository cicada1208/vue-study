<template>
  <v-container>
    <v-file-input
      label="File input"
      placeholder="Pick an image"
      v-model="files"
      accept="image/*"
      :rules="rules"
      multiple
      counter
      show-size
      chips
    ></v-file-input>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    files: [],
    rules: [
      (v) => {
        // when multiple: param v is an array of files
        // when not multiple: param v is a file
        // return false or error message 表示為錯誤狀態
        let result =
          !v.length ||
          !v.filter((f) => f.size > 2000000).length ||
          'each size should be less than 2 MB!';
        return result;
      },
    ],
  }),
};
</script>
