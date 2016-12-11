import React from 'react'
import SearchBar from '../components/search_bar'

import COLORS from '../config/colors'
import IMAGES from '../config/images'
import LAYOUT from '../config/layout'

export default () =>
	<div className="header">
		<SearchBar />
		{style}
	</div>

const style = <style jsx>{`
	.header {
		background: url(${IMAGES.patterns.dark}) ${COLORS.elements};
		border-bottom: 1px solid #999;
		box-shadow: 0 2px 5px #ccc;
		display: block;
		height: ${LAYOUT.navbar.height};
		left: 0;
		padding: 5px;
		position: fixed;
		right: 0;
		top: 0;
	}
`}</style>
