module.exports = function(oldCart){
    //详细的物品, 或运算防止第一次添加购物车出现总量不正确
    this.items = oldCart.items || {};
    //总的数量
    this.totalQty = oldCart.totalQty || 0;
    //总的价格
    this.totalPrice = oldCart.totalPrice || 0;
    //判断加入的的哪个层级
    this.add = function(item, id){
      //新加入的物品, 判断是否已经存在原有的购物车之中
        var storeItem = this.items[id];
        if (!storeItem) {
            storeItem = this.items[id] = {item: item, qty: 0, price: 0};
        }
        storeItem.qty++;
        storeItem.price = storeItem.qty * storeItem.item.price;
        //总的数量与金额
        this.totalQty++;
        // this.totalPrice += storeItem.price;
        this.totalPrice += storeItem.item.price;
    };

    this.reduceByOne = function(id) {
        this.items[id].qty--;
        this.items[id].price -= this.items[id].item.price;

        this.totalQty--;
        this.totalPrice -= this.items[id].item.price;

        if (this.items[id].qty <= 0) {
            delete this.items[id];
        }

    }


    this.removeItem = function(id){
        this.totalQty -= this.items[id].qty;
        this.totalPrice -= this.items[id].price;
        delete this.items[id];
    }


    this.generateArray = function(){
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };
}

/*  数据格式如下

{ items:
{ '58aa8dd8c0f64d4ff0ed2ca0': { item: [Object], qty: 2, price: 18 },
'58aa8dd8c0f64d4ff0ed2c9f': { item: [Object], qty: 3, price: 27 },
'58aa8dd8c0f64d4ff0ed2c9e': { item: [Object], qty: 1, price: 9.4 },
'58aa8dd8c0f64d4ff0ed2caa': { item: [Object], qty: 1, price: 8 } },
totalQty: 7,
totalPrice: 62.4,
add: [Function],
generateArray: [Function] }

*/


//初始写法--2

// module.exports = function(oldCart){
//     //详细的物品
//     this.items = oldCart.items;
//     //总的数量
//     this.totalQty = oldCart.totalQty;
//     //总的价格
//     this.totalPrice = oldCart.totalPrice;
//     //判断加入的的哪个层级
//     this.add = function(item, id){
//       //新加入的物品, 判断是否已经存在原有的购物车之中
//         var storeItem = this.items[id];
//         if (!storeItem) {
//             storeItem = this.items[id] = {item: item, qty: 0, price: 0};
//         }
//         storeItem.qty++;
//         storeItem.price = storeItem.qty * storeItem.item.price;
//         //总的数量与金额
//         this.totalQty++;
//         this.totalPrice += storeItem.price;
//     };
//
//     this.generateArray = function(){
//         var arr = [];
//         for (var id in this.items) {
//             arr.push(this.items[id]);
//         }
//         return arr;
//     };
//
// }






//初始写法--1

// module.exports = function(initItems){
//     //详细的物品
//     this.items = initItems;
//     //总的数量
//     this.totalQty = 0;
//     //总的价格
//     this.totalPrice = 0;
//     //判断加入的的哪个层级
//     this.add = function(item, id){
//       //新加入的物品, 判断是否已经存在原有的购物车之中
//         var storeItem = this.items[id];
//         if (!storeItem) {
//             storeItem = this.items[id] = {item: item, qty: 0, price: 0};
//         }
//         storeItem.qty++;
//         storeItem.price = storeItem.qty * storeItem.item.price;
//
//         this.totalQty++;
//         this.totalPrice += storeItem.price;
//     }
//
// }
