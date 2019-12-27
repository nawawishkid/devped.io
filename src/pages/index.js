import React from "react"
import { Link } from "gatsby"
// import { css } from "@emotion/core"
// import { rhythm } from "../utils/typography"
// import Layout from "../components/layout"

const items = [
  { label: `คลาส`, url: `/classes/` },
  { label: `สอนทำยาว ๆ`, url: `/tutorials/series/` },
  { label: `อธิบาย`, url: `/explains/` },
  { label: `สอนทำสั้น ๆ`, url: `/tutorials/standalones/` },
]
const IndexPage = () => {
  return (
    <>
      <NavBar items={items} />
    </>
  )
}

const NavBar = ({ items }) => {
  return (
    <nav>
      <ul>
        {items.map((item, index) => (
          <Link to={item.url} key={index}>
            <li>{item.label}</li>
          </Link>
        ))}
      </ul>
    </nav>
  )
}

export default IndexPage
// const contentTypesWord = {
//   class: `classes`,
//   explain: `explains`,
//   series: `series`,
//   chapter: `chapters`,
//   standalone: `standalones`,
//   requirement: `requirements`,
// }

// export default ({ data }) => {
//   console.log(data)
//   return (
//     <Layout>
//       <div>
//         <h1
//           css={css`
//             display: inline-block;
//             border-bottom: 1px solid;
//           `}
//         >
//           Amazing Pandas Eating Things
//         </h1>
//         <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
//         {data.allMarkdownRemark.edges.map(({ node }) => (
//           <div key={node.id}>
//             <Link
//               to={node.fields.slug}
//               css={css`
//                 text-decoration: none;
//                 color: inherit;
//               `}
//             >
//               <h3
//                 css={css`
//                   margin-bottom: ${rhythm(1 / 4)};
//                 `}
//               >
//                 {node.frontmatter.title}{" "}
//                 <span
//                   css={css`
//                     color: #bbb;
//                   `}
//                 >
//                   — {node.frontmatter.date}
//                 </span>
//               </h3>
//             </Link>
//             <Link to={`/${contentTypesWord[node.frontmatter.type]}`}>
//               <small
//                 css={css`
//                   padding: 0.5rem 1rem;
//                   background: wheat;
//                 `}
//               >
//                 {node.frontmatter.type}
//               </small>
//             </Link>
//             <p>{node.excerpt}</p>
//           </div>
//         ))}
//       </div>
//     </Layout>
//   )
// }

// export const query = graphql`
//   query {
//     allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
//       totalCount
//       edges {
//         node {
//           id
//           frontmatter {
//             title
//             date(formatString: "DD MMMM, YYYY")
//             type
//             stack
//           }
//           excerpt
//           fields {
//             slug
//           }
//         }
//       }
//     }
//   }
// `
