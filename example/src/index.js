var virt = require("@nathanfaucett/virt"),
    virtDOM = require("@nathanfaucett/virt-dom"),
    ClickAway = require("../..");


var AppPrototype;


function App(props, children, context) {
    virt.Component.call(this, props, children, context);
}
virt.Component.extend(App, "App");
AppPrototype = App.prototype;

AppPrototype.getChildContext = function() {
    return {
        theme: {}
    };
};

AppPrototype.render = function() {
    return (
        virt.createView("div", {
                className: "App"
            },
            virt.createView(ClickAway, {
                onClickAway: function(e) {
                    console.log(e);
                }
            }, "CHILD")
        )
    );
};

virtDOM.render(virt.createView(App), document.getElementById("app"));
