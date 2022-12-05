const mongoose = require("mongoose");
const { isMobilePhone } = require("validator");

const organisationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    address: {
      type: String,
      trim: true,
    },
    phoneNum: {
      type: Number,
      validate: {
        validator: isMobilePhone,
        message: "{VALUE} is not a valid phone number",
        isAsync: false,
      },
    },
    leader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: {
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Organisation", organisationSchema);
