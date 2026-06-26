// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'ECLAT.Retrieve Docs',
  tagline: 'Request & Roster Pipeline · Chart Review & Repository',
  favicon: 'img/favicon.ico',

  // GitHub Pages project site: https://neuzan2.github.io/retrieve-docs/
  url: 'https://neuzan2.github.io',
  baseUrl: '/retrieve-docs/',
  organizationName: 'neuzan2', // GitHub user/org that owns the repo
  projectName: 'retrieve-docs', // repo name
  trailingSlash: false,

  // Our docs use many in-page anchor links and a couple of external relative
  // references; warn (don't fail the build) if any don't resolve.
  onBrokenLinks: 'warn',
  onBrokenAnchors: 'warn',

  i18n: {defaultLocale: 'en', locales: ['en']},

  // Render ```mermaid fences, and parse .md as CommonMark (so literal {…} and
  // <code> in the guides aren't treated as MDX/JSX).
  markdown: {
    mermaid: true,
    format: 'detect',
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/', // docs-only mode: docs served at the site root
          sidebarPath: './sidebars.js',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'ECLAT.Retrieve',
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docsSidebar',
            position: 'left',
            label: 'Documentation',
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: 'Proprietary & Confidential · ECLAT.Retrieve',
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
      mermaid: {
        theme: {light: 'neutral', dark: 'dark'},
      },
    }),
};

export default config;
