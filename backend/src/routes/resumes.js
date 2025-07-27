// import express from 'express';
// const router = express.Router();

// // In-memory resume storage (replace with DB in production)
// let resumes = [
//   // Example:
//   // { id: 1, userId: 1, data: { name: 'John Doe', summary: '...' }, templateId: 1 }
// ];

// // GET /api/resume/:id - get resume by id
// router.get('/:id', (req, res) => {
//   const id = parseInt(req.params.id);
//   const resume = resumes.find(r => r.id === id);
//   if (!resume) {
//     return res.status(404).json({ message: 'Resume not found' });
//   }
//   res.json(resume);
// });

// // POST /api/resume - create a new resume
// router.post('/', (req, res) => {
//   const { userId, data, templateId } = req.body;
//   if (!userId || !data || !templateId) {
//     return res.status(400).json({ message: 'userId, data and templateId are required' });
//   }
//   const newResume = {
//     id: resumes.length ? resumes[resumes.length - 1].id + 1 : 1,
//     userId,
//     data,
//     templateId,
//     createdAt: new Date(),
//   };
//   resumes.push(newResume);
//   res.status(201).json(newResume);
// });

// // PUT /api/resume/:id - update existing resume
// router.put('/:id', (req, res) => {
//   const id = parseInt(req.params.id);
//   const resume = resumes.find(r => r.id === id);
//   if (!resume) {
//     return res.status(404).json({ message: 'Resume not found' });
//   }
//   const { data, templateId } = req.body;
//   if (data) resume.data = data;
//   if (templateId) resume.templateId = templateId;
//   resume.updatedAt = new Date();
//   res.json(resume);
// });

// // DELETE /api/resume/:id - delete a resume
// router.delete('/:id', (req, res) => {
//   const id = parseInt(req.params.id);
//   const index = resumes.findIndex(r => r.id === id);
//   if (index === -1) {
//     return res.status(404).json({ message: 'Resume not found' });
//   }
//   resumes.splice(index, 1);
//   res.status(204).send();
// });

// export default router;













// const express = require("express")
// const Resume = require("../models/Resume")
// const auth = require("../middleware/auth")
// const { validationResult, body } = require("express-validator")

// const router = express.Router()

// // Validation rules
// const createResumeValidation = [
//   body("title").trim().isLength({ min: 1, max: 100 }).withMessage("Title must be between 1 and 100 characters"),
//   body("templateId").notEmpty().withMessage("Template ID is required"),
// ]

// const updateResumeValidation = [
//   body("title")
//     .optional()
//     .trim()
//     .isLength({ min: 1, max: 100 })
//     .withMessage("Title must be between 1 and 100 characters"),
// ]

// // Get all user resumes
// router.get("/", auth, async (req, res) => {
//   try {
//     const { page = 1, limit = 10, sortBy = "updatedAt", sortOrder = "desc" } = req.query

//     const resumes = await Resume.find({ user: req.user.id })
//       .sort({ [sortBy]: sortOrder === "desc" ? -1 : 1 })
//       .limit(limit * 1)
//       .skip((page - 1) * limit)
//       .populate("user", "name email")

//     const total = await Resume.countDocuments({ user: req.user.id })

//     res.json({
//       success: true,
//       resumes,
//       pagination: {
//         current: Number.parseInt(page),
//         pages: Math.ceil(total / limit),
//         total,
//       },
//     })
//   } catch (error) {
//     console.error("Get resumes error:", error)
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch resumes",
//     })
//   }
// })

// // Get resume by ID
// router.get("/:id", auth, async (req, res) => {
//   try {
//     const resume = await Resume.findOne({
//       _id: req.params.id,
//       user: req.user.id,
//     }).populate("user", "name email")

//     if (!resume) {
//       return res.status(404).json({
//         success: false,
//         message: "Resume not found",
//       })
//     }

//     // Increment view count
//     resume.views += 1
//     await resume.save()

//     res.json({
//       success: true,
//       resume,
//     })
//   } catch (error) {
//     console.error("Get resume error:", error)
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch resume",
//     })
//   }
// })

// // Create new resume
// router.post("/", auth, createResumeValidation, async (req, res) => {
//   try {
//     const errors = validationResult(req)
//     if (!errors.isEmpty()) {
//       return res.status(400).json({
//         success: false,
//         message: "Validation failed",
//         errors: errors.array(),
//       })
//     }

//     const { title, templateId, data } = req.body

//     const resume = new Resume({
//       title,
//       templateId,
//       user: req.user.id,
//       data: data || {
//         personalInfo: {
//           fullName: "",
//           email: "",
//           phone: "",
//           address: "",
//           website: "",
//           linkedin: "",
//           github: "",
//           summary: "",
//         },
//         experience: [],
//         education: [],
//         skills: [],
//         projects: [],
//         certifications: [],
//         languages: [],
//         awards: [],
//         references: [],
//       },
//     })

//     await resume.save()
//     await resume.populate("user", "name email")

//     res.status(201).json({
//       success: true,
//       message: "Resume created successfully",
//       resume,
//     })
//   } catch (error) {
//     console.error("Create resume error:", error)
//     res.status(500).json({
//       success: false,
//       message: "Failed to create resume",
//     })
//   }
// })

// // Update resume
// router.put("/:id", auth, updateResumeValidation, async (req, res) => {
//   try {
//     const errors = validationResult(req)
//     if (!errors.isEmpty()) {
//       return res.status(400).json({
//         success: false,
//         message: "Validation failed",
//         errors: errors.array(),
//       })
//     }

//     const resume = await Resume.findOne({
//       _id: req.params.id,
//       user: req.user.id,
//     })

//     if (!resume) {
//       return res.status(404).json({
//         success: false,
//         message: "Resume not found",
//       })
//     }

//     // Update fields
//     const allowedUpdates = ["title", "data", "customization", "isPublic"]
//     const updates = {}

//     allowedUpdates.forEach((field) => {
//       if (req.body[field] !== undefined) {
//         updates[field] = req.body[field]
//       }
//     })

//     Object.assign(resume, updates)
//     await resume.save()
//     await resume.populate("user", "name email")

//     res.json({
//       success: true,
//       message: "Resume updated successfully",
//       resume,
//     })
//   } catch (error) {
//     console.error("Update resume error:", error)
//     res.status(500).json({
//       success: false,
//       message: "Failed to update resume",
//     })
//   }
// })

// // Delete resume
// router.delete("/:id", auth, async (req, res) => {
//   try {
//     const resume = await Resume.findOne({
//       _id: req.params.id,
//       user: req.user.id,
//     })

//     if (!resume) {
//       return res.status(404).json({
//         success: false,
//         message: "Resume not found",
//       })
//     }

//     await Resume.deleteOne({ _id: req.params.id })

//     res.json({
//       success: true,
//       message: "Resume deleted successfully",
//     })
//   } catch (error) {
//     console.error("Delete resume error:", error)
//     res.status(500).json({
//       success: false,
//       message: "Failed to delete resume",
//     })
//   }
// })

// // Export resume as PDF
// router.get("/:id/export", auth, async (req, res) => {
//   try {
//     const resume = await Resume.findOne({
//       _id: req.params.id,
//       user: req.user.id,
//     })

//     if (!resume) {
//       return res.status(404).json({
//         success: false,
//         message: "Resume not found",
//       })
//     }

//     // Increment download count
//     resume.downloads += 1
//     await resume.save()

//     // In production, this would generate an actual PDF
//     // For now, we'll return a mock response
//     res.json({
//       success: true,
//       message: "PDF export initiated",
//       downloadUrl: `/api/resumes/${req.params.id}/download`,
//       resume: {
//         id: resume._id,
//         title: resume.title,
//         downloads: resume.downloads,
//       },
//     })
//   } catch (error) {
//     console.error("Export resume error:", error)
//     res.status(500).json({
//       success: false,
//       message: "Failed to export resume",
//     })
//   }
// })

// // Duplicate resume
// router.post("/:id/duplicate", auth, async (req, res) => {
//   try {
//     const originalResume = await Resume.findOne({
//       _id: req.params.id,
//       user: req.user.id,
//     })

//     if (!originalResume) {
//       return res.status(404).json({
//         success: false,
//         message: "Resume not found",
//       })
//     }

//     const duplicatedResume = new Resume({
//       title: `${originalResume.title} (Copy)`,
//       templateId: originalResume.templateId,
//       user: req.user.id,
//       data: originalResume.data,
//       customization: originalResume.customization,
//     })

//     await duplicatedResume.save()
//     await duplicatedResume.populate("user", "name email")

//     res.status(201).json({
//       success: true,
//       message: "Resume duplicated successfully",
//       resume: duplicatedResume,
//     })
//   } catch (error) {
//     console.error("Duplicate resume error:", error)
//     res.status(500).json({
//       success: false,
//       message: "Failed to duplicate resume",
//     })
//   }
// })

// module.exports = router
























const express = require("express")
const Resume = require("../models/Resume")
const auth = require("../middleware/auth")
const { validationResult, body } = require("express-validator")

const router = express.Router()

// Validation rules
const createResumeValidation = [
  body("title").trim().isLength({ min: 1, max: 100 }).withMessage("Title must be between 1 and 100 characters"),
  body("templateId").notEmpty().withMessage("Template ID is required"),
]

const updateResumeValidation = [
  body("title")
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Title must be between 1 and 100 characters"),
]

// Get all user resumes
router.get("/", auth, async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user.id }).sort({ updatedAt: -1 })

    res.json({
      success: true,
      resumes,
      count: resumes.length,
    })
  } catch (error) {
    console.error("Get resumes error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to fetch resumes",
    })
  }
})

// Get resume by ID
router.get("/:id", auth, async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      user: req.user.id,
    })

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      })
    }

    res.json({
      success: true,
      resume,
    })
  } catch (error) {
    console.error("Get resume error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to fetch resume",
    })
  }
})

// Create new resume
router.post("/", auth, createResumeValidation, async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      })
    }

    const { title, templateId, data } = req.body

    const resume = new Resume({
      title: title || "Untitled Resume",
      templateId,
      data: data || {},
      user: req.user.id,
    })

    await resume.save()

    res.status(201).json({
      success: true,
      message: "Resume created successfully",
      resume,
    })
  } catch (error) {
    console.error("Create resume error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to create resume",
    })
  }
})

// Update resume
router.put("/:id", auth, updateResumeValidation, async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      })
    }

    const { title, data } = req.body

    const resume = await Resume.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      {
        title,
        data,
        updatedAt: new Date(),
      },
      { new: true },
    )

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      })
    }

    res.json({
      success: true,
      message: "Resume updated successfully",
      resume,
    })
  } catch (error) {
    console.error("Update resume error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to update resume",
    })
  }
})

// Delete resume
router.delete("/:id", auth, async (req, res) => {
  try {
    const resume = await Resume.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    })

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      })
    }

    res.json({
      success: true,
      message: "Resume deleted successfully",
    })
  } catch (error) {
    console.error("Delete resume error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to delete resume",
    })
  }
})

// Export resume as PDF
router.get("/:id/export", auth, async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      user: req.user.id,
    })

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      })
    }

    // In production, this would generate actual PDF
    res.json({
      success: true,
      message: "Resume export initiated",
      downloadUrl: `/api/resumes/${req.params.id}/download`,
      resume,
    })
  } catch (error) {
    console.error("Export resume error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to export resume",
    })
  }
})

// Duplicate resume
router.post("/:id/duplicate", auth, async (req, res) => {
  try {
    const originalResume = await Resume.findOne({
      _id: req.params.id,
      user: req.user.id,
    })

    if (!originalResume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      })
    }

    const duplicatedResume = new Resume({
      title: `${originalResume.title} (Copy)`,
      templateId: originalResume.templateId,
      data: originalResume.data,
      customization: originalResume.customization,
      user: req.user.id,
    })

    await duplicatedResume.save()
    await duplicatedResume.populate("user", "name email")

    res.status(201).json({
      success: true,
      message: "Resume duplicated successfully",
      resume: duplicatedResume,
    })
  } catch (error) {
    console.error("Duplicate resume error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to duplicate resume",
    })
  }
})

// Add review to template
router.post("/templates/:templateId/review", auth, async (req, res) => {
  try {
    const { rating, comment } = req.body
    const { templateId } = req.params

    // In production, save to a Reviews collection
    const review = {
      id: Date.now(),
      user: req.user.name,
      userId: req.user.id,
      templateId,
      rating,
      comment,
      date: new Date(),
      avatar: `/placeholder.svg?height=40&width=40&text=${req.user.name.charAt(0)}`,
    }

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      review,
    })
  } catch (error) {
    console.error("Add review error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to add review",
    })
  }
})

module.exports = router
