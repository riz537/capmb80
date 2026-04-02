const cds = require('@sap/cds');
const { INSERT } = require('@sap/cds/lib/ql/cds-ql');

module.exports = class ProductsMgmtService extends cds.ApplicationService { 
 init() {
const { Products } = this.entities(ProductsMgmtService);
 
  this.on('CREATE',Products, async req=>{
     await INSERT.into(Products).entries(req.data);
  });



  return super.init()
}}
