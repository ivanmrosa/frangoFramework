var registerComponents = function () {
    for (var index = 0; index < app.components.length; index++) {
        app.components[index].call();
    };
    delete app.components;
}


frango.app.registerComponents(registerComponents);
