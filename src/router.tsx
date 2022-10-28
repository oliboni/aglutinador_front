import ResponsiveAppBar from 'components/ResponsiveAppBar'
import Home from 'pages/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

export default function AppRouter() {
   return (
      <main>
         <Router>
            <ResponsiveAppBar />
            <Routes>
               <Route path='/' element={<Home />} />
            </Routes>
         </Router>
      </main>
   )
}
