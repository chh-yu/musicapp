/**
 * 拓展对象
 * 浅拷贝与深拷贝
 */
function extend() {
    var aLength = arguments.length;
    var options = arguments[0];
    var target = {};
    var copy;
    var i = 1;
    if (typeof options === "boolean" && options === true) {
        //深拷贝 (仅递归处理对象)
        for (; i < aLength; i++) {
            if ((options = arguments[i]) != null) {
                if (typeof options !== 'object') {
                    return options;
                }
                for (var name in options) {
                    copy = options[name];
                    if (target === copy) {
                        continue;
                    }
                    target[name] = extend(true, options[name]);
                }
            }
        }
    } else {
        //浅拷贝
        target = options;
        if (aLength === i) {
            target = this;
            i--;
        } //如果是只有一个参数，拓展功能 如果两个以上参数，将后续对象加入到第一个对象
        for (; i < aLength; i++) {
            options = arguments[i];
            for (var name in options) {
                target[name] = options[name];
            }
        }
    }
    return target;
}
/* 类型判读 */
function typejudge(i){
    if(i == null) return "null"
    if(i == undefined) return "undefined"
    if(typeof i != 'object'){
        return typeof i
    }
    if(i instanceof Array) return "Array"
    if(i instanceof Function) return "Function"
    return "Object"
}
/* 对一个节点判断所有父节点里有无目标节点 */
function judgeparentnode(child, parent){

}
export {
    extend,
    typejudge
}
