//1.随机获得a到b之间的任意整数。
function randomNum(a, b) {
    return Math.round(Math.random() * (b - a) + a);
}

//2.将一位数的数字补全成两位数。
function addZero(num) {
    return num > 9 ? num : '0' + num;
}

//3.获得任意样式的CSS属性
function getCssAttr(obj, attr) {
    if (window.getComputedStyle) {
        return getComputedStyle(obj)[attr];
    } else {
        return obj.currentStyle[attr];
    }
}




//5.缓冲运动
function buffermove(obj, json, fn) {
    clearInterval(obj.timer);
    var speed = 0;
    obj.timer = setInterval(function () {
        var flag = true;
        for (var attr in json) {
            //1.取当前值
            var cssvalue = null;
            if (attr === 'opacity') {
                cssvalue = Math.round(getCssAttr(obj, attr) * 100);
            } else {
                cssvalue = parseInt(getCssAttr(obj, attr));
            }
            //2.求速度
            speed = (json[attr] - cssvalue) / 10;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            //3.运动的判断
            if (cssvalue !== json[attr]) {
                if (attr === 'opacity') {
                    obj.style.opacity = (cssvalue + speed) / 100;
                    obj.style.filter = 'alpha(opacity=' + (cssvalue + speed) + ')';
                } else {
                    obj.style[attr] = cssvalue + speed + 'px';
                }
                flag = false;
            }
        }
        if (flag) {
            clearInterval(obj.timer);
            fn && typeof fn === 'function' && fn();
        }
    }, 1000 / 60);

}

//6.将对象拼接成字符串
function objToString(obj) {
    let arr = [];
    for (let attr in obj) {
        arr.push(attr + '=' + obj[attr]);
    }
    return arr.join('&');
}


// 7.封装ajax发送数据
function ajax(obj) {
    let ajax = new XMLHttpRequest();
    //1.请求方式(默认get)
    obj.type = obj.type || 'get';
    //2.接口地址：接口地址一定存在
    if (!obj.url) {
        throw new Error('接口地址不存在');
    }

    //3.数据类型(对象,字符串拼接)
    function objToString(obj) {
        let arr = [];
        for (let attr in obj) {
            arr.push(attr + '=' + obj[attr]);
        }
        return arr.join('&');
    }
    if (obj.data) { //数据存在
        if (typeof obj.data === 'object' && !Array.isArray(obj.data)) { //数据是object对象
            obj.data = objToString(obj.data);
        } else { //非对象
            obj.data = obj.data;
        }
    }

    //4.如果数据存在，同时get方式。
    if (obj.data && obj.type === 'get') {
        obj.url += '?' + obj.data;
    }

    //6.是否异步
    if (obj.async === 'false' || obj.async === false) {
        obj.async = false;
    } else {
        obj.async = true;
    }


    ajax.open(obj.type, obj.url, obj.async);


    //5.如果数据存在，请求方式是post。
    if (obj.data && obj.type === 'post') {
        ajax.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        ajax.send(obj.data);
    } else {
        ajax.send();
    }

    //7.异步情况
    if (obj.async) { //异步
        ajax.onreadystatechange = function () {
            if (ajax.readyState === 4) {
                if (ajax.status === 200) {
                    let apidata = ajax.responseText;
                    if (obj.dataType === 'json') {
                        apidata = JSON.parse(apidata)
                    }
                    //方法存在，类型为function 再执行方法
                    obj.success && typeof obj.success === 'function' && obj.success(apidata);
                } else {
                    obj.error && typeof obj.error === 'function' && obj.error('接口地址有误' + ajax.status);
                }
            }
        }
    } else { //同步
        obj.success && typeof obj.success === 'function' && obj.success(ajax.responseText);
    }
}


function addcookie(key, value, times) {

    if (times) {
        let d = new Date();
        d.setDate(d.getDate() + times);
        document.cookie = key + '=' + value + ';expires=' + d;
    } else {
        document.cookie = key + '=' + value;
    }

}


function getcookie(key) {
    let data = document.cookie;
    if (data.indexOf(key) !== -1) {
        let num = data.indexOf(key) + key.length + 1;
        return data.substring(num).split(';')[0];
    }

}


function delcookie(key) {
    let value = getcookie(key);
    if (value) {
        addcookie(key, '1', -1);
    } else {
        return '输入有误';
    }

}


// function ajax(obj) {
//     let promise = new Promise(function (resolve, reject) {
//         let ajax = new XMLHttpRequest();
//         obj.type = obj.type || 'get';
//         if (!obj.url) {
//             throw new Error('接口地址不存在');
//         }

//         function objToString(obj) {
//             let arr = [];
//             for (let attr in obj) {
//                 arr.push(attr + '=' + obj[attr]);
//             }
//             return arr.join('&');
//         }
//         if (obj.data) {
//             if (typeof obj.data === 'object' && !Array.isArray(obj.data)) {
//                 obj.data = objToString(obj.data);
//             } else {
//                 obj.data = obj.data;
//             }
//         }
//         if (obj.data && obj.type === 'get') {
//             obj.url += '?' + obj.data;
//         }
//         if (obj.async === 'false' || obj.async === false) {
//             obj.async = false;
//         } else {
//             obj.async = true;
//         }
//         ajax.open(obj.type, obj.url, obj.async);
//         if (obj.data && obj.type === 'post') {
//             ajax.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
//             ajax.send(obj.data);
//         } else {
//             ajax.send();
//         }
//         if (obj.async) {
//             ajax.onreadystatechange = function () {
//                 if (ajax.readyState === 4) {
//                     if (ajax.status === 200) {
//                         let apidata = ajax.responseText;
//                         if (obj.dataType === 'json') {
//                             apidata = JSON.parse(apidata)
//                         }
//                         resolve(apidata);
//                         //obj.success && typeof obj.success === 'function' && obj.success(apidata);
//                     } else {
//                         reject('接口地址有误' + ajax.status)
//                         //obj.error && typeof obj.error === 'function' && obj.error('接口地址有误' + ajax.status);
//                     }
//                 }
//             }
//         } else {
//             resolve(apidata);
//             //obj.success && typeof obj.success === 'function' && obj.success(ajax.responseText);
//         }
//     });

//     return promise;

// }