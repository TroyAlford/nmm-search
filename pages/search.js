import COLORS from '../config/colors'
import fetch from 'isomorphic-fetch'
import LAYOUT from '../config/layout'
import Page from '../components/page'
import { Component } from 'react'

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      addons: [],
     }
  }

  componentWillMount() {
    this.setState({ loading: true })
  }
  componentDidMount() {
    searchFor(this.props.url.query.for).then(state =>
      this.setState({ ...state, loading: false })
    )
  }

  render() {
    const addons = this.state.addons || []

    return (
      <Page>{
        this.state.loading
        ? <div className="loading">Loading ...</div>
        : <ul className="addons">{addons.map(addon =>
            <li key={addon.id} className="addon">
              <div className="info">
                <h3>{addon.title}</h3>
                <p>{addon.description}</p>
                <div className="info-bar">
                  <a href={addon.author.profile}>
                    <i className="fa fa-user"></i>
                    {addon.author.name}
                  </a>
                  {' | '}
                  <i className="fa fa-download"></i> {addon.downloads}
                  {' | '}
                  <i className="fa fa-thumbs-up"></i> {addon.likes}
                  {' | '}
                  <i className="fa fa-calendar-o"></i> {addon.updated}
                </div>
              </div>
              <div className="actions">
                <a className="download-nmm button"
                   href={`/api/download/${addon.id}`}>
                  <i className="fa fa-cloud-download"></i> Install with NMM
                </a>
                <a className="download-manual button" href={`/api/download/${addon.id}`}>
                  <i className="fa fa-download"></i> Install Manually
                </a>
                <a className="nm-page" href={addon.url}>
                  <i className="fa fa-globe"></i> NexusMods Page
                </a>
              </div>
            </li>
        )}</ul>
     }{style}
     </Page>
    )
  }
}

const style = <style>{`
  .loading {
    background: rgba(255, 255, 255, .6);
    position: fixed;
    display: inline-flex;
    align-items: center; justify-content: center;
    top: ${LAYOUT.navbar.height}; right: 0; bottom: 0; left: 0;
  }
  ul.addons {
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 5px;
  }
  li.addon {
    border: 1px solid ${COLORS.border};
    border-bottom-width: 0;
    display: flex;
    flex-direction: row;
    list-style: none;
    padding: 15px;
  }
  li.addon:nth-child(even) {
    background-color: #eee;
  }
  li.addon:last-child { border-bottom-width: 1px; }
  li.addon .info {
    flex-grow: 1;
  }
  li.addon .actions {
    display: flex;
    flex-direction: column;
    min-width: 175px;
  }
  li.addon a { text-decoration: none; }
  li.addon .actions a { display: block; }
`}</style>

function searchFor(query = '') {
  return fetch(`http://localhost:8080/api/search/${query}`)
    .then(response => response.json())
    // .then(json => ({ addons: json.addons }))
}
