sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"com/demo/ordermgmtui/test/integration/pages/OrdersList",
	"com/demo/ordermgmtui/test/integration/pages/OrdersObjectPage",
	"com/demo/ordermgmtui/test/integration/pages/OrderItemsObjectPage"
], function (JourneyRunner, OrdersList, OrdersObjectPage, OrderItemsObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('com/demo/ordermgmtui') + '/test/flp.html#app-preview',
        pages: {
			onTheOrdersList: OrdersList,
			onTheOrdersObjectPage: OrdersObjectPage,
			onTheOrderItemsObjectPage: OrderItemsObjectPage
        },
        async: true
    });

    return runner;
});

