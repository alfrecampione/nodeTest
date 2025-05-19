import Sensible from '@fastify/sensible';
import { PrismaClient } from '../generated/prisma/index.js';
const prisma = new PrismaClient();
export default async function (fastify) {
    await fastify.register(Sensible);
    fastify.route({
        method: 'POST',
        url: '/users',
        schema: {
            tags: ['User'],
            summary: 'Create a new user',
            body: {
                type: 'object',
                required: ['email'],
                properties: {
                    email: { type: 'string' },
                    name: { type: 'string' },
                },
            },
            response: {
                200: {
                    type: 'object',
                    properties: {
                        message: { type: 'string' },
                        success: { type: 'boolean' },
                        data: {
                            type: 'object',
                            properties: {
                                id: { type: 'number' },
                                email: { type: 'string' },
                                name: { type: 'string' },
                            },
                        },
                    },
                },
            },
        },
        handler: async (request, reply) => {
            const data = request.body;
            const user = await prisma.user.create({ data });
            reply.send({ message: 'User created successfully', success: true, data: user });
        },
    });
    fastify.route({
        method: 'GET',
        url: '/users/:id',
        schema: {
            tags: ['User'],
            summary: 'Get a user by ID',
            params: {
                type: 'object',
                required: ['id'],
                properties: {
                    id: { type: 'number' },
                },
            },
            response: {
                200: {
                    type: 'object',
                    properties: {
                        message: { type: 'string' },
                        success: { type: 'boolean' },
                        data: {
                            type: 'object',
                            properties: {
                                id: { type: 'number' },
                                email: { type: 'string' },
                                name: { type: 'string' },
                            },
                        },
                    },
                },
            },
        },
        handler: async (request, reply) => {
            const { id } = request.params;
            const user = await prisma.user.findUnique({ where: { id } });
            if (!user)
                throw fastify.httpErrors.notFound('User not found');
            reply.send({ message: 'User retrieved successfully', success: true, data: user });
        },
    });
    fastify.route({
        method: 'PUT',
        url: '/users/:id',
        schema: {
            tags: ['User'],
            summary: 'Update a user by ID',
            params: {
                type: 'object',
                required: ['id'],
                properties: {
                    id: { type: 'number' },
                },
            },
            body: {
                type: 'object',
                properties: {
                    email: { type: 'string' },
                    name: { type: 'string' },
                },
            },
            response: {
                200: {
                    type: 'object',
                    properties: {
                        message: { type: 'string' },
                        success: { type: 'boolean' },
                        data: {
                            type: 'object',
                            properties: {
                                id: { type: 'number' },
                                email: { type: 'string' },
                                name: { type: 'string' },
                            },
                        },
                    },
                },
            },
        },
        handler: async (request, reply) => {
            const { id } = request.params;
            const data = request.body;
            const user = await prisma.user.update({ where: { id }, data });
            reply.send({ message: 'User updated successfully', success: true, data: user });
        },
    });
    fastify.route({
        method: 'DELETE',
        url: '/users/:id',
        schema: {
            tags: ['User'],
            summary: 'Delete a user by ID',
            params: {
                type: 'object',
                required: ['id'],
                properties: {
                    id: { type: 'number' },
                },
            },
            response: {
                200: {
                    type: 'object',
                    properties: {
                        message: { type: 'string' },
                        success: { type: 'boolean' },
                    },
                },
            },
        },
        handler: async (request, reply) => {
            const { id } = request.params;
            await prisma.user.delete({ where: { id } });
            reply.send({ message: 'User deleted successfully', success: true });
        },
    });
    fastify.route({
        method: 'POST',
        url: '/posts',
        schema: {
            tags: ['Post'],
            summary: 'Create a new post',
            body: {
                type: 'object',
                required: ['title', 'authorId'],
                properties: {
                    title: { type: 'string' },
                    content: { type: 'string' },
                    published: { type: 'boolean' },
                    authorId: { type: 'number' },
                },
            },
        },
        handler: async (request, reply) => {
            const data = request.body;
            const post = await prisma.post.create({ data });
            reply.send({ message: 'Post created successfully', success: true, data: post });
        },
    });
    fastify.route({
        method: 'GET',
        url: '/posts/:id',
        schema: {
            tags: ['Post'],
            summary: 'Get a post by ID',
            params: {
                type: 'object',
                required: ['id'],
                properties: {
                    id: { type: 'number' },
                },
            },
        },
        handler: async (request, reply) => {
            const { id } = request.params;
            const post = await prisma.post.findUnique({ where: { id } });
            if (!post)
                throw fastify.httpErrors.notFound('Post not found');
            reply.send({ message: 'Post retrieved successfully', success: true, data: post });
        },
    });
    fastify.route({
        method: 'PUT',
        url: '/posts/:id',
        schema: {
            tags: ['Post'],
            summary: 'Update a post by ID',
            params: {
                type: 'object',
                required: ['id'],
                properties: {
                    id: { type: 'number' },
                },
            },
            body: {
                type: 'object',
                properties: {
                    title: { type: 'string' },
                    content: { type: 'string' },
                    published: { type: 'boolean' },
                },
            },
        },
        handler: async (request, reply) => {
            const { id } = request.params;
            const data = request.body;
            const post = await prisma.post.update({ where: { id }, data });
            reply.send({ message: 'Post updated successfully', success: true, data: post });
        },
    });
    fastify.route({
        method: 'DELETE',
        url: '/posts/:id',
        schema: {
            tags: ['Post'],
            summary: 'Delete a post by ID',
            params: {
                type: 'object',
                required: ['id'],
                properties: {
                    id: { type: 'number' },
                },
            },
        },
        handler: async (request, reply) => {
            const { id } = request.params;
            await prisma.post.delete({ where: { id } });
            reply.send({ message: 'Post deleted successfully', success: true });
        },
    });
    fastify.route({
        method: 'POST',
        url: '/profiles',
        schema: {
            tags: ['Profile'],
            summary: 'Create a new profile',
            body: {
                type: 'object',
                required: ['userId'],
                properties: {
                    bio: { type: 'string' },
                    userId: { type: 'number' },
                },
            },
        },
        handler: async (request, reply) => {
            const data = request.body;
            const profile = await prisma.profile.create({ data });
            reply.send({ message: 'Profile created successfully', success: true, data: profile });
        },
    });
    fastify.route({
        method: 'GET',
        url: '/profiles/:id',
        schema: {
            tags: ['Profile'],
            summary: 'Get a profile by ID',
            params: {
                type: 'object',
                required: ['id'],
                properties: {
                    id: { type: 'number' },
                },
            },
        },
        handler: async (request, reply) => {
            const { id } = request.params;
            const profile = await prisma.profile.findUnique({ where: { id } });
            if (!profile)
                throw fastify.httpErrors.notFound('Profile not found');
            reply.send({ message: 'Profile retrieved successfully', success: true, data: profile });
        },
    });
    fastify.route({
        method: 'PUT',
        url: '/profiles/:id',
        schema: {
            tags: ['Profile'],
            summary: 'Update a profile by ID',
            params: {
                type: 'object',
                required: ['id'],
                properties: {
                    id: { type: 'number' },
                },
            },
            body: {
                type: 'object',
                properties: {
                    bio: { type: 'string' },
                },
            },
        },
        handler: async (request, reply) => {
            const { id } = request.params;
            const data = request.body;
            const profile = await prisma.profile.update({ where: { id }, data });
            reply.send({ message: 'Profile updated successfully', success: true, data: profile });
        },
    });
    fastify.route({
        method: 'DELETE',
        url: '/profiles/:id',
        schema: {
            tags: ['Profile'],
            summary: 'Delete a profile by ID',
            params: {
                type: 'object',
                required: ['id'],
                properties: {
                    id: { type: 'number' },
                },
            },
        },
        handler: async (request, reply) => {
            const { id } = request.params;
            await prisma.profile.delete({ where: { id } });
            reply.send({ message: 'Profile deleted successfully', success: true });
        },
    });
}
//# sourceMappingURL=app.js.map