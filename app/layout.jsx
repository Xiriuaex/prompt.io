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
                <img src="../assets/images/abstract.jpg" className='absolute -z-50 min-w-[100%] h-[65vh] sm:h-[70vh] bg-fixed bg-center bg-no-repeat bg-cover top-0' alt="" />
                <Nav />
                {children}
            </main>
        </Provider>
        </body>
    </html>
  )
}

export default Layout
