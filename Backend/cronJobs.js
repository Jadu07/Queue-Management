const cron = require('node-cron');
const prisma = require('./DB/db.config');

const initCronJobs = () => {
    cron.schedule('0 0 * * *', async () => {
        console.log('Running scheduled nightly cleanup...');
        try {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const incompleteEntries = await prisma.queueEntry.updateMany({
                where: {
                    OR: [{ status: 'WAITING' }, { status: 'SERVING' }],
                    createdAt: {
                        lt: today
                    }
                },
                data: {
                    status: 'SKIPPED'
                }
            });

            console.log(`All entries created befor 12:00 AM today have been marked as SKIPPED.`);
        } catch (error) {
            console.error('Error running nightly cleanup job:', error);
        }
    });
};

module.exports = initCronJobs;
