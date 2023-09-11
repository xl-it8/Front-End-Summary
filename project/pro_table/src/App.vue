<template>
  <div id="app">
    <!-- 提供搜索的方法 -->
    <Table :query="query" :tableFields="tableFields">
      <Detail />
    </Table>
  </div>
</template>

<script>
import Detail from './detail.vue'
import Table from '@/components/Table/index.vue'
export default {
  name: 'App',
  components: {
    Table,
    Detail
  },
  data() {
    return {
      query: {
        btn: {
          hasSearch: true, //是否有搜索按钮
          btnAll: [
            {
              btnName: "编辑",
              // attrs: {
              //   type: 'success',
              //   disabled: true
              // }
            },
            {
              btnName: "删除",
              // attrs: {
              //   type: 'success',
              //   disabled: true
              // }
            }
          ]
        },
        top: [{
          name: 'input',
          queryFileds: 'id',
          attrs: { //处理样式属性的
            placeholder: '个性输入1'
          }
        },
        {
          name: 'datePicker',
          queryFileds: 'time',
          // attrs: { //处理样式属性的
          //   placeholder: '个性输入1'
          // }
        },
        {
          name: 'select',
          queryFileds: 'foot',
          attrs: {
            placeholder: '个性输入3',
          },
          options: [{
            value: 1,
            label: '苹果',
          }, {
            value: 2,
            label: '西瓜',
          }]
        }
        ],
      },
      tableFields: [{
        label: '身份',
        prop: 'id',
      },
      {
        label: '姓名',
        prop: 'name'
      },
      {
        label: '年龄',
        prop: 'age',
        isSlot: 'zd', //是否特殊处理
        attrs: {
          // fixed: 'left',
          align: 'center'
        }
      },
      {
        label: '身高',
        prop: 'height'
      },
      {
        label: '操作',
        attrs: {
          width: '150px'
        },
        operateBtns: [
          {
            name: '编辑', //指定名字
            attrs: {
              title: "编辑内容",
              width: '33%'
            }
            // eventName: 'edit', //指定事件名
          },
          {
            name: '详情',
            eventName: 'detail',
            // goToPage: true //是否去新页面
          }
        ]
      }
      ]
    }
  },
  methods: {
    detail(row) {
      console.log("--" + row)
    },
    async submit() { //弹窗确认按钮
      return true
    }
  }
}
</script>

<style>
</style>
