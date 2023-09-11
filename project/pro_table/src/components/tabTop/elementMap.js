export default {
    //原生属性
    input: {
        name: 'el-input', //v-model="input"
        props: {
            placeholder: "请输入内容",
            disabled: false,
            clearable: true, //可删除
            maxlength: "10",
            style: { width: '200px' }
        }
    },
    //
    'select': {
        name: "mySel",
        props: {
            style: { width: '200px' }
        }
    },
    'datePicker': {
        name: 'myDate',
        props: {
            placeholder: "请输入日期",
            type: 'date',
            style: { width: '200px' }
        }
    }
}