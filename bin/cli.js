#! /usr/bin/env node
// ↑不加这句话会报错！！
import { createRequire } from "module";
import { program } from 'commander'
import chalk from 'chalk'
import spawn from 'cross-spawn'
import figlet from 'figlet'

import createFn from '../lib/create.js'
const require = createRequire(import.meta.url);

program
  // 配置版本号信息
  .version(`v${require('../package.json').version}`)
  .usage('<command> [option]')

program
  .command('create <app-name>')
  .description('create a new project')
  // -f or --force 为强制创建，如果创建的目录存在则直接覆盖
  .option('-f, --force', 'overwrite target directory if it exist')
  .action((name, options) => {
    // 打印命令行输入的值
    // console.log("project name is " + chalk.green.bold(name));
    // console.log('name:', name, 'options:', options)
    createFn(name, options)
  })

// 配置 config 命令
program
  .command('config [value]')
  .description('inspect and modify the config')
  .option('-g, --get <path>', 'get value from option')
  .option('-s, --set <path> <value>')
  .option('-d, --delete <path>', 'delete option from config')
  .action((value, options) => {
    console.log(value, options)
  })

// 配置 ui 命令
program
  .command('ui')
  .description('start add open roc-cli ui')
  .option('-p, --port <port>', 'Port used for the UI Server')
  .action((option) => {
    console.log(option)
  })

// 完善帮助信息
program
  // 监听 --help 执行
  .on('--help', () => {
    // 使用 figlet 绘制 Logo
    console.log('\r\n' + figlet.textSync('woodii', {
      font: 'Ghost',
      horizontalLayout: 'default',
      verticalLayout: 'default',
      width: 68,
      whitespaceBreak: true
    }));

    // 新增说明信息
    console.log(`\r\nRun ${chalk.cyan(`zr <command> --help`)} for detailed usage of given command\r\n`)
  })




program.parse()


// // 定义需要按照的依赖
// const dependencies = ['vue', 'vuex', 'vue-router'];
// // 执行安装
// const child = spawn('npm', ['install', '-D'].concat(dependencies), {
//   stdio: 'inherit'
// });
// // 监听执行结果
// child.on('close', function (code) {
//   // 执行失败
//   if (code !== 0) {
//     console.log(chalk.red('Error occurred while installing dependencies!'));
//     process.exit(1);
//   }
//   // 执行成功
//   else {
//     console.log(chalk.cyan('Install finished'))
//   }
// })
// import * as pj from './package.json';
// console.log(pj)

// const packageInfo = await import('../../package.json')
