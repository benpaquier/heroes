const express = require("express")
const app = express()

let heroes = require("../heroes.json")

// dans la théorie, on sépare les middleware des routes
// middleware qui verifie qu'un hero n'existe pas avant de faire la suite
const failIfExists = (req, res, next) => {
  const { name } = req.body
  const hero = heroes.find(hero => hero.name === name)

  if (hero) {
    res.status(409).send("Hero already exists")
  } else {
    next()
  }
}

// middleware qui verifie qu'un hero existe avant de faire la suite
const successIfExists = (req, res, next) => {
  const { slug } = req.params
  const hero = heroes.find(hero => hero.slug === slug)

  if (hero) {
    next()
  } else {
    res.send(404).send("Hero not found")
  }
}

const validateHero = (req, res, next) => {
  // Object.keys permet de recuperer dans un tableau de string
  // toutes les clés de mon objet en parametre
  const allowedKeys = Object.keys(heroes[0])
  const bodyKeys = Object.keys(req.body)
  const invalidKey = bodyKeys.find(key => !allowedKeys.includes(key))

  if (invalidKey) {
    res.status(400).send("Requete invalide")
  } else {
    next()
  }
}

app.get('/', (req, res) => { // => /heroes
  res.json(heroes)
})

app.get('/:slug', successIfExists, (req, res) => { // => /heroes/:slug
  const { slug } = req.params // => const slug = req.params.slug
  const hero = heroes.find(hero => hero.slug === slug)
  
  res.json(hero)
})

app.get('/:slug/powers', successIfExists, (req, res) => {
  const { slug } = req.params
  const hero = heroes.find(hero => hero.slug === slug)

  res.json(hero.power)
})

app.post('/', failIfExists, validateHero, (req, res) => {
  console.log(req.body)

  const hero = {
    slug: req.body.name.toLowerCase().replace(/[^\w]/gi, '-'),
    ...req.body
  }

  heroes = [ ...heroes, hero ]
  res.json(hero)
})

app.put('/:slug/powers', successIfExists, (req, res) => {
  const { slug } = req.params
  const hero = heroes.find(hero => hero.slug === slug)
  hero.power = [ ...hero.power, req.body.power ] // => hero.power.push(req.body.power)

  res.json(hero)
})

app.delete('/:slug', successIfExists, (req, res) => {
  const { slug } = req.params
  const hero = heroes.find(hero => hero.slug === slug)

  // methode 1: splice
  // const index = heroes.findIndex(hero => hero.slug === slug)
  // heroes.splice(index, 1)

  // methode 2: filter
  heroes = heroes.filter(hero => hero.slug !== slug)

  res.json(`The super hero ${hero.name} has been deleted`)
})

app.delete('/:slug/power/:power', successIfExists, (req, res) => {
  const { slug, power } = req.params
  const hero = heroes.find(hero => hero.slug === slug)
  hero.power = hero.power.filter(p => p !== power)

  res.json(`${power} deleted`)
})

app.put('/:slug', successIfExists, validateHero, (req, res) => {
  const { slug } = req.params
  const index = heroes.findIndex(hero => hero.slug === slug)

  heroes[index] = {
    // hero de base
    ...heroes[index],

    // chaque clés de req.body dont le nom correspond a
    // une clé du hero de base va mettre a jour la valeur
    // de la clé du hero de base
    ...req.body,
    slug: req.body.name ? req.body.name.toLowerCase().replace(/[^\w]/gi, '-') : heroes[index].slug
  }

  // req.body
  // {
  //   name: "Batman"
  // }
  
  // thor de base
  // const thor = {
  //   slug: "thor",
  //   name: "Thor",
  //   power: ["electricty", "worthy"],
  //   color: "blue",
  //   isAlive: true,
  //   age: 300,
  //   image: "https://www.bdfugue.com/media/catalog/product/cache/1/image/400x/17f82f742ffe127f42dca9de82fb58b1/9/7/9782809465761_1_75.jpg",

  //   ...req.body => equivaut a mettre a jour seulement la clé `name` avec "Batman"
  
  // }

  res.json(heroes[index])
})

module.exports = app
