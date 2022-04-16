/*
 * @Descripttion:
 * @TapdLink: https://XXX
 * @DesignsLink: https://XXX
 * @RelatedPersons: XXX[市场]、XXX[产品]、XXX[前端]、XXX[后端]、XXX[设计]
 * @version: 1.0.0
 * @Author: Shentong
 * @LastEditors: Shentong
 * @Date: 2022-02-11 18:16:29
 */
const inquirer = require("inquirer");

const chooseTemplete = async () => {
  const promptList = [
    {
      type: "list",
      name: "template",
      message: "选择一个需要创建的工程化模板",
      choices: [
        {
          name: "vue-default (js版本的vue全家桶工程化模板)",
          value: "vue-template-default",
        },
        {
          name: "mini-program-taro (react小程序模板taro)",
          value: "mini-program-taro",
        },
      ],
    },
  ];

  const { template } = await inquirer.prompt(promptList);
  return template;
};

module.exports = { chooseTemplete };
