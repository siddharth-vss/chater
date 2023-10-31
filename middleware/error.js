const notFound = (req, res) => {
    return res.status(400).json("page not found");
}
const internal = (req, res) => {
    return res.status(500).json("internal server Error");
}


module.exports = {
    notFound,
    internal
}