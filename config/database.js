const mongoose = require('mongoose');

const dbUrl = `mongodb+srv://shubhammahatmamongoosetech:yT9CdgyhCzsQNr9c@cluster0.fsq2o.mongodb.net/chat_application?retryWrites=true&w=majority&appName=Cluster0`

const connect = async () => {
   await mongoose.connect(dbUrl);
}

module.exports = connect;