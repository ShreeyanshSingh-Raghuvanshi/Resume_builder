// const mongoose = require("mongoose")

// const resumeSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: [true, "Resume title is required"],
//       trim: true,
//       maxlength: [100, "Title cannot exceed 100 characters"],
//     },
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     templateId: {
//       type: String,
//       required: [true, "Template ID is required"],
//     },
//     data: {
//       personalInfo: {
//         fullName: { type: String, default: "" },
//         email: { type: String, default: "" },
//         phone: { type: String, default: "" },
//         address: { type: String, default: "" },
//         website: { type: String, default: "" },
//         linkedin: { type: String, default: "" },
//         github: { type: String, default: "" },
//         summary: { type: String, default: "" },
//       },
//       experience: [
//         {
//           company: String,
//           position: String,
//           startDate: String,
//           endDate: String,
//           current: { type: Boolean, default: false },
//           description: String,
//           location: String,
//         },
//       ],
//       education: [
//         {
//           institution: String,
//           degree: String,
//           field: String,
//           startDate: String,
//           endDate: String,
//           gpa: String,
//           description: String,
//         },
//       ],
//       skills: [
//         {
//           name: String,
//           level: { type: String, enum: ["Beginner", "Intermediate", "Advanced", "Expert"], default: "Intermediate" },
//           category: String,
//         },
//       ],
//       projects: [
//         {
//           name: String,
//           description: String,
//           technologies: [String],
//           url: String,
//           github: String,
//           startDate: String,
//           endDate: String,
//         },
//       ],
//       certifications: [
//         {
//           name: String,
//           issuer: String,
//           date: String,
//           url: String,
//           description: String,
//         },
//       ],
//       languages: [
//         {
//           name: String,
//           proficiency: {
//             type: String,
//             enum: ["Basic", "Conversational", "Fluent", "Native"],
//             default: "Conversational",
//           },
//         },
//       ],
//       awards: [
//         {
//           title: String,
//           issuer: String,
//           date: String,
//           description: String,
//         },
//       ],
//       references: [
//         {
//           name: String,
//           position: String,
//           company: String,
//           email: String,
//           phone: String,
//         },
//       ],
//     },
//     customization: {
//       colorScheme: {
//         primary: { type: String, default: "#3b82f6" },
//         secondary: { type: String, default: "#1e40af" },
//         accent: { type: String, default: "#ffd700" },
//       },
//       font: { type: String, default: "Inter" },
//       layout: { type: String, default: "standard" },
//       sections: {
//         experience: { type: Boolean, default: true },
//         education: { type: Boolean, default: true },
//         skills: { type: Boolean, default: true },
//         projects: { type: Boolean, default: false },
//         certifications: { type: Boolean, default: false },
//         languages: { type: Boolean, default: false },
//         awards: { type: Boolean, default: false },
//         references: { type: Boolean, default: false },
//       },
//     },
//     isPublic: {
//       type: Boolean,
//       default: false,
//     },
//     views: {
//       type: Number,
//       default: 0,
//     },
//     downloads: {
//       type: Number,
//       default: 0,
//     },
//   },
//   {
//     timestamps: true,
//   },
// )

// // Index for better query performance
// resumeSchema.index({ user: 1, createdAt: -1 })
// resumeSchema.index({ templateId: 1 })
// resumeSchema.index({ isPublic: 1, views: -1 })

// module.exports = mongoose.model("Resume", resumeSchema)





















const mongoose = require("mongoose")

const resumeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Resume title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    templateId: {
      type: String,
      required: [true, "Template ID is required"],
    },
    data: {
      personalInfo: {
        fullName: { type: String, default: "" },
        email: { type: String, default: "" },
        phone: { type: String, default: "" },
        address: { type: String, default: "" },
        website: { type: String, default: "" },
        linkedin: { type: String, default: "" },
        github: { type: String, default: "" },
        summary: { type: String, default: "" },
      },
      experience: [
        {
          company: String,
          position: String,
          startDate: String,
          endDate: String,
          current: { type: Boolean, default: false },
          description: String,
          location: String,
        },
      ],
      education: [
        {
          institution: String,
          degree: String,
          field: String,
          startDate: String,
          endDate: String,
          gpa: String,
          description: String,
        },
      ],
      skills: [
        {
          name: String,
          level: { type: String, enum: ["Beginner", "Intermediate", "Advanced", "Expert"], default: "Intermediate" },
          category: String,
        },
      ],
      projects: [
        {
          name: String,
          description: String,
          technologies: [String],
          url: String,
          github: String,
          startDate: String,
          endDate: String,
        },
      ],
      certifications: [
        {
          name: String,
          issuer: String,
          date: String,
          url: String,
          description: String,
        },
      ],
      languages: [
        {
          name: String,
          proficiency: {
            type: String,
            enum: ["Basic", "Conversational", "Fluent", "Native"],
            default: "Conversational",
          },
        },
      ],
      awards: [
        {
          title: String,
          issuer: String,
          date: String,
          description: String,
        },
      ],
      references: [
        {
          name: String,
          position: String,
          company: String,
          email: String,
          phone: String,
        },
      ],
    },
    customization: {
      colorScheme: {
        primary: { type: String, default: "#3b82f6" },
        secondary: { type: String, default: "#1e40af" },
        accent: { type: String, default: "#ffd700" },
      },
      font: { type: String, default: "Inter" },
      layout: { type: String, default: "standard" },
      sections: {
        experience: { type: Boolean, default: true },
        education: { type: Boolean, default: true },
        skills: { type: Boolean, default: true },
        projects: { type: Boolean, default: false },
        certifications: { type: Boolean, default: false },
        languages: { type: Boolean, default: false },
        awards: { type: Boolean, default: false },
        references: { type: Boolean, default: false },
      },
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
    },
    downloads: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
)

// Index for better query performance
resumeSchema.index({ user: 1, createdAt: -1 })
resumeSchema.index({ templateId: 1 })
resumeSchema.index({ isPublic: 1, views: -1 })

module.exports = mongoose.model("Resume", resumeSchema)
