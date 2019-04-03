interface String {
    replaceAll(findText: string, repText: string): String;
    format(arg: any): String;
    toLong(): number;
    isNullOrEmpty(): boolean;
}
String.prototype.replaceAll = function(
    findText: string,
    repText: string
): String {
    const regExp = new RegExp(findText, 'g');
    return this.replace(regExp, repText);
};

//用法: 'hello{0}'.format('world')；返回'hello world'
//
/*
用法:
var template1='我是{0}，今年{1}了';
var template2='我是{name}，今年{age}了';
var result1=template1.format('loogn',22);
var result2=template1.format({name:'loogn',age:22});
*/
String.prototype.format = function(args): String {
    if (arguments.length > 0) {
        let result = this;
        if (arguments.length === 1 && typeof args === 'object') {
            for (var key in args) {
                var reg = new RegExp('({' + key + '})', 'g');
                result = result.replace(reg, args[key]);
            }
        } else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] === undefined) {
                    return '';
                } else {
                    var reg1 = new RegExp('({[' + i + ']})', 'g');
                    result = result.replace(reg1, arguments[i]);
                }
            }
        }
        return result;
    } else {
        return this;
    }
};

String.prototype.toLong = function() {
    const Long = require('long');
    return Long.fromString(this, true);
};
/**
 * 判定是否为空指针
 */
String.prototype.isNullOrEmpty = function() {
    return this === '' || this === null || this === undefined;
};
