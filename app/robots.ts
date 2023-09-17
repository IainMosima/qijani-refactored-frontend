import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/checkout/', '/loginSignup/', '/orders/', '/packages/', '/profile/', '/search/'],
    },
    sitemap: 'https://qijani.com/sitemap.xml',
  }
}