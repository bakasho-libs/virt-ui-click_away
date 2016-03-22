var virt = require("virt"),
    propTypes = require("prop_types"),
    emptyFunction = require("empty_function");


var ClickAwayPrototype;


module.exports = ClickAway;


function ClickAway(props, children, context) {
    var _this = this;

    virt.Component.call(this, props, children, context);

    this.onClickAway = function(e) {
        return _this.__onClickAway(e);
    };
}
virt.Component.extend(ClickAway, "virt-ui-ClickAway");

ClickAway.propTypes = {
    onClickAway: propTypes.func
};

ClickAway.defaultProps = {
    onClickAway: emptyFunction
};

ClickAwayPrototype = ClickAway.prototype;

ClickAwayPrototype.componentDidMount = function() {
    this.onGlobalEvent("onMouseDown", this.onClickAway);
    this.onGlobalEvent("onTouchStart", this.onClickAway);
};
ClickAwayPrototype.componentWillUnmount = function() {
    this.offGlobalEvent("onMouseDown", this.onClickAway);
    this.offGlobalEvent("onTouchStart", this.onClickAway);
};

ClickAwayPrototype.__onClickAway = function(e) {
    var currentComponentTarget = e.currentComponentTarget;

    if (!e.defaultPrevented) {
        if (!currentComponentTarget ||
            !virt.isAncestorIdOf(this.getInternalId(), currentComponentTarget.getInternalId())
        ) {
            this.props.onClickAway(e);
        }
    }
};

ClickAwayPrototype.render = function() {
    return virt.createView("span", this.children);
};
