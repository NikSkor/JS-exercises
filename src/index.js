/* ДЗ 2 - работа с массивами и объеектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
    for (let i=0; i<array.length;i++) {
        fn(array[i], i, array);
    }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
    let arr=[];

    for (let i=0; i<array.length;i++) {
        arr[i]=fn(array[i], i, array);
    }

    return arr;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
    let initialValue = initial || array[0];
    let currentItem = 0;
    
    if (initialValue===array[0]) { 
        currentItem=1;
    }
    for (let i=currentItem; i<array.length;i++) {
        initialValue=fn(initialValue, array[i], i, array);
    }
    
    return initialValue;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
    let arr = Object.keys(obj);
    
    for (let i=0; i<arr.length;i++) {
        arr[i]=arr[i].toUpperCase();
    }
    
    return arr;

}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from=0, to) {
    let arr2=[];
    
    if (to===undefined) {
        to=array.length;
    }
    if (from<0) {
        from=array.length+from;
        if (from<0) {
            from=0;
        }
    }
    if (from>array.length) {
        from=array.length
    }
    if (to>array.length) {
        to=array.length;
    }
    if (to<0) {
        to=array.length+to;
    }
    for (let i=from; i<to; i++) {
        arr2.push(array[i]);
    }
    
    return arr2;
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {

    let proxy = new Proxy (obj, {
        set(obj, prop, value) {
            obj[prop] = value*value;
            
            return true;
        }
    })

    return proxy;
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
