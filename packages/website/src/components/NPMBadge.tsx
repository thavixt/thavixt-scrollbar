export function NPMBadge({ packageName }: { packageName: string }) {
	return (
		<a href={`https://www.npmjs.com/package/${packageName}`} target="_blank">
			<img src={`https://img.shields.io/npm/v/${packageName}`} alt={`${packageName}on npm`} />
		</a>
	)
}
