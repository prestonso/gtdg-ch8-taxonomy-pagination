import React from "react"
import { Link, graphql } from "gatsby"

const Tag = ({ pageContext, data }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`

  return (
    <>
      <h1>{tagHeader}</h1>
      <ul>
        {edges.map( ({node}) => {
          const { slug } = node.fields
          const { title } = node.frontmatter
          return (
            <li key={slug}>
              <Link to={slug}>{title}</Link>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default Tag

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 100,
      sort: { fields: [frontmatter___date], order: DESC },
      filter: { frontmatter: { tags: { in: [$tag] }}}
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
