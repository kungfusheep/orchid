


namespace orchid {

    export interface CSSObject extends CSSStyleDeclaration {

    }
}


namespace orchid.ui {

    import CSSObject = orchid.CSSObject;



    const CSSClassCache:Lookup<string> = {};

    /**
     * Takes a CSS object, converts it to a CSS class (if a cache entry doesn't 
     *     exist) and returns a class name for the component to add to the DOM. 
     * @param  {CSSObject} styles [description]
     * @return {string}           [description]
     */
    function CSSObjectToClass(styles:CSSObject) : string {

        let className = "";

        for(const key in styles){
            className += key + styles[key];
        }

        let cached = CSSClassCache[className];
        if(!cached){

            const modded = className.replace(/\'|%|#|\./g, "");
            cached = CSSClassCache[className] = modded;

            /// generate the CSS class.
            const css = `.${modded} {`;
            for (const key in styles){
                css += `${key}:${styles[key]};`;
            }
            css += "};";

            var node = document.createElement("style");
            if("cssText" in node){
                (node as any).cssText = css;
            }
            else {
                node.appendChild(document.createTextNode(css));    
            }
            document.head.appendChild(node);
        }

        return cached;
    }


    export class Component{


        //// protected properties

        /**
         * The element node we'll be wrapping.
         * @type {T}
         */
        // protected element: T;


        /**
         * true if our properties have been invalidated on this pass.
         * @type {boolean}
         */
        protected propertiesInvalidated: boolean = true;


        /**
         * true if our styles have been invalidated on this pass.
         * @type {boolean}
         */
        protected stylesInvalidated: boolean = true;



        ////  private properties

        private style: CSSObject;




        constructor(type: string, protected element = document.createElement(type)){
        // constructor(type: "div", protected element:HTMLDivElement);
        // constructor(type: "span", private element: HTMLSpanElement);
        // constructor(type?: string, protected element:T = document.createElement(type)) {


        }



        public getElement(){
            return this.element;
        }







        public initialize() : void {


            this.propertiesInvalidated = true;
            this.stylesInvalidated = true;


            this.createChildren();
        }

        /**
         * Overridable behaviour. Create any child elements we need for this component.
         */
        protected createChildren(): void { }



        public invalidateProperties(): void { }

        public invalidateStyles(): void { }

        

        /**
         * Overridable behaviour. Commit our dynamic state to the screen.
         */
        protected commitProperties(): void { }


        /**
         * Mutate our style obejct.
         * @param  {CSSObject} style The current style object.
         * @return {CSSObject}       The mutated style object.
         */
        protected mutateStyle(style: CSSObject): CSSObject { return style; }


        /**
         * Commit our styles to the DOM.
         */
        protected commitStyles(): void {

            this.element.className = CSSObjectToClass(this.style);

            // $log(this.element.className);
        }
        

        /**
         * Validate the overall state of this component.
         */
        public validateNow() : void {

            if(this.propertiesInvalidated){
                this.propertiesInvalidated = false;

                this.commitProperties();
            }

            if(this.stylesInvalidated){
                this.stylesInvalidated = false;

                this.style = this.mutateStyle(this.style || {} as CSSObject);
                this.commitStyles();   
            }
        }
    }
}
