// Simple session-based auth middleware.
// Requires app to set req.session.user when logged in.
// Aligns with Master: cookie-session, sameSite=lax, httpOnly.
module.exports = function requireAuth(req, res, next){
  try{
    if (req.session && req.session.user){
      return next();
    }
    return res.status(401).json({ error: 'unauthenticated' });
  } catch (err){
    return res.status(500).json({ error: 'internal', message: String(err) });
  }
};
