const cron = require('node-cron');
const prisma = require('./DB/db.config');

const initCronJobs = () => {
    // Schedule to run every day at midnight (00:00)
    cron.schedule('0 0 * * *', async () => {
        console.log('Running scheduled nightly cleanup...');
        try {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            // Find all entries that are WAITING or SERVING and were created before today
            const incompleteEntries = await prisma.queueEntry.updateMany({
                where: {
                    OR: [{ status: 'WAITING' }, { status: 'SERVING' }],
                    createdAt: {
                        lt: today // Less than today (i.e., yesterday or older)
                    }
                },
                data: {
                    status: 'SKIPPED'
                }
            });

            console.log(`Nightly cleanup complete. Marked ${incompleteEntries.count} entries as SKIPPED.`);
        } catch (error) {
            console.error('Error running nightly cleanup job:', error);
        }
    });
};

module.exports = initCronJobs;
