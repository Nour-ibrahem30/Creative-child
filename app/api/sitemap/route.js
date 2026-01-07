import { products, categories } from '@/lib/products'
import { siteConfig } from '@/lib/seo'

export async function GET() {
  const baseUrl = siteConfig.url

  const staticPages = [
    { url: '', priority: '1.0', changefreq: 'daily' },
    { url: '/products', priority: '0.9', changefreq: 'daily' },
    { url: '/categories', priority: '0.8', changefreq: 'weekly' },
    { url: '/offers', priority: '0.8', changefreq: 'daily' },
    { url: '/about', priority: '0.6', changefreq: 'monthly' },
    { url: '/contact', priority: '0.6', changefreq: 'monthly' },
  ]

  const productPages = products.map(product => ({
    url: `/products/${product.slug}`,
    priority: '0.7',
    changefreq: 'weekly',
    lastmod: new Date().toISOString().split('T')[0],
  }))

  const categoryPages = categories.map(category => ({
    url: `/categories/${category.slug}`,
    priority: '0.8',
    changefreq: 'weekly',
  }))

  const allPages = [...staticPages, ...productPages, ...categoryPages]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    ${page.lastmod ? `<lastmod>${page.lastmod}</lastmod>` : ''}
  </url>`).join('\n')}
</urlset>`

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
