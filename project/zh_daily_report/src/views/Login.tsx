import React,{useState,useEffect, useRef}  from 'react'
import NavBarAgain from '@/components/NavBarAgain'
import ButtonAgain from '@/components/ButtonAgain'
import { flushSync } from 'react-dom'
import { sendPhoneCode, login } from '@/api'
import { connect} from 'react-redux'
import action from '../store/actions';
import {
  Form,
  Input,
  Button,
  Toast
} from 'antd-mobile'
/* 自定义表单校验规则 */
const validate = {
  phone(_:any, value:string = '') {
    // console.log(value)
      value = value?.trim();
      let reg = /^(?:(?:\+|00)86)?1\d{10}$/;
      if (value.length === 0) return Promise.reject(new Error('手机号是必填项!'));
      if (!reg.test(value)) return Promise.reject(new Error('手机号格式有误!'));
      return Promise.resolve();
  },
  code(_:any, value:string ='') {
      value = value?.trim();
      let reg = /^\d{6}$/;
      if (value.length === 0) return Promise.reject(new Error('验证码是必填项!'));
      if (!reg.test(value)) return Promise.reject(new Error('验证码格式有误!'));
      return Promise.resolve();
  }
};



const Login =function(props:any){
  let { queryUserInfoAsync, navigate, usp } = props;
  let [time,setTime] = useState<number>(5),
       [disabled, setDisabled] = useState(false),
        [isSend,setIsSend] = useState<boolean>(false)
        const [formIns] = Form.useForm()
        let timer:NodeJS.Timer;
  const handleTime= ()=>{

    setIsSend(true)
     timer = setInterval(() => {
      setTime(count =>{
        if(!count){
          setDisabled(false);
          setIsSend(false)
          setTime(5)
          clearInterval(timer)
        }
       return count -1
      });
    }, 1000);
  }

     /* 表单提交 */
     const submit = async () => {
      try {
          await formIns.validateFields(); //触发校验
          let { phone, code } = formIns.getFieldsValue(); //得到校验值
          let { code: codeHttp, token } = await login(phone, code);
          if (+codeHttp !== 0) {
              Toast.show({
                  icon: 'fail',
                  content: '登录失败'
              });
              formIns.resetFields(['code']); //清楚code
              return;
          }
          // 登录成功:存储Token、存储登录者信息到redux、提示、跳转
          localStorage.setItem('tk',token)
          // console.log(3)
          await queryUserInfoAsync(); //派发任务,同步redux中的状态信息
          Toast.show({
              icon: 'success',
              content: '登录/注册成功'
          });
          let to = usp.get('to');
          to ? navigate(to, { replace: true }) : navigate(-1);
      } catch (err) {console.log(err) }
  };


  const send = async () => {
    try {
        await formIns.validateFields(['phone']); //校验某一个
        let phone = formIns.getFieldValue('phone');
        let { code } = await sendPhoneCode(phone);
        if (+code !== 0) {
            Toast.show({
                icon: 'fail',
                content: '发送失败'
            });
            return;
        }
        // 发送成功
        setDisabled(true);
        handleTime()
        // countdown();
        // if (!timer) timer = setInterval(countdown, 1000);
    } catch (_) { }
};
  return <div className='login_box'>
    <NavBarAgain title="登录/注册"></NavBarAgain>
    <Form
        form={formIns}
        initialValues={{ phone: '', code: '' }}
        layout='horizontal'
        footer={
          <ButtonAgain color='primary'
                    onClick={submit}>
                    提交
                </ButtonAgain>
        }
      >
        <Form.Item
          name='phone'
          label='手机号'
          rules={[{ validator: validate.phone }]}
        >
          <Input onChange={console.log} placeholder='请输入手机号' />
        </Form.Item>
        <Form.Item
          name='code'
          label='验证码'
          rules={[{ validator: validate.code }]}
          extra={
            <ButtonAgain onClick={send}  color='primary' disabled={disabled}>
           {isSend ? `${time}s重新发送` : '发送验证码'}
          </ButtonAgain>
          }
        >
          <Input onChange={console.log} placeholder='请输入验证码' />
        </Form.Item>
      </Form>
  </div>
}

export default connect(null, action.base)(Login)