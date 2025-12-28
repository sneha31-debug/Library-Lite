const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();

async function testConnection() {
    console.log('Testing database connection...');
    console.log('DATABASE_URL:', process.env.DATABASE_URL);

    try {
        await prisma.$connect();
        console.log('✅ Connected to database successfully!');

        // Try to find a user
        const users = await prisma.user.findMany({ take: 1 });
        console.log('Users found:', users.length);

        await prisma.$disconnect();
        process.exit(0);
    } catch (error) {
        console.error('❌ Connection failed:', error.message);
        process.exit(1);
    }
}

testConnection();
