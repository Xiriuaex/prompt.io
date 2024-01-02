import '@/styles/globals.css';

import Nav from '@/components/Nav';
import Provider from '@/components/Provider';

export const metadata= {
    title:"Prompt.io",
    description:"Discover & Share AI Prompts"
}

const Layout = ({ children }) => {
  return (
    <html lang='en'>
        <body>
        <Provider>
            <main className='app'>
                <img src="../public/assets/images/abstract.jpg" alt="" />
                <Nav />
                {children}
            </main>
        </Provider>
        </body>
    </html>
  )
}

export default Layout
