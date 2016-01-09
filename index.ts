


namespace test {

	import CSSObject = orchid.CSSObject;

	class Item extends orchid.ui.Component {

		protected mutateStyles(style: CSSObject): CSSObject {

			style.width = "33.333%";
			style.float = "left";
			return style;
		}
	}	
}


