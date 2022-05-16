const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    conversationId: { type: mongoose.Schema.Types.ObjectId, ref: 'conversation' },
    sender: {type: String},
    content: {type: String}
  },
  { timestamps: true }
);

module.exports = mongoose.model("message", MessageSchema);