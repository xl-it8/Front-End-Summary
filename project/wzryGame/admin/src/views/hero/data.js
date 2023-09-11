
export default [
    {
        type: 'input',
        label: '名称',
        value: 'name',
        attrs: {
            placeholder: "请输入内容"
        },
    },
    {
        type: 'upload',
        label: '图标',
        value: 'avatar',
        attrs: {
            placeholder: "请输入内容",
        },
        url: 'http://localhost:803/hero/upload'
    },
    {
        type: 'upload',
        label: '英雄背景',
        value: 'banner',
        attrs: {
            placeholder: "请输入内容",
        },
        url: 'http://localhost:803/hero/upload'
    },
    {
        type: 'input',
        label: '称号',
        value: 'title',
        attrs: {
            placeholder: "请输入内容",
        },
    },
    {
        type: 'select',
        label: '类型',
        value: 'categories',
        attrs: {
            placeholder: "请选择",
            multiple: true
        },
        options: ''
    },
    {
        type: 'rate',
        label: '困难',
        value: ['scopes','difficult'],
    },
    {
        type: 'rate',
        label: '技能',
        value: ['scopes','skills'],
    },
    {
        type: 'rate',
        label: '攻击',
        value: ['scopes','attach'],
    },
    {
        type: 'rate',
        label: '生存',
        value: ['scopes','dead'],
    },
    {
        type: 'select',
        label: '顺风出装',
        value: 'items1',
        attrs: {
            placeholder: "请选择",
            multiple: true
        },
        options: ''
    },
    {
        type: 'select',
        label: '逆风出装',
        value: 'items2',
        attrs: {
            placeholder: "请选择",
            multiple: true
        },
        options: ''
    },
    {
        type: 'input',
        label: '使用技巧',
        value: 'useTips',
        attrs: {
            placeholder: "请输入内容",
            type: "textarea"
        },
    },
    {
        type: 'input',
        label: '对抗技巧',
        value: 'battleTips',
        attrs: {
            placeholder: "请输入内容",
            type: "textarea"
        },
    },
    {
        type: 'input',
        label: '团队思路',
        value: 'teamTips',
        attrs: {
            placeholder: "请输入内容",
            type: "textarea"
        },
    },

]