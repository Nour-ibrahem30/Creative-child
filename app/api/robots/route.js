import { siteConfig } from '@/lib/seo'

export async function GET() {
    const robotsTxt = `# Robots.txt for ${siteConfig.name}
# https://www.robotstxt.org/robotstxt.html

User-agent: *
Allow: /

# Disallow admin and private pages
Disallow: /admin/
Disallow: /api/
Disallow: /auth/
Disallow: /checkout/
Disallow: /cart/

# Allow search engines to crawl important pages
Allow: /products/
Allow: /categories/
Allow: /offers/
Allow: /about
Allow: /contact

# Sitemap location
Sitemap: ${siteConfig.url}/sitemap.xml

# Crawl-delay for polite crawling
Crawl-delay: 1

# Google specific
User-agent: Googlebot
Allow: /
Crawl-delay: 0

# Bing specific
User-agent: Bingbot
Allow: /
Crawl-delay: 1
`

    return new Response(robotsTxt, {
        headers: {
            'Content-Type': 'text/plain',
            'Cache-Control': 'public, max-age=86400',
        },
    })
}
