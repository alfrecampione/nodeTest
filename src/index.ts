import Fastify from 'fastify'
import App from './app.js'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import cors from '@fastify/cors';

// TODO: Add a logger to the app with a JWT token

async function start(): Promise<void> {
  const fastify = Fastify({
    logger: true,
  })

  fastify.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });

  await fastify.register(swagger, {
    swagger: {
      info: {
        title: 'Fastify API',
        description: 'API documentation for Fastify application',
        version: '1.0.0',
      },
      consumes: ['application/json'],
      produces: ['application/json'],
    },
  });

  await fastify.register(swaggerUi, {
    routePrefix: '/docs',
    staticCSP: true,
    transformStaticCSP: (header) => header,
  });

  fastify.get('/', async (request, reply) => {
    reply.redirect('/docs');
  });

  await fastify.register(App)

  await fastify.listen({
    host: '0.0.0.0',
    port: 8081,
  })
}

start().catch(err => {
  console.error(err)
  process.exit(1)
})