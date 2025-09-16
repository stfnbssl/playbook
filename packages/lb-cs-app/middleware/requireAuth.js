// middleware/requireAuth.js
module.exports = function requireAuth(req, res, next) {
  if (req.session && req.session.userId) return next();
  if (req.accepts('html')) {
    const nextUrl = encodeURIComponent(req.originalUrl);
    return res.redirect(`/login?next=${nextUrl}`);
  }
  return res.status(401).json({ error: 'unauthorized' });
};


