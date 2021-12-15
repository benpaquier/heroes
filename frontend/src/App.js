import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { HeroContextProvider } from './contexts/Hero'
import Home from './Pages/Home'
import NotFound from './Pages/NotFound'
import CreateHero from './Pages/CreateHero'
import Hero from './Pages/Hero'
import GlobalStyle from './styles/global'

const App = () => {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <HeroContextProvider>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/heroes" element={<Home />} />
            <Route path="/heroes/:slug" element={<Hero />}/>
            <Route path="/heroes/create" element={<CreateHero />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </HeroContextProvider>
      </BrowserRouter>
    </>
  )
}

export default App
