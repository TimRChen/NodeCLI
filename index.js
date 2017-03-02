/**
 * @file command-file CLI 
 * @author <huangjiandong>
 */

const fs = require('fs');
const stdin = process.stdin;
const stdout = process.stdout;

fs.readdir(process.cwd(), function (err, files) {
    console.log('');
    // console 的作用是为了换行，使用户界面友好
    if (!files.length) {
        return console.log('    \033[31m No files to show!\033[39m\n');
    }

    console.log('   Select which file or directory you want to see\n');

    let stats = [];
    let file = i => {
        let filename = files[i];        

        // fs.stat 会给出文件或者目录的元数据
        fs.stat(__dirname + '/' + filename, function (err, stat) {
            stats[i] = stat;
            //  stat.isDirectory() 可以判断路径所代表的是文件夹还是文件
            if (stat.isDirectory()) {
                console.log('   ' + i + '   \033[36m' + filename + '\033[39m');
            } else {
                console.log('   ' + i + '   \033[90m' + filename + '\033[39m');
            }

            i++;
            if (i === files.length) {
                read();
            } else {
                file(i);
            }
        });

        // read user input when files are shown
        let read = () => {
            console.log('');
            stdout.write('  \033[33mEnter your choice: \033[39m');
            // 等待用户输入
            stdin.resume();
            stdin.setEncoding('utf8');

            // 开始监听data事件
            stdin.on('data', option);
        };

        // called with the option supplied by the user
        let option = data => {
            let filename = files[Number(data)];
            //  检查用户的输入是否匹配files数组中的下标
            if (stats[Number(data)].isDirectory()) {
                fs.readdir(__dirname + '/' + filename, function (err, files) {
                    console.log('');
                    console.log('   (' + files.length + ' files)');
                    files.forEach(function (file) {
                        console.log('   -  ' + file);
                    });
                    console.log('');
                });
            } else {
                //  读取用户文件，并指定编码
                fs.readFile(__dirname + '/' + filename, 'utf8', function (err, data) {
                    console.log('');
                    //  正则表达式作用为辅助缩进
                    console.log('\033[90m' + data.replace(/(.*)/g, '    $1') + '\033[39m');
                });
            }
        };
    };
    file(0);
});
