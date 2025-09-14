import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    attachments: [{
      name: String,
      url: String,
      size: Number
    }],
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true   
    },
    status: {
      type: String,
      enum: ["active", "removed"],
      default: "active"
    },
    important: {
      type: Boolean,
      default: false
    }
  }, 
  {
    timestamps: true,
    toJSON: { virtuals: true },  // Include virtuals when converting to JSON
    toObject: { virtuals: true } // Include virtuals when converting to objects
  }
);

// Improved shortContent virtual


export default mongoose.models.Notice || mongoose.model("Notice", noticeSchema);