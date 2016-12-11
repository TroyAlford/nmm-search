import express from 'express'
import cheerio from 'cheerio'
import fetch from 'isomorphic-fetch'
import moment from 'moment'
import qs from 'querystring'

export default express()
.use('/search/:search_query', (request, response) => {
	const query = request.params.search_query

	const params = qs.stringify({
		page: 1,
		src_game: 1704,
		src_name: query,
		// src_descr: '', //'description contains...',
		// src_auth: '',  //'author name contains...',
		// src_upldr: '', //'uploader name contains...',
		src_timeframe: 0,

		ignoreCF: 0,

		src_onlynmm: 1,
		src_showadult: 1,

		src_tab: 1,
		src_view: 2,
		src_language: 0,
		src_order: 1,
		src_sort: 0,
		src_timeframe: 0,
		src_cat: 0,
	})
	const search_url = 'http://www.nexusmods.com/skyrimspecialedition/mods/searchresults/'

	fetch(`${search_url}?${params}`)
	.then(response => response.text())
	.then(html => cheerio.load(html))
	.then(parser => parser('.files-list > li').toArray().map(el => {
		const addon = parser(el)

		return {
			author: {
				name: addon.find('a.user').first().text(),
				profile: addon.find('a.user').first().attr('href'),
			},
			description: addon.find('.file-desc').first().text(),
			downloads: addon.find('.file-downloads').first().text(),
			likes: addon.find('.file-endorsements').first().text(),
			image: addon.find('.file-image > img').first().attr('src'),
			title: addon.find('a.file').first().text(),
			size: addon.find('file-size').first().text(),
			updated: addon.find('.file-date').first().text(),
			url: addon.find('a.file').first().attr('href'),
		}
	}))
	.then(addons => addons.map(addon => {
		const dateFormat = 'h:mm, D MMM YYYY'
		const trim = string => string.replace(/(^[\s]*)|([\s]*$)/g, '')
		const toDate = string => moment(string, dateFormat).toDate()

		return {
			...addon,
			author: {
				id: addon.author.profile.split('/').pop(),
				...addon.author,
			},
			id: addon.url.split('/').pop(),
			downloads: Number(addon.downloads.replace(',', '')),
			likes: Number(addon.likes.replace(',', '')),
			title: trim(addon.title),
			updated: toDate(addon.updated.replace(/updated /, '')),
		}
	}))
	.then(addons => {
		response.status(200).send({
			addons,
			query,
		})
	})
	.catch(console.error)
})
