<template>
  <el-upload
    class="avatar-uploader"
    :action="url"
    :headers="header"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <img v-if="currenImgUrl" :src="currenImgUrl" class="avatar" />
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>
  
  <script>
export default {
  props: {
    value: {
      type: String,
      default: null
    },
    url: {
      type: String,
      default: ''
    }
  },
  computed: {
    header() {
      return {
        Authorization: localStorage.getItem('token') || ''
      }
    },
    currenImgUrl: {
      get() {
        return this.value
      },
      set(newValue) {
        this.$emit('input', newValue)
      }
    }
  },
  data() {
    return {
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.currenImgUrl = res.message
      //   this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      //   const isJPG = file.type === 'image/jpeg';
      //   const isLt2M = file.size / 1024 / 1024 < 2;

      //   if (!isJPG) {
      //     this.$message.error('上传头像图片只能是 JPG 格式!');
      //   }
      //   if (!isLt2M) {
      //     this.$message.error('上传头像图片大小不能超过 2MB!');
      //   }
      //   return isJPG && isLt2M;
    }
  }
}
  </script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  min-width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  min-width: 100px;
  height: 100px;
  display: block;
}
</style>