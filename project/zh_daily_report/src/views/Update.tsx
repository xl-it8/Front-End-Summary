import React ,{useState} from 'react'
import styled from "styled-components";
import NavBarAgain from '../components/NavBarAgain';
import ButtonAgain from '../components/ButtonAgain';
import {Input, ImageUploader, Toast} from 'antd-mobile'
import { ImageUploadItem } from 'antd-mobile/es/components/image-uploader'
import { connect } from 'react-redux';
import action from '@/store/actions'
import {upload, userUpdate } from '@/api'

import {RouteProps} from '@/global'
/* 样式 */
const UpdateBox = styled.div`
    .formBox {
        padding: 30px;

        .item {
            display: flex;
            align-items: center;
            height: 110px;
            line-height: 110px;
            font-size: 28px;

            .label {
                width: 20%;
                text-align: center;
            }

            .input {
                width: 80%;
            }
        }
    }

    .submit {
        display: block;
        margin: 0 auto;
        width: 60%;
        height: 70px;
        font-size: 28px;
    }
`;
interface Fn {
    info:{
       pic: string
       name: string
       phone: string
    }
    
    queryUserInfoAsync(): {
      type: string;
      info: string;
  }
  }
const Update:React.FC<Fn & Pick<RouteProps,'navigate'>> =function(props){
  const {info, queryUserInfoAsync, navigate} = props
  let [username, setUserName] =useState(info.name),
      [pic, setPic] = useState<ImageUploadItem[]>([{ url: info.pic }])
  const submit =async()=>{
 // 表单校验
 if (pic.length === 0) {
    Toast.show({
        icon: 'fail',
        content: '请先上传图片'
    });
    return;
}
if (username.trim() === "") {
    Toast.show({
        icon: 'fail',
        content: '请先输入账号'
    });
    return;
}
  // 获取信息，发送请求
  let [{ url }] = pic;
  try {
      let { code } = await userUpdate(username.trim(), url);
      if (+code !== 0) {
          Toast.show({
              icon: 'fail',
              content: '修改信息失败'
          });
          return;
      }
      Toast.show({
          icon: 'success',
          content: '修改信息成功'
      });
      queryUserInfoAsync()//这里是重点必须同步更改 同步本地修改
      navigate(-1);
  } catch (_) { }
  }
  const uploadImage =async (file: File)=>{
   let {code, pic} =await upload(file)
    if(+code  !== 0){
        Toast.show({
            icon: 'fail',
            content: '上传失败'
        });
        return;
    }
    setPic([{
        url: pic
    }]);
    return { url: pic}
  }
  return <UpdateBox>
  <NavBarAgain title="修改信息" />
  <div className="formBox">
      <div className="item">
          <div className="label">头像</div>
          <div className="input">
              <ImageUploader
                  value={pic}
                  maxCount={1}
                  onDelete={() => {
                      setPic([]);
                  }}
                  upload={uploadImage as any}
              />
          </div>
      </div>
      <div className="item">
          <div className="label">姓名</div>
          <div className="input">
              <Input placeholder='请输入账号名称'
                  value={username}
                  onChange={val => {
                      setUserName(val);
                  }} />
          </div>
      </div>
      <ButtonAgain color='primary' className="submit"
          onClick={submit}>
          提交
      </ButtonAgain>
  </div>
</UpdateBox>;
}

export default connect<{},{},{},{base:{}}>(state=>state.base, action.base)(Update)