/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://votre-domaine.com',
    generateRobotsTxt: true,
    additionalPaths: async (config) => {
        return [{ loc: '/server-sitemap.xml', priority: 1 }]
    },
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
            },
        ],
        additionalSitemaps: [
            `${process.env.NEXT_PUBLIC_SITE_URL || 'https://votre-domaine.com'}/server-sitemap.xml`,
        ],
    },
}