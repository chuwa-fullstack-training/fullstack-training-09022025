/*
* Copy the enumerable properties of p to o, and return o.
* If o and p have a property by the same name, o's property is overwritten.
* This function does not handle getters and setters or copy attributes.
*/

//看到 enumerable 想到 for... in, Object.keys(),Object.values(),Object.entries()
//把p的属性copy到o
//extend的逻辑：把p的pair copy到o,如果p的key o也有，还是用p的值，也就是后者的值
function extend(o, p) {
    for(const k in p){
      o[k] = p[k];
    }
    return o;
}

/*
* Return a new object that holds the properties of both o and p.
* If o and p have properties by the same name, the values from o are used.（use value from o）
* 注意这里是return new object，不改变原来的object
* 延用上面的extend公式，新建一个empty object，用extend({},p)得到一个拷贝p prop的object，可以说是z, 
  那么再套一层就是extend(z,o), z是后来的，所以要听o的，完美满足条件
*/ //要记得 /* + */才可以让comment结束

function union(o, p) {
    extend(extend({},p),o);
}


/*注意，restrict和intersection非常像，但不是一个东西，因为restrict 会改变原有的o，但是intersection 会创建一个新object
  delete o[k] = 删除整个 property（key + value）
* Remove properties from o if there is not a property with the same name in p.
* Return o.
*/
function restrict(o, p) {
    for (const k in o){
      if(!k in p){
        delete o[k];
      }
    }
    return o;
}

/*
* Return a new object that holds only the properties of o that also appear
* in p. This is something like the intersection of o and p, but the values of
* the properties in p are discarded
  注意最后一句是properties in p are discarded,证明最后只取o的值
*/
function intersection(o, p) {
    // create a new object, if 在p的 key 也在o, 就把这个entry存进去new object
    const r = {};
    for ( const k in o){
      if(k in p){
        r[k] = o[k];
      }
    }
    return r;
}