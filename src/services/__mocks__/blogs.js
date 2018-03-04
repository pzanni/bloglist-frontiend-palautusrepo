let token = null

let blogs = [
  {
    id: "5a451df7571c224a31b5c8ce",
    author: 'Mock Author',
    tite: 'Mock title',
    url: 'Mock url',
    likes: 2,
    user: {
      _id: "5a437a9e514ab7f168ddf138",
      username: "anni",
      name: "Anni Puurunen"
    }
  },
  {
    id: "5a451e21e0b8b04a45638211",
    author: 'Mock Author',
    tite: 'Mock title',
    url: 'Mock url',
    likes: 2,
    user: {
      _id: "5a437a9e514ab7f168ddf138",
      username: "anni",
      name: "Anni Puurunen"
    }
  },
  {
    id: "5a451e30b5ffd44a58fa79ab",
    author: 'Mock Author',
    tite: 'Mock title',
    url: 'Mock url',
    likes: 2,
    user: {
      _id: "5a437a9e514ab7f168ddf138",
      username: "anni",
      name: "Anni Puurunen"
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, blogs }