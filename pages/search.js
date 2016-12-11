import React from 'react'
import Page from '../components/page'
import fetch from 'isomorphic-fetch'

export default class Index extends React.Component {
	static getInitialProps({ req, query }) {
		return { query: query.for }
	}

	constructor(props) {
		super(props)
		this.state = {
			addons: this.props.addons || [],
		}
	}

	componentWillMount() {
		return fetch(`http://localhost:8080/api/search/${this.props.query}`)
			.then(response => response.json())
			.then(json => this.setState({ addons: json.addons }))
	}

	render() {
		const addons = this.state.addons || []

		return (
			<Page>
				<ul>{addons.map(addon =>
					<li	className="addon">
						{addon.title}
					</li>
			)}</ul>
			</Page>
		)
	}
}
