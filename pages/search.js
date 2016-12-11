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
    this.setState({ loading: true })
    return fetch(`http://localhost:8080/api/search/${this.props.query}`)
      .then(response => response.json())
      .then(json => this.setState({ addons: json.addons, loading: false }))
  }

  render() {
    const addons = this.state.addons || []

    return (
      <Page>{
        this.state.loading
        ? <div className="loading">Loading ...</div>
        : <ul>{addons.map(addon =>
            <li  key={addon.id} className="addon">
              {addon.title}
            </li>
        )}</ul>
     }</Page>
    )
  }
}
