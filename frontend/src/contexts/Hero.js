import { createContext } from "react"

const apiUrl = `http://localhost:5000/heroes`

const HeroContext = createContext({})

const HeroContextProvider = ({ children }) => {
  const getHeroes = () => {
    return fetch(apiUrl)
      .then(response => response.json())
      .then(data => data)
  }

  const getHero = slug => {
    return fetch(`${apiUrl}/${slug}`)
      .then(response => response.json())
      .then(data => data)
  }

  const deleteHero = slug => {
    return fetch(`${apiUrl}/${slug}`, {
      method: 'delete'
    })
      .then(response => response)
  }

  // le parametere body correspond au pouvoir que j'ajoute
  // => { power: "invisible" }
  const updatePowers = (slug, body) => {
    return fetch(`${apiUrl}/${slug}/powers`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(data => data)
  }

  const deletePower = (slug, power) => {
    return fetch(`${apiUrl}/${slug}/power/${power}`, {
      method: 'delete'
    })
      .then(response => response)
  }

  const updateHero = (slug, body) => {
    return fetch(`${apiUrl}/${slug}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(data => data)
  }

  const createHero = body => {
    return fetch(`${apiUrl}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(data => data)
  }

  const value = {
    getHeroes,
    getHero,
    deleteHero,
    updatePowers,
    deletePower,
    updateHero,
    createHero
  }

  return (
    <HeroContext.Provider value={value}>
      {children}
    </HeroContext.Provider>
  )
}

export {
  HeroContext,
  HeroContextProvider
}