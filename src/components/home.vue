<template>
  <div>
    <el-container>
      <el-header>
        <div class="header">
          <div class="avatar">
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            {{name}}
          </div>
          <div>
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#b3c0d1">
              <el-menu-item index="1">历史战绩</el-menu-item>
              <el-menu-item index="2">对战房间</el-menu-item>
            </el-menu>
          </div>
        </div>
      </el-header>
      <el-main>Main</el-main>
    </el-container>
  </div>
</template>

<script>
import asyncAPI from '../API'

export default {
  data () {
    return {
      name: '',
      activeIndex: '1',
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    init () {
      let that = this
      let url = '/api/home'
      asyncAPI.doGetDatas(url, ({data}) => {
        that.name = data.userName
      })
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style lang="stylus" scoped>
  .el-header{
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 460px;
  }
  .el-avatar{
    margin 10px
  }

  .header{
    display flex
    justify-content: space-between;
    .avatar{
      display: flex;
    }
  }



</style>