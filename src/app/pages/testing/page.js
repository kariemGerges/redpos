// 'use client';
// import React, { useRef, useState, useEffect } from 'react';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { OrbitControls, Text3D, Center, Float } from '@react-three/drei';
// import Image from 'next/image';

// // 3D rotating cube component with project info
// const ProjectCube = ({ position, color, project, onClick }) => {
//   const meshRef = useRef();
  
//   useFrame(() => {
//     meshRef.current.rotation.x += 0.005;
//     meshRef.current.rotation.y += 0.01;
//   });

//   return (
//     <mesh 
//       ref={meshRef} 
//       position={position} 
//       onClick={onClick}
//       scale={1}
//     >
//       <boxGeometry args={[2, 2, 2]} />
//       <meshStandardMaterial color={color} />
//       <Html position={[0, 0, 1.01]} center>
//         <div className="bg-black bg-opacity-70 text-white p-2 rounded text-center w-32">
//           <p className="font-bold text-xs">{project.name}</p>
//         </div>
//       </Html>
//     </mesh>
//   );
// };

// // HTML content displayed inside the 3D canvas
// const Html = ({ children, position, center }) => {
//   const ref = useRef();
  
//   return (
//     <group position={position}>
//       <div 
//         ref={ref} 
//         className={`absolute transform ${center ? '-translate-x-1/2 -translate-y-1/2' : ''}`}
//         style={{ pointerEvents: 'none' }}
//       >
//         {children}
//       </div>
//     </group>
//   );
// };

// // Floating text for the 3D scene
// const FloatingText = () => {
//   return (
//     <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
//       <Center>
//         <Text3D
//           font="/fonts/helvetiker_regular.typeface.json"
//           size={1.5}
//           height={0.2}
//           position={[0, 4, 0]}
//         >
//           PORTFOLIO
//           <meshStandardMaterial color="#88ccff" />
//         </Text3D>
//       </Center>
//     </Float>
//   );
// };

// // Main 3D Scene
// const Scene = ({ setSelectedProject, projects }) => {
//   return (
//     <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
//       <ambientLight intensity={0.5} />
//       <pointLight position={[10, 10, 10]} intensity={1} />
//       <OrbitControls enableZoom={false} />
      
//       <FloatingText />
      
//       {projects.map((project, index) => (
//         <ProjectCube
//           key={index}
//           position={[
//             (index % 3) * 5 - 5, 
//             Math.floor(index / 3) * -5 + 2,
//             0
//           ]}
//           color={project.color}
//           project={project}
//           onClick={() => setSelectedProject(project)}
//         />
//       ))}
//     </Canvas>
//   );
// };

// // Project Modal Component
// const ProjectModal = ({ project, onClose }) => {
//   if (!project) return null;
  
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
//       <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-2xl w-full mx-4">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{project.name}</h2>
//           <button 
//             onClick={onClose}
//             className="bg-gray-200 dark:bg-gray-700 rounded-full p-2 hover:bg-gray-300 dark:hover:bg-gray-600"
//           >
//             <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//         </div>
        
//         <div className="mb-6 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
//           <Image src={project.image} alt={project.name} className="w-full h-64 object-cover" />
//         </div>
        
//         <div className="mb-6">
//           <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Description</h3>
//           <p className="text-gray-700 dark:text-gray-300">{project.description}</p>
//         </div>
        
//         <div className="mb-6">
//           <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Technologies</h3>
//           <div className="flex flex-wrap gap-2">
//             {project.technologies.map((tech, index) => (
//               <span key={index} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full text-sm">
//                 {tech}
//               </span>
//             ))}
//           </div>
//         </div>
        
//         <div className="flex gap-4">
//           <a 
//             href={project.liveLink} 
//             target="_blank" 
//             rel="noopener noreferrer"
//             className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
//           >
//             Live Demo
//           </a>
//           <a 
//             href={project.codeLink} 
//             target="_blank" 
//             rel="noopener noreferrer"
//             className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg"
//           >
//             View Code
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Main Portfolio Component
// const PortfolioPage = () => {
//   const [darkMode, setDarkMode] = useState(false);
//   const [selectedProject, setSelectedProject] = useState(null);
  
//   // Sample project data
//   const projects = [
//     {
//       name: "E-commerce Platform",
//       description: "A full-stack e-commerce platform with product management, cart functionality, payment processing, and user authentication.",
//       technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe API", "Redux"],
//       image: "/api/placeholder/800/500",
//       color: "#4F46E5",
//       liveLink: "#",
//       codeLink: "#"
//     },
//     {
//       name: "Real-time Chat App",
//       description: "A real-time messaging application with private and group chats, file sharing, and user presence indicators.",
//       technologies: ["React", "Socket.io", "Firebase", "Tailwind CSS"],
//       image: "/api/placeholder/800/500",
//       color: "#10B981",
//       liveLink: "#",
//       codeLink: "#"
//     },
//     {
//       name: "Task Management System",
//       description: "A collaborative task management system with boards, lists, and cards. Features include deadlines, assignments, and integrations.",
//       technologies: ["React", "TypeScript", "Express", "PostgreSQL", "Redux"],
//       image: "/api/placeholder/800/500",
//       color: "#F59E0B",
//       liveLink: "#",
//       codeLink: "#"
//     },
//     {
//       name: "Content Management System",
//       description: "A custom CMS built for content creators with rich text editing, media management, and publishing workflows.",
//       technologies: ["Next.js", "GraphQL", "Prisma", "PostgreSQL"],
//       image: "/api/placeholder/800/500",
//       color: "#EC4899",
//       liveLink: "#",
//       codeLink: "#"
//     },
//     {
//       name: "Analytics Dashboard",
//       description: "An interactive dashboard visualizing complex data with charts, filters, and customizable views.",
//       technologies: ["React", "D3.js", "Express", "MongoDB"],
//       image: "/api/placeholder/800/500",
//       color: "#6366F1",
//       liveLink: "#",
//       codeLink: "#"
//     },
//     {
//       name: "Social Media Platform",
//       description: "A social networking platform with profiles, posts, comments, and real-time notifications.",
//       technologies: ["React", "Node.js", "Socket.io", "MongoDB", "Redis"],
//       image: "/api/placeholder/800/500",
//       color: "#EF4444",
//       liveLink: "#",
//       codeLink: "#"
//     }
//   ];
  
//   useEffect(() => {
//     // Set initial theme based on user preference
//     if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
//       setDarkMode(true);
//     }
//   }, []);
  
//   return (
//     <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
//       {/* Navbar */}
//       <nav className="bg-white dark:bg-gray-800 shadow-md">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16">
//             <div className="flex items-center">
//               <span className="text-xl font-bold text-blue-600 dark:text-blue-400">DevPortfolio</span>
//             </div>
//             <div className="flex items-center space-x-4">
//               <a href="#about" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">About</a>
//               <a href="#projects" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Projects</a>
//               <a href="#contact" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Contact</a>
//               <button
//                 onClick={() => setDarkMode(!darkMode)}
//                 className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
//               >
//                 {darkMode ? (
//                   <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
//                   </svg>
//                 ) : (
//                   <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
//                     <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
//                   </svg>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>
      
//       {/* Hero Section with 3D Scene */}
//       <div className="relative h-screen">
//         <div className="absolute inset-0 z-10">
//           <Scene setSelectedProject={setSelectedProject} projects={projects} />
//         </div>
        
//         <div className="absolute inset-0 flex items-center z-0">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
//             <div className="lg:w-1/2 p-6 bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 rounded-lg shadow-xl">
//               <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">John Doe</h1>
//               <h2 className="text-2xl text-blue-600 dark:text-blue-400 mb-6">Full Stack Developer</h2>
//               <p className="text-gray-700 dark:text-gray-300 mb-8">
//                 Building innovative web applications with modern technologies.
//                 Specialized in creating seamless user experiences and robust backend systems.
//               </p>
//               <div className="flex space-x-4">
//                 <a 
//                   href="#projects"
//                   className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
//                 >
//                   View Projects
//                 </a>
//                 <a 
//                   href="#contact"
//                   className="px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium rounded-lg"
//                 >
//                   Contact Me
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Project Modal */}
//       {selectedProject && (
//         <ProjectModal
//           project={selectedProject}
//           onClose={() => setSelectedProject(null)}
//         />
//       )}
      
//       {/* About Section */}
//       <section id="about" className="py-16 bg-white dark:bg-gray-800">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">About Me</h2>
          
//           <div className="flex flex-col md:flex-row items-center gap-12">
//             <div className="md:w-1/3">
//               <div className="rounded-full overflow-hidden w-64 h-64 mx-auto border-4 border-blue-500">
//                 <img src="/api/placeholder/256/256" alt="Profile" className="w-full h-full object-cover" />
//               </div>
//             </div>
            
//             <div className="md:w-2/3">
//               <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Passionate Full Stack Developer</h3>
//               <p className="text-gray-700 dark:text-gray-300 mb-6">
//                 With over 5 years of experience in web development, I specialize in building responsive, 
//                 user-friendly applications that solve real-world problems. My expertise spans the entire 
//                 development stack, from crafting intuitive frontends to designing scalable backend systems.
//               </p>
              
//               <div className="grid grid-cols-2 gap-6 mb-8">
//                 <div>
//                   <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">Frontend Skills</h4>
//                   <ul className="space-y-1 text-gray-700 dark:text-gray-300">
//                     <li>React & Next.js</li>
//                     <li>TypeScript</li>
//                     <li>Tailwind CSS & Styled Components</li>
//                     <li>Three.js & WebGL</li>
//                     <li>Redux & Context API</li>
//                   </ul>
//                 </div>
                
//                 <div>
//                   <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">Backend Skills</h4>
//                   <ul className="space-y-1 text-gray-700 dark:text-gray-300">
//                     <li>Node.js & Express</li>
//                     <li>MongoDB & PostgreSQL</li>
//                     <li>GraphQL & REST APIs</li>
//                     <li>AWS & Firebase</li>
//                     <li>Docker & CI/CD</li>
//                   </ul>
//                 </div>
//               </div>
              
//               <div>
//                 <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">Education & Certifications</h4>
//                 <ul className="space-y-2 text-gray-700 dark:text-gray-300">
//                   <li>B.S. in Computer Science, University of Technology</li>
//                   <li>AWS Certified Developer Associate</li>
//                   <li>Google Cloud Professional Developer</li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
      
//       {/* Contact Section */}
//       <section id="contact" className="py-16 bg-gray-100 dark:bg-gray-900">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Get In Touch</h2>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
//             <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
//               <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Send Me a Message</h3>
              
//               <form className="space-y-6">
//                 <div>
//                   <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
//                   <input
//                     type="text"
//                     id="name"
//                     className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
//                     placeholder="Your Name"
//                   />
//                 </div>
                
//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
//                   <input
//                     type="email"
//                     id="email"
//                     className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
//                     placeholder="your.email@example.com"
//                   />
//                 </div>
                
//                 <div>
//                   <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
//                   <textarea
//                     id="message"
//                     rows="5"
//                     className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
//                     placeholder="Your message here..."
//                   ></textarea>
//                 </div>
                
//                 <button
//                   type="submit"
//                   className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
//                 >
//                   Send Message
//                 </button>
//               </form>
//             </div>
            
//             <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
//               <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Contact Information</h3>
              
//               <div className="space-y-8">
//                 <div className="flex items-start space-x-4">
//                   <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-3">
//                     <svg className="w-6 h-6 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                     </svg>
//                   </div>
//                   <div>
//                     <h4 className="text-lg font-medium text-gray-900 dark:text-white">Phone</h4>
//                     <p className="text-gray-700 dark:text-gray-300">+1 (555) 123-4567</p>
//                   </div>
//                 </div>
                
//                 <div className="flex items-start space-x-4">
//                   <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-3">
//                     <svg className="w-6 h-6 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                     </svg>
//                   </div>
//                   <div>
//                     <h4 className="text-lg font-medium text-gray-900 dark:text-white">Email</h4>
//                     <p className="text-gray-700 dark:text-gray-300">john.doe@example.com</p>
//                   </div>
//                 </div>
                
//                 <div className="flex items-start space-x-4">
//                   <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-3">
//                     <svg className="w-6 h-6 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                     </svg>
//                   </div>
//                   <div>
//                     <h4 className="text-lg font-medium text-gray-900 dark:text-white">Location</h4>
//                     <p className="text-gray-700 dark:text-gray-300">San Francisco, CA</p>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="mt-12">
//                 <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Connect With Me</h4>
//                 <div className="flex space-x-4">
//                   <a href="#" className="bg-gray-200 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900 p-3 rounded-full">
//                     <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
//                       <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/>
//                     </svg>
//                   </a>
//                   <a href="#" className="bg-gray-200 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900 p-3 rounded-full">
//                     <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
//                       <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
//                     </svg>
//                   </a>
//                   <a href="#" className="bg-gray-200 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900 p-3 rounded-full">
//                     <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
//                       <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/>
//                     </svg>
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
      
//       {/* Footer */}
//       <footer className="bg-gray-800 dark:bg-gray-900 py-8">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             <div className="mb-4 md:mb-0">
//               <span className="text-xl font-bold text-white">DevPortfolio</span>
//             </div>
            
//             <div className="flex space-x-6">
//               <a href="#" className="text-gray-400 hover:text-white">Home</a>
//               <a href="#about" className="text-gray-400 hover:text-white">About</a>
//               <a href="#projects" className="text-gray-400 hover:text-white">Projects</a>
//               <a href="#contact" className="text-gray-400 hover:text-white">Contact</a>
//             </div>
//           </div>
          
//           <div className="mt-8 border-t border-gray-700 pt-8">
//             <p className="text-sm text-gray-400">© 2023 DevPortfolio. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default PortfolioPage;