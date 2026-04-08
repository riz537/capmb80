const cds = require('@sap/cds');
const { data } = require('@sap/cds/lib/dbs/cds-deploy');
const { SELECT, UPDATE } = require('@sap/cds/lib/ql/cds-ql');


module.exports = class OrderMgmtService extends cds.ApplicationService { 
 init() {
const { Orders, OrderItems, Products } = this.entities(OrderMgmtService);
 
    this.after("PATCH",OrderItems.drafts,async(data,req)=>{
        console.log("Inside Pathc operation on OrderItems draft");
        const ID = data.ID;
        const draftItem = await SELECT.one.from(OrderItems.drafts).where({ID:ID});
        if(draftItem){
           var totalPrice = (draftItem.quantity || 0) * (draftItem.unitPrice || 0);
           if(draftItem.discount>0){
                 totalPrice = totalPrice - (totalPrice* draftItem.discount/100);
           }
           await UPDATE(OrderItems.drafts).set({totalPrice:totalPrice}).where({ID:ID});

           // caluculate the netprice 
           const allDraftItems = await SELECT.from(OrderItems.drafts).where({order_ID: draftItem.order_ID});
           console.log("after getting all order Items"); 
           var netPrice = 0;
           for(var i=0;i<allDraftItems.length;i++){
                  netPrice = netPrice +  Number(allDraftItems[i].totalPrice);
           }
           await UPDATE(Orders.drafts).set({netPrice:netPrice}).where({ID: draftItem.order_ID});
        }
    });
    this.after("DELETE",OrderItems.drafts,async(data,req)=>{
         console.log("inside after deltion of order Items");
         const order_ID = req.data.order_ID;
         const allDraftItems = await SELECT.from(OrderItems.drafts).where({order_ID: order_ID});
           console.log("after getting all order Items"); 
           var netPrice = 0;
           for(var i=0;i<allDraftItems.length;i++){
                  netPrice = netPrice +  Number(allDraftItems[i].totalPrice);
           }
           await UPDATE(Orders.drafts).set({netPrice:netPrice}).where({ID: order_ID});
    });

    this.before(['CREATE','UPDATE'],Orders,async req=>{
       console.log("inside before create or update of orders");
       const items = req.data.items || [];
       if(items.length === 0 ){
         req.error("Order can not be created without items");
       }else{
             for(const item of items){
                  console.log(item);
                  const productID = item.product_ID;
                  const product = await SELECT.one.from(Products).where({ID:productID});
                  const currentStock = product.stock;
                  const orderQty = item.quantity;
                  if(currentStock<orderQty){
                     req.error("Insufficient stock for the product "+productID+"-"+product.name);
                  }else{
                     await UPDATE(Products).set({stock:currentStock-orderQty}).where({ID:productID});
                  }

                 

             } 
       }


    });
    

  

  return super.init()
}}
