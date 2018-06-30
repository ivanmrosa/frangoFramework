/*csrf for django*/
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

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
    };
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

frango.format = function (str, list) {
    var i = 0;
    var text = str;
    for (i = 0; i <= list.length - 1; i++) {
        text = text.replace("%s", list[i]);
    };
    return text;
};


/************* utils methods*/

frango.createObject = function (proto) {

    function ctor() { }

    ctor.prototype = proto;

    return new ctor();

}

frango.makeChild = function (dad, constructor) {

    var soon = constructor || function () { }

    soon.prototype = frango.createObject(dad.prototype);

    soon.constructor = soon;

    return soon;

}


frango.hasClass = function (cl, element) {

    var clElement = element.getAttribute('class');

    if (!clElement) {

        return false

    };

    var exp = frango.format('^(%s)\\s|^(%s)$|\\s(%s)\\s|\\s(%s)$', [cl.trim(), cl.trim(), cl.trim(),

    cl.trim()
    ]);

    var reg = new RegExp(exp);

    reg.ignoreCase = true;

    return reg.test(clElement.trim());

}

frango.removeClass = function (cl, element) {

    cls = element.getAttribute('class');

    if (!cls)
        return

    var exp = frango.format('^(%s)\\s|^(%s)$|\\s(%s)\\s|\\s(%s)$', [cl.trim(), cl.trim(), cl.trim(),

    cl.trim()
    ]);

    var reg = new RegExp(exp, 'gi');

    element.setAttribute('class', cls.replace(reg, ' '));

}

frango.replace = function (str, strToReplace, strReplaceTo, wholeWordsOnly = false) {
    if(wholeWordsOnly){
      strToReplace = '\\b' + strToReplace + '\\b';
    };
    var reg = new RegExp(strToReplace, 'gi');

    return str.replace(reg, strReplaceTo);

}

frango.replaceMany = function (str, listToReplace, strReplaceTo) {
    var result = str;
    for (var i = 0; i < listToReplace.length; i++) {
        result = frango.replace(result, listToReplace[i], strReplaceTo);
    };
    return result;
}

frango.addClass = function (cl, element) {

    cls = element.getAttribute('class');
    if (cls) {
        cls = cls.trim();
    };

    if (!frango.hasClass(cl, element)) {

        element.setAttribute('class', cls + ' ' + cl.trim());

    }

}

frango.addStyle = function (styleName, value, element) {
    element.style[styleName] = value
};

frango.on = function (eventName, element, method) {
    element.addEventListener(eventName, function (event) {
        method.call(element, event);
    }, false);
}

frango.removeElement = function (element) {
    var parent = element.parentElement;

    if (parent) {
        parent.removeChild(element);
    };
};

frango.attr = function (element, attribute, value) {
    if (value == undefined || value == null) {
        return element.getAttribute(attribute);
    } else {
        element.setAttribute(attribute, value);
        return undefined;
    }
};


frango.setOffset = function (element, params) {
    if ('left' in params) {
        element.offsetLeft = params.left;
    };
    if ('top' in params) {
        element.offsetTop = params.top;
    };
    if ('with' in params) {
        element.offsetWidth = params.width;
    };
    if ('height' in params) {
        element.offsetHeight = params.height;
    };
};

frango.setHTML = function (element, html) {
    element.innerHTML = html;
};

frango.addHTML = function (element, position, html) {
    element.insertAdjacentHTML(position, html);
};


frango.loopElements = function (listOfElements, routine) {

    if (listOfElements) {

        for (var i = 0; i < listOfElements.length; i++) {

            listOfElements[i].hasClass = function (cl) {

                return frango.hasClass(cl, listOfElements[i])

            }

            listOfElements[i].rmCl = function (cl) {

                frango.removeClass(cl, listOfElements[i])

            };

            listOfElements[i].adCl = function (cl) {

                frango.addClass(cl, listOfElements[i])

            };

            listOfElements[i].find = function (selector) {
                return frango.find(selector, this)
            };

            listOfElements[i].adSty = function (styleName, value) {
                frango.addStyle(styleName, value, listOfElements[i]);
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
                frango.on(eventName, listOfElements[i], method)
            };

            listOfElements[i].offset = function (params) {
                frango.setOffset(listOfElements[i], params)
            };

            listOfElements.html = function (html) {
                frango.setHTML(listOfElements[i], html);
            };

            listOfElements.addHTMLBeforeBegin = function (html) {
                frango.addHTML(listOfElements[i], 'beforebegin', html);
            };

            listOfElements.addHTMLAfterBegin = function (html) {
                frango.addHTML(listOfElements[i], 'afterbegin', html);
            };
            listOfElements.addHTMLBeforeEnd = function (html) {
                frango.addHTML(listOfElements[i], 'beforeend', html);
            };
            listOfElements.addHTMLAfterEnd = function (html) {
                frango.addHTML(listOfElements[i], 'afterend', html);
            };


            routine.call(listOfElements[i]);
        };

    };

}

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
            };
        };
    };

    this.result = {};

    this.result.loop = function (routine) {
        frango.loopElements(this.elements, routine);
    };

    this.result.rmCl = function (class_name) {
        for (var i = 0; i <= this.elements.length - 1; i++) {
            frango.removeClass(class_name, this.elements[i])
        }
    };
    this.result.adCl = function (class_name) {
        for (var i = 0; i <= this.elements.length - 1; i++) {
            frango.addClass(class_name, this.elements[i])
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
        };
    };

    this.result.find = function (selector) {
        var allFound = [];
        var found = []
        for (var i = 0; i < this.elements.length; i++) {
            found = /*frango.find(selector, this.elements[i])*/  this.elements[i].querySelectorAll(selector);
            if (found) {
                allFound = allFound.concat(Array.prototype.slice.call(found));
            };
        };
        //this.elements = allFound;
        var newFind = new frango.find();
        newFind.elements = allFound;
        return newFind;
    };

    this.result.adSty = function (styleName, value) {
        for (var i = 0; i < this.elements.length; i++) {
            frango.addStyle(styleName, value, this.elements[i]);
        };
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
        };
    };

    this.result.attr = function (attribute, value) {
        if (value != undefined || value != null) {
            for (var i = 0; i < this.elements.length; i++) {
                frango.attr(this.elements[i], attribute, value);
            };
            return undefined;
        } else {
            return frango.attr(this.elements[0], attribute, value);
        };
    };

    this.result.html = function (html) {
        for (var i = 0; i < this.elements.length; i++) {
            frango.setHTML(this.elements[i], html);
        };
    };
    this.result.addHTMLBeforeBegin = function (html) {
        for (var i = 0; i < this.elements.length; i++) {
            frango.addHTML(this.elements[i], 'beforebegin', html);
        };
    };

    this.result.addHTMLAfterBegin = function (html) {
        for (var i = 0; i < this.elements.length; i++) {
            frango.addHTML(this.elements[i], 'afterbegin', html);
        };
    };
    this.result.addHTMLBeforeEnd = function (html) {
        for (var i = 0; i < this.elements.length; i++) {
            frango.addHTML(this.elements[i], 'beforeend', html);
        };
    };
    this.result.addHTMLAfterEnd = function (html) {
        for (var i = 0; i < this.elements.length; i++) {
            frango.addHTML(this.elements[i], 'afterend', html);
        };
    };
    
    this.result.hasClass = function(cl){
       var ele = this.elements[0];
       if(ele){
          return frango.hasClass(cl, ele);
       }else{
          return ele;
       };
    };

    this.result.elements = this.foundElements;

    return this.result;

}


/*popus e dialogos*/
frango.popup = {}
frango.popup.opened = false;


frango.popup.openPopup = function (select, executeAfter) {
    var ele = frango.find(select).first();

    if (!ele) {
        ele = frango.find("#" + select).first();
    };

    if (ele) {
        if (frango.find(ele).attr('data-popup-configured') != 'yes' &&
            frango.find(ele).attr("data-automaticly-close") != "no") {
            frango.find(ele).attr('data-popup-configured', 'yes');
            frango.find(ele).on('click', function (event) {
                e = event || window.event;
                var target = e.target || e.srcElement;
                frango.find(target).loop(function () {
                    if (this.hasClass('popup')) {
                        frango.popup.closePopup(select, executeAfter);
                    };
                });
            });
        };

        frango.removeClass('popup-hide', ele);
        frango.addClass('popup-show', ele);
    }
    frango.popup.opened = true;

}

frango.popup.closePopup = function (id_filter, fnToExecuteAfter) {


    var ele = frango.find(id_filter).first();

    if (!ele) {
        ele = frango.find("#" + id_filter).first();
    };

    if (ele) {
        frango.removeClass('popup-show', ele);
        frango.addClass('popup-hide', ele);
    }

    frango.popup.opened = false;

    if (fnToExecuteAfter) {
        fnToExecuteAfter.call();
    }

}

frango.popup.removePopup = function (id_filter, fnToExecuteAfter) {
    var ele = frango.find("#" + id_filter).remove();
    if (fnToExecuteAfter) {
        fnToExecuteAfter.call();
    }
}



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
        document.querySelector('body').appendChild(popupE);
    } catch (e) {
        console.log(e);
    };
    document.getElementById("vmsisMsgBtn").executeAfter = fnToExecuteAfter;
    document.getElementById("vmsisMsgBtn").addEventListener('click', function () {
        frango.popup.removePopup("vmsisMsg", this.executeAfter);
    });

    frango.popup.openPopup('vmsisMsg');
    frango.find('#vmsisMsgBtn').first().focus();
}

frango.confirm = function (message, executeIfTrue, executeIfFalse) {
    var html =
        '  <div class="popup-body popup-dlg small-radius bck-white">	' +
        '    <h2 class="red title">Confirmação ! </h2> ' +
        '    <p><center> ' + message + ' </center> </p>' +
        '   <div> <a href="javascript:void()" id="vmsisMsgBtnYes" class="btn btn-primary">Sim</a> ' +
        '    <a href="javascript:void()" id="vmsisMsgBtnNo" class="btn btn-danger">Não</a> </div>' +
        '  </div> ';

    var popupE = document.createElement('div');
    popupE.setAttribute('class', 'popup small-radius slow-hide');
    popupE.setAttribute('id', 'vmsisMsg');
    popupE.insertAdjacentHTML('beforeend', html);

    try {
        document.querySelector('body').appendChild(popupE);
    } catch (e) {
        console.log(e);
    };

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
}


frango.controle_cliques = 0;

function hideMenu(e) {
    frango.controle_cliques = 0;
    var menuList = document.querySelector('.menu-content');
    var menuShow = document.querySelector('.menu');
    var content = document.querySelector('.menu-content > ul');
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
    };
    frango.find('.hide-scroll').rmCl('no-height');
    var menuList = document.querySelector('.menu-content');
    if (menuList) {
        var menuShow = document.querySelector('.menu');
        var visible = frango.hasClass("menu-full", menuList);
        var content = document.querySelector('.menu-content > ul');
        if (!visible) {
            frango.addClass("menu-full", menuList);
            frango.addClass("menu-full", menuShow)
            menuList.setAttribute("style", "display:table !important;");
            menuShow.setAttribute("style", "height:100%");
            content.setAttribute("style", "display:table");
            frango.escodermenu = true;
        };
    };
};


frango.loadMenu = function () {
    var menu = document.querySelector('.menu');
    if (menu) {
        var resize = function () {
            frango.controle_clicques = 0;
            var opened = document.querySelector('.menu .menu-content.menu-full');
            var btn = document.querySelector('.menu .mnu-button');

            btn.removeEventListener('click', control_click, true);
            document.removeEventListener('click', hideMenu);
            if (!opened) {
                btn.addEventListener('click', control_click, true);
                document.addEventListener('click', hideMenu, true);
            };
        };

        window.addEventListener('resize', resize);
        window.addEventListener('load', resize);
        resize();
    };

    frango.find('.menu ul li').loop(function () {
        this.addEventListener('click', function () {
            frango.find('.menu ul li').rmCl('active');
            this.setAttribute('class', this.getAttribute('class') + ' ' + 'active');
        }, true);
    });

}



frango.contextMenu = function (executeOnInitialize, idContext) {
    if (idContext) {
        var context_id = '#' + idContext
    } else {
        var context_id = "";
    }

    frango.find(context_id + ".contextmenu").loop(function () {
        var element = frango.find(this);
        element.adSty("display", "none");

        var parent = frango.find(element.attr("data-container"));
        if (parent.length == 0 && element.attr("data-container").substr(0, 1) != '#') {
            parent = frango.find("#" + element.attr("data-container"));
        };
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
        };
    });
};

frango.showLocalImage = function (input, img) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            img.setAttribute('src', e.target.result)
        };
        reader.readAsDataURL(input.files[0]);
    };
}

frango.canUploadFile = function () {
    if (navigator.userAgent.match(/(Android (1.0|1.1|1.5|1.6|2.0|2.1))|(Windows Phone (OS 7|8.0))|(XBLWP)|(ZuneWP)|(w(eb)?OSBrowser)|(webOS)|(Kindle\/(1.0|2.0|2.5|3.0))/) ||
        !(window.File && window.FileReader && window.FormData)
    ) {
        return false;
    }
    var elem = document.createElement('input');
    elem.type = 'file';
    return !elem.disabled;
}

frango.isMobileDevice = function () {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true;
    } else {
        return false;
    }
}


frango.wait = {}

frango.wait.start = function (parent) {
    var parent = parent || frango.find('body').first();
    var ele = document.createElement('div');
    ele.setAttribute('class', 'wait');
    var main = document.createElement('div');
    main.setAttribute('class', 'wait-body');
    main.appendChild(ele);
    parent.appendChild(main);
}

frango.wait.stop = function (parent, clearAll) {
    if (clearAll === true) {
        frango.find('.wait-body').remove();
    } else {
        var parent = parent || frango.find('body').first();
        var wait = frango.find('.wait-body', parent).first()
        if (wait) {
            parent.removeChild(wait);
        };
    };
}

frango.touch = {};

frango.touch.tab = {};


frango.touch.tab.oldX = 0;
frango.touch.tab.oldy = 0;
frango.touch.tab.startx = 0;
frango.touch.tab.starty = 0;
frango.touch.tab.scrolling = false;

frango.touch.tab.addSlowMoviment = function (tabBodies) {
    tabBodies.adCl('slow-vertical-moviment');
};
frango.touch.tab.removeSlowMoviment = function (tabBodies) {
    tabBodies.rmCl('slow-vertical-moviment');
};


frango.touch.tab.moveX = function (elementTouched, posX, locked, slowMove) {
    var bodies = frango.find('.tab-body', elementTouched);
    var tot = bodies.elements.length;
    var leftLast = bodies.elements[tot - 1].offsetLeft;
    var leftFirst = bodies.elements[0].offsetLeft;
    var newLeft = 0;
    var movied = false;

    if (slowMove) {
        frango.touch.tab.addSlowMoviment(bodies);
    };

    bodies.loop(function () {
        if (posX < frango.touch.tab.oldX) {

            //puxar para esquerda
            if (locked != 'left') {
                movied = true;
                if ((leftLast - (frango.touch.tab.oldX - posX) <= 0)) {
                    newLeft = (this.offsetLeft - leftLast);
                } else {
                    newLeft = (this.offsetLeft - (frango.touch.tab.oldX - posX));
                };

                if (this.getAttribute('data-index') == tot && newLeft <= 0) {
                    this.style.left = 0 + "px";
                    elementTouched.setAttribute('data-locked', 'left');
                } else {
                    this.style.left = newLeft + "px";
                    elementTouched.setAttribute('data-locked', 'not');
                };
            };
        } else if (posX > frango.touch.tab.oldX) {

            //puxar para a direita
            if (locked != 'right') {
                movied = true;
                if (leftFirst + (posX - frango.touch.tab.oldX) >= 0) {
                    newLeft = this.offsetLeft + Math.abs(leftFirst);
                } else {
                    newLeft = (this.offsetLeft + (posX - frango.touch.tab.oldX));
                };

                if (this.getAttribute('data-index') == 1 && newLeft >= 0) {
                    this.style.left = 0 + "px";
                    elementTouched.setAttribute('data-locked', 'right');
                } else {
                    this.style.left = newLeft + "px";
                    elementTouched.setAttribute('data-locked', 'not');
                };
            };
        };
    });

    return movied;

}

frango.touch.moveY = function (elementTouched, posY, locked, slowMove) {

}



frango.touch.tab.handleMoviment = function (event) {

    var elementTouched = this;
    var touches = event.changedTouches;

    if (frango.touch.tab.scrolling == false) {

        var locked = elementTouched.getAttribute('data-locked');
        frango.touch.tab.moveX(elementTouched, touches[0].pageX, locked, false);
    };
    frango.touch.tab.oldX = touches[0].pageX;
    frango.touch.tab.oldy = touches[0].pageY;


}

frango.touch.tab.startTouch = function (event) {
    //event.preventDefault();
    var touches = event.changedTouches;
    var elementTouched = this;
    frango.touch.tab.oldX = touches[0].pageX;
    frango.touch.tab.oldy = touches[0].pageY;
    frango.touch.tab.startx = touches[0].pageX;
    frango.touch.tab.starty = touches[0].pageY;
    frango.touch.tab.removeSlowMoviment(frango.find('.tab-body', elementTouched));

};

frango.touch.tab.endTouch = function (event) {
    //event.preventDefault();
    var elementTouched = this;
    var width = elementTouched.offsetWidth;
    var bodies = frango.find('.tab-body', elementTouched);
    var movedEnough = false;
    var locked = elementTouched.getAttribute('data-locked');


    if (frango.touch.tab.oldX > frango.touch.tab.startx) {
        //puxada para a direita

        bodies.loop(function () {
            if ((this.offsetLeft > 0) && (this.offsetLeft >= width * 0.50) && (!movedEnough)) {
                frango.touch.tab.oldX = this.offsetLeft;
                frango.touch.tab.moveX(elementTouched, width, locked, true);
                movedEnough = true;
                if (locked != 'right') {
                    frango.find('.tab-body', elementTouched).rmCl('active');
                    frango.find('.tab', elementTouched.parentElement).rmCl('active');

                    var activeBody = bodies.elements[this.getAttribute('data-index') - 2];
                    frango.addClass('active', activeBody);

                    frango.find('[data-body=' + activeBody.getAttribute('name') + "]").adCl('active');
                };
            };
        });
        if (!movedEnough && locked != 'right') {
            frango.touch.tab.moveX(elementTouched, frango.touch.tab.startx, locked, true);
        };
    } else if (frango.touch.tab.oldX < frango.touch.tab.startx) {
        //puxada para a esquerda

        bodies.loop(function () {
            if ((this.offsetLeft > 0) && (this.offsetLeft <= width * 0.50) && (!movedEnough)) {
                frango.touch.tab.oldX = this.offsetLeft;
                frango.touch.tab.moveX(elementTouched, 0, locked, true);
                movedEnough = true;
                if (locked != 'left') {
                    frango.find('.tab-body', elementTouched).rmCl('active');
                    frango.find('.tab', elementTouched.parentElement).rmCl('active');
                    frango.addClass('active', this);
                    frango.find('[data-body=' + this.getAttribute('name') + "]").adCl('active');
                };
            };
        });
        if (!movedEnough && locked != 'left') {
            frango.touch.tab.moveX(elementTouched, frango.touch.tab.startx, locked, true);
        };
    };


    frango.touch.tab.oldX = 0;
    frango.touch.tab.oldy = 0;

};

frango.touch.tab.config = function (tabBodyGroup) {
    if (!frango.isMobileDevice()) {
        return;
    };
    tabBodyGroup.on("touchmove", frango.touch.tab.handleMoviment);
    tabBodyGroup.on("touchstart", frango.touch.tab.startTouch);
    tabBodyGroup.on("touchend", frango.touch.tab.endTouch);

    var checkScrolling = function () {
        var idIntervalScrolling = setInterval(function () {
            clearInterval(checkScrolling);
            frango.touch.tab.scrolling = false;
        }, 1000);
    };

    frango.find('.tab-body').on('scroll', function () {
        frango.touch.tab.scrolling = true;
        checkScrolling();
    });
}


frango.tab = function (selector, touchEnabled) {
    var setTabsInitialSize = function (pageControl, tabWidth, tabBodies, pageControlWidth, resizing) {

        pageControl.find('.tab-group').adSty('width', pageControlWidth + "px");
        //pageControl.find('.tab').adSty('min-width', tabWidth + "px");
        pageControl.find('.tab-body-group').adSty('width', pageControlWidth + "px");
        var index = 0;
        var activeIndex = pageControl.find('.tab-body.active').first().getAttribute('data-index');
        if (!activeIndex) {
            activeIndex = 1;
        };
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
            };

        });
    };

    var configureClick = function (pageControl, tabBodies, tabs) {
        tabs.on('click', function () {
            var pageControlWidth = pageControl.offsetWidth;
            frango.touch.tab.addSlowMoviment(tabBodies);
            var tab = frango.find(this);
            var newActiveBody = pageControl.find('[name="' + tab.first().
                getAttribute('data-body') + '"]');
            var newActiveIndex = newActiveBody.first().getAttribute('data-index');
            var oldActiveIndex = pageControl.find('.tab-body.active').first().getAttribute('data-index');
            pageControl.find('.tab-body').rmCl('active');
            pageControl.find('.tab').rmCl('active');
            tab.adCl('active');
            newActiveBody.adCl('active');

            var index = 0
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
            };
        });
    };

    var configureEventChangeTab = function (pageControl) {
        /*event*/
        var eventChange = document.createEvent('Event');
        eventChange.initEvent('changeTab', true, true);
        var identifier = setInterval(function () {
            var tabActive = pageControl.find('.tab.active').attr('data-body');
            if (!tabActive) {
                clearInterval(identifier);
            };
            var lastActive = pageControl.attr('data-last-active');
            if (!lastActive) {
                pageControl.attr('data-last-active', tabActive);
            } else {
                if (lastActive != tabActive) {
                    pageControl.attr('data-last-active', tabActive);
                    pageControl.dispatchEvent(eventChange);
                };
            };
        }, 300)
    };

    var configurePageControls = function (resizing) {
        var pgcSelector = selector || '.page-control';
        frango.find(pgcSelector).loop(function () {

            var pageControl = this;
            var paretElWidth = pageControl.parentElement.offsetWidth;

            pageControl.adSty('width', paretElWidth + "px");

            var tabs = pageControl.find('.tab')
            var tabsCount = tabs.elements.length;
            var pageControlWidth = pageControl.offsetWidth;
            var tabWidth = Math.floor(pageControlWidth / tabsCount);
            var tabBodies = pageControl.find('.tab-body');

            setTabsInitialSize(pageControl, tabWidth, tabBodies, pageControlWidth, resizing);

            if (!resizing) {
                configureClick(pageControl, tabBodies, tabs);
                if (touchEnabled == true) {
                    frango.touch.tab.config(pageControl.find('.tab-body-group'));
                };

            };

            configureEventChangeTab(pageControl);
        });
    };
    frango.find(window).on('resize', function () {
        configurePageControls(true);
    });
    configurePageControls(false);


}


/*LOCAL STORAGE DATA*/

frango.storage = {};

frango.storage.create = function (name) {

    if (localStorage.getItem(name) == null) {

        localStorage.setItem(name, []);

    };

}

frango.storage.drop = function (name) {

    if (localStorage.getItem(name) != null) {

        localStorage.removeItem(name);

    };

}

frango.storage.get = function (name) {

    frango.storage.create(name);

    var sto = localStorage.getItem(name);

    var result = {};

    result.name = name;

    result.storage = eval(sto) || [];

    result.insert = function (data) {

        this.storage.push(data);

    };

    result.select = function (filter) {

        var rows = []

        for (var a = 0; a <= this.storage.length - 1; a++) {

            var row = this.storage[a];

            var expression = frango.replace(filter, 'field\\[', 'row[');

            if (eval(expression)) {

                rows.push(row);

            }

        }

        return rows;

    }

    result.delete = function (filter) {

        for (var a = this.storage.length - 1; a >= 0; a--) {

            var row = this.storage[a];

            var expression = frango.replace(filter, 'field\\[', 'row[');

            if (eval(expression)) {

                this.storage.splice(a, 1);

            }

        }

    }

    result.update = function (filter, objectFieldValue) {

        for (var a = this.storage.length - 1; a >= 0; a--) {

            var row = this.storage[a];

            var expression = frango.replace(filter, 'field\\[', 'row[');

            if (eval(expression)) {

                for (var b in objectFieldValue) {

                    this.storage[a][b] = objectFieldValue[b];

                }

            }

        }

    }

    result.save = function () {

        localStorage.setItem(this.name, JSON.stringify(this.storage));

    }

    return result;

}

/*data server*/

frango.server = {}

frango.server.authorization = undefined;

frango.server.persistentHeaders = {};

frango.server.host_url = undefined;

frango.server.ajax = function (url, data, async, objectHeader, useFrangoHost, useAuthorization, requestMethod, contentType) {
    var newUrl = url;
    var result = {};
    var routineOk = undefined;
    var routineNotOk = undefined;
    var finalData = "";
    if (!objectHeader) {
        objectHeader = {};
    };
    switch (contentType) {
        case "application/json":
            objectHeader["Accept"] = "application/json, text/javascript";
            break;
        case "json":
            objectHeader["Accept"] = "application/json, text/javascript";
            contentType = "application/json";
            break;
        case "application/xml":
            objectHeader["Accept"] = "application/xml, text/xml";
            break;
        case "text/html":
            objectHeader["Accept"] = "text/html";
        case "text/plain ":
            objectHeader["Accept"] = "text/plain";
        default:
            //objectHeader["Accept"] = "*";
            break;
    };

    var hasContentypeOnHeader = (contentType != undefined && contentType != null && contentType != "");
    if (useFrangoHost === undefined || useFrangoHost == null) {
        useFrangoHost = true;
    };
    if (useAuthorization == undefined || useAuthorization == null) {
        useAuthorization = true;
    };

    result.onSuccess = function (method) {
        if (method) {
            routineOk = method;
        };
        return this;
    };
    result.onFailure = function (method) {
        if (method) {
            routineNotOk = method;
        };
        return this;
    };

    if (async === undefined || async === null || async === '') {
        async = true;
    };

    if (frango.server.host_url && useFrangoHost === true) {
        newUrl = frango.server.host_url + url;
    };

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        try {
            if (xhttp.readyState == 4) {
                if (xhttp.status == 200 || xhttp.status == 201 || xhttp.status == 204) {
                    routineOk(xhttp.responseText, xhttp.status);
                } else {
                    routineNotOk(xhttp.responseText, xhttp.status);
                };
            };
        } catch (e) {
            frango.wait.stop(undefined, true);
            frango.warning('An error has ocurred. </br>' + e);
            throw e;
        };
    };

    if (data) {
        if (typeof data === 'object' && (hasContentypeOnHeader === false || requestMethod == 'GET')) {
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    finalData += key + "=" + data[key] + "&";
                };
            };
            finalData = finalData.substr(0, finalData.length - 1);
        } else {
            finalData = data;
        };
    };

    if (finalData != "" && requestMethod == 'GET') {
        xhttp.open(requestMethod, newUrl + '?' + finalData, async);
    } else {

        xhttp.open(requestMethod, newUrl, async);
    };


    if (objectHeader) {
        for (var obj in objectHeader) {
            if (objectHeader.hasOwnProperty(obj)) {
                xhttp.setRequestHeader(obj, objectHeader[obj]);
            };
        };
    };

    if (frango.server.persistentHeaders) {
        for (var obj in frango.server.persistentHeaders) {
            if (frango.server.persistentHeaders.hasOwnProperty(obj)) {
                xhttp.setRequestHeader(obj, frango.server.persistentHeaders[obj]);
            };
        };
    };

    if (requestMethod != 'GET') {
        if (hasContentypeOnHeader === true) {
            xhttp.setRequestHeader("Content-Type", contentType);
        } else {
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        };

        if (!csrfSafeMethod(requestMethod) && !this.crossDomain) {
            xhttp.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
        };
    };

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
    var url = objectParams["url"];
    var data = objectParams["data"];
    var async = objectParams["async"];
    var objectHeader = objectParams["header"];
    var useFrangoHost = objectParams["useFrangoHost"];
    var useAuthorization = objectParams["useAuthorization"];
    var onSuccess = objectParams["onSuccess"];
    var onFailure = objectParams["onFailure"]
    var contentType = objectParams["contentType"]
    frango.server.ajax(url, data, async, objectHeader, useFrangoHost, useAuthorization, requestMethod, contentType).onSuccess(function (data, status) {
        if (onSuccess) {
            onSuccess(data, status);
        };
    }).onFailure(function (data, status) {
        if (onFailure) {
            onFailure(data, status);
        };
    });
}

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
    to_be_replaced = params[0];
    replace_to = params[1];
    return  frango.replace(value, to_be_replaced, replace_to);
};

frango.templatesFunctions.replaceWholeWord = function (value, params) {
    to_be_replaced = params[0];
    replace_to = params[1];
    return  frango.replace(value, to_be_replaced, replace_to, true);
};


frango.templatesFunctions.default = function (value, defa, field) {

    if (!value || value == field) {
        return defa[0];
    } else {
        return value
    };

}

frango.templatesFunctions.ternary = function (value, params) {
    var exptectedVal = params[0];
    var valIfTrue = params[1];
    var valIFalse = params[2];
    var isTrue = (value == exptectedVal)
    return isTrue ? valIfTrue : valIFalse;
}

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
frango.bindDataOnTemplate = function (datasetName, data, parent, empty) {
    if (typeof data != 'object') {
        data = JSON.parse(data);
    };

    if (empty === true) {
        data = [{}];
    } else {
        if (data.length === 0) {
            frango.find("[data-datasetname-empty='" + datasetName + "']", parent).loop(function () {
                this.rmCl('hide');
            });
            return
        } else {
            frango.find("[data-datasetname-empty='" + datasetName + "']", parent).loop(function () {
                this.adCl('hide');
            });
        };
    };
    var extractFieldsAndFunctions = function (key) {
        var splited = key.split(":");
        var functions = [];

        for (var i = 1; i < splited.length; i++) {
            functions.push(splited[i]);
        };

        return { "field": splited[0], "functions": functions };
    };

    var prepareTemplateBeforeBind = function (templateText) {
        var text = templateText;
        text = frango.replace(text, "href *= *' */", "href='#");
        text = frango.replace(text, 'href *= *" */', 'href="#');
        text = frango.replace(text, "\n\\[\\(\\(ELIMINATE\\)\\)\\]", "");
        return text;
    };

    frango.find('[data-datasetname="' + datasetName + '"]', parent).loop(function () {
        var template_container = this;
        var template = "";
        var pathToRows = this.getAttribute('data-path-to-rows');
        var isSelfContainer = this.hasAttribute('data-self');
        if (isSelfContainer) {
            var parentEle = document.createElement('div');
            var thisClone = this.cloneNode(true);
            thisClone.removeAttribute('data-datasetname');
            parentEle.appendChild(thisClone);
            template = parentEle.innerHTML;
        } else {
            template = this.innerHTML;
        };

        if (pathToRows) {
            var pathRowList = pathToRows.split('.');
            var tempData = data;
            for (var i = 0; i < pathRowList.length; i++) {
                tempData = tempData[pathRowList[i]];
            };
            data = tempData;
        };

        var parser = new DOMParser();
        var finalTemplate = "";
        var rowData;
        var selectedRowData;
        var rowTemplate;
        var pathCol;
        var extractedFieldsAndFunctions = {};

        for (var row = 0; row < data.length; row++) {
            rowData = data[row];
            rowTemplate = frango.replace(template, " *\\}\\]", "}]\n[((ELIMINATE))]");
            if (empty === true) {
                rowTemplate = frango.replace(rowTemplate, "\\[\\{ *.*\\ *}\\]", '');
            } else {
                var rgex = new RegExp('\\[\\{ *\\( *' + datasetName + ' *\\) *.* *\\}\\]', 'g');
                var match = rowTemplate.match(rgex);
                //var match = rowTemplate.match(/\[\{.*\}\]/g);
                if (match) {
                    for (var col = 0; col < match.length; col++) {
                        selectedRowData = rowData;

                        /* pathCol = frango.replace(
                             frango.replace(match[col], "\\[{", ""),
                             "}\\]", "");*/
                        pathCol = frango.replaceMany(match[col], ["\\[{ *", " *}\\]", " *\\( *" + datasetName + " *\\) *"], "");
                        extractedFieldsAndFunctions = extractFieldsAndFunctions(pathCol);
                        var pathColList = extractedFieldsAndFunctions.field.split('.');

                        for (var nameCol = 0; nameCol < pathColList.length; nameCol++) {
                            selectedRowData = selectedRowData[pathColList[nameCol]];
                        };

                        if (extractedFieldsAndFunctions.functions.length > 0) {
                            if (selectedRowData != undefined && selectedRowData != null) {
                                selectedRowData = frango.applyTemplateFunctions(selectedRowData,
                                    extractedFieldsAndFunctions.functions, extractedFieldsAndFunctions.field);
                            } else {
                                if (extractedFieldsAndFunctions.functions.length > 0) {
                                    selectedRowData = frango.applyTemplateFunctions(extractedFieldsAndFunctions.field,
                                        extractedFieldsAndFunctions.functions, extractedFieldsAndFunctions.field);
                                };
                            };
                        };

                        if (selectedRowData != undefined && selectedRowData != null) {
                            var reg = new RegExp("\\[{ *" + "\\( *" + datasetName + " *\\) *" + pathCol + " *}\\]", "g")
                            rowTemplate = frango.replace(rowTemplate, reg,
                                selectedRowData);
                        };
                    };
                };
            };
            rowTemplate = prepareTemplateBeforeBind(rowTemplate);
            finalTemplate += rowTemplate;
        };

        template_container.parentNode.insertAdjacentHTML('beforeend', finalTemplate);
        frango.find(template_container).remove();
    });

}

frango.bindEmptyDataset = function (datasetName, parent) {
    frango.bindDataOnTemplate(datasetName, null, parent, true);
    frango.fillLookup('[data-replicated-dataset="' + datasetName + '"] [data-lookup-url]')
}

frango.removeReplicatedDataset = function (datasetName, parent) {
    frango.find('[data-replicated-dataset="' + datasetName + '"]', parent).loop(function () {
        this.parentNode.removeChild(this);
    });
}

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
    var data = "{";
    for (var i = 0; i < frm.length; i++) {
        var ele = frm[i];
        var value = "";
        var valueAsObject = ele.hasAttribute('data-value-as-object');
        var name = ele.getAttribute("name").toString();
        if (ele.type === "checkbox") {
            value = ele.checked.toString();
            //data += '"' + ele.getAttribute("name").toString() + '":"' + ele.checked.toString() + '",';
        } else {
            value = ele.value.toString();
            //data += '"' + ele.getAttribute("name").toString() + '":"' + ele.value.toString() + '",';
        };
        if (valueAsObject) {
            var lookupField = frango.find(ele).attr("data-lookup-field");
            value = "{" + '"' + lookupField + '"' + ":" + '"' + value + '"' + "}";
            data += '"' + name + '":' + value + ',';
        } else {
            data += '"' + name + '":"' + value + '",';
        };

    }

    return JSON.parse(data.substr(0, data.length - 1) + "}");
}


frango.bindDataObjectOnForm = function (selector, data) {
    if (Object.keys(data).length == 0) {
        return;
    };

    var elements = frango.find(selector).first().elements;
    for (var index = 0; index < elements.length; index++) {
        var element = elements[index];
        //item[element.name] = element.selectedOptions[0].text;
        if (element.name in data) {
            element.value = data[element.name];
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
}

frango.removeTemplateFromBag = function (template_name, template) {
    if (frango.templatesBag[template_name]) {
        delete frango.templatesBag[template_name];
    };
}

frango.templatesToGet = {}
frango.freeToGetTemplate = true;

frango.getTemplate = function (templateName) {
    var result = {};
    var executeSuccess;
    var executeFailure;
    var containers = frango.find('[data-container-template="' + templateName + '"]');

    result.onSuccess = function (method) {
        if (method) {
            if (!this.templateBinded) {
                executeSuccess = method;
            } else {
                method(this.templateBinded);
            };
        };
        return this;
    };

    result.onFailure = function (method) {
        if (method) {
            executeFailure = method;
        }
        return this;
    };


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
                frango.server.get(url, undefined, true, { 'GETTEMPLATE': true }, false, false).
                    onSuccess(function (data) {

                        currentEle.insertAdjacentHTML('afterbegin', data);
                        currentEle.setAttribute('data-template-binded', true);
                        frango.autoComplete();


                        if (executeSuccess)
                            executeSuccess(data);

                        clearInterval(frango.templatesToGet[templateName].timeout);
                        delete frango.templatesToGet[templateName];
                        frango.freeToGetTemplate = true;

                    }).
                    onFailure(function (data) {
                        clearInterval(frango.templatesToGet[templateName].timeout)
                        delete frango.templatesToGet[templateName];
                        currentEle.insertAdjacentHTML('afterbegin', data);
                        if (executeFailure)
                            executeFailure(data);
                    });
            } else {
                currentEle.setAttribute('data-template-binded', true);
                result.templateBinded = currentEle.innerHTML;
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
            setTimeout(function () {
                if (executeSuccess) {
                    executeSuccess();
                };
            }, 300);
        };
    };

    return result;
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
            var removeElement = true;
            var selector = thisElement.getAttribute('data-component-container');
            var extraData = thisElement.getAttribute('data-component-extra-data');
            var componentId = thisElement.getAttribute('data-component-id');
            if (!selector) {
                selector = "[data-component-id='" + componentId + "']";
                removeElement = false;
            };

            clearInterval(idIntervalNested);
            component["selector_to_bind"] = selector;
            component["componentID"] = componentId;
            if (extraData) {
                component["extra_data"] = extraData;
            };
            if (removeElement) {
                thisElement.remove();
            } else {
                thisElement.setAttribute('data-component', 'no');
            };
            methodBind();

        }, 300);

    });
}

frango.useConfigComponent = function (configComponentName, newPlaceSelector, objectDataSets, replaceContainer) {
    var result = {};
    var methodOnFinish = undefined;

    if (replaceContainer === undefined || replaceContainer === null) {
        replaceContainer = true;
    };

    result.onFinish = function (method) {
        methodOnFinish = method;
    };

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
            frango.find('[data-container-template="' + configComponentName + '"]').loop(function () {
                var originalHtml = this.innerHTML;
                var html = '<div data-datasetname="' + configComponentName + '" >' + originalHtml + '</div>';
                var containerAttributes = this.attributes;

                frango.find(newPlaceSelector).loop(function () {
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
                            for (at in containerAttributes) {
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
                                frango.find('style[data-datasetname="' + configComponentName + '"]').elements[0].innerHTML);

                            removeTemplate(configComponentName, tempDoc);
                        };


                        if (replaceContainer) {
                            this.innerHTML = tempDoc.body.innerHTML;
                        } else {
                            this.insertAdjacentHTML('beforeend', tempDoc.body.innerHTML);
                        };

                    } else {

                        if (replaceContainer) {
                            this.innerHTML = originalHtml;
                        } else {
                            this.insertAdjacentHTML('beforeend', originalHtml);
                        };
                    };

                    //remove possible not removed data container
                    this.find('[data-datasetname="' + configComponentName + '"]').loop(function () {
                        var html_component = this.innerHTML;
                        this.parentElement.insertAdjacentHTML("beforeend", html_component);
                        this.remove();
                    });
                    /*nested components */
                    var queue = {};
                    frango.find("[data-component='yes']", this).loop(function () {
                        //get-component          
                        var autoCreate = this.getAttribute('data-auto-create');

                        if (autoCreate == "yes" || autoCreate == "" || autoCreate == null || autoCreate == undefined) {

                            var removeElement = true;
                            var selector = this.getAttribute('data-component-container');
                            var extraData = this.getAttribute('data-component-extra-data');
                            var componentId = this.getAttribute('data-component-id');
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
                                if (removeElement) {
                                    thisElement.remove();
                                } else {
                                    thisElement.setAttribute('data-component', 'no');
                                };


                                frango.executeComponentController(component["componentName"]);

                            }, 300);

                            queue[[idIntervalNested]] = idIntervalNested;
                        };
                    });


                });
            });
            if (methodOnFinish) {
                methodOnFinish();
            };

        };

    frango.getTemplate(configComponentName).onSuccess(function () {
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
            replaceContainer).onFinish(function () {
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
    frango.find(selector).loop(function () {
        frango.fillLookupWaitting = true;
        var filled = this.hasAttribute('data-filled');
        if (filled) {
            if (force === true) {
                this.removeAttribute('data-filled');
                this.find('options').remove();
            } else {
                return;
            };
        };

        var url = this.getAttribute('data-lookup-url');
        if (url) {
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
            var element = this;
            frango.server.get(url, data, true, undefined, undefined, undefined, contentType).
                onSuccess(function (data) {

                    dataJS = JSON.parse(data);
                    var html = "";//"<option value=''></option>";
                    //element.innerHTML = html;
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
                    frango.fillLookupWaitting = false;

                    if (typeof onFilled == 'function') {
                        onFilled();
                    };

                }).
                onFailure(function (data) {

                    frango.fillLookupWaitting = false;
                    document.write(data);
                    document.close();

                });
        };
    });
}

frango.fillLookup = function (selector, onFilled) {
    lookup(selector, false, onFilled);
}

frango.autoComplete = function () {
    frango.find('.autocomplete input[data-autocomplete-url]').loop(function () {
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


        if (url && field && text_field) {

            var container = document.createElement('div');
            container.setAttribute('class', 'autocomplete-container suspend hide');
            container = parent.appendChild(container);

            this.addEventListener('keyup', function (e) {
                if (this.value.length < 3) {
                    container.innerHTML = "";
                    return false;
                };
                var esc = 27;
                if (e.keyCode === esc) {
                    this.parentElement.querySelector('.autocomplete-container').innerHTML = "";
                    e.stopPropagation();
                    return false;
                };


                this.setAttribute('data-value', "");
                this.setAttribute('data-text', "");
                if (this.value == "") {
                    container.innerHTML = "";
                    return;
                };

                frango.server.get(url, text_field + '=' + this.value).
                    onSuccess(function (data) {
                        data = JSON.parse(data);
                        var html = '<ul>';
                        for (row in data) {
                            if (data.hasOwnProperty(row)) {
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
                        html += '</ul>';
                        if (data.length > 0) {
                            frango.removeClass('hide', container)
                        } else {
                            frango.addClass('hide', container);
                        };
                        container.innerHTML = html;
                        frango.find('ul li', container).loop(function () {
                            this.addEventListener('click', function () {
                                search.setAttribute('data-value', this.getAttribute('data-value'));
                                search.value = this.getAttribute('data-text');
                                search.dispatchEvent(eventChoose);
                                container.innerHTML = "";
                            });
                        });
                    });
            });
        };
    });

    window.addEventListener('load', function () {

        document.addEventListener('click', function () {
            frango.find('.autocomplete-container').loop(function () {
                this.innerHTML = "";
            });
        })
    })
}

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
        this.find('.errorlist').loop(function () {
            this.parentNode.removeChild(this);
        });

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
                lbl = ele.parentNode.querySelector('label') || ele;
                ele.parentNode.insertBefore(error_ele, lbl);
            } else {
                this.appendChild(error_ele);
            }
        }
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

}

frango.onPressEnterClick = function (event, selector) {
    if (event.keyCode != 13)
        return false;

    var ele = frango.find(selector).first();
    if (ele) {
        ele.click();
    }
}

frango.invisibleWhen = function (ele, condition) {
    if (condition === true) {
        frango.addClass('hide', ele);
    } else {
        frango.removeClass('hide', ele);
    }

}

frango.currentDate = function(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    
    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd;
    } 
    if(mm<10){
        mm='0'+mm;
    } 
    var today = yyyy + '-' + mm + '-' + dd ;
    
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

frango.executeComponentController = function (componentName) {
    var component = frango.getComponent(componentName);
    //configComponentName, newPlaceSelector, objectDataSets, replaceContainer
    if (component) {
        //frango.useConfigComponent(component["componentName"], "#app", [], true);

        if (component["controllerMethod"]) {
            /*var newMethod = component["controllerMethod"].clone();
            newMethod(component);*/
            component["controllerMethod"](component);
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
            "controllerMethod": function (component) {
                if (component.occupied == true) {
                    return;
                };
                component.occupied = true;
                if (methodController) {
                    methodController(component);
                } else {
                    component.bindData([]);
                };
            },
            "selector_to_bind": "#app",
            "extra_data": "",
            "bindData": function (Data, replaceContent, onFinish) {
                if (replaceContent == undefined || replaceContent == null) {
                    replaceContent = true;
                };
                frango.useConfigComponent(this.componentName, this.selector_to_bind, Data, replaceContent).onFinish(function () {
                    frango.getComponent(componentName).occupied = false;
                    if (onFinish) {
                        onFinish.call();
                        //always reset selector
                        this.selector_to_bind = "#app";

                    };
                });
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

frango.config = {
    host_local_template: 'http://localhost:8081/',
    isBuildingOfflineApp: false,
    isRuningInWeb: true
}

frango.createTemplateOnApp =
    function (templateName, component, datasetName, pathToRowsOndataSet) {
        if (frango.find("[data-container-template='" + templateName + "']").first()) {
            return
        };

        var ele = document.createElement('style');
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
        if (frango.config.isBuildingOfflineApp === true) {
            frango.getTemplate(templateName).onSuccess(function () {
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
                    replaceContent).
                    onFinish(function () {
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
                                replaceContent).
                                onFinish(function () {
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

        if (frango.config.isBuildingOfflineApp === true) {
            if (elementSelector == window &&
                eventName.toUpperCase() == "LOAD") {
                executeConfiguration();
            } else {
                frango.createTemplateOnApp(templateName,
                    componentInstance,
                    datasetName,
                    pathToRowsOndataSet);
                frango.getTemplate(templateName).onSuccess(function () {
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



frango.app = {};
frango.app.initializeMethod = undefined;
frango.app.configTemplateMethod = undefined;
frango.app.createComponentsMethod = undefined;
frango.app.afterInitialize = undefined;
frango.app.initialConfiguration = undefined;
frango.app.configureRote = undefined;
frango.app.routes = {};

frango.config.initialConfiguration = function (method) {
    if (method) {
        frango.app.initialConfiguration = method;
    };
}


frango.app.initialize = function (method) {
    if (method) {
        frango.app.initializeMethod = method;
    };
}

frango.app.configureComponents = function (method) {
    if (method) {
        frango.app.configTemplateMethod = method;
    };
}

frango.app.registerComponents = function (method) {
    if (method) {
        frango.app.createComponentsMethod = method;
    };
}

frango.app.afterInitialize = function (method) {
    if (method) {
        frango.app.afterInitialize = method;
    };

}

frango.app.configureRote = function (method) {
    if (method) {
        frango.app.configureRote = method;
    };
}


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
    frango.executeComponentController(frango.app.routes[path]);
};


frango.app.getURLParameters = function () {
    var params = {};
    var splited = window.location.hash.split('?');

    if (splited.length > 0) {
        if (splited[1]) {
            var temp_params = splited[1].split("&");
            var key_val;
            for (var i = 0; i < temp_params.length; i++) {
                key_val = temp_params[i].split("=");
                params[key_val[0]] = key_val[1];
            };
        };
    };

    return (params);
}

frango.app.getURL = function () {
    var splited = window.location.hash.split('?');
    return splited[0].replace('#', '');
};

frango.app.navigate = function (path) {
    //parameter must contain slash
    var hash = "#" + path.substr(1, path.length - 1);
    window.location.hash = hash;
}

frango.app.buildOfflineApp = function () {
    frango.config.isBuildingOfflineApp = true;
    runLoadApp();
    //frango.app.saveApp();
}

frango.app.saveApp = function () {
    /* frango.config.isBuildingOfflineApp = true;
     var html = frango.find('html').first().outerHTML;
     html = "<!DOCTYPE html>" + html;
     var blob = new Blob([html], {
         type: "text/html"
     });
 
     var url = window.URL.createObjectURL(blob);
 
     var a = document.createElement("a");
     a.id = "documentGenerator";
     document.body.appendChild(a);
     a.style = "display: none";
 
     a.href = url;
     a.download = 'index.html';
     a.click();
     window.URL.revokeObjectURL(url);
     frango.config.isBuildingOfflineApp = false;*/

}




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
        frango.app.configureRote.call();
        frango.app.intercceptRoute();
    };




    if (frango.app.afterInitialize) {
        var idTimeout = setInterval(function () {
            if (Object.keys(frango.templatesToGet).length === 0) {
                clearInterval(idTimeout);
                frango.app.afterInitialize.call();
            };
        }, 300);
    };

    if (frango.config.isBuildingOfflineApp === true) {
        var idTimeoutBuild = setInterval(function () {
            if (Object.keys(frango.templatesToGet).length === 0) {
                clearInterval(idTimeoutBuild);
                frango.find('body').adCl('frango-built');
            };
        }, 400);
    };

};

window.addEventListener('load', function () {
    if (window.location.pathname == '/frango-framework-build-app') {
        frango.app.buildOfflineApp();
    } else {
        frango.config.isBuildingOfflineApp = false;
        runLoadApp()
    };
});

window.onhashchange = function () {
    frango.app.intercceptRoute();
};