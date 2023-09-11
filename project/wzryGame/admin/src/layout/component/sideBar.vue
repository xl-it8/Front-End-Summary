<template>
  <div class="sideBar">
    <el-menu
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      unique-opened
      :default-active="$route.path"
      router
    >
      <!-- <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">导航一</span>
        </template>
        <el-menu-item-group>
          <span slot="title">分组一</span>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <span slot="title">选项4</span>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu> -->
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">物品管理</span>
        </template>
        <el-menu-item-group>
          <template slot="title">分类</template>
          <el-menu-item index="/categories/create">
            <i class="el-icon-document"></i>
            <span slot="title">新建分类</span>
          </el-menu-item>
          <el-menu-item index="/categories/list">
            <i class="el-icon-setting"></i>
            <span slot="title">分类列表</span>
          </el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <template slot="title">物品</template>
          <el-menu-item index="/items/create">
            <i class="el-icon-document"></i>
            <span slot="title">新建物品</span>
          </el-menu-item>
          <el-menu-item index="/items/list">
            <i class="el-icon-setting"></i>
            <span slot="title">物品列表</span>
          </el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <template slot="title">英雄</template>
          <el-menu-item index="/heros/create">
            <i class="el-icon-document"></i>
            <span slot="title">新建英雄</span>
          </el-menu-item>
          <el-menu-item index="/heros/list">
            <i class="el-icon-setting"></i>
            <span slot="title">英雄列表</span>
          </el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <template slot="title">文章</template>
          <el-menu-item index="/article/create">
            <i class="el-icon-document"></i>
            <span slot="title">新建文章</span>
          </el-menu-item>
          <el-menu-item index="/article/list">
            <i class="el-icon-setting"></i>
            <span slot="title">文章列表</span>
          </el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <template slot="title">广告位</template>
          <el-menu-item index="/ad/create">
            <i class="el-icon-document"></i>
            <span slot="title">新建广告</span>
          </el-menu-item>
          <el-menu-item index="/ad/list">
            <i class="el-icon-setting"></i>
            <span slot="title">广告列表</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">系统管理</span>
        </template>
        <el-menu-item-group>
          <template slot="title">账号</template>
          <el-menu-item index="/admin/create">
            <i class="el-icon-document"></i>
            <span slot="title">新建账号</span>
          </el-menu-item>
          <el-menu-item index="/admin/list">
            <i class="el-icon-setting"></i>
            <span slot="title">账号列表</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>
  
  
  <script>
export default {
  data() {
    return {
      isCollapse: false
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
  </script>