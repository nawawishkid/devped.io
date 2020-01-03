import React from "react"
import Link from "./link"
import { useLocale } from "../contexts/locale"
import PostItem from "./post-item"
import PostTechs from "./post-techs"

const TableOfContents = ({ headings }) => {
  return (
    <div>
      <h2>Table of contents</h2>
      <ul>
        {headings.map(heading => (
          <a href={heading.slug} key={heading.slug}>
            <li dangerouslySetInnerHTML={{ __html: heading.value }} />
          </a>
        ))}
      </ul>
    </div>
  )
}

export const BasicPost = props => {
  const { post } = props.data

  return (
    <div>
      This is basic post
      <h1>{post.title}</h1>
      <p>{post.updatedAt}</p>
      <PostTechs stack={post.stack} />
      <TableOfContents headings={post.headings} />
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
      {props.children}
    </div>
  )
}
export const ClassPost = props => {
  const { post } = props.data
  const { translate, locale } = useLocale()
  const localizedLessons = post.tree.children.reduce((arr, lesson) => {
    if (lesson.status !== `published`) return arr

    let localizedLesson

    if (lesson.locale !== locale && lesson.translations.length) {
      localizedLesson = lesson.translations.find(l => l.locale === locale)
    }

    arr.push(localizedLesson || lesson)

    return arr
  }, [])

  console.log(`lessons: `, post.tree.children)
  console.log(`locLessons: `, localizedLessons)

  return (
    <div>
      This is class post
      <h1>{post.title}</h1>
      {post.validTranslations.length ? (
        <PostTranslationList translations={post.validTranslations} />
      ) : null}
      <p>{post.updatedAt}</p>
      <PostTechs stack={post.stack} />
      <div>
        <h3>
          {translate(`lessons`, `class-post`, `page`)} (
          {localizedLessons.length})
        </h3>
        {localizedLessons.length ? (
          <ul>
            {localizedLessons.map(lesson => (
              <li key={lesson.id}>
                <Link to={lesson.slug}>
                  <h4>{lesson.title}</h4>
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
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
      <PostTechs stack={post.stack} />
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
  const { tree, validTranslations } = post
  const { parent, next, prev } = tree
  const { translate, locale } = useLocale()

  return (
    <div>
      This is lesson post
      <Link to={parent.slug}>
        <small>
          {translate(`class_title`, `lesson-post`, `page`)} {parent.title}
        </small>
      </Link>
      <h1>{post.title}</h1>
      {validTranslations.length ? (
        <PostTranslationList translations={validTranslations} />
      ) : null}
      <p>{post.updatedAt}</p>
      <PostTechs stack={post.stack} />
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
      <div>
        {next ? <SiblingLesson node={localizePost(next, locale)} /> : null}
        {prev ? (
          <SiblingLesson node={localizePost(prev, locale)} type="prev" />
        ) : null}
      </div>
    </div>
  )
}
export const ChapterPost = props => `This is chapter post`
export const RequirementPost = props => {
  const { post } = props.data
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
          {post.tree.children.map(({ node }) => (
            <PostItem {...node} key={node.id} />
          ))}
        </ul>
      </div>
    </div>
  )
}

export const StandalonePost = props => {
  const { post } = props.data

  return (
    <div>
      This is standalone post
      <h1>{post.title}</h1>
      <p>{post.updatedAt}</p>
      <PostTechs stack={post.stack} />
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
  )
}

const SiblingLesson = ({ node: { title, slug, status }, type = `next` }) => {
  const { translate } = useLocale()
  const key = type === `next` ? type : `previous`
  const heading = (
    <>
      {translate(key, `lesson-post`, `page`)} <h4>{title}</h4>
    </>
  )

  return (
    <div>
      {status === `soon` ? (
        <>
          {heading}
          <p>Soon</p>
        </>
      ) : (
        <Link to={slug}>{heading}</Link>
      )}
    </div>
  )
}

const PostTranslationList = ({ translations }) => (
  <div>
    <h4>Translations:</h4>
    <ul>
      {translations.map(tpost => (
        <Link key={tpost.id} to={tpost.slug} locale={tpost.locale}>
          <li>{tpost.locale}</li>
        </Link>
      ))}
    </ul>
  </div>
)

const localizePost = (post, locale) => {
  return post.translations.find(pt => pt.locale === locale) || post
}
