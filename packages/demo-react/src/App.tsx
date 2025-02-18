import { useCallback, useMemo, useState } from "react";
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import darkTheme from 'react-syntax-highlighter/dist/esm/styles/prism/material-dark';
import lightTheme from 'react-syntax-highlighter/dist/esm/styles/prism/material-light';
import { DEFAULT_CSS_STYLESHEET, DEFAULT_STYLES, useScrollbar, ScrollbarStyles } from "@thavixt/scrollbar-react";
import { useColorScheme } from "./useColorScheme";

SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('tsx', tsx);

const customStyle = { maxHeight: 250, overflow: "auto", padding: '2px 4px', fontSize: 12 };
const lorem = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus nihil quasi enim, harum, delectus vero ipsa hic, animi aliquam numquam consequatur adipisci vel nemo tempore maiores eveniet nesciunt! Perferendis, molestias neque? Et quo maxime id consequuntur sequi officia, libero est itaque hic doloribus expedita repellat in provident facilis rem inventore, modi odit vitae atque error!`;
const getText = (count: number) => new Array(count).fill(lorem).join("\n");
const codeCustomCSS = `div[data-tsb-id="myElement"]::-webkit-scrollbar-track {
  background: pink;
  border-radius: 6px;
}`
const globalCode = `// TODO`;

const scriptTag = '<script src="https://github.com/thavixt/thavixt-scrollbar/blob/main/core/src/index.ts" />'

const numericScrollbarStyles = ["width", "height", "borderRadius"];

const demoStyles: ScrollbarStyles = {
	...DEFAULT_STYLES,
	// width: 10,
	// height: 10,
	thumbColor: '#4949bc',
	thumbColorDark: '#2bda6e',
	thumbHoverColor: '#f09833',
	thumbHoverColorDark: '#eb6060',
	// trackColor: '#aeadad',
	// trackColorDark: '#ddd4d4',
}

const styleDescriptions: Record<keyof ScrollbarStyles, string> = {
	borderRadius: 'radius of the thumb and track (px)',
	height: 'height of horizontal scrollbar (px)',
	thumbColor: 'color of the thumb you drag when scrolling (hex)',
	thumbColorDark: 'color of the thumb you drag when scrolling (hex)',
	thumbHoverColor: 'color of the thumb when hovered (hex)',
	thumbHoverColorDark: 'color of the thumb when hovered (hex)',
	trackColor: 'color of the scroll track (hex)',
	trackColorDark: 'color of the scroll track (hex)',
	width: 'width of vertical scrollbar (px)',
}

function App() {
	const [placeholderCount, setPlaceholderCount] = useState(10);
	const [styles, setStyles] = useState<ScrollbarStyles>(demoStyles);
	const { colorScheme, firstRender, toggle: toggleColorScheme } = useColorScheme('thavixt-scrollbar-demo');
	const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

	const codeReactHook = useMemo(() => `import { useScrollbar } from "@thavixt/scrollbar-react";

function MyCompontent() {
		const ref = useRef(null);

		useScrollbar(ref, {
			width: ${styles.width},
			height: ${styles.height},
			thumbColor: '${styles.thumbColor}',
			thumbColorDark: '${styles.thumbColorDark}',
			thumbHoverColor: '${styles.thumbHoverColor}',
			thumbHoverColorDark: '${styles.thumbHoverColorDark}',
			trackColor: '${styles.trackColor}',
			trackColorDark: '${styles.trackColorDark}',
		});

		return (
			<div ref={ref} className='h-[300px] overflow-auto whitespace-pre'>
				Lorem ipsum dolor sit amet...x${placeholderCount}
			</div>
		)
	}
	`, [
		placeholderCount,
		styles.height,
		styles.thumbColor,
		styles.thumbColorDark,
		styles.thumbHoverColor,
		styles.thumbHoverColorDark,
		styles.trackColor,
		styles.trackColorDark,
		styles.width,
	]);

	const reset = useCallback(() => {
		setStyles(demoStyles);
	}, []);

	// with react hook package
	const ref2 = useScrollbar<HTMLDivElement>({ styles });

	if (firstRender) {
		return null;
	}

	return (
		<div className="mx-auto w-full max-w-2xl lg:max-w-6xl flex flex-col lg:grid lg:grid-cols-2 gap-x-8 gap-y-16 p-8 pb-24">
			<div className="col-span-2">
				<h1>thavixt-scrollbar</h1>
			</div>

			<div className="flex flex-col gap-2">
				<p>Customize scrollbars on your websites!</p>
				<b>
					<a href="https://github.com/thavixt/thavixt-scrollbar" target="_blank">
						Check out the project on Github
					</a>
				</b>
				<p>made by <a href="https://github.com/thavixt" target="_blank">thavixt@github</a></p>
			</div>
			<div className="flex flex-col gap-4 highlight">
				<b>Installation:</b>
				<div>
					<em><b>core</b> package for use without a framework</em>
					<div className="flex gap-2">
						<NPMBadge packageName="thavixt-scrollbar-core" />
						<code>npm i thavixt-scrollbar-core</code>
					</div>
					<p>or directly in a script tag:</p>
					<SyntaxHighlighter
						language="html"
						style={theme}
						customStyle={customStyle}
					>
						{scriptTag}
					</SyntaxHighlighter>
				</div>
				<div>
					<em><b>react</b> package</em>
					<div className="flex gap-2">
						<NPMBadge packageName="thavixt-scrollbar-react" />
						<code>npm i thavixt-scrollbar-react</code>
					</div>
				</div>
			</div>

			<div className="flex flex-col gap-2">
				<b>Features:</b>
				<ul className="list-disc list-inside">
					<li>
						Callbacks:
						<div className="flex flex-col gap-2 pl-4">
							<div>
								<code>
									{"onScroll: (details) => void"}
								</code>
							</div>
							<div>
								<p>
									<code>
										{"onScrollToEnd: (thresholds) => void"}
									</code>
								</p>
							</div>
						</div>
					</li>

					<li>
						Style customization: (change the values to play with the demo)
						<div className="w-[400px] md:w-full overflow-x-auto">
							<div className="pl-4">
								<table className="table-fixed">
									<thead>
										<tr>
											<th>key</th>
											<th>default</th>
											<th>demo style</th>
										</tr>
									</thead>
									<tbody>
										{Object.keys(styles).map((k) => {
											const key = k as keyof ScrollbarStyles;
											return (
												<tr key={key} title={styleDescriptions[key]}>
													<td>
														<label htmlFor={key}>
															<code>{key}</code>
														</label>
													</td>
													<td>
														<code>{DEFAULT_STYLES[key]}</code>
													</td>
													<td>
														{numericScrollbarStyles.includes(
															key,
														) ? (
															<input
																type="number"
																min="1"
																max="100"
																id={key}
																name={key}
																value={styles[key]}
																onChange={(e) =>
																	setStyles((prev) => ({
																		...prev,
																		[key]: e.target
																			.value,
																	}))
																}
															/>
														) : (
															<input
																type="color"
																id={key}
																name={key}
																value={styles[key]}
																onChange={(e) =>
																	setStyles((prev) => ({
																		...prev,
																		[key]: e.target
																			.value,
																	}))
																}
															/>
														)}
														{' '}
														<code>{styles[key]}</code>
													</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							</div>
						</div>
					</li>
				</ul>

				<div className="w-full flex justify-center">
					<button type="button" onClick={reset}>Reset styles to demo defaults</button>
				</div>

			</div>

			<div className="flex flex-col gap-2">
				<b>Demo: (change the styles in the table)</b>
				<details>
					<summary>Code</summary>
					<SyntaxHighlighter
						language="tsx"
						style={theme}
						customStyle={customStyle}
					>
						{codeReactHook}
					</SyntaxHighlighter>
				</details>
				<div
					ref={ref2}
					className="h-[300px] w-full max-w-[700px] overflow-auto whitespace-pre"
				>
					{getText(placeholderCount * 3)}
				</div>

				<div className="flex flex-col gap-2 items-center justify-center">
					<button
						onClick={toggleColorScheme}
						type="button"
					>
						Change theme to {colorScheme === "light" ? "dark" : "light"}
					</button>
					<div className="flex gap-2">
						<label htmlFor="count">
							# of placeholder lines:
						</label>
						<input
							className="bg-slate-600 rounded-sm text-slate-100 text-center w-20"
							type="number"
							id="count"
							min={1}
							onChange={(e) => setPlaceholderCount(+e.target.value)}
							value={placeholderCount}
						/>
					</div>
				</div>
			</div>

			<div className="flex flex-col gap-2">
				<b>Apply globally:</b>
				<p>If you want to change <b>every scrollbar</b> on the page:</p>
				<SyntaxHighlighter
					language="tsx"
					style={theme}
					customStyle={customStyle}
				>
					{globalCode}
				</SyntaxHighlighter>
			</div>

			<div className="flex flex-col gap-2">
				<b>Default CSS styles:</b>
				<SyntaxHighlighter
					language="css"
					style={theme}
					customStyle={customStyle}
				>
					{DEFAULT_CSS_STYLESHEET}
				</SyntaxHighlighter>
				<p className="inline">
					Provide custom styles with CSS, like:
				</p>
				<SyntaxHighlighter
					language="css"
					style={theme}
					customStyle={customStyle}
				>
					{codeCustomCSS}
				</SyntaxHighlighter>
			</div>

		</div>
	);
}

function NPMBadge({ packageName }: { packageName: string }) {
	return (
		<a href={`https://www.npmjs.com/package/${packageName}`} target="_blank">
			<img src={`https://img.shields.io/npm/v/${packageName}`} alt={`${packageName}on npm`} />
		</a>
	)
}

export default App;
