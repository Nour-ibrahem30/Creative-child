// SEO Configuration - الطفل المبدع
export const siteConfig = {
  name: 'الطفل المبدع',
  nameEn: 'Creative Child',
  description: 'متجر الطفل المبدع - أفضل متجر لألعاب الأطفال والوسائل التعليمية في مصر. ألعاب آمنة وتعليمية بأسعار مناسبة مع توصيل لجميع المحافظات.',
  url: 'https://creative-child.com',
  ogImage: '/images/og-image.jpg',
  links: {
    facebook: 'https://www.facebook.com/profile.php?id=100063525355764',
    instagram: 'https://instagram.com/creativechild_eg',
    whatsapp: 'https://wa.me/20111319087',
  },
  contact: {
    phone: '+20111319087',
    phone2: '+201021843420',
    email: 'creative.kid.world.online@gmail.com',
    address: 'القاهرة، مصر',
  },
}

// Generate metadata for pages
export function generateMetadata({
  title,
  description,
  keywords = [],
  image,
  url,
  type = 'website',
}) {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name
  const fullDescription = description || siteConfig.description
  const fullUrl = url ? `${siteConfig.url}${url}` : siteConfig.url
  const fullImage = image || siteConfig.ogImage

  const defaultKeywords = [
    'ألعاب أطفال',
    'ألعاب تعليمية',
    'وسائل تعليمية',
    'ألعاب مونتيسوري',
    'متجر ألعاب',
    'ألعاب آمنة',
    'هدايا أطفال',
    'ألعاب خشبية',
    'الطفل المبدع',
    'مصر',
    'القاهرة',
    'toys egypt',
    'educational toys',
    'kids toys',
  ]

  return {
    title: fullTitle,
    description: fullDescription,
    keywords: [...defaultKeywords, ...keywords].join(', '),
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: fullUrl,
      languages: {
        'ar-EG': fullUrl,
        'en-US': `${fullUrl}?lang=en`,
      },
    },
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      url: fullUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: 'ar_EG',
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: fullDescription,
      images: [fullImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-verification-code',
    },
  }
}

// Generate product structured data (JSON-LD)
export function generateProductSchema(product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images,
    sku: product.sku,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    offers: {
      '@type': 'Offer',
      url: `${siteConfig.url}/products/${product.slug}`,
      priceCurrency: 'EGP',
      price: product.price,
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: siteConfig.name,
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviews,
    },
  }
}

// Generate organization structured data
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    alternateName: siteConfig.nameEn,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/logo.png`,
    description: siteConfig.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'القاهرة',
      addressCountry: 'EG',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteConfig.contact.phone,
      contactType: 'customer service',
      availableLanguage: ['Arabic', 'English'],
    },
    sameAs: [
      siteConfig.links.facebook,
      siteConfig.links.instagram,
    ],
  }
}

// Generate breadcrumb structured data
export function generateBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  }
}

// Generate FAQ structured data
export function generateFAQSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

// Generate local business structured data
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: siteConfig.name,
    image: `${siteConfig.url}/images/store.jpg`,
    '@id': siteConfig.url,
    url: siteConfig.url,
    telephone: siteConfig.contact.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'شارع التحرير',
      addressLocality: 'القاهرة',
      addressCountry: 'EG',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 30.0444,
      longitude: 31.2357,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '09:00',
        closes: '21:00',
      },
    ],
    priceRange: '$$',
  }
}
