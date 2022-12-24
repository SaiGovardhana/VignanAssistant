process.env.resourceDir=process.cwd()+'/resources/'
const { RetrieveDocument } = require("../main/Services/DocumentService.js/RetrieveDocument");

console.log(RetrieveDocument('bda one'));