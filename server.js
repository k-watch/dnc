const jsonServer = require('json-server')

const auth = require('json-server-auth')

const app = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults({
  static: './build',
})

const port = process.env.PORT || 8000

app.use(middlewares)
app.db = router.db
const rules = auth.rewriter({
  users: 660,
  userSetting: 660,
  accounts: 660,
})

app.use(rules)
app.use(auth)
app.use(router)

app.listen(port, () => {
  console.log('JSON Server is running...')
})
module.exports = server
