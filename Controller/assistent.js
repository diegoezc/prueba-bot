const mongoose = require("mongoose")

const historySchema = mongoose.Schema({
  user: {
    type: String,
    required : true
  },
  message: {
    type: String,
    required: true
  },
  response: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    required: true
  },
  dateFormat: {
    type: String,
    required: true
  },
  leido: {
    type: String,
    default: false
  },
  prompt_tokens: {
    type:String,
    required: false
  },
  completion_tokens: {
    type:String,
    required: false
  },
  tokens: {
    type:Number,
    required: false
  },
  prompt_tokens: {
    type:String,
    required: false
  },
  completion_tokens: {
    type:String,
    required: false
  },
  tipo:{
    type: String,
    require: false
  },
  image_id:{
    type: mongoose.Types.ObjectId,
    required: false
  }
})

const historyModel = mongoose.model("histories", historySchema)
module.exports   = historyModel

const mongoose = require('mongoose');

const SubSchema  = new mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  name:{
    type: String,
    required: false
  },
  active: {
    type: Boolean,
    required: false
  },
  plan: {
    type: String,
    required: false
  },
  cantidad: {
    type: Number,
    required: false
  },
  active_date: {
    type: String,
    required: false
  },
  suspension_date: {
    type: String,
    required: false
  }
})


const Subscription = mongoose.model('subscriptions', SubSchema)

module.exports     = Subscription

