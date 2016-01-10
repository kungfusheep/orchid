


namespace test {

	import CSSObject = orchid.CSSObject;

	export class Item extends orchid.ui.Component {

		protected mutateStyle(style: CSSObject): CSSObject {

			style.width = "33.333%";
			style.cssFloat = "left";
			return style;
		}
	}	
}


const one = new test.Item("div");
one.validateNow();

const two = new test.Item("span");
two.validateNow();


window.addEventListener("load", () => {

	$log("HI");

	document.body.appendChild(one.getElement());
	document.body.appendChild(two.getElement());
});