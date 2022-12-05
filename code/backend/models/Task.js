const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: [
        "created",
        "assigned",
        "in progress",
        "submitted",
        "reassigned",
        "verified",
        "archived",
      ],
      default: "created",
    },
    deadline: {
      type: Date,
      required: true,
    },
    work: {
      type: String,
      trim: true,
    },
    assignees: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      validate: {
        validator: (arr) => {
          const s = new Set(arr.map(String));
          return s.size === arr.length;
        },
        message: (p) =>
          `The values provided for '${p.path}', ` +
          `[${p.value}], contains duplicates.`,
      },
    },
    tags: {
      type: [String],
      validate: {
        validator: (arr) => {
          const s = new Set(arr);
          return s.size === arr.length;
        },
        message: (p) =>
          `The values provided for '${p.path}', ` +
          `[${p.value}], contains duplicates.`,
      },
    },
    activity: [
      {
        timestamp: { type: Date },
        content: { type: String, trim: true },
      },
    ],
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);
