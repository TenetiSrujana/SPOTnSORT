// Express.js example
app.post("/api/check-email", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) return res.json({ available: false });
  return res.json({ available: true });
});
