// all the routes
const routers = {
  lecture: require("../routes/lecture"),
  consultation: require("../routes/consultation"),
  homeVisit: require("../routes/homeVisit"),
  article: require("../routes/article"),
  reading: require("../routes/reading"),
  sharing: require("../routes/sharing"),
  bio: require("../routes/bio"),
  login: require('../routes/login'),
  user: require('../routes/user'),
  sentence: require('../routes/sentence')
};

module.exports = routers;
