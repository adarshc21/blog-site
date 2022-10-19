const { Schema, model, default: mongoose } = require("mongoose");

const BlogSchema = new Schema({
  title: {
    type: String,
    required: [true, "title is required"],
    minLength: [3, "title should be atleast 3 chareters"],
    maxLength: [100, "title can not exceed 100 chareters"],
  },
  description: {
    type: String,
    required: [true, "description is required"],
    minLength: [3, "description should be atleast 3 chareters"],
  },
  category: {
    type: String,
    required: true,
    default: "general",
  },
  tags: [{ type: String }],
  image: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  reviews: [
    {
      comment: {
        type: String,
        required: true,
      },
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  modifiedAt: {
    type: Date,
  },
});

module.exports = model("Blog", BlogSchema);
