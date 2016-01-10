


namespace test {

	import CSSObject = orchid.CSSObject;

	export class Item extends orchid.ui.Component {

		protected mutateStyle(style: CSSObject): CSSObject {


			// this.getElement().style.width = "33.333%";
			// this.getElement().style.color = "#FF00FF";

			style.width = "33.333%";
			style.color = "#FF00FF";
			return style;
		}
	}	
}


window.addEventListener("load", () => {


	setTimeout(() => {

		const body = document.body;

		const container = document.createElement("div");

		for (const i = 0, len = 1000; i < len; i++) {

			const one = new test.Item("div");
			one.getElement().appendChild(document.createTextNode("HI"));
			one.validateNow();
			container.appendChild(one.getElement());
		}

		body.appendChild(container);

	}, 500);

});