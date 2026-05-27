import { createFileRoute, Link } from '@tanstack/react-router'
import { allBlogs } from 'content-collections'
import { marked } from 'marked'
import { ArrowLeft, Calendar } from 'lucide-react'

export const Route = createFileRoute('/blog/$slug')({
  component: BlogPost,
})

function BlogPost() {
  const { slug } = Route.useParams()
  const post = allBlogs.find((p) => p._meta.path === slug)

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0a192f' }}>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-200 mb-4">Post not found</h1>
          <Link to="/" className="text-teal-400 hover:text-teal-300 transition-colors">
            Back to portfolio
          </Link>
        </div>
      </div>
    )
  }

  const html = marked(post.content)

  return (
    <div className="min-h-screen" style={{ background: '#0a192f' }}>
      <div className="max-w-2xl mx-auto px-6 py-16">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-teal-300 transition-colors text-sm mb-12"
        >
          <ArrowLeft size={14} />
          Back to portfolio
        </Link>

        <article>
          <header className="mb-10">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium text-teal-300 ring-1 ring-inset ring-teal-400/20"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-200 mb-4 leading-snug">
              {post.title}
            </h1>
            <div className="flex items-center gap-3 text-slate-500 text-sm">
              <Calendar size={13} />
              <time>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <span>·</span>
              <span>{post.author}</span>
            </div>
          </header>

          <div
            className="text-slate-400 leading-relaxed text-[15px] space-y-4 [&_h2]:text-slate-200 [&_h2]:font-semibold [&_h2]:text-xl [&_h2]:mt-8 [&_h2]:mb-3 [&_ul]:space-y-2 [&_ul]:list-disc [&_ul]:pl-5 [&_strong]:text-slate-300 [&_em]:text-teal-400 [&_em]:not-italic [&_em]:font-medium"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </article>
      </div>
    </div>
  )
}
