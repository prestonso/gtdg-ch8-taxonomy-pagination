import React from "react"
import { Link, graphql } from "gatsby"

export default class BlogList extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges
    return (
      <ul>
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          console.log(node.fields.slug)
          return (
            <li key={node.fields.slug}>
              <Link to={node.fields.slug}>{title}</Link>
            </li>
          )
        })}
      </ul>
    )
  }
}

export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
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
