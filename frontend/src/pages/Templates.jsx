// "use client"

// import { useState, useEffect } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { Search, Filter, Eye, Edit, Star, Crown, Download, Heart, Grid, List } from "lucide-react"
// import { Link } from "react-router-dom"
// import { useAuth } from "../hooks/useAuth"
// import { useTheme } from "../hooks/useTheme"
// import { useKeyPress } from "../hooks/useKeyPress"
// import { generateTemplates } from "../components/templates/TemplateGenerator"
// import toast from "react-hot-toast"

// const Templates = () => {
//   const [templates, setTemplates] = useState([])
//   const [filteredTemplates, setFilteredTemplates] = useState([])
//   const [searchTerm, setSearchTerm] = useState("")
//   const [selectedCategory, setSelectedCategory] = useState("all")
//   const [selectedColor, setSelectedColor] = useState("all")
//   const [sortBy, setSortBy] = useState("featured")
//   const [viewMode, setViewMode] = useState("grid") // "grid" or "list"
//   const [favorites, setFavorites] = useState([])
//   const [isLoading, setIsLoading] = useState(true)
//   const { user } = useAuth()
//   const { theme } = useTheme()

//   // Handle Enter key for search
//   useKeyPress("Enter", () => {
//     if (searchTerm.trim()) {
//       toast.success("Search updated!")
//     }
//   })

//   // Generate templates on component mount
//   useEffect(() => {
//     setIsLoading(true)
//     const generatedTemplates = generateTemplates()
//     setTemplates(generatedTemplates)
//     setFilteredTemplates(generatedTemplates)
//     setIsLoading(false)
//   }, [])

//   // Filter and sort templates
//   useEffect(() => {
//     let filtered = templates

//     // Search filter
//     if (searchTerm) {
//       filtered = filtered.filter(
//         (template) =>
//           template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           template.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           template.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
//       )
//     }

//     // Category filter
//     if (selectedCategory !== "all") {
//       filtered = filtered.filter((template) => template.category === selectedCategory)
//     }

//     // Color filter
//     if (selectedColor !== "all") {
//       filtered = filtered.filter((template) => template.colorScheme.name === selectedColor)
//     }

//     // Sort templates
//     filtered.sort((a, b) => {
//       switch (sortBy) {
//         case "featured":
//           return (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.rating - a.rating
//         case "popular":
//           return b.downloads - a.downloads
//         case "rating":
//           return b.rating - a.rating
//         case "newest":
//           return b.id - a.id
//         case "name":
//           return a.name.localeCompare(b.name)
//         default:
//           return 0
//       }
//     })

//     setFilteredTemplates(filtered)
//   }, [searchTerm, selectedCategory, selectedColor, sortBy, templates])

//   const toggleFavorite = (templateId) => {
//     if (!user) {
//       toast.error("Please login to save favorites")
//       return
//     }

//     setFavorites((prev) => {
//       const newFavorites = prev.includes(templateId) ? prev.filter((id) => id !== templateId) : [...prev, templateId]

//       toast.success(prev.includes(templateId) ? "Removed from favorites" : "Added to favorites", {
//         icon: prev.includes(templateId) ? "💔" : "❤️",
//       })

//       return newFavorites
//     })
//   }

//   const categories = [
//     "all",
//     "modern",
//     "creative",
//     "professional",
//     "minimalist",
//     "executive",
//     "tech",
//     "design",
//     "marketing",
//     "academic",
//     "healthcare",
//     "finance",
//     "legal",
//     "engineering",
//     "sales",
//     "consulting",
//     "startup",
//     "corporate",
//     "freelance",
//     "artistic",
//     "scientific",
//   ]

//   const colors = [
//     "all",
//     "midnight",
//     "ocean",
//     "sunset",
//     "forest",
//     "royal",
//     "steel",
//     "crimson",
//     "emerald",
//     "sapphire",
//     "gold",
//     "platinum",
//     "copper",
//     "jade",
//     "ruby",
//     "onyx",
//   ]

//   const sortOptions = [
//     { value: "featured", label: "Featured" },
//     { value: "popular", label: "Most Popular" },
//     { value: "rating", label: "Highest Rated" },
//     { value: "newest", label: "Newest" },
//     { value: "name", label: "Name A-Z" },
//   ]

//   if (isLoading) {
//     return (
//       <div
//         className={`min-h-screen pt-20 pb-12 px-4 flex items-center justify-center ${
//           theme === "dark"
//             ? "bg-gradient-to-br from-cinematic-dark via-gray-900 to-black"
//             : "bg-gradient-to-br from-gray-50 via-white to-gray-100"
//         }`}
//       >
//         <div className="text-center">
//           <div className="loading-spinner w-12 h-12 mx-auto mb-4"></div>
//           <p className={`text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
//             Loading amazing templates...
//           </p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div
//       className={`min-h-screen pt-20 pb-12 px-4 ${
//         theme === "dark"
//           ? "bg-gradient-to-br from-cinematic-dark via-gray-900 to-black"
//           : "bg-gradient-to-br from-gray-50 via-white to-gray-100"
//       }`}
//     >
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
//           <h1 className="text-5xl md:text-6xl font-cinematic font-bold mb-6 bg-gradient-to-r from-cinematic-gold via-white to-cinematic-neon bg-clip-text text-transparent">
//             200+ Premium Templates
//           </h1>
//           <p className={`text-xl max-w-2xl mx-auto ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
//             Discover state-of-the-art resume templates designed by professionals for every industry and career level
//           </p>
//         </motion.div>

//         {/* Search and Filters */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//           className={`backdrop-blur-sm border rounded-2xl p-6 mb-8 ${
//             theme === "dark" ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200 shadow-sm"
//           }`}
//         >
//           <div className="flex flex-col lg:flex-row gap-4 items-center mb-4">
//             {/* Search */}
//             <div className="relative flex-1 max-w-md">
//               <Search
//                 className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
//                   theme === "dark" ? "text-gray-400" : "text-gray-500"
//                 }`}
//               />
//               <input
//                 type="text"
//                 placeholder="Search templates, categories, or tags..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className={`w-full pl-10 pr-4 py-3 rounded-xl transition-colors duration-200 ${
//                   theme === "dark"
//                     ? "bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-cinematic-neon"
//                     : "bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-cinematic-gold"
//                 }`}
//               />
//             </div>

//             {/* Category Filter */}
//             <div className="flex items-center gap-2">
//               <Filter className={`w-5 h-5 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
//               <select
//                 value={selectedCategory}
//                 onChange={(e) => setSelectedCategory(e.target.value)}
//                 className={`rounded-xl px-4 py-3 transition-colors duration-200 ${
//                   theme === "dark"
//                     ? "bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:border-cinematic-neon"
//                     : "bg-white border border-gray-300 text-gray-900 focus:outline-none focus:border-cinematic-gold"
//                 }`}
//               >
//                 {categories.map((category) => (
//                   <option key={category} value={category}>
//                     {category.charAt(0).toUpperCase() + category.slice(1)}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Color Filter */}
//             <div className="flex items-center gap-2">
//               <div className="w-5 h-5 rounded-full bg-gradient-to-r from-red-500 to-blue-500"></div>
//               <select
//                 value={selectedColor}
//                 onChange={(e) => setSelectedColor(e.target.value)}
//                 className={`rounded-xl px-4 py-3 transition-colors duration-200 ${
//                   theme === "dark"
//                     ? "bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:border-cinematic-neon"
//                     : "bg-white border border-gray-300 text-gray-900 focus:outline-none focus:border-cinematic-gold"
//                 }`}
//               >
//                 {colors.map((color) => (
//                   <option key={color} value={color}>
//                     {color.charAt(0).toUpperCase() + color.slice(1)}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Sort */}
//             <select
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//               className={`rounded-xl px-4 py-3 transition-colors duration-200 ${
//                 theme === "dark"
//                   ? "bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:border-cinematic-neon"
//                   : "bg-white border border-gray-300 text-gray-900 focus:outline-none focus:border-cinematic-gold"
//               }`}
//             >
//               {sortOptions.map((option) => (
//                 <option key={option.value} value={option.value}>
//                   {option.label}
//                 </option>
//               ))}
//             </select>

//             {/* View Toggle */}
//             <div className={`flex rounded-xl border ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}>
//               <button
//                 onClick={() => setViewMode("grid")}
//                 className={`p-3 rounded-l-xl transition-colors duration-200 ${
//                   viewMode === "grid"
//                     ? "bg-cinematic-gold text-black"
//                     : theme === "dark"
//                       ? "text-gray-400 hover:text-white hover:bg-gray-700"
//                       : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
//                 }`}
//               >
//                 <Grid className="w-5 h-5" />
//               </button>
//               <button
//                 onClick={() => setViewMode("list")}
//                 className={`p-3 rounded-r-xl transition-colors duration-200 ${
//                   viewMode === "list"
//                     ? "bg-cinematic-gold text-black"
//                     : theme === "dark"
//                       ? "text-gray-400 hover:text-white hover:bg-gray-700"
//                       : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
//                 }`}
//               >
//                 <List className="w-5 h-5" />
//               </button>
//             </div>
//           </div>

//           {/* Results Info */}
//           <div
//             className={`flex justify-between items-center text-sm ${
//               theme === "dark" ? "text-gray-400" : "text-gray-600"
//             }`}
//           >
//             <span>
//               Showing {filteredTemplates.length} of {templates.length} templates
//             </span>
//             {user && <span>{favorites.length} favorites saved</span>}
//           </div>
//         </motion.div>

//         {/* Templates Grid/List */}
//         <AnimatePresence mode="wait">
//           {viewMode === "grid" ? (
//             <motion.div
//               key="grid"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
//             >
//               {filteredTemplates.map((template, index) => (
//                 <TemplateCard
//                   key={template.id}
//                   template={template}
//                   index={index}
//                   isFavorite={favorites.includes(template.id)}
//                   onToggleFavorite={toggleFavorite}
//                   user={user}
//                   theme={theme}
//                 />
//               ))}
//             </motion.div>
//           ) : (
//             <motion.div
//               key="list"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="space-y-4"
//             >
//               {filteredTemplates.map((template, index) => (
//                 <TemplateListItem
//                   key={template.id}
//                   template={template}
//                   index={index}
//                   isFavorite={favorites.includes(template.id)}
//                   onToggleFavorite={toggleFavorite}
//                   user={user}
//                   theme={theme}
//                 />
//               ))}
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* No Results */}
//         {filteredTemplates.length === 0 && (
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
//             <div className="text-6xl mb-4">🔍</div>
//             <h3 className={`text-2xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
//               No templates found
//             </h3>
//             <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
//               Try adjusting your search or filters
//             </p>
//             <button
//               onClick={() => {
//                 setSearchTerm("")
//                 setSelectedCategory("all")
//                 setSelectedColor("all")
//                 setSortBy("featured")
//               }}
//               className="mt-4 bg-gradient-to-r from-cinematic-gold to-yellow-500 text-black px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200"
//             >
//               Clear All Filters
//             </button>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   )
// }

// // Template Card Component
// const TemplateCard = ({ template, index, isFavorite, onToggleFavorite, user, theme }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 30 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ delay: index * 0.05 }}
//     className={`group backdrop-blur-sm border rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 ${
//       theme === "dark"
//         ? "bg-gray-800/50 border-gray-700 hover:border-cinematic-neon/50"
//         : "bg-white/80 border-gray-200 hover:border-cinematic-gold/50 shadow-sm hover:shadow-lg"
//     }`}
//   >
//     {/* Template Preview */}
//     <div className="relative aspect-[3/4] overflow-hidden">
//       <img
//         src={template.preview || "/placeholder.svg"}
//         alt={template.name}
//         className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//       />

//       {/* Overlay */}
//       <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
//         <div className="flex gap-3">
//           <motion.button
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//             className="bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-colors duration-200"
//           >
//             <Eye className="w-5 h-5 text-white" />
//           </motion.button>
//           <motion.button
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//             onClick={() => onToggleFavorite(template.id)}
//             className={`backdrop-blur-sm p-3 rounded-full transition-colors duration-200 ${
//               isFavorite ? "bg-red-500/90 hover:bg-red-500" : "bg-white/20 hover:bg-white/30"
//             }`}
//           >
//             <Heart className={`w-5 h-5 ${isFavorite ? "text-white fill-current" : "text-white"}`} />
//           </motion.button>
//           <Link
//             to={user ? `/editor/${template.id}` : "/login"}
//             onClick={() => {
//               if (!user) {
//                 toast.error("Please login to use templates")
//               }
//             }}
//           >
//             <motion.div
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//               className="bg-cinematic-gold/90 backdrop-blur-sm p-3 rounded-full hover:bg-cinematic-gold transition-colors duration-200"
//             >
//               <Edit className="w-5 h-5 text-black" />
//             </motion.div>
//           </Link>
//         </div>
//       </div>

//       {/* Badges */}
//       <div className="absolute top-3 left-3 flex flex-col gap-2">
//         {template.featured && (
//           <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
//             <Crown className="w-3 h-3" />
//             Featured
//           </div>
//         )}
//         {template.premium && (
//           <div className="bg-cinematic-gold text-black px-2 py-1 rounded-full text-xs font-bold">PRO</div>
//         )}
//       </div>

//       {/* Color Indicator */}
//       <div
//         className="absolute top-3 right-3 w-6 h-6 rounded-full border-2 border-white/50"
//         style={{ backgroundColor: template.colorScheme.primary }}
//       ></div>
//     </div>

//     {/* Template Info */}
//     <div className="p-4">
//       <h3 className={`font-bold mb-2 truncate ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
//         {template.name}
//       </h3>

//       <div
//         className={`flex items-center justify-between text-sm mb-3 ${
//           theme === "dark" ? "text-gray-400" : "text-gray-600"
//         }`}
//       >
//         <span className="capitalize">{template.category}</span>
//         <div className="flex items-center gap-1">
//           <Star className="w-4 h-4 text-yellow-400 fill-current" />
//           <span>{template.rating}</span>
//         </div>
//       </div>

//       <div
//         className={`flex items-center justify-between text-xs ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}
//       >
//         <div className="flex items-center gap-1">
//           <Download className="w-3 h-3" />
//           <span>{template.downloads.toLocaleString()}</span>
//         </div>
//         <div className="flex flex-wrap gap-1">
//           {template.tags.slice(0, 2).map((tag, i) => (
//             <span
//               key={i}
//               className={`px-2 py-1 rounded-full text-xs ${
//                 theme === "dark" ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600"
//               }`}
//             >
//               {tag}
//             </span>
//           ))}
//         </div>
//       </div>
//     </div>
//   </motion.div>
// )

// // Template List Item Component
// const TemplateListItem = ({ template, index, isFavorite, onToggleFavorite, user, theme }) => (
//   <motion.div
//     initial={{ opacity: 0, x: -20 }}
//     animate={{ opacity: 1, x: 0 }}
//     transition={{ delay: index * 0.02 }}
//     className={`backdrop-blur-sm border rounded-2xl p-6 transition-all duration-300 ${
//       theme === "dark"
//         ? "bg-gray-800/50 border-gray-700 hover:border-cinematic-neon/50"
//         : "bg-white/80 border-gray-200 hover:border-cinematic-gold/50 shadow-sm hover:shadow-lg"
//     }`}
//   >
//     <div className="flex items-center gap-6">
//       {/* Preview Thumbnail */}
//       <div className="relative w-24 h-32 flex-shrink-0 rounded-lg overflow-hidden">
//         <img src={template.preview || "/placeholder.svg"} alt={template.name} className="w-full h-full object-cover" />
//         <div
//           className="absolute top-2 right-2 w-3 h-3 rounded-full border border-white/50"
//           style={{ backgroundColor: template.colorScheme.primary }}
//         ></div>
//       </div>

//       {/* Template Info */}
//       <div className="flex-1">
//         <div className="flex items-start justify-between mb-2">
//           <div>
//             <h3 className={`text-lg font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
//               {template.name}
//             </h3>
//             <p className={`text-sm capitalize ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
//               {template.category} • {template.layout.replace("-", " ")}
//             </p>
//           </div>

//           <div className="flex items-center gap-2">
//             {template.featured && <Crown className="w-4 h-4 text-purple-500" />}
//             {template.premium && (
//               <div className="bg-cinematic-gold text-black px-2 py-1 rounded-full text-xs font-bold">PRO</div>
//             )}
//           </div>
//         </div>

//         <p className={`text-sm mb-3 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>{template.description}</p>

//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-4 text-sm">
//             <div className="flex items-center gap-1">
//               <Star className="w-4 h-4 text-yellow-400 fill-current" />
//               <span className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>{template.rating}</span>
//             </div>
//             <div className="flex items-center gap-1">
//               <Download className="w-4 h-4" />
//               <span className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
//                 {template.downloads.toLocaleString()}
//               </span>
//             </div>
//           </div>

//           <div className="flex items-center gap-2">
//             <motion.button
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//               onClick={() => onToggleFavorite(template.id)}
//               className={`p-2 rounded-full transition-colors duration-200 ${
//                 isFavorite
//                   ? "text-red-500 hover:bg-red-50"
//                   : theme === "dark"
//                     ? "text-gray-400 hover:text-red-500 hover:bg-gray-700"
//                     : "text-gray-400 hover:text-red-500 hover:bg-gray-100"
//               }`}
//             >
//               <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
//             </motion.button>

//             <Link
//               to={user ? `/editor/${template.id}` : "/login"}
//               onClick={() => {
//                 if (!user) {
//                   toast.error("Please login to use templates")
//                 }
//               }}
//             >
//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="bg-gradient-to-r from-cinematic-gold to-yellow-500 text-black px-6 py-2 rounded-full font-medium hover:shadow-lg transition-all duration-200 flex items-center gap-2"
//               >
//                 <Edit className="w-4 h-4" />
//                 <span>Use Template</span>
//               </motion.div>
//             </Link>
//           </div>
//         </div>

//         {/* Tags */}
//         <div className="flex flex-wrap gap-2 mt-3">
//           {template.tags.map((tag, i) => (
//             <span
//               key={i}
//               className={`px-2 py-1 rounded-full text-xs ${
//                 theme === "dark" ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600"
//               }`}
//             >
//               {tag}
//             </span>
//           ))}
//         </div>
//       </div>
//     </div>
//   </motion.div>
// )

// export default Templates






























"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter, Eye, Edit, Star, Crown, Download, Heart, Grid, List } from "lucide-react"
import { useAuth } from "../hooks/useAuth"
import { useTheme } from "../hooks/useTheme"
import { useKeyPress } from "../hooks/useKeyPress"
import { api } from "../utils/api"
import toast from "react-hot-toast"
import TemplatePreviewModal from "../components/templates/TemplatePreviewModal"
import SubscriptionModal from "../components/subscription/SubscriptionModal"

const Templates = () => {
  const [templates, setTemplates] = useState([])
  const [filteredTemplates, setFilteredTemplates] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedColor, setSelectedColor] = useState("all")
  const [sortBy, setSortBy] = useState("featured")
  const [viewMode, setViewMode] = useState("grid")
  const [favorites, setFavorites] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [previewTemplate, setPreviewTemplate] = useState(null)
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false)
  const { user } = useAuth()
  const { theme } = useTheme()

  // Handle Enter key for search
  useKeyPress("Enter", () => {
    if (searchTerm.trim()) {
      toast.success("Search updated!")
    }
  })

  // Fetch templates from backend
  useEffect(() => {
    fetchTemplates()
  }, [])

  const fetchTemplates = async () => {
    setIsLoading(true)
    try {
      const response = await api.get("/templates")
      if (response.data.success) {
        setTemplates(response.data.templates)
        setFilteredTemplates(response.data.templates)
      }
    } catch (error) {
      console.error("Error fetching templates:", error)
      toast.error("Failed to load templates")
    } finally {
      setIsLoading(false)
    }
  }

  // Filter and sort templates
  useEffect(() => {
    let filtered = templates

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (template) =>
          template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          template.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          template.tags?.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((template) => template.category === selectedCategory)
    }

    // Color filter
    if (selectedColor !== "all") {
      filtered = filtered.filter((template) => template.colorScheme?.name === selectedColor)
    }

    // Sort templates
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "featured":
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.rating - a.rating
        case "popular":
          return b.downloads - a.downloads
        case "rating":
          return b.rating - a.rating
        case "newest":
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
        case "name":
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

    setFilteredTemplates(filtered)
  }, [searchTerm, selectedCategory, selectedColor, sortBy, templates])

  const toggleFavorite = async (templateId) => {
    if (!user) {
      toast.error("Please login to save favorites")
      return
    }

    try {
      const response = await api.post(`/templates/${templateId}/favorite`)
      if (response.data.success) {
        setFavorites((prev) => {
          const newFavorites = prev.includes(templateId)
            ? prev.filter((id) => id !== templateId)
            : [...prev, templateId]
          toast.success(prev.includes(templateId) ? "Removed from favorites" : "Added to favorites", {
            icon: prev.includes(templateId) ? "💔" : "❤️",
          })
          return newFavorites
        })
      }
    } catch (error) {
      toast.error("Failed to update favorites")
    }
  }

  const handleTemplateAction = (template, action) => {
    if (action === "preview") {
      setPreviewTemplate(template)
    } else if (action === "edit") {
      if (!user) {
        toast.error("Please login to use templates")
        return
      }
      if (template.premium && !user.subscription?.active) {
        setShowSubscriptionModal(true)
        return
      }
      // Navigate to editor
      window.location.href = `/editor/${template.id}`
    }
  }

  const categories = [
    "all",
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

  const colors = [
    "all",
    "midnight",
    "ocean",
    "sunset",
    "forest",
    "royal",
    "steel",
    "crimson",
    "emerald",
    "sapphire",
    "gold",
    "platinum",
    "copper",
    "jade",
    "ruby",
    "onyx",
  ]

  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "popular", label: "Most Popular" },
    { value: "rating", label: "Highest Rated" },
    { value: "newest", label: "Newest" },
    { value: "name", label: "Name A-Z" },
  ]

  if (isLoading) {
    return (
      <div
        className={`min-h-screen pt-20 pb-12 px-4 flex items-center justify-center ${theme === "dark" ? "bg-primary-dark" : "bg-primary-light"}`}
      >
        <div className="text-center">
          <div className="loading-spinner w-12 h-12 mx-auto mb-4"></div>
          <p className={`text-lg ${theme === "dark" ? "text-secondary-dark" : "text-secondary-light"}`}>
            Loading amazing templates...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen pt-20 pb-12 px-4 ${theme === "dark" ? "bg-primary-dark" : "bg-primary-light"}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-cinematic font-bold mb-6 bg-gradient-to-r from-cinematic-gold via-cinematic-neon to-blue-500 bg-clip-text text-transparent">
            200+ Premium Templates
          </h1>
          <p className={`text-xl max-w-2xl mx-auto ${theme === "dark" ? "text-muted-dark" : "text-muted-light"}`}>
            Discover state-of-the-art resume templates designed by professionals for every industry and career level
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`glass backdrop-blur-sm border rounded-2xl p-6 mb-8 ${theme === "dark" ? "glass-dark" : "glass-light"}`}
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center mb-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className={`input-icon ${theme === "dark" ? "input-icon-dark" : "input-icon-light"}`} />
              <input
                type="text"
                placeholder="Search templates, categories, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`form-input ${theme === "dark" ? "form-input-dark" : "form-input-light"}`}
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className={`w-5 h-5 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`rounded-xl px-4 py-3 transition-colors duration-200 ${
                  theme === "dark"
                    ? "bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:border-cinematic-neon"
                    : "bg-white border border-gray-300 text-gray-900 focus:outline-none focus:border-cinematic-gold"
                }`}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Color Filter */}
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-gradient-to-r from-red-500 to-blue-500"></div>
              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className={`rounded-xl px-4 py-3 transition-colors duration-200 ${
                  theme === "dark"
                    ? "bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:border-cinematic-neon"
                    : "bg-white border border-gray-300 text-gray-900 focus:outline-none focus:border-cinematic-gold"
                }`}
              >
                {colors.map((color) => (
                  <option key={color} value={color}>
                    {color.charAt(0).toUpperCase() + color.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`rounded-xl px-4 py-3 transition-colors duration-200 ${
                theme === "dark"
                  ? "bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:border-cinematic-neon"
                  : "bg-white border border-gray-300 text-gray-900 focus:outline-none focus:border-cinematic-gold"
              }`}
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* View Toggle */}
            <div className={`flex rounded-xl border ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-3 rounded-l-xl transition-colors duration-200 ${
                  viewMode === "grid"
                    ? "bg-cinematic-gold text-black"
                    : theme === "dark"
                      ? "text-gray-400 hover:text-white hover:bg-gray-700"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-3 rounded-r-xl transition-colors duration-200 ${
                  viewMode === "list"
                    ? "bg-cinematic-gold text-black"
                    : theme === "dark"
                      ? "text-gray-400 hover:text-white hover:bg-gray-700"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Results Info */}
          <div
            className={`flex justify-between items-center text-sm ${theme === "dark" ? "text-muted-dark" : "text-muted-light"}`}
          >
            <span>
              Showing {filteredTemplates.length} of {templates.length} templates
            </span>
            {user && <span>{favorites.length} favorites saved</span>}
          </div>
        </motion.div>

        {/* Templates Grid/List */}
        <AnimatePresence mode="wait">
          {viewMode === "grid" ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredTemplates.map((template, index) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  index={index}
                  isFavorite={favorites.includes(template.id)}
                  onToggleFavorite={toggleFavorite}
                  onAction={handleTemplateAction}
                  user={user}
                  theme={theme}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {filteredTemplates.map((template, index) => (
                <TemplateListItem
                  key={template.id}
                  template={template}
                  index={index}
                  isFavorite={favorites.includes(template.id)}
                  onToggleFavorite={toggleFavorite}
                  onAction={handleTemplateAction}
                  user={user}
                  theme={theme}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* No Results */}
        {filteredTemplates.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className={`text-2xl font-bold mb-2 ${theme === "dark" ? "text-primary-dark" : "text-primary-light"}`}>
              No templates found
            </h3>
            <p className={`${theme === "dark" ? "text-muted-dark" : "text-muted-light"}`}>
              Try adjusting your search or filters
            </p>
            <button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
                setSelectedColor("all")
                setSortBy("featured")
              }}
              className="mt-4 bg-gradient-to-r from-cinematic-gold to-yellow-500 text-black px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200"
            >
              Clear All Filters
            </button>
          </motion.div>
        )}
      </div>

      {/* Modals */}
      {previewTemplate && (
        <TemplatePreviewModal template={previewTemplate} onClose={() => setPreviewTemplate(null)} theme={theme} />
      )}

      {showSubscriptionModal && <SubscriptionModal onClose={() => setShowSubscriptionModal(false)} theme={theme} />}
    </div>
  )
}

// Template Card Component
const TemplateCard = ({ template, index, isFavorite, onToggleFavorite, onAction, user, theme }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05 }}
    className={`template-card ${theme === "dark" ? "template-card-dark" : "template-card-light"}`}
  >
    {/* Template Preview */}
    <div className="relative aspect-[3/4] overflow-hidden">
      <img
        src={template.preview || `/placeholder.svg?height=400&width=300&text=${encodeURIComponent(template.name)}`}
        alt={template.name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onAction(template, "preview")}
            className="bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-colors duration-200"
          >
            <Eye className="w-5 h-5 text-white" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onToggleFavorite(template.id)}
            className={`backdrop-blur-sm p-3 rounded-full transition-colors duration-200 ${
              isFavorite ? "bg-red-500/90 hover:bg-red-500" : "bg-white/20 hover:bg-white/30"
            }`}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? "text-white fill-current" : "text-white"}`} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onAction(template, "edit")}
            className="bg-cinematic-gold/90 backdrop-blur-sm p-3 rounded-full hover:bg-cinematic-gold transition-colors duration-200"
          >
            <Edit className="w-5 h-5 text-black" />
          </motion.button>
        </div>
      </div>

      {/* Badges */}
      <div className="absolute top-3 left-3 flex flex-col gap-2">
        {template.featured && (
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <Crown className="w-3 h-3" />
            Featured
          </div>
        )}
        {template.premium && <div className="subscription-badge subscription-badge-pro">PRO</div>}
      </div>

      {/* Color Indicator */}
      <div
        className="absolute top-3 right-3 w-6 h-6 rounded-full border-2 border-white/50"
        style={{ backgroundColor: template.colorScheme?.primary || "#3b82f6" }}
      ></div>
    </div>

    {/* Template Info */}
    <div className="p-4">
      <h3 className={`font-bold mb-2 truncate ${theme === "dark" ? "text-primary-dark" : "text-primary-light"}`}>
        {template.name}
      </h3>

      <div
        className={`flex items-center justify-between text-sm mb-3 ${theme === "dark" ? "text-muted-dark" : "text-muted-light"}`}
      >
        <span className="capitalize">{template.category}</span>
        <div className="flex items-center gap-1">
          <Star className="rating-star" />
          <span>{template.rating || "4.5"}</span>
        </div>
      </div>

      <div
        className={`flex items-center justify-between text-xs ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}
      >
        <div className="flex items-center gap-1">
          <Download className="w-3 h-3" />
          <span>{(template.downloads || 1000).toLocaleString()}</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {(template.tags || ["modern", "professional"]).slice(0, 2).map((tag, i) => (
            <span
              key={i}
              className={`px-2 py-1 rounded-full text-xs ${
                theme === "dark" ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
)

// Template List Item Component
const TemplateListItem = ({ template, index, isFavorite, onToggleFavorite, onAction, user, theme }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.02 }}
    className={`glass backdrop-blur-sm border rounded-2xl p-6 transition-all duration-300 ${
      theme === "dark" ? "glass-dark" : "glass-light"
    }`}
  >
    <div className="flex items-center gap-6">
      {/* Preview Thumbnail */}
      <div className="relative w-24 h-32 flex-shrink-0 rounded-lg overflow-hidden">
        <img
          src={template.preview || `/placeholder.svg?height=128&width=96&text=${encodeURIComponent(template.name)}`}
          alt={template.name}
          className="w-full h-full object-cover"
        />
        <div
          className="absolute top-2 right-2 w-3 h-3 rounded-full border border-white/50"
          style={{ backgroundColor: template.colorScheme?.primary || "#3b82f6" }}
        ></div>
      </div>

      {/* Template Info */}
      <div className="flex-1">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className={`text-lg font-bold ${theme === "dark" ? "text-primary-dark" : "text-primary-light"}`}>
              {template.name}
            </h3>
            <p className={`text-sm capitalize ${theme === "dark" ? "text-muted-dark" : "text-muted-light"}`}>
              {template.category} •{" "}
              {(
                template.layout ||
                '}`}>\
              {template.category} • {(template.layout || "single-column'
              ).replace("-", " ")}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {template.featured && <Crown className="w-4 h-4 text-purple-500" />}
            {template.premium && <div className="subscription-badge subscription-badge-pro">PRO</div>}
          </div>
        </div>

        <p className={`text-sm mb-3 ${theme === "dark" ? "text-secondary-dark" : "text-secondary-light"}`}>
          {template.description ||
            "A professionally designed template that highlights your qualifications effectively."}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Star className="rating-star" />
              <span className={theme === "dark" ? "text-muted-dark" : "text-muted-light"}>
                {template.rating || "4.5"}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Download className="w-4 h-4" />
              <span className={theme === "dark" ? "text-muted-dark" : "text-muted-light"}>
                {(template.downloads || 1000).toLocaleString()}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onToggleFavorite(template.id)}
              className={`p-2 rounded-full transition-colors duration-200 ${
                isFavorite
                  ? "text-red-500 hover:bg-red-50"
                  : theme === "dark"
                    ? "text-gray-400 hover:text-red-500 hover:bg-gray-700"
                    : "text-gray-400 hover:text-red-500 hover:bg-gray-100"
              }`}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onAction(template, "preview")}
              className={`p-2 rounded-full transition-colors duration-200 ${
                theme === "dark"
                  ? "text-gray-400 hover:text-cinematic-neon hover:bg-gray-700"
                  : "text-gray-500 hover:text-cinematic-gold hover:bg-gray-100"
              }`}
            >
              <Eye className="w-5 h-5" />
            </motion.button>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onAction(template, "edit")}
              className="bg-gradient-to-r from-cinematic-gold to-yellow-500 text-black px-6 py-2 rounded-full font-medium hover:shadow-lg transition-all duration-200 flex items-center gap-2 cursor-pointer"
            >
              <Edit className="w-4 h-4" />
              <span>Use Template</span>
            </motion.div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-3">
          {(template.tags || ["modern", "professional", "clean"]).map((tag, i) => (
            <span
              key={i}
              className={`px-2 py-1 rounded-full text-xs ${
                theme === "dark" ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
)

export default Templates
