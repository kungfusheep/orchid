


namespace orchid {
    export class CSSObject {

        public width: string;
        public float: string;
    }
}


namespace orchid.ui {

    import CSSObject = orchid.CSSObject;


    export class Component<T> {


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
        protected propertiesInvalidated: boolean;


        /**
         * true if our styles have been invalidated on this pass.
         * @type {boolean}
         */
        protected stylesInvalidated: boolean;



        ////  private properties

        private style: CSSObject;




        // constructor(type?: string, protected element: Node)
        // constructor(type: "div", protected element:HTMLDivElement);
        // constructor(type: "span", private element: HTMLSpanElement);
        constructor(type?: string, protected element:T = document.createElement(type)) {

        }







        public initialize() : void {

            this.createChildren();
        }

        /**
         * Overridable behaviour. Create any child elements we need for this component.
         */
        protected createChildren(): void { }
        

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

        protected commitStyles(): void { }

        public invalidateProperties(): void {}
        
        public invalidateStyles() : void {}
        
        public validateNow() : void {

            if(this.propertiesInvalidated){
                this.propertiesInvalidated = false;

                this.commitProperties();
            }

            if(this.stylesInvalidated){

                this.style = this.mutateStyle(this.style || new CSSObject());
                this.commitStyles();   
            }
        }
    }
}
