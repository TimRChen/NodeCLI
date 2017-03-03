/**
 * @file select file or directory and check content CLI by NodeJs
 * @author <huangjiandong>
 */

const fs = require('fs');
const stdout = process.stdout;
const stdin = process.stdin;

fs.readdir(process.cwd(), function (err, files) {
    console.log('');
 
    if (!files.length) {
         return console.log('   \033[31m No files to show!\033[39m\n');  
    }

    console.log('   Select which file or directory you want to see.\n');

    // 用于存储stat对象，以便调用isDirectory()方法
    let stats = [];
    let file = i => {
        let filename = files[i];
        // 定义每个文件的路径
        const pathname = __dirname + '/' + filename;
        // 读取文件元数据
        fs.stat(pathname, function (err, stat) {
            stats[i] = stat;
            if (stat.isDirectory()) {
                console.log('       \033[32m' + i + '\033[30m' + '  \033[36m' + filename + '/\033[30m');
            } else {
                console.log('       \033[32m' + i + '\033[30m' + '  \033[90m' + filename + '\033[30m');
            }

            if (++i === files.length) {
                read();
            } else {
                file(i);
            }            
        });

        // 用户输入行为
        let read = () => {
            console.log('');
            stdout.write('   \033[33mEnter your choice: \033[39m');
            stdin.resume();
            stdin.on('data', option);
        };

        // 监听用户输入行为后作出响应
        let option = inputData => {
            // 确保文件路径为输入对应的
            let filename = files[Number(inputData)];
            if (!filename) {
                // 说明输入的不是数字
                stdout.write('   \033[31mEnter your choice: \033[39m');
                stdin.resume();
            } else {
                if (stats[Number(inputData)].isDirectory()) {
                    fs.readdir(__dirname + '/' + filename, function (err, files) {
                        console.log('');
                        console.log('   (' + files.length + ' files)');
                        files.forEach(function (file) {
                            console.log('    -  ' + file);
                        });
                    });
                } else {
                    fs.readFile(__dirname + '/' + filename, 'utf8', function (err, data) {
                        console.log('');
                        console.log('\033[90m' + data.replace(/(.*)/g, '    $1') + '\033[39m');
                    });
                }
            }
        };
    };
    file(0);
});


