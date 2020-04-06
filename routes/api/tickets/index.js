const tickets = require('express').Router();
const appRoot = require('app-root-path');
const Ticket = require(appRoot + '/models/Ticket');
const handleError = require(appRoot + '/middleware/HandleError');

tickets.get('/', async (req, res) => {
    console.log(`[d] GET request at /api/tickets with query ${JSON.stringify(req.query)}`);
    const ticket = new Ticket();
    try {
        // unvalidated
        const result = await ticket.list({...req.query});
        res.json({
            status: "ok",
            count: result.count,
            tickets: result.tickets,
            settings: result.settings
        });
    } catch (err) {
        handleError(err, res);
    }
})

tickets.post('/', async (req, res) => {
    const ticket = new Ticket();
    try {
        // unvalidated
        const id = await ticket.add({...req.body});
        res.status(201).send(id);
    } catch (err) {
        handleError(err, res);
    }
})

tickets.get('/:id', async (req, res) => {
    try {
        // unvalidated
        const ticket = new Ticket(body.params.id);
        result = await ticket.get();
        res.send(result);
    } catch (err) {
        handleError(err, res);
    }
})

tickets.put('/:id', async (req, res) => {
    try {
        // unvalidated
        const ticket = new Ticket(req.params.id);
        result = await ticket.update(req.body);
        res.send(result);
    } catch (err) {
        handleError(err, res);
    }

})

tickets.delete('/:id', async (req, res) => {
    try {
        // unvalidated
        const ticket = new Ticket();
        const result = await ticket.delete(req.params.id);
        res.send(result);
    } catch (err) {
        handleError(err, res);
    }
})

module.exports = tickets;