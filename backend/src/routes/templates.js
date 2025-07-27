// import express from 'express';
// const router = express.Router();

// // Example in-memory templates store (replace with DB in production)
// let templates = [
//   { id: 1, name: 'Modern', description: 'A modern, clean resume template' },
//   { id: 2, name: 'Classic', description: 'Classic and simple layout' },
// ];

// // GET /api/templates - list all templates
// router.get('/', (req, res) => {
//   res.json(templates);
// });

// // GET /api/templates/:id - get a single template by id
// router.get('/:id', (req, res) => {
//   const id = parseInt(req.params.id);
//   const template = templates.find(t => t.id === id);
//   if (!template) {
//     return res.status(404).json({ message: 'Template not found' });
//   }
//   res.json(template);
// });

// // POST /api/templates - add new template (ideally admin only)
// router.post('/', (req, res) => {
//   const { name, description } = req.body;
//   if (!name) {
//     return res.status(400).json({ message: 'Template name is required' });
//   }
//   const newTemplate = {
//     id: templates.length ? templates[templates.length -1].id + 1 : 1,
//     name,
//     description: description || '',
//   };
//   templates.push(newTemplate);
//   res.status(201).json(newTemplate);
// });

// // PUT /api/templates/:id - update a template
// router.put('/:id', (req, res) => {
//   const id = parseInt(req.params.id);
//   const template = templates.find(t => t.id === id);
//   if (!template) {
//     return res.status(404).json({ message: 'Template not found' });
//   }
//   const { name, description } = req.body;
//   if (name) template.name = name;
//   if (description) template.description = description;
//   res.json(template);
// });

// // DELETE /api/templates/:id - delete a template
// router.delete('/:id', (req, res) => {
//   const id = parseInt(req.params.id);
//   const index = templates.findIndex(t => t.id === id);
//   if (index === -1) {
//     return res.status(404).json({ message: 'Template not found' });
//   }
//   templates.splice(index, 1);
//   res.status(204).send();
// });

// export default router;


















const express = require("express")
const auth = require("../middleware/auth")

const router = express.Router()

// Mock template data - in production, this would come from a database
const templates = [
  {
    id: "1",
    name: "Modern Professional",
    category: "professional",
    description: "A clean, modern template perfect for corporate environments",
    preview: "/api/templates/1/preview",
    premium: false,
    rating: 4.8,
    downloads: 15420,
    tags: ["modern", "professional", "clean"],
    colorScheme: {
      primary: "#2563eb",
      secondary: "#1e40af",
      accent: "#ffd700",
      text: "#ffffff",
    },
    layout: "two-column",
    font: "Inter",
  },
  {
    id: "2",
    name: "Creative Designer",
    category: "creative",
    description: "Express your creativity with this unique design template",
    preview: "/api/templates/2/preview",
    premium: true,
    rating: 4.9,
    downloads: 8930,
    tags: ["creative", "design", "artistic"],
    colorScheme: {
      primary: "#8b5cf6",
      secondary: "#7c3aed",
      accent: "#f59e0b",
      text: "#ffffff",
    },
    layout: "single-column",
    font: "Playfair Display",
  },
]

// Get all templates
router.get("/", async (req, res) => {
  try {
    const { category, search, premium } = req.query
    let filteredTemplates = [...templates]

    // Filter by category
    if (category && category !== "all") {
      filteredTemplates = filteredTemplates.filter((template) => template.category === category)
    }

    // Filter by search term
    if (search) {
      const searchLower = search.toLowerCase()
      filteredTemplates = filteredTemplates.filter(
        (template) =>
          template.name.toLowerCase().includes(searchLower) ||
          template.description.toLowerCase().includes(searchLower) ||
          template.tags.some((tag) => tag.toLowerCase().includes(searchLower)),
      )
    }

    // Filter by premium status
    if (premium !== undefined) {
      const isPremium = premium === "true"
      filteredTemplates = filteredTemplates.filter((template) => template.premium === isPremium)
    }

    res.json({
      success: true,
      templates: filteredTemplates,
      total: filteredTemplates.length,
    })
  } catch (error) {
    console.error("Get templates error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to fetch templates",
    })
  }
})

// Get template by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const template = templates.find((t) => t.id === id)

    if (!template) {
      return res.status(404).json({
        success: false,
        message: "Template not found",
      })
    }

    res.json({
      success: true,
      template,
    })
  } catch (error) {
    console.error("Get template error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to fetch template",
    })
  }
})

// Get template preview
router.get("/:id/preview", async (req, res) => {
  try {
    const { id } = req.params
    const template = templates.find((t) => t.id === id)

    if (!template) {
      return res.status(404).json({
        success: false,
        message: "Template not found",
      })
    }

    // In production, this would generate an actual preview image
    res.json({
      success: true,
      preview: {
        url: `/placeholder.svg?height=400&width=300&text=${encodeURIComponent(template.name)}`,
        template,
      },
    })
  } catch (error) {
    console.error("Get template preview error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to generate preview",
    })
  }
})

// Get template categories
router.get("/categories", async (req, res) => {
  try {
    const categories = [
      { id: "all", name: "All Templates", count: templates.length },
      {
        id: "professional",
        name: "Professional",
        count: templates.filter((t) => t.category === "professional").length,
      },
      { id: "creative", name: "Creative", count: templates.filter((t) => t.category === "creative").length },
      { id: "modern", name: "Modern", count: templates.filter((t) => t.category === "modern").length },
      { id: "minimalist", name: "Minimalist", count: templates.filter((t) => t.category === "minimalist").length },
    ]

    res.json({
      success: true,
      categories,
    })
  } catch (error) {
    console.error("Get categories error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to fetch categories",
    })
  }
})

module.exports = router
