const {Router} = require('express');
const {check, validationResult} = require('express-validator');
const Logs = require('../models/Logs');
const LogItem = require('../models/LogItem');
const router = Router();

router.post('/log',
    [
        check('date', 'Date is required').exists(),
        check('message', 'Message is required').exists(),
    ],
    async (req,res) => {
    try{

        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrect data when writing log =('
            });
        }

        const {date, message} = req.body;

        const dateObj = new Date(date);

        const normalizedDate = getDate(dateObj);

        const time = dateObj.toLocaleTimeString();

        const logCandidate = await Logs.findOne({date: normalizedDate});

        if (logCandidate) {
            const logItem = {message, time, date: normalizedDate}
            logCandidate.logs = [...logCandidate.logs, logItem];
            await logCandidate.save()
            const logsForRes = logCandidate.logs.map(log => (
                {
                    time: log.time,
                    message: log.message,
                }
            ));
            return res.json({logs:logsForRes, message: `Logs from ${normalizedDate}`});
        }else{
            const logItem = {message, time, date: normalizedDate};
            const log = new Logs({date: normalizedDate,logs: [logItem]});
            await log.save();
            return res.json({logs: log.logs, message: 'Log saved =)'});
        }

    } catch (e) {
        res.status(500).json({message: 'Failed to write log, sorry =('});
    }
});

const getDate = (dateObj) => {
    const month = dateObj.getUTCMonth() + 1;
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();

    return year + "/" + month + "/" + day;
}


module.exports = router;
