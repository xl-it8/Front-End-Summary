
export default {
    'input': {
        type: 'el-input',
        attrs: {
            style: {
                width: '220px'
            }
        }
    },
    'select': {
        type: 'ISelect',
        attrs: {
            clarable: true
        }
    },
    'upload': {
        type: 'myUpload',
        attrs: {

        }
    },
    'rate': {
        type: 'el-rate',
        attrs: {
            max: 9,
            style:{
                marginTop:'10px'
            }
        }
    },
    'editor': {
        type: 'editor',
        attrs: {
            // style:{
            //     marginTop:'10px'
            // }
        }
    }
}