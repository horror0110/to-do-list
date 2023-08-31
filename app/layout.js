import { GlobalProvider } from '@/context/GlobalContext'
import './globals.css'
import { Poppins } from 'next/font/google'
import AuthProvider from './components/AuthProvider/AuthProvider'
import Navbar from './components/Navbar/Navbar'


const poppins = Poppins({ subsets: ['latin'] , weight: '300'})

export const metadata = {
  title: 'To Do List ',
  description: 'To do list app',
}

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body className={poppins.className}>
        <GlobalProvider>
          <AuthProvider>
         <Navbar/>
          {children}
          </AuthProvider>
        
        </GlobalProvider>
       
        </body>
    </html>
  )
}
