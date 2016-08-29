var Schema = mongoose.Schema;
var FeedSchema = new Schema({
  name     : { type: String,  unique: true },
  url      : String
});

module.exports = db.model('Feed', FeedSchema)
