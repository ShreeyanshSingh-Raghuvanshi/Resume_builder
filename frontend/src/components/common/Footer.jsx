// "use client"

// import { motion } from "framer-motion"
// import { Link } from "react-router-dom"
// import { Sparkles, Heart, Github, Twitter, Linkedin, Mail } from "lucide-react"
// import { useTheme } from "../../hooks/useTheme"

// const Footer = () => {
//   const { theme } = useTheme()

//   const footerLinks = {
//     product: [
//       { name: "Templates", href: "/templates" },
//       { name: "Features", href: "#features" },
//       { name: "Pricing", href: "#pricing" },
//       { name: "Examples", href: "#examples" },
//     ],
//     company: [
//       { name: "About", href: "#about" },
//       { name: "Blog", href: "#blog" },
//       { name: "Careers", href: "#careers" },
//       { name: "Contact", href: "#contact" },
//     ],
//     support: [
//       { name: "Help Center", href: "#help" },
//       { name: "Documentation", href: "#docs" },
//       { name: "API Reference", href: "#api" },
//       { name: "Status", href: "#status" },
//     ],
//     legal: [
//       { name: "Privacy Policy", href: "#privacy" },
//       { name: "Terms of Service", href: "#terms" },
//       { name: "Cookie Policy", href: "#cookies" },
//       { name: "GDPR", href: "#gdpr" },
//     ],
//   }

//   const socialLinks = [
//     { name: "GitHub", icon: Github, href: "#github" },
//     { name: "Twitter", icon: Twitter, href: "#twitter" },
//     { name: "LinkedIn", icon: Linkedin, href: "#linkedin" },
//     { name: "Email", icon: Mail, href: "mailto:hello@cinecv.com" },
//   ]

//   return (
//     <footer
//       className={`relative overflow-hidden ${
//         theme === "dark"
//           ? "bg-gradient-to-t from-black via-gray-900 to-gray-800 text-white"
//           : "bg-gradient-to-t from-gray-100 via-white to-gray-50 text-gray-900"
//       }`}
//     >
//       {/* Background Animation */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         {[...Array(8)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute w-1 h-1 bg-cinematic-neon rounded-full opacity-20"
//             animate={{
//               x: [0, 50, 0],
//               y: [0, -50, 0],
//               opacity: [0.2, 0.5, 0.2],
//             }}
//             transition={{
//               duration: 6 + i * 0.5,
//               repeat: Number.POSITIVE_INFINITY,
//               delay: i * 0.5,
//             }}
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//             }}
//           />
//         ))}
//       </div>

//       <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
//         {/* Main Footer Content */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
//           {/* Brand Section */}
//           <div className="lg:col-span-2">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               viewport={{ once: true }}
//             >
//               <Link to="/" className="flex items-center space-x-2 mb-6">
//                 <Sparkles className="w-8 h-8 text-cinematic-gold" />
//                 <span className="text-2xl font-cinematic font-bold bg-gradient-to-r from-cinematic-gold to-cinematic-neon bg-clip-text text-transparent">
//                   CineCV
//                 </span>
//               </Link>
//               <p className={`text-lg mb-6 leading-relaxed ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
//                 Create cinematic resumes that tell your professional story with style and impact.
//               </p>
//               <div className="flex space-x-4">
//                 {socialLinks.map((social) => {
//                   const Icon = social.icon
//                   return (
//                     <motion.a
//                       key={social.name}
//                       href={social.href}
//                       whileHover={{ scale: 1.1, y: -2 }}
//                       whileTap={{ scale: 0.9 }}
//                       className={`p-3 rounded-full transition-colors duration-200 ${
//                         theme === "dark"
//                           ? "bg-gray-800 text-gray-400 hover:text-cinematic-gold hover:bg-gray-700"
//                           : "bg-gray-100 text-gray-600 hover:text-cinematic-gold hover:bg-gray-200"
//                       }`}
//                       aria-label={social.name}
//                     >
//                       <Icon className="w-5 h-5" />
//                     </motion.a>
//                   )
//                 })}
//               </div>
//             </motion.div>
//           </div>

//           {/* Links Sections */}
//           {Object.entries(footerLinks).map(([category, links], index) => (
//             <motion.div
//               key={category}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: index * 0.1 }}
//               viewport={{ once: true }}
//             >
//               <h3 className={`font-bold text-lg mb-4 capitalize ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
//                 {category}
//               </h3>
//               <ul className="space-y-3">
//                 {links.map((link) => (
//                   <li key={link.name}>
//                     <Link
//                       to={link.href}
//                       className={`transition-colors duration-200 hover:text-cinematic-gold ${
//                         theme === "dark" ? "text-gray-400" : "text-gray-600"
//                       }`}
//                     >
//                       {link.name}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </motion.div>
//           ))}
//         </div>

//         {/* Newsletter Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.4 }}
//           viewport={{ once: true }}
//           className={`border-t border-b py-8 mb-8 ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}
//         >
//           <div className="max-w-2xl mx-auto text-center">
//             <h3 className={`text-2xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
//               Stay Updated
//             </h3>
//             <p className={`text-lg mb-6 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
//               Get the latest templates, tips, and career advice delivered to your inbox.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 className={`flex-1 px-4 py-3 rounded-xl border transition-colors duration-200 ${
//                   theme === "dark"
//                     ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-cinematic-neon"
//                     : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-cinematic-gold"
//                 } focus:outline-none`}
//               />
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="bg-gradient-to-r from-cinematic-gold to-yellow-500 text-black px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200"
//               >
//                 Subscribe
//               </motion.button>
//             </div>
//           </div>
//         </motion.div>

//         {/* Bottom Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.6 }}
//           viewport={{ once: true }}
//           className="flex flex-col md:flex-row justify-between items-center"
//         >
//           <div className={`text-sm mb-4 md:mb-0 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
//             <p className="flex items-center gap-2">
//               © 2024 CineCV. Made with <Heart className="w-4 h-4 text-red-500 fill-current" /> for professionals
//               worldwide.
//             </p>
//           </div>
//           <div className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
//             <p>Version 1.0.0 • Last updated: January 2024</p>
//           </div>
//         </motion.div>
//       </div>
//     </footer>
//   )
// }

// export default Footer
















"use client"

import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Sparkles, Heart, Github, Twitter, Linkedin, Mail } from "lucide-react"
import { useTheme } from "../../hooks/useTheme"

const Footer = () => {
  const { theme } = useTheme()

  const footerLinks = {
    product: [
      { name: "Templates", href: "/templates" },
      { name: "Features", href: "#features" },
      { name: "Pricing", href: "#pricing" },
      { name: "Examples", href: "#examples" },
    ],
    company: [
      { name: "About", href: "#about" },
      { name: "Blog", href: "#blog" },
      { name: "Careers", href: "#careers" },
      { name: "Contact", href: "#contact" },
    ],
    support: [
      { name: "Help Center", href: "#help" },
      { name: "Documentation", href: "#docs" },
      { name: "API Reference", href: "#api" },
      { name: "Status", href: "#status" },
    ],
    legal: [
      { name: "Privacy Policy", href: "#privacy" },
      { name: "Terms of Service", href: "#terms" },
      { name: "Cookie Policy", href: "#cookies" },
      { name: "GDPR", href: "#gdpr" },
    ],
  }

  const socialLinks = [
    { name: "GitHub", icon: Github, href: "#github" },
    { name: "Twitter", icon: Twitter, href: "#twitter" },
    { name: "LinkedIn", icon: Linkedin, href: "#linkedin" },
    { name: "Email", icon: Mail, href: "mailto:hello@cinecv.com" },
  ]

  return (
    <footer
      className={`relative overflow-hidden ${
        theme === "dark"
          ? "bg-gradient-to-t from-black via-gray-900 to-gray-800 text-white"
          : "bg-gradient-to-t from-gray-100 via-white to-gray-50 text-gray-900"
      }`}
    >
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cinematic-neon rounded-full opacity-20"
            animate={{
              x: [0, 50, 0],
              y: [0, -50, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 6 + i * 0.5,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.5,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Link to="/" className="flex items-center space-x-2 mb-6">
                <Sparkles className="w-8 h-8 text-cinematic-gold" />
                <span className="text-2xl font-cinematic font-bold bg-gradient-to-r from-cinematic-gold to-cinematic-neon bg-clip-text text-transparent">
                  CineCV
                </span>
              </Link>
              <p className={`text-lg mb-6 leading-relaxed ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                Create cinematic resumes that tell your professional story with style and impact.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      className={`p-3 rounded-full transition-colors duration-200 ${
                        theme === "dark"
                          ? "bg-gray-800 text-gray-400 hover:text-cinematic-gold hover:bg-gray-700"
                          : "bg-gray-100 text-gray-600 hover:text-cinematic-gold hover:bg-gray-200"
                      }`}
                      aria-label={social.name}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.a>
                  )
                })}
              </div>
            </motion.div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className={`font-bold text-lg mb-4 capitalize ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className={`transition-colors duration-200 hover:text-cinematic-gold ${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className={`border-t border-b py-8 mb-8 ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}
        >
          <div className="max-w-2xl mx-auto text-center">
            <h3 className={`text-2xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              Stay Updated
            </h3>
            <p className={`text-lg mb-6 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
              Get the latest templates, tips, and career advice delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className={`flex-1 px-4 py-3 rounded-xl border transition-colors duration-200 ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-cinematic-neon"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-cinematic-gold"
                } focus:outline-none`}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-cinematic-gold to-yellow-500 text-black px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center"
        >
          <div className={`text-sm mb-4 md:mb-0 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            <p className="flex items-center gap-2">
              © 2024 CineCV. Made with <Heart className="w-4 h-4 text-red-500 fill-current" /> for professionals
              worldwide.
            </p>
          </div>
          <div className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            <p>Version 1.0.0 • Last updated: January 2024</p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
