import React from 'react'
import Head from 'next/head'
import Header from '../components/header'
import Footer from '../components/footer'

import LAYOUT from '../config/layout'
import COLORS from '../config/colors'

export default ({ children = [] }) => (
	<div className="page">
		<Head>
			{style}
		</Head>

		<Header />
		{children}
		<Footer />
	</div>
)

const style = <style>{`
	* {
		box-sizing: border-box;
	}
	html, body {
		margin: 0;
		padding: 0;
	}
	body {
		background: ${COLORS.background};
		padding-top: ${LAYOUT.navbar.height};
	}
`}</style>
