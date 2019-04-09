import * as fastify from 'fastify'

const server = fastify()

server.get('/', {}, (_, reply) => {
  reply.send('Hallo')
})

server.listen(3000, () => console.log('Server is running'))
