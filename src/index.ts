import * as fastify from 'fastify'

const stack = []

const server = fastify()

server.get('/', {}, (_, reply) => {
  reply.send('Hallo')
})

server.get('/world', {}, (_, reply) => {
  reply.send({ hello: 'world' })
})

server.post('/pop', {}, (_, reply) => {
  if (stack.length <= 0) {
    reply.send({ empty: true })
  }
  const x = stack.pop()
  console.log('Pop', stack)
  reply.send({ x })
})

type PushBody = {
  x: number
}

server.post<unknown, unknown, unknown, PushBody>(
  '/push',
  {
    schema: {
      body: {
        type: 'object',
        properties: {
          x: { type: 'number' }
        },
        required: ['x']
      }
    }
  },
  (request, reply) => {
    stack.push(request.body.x)
    console.log('Push', stack)
    reply.send({ ok: true })
  }
)

server.listen(3000, () => console.log('Server is running'))
