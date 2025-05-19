import Fastify from 'fastify';
import App from './app.js';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
async function start() {
    const fastify = Fastify({
        logger: true,
    });
    fastify.register(require('@fastify/cors'), {
        origin: '*',
    });
    await fastify.register(swagger, {
        swagger: {
            info: {
                title: 'Fastify API',
                description: 'API documentation for Fastify application',
                version: '1.0.0',
            },
            host: 'localhost:8081',
            schemes: ['http'],
            consumes: ['application/json'],
            produces: ['application/json'],
        },
    });
    await fastify.register(swaggerUi, {
        routePrefix: '/docs',
        staticCSP: true,
        transformStaticCSP: (header) => header,
    });
    await fastify.register(App);
    await fastify.listen({
        host: '0.0.0.0',
        port: 8081,
    });
}
start().catch(err => {
    console.error(err);
    process.exit(1);
});
//# sourceMappingURL=index.js.map