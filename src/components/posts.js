import React from "react"
import Link from "./link"
import { useLocale } from "../contexts/locale"
import PostItem from "./post-item"

export const BasicPost = props => {
  const { post } = props.data

  return (
    <div>
      This is basic post
      <h1>{post.title}</h1>
      <p>{post.updatedAt}</p>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
  )
}
export const ClassPost = props => {
  const { post } = props.data
  const { translate } = useLocale()

  return (
    <div>
      This is class post
      <h1>{post.title}</h1>
      <p>{post.updatedAt}</p>
      <div>
        <h3>{translate(`lessons`, `class-post`, `page`)}</h3>
        <ul>
          {post.tree.children.map(lesson => (
            <li key={lesson.id}>
              <Link to={lesson.slug}>
                <h4>{lesson.title}</h4>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
  )
}
export const SeriesPost = props => {
  const { post } = props.data
  const { translate } = useLocale()

  return (
    <div>
      This is series post
      <h1>{post.title}</h1>
      <p>{post.updatedAt}</p>
      <div>
        <h3>{translate(`chapters`, `series-post`, `page`)}</h3>
        <ul>
          {post.tree.children.map(lesson => (
            <li key={lesson.id}>
              <Link to={lesson.slug}>
                <h4>{lesson.title}</h4>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
  )
}
export const LessonPost = props => {
  const { post } = props.data
  const { parent, next, prev } = post.tree
  const { translate } = useLocale()

  return (
    <div>
      This is lesson post
      <Link to={parent.slug}>
        <small>
          {translate(`class_title`, `lesson-post`, `page`)} {parent.title}
        </small>
      </Link>
      <h1>{post.title}</h1>
      <p>{post.updatedAt}</p>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
      <div>
        {next ? <SiblingLesson node={next} /> : null}
        {prev ? <SiblingLesson node={prev} type="prev" /> : null}
      </div>
    </div>
  )
}
export const ChapterPost = props => `This is chapter post`
export const RequirementPost = props => {
  const { post, childrenPosts } = props.data
  const { translate } = useLocale()

  return (
    <div>
      This is requirement post
      <h1>{post.title}</h1>
      <p>{post.updatedAt}</p>
      <div>
        <h3>{translate(`user_stories`, `requirement-post`, `page`)}</h3>
        <ul>
          {post.frontmatter.stories.map((story, index) => (
            <li key={index}>{story}</li>
          ))}
        </ul>
      </div>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
      <div>
        <h3>{translate(`implemented_by`, `requirement-post`, `page`)}</h3>
        <ul>
          {childrenPosts.edges.map(({ node }) => (
            <PostItem {...node} key={node.id} />
          ))}
        </ul>
      </div>
    </div>
  )
}
// export const TechPost = props => `This is tech post`
export const StandalonePost = props => {
  const { post } = props.data

  return (
    <div>
      This is standalone post
      <h1>{post.title}</h1>
      <p>{post.updatedAt}</p>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
  )
}

const SiblingLesson = ({ node: { title, slug }, type = `next` }) => {
  const { translate } = useLocale()
  const key = type === `next` ? type : `previous`

  return (
    <div>
      <Link to={slug}>
        {translate(key, `lesson-post`, `page`)} <h4>{title}</h4>
      </Link>
    </div>
  )
}
