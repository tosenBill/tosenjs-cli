/*
 * @Descripttion:
 * @TapdLink: https://XXX
 * @DesignsLink: https://XXX
 * @RelatedPersons: XXX[市场]、XXX[产品]、XXX[前端]、XXX[后端]、XXX[设计]
 * @version: 1.0.0
 * @Author: Shentong
 * @LastEditors: Shentong
 * @Date: 2022-01-20 19:45:53
 */
const path = require("path");
const chalk = require("chalk");

const fs = require("fs");
// 将nodejs方法的标准写法method(xxx, (error) => {}),转换成promise写法。
const { promisify } = require("util");
let downloadGitRepo = require("download-git-repo");
const ora = require("ora");
const templateMap = require("./templateMap");

function download(repo, dest) {
  return promisify(downloadGitRepo)(repo, dest);
}

function isExistFolder(file) {
  return fs.existsSync(file);
}

function loading(fn, message) {
  return async (...args) => {
    const spinner = ora(message);
    spinner.start();
    const data = await fn(...args);
    spinner.succeed();
    return data;
  };
}

async function create(projectName, template) {
  console.log(
    chalk.rgb(135, 206, 250)("你选择的模板是：  "),
    chalk.bgRgb(255, 140, 0)(template)
  );

  const folderPath = path.resolve(process.cwd(), projectName);
  if (!isExistFolder(folderPath)) {
    const downloadUrl = templateMap.get(template); // templateMap是一个引入的自定义Map

    try {
      await loading(download, "模板下载中...")(downloadUrl, projectName);

      console.log(chalk.cyanBright("模板创建成功~"));
    } catch (error) {
      console.log("error---", error);
    }
  } else {
    console.error("当前目录下已存在", projectName);
  }
}

module.exports = { create };
