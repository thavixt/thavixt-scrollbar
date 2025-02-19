import { useCallback, useMemo, useState } from "react";
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import darkTheme from 'react-syntax-highlighter/dist/esm/styles/prism/material-dark';
import lightTheme from 'react-syntax-highlighter/dist/esm/styles/prism/material-light';
import { DEFAULT_CSS_STYLESHEET, DEFAULT_STYLES, useScrollbar, ScrollbarStyles, ScrollbarThresholdsReached } from "thavixt-scrollbar-react";
import { useColorScheme } from "./useColorScheme";
import { codeCustomCSS, sytaxHighlighterStyle, demoGradientStyles, demoStyles, getText, globalCode, numericScrollbarStyles, styleDescriptions } from "./components/constants";
import { CopyContentToClipboardButton } from "./components/CopyContentToClipboardButton";
import { NPMBadge } from "./components/NPMBadge";

SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('tsx', tsx);

function App() {
	const colorScheme = useColorScheme();
	const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

	const [placeholderCount, setPlaceholderCount] = useState(10);
	const [applyToBody, setApplyToBody] = useState(false);
	const [styles, setStyles] = useState<ScrollbarStyles>(demoStyles);

	const codeReactHook = useMemo(() => `import { useScrollbar } from "thavixt-scrollbar-react";

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
}`, [
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

	const setDemoStyles = useCallback((styles: ScrollbarStyles) => {
		setStyles(styles);
	}, []);

	const onScrollToEnd = useCallback((reached: ScrollbarThresholdsReached) => {
		console.log(`[thavixt-scrollbar-demo] ${new Date().toJSON()} ${Object.keys(reached).join(', ')}`);
	}, []);

	const ref = useScrollbar({ styles, onScrollToEnd }, applyToBody);

	return (
		<div className="mx-auto w-full max-w-2xl lg:max-w-7xl flex flex-col xl:grid xl:grid-cols-2 gap-8 gap-y-32 pt-8 pb-24 px-8 items-center">
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
				<p className="pt-16">
					<small>
						made by <a href="https://github.com/thavixt" target="_blank">thavixt@github</a>
					</small>
				</p>
			</div>

			<div className="flex flex-col gap-4 highlight">
				<b>Installation:</b>
				<div className="flex flex-col gap-2">
					<em><b>core</b> package for use without a framework</em>
					<div className="flex gap-2">
						<NPMBadge packageName="thavixt-scrollbar-core" />
						<code>npm i thavixt-scrollbar-core</code>
					</div>
				</div>
				<div className="flex flex-col gap-2">
					<em><b>react</b> package</em>
					<div className="flex gap-2">
						<NPMBadge packageName="thavixt-scrollbar-react" />
						<code>npm i thavixt-scrollbar-react</code>
					</div>
				</div>
				<div className="text-sm flex flex-col">
					<p>Notes:</p>
					<p>All packages include <code>.d.ts</code> files for seamless usage with TypeScript.</p>
				</div>
			</div>

			<div className="flex flex-col gap-8">
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
						<div className="w-full overflow-x-auto">
							<div className="pl-6">
								<table className="table-auto w-full">
									<thead>
										<tr>
											<th>key</th>
											<th>default</th>
											<th>set demo style</th>
											<th>demo style value</th>
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
														<div className="inline-flex items-center justify-center gap-2">
															{numericScrollbarStyles.includes(key) ? (
																<input
																	type="number"
																	min="0"
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
														</div>
													</td>
													<td>
														<CopyContentToClipboardButton>
															<code>{styles[key]}</code>
														</CopyContentToClipboardButton>
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

				<div className="w-full flex justify-center items-center gap-2">
					<button type="button" onClick={() => setDemoStyles(DEFAULT_STYLES)}>Set to library defaults</button>
					<button type="button" onClick={() => setDemoStyles(demoStyles)}>Set to demo defaults</button>
					<button type="button" onClick={() => setDemoStyles(demoGradientStyles)}>Show some gradients</button>
				</div>
			</div>

			<div className="flex flex-col gap-2">
				<b>Demo: (change the styles in the table)</b>
				<details>
					<summary>React example code:</summary>
					<SyntaxHighlighter
						language="tsx"
						style={theme}
						customStyle={sytaxHighlighterStyle}
					>
						{codeReactHook}
					</SyntaxHighlighter>
				</details>
				<div
					ref={ref}
					className="h-[300px] w-[600px] overflow-auto whitespace-pre"
				>
					{getText(placeholderCount * 3)}
				</div>

				<p>Check the dev console <code>F12</code> to see logs.</p>

				<div className="flex flex-col gap-2 items-center justify-center">
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

			<div className="flex flex-col gap-2 highlight">
				<b>Apply globally:</b>
				<div className="flex gap-2 items-center justify-start">
					<label htmlFor="body">apply to every scrollbar on this page:</label>
					<input type="checkbox" name="body" id="body" onChange={e => setApplyToBody(e.target.checked)} defaultChecked={applyToBody} />
				</div>
				<p>If you want to change <b>every scrollbar</b> on the page</p>
				<SyntaxHighlighter
					language="tsx"
					style={theme}
					customStyle={sytaxHighlighterStyle}
				>
					{globalCode}
				</SyntaxHighlighter>
			</div>

			<div className="flex flex-col gap-2">
				<b>Default stylesheet applied:</b>
				<SyntaxHighlighter
					language="css"
					style={theme}
					customStyle={sytaxHighlighterStyle}
				>
					{DEFAULT_CSS_STYLESHEET}
				</SyntaxHighlighter>
				<p className="inline">
					Provide custom styles with CSS, like:
				</p>
				<SyntaxHighlighter
					language="css"
					style={theme}
					customStyle={sytaxHighlighterStyle}
				>
					{codeCustomCSS}
				</SyntaxHighlighter>
			</div>

		</div>
	);
}

export default App;
