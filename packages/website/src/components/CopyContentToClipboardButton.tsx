import { PropsWithChildren, useCallback, MouseEvent } from "react";

export function CopyContentToClipboardButton({ children, prepend = "" }: PropsWithChildren<{prepend?: string}>) {
	const onClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
		const text = `${prepend}${e.currentTarget.innerText}`;
		navigator.clipboard.writeText(text);
		alert(`"${text}" copied to clipboard.`)
	}, [])

	return (
		<button onClick={onClick} title="Click to copy to clipboard">
			{children}
		</button>
	)
}
