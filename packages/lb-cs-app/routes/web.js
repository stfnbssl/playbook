const express = require('express');
const router = express.Router();

// Pagina di login
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/login.html'));
});

// Logout via browser UI (redirect)
router.get('/logout', (req, res) => {
  req.session = null; // invalida sessione
  res.redirect('/');  // torna alla home pubblica
});

// Submit login (form urlencoded)
router.post('/login', express.urlencoded({ extended: false }), (req, res) => {
    const { user_id, password, next } = req.body || {};
    if (user_id in users && users[user_id] === password) {
        req.session.userId = user_id;
        return res.redirect(next || '/');
    }
    return res.status(401).send('Credenziali non valide');
});

// altre pagine "web" non-API possono stare qui, es:
// router.get('/', (req, res) => { res.sendFile(...); });

module.exports = router;
