基本下载安装 了解版本  常用jdk18
环境变量学会配置 配置java_home 可以更好的实现jdk版本切换
jdk组成 jvm 核心类库 =》jre 和java工具 java和javac常见 javac把java文件编译处理后放到jvm 而java执行字节码文件  先编译再执行  
使用idea工具 配置 模块导入 使用jdk版本 万符集语言
计算机基础了解 单位了解 比如 1kb=1024b 1b= 8位  计算机只能识别二进制 
十进制和二进制如何互相转换  除二取余   30 / 2 = 15 ....0  15 / 2= 7...1 7 /2=3...1 3 /2 =1...1  1 / 2 = 0 ... 
类似js语法   数据类型 运算符 流程结构 标识符 关键字 数组
面向对象 五大成员 属性 方法 构造器 内部代码块 成员类 以及 三大特性 封装性 继承性 多态性
  修饰符有  static final abstract public private protected
   属性 有成员变量 局部变量  成员变量 有静态属性 实例属性
   方法 有静态方法 实例方法 方法重载 就是 方法名一样参数列不一样
   构造器 有参数和无参数 常见类对象 就会执行构造器  构造器第一行要么是this()要么是super()
   内部代码块 非静态{} 创建实例执行 静态 static{} 静态获取执行 常用初始变量赋值
   成员类 静态成员 static class xx{} 非静态  重点 匿名成员类 创建子类对象的匿名成员
      
接口 interface 实现接口  主要可以就行告知有那些方法同时可以实现多继承

抽象类 abstract 更好的支持多态

枚举类 enum

泛型 <T> 自定义泛型 泛型方法 ？通配符 extends 泛型限制 泛型不能用基本数据类型限制


常见API
  字符串： 方法有 contains charAt startsWith split等等 
  ArrayList 集合 不能存基本数据类型 只能复杂数据类型
  toString() 打印地址 需重写
  equals 字符串调用已经重写 比较内容 其他引用类型比较的是地址 如果想比较对象内容需重写
  clone 克隆对象 注意 protected权限问题
  Objects工具类 常见的静态方法 isNull nonNull equals（相比于 另一个object提供的equals 对于null的话有判断更安全,比较对象的内容是否相等）

  重点 包装类  目的是把基本数据类型转为引用数据类型
    
  基本数据类型 ==》 引用数据类型
     方式1：
      xxx aaa =  xxx.valueOf(..) 如 Integer a = Integer.valueOf(23)
    方式2：
      自动装箱 如 Integer a1 = 23



  引用数据类型 ==》 基本数据类型
    方式1：
      自动拆箱
        int a2 = a1
包装类 提供的常见的方法
  1. 基本数据类型 ==》 字符串  拼接 或者 toString()


  2. 把字符串数据 ==》 对应相关类型  
     如 int aa = Integer.parseInt('244') 或者 int xx = Integer.valueOf('34')

  String由于不可能变字符串 所以提供 几个字符串处理api  
    StringBuilder StringBuffer StringJoiner 
    前两个 第一个线程不安全 第二个线程安全 但是用法一样
      实例方法有  append 拼接   length 长度 reverse 翻转 toString 转为字符串
    StringJoiner 实例方法 add 拼接 还有有参数构造器
      举例 StringJoiner xx = new StringJoiner(',', '[', ']')
      xx.add(22)  xx.toString()
    System 获取当前时间 System.currentTimeMills() 时间戳
    BigDecimal  库 解决 数值计算出现精度丢失问题 比如 0.1 + 0.2 = 0.300000004
    使用  BigDecimal xx = BigDecimal.valueOf(0.1) //这个方法能使0.1转为字符串并且返回BigDecimal实例
          BigDecimal xx2 = BigDecimal.valueOf(0.2) 
              xx.add(xx2) 加        还有减 乘 除  除法可能会有问题 要注意除不尽的要指定保留位小数
    ## 时间
            new Date() 获取当前时间 有参数的构造器 作用可以把时间戳转为时间 getTime()获取时间戳
            SimpleDateFormat('时间格式') 格式化时间    常见方法 format() 
            重点 字符串时间 转成 日期对象时间 ==》parse('字符串时间')  如 String xx = '2022-02-22'  SimpleDateFormat  yy =new SimpleDateFormat('yyyy-MM-dd') yy.parse(xx)
            Calendar.getInstance()获取日历对象 日历对象记录了 时间的所有相关信息 比如年 月 日 天等等
            get() 方法来获取某一个
            getTime 获取日历对象的时间对象
            set()修改日历对象的某一项 比如 set(Canlendar.MONTH , 9)把月份改成10月份 注意月份是少一个月的

        新时间方法 jdk8之后
        LocalDateTime 代表本地日期，时间  静态方法 now() 获取datetime 对象 而获取该对象后提供很多实例方法 获取对应的时间 比如 getYear 获取年 
           特别是 创建的时间对象是不可变对象 修改时间 不会影响之前的时间
        ZoneId 获取不同时区的时间 比如国外的时间 
           ZoneId.systemDefault() 获取当前系统默认的时区id 字符串 如Asia/beijing
        ZoneDateTime 静态方法 now()
           ZoneDateTime.now(存放ZoneId的时区Id对象) 返回那个时区的时间对象
        Instant 代替getTime获取时间戳的方式 
        Insatnt.now() 对象 提供 方法 比如获取纳秒 getNano()
    
        DateTimeFormat 代替SimpleDateFormat 线程安全
            DateTimeFormat xx = DateTimeFormat.ofPattern('时间格式')  String yy =  xx.format(时间对象)
            解析时间 -》String x= "2022年12月23日"  LocalDateTime.parse(x, DateTimeFormat.ofPattern('时间格式'))
        Period 计算两个日期之间差值 Duration.between 计算两个时间之间的差值 时分秒的差值

   Arrays 类 Arrays.toString() 数组原封不动打印出来 Arrays.copyOfRange() 类似 js的slice 截取数组
   Arrays.sort() 排序 默认升序
   排序相关的内容
    方式一   Arrays.sort(引用对象) 影响原数组
      sort可以直接比较整数型的 但是如果是比较引用数据类型的
      需要 对该对象 实现Comparable接口 重写compareTo方法来自定义指定排序方式
        方法里面写法 要遵循一个约定 左边对象>右边对象 return 正整数  左边对象<右边对象 return 负整数  左边对象=右边对象 return 0 简写 this.xxx - 传入的对象.xxx
    方式二  
       Arrays.sort(比较对象, 匿名内部类)
       Arrays.sort(比较对象, new Comparator<Student>(){
        public int compare(Student o1, Student o2 ){
            return Double.compare(o1.getHeight,o2.getHeight)
        }
       })


正则表达式 匹配单个字符
  字符串.matchs(表达式) 类似 js中的test
  String data = 'werf3456'
  String reg = '\\d+'
  Pattern pattern = Pattern.parse(reg)
  Matcher matcher = pattern.matcher(data)
  while(matcher.find()){
    String xx =  matcher.group()

  }

 字符串.replcaeAll(表达式,内容) 类似js的replace方法

 字符串转数组 xxx.split
Lamda表达式 就是对匿名内部类的简写  格式()->{} 注意 类似js的箭头函数


异常
                           Throwable
Error(这个错误与程序员无关)                      Exception
                            RuntimeException(运行时异常)      编译异常

  自定义异常
     自定义运行时异常   创建一个继承RuntimeException的类型 并创建构造器  接着 在项目中通过抛出类throw和try。。catch捕获错误
     自定义编译时异常   throws 异常  抛出错误 在方法的后面写

集合框架
                 Collection(单列集合 一个数据就一个元素)                      
    List(接口)  有序，可重复，有索引         Set(接口) Set相反
ArrayList(实现类)                HashSet        TreeSet
                         LinkedHashSet


Collection的常用方法  add  clear isEmpty size contains  remove  toArray addAll
            遍历方法 1. iterator方法 获取迭代器对象 通过迭代器对象 调用 next方法获取数据 再结合 hasNext方法判断是否结束遍历
                    2. 增强for循环    3. forEach(()->{})
              
List接口 常提供的方法  add remove get   set 都是和索引相关的方法     
              
实现类 
    ArrayList  
         特点 底层运用数组原理 查询快 增删慢
    LinkedList  方法有 addFirst removeFirst 
        特点  链表结构 查询慢 增删快  常见应用场景 栈 和 队列结构
              
HashSet 无序 不重复 无索引
  对象的HashCode方法 是获取该对象的hash值 同一个对象hash值一样 不同对象大概率不一样
  HashSet原理 数组 + 链表 + 红黑树的组合
       HashSet集合 要想添加的内容对象一样的情况下去掉相同对象 就需要重写hashCode和和equals内容一样  
LinkedHashSet 有序 不重复 无索引
TreeSet 排序(升序) 不重复 无索引    

Collections工具类
 Collections.addAll(集合,'','',...) 一次性往集合添加数据
 Collections.shuffle(集合) 打乱List集合顺序
 Collections.sort() 对list集合排序 如果是对象要处理排序
              
        
              
                        Map(双列集合 一个数据有两个元素 键值对) 和set有点类似
       HashMap(实现类)  (无序 不重复 无索引)                      TreeMap(实现类) (排序 不重复 无索引)            。。。。
  LinkedHashMap (有序 不重复 无索引)

Map<String, Interger> map = new HashMap<>() 
 map.put(key, value) 添加方法
 常用方法 size长度  clear清空   get获取某一个数据  containsKey containsValue   keySet 获取所有键 用Set接受  values获取所有值 用Collection接受 putAll把map2集合中的元素倒入map1的数据 map2还是会有之前的元素
 遍历 可用forEach 方法

 原理 类似 set集合

 集合嵌套 集合中的元素又是一个集合  比如 不同省份的不同城市 


Stream流(接口) 更好的操作集合数组 代替以上的某些方法 比如遍历 其实类似js提供的api
  举例： 集合.stream().filter(()->{}).filter() 过滤方法 可以是链式编程
  数据源 --》 处理方法 ==》  处理后获取处理的结果

  如何获取stream流
   Stream xx = 集合.stream() 针对Collection提供的stream方法 map不属于 需要map.entrySet处理成 set集合再调用stream

     举例 Set<Map.entery<String,Double>> m = map.entrySet()
         Stream<Map.entey<String,Double>> s = m.stream()
         s.filter(s=>s.getKey().contains(xx)).forEach(e-> e.getKey() + e.getValue())

   Stream xx = Arrays.stream(数组对象) 或者 Stream.of(数组对象)

   创建中间处理方法
     filter过滤  
     sorted排序(默认升序) 
     limit(n)取出前n个数据 
     skip(n)取出跳过前n个的数据 
     map(()->{}) 映射
     concat 拼接 比如两个数组的流 拼接成一个流
     distinct() 去除重复的数据

    获取处理后的结果方法(不能再链式操作了)
      forEach遍历
count()       返回long类型的
      max 获取最大的值 通过get方法获取值
      min  获取最小值
    
     重点 collect(告知收集什么样的集合 比如Collectors.toList()) 收集处理后的数据并以List集合接收
     收集到map会复杂一点 Collectors.toMap(()->{},()->{}) 第一个lamada代表key 第二个代表value
    
     数组收集 就调用toArray()就可以 想要收集指定对象类型的数组 比如 studetn[] xx =流对象.toArray(len-> new Student[len])


​    



  File 对文件本身操作

  IO 对文件内容读写

  File xx = new File('路径') 路径可以是绝对路径或者相对路径
  常见方法
    exists 文件是否存在
    isFile 是否文件
    isDirectory 是否文件夹
    lastModified 文件最后修改时间
    getPath 得到路径 可以是绝对也可以是相对
    getAbsolutePath 得到绝对路径
    createNewFile
    delete




ascii  英文数字占一个字节
gbk 包含汉字并且兼容acsii 英文数字一个字节 中文2个字节
Utf-8 英文数字占一个字节 中文占3个字节

编码 xxx.getBytes()
解码 new String(编码的内容)

io流 
   磁盘/网络。。   《=》  内存
  ![io流文件](C:\Users\96272\Pictures\Camera Roll\io流.png)


new FileInputStream('路径').read() 每次读取一个字节
readAllBytes()一次性读取文件所有内容

InputStream  is = new FileInputStream('d://x/x')
OutputStream  os= new FileOutputStream('d://xx/xx')

byte[] buff = new Byte(1024)
int len;
while(len = is.read(buff) !== -1){
  os.write(buff,0,len)
}

os.close()
io.close()
系统资源释放 try(这里写释放资源对象 比如流对象){}catch(){}
缓冲流 bufferedInputStream() 等等 性能更好

字符输入转换流 解决不同编码时字符读取出现编码的问题
   Reader  xx=  new InputStreamReader()

字符输出转换流 new  InputStreamWriter


打印流 效率高 应用:输出语句从控制台改变成其他地方
  PrintStream(字节打印流)
    println() 打印数据出去的方法
  PrintWriter(字符打印流)
    println() 打印数据出去的方法

    通过System.setOut(打印流对象) 可以让系统默认的打印流改成自己指定的位置


DataOutputStream 数据输出流(属于字节流)
    writeInt  writeBoolean 等等
   try(){

   }catch(Exception e){
    e.printStackTrace()
   }
DataInputOutputStream 数据输入流(属于字节流)
    readInt  readBoolean 等等

处理包装流
  对象序列化
    ObjectOutputStream 对象字节输出流 把java对象存储到某个文件
       writeObject 调用方法 对象如果需要序列化 需要该对象实现Serializable
        指定某个类中某个成员不需要序列化 可以给那个字段添加 一个tansient 修饰符
  对象反序列化
     ObjectInputStream 对象字节输入流 把某个文件的java对象读取到内存来
       readObject

IO框架 Commons-io
1. 需要下载  2.新建lib文件夹 把框架包复制进来 3. addlibaray 右键添加加入包

特殊文件  .txt .properties .xml
 .properties的文件  键值对存储 比如key=value key不能重复
    通过Properties集合操作 该文件的数据 方法有load加载文件到创建的Properties对象    getProperty得到key

    把propperties对象存数据 用setProperties方法 然后利用store来存到properties文件
    XML 扩展标记语言 是一提供种数据结构和内容的扩展语言 可通过不同库解析xml
       只能有一个根标签  文件后缀.xml  CDATA数据区来写特殊符号 比如<
       格式 <xxx> <yyy></yyy> </xxx> x和y可以是任意单词
   解析XML 提供的框架 Dom4j 用法看文档 SAXReader对象解析XML


日志文件 使用框架 Logback

线程
  3种创建方式
    1. 继承 Thread
    2. 实现 Runnable接口
    3. Callable接口 主要是处理之后有返回值 getValue FeatureTask创建对象 

 创建方法 实例方法 join() sleep()   静态方法 Thread.currentThread
 线程安全问题
   1. 同步代码块 synchronized(同步锁 要唯一){}  静态方法的同步锁用类名.class  其他可用this
   2. 同步方法 加一个 synchronized的修饰符
   3. lock锁 实现类 ReentrantLock implements Lock   new ReentrantLock创建锁对象 方法 lock unclock
  线程通信 线程生命周期 线程池 ThreadPoolExacutor 创建的对象有exacute执行线程任务 线程处理任务队列的几个任务处理


  网络 intnetAddress
   UDP datagramSocket TCP scoket serverScoket

   junit 单元测试 @test

   反射 
     反向获取类字节码对象(xx(类名).class 或者 xxx(实例对象).getClass 或者 Class.forName(全类名)) 里面的 构造器 方法 属性
        获取字节码的类对象 再获取构造器对象 再调用newInastance调用构造器获取 类的实例对象
   注解
     自定义注解 class @interface xxx {String name(), int age() default 34 }  @xxx(name='ee')
  反向代理 Proxy 其实就是几个事情 可以抽离公用的事情交给代理完成 独有的交给自己完成


   Maven 下载 =》 配置 =》结合Idea配置 创建项目
  依赖构建管理 统一项目结构 生命周期构建(清空  编译 测试 打包 发布等)
    依赖构建管理 依赖传递(层层传递) .xml 配置文件进行配置 dependencies


组织名gruopId 域名倒写
