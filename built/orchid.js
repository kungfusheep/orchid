var orchid;
(function (orchid) {
    var CSSObject = (function () {
        function CSSObject() {
        }
        return CSSObject;
    })();
    orchid.CSSObject = CSSObject;
})(orchid || (orchid = {}));
var orchid;
(function (orchid) {
    var ui;
    (function (ui) {
        var CSSObject = orchid.CSSObject;
        var Component = (function () {
            // constructor(type?: string, protected element: Node)
            // constructor(type: "div", protected element:HTMLDivElement);
            // constructor(type: "span", private element: HTMLSpanElement);
            function Component(type, element) {
                if (element === void 0) { element = document.createElement(type); }
                this.element = element;
            }
            Component.prototype.initialize = function () {
                this.createChildren();
            };
            /**
             * Overridable behaviour. Create any child elements we need for this component.
             */
            Component.prototype.createChildren = function () { };
            /**
             * Overridable behaviour. Commit our dynamic state to the screen.
             */
            Component.prototype.commitProperties = function () { };
            /**
             * Mutate our style obejct.
             * @param  {CSSObject} style The current style object.
             * @return {CSSObject}       The mutated style object.
             */
            Component.prototype.mutateStyle = function (style) { return style; };
            Component.prototype.commitStyles = function () { };
            Component.prototype.invalidateProperties = function () { };
            Component.prototype.invalidateStyles = function () { };
            Component.prototype.validateNow = function () {
                if (this.propertiesInvalidated) {
                    this.propertiesInvalidated = false;
                    this.commitProperties();
                }
                if (this.stylesInvalidated) {
                    this.style = this.mutateStyle(this.style || new CSSObject());
                    this.commitStyles();
                }
            };
            return Component;
        })();
        ui.Component = Component;
    })(ui = orchid.ui || (orchid.ui = {}));
})(orchid || (orchid = {}));
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var test;
(function (test) {
    var Item = (function (_super) {
        __extends(Item, _super);
        function Item() {
            _super.apply(this, arguments);
        }
        Item.prototype.mutateStyles = function (style) {
            style.width = "33.333%";
            style.float = "left";
            return style;
        };
        return Item;
    })(orchid.ui.Component);
})(test || (test = {}));
