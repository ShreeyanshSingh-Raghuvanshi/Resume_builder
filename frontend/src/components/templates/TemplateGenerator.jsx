"use client"

import { motion } from "framer-motion"

// Generate 200+ state-of-the-art templates
export const generateTemplates = () => {
  const categories = [
    "modern",
    "creative",
    "professional",
    "minimalist",
    "executive",
    "tech",
    "design",
    "marketing",
    "academic",
    "healthcare",
    "finance",
    "legal",
    "engineering",
    "sales",
    "consulting",
    "startup",
    "corporate",
    "freelance",
    "artistic",
    "scientific",
  ]

  const colorSchemes = [
    { name: "midnight", primary: "#1a1a2e", secondary: "#16213e", accent: "#0f3460", text: "#ffffff" },
    { name: "ocean", primary: "#006a6b", secondary: "#0d7377", accent: "#14a085", text: "#ffffff" },
    { name: "sunset", primary: "#ff6b6b", secondary: "#ee5a24", accent: "#feca57", text: "#ffffff" },
    { name: "forest", primary: "#27ae60", secondary: "#2ecc71", accent: "#55a3ff", text: "#ffffff" },
    { name: "royal", primary: "#8e44ad", secondary: "#9b59b6", accent: "#f39c12", text: "#ffffff" },
    { name: "steel", primary: "#34495e", secondary: "#2c3e50", accent: "#3498db", text: "#ffffff" },
    { name: "crimson", primary: "#c0392b", secondary: "#e74c3c", accent: "#f1c40f", text: "#ffffff" },
    { name: "emerald", primary: "#16a085", secondary: "#1abc9c", accent: "#e67e22", text: "#ffffff" },
    { name: "sapphire", primary: "#2980b9", secondary: "#3498db", accent: "#e74c3c", text: "#ffffff" },
    { name: "gold", primary: "#f39c12", secondary: "#f1c40f", accent: "#e74c3c", text: "#2c3e50" },
    { name: "platinum", primary: "#95a5a6", secondary: "#bdc3c7", accent: "#34495e", text: "#2c3e50" },
    { name: "copper", primary: "#d35400", secondary: "#e67e22", accent: "#f39c12", text: "#ffffff" },
    { name: "jade", primary: "#00b894", secondary: "#00cec9", accent: "#fdcb6e", text: "#2d3436" },
    { name: "ruby", primary: "#e84393", secondary: "#fd79a8", accent: "#fdcb6e", text: "#2d3436" },
    { name: "onyx", primary: "#2d3436", secondary: "#636e72", accent: "#00b894", text: "#ddd" },
  ]

  const layouts = [
    "single-column",
    "two-column",
    "sidebar-left",
    "sidebar-right",
    "header-focus",
    "timeline",
    "grid",
    "modern-split",
    "creative-flow",
    "executive-clean",
  ]

  const fonts = [
    "Inter",
    "Roboto",
    "Open Sans",
    "Lato",
    "Montserrat",
    "Poppins",
    "Source Sans Pro",
    "Nunito",
    "Raleway",
    "Ubuntu",
    "Playfair Display",
    "Merriweather",
    "Crimson Text",
    "Libre Baskerville",
  ]

  const templates = []
  let templateId = 1

  categories.forEach((category, catIndex) => {
    colorSchemes.forEach((colorScheme, colorIndex) => {
      layouts.forEach((layout, layoutIndex) => {
        if (templateId <= 200) {
          const template = {
            id: templateId,
            name: `${category.charAt(0).toUpperCase() + category.slice(1)} ${colorScheme.name.charAt(0).toUpperCase() + colorScheme.name.slice(1)} ${layout
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}`,
            category,
            colorScheme,
            layout,
            font: fonts[templateId % fonts.length],
            rating: (Math.random() * 2 + 3).toFixed(1),
            downloads: Math.floor(Math.random() * 50000) + 1000,
            premium: Math.random() > 0.6,
            featured: Math.random() > 0.8,
            tags: generateTags(category, layout),
            preview: `/placeholder.svg?height=400&width=300&text=${encodeURIComponent(category + " " + colorScheme.name)}`,
            description: generateDescription(category, colorScheme.name, layout),
          }
          templates.push(template)
          templateId++
        }
      })
    })
  })

  return templates
}

const generateTags = (category, layout) => {
  const baseTags = {
    modern: ["clean", "contemporary", "sleek"],
    creative: ["artistic", "unique", "innovative"],
    professional: ["corporate", "formal", "business"],
    minimalist: ["simple", "clean", "elegant"],
    executive: ["leadership", "senior", "premium"],
    tech: ["technical", "developer", "IT"],
    design: ["visual", "creative", "portfolio"],
    marketing: ["sales", "digital", "brand"],
    academic: ["research", "education", "scholarly"],
    healthcare: ["medical", "clinical", "care"],
  }

  const layoutTags = {
    "single-column": ["focused", "linear"],
    "two-column": ["balanced", "structured"],
    "sidebar-left": ["organized", "detailed"],
    timeline: ["chronological", "story"],
    grid: ["modern", "visual"],
  }

  return [
    ...(baseTags[category] || ["professional"]),
    ...(layoutTags[layout] || ["standard"]),
    "responsive",
    "ATS-friendly",
  ]
}

const generateDescription = (category, color, layout) => {
  const descriptions = {
    modern: "A contemporary design that showcases your skills with clean lines and modern typography.",
    creative: "Express your creativity with this unique template featuring artistic elements and bold design choices.",
    professional:
      "Perfect for corporate environments, this template maintains a formal and business-appropriate appearance.",
    minimalist: "Less is more with this elegant, clean design that focuses attention on your content.",
    executive: "Designed for senior professionals, this premium template conveys leadership and expertise.",
  }

  return descriptions[category] || "A professionally designed template that highlights your qualifications effectively."
}

// Template Component Renderer
export const TemplateRenderer = ({ template, data, isPreview = false }) => {
  const { colorScheme, layout, font } = template

  const containerStyle = {
    fontFamily: font,
    color: colorScheme.text,
    backgroundColor: colorScheme.primary,
    minHeight: isPreview ? "400px" : "auto",
  }

  const renderLayout = () => {
    switch (layout) {
      case "single-column":
        return <SingleColumnLayout template={template} data={data} />
      case "two-column":
        return <TwoColumnLayout template={template} data={data} />
      case "sidebar-left":
        return <SidebarLeftLayout template={template} data={data} />
      case "sidebar-right":
        return <SidebarRightLayout template={template} data={data} />
      case "timeline":
        return <TimelineLayout template={template} data={data} />
      case "grid":
        return <GridLayout template={template} data={data} />
      default:
        return <SingleColumnLayout template={template} data={data} />
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={containerStyle}
      className="resume-template w-full h-full p-6 overflow-hidden"
    >
      {renderLayout()}
    </motion.div>
  )
}

// Layout Components
const SingleColumnLayout = ({ template, data }) => (
  <div className="space-y-6">
    <Header template={template} data={data} />
    <Summary template={template} data={data} />
    <Experience template={template} data={data} />
    <Education template={template} data={data} />
    <Skills template={template} data={data} />
  </div>
)

const TwoColumnLayout = ({ template, data }) => (
  <div className="grid grid-cols-3 gap-6 h-full">
    <div className="col-span-2 space-y-6">
      <Header template={template} data={data} />
      <Summary template={template} data={data} />
      <Experience template={template} data={data} />
    </div>
    <div className="space-y-6">
      <ContactInfo template={template} data={data} />
      <Skills template={template} data={data} />
      <Education template={template} data={data} />
    </div>
  </div>
)

const SidebarLeftLayout = ({ template, data }) => (
  <div className="grid grid-cols-4 gap-6 h-full">
    <div className="space-y-4" style={{ backgroundColor: template.colorScheme.secondary }}>
      <ContactInfo template={template} data={data} />
      <Skills template={template} data={data} />
      <Education template={template} data={data} />
    </div>
    <div className="col-span-3 space-y-6">
      <Header template={template} data={data} />
      <Summary template={template} data={data} />
      <Experience template={template} data={data} />
    </div>
  </div>
)

const SidebarRightLayout = ({ template, data }) => (
  <div className="grid grid-cols-4 gap-6 h-full">
    <div className="col-span-3 space-y-6">
      <Header template={template} data={data} />
      <Summary template={template} data={data} />
      <Experience template={template} data={data} />
    </div>
    <div className="space-y-4" style={{ backgroundColor: template.colorScheme.secondary }}>
      <ContactInfo template={template} data={data} />
      <Skills template={template} data={data} />
      <Education template={template} data={data} />
    </div>
  </div>
)

const TimelineLayout = ({ template, data }) => (
  <div className="space-y-6">
    <Header template={template} data={data} />
    <Summary template={template} data={data} />
    <div className="relative">
      <div
        className="absolute left-4 top-0 bottom-0 w-0.5"
        style={{ backgroundColor: template.colorScheme.accent }}
      ></div>
      <Experience template={template} data={data} timeline={true} />
    </div>
    <div className="grid grid-cols-2 gap-6">
      <Skills template={template} data={data} />
      <Education template={template} data={data} />
    </div>
  </div>
)

const GridLayout = ({ template, data }) => (
  <div className="grid grid-cols-6 gap-4 h-full">
    <div className="col-span-6">
      <Header template={template} data={data} />
    </div>
    <div className="col-span-4">
      <Summary template={template} data={data} />
    </div>
    <div className="col-span-2">
      <ContactInfo template={template} data={data} />
    </div>
    <div className="col-span-4">
      <Experience template={template} data={data} />
    </div>
    <div className="col-span-2 space-y-4">
      <Skills template={template} data={data} />
      <Education template={template} data={data} />
    </div>
  </div>
)

// Section Components
const Header = ({ template, data }) => (
  <div className="text-center border-b-2 pb-4" style={{ borderColor: template.colorScheme.accent }}>
    <h1 className="text-4xl font-bold mb-2" style={{ color: template.colorScheme.accent }}>
      {data?.personalInfo?.fullName || "Your Name"}
    </h1>
    <p className="text-xl opacity-90">{data?.personalInfo?.title || "Professional Title"}</p>
  </div>
)

const ContactInfo = ({ template, data }) => (
  <div className="space-y-2">
    <h3 className="text-lg font-semibold mb-3" style={{ color: template.colorScheme.accent }}>
      Contact
    </h3>
    <p className="text-sm">{data?.personalInfo?.email || "email@example.com"}</p>
    <p className="text-sm">{data?.personalInfo?.phone || "+1 (555) 123-4567"}</p>
    <p className="text-sm">{data?.personalInfo?.address || "City, State"}</p>
  </div>
)

const Summary = ({ template, data }) => (
  <div>
    <h3 className="text-xl font-semibold mb-3" style={{ color: template.colorScheme.accent }}>
      Professional Summary
    </h3>
    <p className="text-sm leading-relaxed opacity-90">
      {data?.personalInfo?.summary ||
        "A dedicated professional with extensive experience in delivering high-quality results and driving organizational success through innovative solutions and collaborative leadership."}
    </p>
  </div>
)

const Experience = ({ template, data, timeline = false }) => (
  <div>
    <h3 className="text-xl font-semibold mb-4" style={{ color: template.colorScheme.accent }}>
      Experience
    </h3>
    <div className="space-y-4">
      {(
        data?.experience || [
          {
            company: "Company Name",
            position: "Job Title",
            startDate: "2020",
            endDate: "Present",
            description: "Key achievements and responsibilities in this role.",
          },
        ]
      ).map((exp, index) => (
        <div key={index} className={timeline ? "ml-8 relative" : ""}>
          {timeline && (
            <div
              className="absolute -left-6 top-2 w-3 h-3 rounded-full"
              style={{ backgroundColor: template.colorScheme.accent }}
            ></div>
          )}
          <div className="mb-2">
            <h4 className="font-semibold">{exp.position}</h4>
            <p className="text-sm opacity-75">
              {exp.company} • {exp.startDate} - {exp.endDate}
            </p>
          </div>
          <p className="text-sm opacity-90">{exp.description}</p>
        </div>
      ))}
    </div>
  </div>
)

const Education = ({ template, data }) => (
  <div>
    <h3 className="text-lg font-semibold mb-3" style={{ color: template.colorScheme.accent }}>
      Education
    </h3>
    <div className="space-y-3">
      {(
        data?.education || [
          { institution: "University Name", degree: "Bachelor's Degree", field: "Field of Study", endDate: "2020" },
        ]
      ).map((edu, index) => (
        <div key={index}>
          <h4 className="font-medium text-sm">
            {edu.degree} in {edu.field}
          </h4>
          <p className="text-xs opacity-75">
            {edu.institution} • {edu.endDate}
          </p>
        </div>
      ))}
    </div>
  </div>
)

const Skills = ({ template, data }) => (
  <div>
    <h3 className="text-lg font-semibold mb-3" style={{ color: template.colorScheme.accent }}>
      Skills
    </h3>
    <div className="space-y-2">
      {(
        data?.skills || [
          { name: "JavaScript", level: "Advanced" },
          { name: "React", level: "Expert" },
          { name: "Node.js", level: "Intermediate" },
        ]
      ).map((skill, index) => (
        <div key={index} className="flex justify-between items-center">
          <span className="text-sm">{skill.name}</span>
          <span className="text-xs opacity-75">{skill.level}</span>
        </div>
      ))}
    </div>
  </div>
)
