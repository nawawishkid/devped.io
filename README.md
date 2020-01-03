# DevPed.io

[![Netlify Status](https://api.netlify.com/api/v1/badges/2ea89da2-fada-464a-955f-9c6e351749c7/deploy-status)](https://app.netlify.com/sites/pensive-williams-eacc81/deploys)

## Todos

- [x] ~~Support `requirements` post~~
- [ ] Display techs by type
- [ ] Support post cover image
- [x] ~~Display only `'published'` posts~~
- [ ] Design layout
- [ ] Make post's table of contents
  - [ ] Display all headings in a document with link to the heading
  - [ ] Display them in hierarchical way
  - [ ] Makes it collapsible if it has sub-heading
- [x] Add post's excerpt
- Markdown content
  - [ ] Consider using `mdx`?
  - [x] ~~Code highlighting~~
  - [x] ~~Support emoji~~
- [x] ~~SEO~~
- [x] ~~Google Analytics~~
- [ ] PWA
- [ ] Newsletter
- [x] ~~i18n. See [example](https://github.com/gatsbyjs/gatsby/tree/master/examples/using-i18n)~~
- [x] ~~Display tech stack of a post in the post page~~

---

## Notes

- In regard to switching language by changing URL, how will you handle user navigating back in URL history which also switch current language back to previous one? It's a bad UX.
- Using `gatsby-remark-slug` or `gatsby-remark-heading-slug` for adding `id` property to all of HTML headings in a document is not recommended since both of them replace some fields of the `AST` node of the document that `gatsby-transformer-remark` need to use to resolve the `headings` and `tableOfContents` fields in GraphQL query
- `exports.setParserPlugins()` API for `gatsby-transformers-remark` is not working and I now fix it locally, may be sending a pull request soon.
- Should `gatsby-transformers-remark` support `function` as a plugin instead of only `require()`?
