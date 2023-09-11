### 基础

关系型数据库： 建立在关系模型基础上，由多张表相互连接的二维表组成的数据库
![](C:\Users\96272\AppData\Roaming\Typora\typora-user-images\1678181025549.png)

### sql学习
  默认的charset=utf8mb4
  1个字 = 2字节 bytes 1个字节=8位 bit
  注释： 1. #或者--（单行注释） 2. /* */ (多行注释)
  分类：
  ![1678181335685](C:\Users\96272\AppData\Roaming\Typora\typora-user-images\1678181335685.png)

  DDL：
    查询: 
      show databases; 所有数据库
      show database(); 查询当前的数据库

    创建： 
      create database 数据库名称;  创建相同的数据库会报错
      create database if not exists 数据库名称; 加if not exists 目的是为了避免重复创建相同数据库

    删除：
      drop database 数据库名;
      drop database if exists 数据库名
    
    切换：
      use 数据库名;
    
    注意点: 
      1：输入的命令末尾需要加; 
      2：以上是操作数据库的命令

    查询：
      show tables; 查询当前数据库的所有表
      desc 表名; 查看表的结构
      show create table 表名; 可以获取详细的表信息 比如字段值
      
    创建:
      create table 表名(
        字段1 字段1类型 comment [字段1注释],
        字段2 字段2类型 comment [字段2注释]  最后一个字段不要加逗号了
      )[表名的注释];

      如：
        create table user (
           id int comment '编号',
           name varchar(255) comment '姓名'
        ) comment '用户的表';

  数据库数库类型
   ![](C:\Users\96272\AppData\Roaming\Typora\typora-user-images\1678183678990.png)
    
     





### 进阶

### 运维

