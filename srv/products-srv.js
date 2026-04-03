const cds = require('@sap/cds');
const { data } = require('@sap/cds/lib/dbs/cds-deploy');
const { INSERT } = require('@sap/cds/lib/ql/cds-ql');

module.exports = class ProductsMgmtService extends cds.ApplicationService { 
 init() {
const { Products } = this.entities(ProductsMgmtService);
 
  // this.on('CREATE',Products, async req=>{
  //   let result =  await INSERT.into(Products).entries(req.data);
  //   console.log(result);
  // });

  this.before("CREATE",Products, async req=>{
    console.log("inside before handler on create prodcuts");
    if(req.data.discount === null){
       req.data.discount = 0;
    }
  });

  // this.after("READ",Products,async(data,req)=>{
  //   console.log("inside after handler for read on products");
  //   for(let i=0;i<data.length;i++){
  //         let  priceAfterdDiscount = data[i].price - (data[i].price*data[i].discount)/100;
  //         data[i].discount = data[i].discount + "("+priceAfterdDiscount+")";

       
  //   }
  // });







  return super.init()
}}
