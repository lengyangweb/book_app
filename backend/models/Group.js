import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "users",
  },
  group: {
    type: String,
    required: ["group name is required", true],
  },
});

const model = mongoose.model("Group", GroupSchema);

export default model;
