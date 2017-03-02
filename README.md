## 用NodeJs写的CLI小型应用
### 功能
    1. 程序启动后，显示当前目录下的列表
    2. 选择某个文件时，程序需要显示该文件内容
    3. 通过终端提供交互给用户进行输入、输出
### 如何开始
    node index.js
    // 执行index文件以获得开始

### 实现步骤
    1. 创建模块
    2. 决定采用同步的fs还是异步的fs
    3. 实现输入输出
    4. 重构
    5. 使用fs进行文件交互
### 涉及fs接口
| API | 功能 | 
| --- | ---- |
| `readdir` | 读取目录内容，回调函数中第一个参数是 err 对象，另外一个参数是 files 数组 |
| `readFile` | 读取文件内容，回调函数中第一个参数是 err 对象，另外一个参数是 data 数组 |
| `stat` | 给出文件或者目录的元数据 |
| `stat.isDirectory()` | 判断元数据是否为文件夹（是否是一个目录） |
### 其他一些api
| API | 功能 | 
| --- | ---- |
| `process` | 全局对象，包含三个流对象：stdin stdout stderr |
| `process.stdin.resume()` | 等待输入 |
| `process.stdin.setEncoding()` | 设置流编码 |
| `process.stdout.write()` | 功能其实等同于console.log()，区别是process.stdout.write()不会换行 |
| `process.cwd()` | 获取当前工作目录 |
| `__dirname` | 获取执行文件时该文件在文件系统中所在的目录 |
| `Number()` | 转换为Number类型 |
### ANSI转义码
    可以在文本终端下控制格式、颜色以及其他输出选项
    * \033 表示转义序列的开始
    * [ 表示开始颜色设置
    * 90 表示前景色为亮灰色
    * m 表示颜色设置结束