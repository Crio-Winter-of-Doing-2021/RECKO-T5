const __prod__ = process.env.NODE_ENV === "production"
const PORT = process.env.PORT || 5000

module.exports = {
  __prod__,
  PORT
}