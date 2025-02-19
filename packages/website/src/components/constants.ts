import { DEFAULT_STYLES, ScrollbarStyles } from "thavixt-scrollbar-core";

export const styleDescriptions: Record<keyof ScrollbarStyles, string> = {
	borderRadius: 'radius of the thumb and track (px)',
	height: 'height of horizontal scrollbar (px)',
	width: 'width of vertical scrollbar (px)',
	thumbColor: 'color of the scrollbar thumb you drag when scrolling (hex)',
	thumbColorDark: 'color of the scrollbar thumb you drag when scrolling (hex)',
	thumbHoverColor: 'color of the scrollbar thumb when hovered (hex)',
	thumbHoverColorDark: 'color of the scrollbar thumb when hovered (hex)',
	trackColor: 'color of the scrollbar track (hex)',
	trackColorDark: 'color of the scrollbar track (hex)',
}

export const demoStyles: ScrollbarStyles = {
	...DEFAULT_STYLES,
	width: 10,
	height: 10,
	thumbColor: '#ee6820',
	thumbColorDark: '#30d94c',
	thumbHoverColor: '#f033d7',
	thumbHoverColorDark: '#eb6060',
	trackColor: '#434242',
	trackColorDark: '#ddd4d4',
}

export const demoGradientStyles: ScrollbarStyles = {
	...DEFAULT_STYLES,
	thumbHoverColor: 'orange',
	thumbHoverColorDark: 'orange',
	thumbColor: 'radial-gradient(circle, rgba(45,157,253,1) 0%, rgba(195,34,45,1) 100%)',
	thumbColorDark: 'radial-gradient(circle, rgba(253,156,45,1) 0%, rgba(34,195,180,1) 100%)',
	trackColor: 'linear-gradient(0deg, rgba(253,187,45,1) 0%, rgba(34,193,195,1) 100%)',
	trackColorDark: 'linear-gradient(180deg, rgba(224,69,137,0) 0%, rgba(161,81,251,1) 100%)',
}

export const numericScrollbarStyles = ["width", "height", "borderRadius"];

export const sytaxHighlighterStyle = { maxHeight: 250, overflow: "auto", padding: '2px 4px', fontSize: 12 };
export const lorem = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus nihil quasi enim, harum, delectus vero ipsa hic, animi aliquam numquam consequatur adipisci vel nemo tempore maiores eveniet nesciunt! Perferendis, molestias neque? Et quo maxime id consequuntur sequi officia, libero est itaque hic doloribus expedita repellat in provident facilis rem inventore, modi odit vitae atque error!`;
export const getText = (count: number) => new Array(count).fill(lorem).join("\n");
export const codeCustomCSS = `div[data-tsb-id="myElement"]::-webkit-scrollbar-track {
  background: pink;
  border-radius: 6px;
}`
export const globalCode = `/**
* If you provide the second argument 'applyToBody' as true,
* *all* scrollbars on the page will be affected.
*
* When doing this, the 'useScrollbar' hook will *not* have a return value.
* Since the styling is done with CSS, all elements created after the fact
* *will* have the scrollbar styles applied.
**/
useScrollbar({ styles, onScrollToEnd }, true);
`;
