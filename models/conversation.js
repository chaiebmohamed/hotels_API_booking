const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
  {
    users: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
    messages: [{ type: mongoose.Types.ObjectId, ref: 'message' }]
  },
  {timestamps: true }
);

module.exports = mongoose.model("conversation", ConversationSchema);