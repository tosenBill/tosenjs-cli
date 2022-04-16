/*
 * @Descripttion:
 * @TapdLink: https://XXX
 * @DesignsLink: https://XXX
 * @RelatedPersons: XXX[市场]、XXX[产品]、XXX[前端]、XXX[后端]、XXX[设计]
 * @version: 1.0.0
 * @Author: Shentong
 * @LastEditors: Shentong
 * @Date: 2022-01-20 16:34:50
 */
const program = require("commander");

const { create } = require("./create");
const { name, version } = require("../package.json");

const { chooseTemplete } = require("./inquirers");

program.name(name).version(version);
program
  .command("create <projectName>")
  .description("🚀 create an application~~")
  .option("-T, --template [template]", "输入使用的模板名字")
  .action(async (projectName, options) => {
    let template = options.template;
    projectName = projectName || "untitled";

    if (!template) {
      template = await chooseTemplete();
    }

    projectName && create(projectName, template);
  });

// program
//   .command("checkAll")
//   .description("查看所有的模板")
//   .action(function () {
//     const templateList = ["vue-default-template", "vue-default-template-ts"];
//     templateList.forEach((temp, index) => {
//       console.log(`(${index + 1})  ${temp}`);
//     });
//   });

program.on("command:*", (operands) => {
  console.error(`eerror: unknown command '${operands[0]}'`);
});

program.parse(process.argv);
