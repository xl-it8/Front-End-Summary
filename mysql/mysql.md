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
    
Tomcat (web服务器) 
   对http协议操作进行封装 简化web的操作
   部署web项目 对外提供网上信息浏览服务

   是一个轻量级的web服务器，支持sevelet,jsp等少量javaEE规范



BS架构
  浏览器 地址回车   web服务器 基于servelet服务提供的功能对其请求响应数据处理包装成对象
  即 httpServletRequest 和 httpServletResponse 并交给各个 xxxController类处理接口

  
  1. 传递简单请求 get请求 如 htpp://www.com/getId?name=xx&age=xx
    
    @restController
    class RequestController {
       @requestMapping("/getId")
       public String getId(String name, Integer age){
        return 'ok'
       }
       htpp://www.com/getName?name=xx&age=xx 传递的参数和接受的参数名不同的情况 利用springboot提供的@requestParam注解
       @requestMapping("/getName") 
       public String getId(@requestParam(name=name,required: false)String username, Integer age){
        return 'ok'
       }
    }
   2. 传递实体请求 get请求  如 htpp://www.com/getId?parmas.name=xx&parmas.age=xx
     
 @restController
    class RequestController {
       @requestMapping("/getId")
       public String getId(User user){
        return 'ok'
       }
    }
  
  class User {
    private String name;
    private Interger age;
  }

  3. 传递数组 get请求 传递以 hobby=xx&hobby=yy  接收以 String[] hobby
  4. 传递日期 限制前端传的格式 get请求  传递以 time=xxx  接收以 @DateTimeFormat(pattern = 'YYYY-MM-DD') LocalDateTime time

  5. 传递json参数 post请求  传递以 json格式 {ss: "zz"} 接收以 类的对象 还要结合@RequestBody注解 如 @RequestBody User user
  class User {
      private String name;
      private Interger age;
    }

  6. 传递路径参数(动态参数) get请求 传递以 如/path/33  接收以 
   @RequestMapping('/path/{id}/{name}')
         public String pathParam (@PathVariable Integer id, @PathVariable String name){

         }
  响应的 一般用类统一封装处理
 三层架构
  Controller控制层  请求接收响应处理数据
  Service 逻辑层 处理业务逻辑的
  DAO(Data Access Object) 数据层 对数据进行增删改查

  为了高内聚低耦合 使用依赖注入（dependencies injection）和控制反转(Inversion of Control)的机制来实现  
    DI  @Autowired、@Qualifier('xx')、@Resource('name=xx')
      @Autowired与@Resource 区别
        @Autowired是springboot提供的 @Resource是jdk提供
        @Autowired 通过类型匹配来进行依赖注入。如果有多个匹配类型的实例，可以使用 @Qualifier 注解指定具体的实例名称进行注入。
        @Resource 通过名称匹配来进行依赖注入。默认情况下，它会根据字段名或方法名与容器中的同名 Bean 进行匹配。如果存在多个同名 Bean，可以通过 name 属性指定具体的 Bean 名称进行注入。

    IOC @Controller @Service @Component 

 数据库Mysql下载安装 => 数控库服务系统 里面内置数据库管理系统软件对sql语句处理 也管理创建的数据库，其实是在磁盘文件夹中 sql语句分为 DDL DML DQL 可利用图形化工具Navicat或者DataGrip(IDEA内置操作数据库的)

 DQL  select xx from where xx group by xx having(分组后的查询) order by xx limit

查询 不是null的数据 select * from xx where name is Null
     select * from xx enterydate where between '2022-10-22' and '2023-10-12'
     slect * from xx where count in(2,4,5)多选1 类似多个or
     模糊查询 like 结合 _匹配一个字符 %匹配任意字符
     select * from xx name '张%' 查询开头以张开头的数据

     聚合函数(纵向计算) 不处理null值  count 如count(*) max min avg sum
        如 select customer_id,count(*) as order_count, sum(order_count) as order_all 
           from orders
           where customer_id !=4
           group by customer_id
           having order_all<1999
           order by desc 

    sql中的流程控制函数
       if(条件表达式, true的值, false的值);
       case 表达式 when then when then ... end;


       多表查询  三种关系 1对多(如员工与部门 一个员工只会有一个部门) 1对1(一个用户对应身份证号码) 多对多(学生和老师 需借助中间表)
     
  添加约束(约束 unique not null  primary key foreign key ) 举例 alter table users add constraint fk_users_customers foreign key (sss) references customers(id)
 
 多表查询 n*y 笛卡尔积现象 减少出现提高查询性能

  连接查询 内连接 外连接
  