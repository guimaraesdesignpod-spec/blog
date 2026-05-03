import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getAllArticles } from '@/lib/articles'
import { ArticleMeta } from '@/lib/mdx'

type Lang = 'en' | 'pt'

const META: Record<<LangLang, { title: string; description: string }> = {
  en: { title: 'Brainwire', description: 'AI productivity tools for professionals' },
  pt: { title: 'Brainwire', description: 'Ferramentas de IA para produtividade profissional' },
}

const LABELS: Record<<LangLang, {
  featured: string; read: string; topics: string; all: string;
  newsletter_label: string; newsletter_title: string; newsletter_em: string;
  newsletter_placeholder: string; newsletter_btn: string; back: string;
  recent: string; productivity: string; tools: string;
  footer_about: string; footer_contact: string;
}> = {
  en: {
    featured: 'Featured', read: 'Read article', topics: 'Topics', all: 'All',
    newsletter_label: 'Newsletter', newsletter_title: 'Artificial intelligence,',
    newsletter_em: 'filtered for you.', newsletter_placeholder: 'your@email.com', newsletter_btn: 'Subscribe',
    back: 'Home', recent: 'Recent articles', productivity: 'Productivity', tools: 'Tools',
    footer_about: 'About', footer_contact: 'Contact',
  },
  pt: {
    featured: 'Destaque', read: 'Ler artigo', topics: 'Tópicos', all: 'Todos',
    newsletter_label: 'Newsletter', newsletter_title: 'Inteligência artificial,',
    newsletter_em: 'filtrada para você.', newsletter_placeholder: 'o.seu@email.com', newsletter_btn: 'Subscrever',
    back: 'Início', recent: 'Artigos recentes', productivity: 'Produtividade', tools: 'Ferramentas',
    footer_about: 'Sobre', footer_contact: 'Contacto',
  },
}

interface Props { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<<MetadataMetadata> {
  const { lang } = await params
  const meta = META[lang as Lang]
  if (!meta) return {}
  return { title: meta.title, description: meta.description, alternates: { languages: { en: '/en', pt: '/pt' } } }
}

function LogoMark({ size = 22 }: { size?: number }) {
  const s = Math.round(size * 0.59)
  return (
    <<divdiv style={{
      width: size, height: size, background: 'var(--accent)', borderRadius: 5,
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    }}>
      <<svgsvg width={s} height={s} viewBox="0 0 13 13" fill="none">
        <<circlecircle cx="3" cy="6.5" r="1.5" fill="white" />
        <<circlecircle cx="6.5" cy="3" r="1.5" fill="white" />
        <<circlecircle cx="10" cy="6.5" r="1.5" fill="white" />
        <<circlecircle cx="6.5" cy="10" r="1.5" fill="white" />
        <<lineline x1="3" y1="6.5" x2="6.5" y2="3" stroke="white" strokeWidth="1" opacity="0.5" />
        <<lineline x1="6.5" y1="3" x2="10" y2="6.5" stroke="white" strokeWidth="1" opacity="0.5" />
        <<lineline x1="10" y1="6.5" x2="6.5" y2="10" stroke="white" strokeWidth="1" opacity="0.5" />
        <<lineline x1="6.5" y1="10" x2="3" y2="6.5" stroke="white" strokeWidth="1" opacity="0.5" />
      </svg>
    </div>
  )
}

function HeroCard({ article, lang, labels }: { article: ArticleMeta; lang: Lang; labels: typeof LABELS[Lang] }) {
  const date = new Date(article.date).toLocaleDateString(
    lang === 'pt' ? 'pt-PT' : 'en-US',
    { day: 'numeric', month: 'short', year: 'numeric' }
  )
  const category = article.tags[0] ?? ''
  const href = `/${lang}/${article.slug}`

  return (
    <<divdiv className="home-hero">
      <<divdiv className="hero-inner">
        <<divdiv className="hero-content">
          <div>
            <<divdiv className="hero-tag">{labels.featured}</div>
            <<hh1 className="hero-title">{article.title}</h1>
            <<pp className="hero-excerpt">{article.description}</p>
          </div>
          <<divdiv className="hero-bottom">
            <<divdiv className="hero-meta">
              <span>{date}</span>
              <span>·</span>
              <strong>{article.readingTime}</strong>
              {category && <<>><span>·</span><span>{category}</span>></>}
            </div>
            <<LinkLink href={href} className="btn-read">
              {labels.read}
              <<svgsvg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <<pathpath d="M3 7h8M7.5 4l3.5 3-3.5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
        {article.image && (
          <<divdiv className="hero-img">
            <<spanspan className="hero-img-label">{lang === 'pt' ? 'Novo' : 'New'}</span>
            <<ImageImage
              src={article.image}
              alt={article.imageAlt}
              fill
              className="object-cover"
              sizes="340px"
              priority
              style={{ filter: 'saturate(0.8)' }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

function ArticleCard({ article, lang, wide }: { article: ArticleMeta; lang: Lang; wide?: boolean }) {
  const date = new Date(article.date).toLocaleDateString(
    lang === 'pt' ? 'pt-PT' : 'en-US',
    { day: 'numeric', month: 'short', year: 'numeric' }
  )
  const category = article.tags[0] ?? ''
  const href = `/${lang}/${article.slug}`

  return (
    <<LinkLink href={href} className={`home-card${wide ? ' card-wide' : ''}`}>
      {article.image && (
        <<divdiv className="card-img-wrap">
          <<ImageImage
            src={article.image}
            alt={article.imageAlt}
            fill
            className="card-img"
            sizes={wide ? '(max-width: 900px) 100vw, 520px' : '(max-width: 900px) 100vw, 380px'}
          />
        </div>
      )}
      <<divdiv className="card-body">
        {category && <<divdiv className="card-tag">{category}</div>}
        <<divdiv className="card-title">{article.title}</div>
        <<divdiv className="card-excerpt">{article.description}</div>
        <<divdiv className="card-footer">
          <<spanspan className="card-date">{date}</span>
          <<spanspan className="card-read">
            {article.readingTime}
            <<svgsvg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <<pathpath d="M2 6h8M6.5 3.5L9 6l-2.5 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  )
}

export default async function LangPage({ params }: Props) {
  const { lang } = await params
  if (lang !== 'en' && lang !== 'pt') notFound()

  const articles = getAllArticles(lang as Lang)
  const [featured, ...rest] = articles
  const otherLang = lang === 'en' ? 'pt' : 'en'
  const labels = LABELS[lang as Lang]

  const allTags = [...new Set(articles.flatMap(a => a.tags))].slice(0, 6)

  return (
    <<divdiv style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <<navnav className="home-page-nav">
        <<LinkLink href={`/${lang}`} className="nav-logo">
          <<LogoLogoMark />
          <<spanspan className="logo-text">Brain<<emem style={{ fontStyle: 'italic' }}>wire</em></span>
        </Link>

        <<ulul className="nav-links">
          <<lili><<LinkLink href={`/${lang}`} className="active">{labels.back}</Link></li>
          <<lili><<LinkLink href={`/${lang}/category/ia`}>IA</Link></li>
          <<lili><<LinkLink href={`/${lang}/category/productivity`}>{labels.productivity}</Link></li>
          <<lili><<LinkLink href={`/${lang}/category/tools`}>{labels.tools}</Link></li>
        </ul>

        <<LinkLink href={`/${otherLang}`} className="nav-lang">
          {lang === 'en' ? 'EN · PT' : 'PT · EN'}
        </Link>
      </nav>

      {featured && <<HeroHeroCard article={featured} lang={lang as Lang} labels={labels} />}

      {allTags.length > 0 && (
        <<divdiv className="topics-row">
          <<spanspan className="topic-pill active">{labels.all}</span>
          {allTags.map(tag => (
            <<spanspan key={tag} className="topic-pill">{tag}</span>
          ))}
        </div>
      )}

      {rest.length > 0 && (
        <<divdiv className="home-grid-wrap">
          <<divdiv className="section-label-row">
            <span>{labels.recent}</span>
          </div>
          <<divdiv className="cards-grid">
            {rest.map((article, i) => (
              <<ArticleArticleCard key={article.slug} article={article} lang={lang as Lang} wide={i === 0 && rest.length > 1} />
            ))}
          </div>
        </div>
      )}

      {articles.length === 0 && (
        <<divdiv style={{ padding: '80px 2.5rem', textAlign: 'center' }}>
          <<pp style={{ fontSize: '14px', color: 'var(--ink-light)' }}>
            {lang === 'en' ? 'First article coming soon.' : 'Primeiro artigo em breve.'}
          </p>
        </div>
      )}
    </div>
  )
}
