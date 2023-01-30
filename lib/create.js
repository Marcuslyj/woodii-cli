import fs from 'fs-extra'
import inquirer from 'inquirer'
import path from 'path'
import ora from 'ora'
import Generator from './generator.js'

export default async function create(name, options) {
  // 当前命令行选择的目录
  const cwd = process.cwd();
  // 需要创建的目录地址
  const targetAir = path.join(cwd, name)

  // 目录是否已经存在？
  if (fs.existsSync(targetAir)) {
    // 是否为强制创建？
    if (options.force) {
      await fs.remove(targetAir)
    } else {
      // TODO：询问用户是否确定要覆盖
      // 询问用户是否确定要覆盖
      let { action } = await inquirer.prompt([
        {
          name: 'action',
          type: 'list',
          message: 'Target directory already exists Pick an action:',
          choices: [
            {
              name: 'Overwrite',
              value: 'overwrite'
            }, {
              name: 'Cancel',
              value: false
            }
          ]
        }
      ])
      if (!action) {
        return;
      } else if (action === 'overwrite') {
        // 移除已存在的目录
        // console.log(`\r\nRemoving...`)
        const spinner = ora('removing...').start()
        await fs.remove(targetAir)
        spinner.stop()
      }
    }
  }

  // 创建项目
  const generator = new Generator(name, targetAir);
  // 开始创建项目
  generator.create()
}