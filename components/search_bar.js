import COLORS from '../config/colors'

export default ({ query }) =>
<div className="search-bar">
	<input className="search-box" type="text" placeholder="Search..."
		onChange={onSearchChange}
	/>
	<style jsx>{`
		.search-box {
			border-radius: 5px; -moz-border-radius: 5px; -webkit-border-radius: 5px;
			box-shadow: inset 1px 1px 5px ${COLORS.shadow};
			border: 1px solid ${COLORS.border};
			padding: 5px;
		}
	`}</style>
</div>

function onSearchChange(event) {
	const term = event.target.value
}
