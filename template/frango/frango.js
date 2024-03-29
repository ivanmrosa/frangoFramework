function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}


Function.prototype.clone = function () {
    var that = this;
    var temp = function temporary() { return that.apply(this, arguments); };
    for (var key in this) {
        if (this.hasOwnProperty(key)) {
            temp[key] = this[key];
        }
    }
    return temp;
};

function Polyfill(scope) {


    if (!Array.prototype.findIndex) {
        Array.prototype.findIndex = function (predicate) {
            if (this === null) {
                throw new TypeError('Array.prototype.findIndex called on null or undefined');
            }
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }
            var list = Object(this);
            var length = list.length >>> 0;
            var thisArg = arguments[1];
            var value;

            for (var i = 0; i < length; i++) {
                value = list[i];
                if (predicate.call(thisArg, value, i, list)) {
                    return i;
                }
            }
            return -1;
        };
    }
    if (!Array.prototype.find) {
        Array.prototype.find = function (predicate) {
            if (this === null) {
                throw new TypeError('Array.prototype.find called on null or undefined');
            }
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }
            var list = Object(this);
            var length = list.length >>> 0;
            var thisArg = arguments[1];
            var value;

            for (var i = 0; i < length; i++) {
                value = list[i];
                if (predicate.call(thisArg, value, i, list)) {
                    return value;
                }
            }
            return undefined;
        };
    }
    if (!Array.prototype.map) {

        Array.prototype.map = function (callback, thisArg) {

            var T, A, k;

            if (this == null) {
                throw new TypeError(' this is null or not defined');
            }

            //  1. Let O be the result of calling ToObject passing the |this| 
            //    value as the argument.
            var O = Object(this);

            // 2. Let lenValue be the result of calling the Get internal 
            //    method of O with the argument "length".
            // 3. Let len be ToUint32(lenValue).
            var len = O.length >>> 0;

            // 4. If IsCallable(callback) is false, throw a TypeError exception.
            // See: http://es5.github.com/#x9.11
            if (typeof callback !== 'function') {
                throw new TypeError(callback + ' is not a function');
            }

            // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
            if (arguments.length > 1) {
                T = thisArg;
            }

            // 6. Let A be a new array created as if by the expression new Array(len) 
            //    where Array is the standard built-in constructor with that name and 
            //    len is the value of len.
            A = new Array(len);

            // 7. Let k be 0
            k = 0;

            // 8. Repeat, while k < len
            while (k < len) {

                var kValue, mappedValue;

                // a. Let Pk be ToString(k).
                //   This is implicit for LHS operands of the in operator
                // b. Let kPresent be the result of calling the HasProperty internal 
                //    method of O with argument Pk.
                //   This step can be combined with c
                // c. If kPresent is true, then
                if (k in O) {

                    // i. Let kValue be the result of calling the Get internal 
                    //    method of O with argument Pk.
                    kValue = O[k];

                    // ii. Let mappedValue be the result of calling the Call internal 
                    //     method of callback with T as the this value and argument 
                    //     list containing kValue, k, and O.
                    mappedValue = callback.call(T, kValue, k, O);

                    // iii. Call the DefineOwnProperty internal method of A with arguments
                    // Pk, Property Descriptor
                    // { Value: mappedValue,
                    //   Writable: true,
                    //   Enumerable: true,
                    //   Configurable: true },
                    // and false.

                    // In browsers that support Object.defineProperty, use the following:
                    // Object.defineProperty(A, k, {
                    //   value: mappedValue,
                    //   writable: true,
                    //   enumerable: true,
                    //   configurable: true
                    // });

                    // For best browser support, use the following:
                    A[k] = mappedValue;
                }
                // d. Increase k by 1.
                k++;
            }

            // 9. return A
            return A;
        };
    }

    if (!Array.isArray) {
        Array.isArray = function (arg) {
            return Object.prototype.toString.call(arg) === '[object Array]';
        };
    }

    if (!Object.assign) {
        Object.defineProperty(Object, 'assign', {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (target) {
                'use strict';
                if (target === undefined || target === null) {
                    throw new TypeError('Cannot convert first argument to object');
                }

                var to = Object(target);
                for (var i = 1; i < arguments.length; i++) {
                    var nextSource = arguments[i];
                    if (nextSource === undefined || nextSource === null) {
                        continue;
                    }
                    nextSource = Object(nextSource);

                    var keysArray = Object.keys(Object(nextSource));
                    for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
                        var nextKey = keysArray[nextIndex];
                        var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                        if (desc !== undefined && desc.enumerable) {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }
                return to;
            }
        });
    }
} (this);



//cria a funcionalidade icontains no JQUERY
/*
jQuery.expr[":"].icontains = jQuery.expr.createPseudo(function(arg) {
    return function( elem ) {
        return jQuery(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
    };
}); */

//CRIA A BIBLIOTECA frango
var frango = {};


/*
 Format é uma função para evitar concatenação de strings. Passe o parâmetro %s onde se quer
 colocar um valor concatenado e eles serão substituidos pela lista informada.
 Parametros:
  - str : String onde quer se inserir o valor
  - list : Lista de strings que deverão substituir os parâmetros %s(na ordem)

*/


frango.cloneObject = function (obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
};

frango.inArray = function (array, value) {
    var isIn = function (element, index, arr) {
        return element === value;
    };

    return array.findIndex(isIn) > -1;
};

frango.isFunction = function (func) {
    return typeof func === 'function';
};

frango.completeString = function (str, completeWith, size, left) {
    var strLen = str.length;
    if (strLen >= size) {
        return str;
    }

    while (str.length < size) {
        if (left) {
            str = completeWith + str;
        } else {
            str = str + completeWith;
        }
    }
    return str;
};

frango.format = function (str, list) {
    var i = 0;
    var text = str;
    for (i = 0; i <= list.length - 1; i++) {
        text = text.replace("%s", list[i]);
    }
    return text;
};


frango.formatDate = function (date, format) {
    /*   Year:
        YYYY (eg 1997)
    Year and month:
        YYYY-MM (eg 1997-07)
    Complete date:
        YYYY-MM-DD (eg 1997-07-16)
    Complete date plus hours and minutes:
        YYYY-MM-DDThh:mmTZD (eg 1997-07-16T19:20+01:00)
    Complete date plus hours, minutes and seconds:
        YYYY-MM-DDThh:mm:ssTZD (eg 1997-07-16T19:20:30+01:00)
    Complete date plus hours, minutes, seconds and a decimal fraction of a
    second
        YYYY-MM-DDThh:mm:ss.sTZD (eg 1997-07-16T19:20:30.45+01:00)


    where:

        YYYY = four-digit year
        MM   = two-digit month (01=January, etc.)
        DD   = two-digit day of month (01 through 31)
        hh   = two digits of hour (00 through 23) (am/pm NOT allowed)
        mm   = two digits of minute (00 through 59)
        ss   = two digits of second (00 through 59)
        s    = one or more digits representing a decimal fraction of a second
        TZD  = time zone designator (Z or +hh:mm or -hh:mm)        
    */
    var formatedDate = format;
    var objectDate = new Date(date);
    var year = objectDate.getFullYear().toString();
    var month = frango.completeString((objectDate.getMonth() + 1).toString(), '0', 2, true);
    var day = frango.completeString((objectDate.getDate()).toString(), '0', 2, true);
    /*replace year*/
    formatedDate = frango.replace(frango.replace(formatedDate, 'YYYY', year, false), 'YY', year.substr(2, 2));
    /*replace month*/
    formatedDate = frango.replace(formatedDate, 'MM', month, false);
    /*replace day*/
    formatedDate = frango.replace(formatedDate, 'DD', day, false);
    return formatedDate;

};

frango.getExclusiveId = function () {
    var dt = new Date();
    return dt.getDate().toString() + dt.getMonth() +
        dt.getFullYear() + dt.getMinutes() + dt.getSeconds() + dt.getMilliseconds();
};


/************* utils methods*/

frango.createObject = function (proto) {

    function ctor() { }

    ctor.prototype = proto;

    return new ctor();

};

frango.makeChild = function (dad, constructor) {

    var soon = constructor || function () { };

    soon.prototype = frango.createObject(dad.prototype);

    soon.constructor = soon;

    return soon;

};


frango.hasClass = function (cl, element) {

    var clElement = element.getAttribute('class');

    if (!clElement) {

        return false;

    }

    var exp = frango.format('^(%s)\\s|^(%s)$|\\s(%s)\\s|\\s(%s)$', [cl.trim(), cl.trim(), cl.trim(),

    cl.trim()
    ]);

    var reg = new RegExp(exp);

    reg.ignoreCase = true;

    return reg.test(clElement.trim());

};

frango.removeClass = function (cl, element) {

    cls = element.getAttribute('class');

    if (!cls)
        return;

    var exp = frango.format('^(%s)\\s|^(%s)$|\\s(%s)\\s|\\s(%s)$', [cl.trim(), cl.trim(), cl.trim(),

    cl.trim()
    ]);

    var reg = new RegExp(exp, 'gi');

    element.setAttribute('class', cls.replace(reg, ' '));

};

frango.replace = function (str, strToReplace, strReplaceTo, wholeWordsOnly) {
    if (wholeWordsOnly) {
        strToReplace = '\\b' + strToReplace + '\\b';
    }
    var reg = new RegExp(strToReplace, 'gi');

    return str.replace(reg, strReplaceTo);

};

frango.replaceMany = function (str, listToReplace, strReplaceTo) {
    var result = str;
    for (var i = 0; i < listToReplace.length; i++) {
        result = frango.replace(result, listToReplace[i], strReplaceTo);
    }
    return result;
};

frango.addClass = function (cl, element) {

    cls = element.getAttribute('class');
    if (cls) {
        cls = cls.trim();
    }

    if (!frango.hasClass(cl, element)) {

        element.setAttribute('class', cls + ' ' + cl.trim());

    }

};

frango.addStyle = function (styleName, value, element) {
    element.style[styleName] = value;
};

frango.on = function (eventName, element, method) {
    element.addEventListener(eventName, function (event) {
        method.call(element, event);
    }, false);
};

frango.removeElement = function (element) {
    var parent = element.parentElement;

    if (parent) {
        parent.removeChild(element);
    }
};

frango.attr = function (element, attribute, value) {
    if (value == undefined || value == null) {
        return element ? element.getAttribute(attribute) : undefined;
    } else {
        if (element) element.setAttribute(attribute, value);
        return undefined;
    }
};


frango.setOffset = function (element, params) {
    if ('left' in params) {
        element.offsetLeft = params.left;
    }
    if ('top' in params) {
        element.offsetTop = params.top;
    }
    if ('with' in params) {
        element.offsetWidth = params.width;
    }
    if ('height' in params) {
        element.offsetHeight = params.height;
    }
};

frango.setHTML = function (element, html) {
    element.innerHTML = html;
};

frango.addHTML = function (element, position, html) {
    element.insertAdjacentHTML(position, html);
};

frango.setText = function (element, text) {
    element.innerText = text;
};

frango.loopElements = function (listOfElements, routine) {

    if (listOfElements) {

        for (var i = 0; i < listOfElements.length; i++) {

            listOfElements[i].hasClass = function (cl) {

                return frango.hasClass(cl, this);

            };

            listOfElements[i].rmCl = function (cl) {

                frango.removeClass(cl, this);

            };

            listOfElements[i].adCl = function (cl) {

                frango.addClass(cl, this);

            };

            listOfElements[i].find = function (selector) {
                return frango.find(selector, this);
            };

            listOfElements[i].adSty = function (styleName, value) {
                frango.addStyle(styleName, value, this);
            };

            listOfElements[i].attr = function (attribute, value) {
                /*if(value == undefined || value == null){
                  return this.getAttribute(attribute);
                }else{
                  this.setAttribute(attribute, value);                 
                  return undefined;
                }*/
                return frango.attr(this, attribute, value);
            };

            listOfElements[i].on = function (eventName, method) {
                frango.on(eventName, this, method);
            };

            listOfElements[i].offset = function (params) {
                frango.setOffset(this, params);
            };

            listOfElements[i].html = function (html) {
                if (html != undefined && html != null) {
                    frango.setHTML(this, html);
                } else {
                    return this.innerHTML;
                };
            };

            listOfElements[i].addHTMLBeforeBegin = function (html) {
                frango.addHTML(this, 'beforebegin', html);
            };

            listOfElements[i].addHTMLAfterBegin = function (html) {
                frango.addHTML(this, 'afterbegin', html);
            };
            listOfElements[i].addHTMLBeforeEnd = function (html) {
                frango.addHTML(this, 'beforeend', html);
            };
            listOfElements[i].addHTMLAfterEnd = function (html) {
                frango.addHTML(this, 'afterend', html);
            };

            listOfElements[i].textElement = function (text) {
                if (text != undefined && text != null) {
                    frango.setText(text);
                } else {
                    return this.innerText;
                }
            };
            routine.call(listOfElements[i]);
        }

    }

};

frango.find = function (selector, parent) {
    this.foundElements = [];
    this.doc = parent || document;
    if (typeof selector === "object") {
        this.foundElements = [selector];
    } else {
        if (selector) {
            try {
                this.foundElements = this.doc.querySelectorAll(selector);
            } catch (e) {
                console.log(e);
            }
        }
    }

    this.result = {};

    this.result.loop = function (routine) {
        frango.loopElements(this.elements, routine);
    };

    this.result.rmCl = function (class_name) {
        for (var i = 0; i <= this.elements.length - 1; i++) {
            frango.removeClass(class_name, this.elements[i]);
        }
    };
    this.result.adCl = function (class_name) {
        for (var i = 0; i <= this.elements.length - 1; i++) {
            frango.addClass(class_name, this.elements[i]);
        }
    };

    this.result.first = function () {
        return this.elements[0];
    };

    this.result.last = function () {
        return this.elements[this.elements.length - 1];
    };

    this.result.remove = function () {
        //var parent;
        for (var i = 0; i < this.elements.length; i++) {
            frango.removeElement(this.elements[i]);
            /* parent = this.elements[i].parentElement;
            if (parent) {
                parent.removeChild(this.elements[i]);
            };*/
        }
    };

    this.result.find = function (selector) {
        var allFound = [];
        var found = [];
        for (var i = 0; i < this.elements.length; i++) {
            found = /*frango.find(selector, this.elements[i])*/  this.elements[i].querySelectorAll(selector);
            if (found) {
                allFound = allFound.concat(Array.prototype.slice.call(found));
            }
        }
        //this.elements = allFound;
        var newFind = new frango.find();
        newFind.elements = allFound;
        return newFind;
    };

    this.result.adSty = function (styleName, value) {
        for (var i = 0; i < this.elements.length; i++) {
            frango.addStyle(styleName, value, this.elements[i]);
        }
    };

    this.result.on = function (eventName, method) {
        frango.loopElements(this.elements, function () {
            frango.on(eventName, this, method);
        });

        /*for (var i = 0; i < this.elements.length; i++) {
            
            frango.on(eventName, this.elements[i], method);
        };*/
    };

    this.result.offset = function (params) {
        for (var i = 0; i < this.elements.length; i++) {
            frango.setOffset(this.elements[i], params);
        }
    };

    this.result.attr = function (attribute, value) {
        if (value != undefined || value != null) {
            for (var i = 0; i < this.elements.length; i++) {
                frango.attr(this.elements[i], attribute, value);
            }
            return undefined;
        } else {
            return frango.attr(this.elements[0], attribute, value);
        }
    };

    this.result.html = function (html) {
        if (html) {
            for (var i = 0; i < this.elements.length; i++) {
                frango.setHTML(this.elements[i], html);
            }
        } else {
            return this.elements[0].innerHTML;
        }
    };
    this.result.addHTMLBeforeBegin = function (html) {
        for (var i = 0; i < this.elements.length; i++) {
            frango.addHTML(this.elements[i], 'beforebegin', html);
        }
    };

    this.result.addHTMLAfterBegin = function (html) {
        for (var i = 0; i < this.elements.length; i++) {
            frango.addHTML(this.elements[i], 'afterbegin', html);
        }
    };
    this.result.addHTMLBeforeEnd = function (html) {
        for (var i = 0; i < this.elements.length; i++) {
            frango.addHTML(this.elements[i], 'beforeend', html);
        }
    };
    this.result.addHTMLAfterEnd = function (html) {
        for (var i = 0; i < this.elements.length; i++) {
            frango.addHTML(this.elements[i], 'afterend', html);
        }
    };

    this.result.hasClass = function (cl) {
        var ele = this.elements[0];
        if (ele) {
            return frango.hasClass(cl, ele);
        } else {
            return ele;
        }
    };

    this.result.elements = this.foundElements;

    return this.result;

};

/*popus e dialogos*/
frango.popup = {};
frango.popup.opened = false;

frango.popup.openPopup = function (select, executeAfter) {
    ele = undefined;
    if (typeof select === "object") {
        ele = select;
    } else {
        ele = frango.find(select).first();
        if (!ele) {
            ele = frango.find("#" + select).first();
        }
    }

    if (ele) {
        if (frango.find(ele).attr('data-popup-configured') != 'yes' &&
            frango.find(ele).attr("data-automatically-close") != "no") {
            frango.find(ele).attr('data-popup-configured', 'yes');
            frango.find(ele).on('click', function (event) {
                var e = event || window.event;
                var target = e.target || e.srcElement;
                frango.find(target).loop(function () {
                    if (this.hasClass('popup')) {
                        frango.popup.closePopup(select, executeAfter);
                    }
                });
            });
        }

        frango.find(frango.find(ele).find('.popup-close').first()).on('click', function () {
            frango.popup.closePopup(select, executeAfter);
        });

        frango.removeClass('popup-hide', ele);
        frango.addClass('popup-show', ele);
    }
    frango.popup.opened = true;

};

frango.popup.closePopup = function (select, fnToExecuteAfter) {

    ele = undefined;
    if (typeof select === "object") {
        ele = select;
    } else {
        ele = frango.find(select).first();
        if (!ele) {
            ele = frango.find("#" + select).first();
        }
    }

    if (ele) {
        frango.removeClass('popup-show', ele);
        frango.addClass('popup-hide', ele);
    }

    frango.popup.opened = false;

    if (fnToExecuteAfter) {
        fnToExecuteAfter.call();
    }
};

frango.popup.removePopup = function (id_filter, fnToExecuteAfter) {
    var ele = frango.find("#" + id_filter).remove();
    if (fnToExecuteAfter) {
        fnToExecuteAfter.call();
    }
};

frango.warning = function (message, fnToExecuteAfter) {
    var html =
        '  <div class="popup-body popup-dlg small-radius bck-white">	' +
        '    <h2 class="red title">Aviso!</h2> <div class="text-center">' +
        message + '</div>' +
        '    <a id="vmsisMsgBtn" href="javascript:void(0)" class="btn btn-primary">OK</a>' +
        '  </div> ';

    var popupE = document.createElement('div');
    popupE.setAttribute('class', 'popup slow-hide');
    popupE.setAttribute('id', 'vmsisMsg');
    popupE.insertAdjacentHTML('beforeend', html);

    try {
        frango.find('body').first().appendChild(popupE);
    } catch (e) {
        console.log(e);
    }
    document.getElementById("vmsisMsgBtn").executeAfter = fnToExecuteAfter;
    document.getElementById("vmsisMsgBtn").addEventListener('click', function () {
        frango.popup.removePopup("vmsisMsg", this.executeAfter);
    });

    frango.popup.openPopup('vmsisMsg');
    frango.find('#vmsisMsgBtn').first().focus();
};

frango.confirm = function (message, executeIfTrue, executeIfFalse) {
    var html =
        '  <div class="popup-body popup-dlg">	' +
        '<div class="popup-title"> ' +
        '  <span class="title">Confirmação</span> ' +
        '</div> ' +
        '    <p><b><center> ' + message + ' </center></b> </p>' +
        '   <div> <a href="javascript:void(0)" id="vmsisMsgBtnYes" class="btn btn-primary">Sim</a> ' +
        '    <a href="javascript:void(0)" id="vmsisMsgBtnNo" class="btn btn-danger">Não</a> </div>' +
        '  </div> ';

    var popupE = document.createElement('div');
    popupE.setAttribute('class', 'popup slow-hide with-header');
    popupE.setAttribute('id', 'vmsisMsg');
    popupE.insertAdjacentHTML('beforeend', html);

    try {
        frango.find('body').first().appendChild(popupE);
    } catch (e) {
        console.log(e);
    }

    document.getElementById("vmsisMsgBtnYes").executeAfter = executeIfTrue;
    document.getElementById("vmsisMsgBtnNo").executeAfter = executeIfFalse;
    document.getElementById("vmsisMsgBtnYes").addEventListener('click', function () {
        frango.popup.removePopup("vmsisMsg", this.executeAfter);
    });
    document.getElementById("vmsisMsgBtnNo").addEventListener('click', function () {
        frango.popup.removePopup("vmsisMsg", this.executeAfter);
    });

    frango.popup.openPopup('vmsisMsg');
    frango.find('#vmsisMsgBtnNo').first().focus();
};

frango.controle_cliques = 0;

function hideMenu(e) {
    frango.controle_cliques = 0;
    var menuList = frango.find('.menu-content').first();
    var menuShow = frango.find('.menu').first();
    var content = frango.find('.menu-content > ul').first();
    var visible = frango.hasClass("menu-full", menuList);
    if (visible) {
        frango.controle_cliques = 1;
        frango.removeClass("menu-full", menuList);
        frango.removeClass("menu-full", menuShow);
        menuList.setAttribute("style", "height:0%");
        menuShow.setAttribute("style", "height:53px");
        content.setAttribute("style", "");
    }
}

function control_click(e) {
    if (frango.controle_cliques == 1) {
        frango.controle_cliques = 0;
        return false;
    }
    frango.find('.hide-scroll').rmCl('no-height');
    var menuList = frango.find('.menu-content').first();
    if (menuList) {
        var menuShow = frango.find('.menu').first();
        var visible = frango.hasClass("menu-full", menuList);
        var content = frango.find('.menu-content > ul').first();
        if (!visible) {
            frango.addClass("menu-full", menuList);
            frango.addClass("menu-full", menuShow);
            menuList.setAttribute("style", "display:table !important;");
            menuShow.setAttribute("style", "height:100%");
            content.setAttribute("style", "display:table");
            frango.escodermenu = true;
        }
    }
}


frango.loadMenu = function () {
    var menu = frango.find('.menu').first();
    if (menu) {
        var resize = function () {
            frango.controle_clicques = 0;
            var opened = frango.find('.menu .menu-content.menu-full').first();
            var btn = frango.find('.menu .mnu-button').first();

            btn.removeEventListener('click', control_click, true);
            document.removeEventListener('click', hideMenu);
            if (!opened) {
                btn.addEventListener('click', control_click, true);
                document.addEventListener('click', hideMenu, true);
            }
        };

        window.addEventListener('resize', resize);
        window.addEventListener('load', resize);
        resize();
    }

    frango.find('.menu ul li').loop(function () {
        this.addEventListener('click', function () {
            frango.find('.menu ul li').rmCl('active');
            this.setAttribute('class', this.getAttribute('class') + ' ' + 'active');
        }, true);
    });

};

frango.contextMenu = function (executeOnInitialize, idContext) {
    var context_id;
    if (idContext) {
        context_id = '#' + idContext;
    } else {
        context_id = "";
    }

    frango.find(context_id + ".contextmenu").loop(function () {
        var element = frango.find(this);
        element.adSty("display", "none");

        var parent = frango.find(element.attr("data-container"));
        if (parent.length == 0 && element.attr("data-container").substr(0, 1) != '#') {
            parent = frango.find("#" + element.attr("data-container"));
        }
        parent.attr('context-data-container', element.attr("data-container"));

        parent.on('contextmenu', function (e) {

            var all_context = frango.find(".contextmenu");
            all_context.offset({ left: 0, top: 0 });
            all_context.adSty("display", "none");
            //var ele = this;

            //var context = frango.find("[data-container='" + ele.attr("context-data-container") + "']");

            //element.offset({left:e.clientX, top:e.clientY});            
            element.adSty('left', e.clientX + "px");
            element.adSty('top', e.clientY + "px");
            element.adSty("display", "block");

            e.preventDefault();

        });
        frango.find(document).on('click', function (e) {
            if (e.button == 0) {
                var context = frango.find(".contextmenu");
                context.offset({ left: 0, top: 0 });
                context.adSty("display", "none");
            }
        });
        if (executeOnInitialize && typeof executeOnInitialize === 'function') {
            executeOnInitialize.call(element);
        }
    });
};

frango.showLocalImage = function (input, img) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            img.setAttribute('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
};

frango.canUploadFile = function () {
    if (navigator.userAgent.match(/(Android (1.0|1.1|1.5|1.6|2.0|2.1))|(Windows Phone (OS 7|8.0))|(XBLWP)|(ZuneWP)|(w(eb)?OSBrowser)|(webOS)|(Kindle\/(1.0|2.0|2.5|3.0))/) ||
        !(window.File && window.FileReader && window.FormData)
    ) {
        return false;
    }
    var elem = document.createElement('input');
    elem.type = 'file';
    return !elem.disabled;
};

frango.isMobileDevice = function () {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true;
    } else {
        return false;
    }
};

frango.wait = {};

frango.wait.start = function (parent) {
    var new_parent = parent || frango.find('body').first();
    var ele = document.createElement('div');
    ele.setAttribute('class', 'wait');
    var main = document.createElement('div');
    main.setAttribute('class', 'wait-body');
    main.appendChild(ele);
    new_parent.appendChild(main);
};

frango.wait.stop = function (parent, clearAll) {
    if (clearAll === true) {
        frango.find('.wait-body').remove();
    } else {
        var new_parent = parent || frango.find('body').first();
        var wait = frango.find('.wait-body', new_parent).first();
        if (wait) {
            new_parent.removeChild(wait);
        }
    }
};

frango.touch = {};

frango.touch.tab = {};


frango.touch.tab.oldX = 0;
frango.touch.tab.oldy = 0;
frango.touch.tab.startx = 0;
frango.touch.tab.starty = 0;
frango.touch.tab.scrolling = false;
frango.touch.tab.activePageControl = null;

frango.touch.tab.findElementUsignPageControlId = function (selector, pageControl) {
    var filterUsingPageControlId = '%s[data-pagecontrol-id="' + pageControl.dataset.pagecontrolId + '"]';
    return frango.find(frango.format(filterUsingPageControlId, [selector]));
};


frango.touch.tab.addSlowMoviment = function (tabBodies) {
    tabBodies.adCl('slow-vertical-moviment');
};
frango.touch.tab.removeSlowMoviment = function (tabBodies) {
    tabBodies.rmCl('slow-vertical-moviment');
};


frango.touch.tab.moveX = function (elementTouched, posX, locked, slowMove) {
    //var id = elementTouched.getAttribute('data-pagecontrol-id');
    var bodies = frango.touch.tab.findElementUsignPageControlId('.tab-body', elementTouched);//frango.find('.tab-body', elementTouched);
    var tot = bodies.elements.length;
    var leftLast = bodies.elements[tot - 1].offsetLeft;
    var leftFirst = bodies.elements[0].offsetLeft;
    var newLeft = 0;
    var movied = false;

    if (slowMove) {
        frango.touch.tab.addSlowMoviment(bodies);
    }

    bodies.loop(function () {        
        if (posX < frango.touch.tab.oldX) {

            //puxar para esquerda
            
            if (locked != 'left') {
                movied = true;
                if ((leftLast - (frango.touch.tab.oldX - posX) <= 0)) {
                    newLeft = (this.offsetLeft - leftLast);
                } else {
                    newLeft = (this.offsetLeft - (frango.touch.tab.oldX - posX));
                }

                if (this.getAttribute('data-index') == tot && newLeft <= 0) {
                    this.style.left = 0 + "px";
                    elementTouched.setAttribute('data-locked', 'left');
                } else {
                    this.style.left = newLeft + "px";
                    elementTouched.setAttribute('data-locked', 'not');
                }
            }
        } else if (posX > frango.touch.tab.oldX) {

            //puxar para a direita
            if (locked != 'right') {
                movied = true;
                if (leftFirst + (posX - frango.touch.tab.oldX) >= 0) {
                    newLeft = this.offsetLeft + Math.abs(leftFirst);
                } else {
                    newLeft = (this.offsetLeft + (posX - frango.touch.tab.oldX));
                }

                if (this.getAttribute('data-index') == 1 && newLeft >= 0) {
                    this.style.left = 0 + "px";
                    elementTouched.setAttribute('data-locked', 'right');
                } else {
                    this.style.left = newLeft + "px";
                    elementTouched.setAttribute('data-locked', 'not');
                }
            }
        }
    });

    return movied;

};

frango.touch.moveY = function (elementTouched, posY, locked, slowMove) {

};


frango.touch.tab.handleMoviment = function (event) {

    var elementTouched = frango.touch.tab.activePageControl;
    if(!elementTouched) elementTouched = this;
    var touches = event.changedTouches;

    if (frango.touch.tab.scrolling == false) {

        var locked = elementTouched.getAttribute('data-locked');
        frango.touch.tab.moveX(elementTouched, touches[0].pageX, locked, false);
    }
    frango.touch.tab.oldX = touches[0].pageX;
    frango.touch.tab.oldy = touches[0].pageY;


};

frango.touch.tab.startTouch = function (event) {
    //event.preventDefault();
    var touches = event.changedTouches;
    var elementTouched = frango.touch.tab.activePageControl;//this;
    if(!elementTouched) elementTouched = this;
    frango.touch.tab.oldX = touches[0].pageX;
    frango.touch.tab.oldy = touches[0].pageY;
    frango.touch.tab.startx = touches[0].pageX;
    frango.touch.tab.starty = touches[0].pageY;
    frango.touch.tab.removeSlowMoviment(frango.touch.tab.findElementUsignPageControlId('.tab-body', elementTouched));        
};

frango.touch.tab.endTouch = function (event) {
    //event.preventDefault();
    var elementTouched = frango.touch.tab.activePageControl;
    if(!elementTouched) elementTouched = this;
    var width = elementTouched.offsetWidth;
    var bodies = frango.touch.tab.findElementUsignPageControlId('.tab-body', elementTouched);
    var movedEnough = false;
    var locked = elementTouched.getAttribute('data-locked');
    var is_offset_bigger_than_0 = false;


    if (frango.touch.tab.oldX > frango.touch.tab.startx) {
        //puxada para a direita

        bodies.loop(function () {
            is_offset_bigger_than_0 = this.offsetLeft > 0;
            if ((is_offset_bigger_than_0) && (this.offsetLeft >= width * 0.30) && (!movedEnough)) {
                frango.touch.tab.oldX = this.offsetLeft;
                frango.touch.tab.moveX(elementTouched, width, locked, true);
                movedEnough = true;
                if (locked != 'right') {
                    frango.touch.tab.findElementUsignPageControlId('.tab-body', elementTouched).rmCl('active');
                    frango.touch.tab.findElementUsignPageControlId('.tab', elementTouched).rmCl('active');

                    var activeBody = bodies.elements[this.getAttribute('data-index') - 2];
                    frango.addClass('active', activeBody);

                    frango.find('[data-body=' + activeBody.getAttribute('name') + "]").adCl('active');
                }
            }
        });
        if (!movedEnough && locked != 'right' && is_offset_bigger_than_0) {
            frango.touch.tab.moveX(elementTouched, frango.touch.tab.startx, locked, true);
        }
    } else if (frango.touch.tab.oldX < frango.touch.tab.startx) {
        //puxada para a esquerda

        bodies.loop(function () {
            is_offset_bigger_than_0 = this.offsetLeft > 0;
            if ((is_offset_bigger_than_0) && (this.offsetLeft <= width * 0.70) && (!movedEnough)) {
                frango.touch.tab.oldX = this.offsetLeft;
                frango.touch.tab.moveX(elementTouched, 0, locked, true);
                movedEnough = true;
                if (locked != 'left') {
                    frango.touch.tab.findElementUsignPageControlId('.tab-body', elementTouched).rmCl('active');
                    frango.touch.tab.findElementUsignPageControlId('.tab', elementTouched).rmCl('active');
                    frango.addClass('active', this);
                    frango.find('[data-body=' + this.getAttribute('name') + "]").adCl('active');
                }
            }
        });
        if (!movedEnough && locked != 'left' && is_offset_bigger_than_0) {
            frango.touch.tab.moveX(elementTouched, frango.touch.tab.startx, locked, true);
        }
    }


    frango.touch.tab.oldX = 0;
    frango.touch.tab.oldy = 0;

};

frango.touch.tab.config = function (tabBodyGroup) {
    if (!frango.isMobileDevice()) {
        return;
    }
    var pageControlId = tabBodyGroup.first().dataset.pagecontrolId;
    tabBodyGroup.on("touchmove", frango.touch.tab.handleMoviment);
    tabBodyGroup.on("touchstart", frango.touch.tab.startTouch);
    tabBodyGroup.on("touchend", frango.touch.tab.endTouch);

    var checkScrolling = function () {
        var idIntervalScrolling = setInterval(function () {
            clearInterval(idIntervalScrolling);
            frango.touch.tab.scrolling = false;
        }, 1000);
    };

    frango.find(frango.format('.tab-body[data-pagecontrol-id="%s"]', [pageControlId])).on('scroll', function () {
        frango.touch.tab.scrolling = true;
        checkScrolling();
    });
};


frango.tab = function (selector, touchEnabled) {
    var findElementUsignPageControlId = function (selector, pageControl) {
        return frango.touch.tab.findElementUsignPageControlId(selector, pageControl);
    };
    var setTabsInitialSize = function (pageControl, tabWidth, tabBodies, pageControlWidth, resizing) {


        findElementUsignPageControlId('.tab-group', pageControl).adSty('width', pageControlWidth + "px");
        //pageControl.find(frango.format (filterUsingPageControlId, ['.tab-group'])).adSty('width', pageControlWidth + "px");
        //pageControl.find('.tab').adSty('min-width', tabWidth + "px");
        //pageControl.find(frango.format(filterUsingPageControlId, ['.tab-body-group'])).adSty('width', pageControlWidth + "px");
        findElementUsignPageControlId('.tab-body-group', pageControl).adSty('width', pageControlWidth + "px");
        var index = 0;
        var activeIndex = findElementUsignPageControlId('.tab-body.active', pageControl).attr('data-index');
        //pageControl.find('.tab-body.active').first().getAttribute('data-index');
        if (!activeIndex) {
            activeIndex = 1;
        }
        tabBodies.loop(function () {            
            index += 1;
            if (!resizing) {
                this.setAttribute('data-index', index);
                var left = (pageControlWidth * (index - 1) + "px");
                this.adSty('left', left);
                this.adSty('width', pageControlWidth + "px");
            } else {
                this.adSty('width', pageControlWidth + "px");
                this.adSty('left', ((index - activeIndex) * pageControlWidth) + "px");
            }
        });
    };

    var configureClick = function (pageControl, tabBodies, tabs) {
        tabs.on('click', function () {
            var pageControlWidth = pageControl.offsetWidth;
            frango.touch.tab.addSlowMoviment(tabBodies);
            var tab = frango.find(this);
            var newActiveBody = pageControl.find('[name="' + tab.attr('data-body') + '"]');
            var newActiveIndex = newActiveBody.attr('data-index');
            var oldActiveIndex = findElementUsignPageControlId('.tab-body.active', pageControl).attr('data-index');
            //pageControl.find('.tab-body.active').attr('data-index');
            findElementUsignPageControlId('.tab-body', pageControl).rmCl('active');
            //pageControl.find('.tab-body').rmCl('active');
            findElementUsignPageControlId('.tab.active', pageControl).rmCl('active');
            //pageControl.find('.tab.active').rmCl('active');
            tab.adCl('active');
            newActiveBody.adCl('active');

            var index = 0;
            if (newActiveIndex > oldActiveIndex) {
                //puxar para a esquerda
                tabBodies.loop(function () {
                    index += 1;
                    var left = this.offsetLeft;
                    left = left - (pageControlWidth * (newActiveIndex - oldActiveIndex));
                    this.adSty('left', left + "px");
                });
            } else if (newActiveIndex < oldActiveIndex) {
                //puxar para a direita
                tabBodies.loop(function () {
                    index += 1;
                    var left = this.offsetLeft;
                    left = left + (pageControlWidth * (oldActiveIndex - newActiveIndex));
                    this.adSty('left', left + "px");
                });
            }
        });
    };

    var configureEventChangeTab = function (pageControl) {
        /*event*/
        var eventChange = document.createEvent('Event');
        eventChange.initEvent('changeTab', true, true);
        var identifier = setInterval(function () {
            var tabActive = pageControl.find('.tab.active');
            if (tabActive) {
                tabActive = tabActive.attr('data-body');
            }
            if (!tabActive) {
                clearInterval(identifier);
            }
            var lastActive = pageControl.attr('data-last-active');
            if (!lastActive) {
                pageControl.attr('data-last-active', tabActive);
            } else {
                if (lastActive != tabActive) {
                    pageControl.attr('data-last-active', tabActive);
                    pageControl.dispatchEvent(eventChange);
                }
            }
        }, 300);
    };

    var configurePageControls = function (resizing) {
        var pgcSelector = selector || '.page-control';
        frango.find(pgcSelector).loop(function () {

            var pageControl = this;
            var pageControlId = frango.getExclusiveId();
            pageControl.attr('data-pagecontrol-id', pageControlId);
            frango.find(pageControl.find('.tab-group').first()).attr('data-pagecontrol-id', pageControlId);
            frango.find(pageControl.find('.tab-body-group').first()).attr('data-pagecontrol-id', pageControlId);
            pageControl.find(frango.format('[data-pagecontrol-id="%s"] > .tab-body', [pageControlId])).attr('data-pagecontrol-id', pageControlId);
            pageControl.find(frango.format('[data-pagecontrol-id="%s"] > .tab', [pageControlId])).attr('data-pagecontrol-id', pageControlId);


            var tabs = findElementUsignPageControlId('.tab', pageControl);
            tabs.attr('data-pagecontrol-id', pageControlId);

            var paretElWidth = pageControl.parentElement.offsetWidth;
            var tabsCount = tabs.elements.length;
            var pageControlWidth = pageControl.offsetWidth;
            var tabWidth = Math.floor(pageControlWidth / tabsCount);
            var tabBodies = findElementUsignPageControlId('.tab-body', pageControl);

            if (paretElWidth > 0) {
                pageControl.adSty('width', paretElWidth + "px");
            }

            //tabBodies.attr('data-pagecontrol-id', pageControlId);

            setTabsInitialSize(pageControl, tabWidth, tabBodies, pageControlWidth, resizing);

            var tabActive = pageControl.find('.tab.active');
            if (tabActive.elements.length === 0) {
                frango.find(tabs.first()).adCl('active');
                pageCotrol.find(frango.format('[name="%s"]', [tabs.first().dataset.dataBody]));
            }

            if (!resizing) {
                configureClick(pageControl, tabBodies, tabs);
                if (touchEnabled == true) {
                    frango.touch.tab.config(findElementUsignPageControlId('.tab-body-group', pageControl));
                }
            }

            //configureEventChangeTab(pageControl);
        });
    };
    frango.find(window).on('resize', function () {
        configurePageControls(true);
    });
    configurePageControls(false);


};




/*data server*/

frango.server = {};

frango.server.authorization = undefined;

frango.server.persistentHeaders = {};

frango.server.host_url = undefined;

frango.server.ajax = function (url, data, async, objectHeader, useFrangoHost, useAuthorization, requestMethod, contentType) {
    var newUrl = url;
    var result = {};
    var routineOk;
    var routineNotOk;
    var routineError;
    var finalData = "";
    var obj;
    if (!objectHeader) {
        objectHeader = {};
    }
    switch (contentType) {
        case "application/json":
            objectHeader.Accept = "application/json, text/javascript";
            break;
        case "json":
            objectHeader.Accept = "application/json, text/javascript";
            contentType = "application/json";
            break;
        case "application/xml":
            objectHeader.Accept = "application/xml, text/xml";
            break;
        case "text/html":
            objectHeader.Accept = "text/html";
            break;
        case "text/plain ":
            objectHeader.Accept = "text/plain";
            break;
        default:
            //objectHeader["Accept"] = "*";
            break;
    }

    var hasContentypeOnHeader = (contentType != undefined && contentType != null && contentType != "");
    if (useFrangoHost === undefined || useFrangoHost == null) {
        useFrangoHost = true;
    }
    if (useAuthorization == undefined || useAuthorization == null) {
        useAuthorization = true;
    }

    result.onError = function (method) {
        if (method) {
            routineError = method;
        }
    };

    result.onSuccess = function (method) {
        if (method) {
            routineOk = method;
        }
        return this;
    };
    result.onFailure = function (method) {
        if (method) {
            routineNotOk = method;
        }
        return this;
    };

    if (async === undefined || async === null || async === '') {
        async = true;
    }

    if (frango.server.host_url && useFrangoHost === true) {
        newUrl = frango.server.host_url + url;
    }

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        try {
            if (xhttp.readyState == 4) {
                if (xhttp.status == 200 || xhttp.status == 201 || xhttp.status == 204) {
                    routineOk(xhttp.responseText, xhttp.status);
                } else {
                    routineNotOk(xhttp.responseText, xhttp.status);
                }
            }
        } catch (e) {
            frango.wait.stop(undefined, true);
            frango.warning('An error has ocurred. </br>' + e);
            throw e;
        }
    };

    if (data) {
        if (typeof data === 'object' && (hasContentypeOnHeader === false || requestMethod == 'GET')) {
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    finalData += key + "=" + encodeURIComponent(data[key]) + "&";
                }
            }
            finalData = finalData.substr(0, finalData.length - 1);
        } else {
            finalData = data;
        }
    }

    if (finalData != "" && requestMethod == 'GET') {
        xhttp.open(requestMethod, newUrl + '?' + finalData, async);
    } else {

        xhttp.open(requestMethod, newUrl, async);
    }

    xhttp.onerror = function (msg) {
        if (routineError) {
            routineError(msg);
        }
    };

    if (objectHeader) {
        for (obj in objectHeader) {
            if (objectHeader.hasOwnProperty(obj)) {
                xhttp.setRequestHeader(obj, objectHeader[obj]);
            }
        }
    }

    if (frango.server.persistentHeaders) {
        for (obj in frango.server.persistentHeaders) {
            if (frango.server.persistentHeaders.hasOwnProperty(obj)) {
                xhttp.setRequestHeader(obj, frango.server.persistentHeaders[obj]);
            }
        }
    }

    if (requestMethod != 'GET') {
        if (hasContentypeOnHeader === true) {
            xhttp.setRequestHeader("Content-Type", contentType);
        } else {
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        }

        if (!csrfSafeMethod(requestMethod) && !this.crossDomain) {
            xhttp.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
        }
    }

    if (frango.server.authorization && useAuthorization) {
        xhttp.setRequestHeader('Authorization', frango.server.authorization);
    };


    try {
        if (requestMethod != 'GET' && finalData != "") {
            xhttp.send(finalData);
        } else {
            xhttp.send();
        };
    } catch (e) {
        frango.wait.stop();
        frango.warning(e.toString());
    };

    return result;
};

frango.server.put = function (url, data, async, objectHeader, useFrangoHost, useAuthorization, contentType) {
    return frango.server.ajax(url, data, async, objectHeader, useFrangoHost, useAuthorization, 'PUT', contentType);
};

frango.server.post = function (url, data, async, objectHeader, useFrangoHost, useAuthorization, contentType) {
    return frango.server.ajax(url, data, async, objectHeader, useFrangoHost, useAuthorization, 'POST', contentType);
};

frango.server.get = function (url, data, async, objectHeader, useFrangoHost, useAuthorization, contentType) {
    return frango.server.ajax(url, data, async, objectHeader, useFrangoHost, useAuthorization, 'GET', contentType);
};

frango.server.delete = function (url, data, async, objectHeader, useFrangoHost, useAuthorization, contentType) {
    return frango.server.ajax(url, data, async, objectHeader, useFrangoHost, useAuthorization, 'DELETE', contentType);
};

frango.ajax = function (objectParams, requestMethod) {
    var url = objectParams.url;
    var data = objectParams.data;
    var async = objectParams.async;
    var objectHeader = objectParams.header;
    var useFrangoHost = objectParams.useFrangoHost;
    var useAuthorization = objectParams.useAuthorization;
    var onSuccess = objectParams.onSuccess;
    var onFailure = objectParams.onFailure;
    var contentType = objectParams.contentType;
    frango.server.ajax(url, data, async, objectHeader, useFrangoHost, useAuthorization, requestMethod, contentType).onSuccess(function (data, status) {
        if (onSuccess) {
            onSuccess(data, status);
        }
    }).onFailure(function (data, status) {
        if (onFailure) {
            onFailure(data, status);
        }
    });
};

frango.ajaxGet = function (objectParams) {
    frango.ajax(objectParams, 'GET');
};

frango.ajaxPost = function (objectParams) {
    frango.ajax(objectParams, 'POST');
};

frango.ajaxPut = function (objectParams) {
    frango.ajax(objectParams, 'PUT');
};

frango.ajaxDelete = function (objectParams) {
    frango.ajax(objectParams, 'DELETE');
}


frango.templatesFunctions = {};

frango.templatesFunctions.upper = function (value) {
    return value.toUpperCase();
};

frango.templatesFunctions.lower = function (value) {
    return value.toLowerCase();
};

frango.templatesFunctions.replace = function (value, params) {
    var to_be_replaced = params[0];
    var replace_to = params[1];
    return frango.replace(value, to_be_replaced, replace_to);
};

frango.templatesFunctions.replaceWholeWord = function (value, params) {
    var to_be_replaced = params[0];
    var replace_to = params[1];
    return frango.replace(value, to_be_replaced, replace_to, true);
};

frango.templatesFunctions.default = function (value, defa, field) {

    if (!value || value == field) {
        return defa[0];
    } else {
        return value
    };

};

frango.templatesFunctions.formatDate = function (date, format) {
    return frango.formatDate(date, format[0])
};

frango.templatesFunctions.between = function (value, params) {
    var copareOne = params[0];
    var copareTwo = params[1];
    var valueIfTrue = params[2];
    var valueIfFalse = params[3];
    return (value >= copareOne && value <= copareTwo) ? valueIfTrue : valueIfFalse;

};

frango.templatesFunctions.biggerThan = function (value, params) {
    var copareOne = params[0];
    var valueIfTrue = params[1];
    var valueIfFalse = params[2];
    return (value > copareOne) ? valueIfTrue : valueIfFalse;
};

frango.templatesFunctions.smallerThan = function (value, params) {
    var copareOne = params[0];
    var valueIfTrue = params[1];
    var valueIfFalse = params[2];
    return (value < copareOne) ? valueIfTrue : valueIfFalse;
};

frango.templatesFunctions.equal = function (value, params) {
    var copareOne = params[0];
    var valueIfTrue = params[1];
    var valueIfFalse = params[2];
    return (value == copareOne) ? valueIfTrue : valueIfFalse;
};


frango.templatesFunctions.ternary = function (value, params) {
    var exptectedVal = params[0];
    var valIfTrue = params[1];
    var valIFalse = params[2];
    var isTrue = (value == exptectedVal)
    return isTrue ? valIfTrue : valIFalse;
};

frango.applyTemplateFunctions = function (value, funcNameList, field) {
    var paramsAndFuncname;
    var funcName;
    var params;
    var result = value;

    for (var i = 0; i < funcNameList.length; i++) {
        paramsAndFuncname = funcNameList[i].split('@');
        funcName = paramsAndFuncname[0];
        paramsAndFuncname.shift();
        params = paramsAndFuncname;
        result = frango.templatesFunctions[funcName](value, params, field);
    };
    return result;
};

/*data bind*/
frango.bindDataOnTemplate = function (datasetName, data, parent, empty, keepTemplate) {
    if (data && typeof data != 'object') {
        data = JSON.parse(data);
    };

    if (empty === true) {
        data = [{}];
    } else {
        if (!data || data.length === 0) {
            frango.find("[data-datasetname-empty='" + datasetName + "']", parent).loop(function () {
                this.rmCl('invisible');
            });
            return;
        } else {
            frango.find("[data-datasetname-empty='" + datasetName + "']", parent).loop(function () {
                this.adCl('invisible');
            });
        }
    }
    var extractFieldsAndFunctions = function (key) {
        var splited = key.split(":");
        var functions = [];

        for (var i = 1; i < splited.length; i++) {
            functions.push(splited[i]);
        }

        return { "field": splited[0], "functions": functions };
    };

    var prepareTemplateBeforeBind = function (templateText) {
        var text = templateText;
        //text = frango.replace(text, "href *= *' */", "href='#");
        //text = frango.replace(text, 'href *= *" */', 'href="#');
        text = frango.replace(text, "\n\\[\\(\\(ELIMINATE\\)\\)\\]", "");
        return text;
    };

    frango.find('[data-datasetname="' + datasetName + '"]', parent).loop(function () {
        var template_container = this;
        var template = "";
        var pathToRows = this.getAttribute('data-path-to-rows');
        var isSelfContainer = this.hasAttribute('data-self');
        var hasNestedloop = this.find(frango.format('[data-parent-dataset="%s"]', [datasetName])).elements.length > 0;
        var fullData = data;
        if (isSelfContainer) {
            var parentEle = document.createElement('div');
            var thisClone = this.cloneNode(true);
            thisClone.removeAttribute('data-datasetname');
            parentEle.appendChild(thisClone);
            template = parentEle.innerHTML;
        } else {
            template = this.innerHTML;
        }

        if (pathToRows) {
            var pathRowList = pathToRows.split('.');
            var tempData = fullData;
            for (var i = 0; i < pathRowList.length; i++) {
                tempData = tempData[pathRowList[i]];
            }
            fullData = tempData;
        }

        var finalTemplate = "";
        var rowData = [];
        var selectedRowData = [];
        var rowTemplate = "";
        var pathCol = "";
        var extractedFieldsAndFunctions = {};

        for (var row = 0; row < fullData.length; row++) {
            rowData = fullData[row];
            rowData.objectIndex = row;
            rowTemplate = frango.replace(template, " *\\}\\]", "}]\n[((ELIMINATE))]");
            if (empty === true) {
                rowTemplate = frango.replace(rowTemplate, "\\[\\{ *.*\\ *}\\]", '');
            } else {
                var rgex = new RegExp('\\[\\{ *\\( *' + datasetName + ' *\\) *.* *\\}\\]', 'gmi');
                var match = rowTemplate.match(rgex);
                //var match = rowTemplate.match(/\[\{.*\}\]/g);
                if (match) {
                    for (var col = 0; col < match.length; col++) {
                        selectedRowData = rowData;

                        //pathCol = frango.replaceMany(match[col], ["\\[{ *", " *}\\]", " *\\( *" + datasetName + " *\\) *", '=""', "=''"], "");
                        pathCol = frango.replace(match[col], '(\\[ *\\ *{ * *|\\ *} *\\] *)|( *\\( *' + datasetName + ' *\\) *(=\"\")* *)', '');
                        extractedFieldsAndFunctions = extractFieldsAndFunctions(pathCol);
                        var pathColList = extractedFieldsAndFunctions.field.split('.');

                        for (var nameCol = 0; nameCol < pathColList.length; nameCol++) {
                            selectedRowData = selectedRowData[pathColList[nameCol]];
                        }

                        if (extractedFieldsAndFunctions.functions.length > 0) {
                            if (selectedRowData != undefined && selectedRowData != null) {
                                selectedRowData = frango.applyTemplateFunctions(selectedRowData,
                                    extractedFieldsAndFunctions.functions, extractedFieldsAndFunctions.field);
                            } else {
                                if (extractedFieldsAndFunctions.functions.length > 0) {
                                    selectedRowData = frango.applyTemplateFunctions(extractedFieldsAndFunctions.field,
                                        extractedFieldsAndFunctions.functions, extractedFieldsAndFunctions.field);
                                }
                            }
                        }

                        if (selectedRowData != undefined && selectedRowData != null) {
                            var reg = new RegExp("\\[\\{ *" + "\\( *" + datasetName + " *\\) *(=\"\")* *" + pathCol + " *\\}\\]", "gmi");
                            if (Array.isArray(selectedRowData)) {
                                rowTemplate = frango.replace(rowTemplate, reg,
                                    frango.replace(JSON.stringify(selectedRowData), '"', '&quot;'));
                            } else {
                                rowTemplate = frango.replace(rowTemplate, reg,
                                    selectedRowData);
                            }
                        }
                    }
                }
            }
            rowTemplate = prepareTemplateBeforeBind(rowTemplate);
            /* check for nested loops */
            if (hasNestedloop || keepTemplate === true) {
                var parser = new DOMParser();
                var nestedDataSetNames = [];
                tempDoc = parser.parseFromString(rowTemplate, 'text/html');
                frango.find(frango.format('[data-parent-dataset="%s"', [datasetName]), tempDoc).loop(function () {
                    this.attr('data-datasetname', this.attr('data-nested-data'));
                    nestedDataSetNames.push(this.attr('data-nested-data'));
                    this.removeAttribute('data-nested-data');
                    this.removeAttribute('data-parent-dataset');
                });

                for (var index = 0; index < nestedDataSetNames.length; index++) {
                    frango.bindDataOnTemplate(nestedDataSetNames[index], rowData[nestedDataSetNames[index]], tempDoc);
                }

                rowTemplate = frango.find('body', tempDoc).first().innerHTML;
            }

            finalTemplate += rowTemplate;
        };
        if (keepTemplate === true) {
            template_container.parentNode.insertAdjacentHTML('beforeend', '<div data-datasetname-replicated="' + datasetName + '" >' + finalTemplate + '</div>');
        } else {
            template_container.parentNode.insertAdjacentHTML('beforeend', finalTemplate);
            frango.find(template_container).remove();
        }
    });

};

frango.bindEvents = function (object, container) {
    var element = null;
    var constructorName = object.constructor.name;
    if (typeof container === 'object') {
        if (!('find' in container)) {
            element = frango.find(container);
        } else {
            element = container;
        }
    } else {
        element = frango.find(container);
    }

    element.find(frango.format('[data-events-%s]', [constructorName])).loop(function () {
        var thisElement = this;
        var events = thisElement.attr(frango.format('data-events-%s', [constructorName])).split(';');
        events.map(function (eventAndFuncion, index) {
            var eventAndFunctionArray = eventAndFuncion.split(':');
            var event = eventAndFunctionArray[0];
            var func = eventAndFunctionArray[1];
            thisElement.on(event, object[func]);
        });
    });
};

frango.getLiveValueFromObject = function (fieldPath, value, listIndexesIfLooping) {
    var finalValue = value;
    var index = 0;
    if (frango.isFunction(value)) {
        return value();
    } else if (typeof (value) === 'object') {
        var keys = fieldPath.split('.');
        if (listIndexesIfLooping != null && listIndexesIfLooping != undefined) {
            for (index = 0; index < listIndexesIfLooping.length; index++) {
                finalValue = finalValue[listIndexesIfLooping[index]];
            }
        }
        for (index = 1; index < keys.length; index++) {
            var key = keys[index];
            if (finalValue != undefined) {
                finalValue = finalValue[key];
            } else {
                finalValue = null;
                break;
            }
        }
    }

    if (finalValue != undefined) {
        return finalValue;
    } else {
        return null;
    }
};

frango.handleLiveFieldName = function (field, last) {

    var fields = field.split('.');
    var result = last == true ? fields[fields.length - 1] : fields[0];
    result = result.split(',')[0];
    return result;
};

frango.liveField = function (initialValue, liveFiledsToObserveIfFunction) {
    var liveObject = {
        _liveField: true,
        _value: null,
        _fieldName: null,
        _index_for_loop: null,
        _elementsBinded: [],
        _isObject: false,
        _isFunction: false,
        _fieldsToObserve: null,
        _templates: {},
        _list_of_in_loop_objects: [],
        addElements: function (element, attr, field, classObject) {
            liveObject._elementsBinded.push({ element: element, attr: attr, class: classObject, field: field });
        },
        val: function (value, keyIfObject) {
            if (value != undefined) {

                if (keyIfObject != undefined && keyIfObject != null && liveObject._isObject) {
                    var keys = keyIfObject.split('.');
                    var lengthOfKeys = keys.length;
                    var tempObject = liveObject._value;
                    keys.map(function (key, index) {
                        if (index > 0 && index < lengthOfKeys - 1) {
                            if (tempObject[key] == undefined) {
                                tempObject[key] = {};
                            }
                            tempObject = tempObject[key];
                        }
                    });
                    tempObject[keys[keys.length - 1]] = value;
                    //liveObject._value[keyIfObject] = value
                } else {
                    liveObject._value = value;
                }

                for (var index = 0; index < liveObject._elementsBinded.length; index++) {
                    var element = liveObject._elementsBinded[index];
                    frango.bindLiveFieldOnAttr(element.element, element.attr, element.field, element.class, false);
                }

            } else {
                return frango.getLiveValueFromObject(liveObject._fieldName, liveObject._value, null/*liveObject._index_for_loop*/);
            }
        }
    };

    liveObject._value = initialValue;

    if (frango.isFunction(initialValue)) {
        if (!liveFiledsToObserveIfFunction) {
            throw 'The parameter liveFiledsToObserveIfFunction must be informed if de fieldLive is a function';
        }
        liveObject._isFunction = true;
        liveObject._fieldsToObserve = liveFiledsToObserveIfFunction;
    } else if (initialValue != undefined && initialValue != null && typeof initialValue === 'object') {
        liveObject._isObject = true;
    }
    return liveObject;
};


frango.bindLiveFieldInputForms = function (element, field, classObject, initializing) {
    var tagName = element.tagName;
    var value;
    if (frango.inArray(['INPUT', 'SELECT', 'TEXTAREA', 'OPTION'], tagName)) {
        if (tagName === 'INPUT' || tagName === 'TEXTAREA') {
            //element.attr('value', classObject[field].val());
            value = classObject[frango.handleLiveFieldName(field)].val();
            if ('CHECKBOX' == element.type.toUpperCase()) {
                element.checked = frango.getLiveValueFromObject(field, value) == true;
            } else {
                element.value = frango.getLiveValueFromObject(field, value);
            }

            if (initializing === true) {
                element.on('input', function (eve) {
                    var elementType = element.type.toUpperCase();
                    if (elementType == 'CHECKBOX') {
                        classObject[frango.handleLiveFieldName(field)].val(element.checked, field);
                    } else {
                        classObject[frango.handleLiveFieldName(field)].val(element.value, field);
                    }
                });
            }
        } else if (tagName == 'SELECT') {
            //element.attr('value', classObject[field].val());
            value = classObject[frango.handleLiveFieldName(field)].val();
            element.value = frango.getLiveValueFromObject(field, value);
            var option = element.find('[value="' + element.value + '"]').first();
            if (option) element.selectedIndex = option.index;
            if (initializing === true) {
                element.on('change', function (eve) {
                    classObject[frango.handleLiveFieldName(field)].val(element.value, field);
                    if (element.dataset.description) {
                        classObject[frango.handleLiveFieldName(element.dataset.description)].val(element.options[element.selectedIndex].text,
                            element.dataset.description);
                    }
                });
            }
        } else if (tagName == 'OPTION') {
            value = classObject[frango.handleLiveFieldName(field)];
            if (value) {
                value = value.val();
            } else {
                throw 'Field ' + field + ' is not defined';
            }
            frango.attr(element, "value", frango.getLiveValueFromObject(field, value));
        }
    }
};

frango.liveLoop = function (element, attr, field, classObject, initializing, isInnerLoop) {
    var fieldName = frango.handleLiveFieldName(field, false);
    var lastListName = frango.handleLiveFieldName(field, true);
    var list = frango.getLiveValueFromObject(field, classObject[fieldName].val());
    //var lastListName = fieldName;    

    /* if(classObject[fieldName]._index_for_loop !=null && classObject[fieldName]._index_for_loop != undefined){
         lastListName = frango.handleLiveFieldName(field, true);
         list = list[lastListName];
     }*/

    var oldRow = classObject[fieldName]._index_for_loop;
    var templateId = null;
    var template = null;
    if (!initializing && !Array.isArray(list)) {
        throw 'To execute loop attribute, the value of ' + fieldName + ' must be an array.';
    }

    if (initializing) {
        template = element.innerHTML;
        templateId = frango.getExclusiveId();
        element.setAttribute('data-templateid', templateId);
        classObject[fieldName]._templates[templateId] = template;
    } else {
        templateId = element.dataset.templateid;
        template = classObject[fieldName]._templates[templateId];
    }
    element.html('');
    if (list) {
        classObject[fieldName]._list_of_in_loop_objects.push({ "name": lastListName, "index": -1 });
        for (var index = 0; index < list.length; index++) {

            classObject[fieldName]._list_of_in_loop_objects[classObject[fieldName]._list_of_in_loop_objects.length - 1].index = index;
            classObject[fieldName]._index_for_loop = index;
            var newElement = document.createElement('div');
            newElement = frango.find(newElement);
            newElement.html(template);
            newElement.find('[data-live]').loop(function () {
                var thisElement = this;
                var attrs = thisElement.attr('data-live').split(';');
                attrs.map(function (eventAndFuncion, index) {
                    var attrAndFunctionArray = eventAndFuncion.split(':');
                    var attr = attrAndFunctionArray[0].trim();
                    var fieldOnElement = attrAndFunctionArray[1].trim();

                    for (var objectIndex = 0; objectIndex < classObject[fieldName]._list_of_in_loop_objects.length; objectIndex++) {
                        var obj = classObject[fieldName]._list_of_in_loop_objects[objectIndex];
                        fieldOnElement = frango.replace(fieldOnElement, obj.name, obj.name + '.' + obj.index);
                    }

                    if (attr == 'loop') {
                        templateId = frango.getExclusiveId();
                        thisElement.setAttribute('data-templateid', templateId);
                        classObject[fieldName]._templates[templateId] = thisElement.innerHTML;

                    }
                    frango.bindLiveFieldOnAttr(thisElement, attr, fieldOnElement, classObject, initializing, true);
                });

            });

            if (index > 0) {
                newElement.find('[data-live-norepeat]').remove();
            }

            element.addHTMLBeforeEnd(newElement.html());

        }
    }
    classObject[fieldName]._index_for_loop = oldRow;
    classObject[fieldName]._list_of_in_loop_objects.pop();
};

frango.bindLiveAttributes = function (element, attr, field, classObject, initializing) {
    var attributes = field.trim().split('|');
    for (var index = 0; index < attributes.length; index++) {
        var pairAttributeValue = attributes[index].trim().split(',');
        var attrValue = pairAttributeValue[0].trim();
        var attribute = pairAttributeValue[1].trim();
        var fieldValue = classObject[frango.handleLiveFieldName(attrValue)];
        if (fieldValue && typeof fieldValue === 'object' && '_liveField' in fieldValue) {
            if (initializing) {
                fieldValue.addElements(element, attr, field, classObject);
            }
            fieldValue = fieldValue.val();
        }
        frango.attr(element, attribute, frango.getLiveValueFromObject(attrValue, fieldValue));
    }
};

frango.bindLiveFieldOnAttr = function (element, attr, field, classObject, initializing, isInnerLoop) {
    switch (attr.toLowerCase()) {
        case 'text':
            var fieldName = frango.handleLiveFieldName(field);
            var fieldValueObject = classObject[fieldName];
            if (fieldValueObject != undefined) {
                var value = fieldValueObject.val();
                element.innerText = frango.getLiveValueFromObject(field, value);
            } else {
                throw "Field " + field + " is not a live field or doesn't exists.";
            }
            break;
        case 'value':
            frango.bindLiveFieldInputForms(element, field, classObject, initializing);
            break;
        case 'loop':
            frango.liveLoop(element, attr, field, classObject, initializing, isInnerLoop);
            break;
        case 'attr':
            frango.bindLiveAttributes(element, attr, field, classObject, initializing, isInnerLoop);
            break;
        default:/* events */
            var evento = classObject[field];
            if (evento) {
                frango.on(attr, element, evento);
            } else {
                throw 'The attribute ' + field + ' is not a public method';
            }
            break;
    }
};

frango.bindLiveData = function (containerSelector, classObject) {
    var element = frango.find(containerSelector);
    var keys = Object.keys(classObject);

    for (var index = 0; index < keys.length; index++) {
        var key = keys[index];
        if (classObject[key] && typeof classObject[key] === 'object') {
            if ('_liveField' in classObject[key]) {
                classObject[key]._fieldName = key;
            }
        }
    }

    element.find('[data-live]').loop(function () {
        var thisElement = this;
        if (!("innerLoop" in thisElement.dataset)) {

            var attrs = thisElement.attr('data-live').split(';');
            attrs.map(function (eventAndFuncion, index) {
                var attrAndFunctionArray = eventAndFuncion.split(':');
                var attr = attrAndFunctionArray[0].trim();
                var field = attrAndFunctionArray[1].trim();

                var fieldObject = classObject[frango.handleLiveFieldName(field)];

                if (fieldObject && '_liveField' in fieldObject) {
                    if (!fieldObject) {
                        throw "Field " + field + " doesn't exists in object.";
                    }

                    if (fieldObject._isFunction) {
                        for (var fieldsCount = 0; fieldsCount < fieldObject._fieldsToObserve.length; fieldsCount++) {
                            var fieldToObserve = fieldObject._fieldsToObserve[fieldsCount];
                            fieldToObserve.addElements(thisElement, attr, field, classObject);
                        }
                    } else {
                        fieldObject.addElements(thisElement, attr, field, classObject);
                    }
                }

                frango.bindLiveFieldOnAttr(thisElement, attr, field, classObject, true);
            });
        }
    });
};




frango.bindEmptyDataset = function (datasetName, parent) {
    frango.bindDataOnTemplate(datasetName, null, parent, true);
    frango.fillLookup('[data-replicated-dataset="' + datasetName + '"] [data-lookup-url]');
};

frango.bindDataOnReusableTemplate = function (templateName, listOfObjects, clearTemplate = true, parentElement = undefined) {
    if (clearTemplate === true) {
        frango.find('[data-datasetname-replicated="' + templateName + '"]', parentElement).remove();
    }
    frango.bindDataOnTemplate(templateName, listOfObjects, parentElement, false, true);

};

frango.removeReplicatedDataset = function (datasetName, parent) {
    frango.find('[data-replicated-dataset="' + datasetName + '"]', parent).loop(function () {
        this.parentNode.removeChild(this);
    });
};

frango.formParser = function (selector) {
    var frm = frango.find(selector).elements[0];
    var data = "";
    for (var i = 0; i < frm.length; i++) {
        var ele = frm[i];

        if (!ele.hasAttribute("name"))
            continue;

        if (ele.type === "checkbox") {
            data += ele.getAttribute("name").toString() + "=" + ele.checked + "&";
        } else {
            data += ele.getAttribute("name").toString() + "=" + ele.value.toString() + "&";
        }
    }

    return data.substr(0, data.length - 1);
}

frango.formParserJson = function (selector) {
    var frm = frango.find(selector).elements[0];
    if (!frm) {
        return;
    };
    var data = {};
    for (var i = 0; i < frm.length; i++) {
        var ele = frm[i];
        var value = undefined;
        var valueAsObject = ele.hasAttribute('data-value-as-object');
        var name = ele.getAttribute("name");
        if (name) {
            name = name.toString();
        } else {
            continue;
        };
        if (ele.type === "checkbox") {
            value = ele.checked;
            //data += '"' + ele.getAttribute("name").toString() + '":"' + ele.checked.toString() + '",';
        } else if (ele.type === "text" && ele.dataset.typeelement === "datepicker") {
            //value = new Date(ele.value);
            if (M.Datepicker.getInstance(ele)) {
                value = M.Datepicker.getInstance(ele).date;
            };
        } else {
            value = ele.value;
            //data += '"' + ele.getAttribute("name").toString() + '":"' + ele.value.toString() + '",';
        };

        if (valueAsObject) {
            var lookupField = frango.find(ele).attr("data-lookup-field");
            data[name][[lookupField]] = value;
        } else {
            data[name] = value;
        };

    }

    return JSON.parse(JSON.stringify(data));
};


frango.bindDataObjectOnForm = function (selector, data) {
    if (Object.keys(data).length == 0) {
        return;
    };
    var form = frango.find(selector).first()
    if (form) {
        var elements = form.elements;
    } else {
        return;
    };

    for (var index = 0; index < elements.length; index++) {
        var element = elements[index];
        //item[element.name] = element.selectedOptions[0].text;
        if (element.name in data) {
            if (element.type == 'checkbox') {
                element.checked = data[element.name];
            } else {
                element.value = data[element.name];
            };

        };
    };
};


frango.bindServerDataOnTemplate = function (url, model, parent, request_params, execute) {
    frango.wait.start();
    var received = {};
    request_params = request_params || "";

    var result = {};
    var successMehtod;
    var failMethod;
    result.onSuccess = function (method) {
        if (method) {
            successMehtod = method;
        }
        return this;
    };
    result.onFailure = function (method) {
        if (method) {
            failMethod = method;
        }
        return this;
    };

    if (execute === false) {
        frango.wait.stop();
        return
    }

    frango.server.
        get(url, request_params).onSuccess(function (data) {
            try {
                received = JSON.parse(data);
            } catch (e) {
                frango.wait.stop();
                frango.warning(data);
            };

            frango.bindDataOnTemplate(model, received, parent);
            frango.fillLookup('[data-replicated-dataset="' + model + '"] [data-lookup-url]');

            if (successMehtod)
                successMehtod.call()

            frango.wait.stop();
        }).onFailure(function (data) {
            frango.wait.stop();
            if (failMethod) {
                successMehtod.call()
            } else {
                frango.warning('Ocorreu um erro ao obter os dados necessários.' + data);
            };
        });

    return result;
}

frango.templatesBag = {};

frango.addTemplateOnBag = function (template_name, template_config) {
    if (!frango.templatesBag[template_name]) {
        frango.templatesBag[template_name] = template_config;
    };
};

frango.removeTemplateFromBag = function (template_name, template) {
    if (frango.templatesBag[template_name]) {
        delete frango.templatesBag[template_name];
    };
};

frango.templatesToGet = {}
frango.freeToGetTemplate = true;

frango.getTemplate = function (templateName, onSuccess, onFailure) {
    this.result = {};
    var executeSuccess = onSuccess;
    var executeFailure = onFailure;
    var containers = frango.find('[data-container-template="' + templateName + '"]');

    /*this.result.onSuccess = function (method) {
        if (method) {
            if (!this.templateBinded) {
                executeSuccess = method;
            } else {
                method(this.templateBinded);
            };
        };
        return this;
    };*/

    /*this.result.onFailure = function (method) {
        if (method) {
            executeFailure = method;
        }
        return this;
    };*/


    var getRemoteTemplate = function () {
        if (!frango.freeToGetTemplate ||
            !frango.templatesToGet[templateName] ||
            frango.templatesToGet[templateName].isGetting) {
            return
        };
        frango.freeToGetTemplate = false;
        frango.templatesToGet[templateName].isGetting = true;

        containers.loop(function () {

            var currentEle = this;
            var url = currentEle.getAttribute('data-template-url');

            if (!currentEle.hasAttribute('data-template-binded') && url) {
                frango.server.get(url, undefined, true, { 'GETTEMPLATE': true }, false, false).onSuccess(function (data) {

                    currentEle.insertAdjacentHTML('afterbegin', data);
                    currentEle.setAttribute('data-template-binded', true);
                    frango.autoComplete();


                    if (executeSuccess)
                        executeSuccess(data);

                    clearInterval(frango.templatesToGet[templateName].timeout);
                    delete frango.templatesToGet[templateName];
                    frango.freeToGetTemplate = true;

                }).onFailure(function (data) {
                    clearInterval(frango.templatesToGet[templateName].timeout)
                    delete frango.templatesToGet[templateName];
                    currentEle.insertAdjacentHTML('afterbegin', data);
                    if (executeFailure)
                        executeFailure(data);
                });
            } else {
                currentEle.setAttribute('data-template-binded', true);
                this.result.templateBinded = currentEle.innerHTML;
                if (executeSuccess) {
                    executeSuccess();
                };

                frango.freeToGetTemplate = true;
            };
        });
    };

    if (containers.elements.length > 0) {
        if (!containers.first().hasAttribute('data-template-binded')) {
            var idTimeout = setInterval(getRemoteTemplate, 300);
            frango.templatesToGet[templateName] = {
                "timeout": idTimeout,
                "isGetting": false
            };
        } else {
            //setTimeout(function () {
            if (executeSuccess) {
                executeSuccess();
            };
            //}, 300);
        };
    };

    return this.result;
};

frango.useDinamicComponent = function (componentId, componentName, selectorContainer, data, onFinish) {
    //get-component          
    var component = frango.getComponent(componentName);

    var idIntervalNested = setInterval(function () {
        if (component.occupied == true) {
            return;
        };
        component.occupied = true;
        var removeElement = true;
        var selector = selectorContainer;
        //var extraData = thisElement.getAttribute('data-component-extra-data');

        clearInterval(idIntervalNested);
        component["selector_to_bind"] = selector;
        component["componentID"] = componentId;
        component.bindData(data, true, onFinish);

    }, 300);
};

frango.useNestedComponent = function (componentID, methodBind) {

    frango.find("[data-component-id='" + componentID + "']").loop(function () {
        //get-component          
        var component = frango.getComponent(this.getAttribute('data-component-name'));

        var thisElement = this;
        var idIntervalNested = setInterval(function () {
            if (component.occupied == true) {
                return;
            };
            component.occupied = true;
            clearInterval(idIntervalNested);
            var removeElement = true;
            var selector = thisElement.getAttribute('data-component-container');
            var extraData = thisElement.getAttribute('data-component-extra-data');
            var componentId = thisElement.getAttribute('data-component-id');
            if (!selector) {
                selector = "[data-component-id='" + componentId + "']";
                removeElement = false;
            };

            component["selector_to_bind"] = selector;
            component["componentID"] = componentId;
            if (extraData) {
                component["extra_data"] = extraData;
            };

            component["dataset"] = thisElement.dataset;

            if (removeElement) {
                thisElement.remove();
            } else {
                thisElement.setAttribute('data-component', 'no');
            };
            methodBind();

        }, 300);

    });
};

frango.activeDocumentToTemplating = document;

frango.configureStaticComponents = function () {
    frango.config.isComppiling = true;
    frango.find('script[data-container-template="pgHome"]').loop(function () {
        //creates a new doc to temporary use
        var container = this;
        var temporaryDoc = new DOMParser().parseFromString('<div></div>', 'text/html');
        frango.activeDocumentToTemplating = temporaryDoc;
        var componentName = container.attr('data-container-template');
        var html = container.html();
        frango.configureStaticComponent(componentName, html);
        container.html(frango.find('body', frango.activeDocumentToTemplating).html());
    });
    frango.config.isComppiling = false;
    frango.activeDocumentToTemplating = null;
};

frango.configureStaticComponent = function (componentName, html) {
    var template = html;

    if (!template) {
        template = frango.find('[data-container-template="' + componentName + '"]').html();
    }

    //template = frango.format('<div data-datasetname="%s">%s</div>', [componentName, template]);
    frango.find('body', frango.activeDocumentToTemplating).html(template);

    /*frango.executeComponentController(componentName, function(data){
        if (data) {
            frango.bindDataOnTemplate(componentId, dataToBind, frango.activeDocumentToTemplating, false, false);
        };                    
    });*/

    //insert all sub components
    frango.find("[data-component-name]", frango.activeDocumentToTemplating).loop(function () {
        var subComponent = this;
        var subComponentName = subComponent.attr('data-component-name');
        var autoCreate = subComponent.attr('data-auto-create');

        if (autoCreate == "yes" || autoCreate == "" || autoCreate == null || autoCreate == undefined) {
            var removeElement = true;
            var selector = subComponent.attr('data-component-container');
            var extraData = subComponent.attr('data-component-extra-data');
            var componentId = subComponent.attr('data-component-id');
            var component = frango.getComponent(subComponentName);

            if (!selector) {
                selector = "[data-component-id='" + componentId + "']";
                removeElement = false;
            };

            component["selector_to_bind"] = selector;
            component["componentID"] = componentId;
            if (extraData) {
                component["extra_data"] = extraData;
            };

            component["dataset"] = subComponent.dataset;

            var templateSubElement = frango.find(frango.format('[data-container-template="%s"]', [subComponentName])).html();
            templateSubElement = frango.format('<div data-datasetname="%s">%s</div>', [subComponentName, templateSubElement]);
            subComponent.html(templateSubElement);

            frango.executeComponentController(subComponentName, function (data) {
                if (data) {
                    frango.bindDataOnTemplate(subComponentName, data[subComponentName], frango.activeDocumentToTemplating, false, false);
                };
            });
        };
    });
};

frango.componentsQueue = []


frango.useConfigComponent = function (configComponentName, newPlaceSelector, objectDataSets, replaceContainer, onFinish) {
    
    var result = {};
    var methodOnFinish = onFinish;

    if (replaceContainer === undefined || replaceContainer === null) {
        replaceContainer = true;
    };

    /* result.onFinish = function (method) {
         methodOnFinish = method;
     };*/

    var removeTemplate = function (nameDataSet, doc) {
        frango.find('[data-datasetname="' + nameDataSet + '"]', doc).loop(function () {
            var p = this.parentElement;
            if (p) {
                p.removeChild(this);
            };
        });
    };


    var putTemplate =
        function (dataSet) {
            
            var queue = {};
            
            frango.find('[data-container-template="' + configComponentName + '"]').loop(function () {                
                var originalHtml = this.innerHTML;
                var html = '<div data-datasetname="' + configComponentName + '" >' + originalHtml + '</div>';
                var containerAttributes = this.attributes;
                frango.find(newPlaceSelector).loop(function () {
                    frango.componentsQueue.push(1);
                    if (dataSet) {

                        if (dataSet instanceof Array) {
                            if (dataSet.length > 0) {
                                var tempData = {};
                                tempData[configComponentName] = dataSet;
                                dataSet = tempData;
                            };
                        };

                        var parser = new DOMParser;
                        var tempDoc = parser.parseFromString(html, 'text/html');
                        var templates = Object.keys(dataSet);
                        var nameDatasetEle = undefined;
                        var multipleDatasets = false;


                        if (templates.length > 1) {
                            multipleDatasets = true;
                        };

                        if (multipleDatasets === false) {
                            for (var at in containerAttributes) {
                                if (containerAttributes.hasOwnProperty(at)) {
                                    tempDoc.body.children[0].setAttribute(
                                        containerAttributes[at].name,
                                        containerAttributes[at].value);
                                };
                            };
                        } else {
                            html = originalHtml;
                        };

                        for (var iTemp = 0; iTemp < templates.length; iTemp++) {
                            nameDatasetEle = templates[iTemp];
                            if (dataSet[nameDatasetEle]) {
                                frango.bindDataOnTemplate(nameDatasetEle,
                                    dataSet[nameDatasetEle],
                                    tempDoc);
                            } else {
                                removeTemplate(nameDatasetEle, tempDoc);
                            }
                        };

                        if (templates.length == 0) {
                            tempDoc.body.insertAdjacentHTML('beforeend',
                                frango.find('script[data-datasetname="' + configComponentName + '"]').elements[0].innerHTML);

                            removeTemplate(configComponentName, tempDoc);
                        };


                        if (replaceContainer) {
                            //this.innerHTML = tempDoc.body.innerHTML;
                            this.html(tempDoc.body.innerHTML)
                        } else {
                            this.insertAdjacentHTML('beforeend', tempDoc.body.innerHTML);
                        };

                    } else {

                        if (replaceContainer) {
                            //this.innerHTML = originalHtml;
                            this.html(originalHtml)
                        } else {
                            this.insertAdjacentHTML('beforeend', originalHtml);
                        };
                    };

                    //remove possible not removed data container
                    this.find('[data-datasetname="' + configComponentName + '"]').loop(function () {
                        var html_component = this.innerHTML;
                        //this.parentElement.insertAdjacentHTML("beforeend", html_component);
                        this.addHTMLBeforeBegin(html_component);
                        this.remove();
                    });
                    /*nested components */
                    frango.find("[data-component-name]", this).loop(function () {
                        //get-component          
                        var autoCreate = this.getAttribute('data-auto-create');

                        if (autoCreate == "yes" || autoCreate == "" || autoCreate == null || autoCreate == undefined) {
                            frango.componentsQueue.push(1);
                            var removeElement = true;
                            var selector = this.getAttribute('data-component-container');
                            var extraData = this.getAttribute('data-component-extra-data');
                            var componentId = this.getAttribute('data-component-id');
                            var dataset = this.dataset;
                            if (!selector) {
                                selector = "[data-component-id='" + componentId + "']";
                                removeElement = false;
                            };

                            var component = frango.getComponent(this.getAttribute('data-component-name'));
                            var thisElement = this;

                            var idIntervalNested = setInterval(function () {
                                if (component.occupied == true) {
                                    return;
                                };
                                clearInterval(idIntervalNested);
                                delete queue[[idIntervalNested]];
                                component["selector_to_bind"] = selector;
                                component["componentID"] = componentId;
                                if (extraData) {
                                    component["extra_data"] = extraData;
                                };
                                component["dataset"] = dataset;
                                if (removeElement) {
                                    thisElement.remove();
                                } else {
                                    /*var rmEleList = ['data-component-container', 'data-component-extra-data', 'data-component-id', 
                                      'data-auto-create', 'data-component-name' ];*/
                                    //thisElement.removeAttribute('data-component-name');
                                    //thisElement.remove();
                                };
                                
                                frango.executeComponentController(component["componentName"]);
                                
                                
                            }, 300);

                            queue[[idIntervalNested]] = idIntervalNested;
                            
                        };
                    });
                    frango.componentsQueue.pop();    
                });                                
            });
            if (Object.keys(queue).length > 0) {
                var idIntervalonFineshed = setInterval(function () {
                    if (Object.keys(queue).length == 0) {
                        clearInterval(idIntervalonFineshed);                        
                        
                        if (methodOnFinish) {
                            methodOnFinish();
                        };
                                                

                        /*if(0 === frango.countTemplatesToPut){
                            if(frango.app.onFinishLoadComponent){
                                frango.app.onFinishLoadComponent();
                            }
                        }*/
                    };
                }, 300);
            } else {
                if (methodOnFinish) {
                    methodOnFinish();
                };
                                
                /*if(0 === frango.countTemplatesToPut){
                    if(frango.app.onFinishLoadComponent){
                        frango.app.onFinishLoadComponent();
                    }
                }*/
            };
        };

    frango.getTemplate(configComponentName, function () {
        if (frango.config.isBuildingOfflineApp === false) {            
            putTemplate(objectDataSets);
            
        };
    });

    return result;
}

frango.useConfigComponentDataUrl = function (configComponentName, newPlaceSelector, url, params, replaceContainer) {
    var methodPrepareData = undefined;
    var methodSuccess = undefined;
    var methodFailure = undefined;
    var result = {};

    result.prepareData = function (method) {
        methodPrepareData = method;
        return this;
    };
    result.onSuccess = function (method) {
        methodSuccess = method;
        return this;
    };
    result.onFailure = function (method) {
        methodFailure = method;
        return this;
    };

    frango.server.get(url, params).onSuccess(function (data) {
        var response = JSON.parse(data);
        if (methodPrepareData) {
            response = methodPrepareData(response);
        };
        frango.useConfigComponent(configComponentName, newPlaceSelector, response,
            replaceContainer, function () {
                if (methodSuccess) {
                    methodSuccess();
                };
            });
    }).onFailure(function (data) {
        frango.warning(data);
    });

    return result;

};

frango.fillLookupWaitting = false;

function lookup(selector, force, onFilled) {
    var elementsFound = frango.find(selector);
    var goInServer = false;
    var lookups = []
    elementsFound.loop(function () {
        //frango.fillLookupWaitting = true;
        var filled = this.hasAttribute('data-filled');
        goInServer = true;
        if (filled) {
            if (force === true) {
                this.removeAttribute('data-filled');
                this.find('options').remove();
                goInServer = true;
            } else {
                goInServer = false;
            };
        };
        var url = this.getAttribute('data-lookup-url');
        goInServer = (goInServer && url);
        if (goInServer) {
            var master_val;
            var master_field_name;
            var data = undefined;
            var field_name_value = this.getAttribute('data-lookup-field');
            var field_name_text = this.getAttribute('data-lookup-field2');
            var contentType = this.getAttribute('data-content-type');

            if (this.getAttribute('data-lookup-master')) {

                var parent = frango.find(this.getAttribute('data-lookup-master')).fisrt();
                master_val = parent.value;
                master_field_name = this.getAttribute('data-lookup-master-field');
                data[master_field_name] = master_val;

                if (!parent.getAttribute('data-lookup-event-setted')) {
                    parent.addEventListener('change', function () {
                        this.setAttribute('data-lookup-event-setted', true);
                        this.setAttribute('data-value', this.value);
                        lookup(selector);

                    }, true);
                };

                if (contentType == 'json' || contentType == 'application/json') {
                    data = JSON.stringify(data);
                    contentType = 'application/json';
                };
            } else {
                if (contentType == 'json' || contentType == 'application/json') {
                    data = '{}';
                };
            };
            //var element = this;
            lookups.push({
                "url": url,
                "element": this,
                "field_name_value": field_name_value,
                "field_name_text": field_name_text

            });
        };
    });
    var getData = function (lookupsList) {

        //url
        //element
        var _index = 0;
        var executeOnSuccess = function (data, element, field_name_value, field_name_text) {

            dataJS = JSON.parse(data);
            var html = "";

            for (var row in dataJS) {
                if (dataJS.hasOwnProperty(row)) {
                    html += '<option value="' + dataJS[row][field_name_value] + '">' +
                        dataJS[row][field_name_text] + '</option>';
                };
            };

            element.insertAdjacentHTML('beforeend', html);

            if (element.getAttribute('data-value')) {
                element.value = element.getAttribute('data-value');
            };

            element.setAttribute('data-filled', 'true');
            //element.setAttribute('data-full-object', data);
            frango.fillLookupWaitting = false;
        };


        var executeItens = function () {
            //execute the firstest then call itself for the next;
            if (_index === lookupsList.length) {
                frango.fillLookupWaitting = false;
                if (typeof onFilled == 'function') {
                    onFilled();
                };
            } else {
                frango.ajaxGet({
                    url: lookupsList[_index].url,
                    onSuccess: function (data) {
                        executeOnSuccess(data, lookupsList[_index].element, lookupsList[_index].field_name_value, lookupsList[_index].field_name_text);
                        _index += 1;
                        executeItens();
                    },
                    onFailure: function (data) {
                        _index += 1;
                        console.log('Failure to get lookup on : ' + lookupsList[_index].url);
                        console.log(data);
                        executeItens();
                    },
                    contentType: lookupsList[_index].contentType
                });
            };
        };
        executeItens();
    };


    //

    if (lookups.length === 0) {
        if (typeof onFilled == 'function') {
            onFilled();
        };
    } else {
        getData(lookups);
    };

}

frango.fillLookup = function (selector, onFilled) {
    lookup(selector, false, onFilled);
}

frango.autoComplete = function (selector, methodToGetData, minimumLenth = 3) {
    if (!selector) {
        selector = '.autocomplete.autoload input[data-autocomplete-url]';
    };
    frango.find(selector).loop(function () {

        this.addEventListener('click', function (e) {
            e.stopPropagation();
        });

        var field = this.getAttribute('data-field');
        var img_field = this.getAttribute('data-field-img');
        var img_relative_url = this.getAttribute('data-relative-img-url') || "";
        var text_field = this.getAttribute('data-field-text');
        var url = this.getAttribute('data-autocomplete-url');
        var parent = this.parentElement;
        var search = this;

        var eventChoose = document.createEvent('Event');
        eventChoose.initEvent('choose', true, true);


        if ((url && field && text_field) || (methodToGetData)) {

            var container = document.createElement('div');
            container.setAttribute('class', 'autocomplete-container invisible');
            container = parent.appendChild(container);
            container = frango.find(container);
            this.attr('autocomplete', 'off');

            this.addEventListener('keyup', function (e) {
                var inputValue = this.value;
                if (inputValue.length < minimumLenth) {
                    container.html("");
                    return false;
                } else {
                    inputValue = inputValue.toUpperCase();
                };
                var esc = 27;
                if (e.keyCode === esc) {
                    frango.find('.autocomplete-container', this.parentElement).html("")
                    e.stopPropagation();
                    return false;
                };


                this.setAttribute('data-value', "");
                this.setAttribute('data-text', "");
                if (inputValue == "") {
                    container.html("");
                    return;
                };

                var fillAutoComplete = function (data, useFilter) {
                    if (typeof data != 'object') {
                        data = JSON.parse(data);
                    };

                    var dataMatched = true;

                    var html = '';
                    for (row in data) {
                        if (data.hasOwnProperty(row)) {
                            if (useFilter) {
                                dataMatched = data[row][text_field].toUpperCase().indexOf(inputValue) > -1;
                            };
                            if (dataMatched) {
                                if (img_field) {
                                    html += frango.format('<li data-value="%s" data-text="%s">  ' +
                                        '<img src="%s%s" /> <span>%s</span> </li>', [data[row][field], data[row][text_field],
                                        img_relative_url, data[row][img_field],
                                        data[row][text_field]
                                    ]);
                                } else {
                                    html += frango.format('<li data-value="%s" data-text="%s"> %s </li>', [data[row][field],
                                    data[row][text_field],
                                    data[row][text_field]
                                    ]);
                                };

                            };
                        };
                    };
                    if (html) {
                        //frango.removeClass('invisible', container);
                        container.rmCl('invisible');
                        html = '<ul class="suspend">' + html + '</ul>';
                        //container.innerHTML = html;
                        container.html(html);
                    } else {
                        frango.addClass('invisible', container);
                        //container.innerHTML = "";
                        container.html("");
                    };

                    frango.find('ul li', container.first()).loop(function () {
                        this.addEventListener('click', function () {
                            search.setAttribute('data-value', this.getAttribute('data-value'));
                            search.value = this.getAttribute('data-text');
                            search.dispatchEvent(eventChoose);
                            //container.innerHTML = "";
                            container.html("");
                        });
                    });
                };

                if (methodToGetData) {
                    methodToGetData(function (data) {
                        fillAutoComplete(data, true);
                    });
                } else {
                    frango.server.get(url, text_field + '=' + this.value).
                        onSuccess(fillAutoComplete);
                };

            });
        };
    });

    var body = frango.find('body');
    if (body.attr('autocomplete-configured') != "true") {
        document.addEventListener('click', function () {
            frango.find('.autocomplete-container').loop(function () {
                this.html("");
            });
        });
        body.attr('autocomplete-configured', true);
    };
};

frango.parseFormElements = function (parentSelector, listElements) {
    var frm = frango.find(parentSelector).first();
    var data = "";
    for (var i = 0; i < frm.length; i++) {
        var ele = frm[i];
        if (listElements.includes(ele.getAttribute('name'))) {
            if (ele.type === "checkbox") {
                data += ele.getAttribute("name").toString() + "=" + ele.checked + "&";
            } else {
                data += ele.getAttribute("name").toString() + "=" + ele.value.toString() + "&";
            }
        }
    }
    return data.substr(0, data.length - 1);
}

frango.bindValidations = function (selector, object_erros) {
    frango.find(selector).loop(function () {
        if (typeof object_erros != 'object') {
            object_erros = JSON.parse(object_erros);
        };
        var ele = undefined;
        var lbl = undefined;
        this.find('.errorlist').remove();
        for (key in object_erros) {
            error_ele = document.createElement('div');
            error_ele.setAttribute('class', 'errorlist');

            for (var i = 0; i < object_erros[key].length; i++) {
                error_ele.insertAdjacentHTML('beforeend',
                    '<p>' + object_erros[key][i] + '</p>');
            };
            ele = frango.find('[name="' + key + '"', this).first();
            if (!ele) {
                ele = frango.find('[name="' + key + '_id"', this).first();
            };
            if (ele) {
                //lbl = frango.find(ele.parentNode).find('label').first() || ele;
                var parent = ele.parentNode;
                parent.insertBefore(error_ele, parent.childNodes[parent.childNodes.length - 1]);
            } else {
                this.appendChild(error_ele);
            };
        };
    });

}

frango.scroll = {}

frango.scroll.countUp = 0;
frango.scroll.countDown = 0;
frango.scroll.lastScrollTop = 0;


frango.hideOnScroll = function () {


    window.addEventListener('scroll', function () {

        if (frango.scroll.lastScrollTop <
            (window.pageYOffset || document.documentElement.scrollTop ||
                document.body.scrollTop || 0)) {
            frango.scroll.countDown += 1;
            frango.scroll.countUp = 0;
        } else if (frango.scroll.lastScrollTop >
            (window.pageYOffset || document.documentElement.scrollTop ||
                document.body.scrollTop || 0)) {
            frango.scroll.countDown = 0;
            frango.scroll.countUp += 1;
        };
        if (frango.scroll.countDown == 2) {
            frango.scroll.countDown = 0;
            frango.scroll.countUp = 0;
            frango.find('.hide-scroll').loop(function () {
                this.adCl('no-height');
            });
        } else if (frango.scroll.countUp == 2) {
            frango.scroll.countDown = 0;
            frango.scroll.countUp = 0;
            frango.find('.hide-scroll').loop(function () {
                this.rmCl('no-height');
            });
        };

        frango.scroll.lastScrollTop = window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop || 0;

    });

};

frango.bindFieldValueOnElement = function (fieldElement, selectorToBind) {
    frango.find(selectorToBind).loop(function () {
        var element = this;
        if (['INPUT', 'SELECT'].indexOf(element.tagName) > -1) {
            element.value = fieldElement.value;
        } else {
            element.html(fieldElement.value);
        };
    });
};

frango.onPressEnterClick = function (event, selector, preventDefault) {
    if (event.keyCode != 13)
        return false;

    var ele = frango.find(selector).first();
    if (ele) {
        ele.click();
    };

    if (preventDefault) {
        event.preventDefault();
    };
}

frango.invisibleWhen = function (ele, condition) {
    if (condition === true) {
        frango.addClass('invisible', ele);
    } else {
        frango.removeClass('invisible', ele);
    };
};


frango.currentDate = function () {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    var today = yyyy + '-' + mm + '-' + dd;

    return today;
}

frango.getRemoteDataset = function (datasetName, url, params, methodModifyData) {
    result = {};
    result.execute = function (method) {
        frango.server.get(url, params).onSuccess(function (data) {
            if (methodModifyData) {
                data = methodModifyData(data);
            };
            method(data);
        }).onFailure(function (data) {
            console.log(data);
        });
    };

    return result;
};

frango.getDataSet = function (datasetName, methodGetData) {
    result = {};
    result.execute = function (methodExecute) {
        var data = methodGetData.call();
        methodExecute(data);
    };
    return result;
}

frango.executeComponentController = function (componentName, executeIfCompiling) {
    var component = frango.getComponent(componentName);
    //configComponentName, newPlaceSelector, objectDataSets, replaceContainer
    if (component) {
        //frango.useConfigComponent(component["componentName"], "#app", [], true);

        if (component["controllerMethod"]) {
            /*var newMethod = component["controllerMethod"].clone();
            newMethod(component);*/
            component["controllerMethod"](component, executeIfCompiling);
        } else {
            component.bindData([]);
        };
    };
}

frango.componentsObjects = {};

frango.component = function (componentName) {

    var pathLocalTemplate = undefined;
    //var pathWebTemplate = undefined;
    var htmlText = undefined;
    var objGetData = {};
    var methodController = undefined;
    var result = {};

    var checkIfComponentExists = function (Name) {
        if (frango.componentsObjects[name]) {
            throw frango.format("The component %s already exists on frango.ComponentObjects.", [name]);
        };
    };

    result.setPathLocalTemplate = function (path) {
        pathLocalTemplate = path;
        return this;
    };

    /*result.setPathWebTemplate = function (path) {
        pathWebTemplate = path;
        return this;
    };*/

    result.setHTMLTemplate = function (html) {
        htmlText = html;
        return this;
    };

    result.objectGetData = function (object) {
        objGetData = object;
        return this;
    };

    result.controller = function (method) {
        methodController = method;
        return this;
    };

    result.register = function () {
        checkIfComponentExists(componentName);
        /* var getDataAndExecuteController = function () {
             methodController.call(this, objGetData);
         };*/
        var componentObject = {
            "componentName": componentName,
            "pathLocalTemplate": pathLocalTemplate,
            //"pathWebTemplate": pathWebTemplate,
            "htmlText": htmlText,
            "objectGetData": objGetData,
            "controllerMethod": function (component, executeIfCompiling, activeDocument) {
                if (component.occupied == true) {
                    return;
                };
                component.occupied = true;
                if (methodController) {
                    methodController(component, activeDocument, executeIfCompiling);
                } else {
                    component.bindData([]);
                };
            },
            "selector_to_bind": "#app",
            "extra_data": "",
            "dataset": undefined,
            "bindData": function (data, replaceContent, onFinish) {
                if (replaceContent == undefined || replaceContent == null) {
                    replaceContent = true;
                };
                
                if (!frango.config.isComppiling) {
                    frango.useConfigComponent(this.componentName, this.selector_to_bind, data, replaceContent, function () {
                        frango.getComponent(componentName).occupied = false;
                        if (onFinish) {
                            onFinish.call();
                        };
                        //always resets selector
                        this.selector_to_bind = "#app";
                        if(frango.componentsQueue) frango.componentsQueue.pop();
                        
                    });

                } else {
                    onFinish.call();
                    frango.getComponent(componentName).occupied = false;
                    if(frango.componentsQueue) frango.componentsQueue.pop();
                };
            },
            "componentID": componentName,
            "occupied": false
        };
        frango.componentsObjects[componentName] = componentObject;
        frango.config.component(componentName,
            frango.getComponent(componentName)
        ).prepareComponent();
        return componentObject;
    };

    return result;
}


frango.getComponent = function (name) {
    return frango.componentsObjects[name];
}

frango.createTemplateOnApp = function (templateName, component, datasetName, pathToRowsOndataSet) {
    if (frango.find("[data-container-template='" + templateName + "']").first()) {
        return
    };

    var ele = document.createElement('script');
    ele.setAttribute("type", "text/template");
    if (datasetName) {
        ele.setAttribute("data-datasetname", datasetName);
    };

    if (pathToRowsOndataSet) {
        ele.setAttribute("data-path-to-rows", pathToRowsOndataSet);
    };

    ele.setAttribute("data-container-template", templateName);
    if (component.htmlText) {
        ele.insertAdjacentHTML('afterbegin', component.htmlText);
    } else if (frango.config.isRuningInWeb === false) {
        ele.setAttribute("data-template-url", frango.config.host_local_template +
            component.pathLocalTemplate);
    } else {
        ele.setAttribute("data-template-url", component.pathWebTemplate);
    };

    document.body.appendChild(ele);
};


frango.config = {
    host_local_template: 'http://localhost:8081/',
    isBuildingOfflineApp: false,
    isComppiling: false,
    isRuningInWeb: true,
    usePWA: false,
    loadAllOnStart: false
};

frango.config.component = function (templateName, component) {
    if (typeof component != 'object') {
        throw "The parameter component must be an instance returned by frango.component's register method."
    };

    var datasetName = templateName;
    var pathToRowsOndataSet = undefined;
    var componentInstance = component;
    var executeOnFinish = undefined;
    var getDataMethod = undefined;
    var controllerMethod = undefined;
    var result = {};

    result.setPathToRowsOnDataset = function (path) {
        pathToRowsOndataSet = path;
        return this;
    };

    result.onFinish = function (method) {
        executeOnFinish = method;
        return this;
    };

    result.prepareComponent = function () {
        frango.createTemplateOnApp(templateName,
            componentInstance,
            datasetName,
            pathToRowsOndataSet);
        if (frango.config.isBuildingOfflineApp === true || frango.config.loadAllOnStart === true) {
            frango.getTemplate(templateName, function () {
                if (executeOnFinish) {
                    executeOnFinish();
                    frango.removeTemplateFromBag(templateName);
                };
            });
        };
        //return this;
    };

    result.getRemoteData = function (method) {
        getDataMethod = method;
        return this
    };

    result.controllerMethod = function (method) {
        controllerMethod = method;
        return this;
    };


    result.actionUseConfigComponent = function (elementSelector, eventName,
        placeToPutSelector, replaceContent, methodGetData) {

        var useConfigComponentWithoutData =
            function () {
                frango.createTemplateOnApp(templateName,
                    componentInstance,
                    datasetName,
                    pathToRowsOndataSet);
                frango.useConfigComponent(templateName,
                    placeToPutSelector,
                    undefined,
                    replaceContent, function () {
                        if (executeOnFinish) {
                            executeOnFinish();
                        };
                    });
            };

        var executeConfiguration =
            function () {
                if (methodGetData) {
                    if (methodGetData.execute) {
                        methodGetData.execute(function (data) {

                            frango.createTemplateOnApp(templateName,
                                componentInstance,
                                datasetName,
                                pathToRowsOndataSet);

                            frango.useConfigComponent(templateName,
                                placeToPutSelector,
                                data,
                                replaceContent, function () {
                                    if (executeOnFinish) {
                                        executeOnFinish();
                                    };
                                });
                        });
                    } else {
                        throw "The method used in actionUseConfigComponent must be a  " +
                        "frango.getRemoteDataset or frango.getDataSet.  " +
                        "Otherwhise it must have a method 'execute()' as return";
                    };
                } else {
                    frango.createTemplateOnApp(templateName,
                        componentInstance,
                        datasetName,
                        pathToRowsOndataSet);
                    useConfigComponentWithoutData();
                    if (executeOnFinish) {
                        executeOnFinish();
                    };
                };
            };

        if (frango.config.isBuildingOfflineApp === true || frango.config.loadAllOnStart === true) {
            if (elementSelector == window &&
                eventName.toUpperCase() == "LOAD") {
                executeConfiguration();
            } else {
                frango.createTemplateOnApp(templateName,
                    componentInstance,
                    datasetName,
                    pathToRowsOndataSet);
                frango.getTemplate(templateName, function () {
                    if (executeOnFinish) {
                        executeOnFinish();
                    }
                });
            };
        };
        frango.find(elementSelector).loop(function () {
            if (elementSelector == window &&
                eventName.toUpperCase() == "LOAD") {
                if (!frango.config.isBuildingOfflineApp)
                    executeConfiguration();
            } else {
                this.addEventListener(eventName, executeConfiguration);
            };
        });

        return this;
    };
    return result;
}

frango.setCookie = function (cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";

}

frango.getCookie = function (cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


/*APP CONFIGURATION */
frango.app = {};
frango.app.initializeMethod = undefined;
frango.app.configTemplateMethod = undefined;
frango.app.createComponentsMethod = undefined;
frango.app.afterInitialize = undefined;
frango.app.initialConfiguration = undefined;
frango.app.configureRote = undefined;
frango.app.routes = {};

frango.app.onFinishLoadComponent = function(){
  console.log('fineshed');
};

frango.config.initialConfiguration = function (method) {
    if (method) {
        frango.app.initialConfiguration = method;
    };
};


frango.app.initialize = function (method) {
    if (method) {
        frango.app.initializeMethod = method;
    };
};

frango.app.configureComponents = function (method) {
    if (method) {
        frango.app.configTemplateMethod = method;
    };
};

frango.app.registerComponents = function (method) {
    if (method) {
        frango.app.createComponentsMethod = method;
    };
};

frango.app.afterInitialize = function (method) {
    if (method) {
        frango.app.afterInitialize = method;
    };

};

frango.app.configureRote = function (method) {
    if (method) {
        frango.app.configureRote = method;
    };
};


frango.app.handleChangingRoute = function (method) {
    if (method) {
        frango.app.changingRoute = method;
    };
};

frango.app.intercceptRoute = function () {
    if (frango.app.changingRoute) {
        if (frango.app.changingRoute() == false) {
            return;
        };
    };
    var params = window.location.hash.split('?');
    path = params[0]
    if (path[0] == "#" || path == "") {
        path = "/" + path.substr(1, path.length - 1);
    };
        
    /*document.body.style.position = "absolute";
    document.body.style.left = "100%";
    document.body.style.opacity = "0";*/

    frango.executeComponentController(frango.app.routes[path]);    
    frango.transition.delayElement(document.body);

    /*var interceptedInverval = setInterval(function(){
        //console.log('Id' + interceptedInverval + ' ' + frango.componentsQueue.length);
        //if(0 == frango.componentsQueue.length) 
        clearInterval(interceptedInverval);
        document.body.style.left = "0%";        
        document.body.style.position = "initial";
        document.body.style.opacity = "1";
        
        
    }, 1000);*/

};

frango.transition = {};
frango.transition.delayElement = function(element){
    
    element.style.position = "absolute";
    element.style.left = "100%";    
    
    element.style.opacity = "0";

    var interceptedInverval = setInterval(function(){
        //console.log('Id' + interceptedInverval + ' ' + frango.componentsQueue.length);
        //if(0 == frango.componentsQueue.length) 
        clearInterval(interceptedInverval);
        
    
        element.style.left = "0%";  
        element.style.position = "initial";            
        element.style.opacity = "1";                   
    }, 700);    

}

frango.app.getURLParameters = function () {
    var params = {};
    var splited = window.location.hash.split('?');

    if (splited.length > 0) {
        if (splited[1]) {
            var temp_params = splited[1].split("&");
            var key_val;
            for (var i = 0; i < temp_params.length; i++) {
                key_val = temp_params[i].split("=");
                params[key_val[0]] = decodeURIComponent(key_val[1]);
            };
        };
    };

    return (params);
};


frango.app.getURL = function () {
    var splited = window.location.hash.split('?');
    return splited[0].replace('#', '');
};

frango.app.navigate = function (path) {
    //parameter must contain slash
    var hash = "#" + path.substr(1, path.length - 1);
    window.location.hash = hash;
}

frango.app.setUrlParameters = function (objectParams, newUrl) {
    var keys = Object.keys(objectParams);
    var strParams = "";
    var value = undefined;
    for (var index = 0; index < keys.length; index++) {
        value = objectParams[keys[index]];
        if (value && keys[index]) {
            strParams += keys[index] + '=' + value + '&';
        };
    };
    if (!newUrl) {
        newUrl = frango.app.getURL();
    };
    //strParams = strParams.substr(0, strParams.length - 1)
    frango.app.navigate('#' + newUrl + '?' + strParams);
};


frango.getComponentObject = function (componentName, classView, classControler, configInitialDataObject) {
    var newComponent = {

        controller: function (component, activeDocument, executeIfCompiling) {
            //This implementation permites to create component by url route
            var instanceID = component.componentID;
            newComponent.getInitialData(instanceID, function (data) {
                component.bindData(data, true, function () {
                    /*on finish*/
                    if (!frango.config.isComppiling) {
                        var instanceController = undefined;
                        if (classControler) {
                            instanceController = new classControler();
                        };
                        if (classView) {
                            newComponent.singleInstance = new classView(instanceID, instanceController);
                        };
                    } else {
                        if (frango.isFunction(executeIfCompiling)) {
                            executeIfCompiling(data);
                        };
                    };
                }, activeDocument);
            });

        },

        getInitialData: function (componentID, callBack) {
            var dataTemplate = {
                [[componentName]]: [{
                    id: componentID
                }]
            };
            if (configInitialDataObject) {
                var obj = configInitialDataObject(componentID);
                callBack(obj);
            } else {
                callBack(dataTemplate);
            };
        },

        getInstance: function (componentID, methodToSendInstance) {
            //This implementation permites to create reusable component. 
            //The property data-auto-create in the component html must be setted to "no".            
            frango.useNestedComponent(componentID, function () {
                var component = frango.getComponent(componentName);
                var instanceID = component.componentID;

                newComponent.getInitialData(instanceID, function (data) {
                    component.bindData(data, true, function () {
                        if (!frango.config.isComppiling) {
                            var instanceController = null;
                            if (classControler) {
                                instanceController = new classControler();
                            };
                            if (classView) {
                                var instance = new classView(componentID, instanceController);
                                newComponent.singleInstance = instance;
                                if (methodToSendInstance) {
                                    methodToSendInstance(instance);
                                };
                            };
                        };
                    }, document);
                });
            });
        }
    };

    return newComponent;
};




frango.app.buildOfflineApp = function () {
    frango.config.isBuildingOfflineApp = true;
    runLoadApp();
};


function runLoadApp() {
    if (frango.app.initialConfiguration) {
        frango.app.initialConfiguration.call();
    };
    if (frango.app.initializeMethod) {
        frango.app.initializeMethod.call();
    };

    if (frango.app.createComponentsMethod) {
        frango.app.createComponentsMethod.call();
    };

    if (frango.app.configTemplateMethod) {
        frango.app.configTemplateMethod.call();
    };

    if (frango.app.configureRote) {
        if (Object.keys(frango.templatesToGet).length === 0) {
            frango.app.configureRote.call();
            frango.app.intercceptRoute();
        } else {
            var idTimeoutRoute = setInterval(function () {
                if (Object.keys(frango.templatesToGet).length === 0) {
                    clearInterval(idTimeoutRoute);
                    frango.configureStaticComponents();
                    frango.app.configureRote.call();
                    frango.app.intercceptRoute();
                };
            }, 300);
        };
    };

    /*if (Object.keys(frango.templatesToGet).length === 0) {
        //frango.configureStaticComponents();
        if (frango.app.afterInitialize) {
            frango.app.afterInitialize.call();
        };
    } else {
        var idTimeout = setInterval(function () {
            if (Object.keys(frango.templatesToGet).length === 0) {
                clearInterval(idTimeout);
                //frango.configureStaticComponents();
                if (frango.app.afterInitialize) {
                    frango.app.afterInitialize.call();
                };
            };
        }, 300);
    };*/

    if (frango.app.afterInitialize) {
        var idTimeout = setInterval(function () {
            if (Object.keys(frango.templatesToGet).length === 0) {
                clearInterval(idTimeout);
                //frango.configureStaticComponents();
                frango.app.afterInitialize.call();
            };
        }, 300);
    };

    if (frango.config.isBuildingOfflineApp === true) {
        var idTimeoutBuild = setInterval(function () {
            if (Object.keys(frango.templatesToGet).length === 0) {
                clearInterval(idTimeoutBuild);
                frango.configureStaticComponents();
                frango.find('body').adCl('frango-built');
            };
        }, 400);
    };
};

window.addEventListener('load', function () {
    if (window.location.pathname === '/frango-framework-build-app') {
        frango.app.buildOfflineApp();
    } else if (window.location.hash === '#compile-app') {
        frango.config.isComppiling = true;
        runLoadApp()
    } else {
        frango.config.isBuildingOfflineApp = false;
        frango.config.isComppiling = false;
        runLoadApp()
    };
});

window.onhashchange = function () {
    frango.app.intercceptRoute();
};


