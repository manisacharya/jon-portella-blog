import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import Bio from '../components/Bio'
import SEO from '../components/seo'
import { rhythm, scale } from '../utils/typography'

const BlogPostTemplate = ({ data, location, pageContext }) => {
  const { html: postHtml, frontmatter } = data.markdownRemark;
  const { title: postTitle, spoiler, date } = frontmatter;

  const { title: siteTitle, siteUrl } = data.site.siteMetadata
  const postUrl = siteUrl + location.pathname;

  const { previous, next } = pageContext

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={postTitle} description={spoiler} url={postUrl} />
      <h1>{postTitle}</h1>
      <p
        style={{
          ...scale(-1 / 5),
          display: `block`,
          marginBottom: rhythm(1),
          marginTop: rhythm(-1),
        }}
      >
        {date}
      </p>
      <div dangerouslySetInnerHTML={{ __html: postHtml }} />
      <hr
        style={{
          marginBottom: rhythm(1),
        }}
      />
      <Bio />

      <ul
        style={{
          display: `flex`,
          flexWrap: `wrap`,
          justifyContent: `space-between`,
          listStyle: `none`,
          padding: 0,
        }}
      >
        <li>
          {previous && (
            <Link to={previous.fields.slug} rel="prev">
              ← {previous.frontmatter.title}
            </Link>
          )}
        </li>
        <li>
          {next && (
            <Link to={next.fields.slug} rel="next">
              {next.frontmatter.title} →
              </Link>
          )}
        </li>
      </ul>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
        siteUrl
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        spoiler
      }
    }
  }
`
