import { PropsWithChildren, useCallback, MouseEvent } from "react";

interface CopyContentToClipboardButtonProps {
	transform: (value: string) => string;
}

export function CopyContentToClipboardButton({ children, transform }: PropsWithChildren<CopyContentToClipboardButtonProps>) {
	const onClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
		const text = transform(e.currentTarget.innerText);
		navigator.clipboard.writeText(text);
		alert(`"${text}" copied to clipboard.`)
	}, [])

	return (
		<button onClick={onClick} title="Click to copy to clipboard">
			{children}
		</button>
	)
}
