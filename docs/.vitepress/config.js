export default {
    title: 'Project Management System',
    description: 'Just playing around.',
    
    themeConfig: {
        logo: '/logo2.jpg',
        nav: [
            { text: 'Guide', link: '/gettingStarted' },
            { text: 'Guide', link: '/gettingStarted' },
            { text: 'Guide', link: '/gettingStarted' },
            { text: 'Guide', link: '/gettingStarted' }
            
          ],
          sidebar: [
            {
              text: 'Introduction',
              collapsible: true,
              items: [
                // This shows `/config/index.md` page.
                { text: 'About', link: '/' }, // /config/index.md
                { text: 'Introduction', link: '/Introduction' },
                { text: 'Getting Started', link: '/gettingStarted' }, // /config/three.md
               
              ]
            },
            {
              text: 'API Endpoints',
              collapsible: true,
              items: [
                // This shows `/config/index.md` page.
                { text: 'Add member', link: '/Introduction' }, // /config/index.md
                { text: 'delete member', link: '/' }, // /config/three.md
                { text: 'update member', link: '/' } // /config/four.md
              ]
            }
          ]
          
        
      }
  }