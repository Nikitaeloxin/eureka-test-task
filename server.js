const express = require('express');
const app = express();

const addon = require('bindings')('checkPrivilege.node')

app.use(express.static('.'));
app.use(express.urlencoded({ extended: true }));

app.post('/checkPrivilege', (req, res) => {
    const { username } = req.body;
    const privilege = addon.checkPrivilege(username);
    res.send(privilege);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});