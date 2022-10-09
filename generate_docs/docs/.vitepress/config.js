export default {
    title: 'Project Management System',
    description: 'Just playing around.',
    
    themeConfig: {
        logo: '/evolo.png',
        socialLinks: [
            { icon: 'github', link: 'https://github.com/devanshi39/SE-Project-Group24-Evolo-Project_Management_System' }],
            
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Guide', link: '/gettingStarted' },
        ],
          sidebar: [
            {
              text: 'Introduction',
              collapsible: true,
              items: [
                // This shows `/config/index.md` page.
                { text: 'About', link: '/' }, // /config/index.md
                { text: 'Directory Structure', link: '/directoryStructure' },
                { text: 'Getting Started', link: '/gettingStarted' }, // /config/three.md
               
              ]
            },
            {
              text: 'Features',
              collapsible: true,
              items: [
                // This shows `/config/index.md` page.
                { text: 'Add Project', link: '/addProjects' },
                { text: 'Add Members ', link: '/addMembers' }, 
                { text: 'Remove a member', link: '/removeMembers' },
                { text: 'Add Task', link: '/Tasks/assignTask' }, // /config/four.md
                { text: 'Add work', link: '/addWork' },
                { text: 'Delete a Task', link: '/Tasks/deleteTask' },
                { text: 'Calculate', link: '/calculator' },
                { text: 'Verify work', link: '/verifyWork' }

              ]
            },
            {
                text: 'Contributers',
                collapsible: true,
                items: [
                  // This shows `/config/index.md` page.
                  { text: 'Team', link: '/team' },
                  
  
                ]
              },
            
          ]
          
        
      }
  }