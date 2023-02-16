const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
    required: true,
    enum: ["admin", "jobSeeker", "mentor"],
  },
  logins: [
    {
      type: Date,
    },
  ],
  connections: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  profilePic: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2015/04/09/17/37/blank-profile-picture-973460_960_720.png",
  },
  refererInfo: {
    posterPic: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/04/09/17/37/blank-profile-picture-973460_960_720.png",
    },
    logoPic: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/04/09/17/37/blank-profile-picture-973460_960_720.png",
    },
    companyName: {
      type: String,
    },
    availableToMentor: {
      type: Boolean,
      default: false,
    },
  },
  time: {
    homepage: {
      type: Number,
      default: 0,
    },
    profile: {
      type: Number,
      default: 0,
    },
    chat: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      default: 0,
    },
  },
});

module.exports = mongoose.model("User", userSchema);
