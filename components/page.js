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
      <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
    </Head>
    <Header />
    {children}
    <Footer />
  </div>
)

const style = <style>{`
  * {
    box-sizing: border-box;
    font-family:
      -apple-system, BlinkMacSystemFont, Segoe UI,
      Helvetica, Arial, sans-serif, Apple Color Emoji,
      Segoe UI Emoji, Segoe UI Symbol
    ;
  }
  html, body {
    margin: 0;
    padding: 0;
  }
  body {
    background: ${COLORS.background};
    padding-top: ${LAYOUT.navbar.height};
  }
  .page {
    position: relative;
  }
`}</style>
