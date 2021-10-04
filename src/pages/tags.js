import React from "react"
import { Link, graphql } from "gatsby"
import kebabCase from "lodash/kebabCase"

const TagIndex = ({
  data: {
    allMarkdownRemark: { group }
  }
}) => (
  <>
    <h1>Tags</h1>
    <ul>
      {group.map(tag => (
        <li key={tag.fieldValue}>
          <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
            {tag.fieldValue} ({tag.totalCount})
          </Link>
        </li>
      ))}
    </ul>
  </>
)

export default TagIndex

export const pageQuery = graphql`
  {
    allMarkdownRemark(limit: 100) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
