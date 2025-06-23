"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Download,
  Edit3,
  Plus,
  Trash2,
  GripVertical,
  Palette,
  Layout,
  User,
  Briefcase,
  GraduationCap,
  Award,
  Code,
  Mail,
  Phone,
  MapPin,
  Globe,
  Github,
  Linkedin,
} from "lucide-react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"

// Types
interface PersonalInfo {
  fullName: string
  title: string
  email: string
  phone: string
  location: string
  website: string
  linkedin: string
  github: string
  summary: string
}

interface Experience {
  id: string
  company: string
  position: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  description: string[]
}

interface Education {
  id: string
  institution: string
  degree: string
  field: string
  location: string
  startDate: string
  endDate: string
  gpa?: string
  honors?: string
}

interface Skill {
  id: string
  category: string
  skills: string[]
}

interface Project {
  id: string
  name: string
  description: string
  technologies: string[]
  link?: string
  github?: string
}

interface ResumeData {
  personalInfo: PersonalInfo
  experiences: Experience[]
  education: Education[]
  skills: Skill[]
  projects: Project[]
  sectionOrder: string[]
}

interface Theme {
  name: string
  primaryColor: string
  secondaryColor: string
  textColor: string
  backgroundColor: string
  fontFamily: string
}

const themes: Theme[] = [
  {
    name: "Professional Blue",
    primaryColor: "#2563eb",
    secondaryColor: "#1e40af",
    textColor: "#1f2937",
    backgroundColor: "#ffffff",
    fontFamily: "Inter",
  },
  {
    name: "Modern Gray",
    primaryColor: "#374151",
    secondaryColor: "#4b5563",
    textColor: "#111827",
    backgroundColor: "#ffffff",
    fontFamily: "Inter",
  },
  {
    name: "Elegant Purple",
    primaryColor: "#7c3aed",
    secondaryColor: "#6d28d9",
    textColor: "#1f2937",
    backgroundColor: "#ffffff",
    fontFamily: "Inter",
  },
  {
    name: "Classic Black",
    primaryColor: "#000000",
    secondaryColor: "#374151",
    textColor: "#111827",
    backgroundColor: "#ffffff",
    fontFamily: "Times New Roman",
  },
]

export default function ResumeBuilder() {
  const [activeTab, setActiveTab] = useState("edit")
  const [selectedTheme, setSelectedTheme] = useState(themes[0])
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: "John Doe",
      title: "Senior Software Engineer",
      email: "john.doe@email.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      website: "johndoe.dev",
      linkedin: "linkedin.com/in/johndoe",
      github: "github.com/johndoe",
      summary:
        "Experienced software engineer with 5+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Passionate about building scalable applications and leading high-performing teams.",
    },
    experiences: [
      {
        id: "exp1",
        company: "Tech Corp",
        position: "Senior Software Engineer",
        location: "San Francisco, CA",
        startDate: "2022-01",
        endDate: "",
        current: true,
        description: [
          "Led development of microservices architecture serving 1M+ users",
          "Improved application performance by 40% through optimization",
          "Mentored 3 junior developers and conducted code reviews",
        ],
      },
      {
        id: "exp2",
        company: "StartupXYZ",
        position: "Full Stack Developer",
        location: "Remote",
        startDate: "2020-06",
        endDate: "2021-12",
        current: false,
        description: [
          "Built responsive web applications using React and Node.js",
          "Implemented CI/CD pipelines reducing deployment time by 60%",
          "Collaborated with design team to improve user experience",
        ],
      },
    ],
    education: [
      {
        id: "edu1",
        institution: "University of California, Berkeley",
        degree: "Bachelor of Science",
        field: "Computer Science",
        location: "Berkeley, CA",
        startDate: "2016-08",
        endDate: "2020-05",
        gpa: "3.8",
        honors: "Magna Cum Laude",
      },
    ],
    skills: [
      {
        id: "skill1",
        category: "Programming Languages",
        skills: ["JavaScript", "TypeScript", "Python", "Java", "Go"],
      },
      {
        id: "skill2",
        category: "Frontend",
        skills: ["React", "Next.js", "Vue.js", "HTML5", "CSS3", "Tailwind CSS"],
      },
      {
        id: "skill3",
        category: "Backend",
        skills: ["Node.js", "Express", "Django", "PostgreSQL", "MongoDB"],
      },
      {
        id: "skill4",
        category: "Tools & Technologies",
        skills: ["Docker", "AWS", "Git", "Jenkins", "Kubernetes"],
      },
    ],
    projects: [
      {
        id: "proj1",
        name: "E-commerce Platform",
        description:
          "Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard",
        technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
        link: "https://ecommerce-demo.com",
        github: "https://github.com/johndoe/ecommerce",
      },
      {
        id: "proj2",
        name: "Task Management App",
        description: "Collaborative task management application with real-time updates and team collaboration features",
        technologies: ["Next.js", "Socket.io", "MongoDB", "Tailwind CSS"],
        github: "https://github.com/johndoe/taskmanager",
      },
    ],
    sectionOrder: ["personalInfo", "experiences", "education", "skills", "projects"],
  })

  // Auto-save functionality
  useEffect(() => {
    const saveTimer = setTimeout(() => {
      localStorage.setItem("resumeData", JSON.stringify(resumeData))
      localStorage.setItem("selectedTheme", JSON.stringify(selectedTheme))
    }, 1000)

    return () => clearTimeout(saveTimer)
  }, [resumeData, selectedTheme])

  // Load saved data
  useEffect(() => {
    const savedData = localStorage.getItem("resumeData")
    const savedTheme = localStorage.getItem("selectedTheme")

    if (savedData) {
      setResumeData(JSON.parse(savedData))
    }
    if (savedTheme) {
      setSelectedTheme(JSON.parse(savedTheme))
    }
  }, [])

  const updatePersonalInfo = (field: keyof PersonalInfo, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }))
  }

  const addExperience = () => {
    const newExp: Experience = {
      id: `exp${Date.now()}`,
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: [""],
    }
    setResumeData((prev) => ({
      ...prev,
      experiences: [...prev.experiences, newExp],
    }))
  }

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    setResumeData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    }))
  }

  const deleteExperience = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((exp) => exp.id !== id),
    }))
  }

  const addEducation = () => {
    const newEdu: Education = {
      id: `edu${Date.now()}`,
      institution: "",
      degree: "",
      field: "",
      location: "",
      startDate: "",
      endDate: "",
    }
    setResumeData((prev) => ({
      ...prev,
      education: [...prev.education, newEdu],
    }))
  }

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    }))
  }

  const deleteEducation = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }))
  }

  const addSkillCategory = () => {
    const newSkill: Skill = {
      id: `skill${Date.now()}`,
      category: "",
      skills: [""],
    }
    setResumeData((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkill],
    }))
  }

  const updateSkillCategory = (id: string, category: string) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.map((skill) => (skill.id === id ? { ...skill, category } : skill)),
    }))
  }

  const updateSkills = (id: string, skills: string[]) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.map((skill) => (skill.id === id ? { ...skill, skills } : skill)),
    }))
  }

  const deleteSkillCategory = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill.id !== id),
    }))
  }

  const addProject = () => {
    const newProject: Project = {
      id: `proj${Date.now()}`,
      name: "",
      description: "",
      technologies: [],
      link: "",
      github: "",
    }
    setResumeData((prev) => ({
      ...prev,
      projects: [...prev.projects, newProject],
    }))
  }

  const updateProject = (id: string, field: keyof Project, value: any) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.map((proj) => (proj.id === id ? { ...proj, [field]: value } : proj)),
    }))
  }

  const deleteProject = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.filter((proj) => proj.id !== id),
    }))
  }

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const items = Array.from(resumeData.sectionOrder)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setResumeData((prev) => ({
      ...prev,
      sectionOrder: items,
    }))
  }

  const exportToPDF = () => {
    window.print()
  }

  const formatDate = (dateStr: string) => {
    if (!dateStr) return ""
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short" })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">Resume Builder</h1>
            <Badge variant="secondary">Auto-saved</Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => setActiveTab("theme")}>
              <Palette className="w-4 h-4 mr-2" />
              Themes
            </Button>
            <Button variant="outline" size="sm" onClick={exportToPDF}>
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar - Editor */}
        <div className="w-1/2 bg-white border-r border-gray-200 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-3 m-4">
              <TabsTrigger value="edit" className="flex items-center">
                <Edit3 className="w-4 h-4 mr-2" />
                Edit
              </TabsTrigger>
              <TabsTrigger value="sections" className="flex items-center">
                <Layout className="w-4 h-4 mr-2" />
                Sections
              </TabsTrigger>
              <TabsTrigger value="theme" className="flex items-center">
                <Palette className="w-4 h-4 mr-2" />
                Theme
              </TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-hidden">
              <TabsContent value="edit" className="h-full m-0">
                <ScrollArea className="h-full px-4">
                  <div className="space-y-6 pb-6">
                    {/* Personal Information */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <User className="w-5 h-5 mr-2" />
                          Personal Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input
                              id="fullName"
                              value={resumeData.personalInfo.fullName}
                              onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="title">Professional Title</Label>
                            <Input
                              id="title"
                              value={resumeData.personalInfo.title}
                              onChange={(e) => updatePersonalInfo("title", e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              value={resumeData.personalInfo.email}
                              onChange={(e) => updatePersonalInfo("email", e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                              id="phone"
                              value={resumeData.personalInfo.phone}
                              onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="location">Location</Label>
                            <Input
                              id="location"
                              value={resumeData.personalInfo.location}
                              onChange={(e) => updatePersonalInfo("location", e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="website">Website</Label>
                            <Input
                              id="website"
                              value={resumeData.personalInfo.website}
                              onChange={(e) => updatePersonalInfo("website", e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="linkedin">LinkedIn</Label>
                            <Input
                              id="linkedin"
                              value={resumeData.personalInfo.linkedin}
                              onChange={(e) => updatePersonalInfo("linkedin", e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="github">GitHub</Label>
                            <Input
                              id="github"
                              value={resumeData.personalInfo.github}
                              onChange={(e) => updatePersonalInfo("github", e.target.value)}
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="summary">Professional Summary</Label>
                          <Textarea
                            id="summary"
                            rows={4}
                            value={resumeData.personalInfo.summary}
                            onChange={(e) => updatePersonalInfo("summary", e.target.value)}
                          />
                        </div>
                      </CardContent>
                    </Card>

                    {/* Experience */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Briefcase className="w-5 h-5 mr-2" />
                            Experience
                          </div>
                          <Button size="sm" onClick={addExperience}>
                            <Plus className="w-4 h-4 mr-2" />
                            Add
                          </Button>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {resumeData.experiences.map((exp, index) => (
                          <div key={exp.id} className="border rounded-lg p-4 space-y-4">
                            <div className="flex justify-between items-start">
                              <h4 className="font-medium">Experience {index + 1}</h4>
                              <Button size="sm" variant="ghost" onClick={() => deleteExperience(exp.id)}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Company</Label>
                                <Input
                                  value={exp.company}
                                  onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                                />
                              </div>
                              <div>
                                <Label>Position</Label>
                                <Input
                                  value={exp.position}
                                  onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                              <div>
                                <Label>Location</Label>
                                <Input
                                  value={exp.location}
                                  onChange={(e) => updateExperience(exp.id, "location", e.target.value)}
                                />
                              </div>
                              <div>
                                <Label>Start Date</Label>
                                <Input
                                  type="month"
                                  value={exp.startDate}
                                  onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                                />
                              </div>
                              <div>
                                <Label>End Date</Label>
                                <Input
                                  type="month"
                                  value={exp.endDate}
                                  disabled={exp.current}
                                  onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id={`current-${exp.id}`}
                                checked={exp.current}
                                onChange={(e) => updateExperience(exp.id, "current", e.target.checked)}
                              />
                              <Label htmlFor={`current-${exp.id}`}>Currently working here</Label>
                            </div>
                            <div>
                              <Label>Description</Label>
                              <Textarea
                                rows={3}
                                value={exp.description.join("\n")}
                                onChange={(e) => updateExperience(exp.id, "description", e.target.value.split("\n"))}
                                placeholder="• Achievement or responsibility&#10;• Another achievement&#10;• Third achievement"
                              />
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    {/* Education */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <div className="flex items-center">
                            <GraduationCap className="w-5 h-5 mr-2" />
                            Education
                          </div>
                          <Button size="sm" onClick={addEducation}>
                            <Plus className="w-4 h-4 mr-2" />
                            Add
                          </Button>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {resumeData.education.map((edu, index) => (
                          <div key={edu.id} className="border rounded-lg p-4 space-y-4">
                            <div className="flex justify-between items-start">
                              <h4 className="font-medium">Education {index + 1}</h4>
                              <Button size="sm" variant="ghost" onClick={() => deleteEducation(edu.id)}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Institution</Label>
                                <Input
                                  value={edu.institution}
                                  onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                                />
                              </div>
                              <div>
                                <Label>Degree</Label>
                                <Input
                                  value={edu.degree}
                                  onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Field of Study</Label>
                                <Input
                                  value={edu.field}
                                  onChange={(e) => updateEducation(edu.id, "field", e.target.value)}
                                />
                              </div>
                              <div>
                                <Label>Location</Label>
                                <Input
                                  value={edu.location}
                                  onChange={(e) => updateEducation(edu.id, "location", e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-4 gap-4">
                              <div>
                                <Label>Start Date</Label>
                                <Input
                                  type="month"
                                  value={edu.startDate}
                                  onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
                                />
                              </div>
                              <div>
                                <Label>End Date</Label>
                                <Input
                                  type="month"
                                  value={edu.endDate}
                                  onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}
                                />
                              </div>
                              <div>
                                <Label>GPA (Optional)</Label>
                                <Input
                                  value={edu.gpa || ""}
                                  onChange={(e) => updateEducation(edu.id, "gpa", e.target.value)}
                                />
                              </div>
                              <div>
                                <Label>Honors (Optional)</Label>
                                <Input
                                  value={edu.honors || ""}
                                  onChange={(e) => updateEducation(edu.id, "honors", e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    {/* Skills */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Code className="w-5 h-5 mr-2" />
                            Skills
                          </div>
                          <Button size="sm" onClick={addSkillCategory}>
                            <Plus className="w-4 h-4 mr-2" />
                            Add Category
                          </Button>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {resumeData.skills.map((skillGroup, index) => (
                          <div key={skillGroup.id} className="border rounded-lg p-4 space-y-4">
                            <div className="flex justify-between items-start">
                              <h4 className="font-medium">Skill Category {index + 1}</h4>
                              <Button size="sm" variant="ghost" onClick={() => deleteSkillCategory(skillGroup.id)}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                            <div>
                              <Label>Category Name</Label>
                              <Input
                                value={skillGroup.category}
                                onChange={(e) => updateSkillCategory(skillGroup.id, e.target.value)}
                                placeholder="e.g., Programming Languages"
                              />
                            </div>
                            <div>
                              <Label>Skills (comma-separated)</Label>
                              <Input
                                value={skillGroup.skills.join(", ")}
                                onChange={(e) =>
                                  updateSkills(
                                    skillGroup.id,
                                    e.target.value.split(",").map((s) => s.trim()),
                                  )
                                }
                                placeholder="JavaScript, Python, React, Node.js"
                              />
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    {/* Projects */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Award className="w-5 h-5 mr-2" />
                            Projects
                          </div>
                          <Button size="sm" onClick={addProject}>
                            <Plus className="w-4 h-4 mr-2" />
                            Add Project
                          </Button>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {resumeData.projects.map((project, index) => (
                          <div key={project.id} className="border rounded-lg p-4 space-y-4">
                            <div className="flex justify-between items-start">
                              <h4 className="font-medium">Project {index + 1}</h4>
                              <Button size="sm" variant="ghost" onClick={() => deleteProject(project.id)}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                            <div>
                              <Label>Project Name</Label>
                              <Input
                                value={project.name}
                                onChange={(e) => updateProject(project.id, "name", e.target.value)}
                              />
                            </div>
                            <div>
                              <Label>Description</Label>
                              <Textarea
                                rows={3}
                                value={project.description}
                                onChange={(e) => updateProject(project.id, "description", e.target.value)}
                              />
                            </div>
                            <div>
                              <Label>Technologies (comma-separated)</Label>
                              <Input
                                value={project.technologies.join(", ")}
                                onChange={(e) =>
                                  updateProject(
                                    project.id,
                                    "technologies",
                                    e.target.value.split(",").map((s) => s.trim()),
                                  )
                                }
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Live Link (Optional)</Label>
                                <Input
                                  value={project.link || ""}
                                  onChange={(e) => updateProject(project.id, "link", e.target.value)}
                                />
                              </div>
                              <div>
                                <Label>GitHub Link (Optional)</Label>
                                <Input
                                  value={project.github || ""}
                                  onChange={(e) => updateProject(project.id, "github", e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="sections" className="h-full m-0">
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-4">Reorder Sections</h3>
                  <p className="text-sm text-gray-600 mb-6">Drag and drop to reorder resume sections</p>

                  <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="sections">
                      {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                          {resumeData.sectionOrder.map((sectionId, index) => {
                            const sectionNames = {
                              personalInfo: "Personal Information",
                              experiences: "Experience",
                              education: "Education",
                              skills: "Skills",
                              projects: "Projects",
                            }

                            return (
                              <Draggable key={sectionId} draggableId={sectionId} index={index}>
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={`flex items-center p-3 bg-white border rounded-lg ${
                                      snapshot.isDragging ? "shadow-lg" : "shadow-sm"
                                    }`}
                                  >
                                    <GripVertical className="w-5 h-5 text-gray-400 mr-3" />
                                    <span className="font-medium">
                                      {sectionNames[sectionId as keyof typeof sectionNames]}
                                    </span>
                                  </div>
                                )}
                              </Draggable>
                            )
                          })}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                </div>
              </TabsContent>

              <TabsContent value="theme" className="h-full m-0">
                <div className="p-4 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Choose Theme</h3>
                    <div className="grid grid-cols-1 gap-4">
                      {themes.map((theme) => (
                        <div
                          key={theme.name}
                          className={`p-4 border rounded-lg cursor-pointer transition-all ${
                            selectedTheme.name === theme.name
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => setSelectedTheme(theme)}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">{theme.name}</h4>
                              <p className="text-sm text-gray-600" style={{ fontFamily: theme.fontFamily }}>
                                {theme.fontFamily}
                              </p>
                            </div>
                            <div className="flex space-x-2">
                              <div
                                className="w-6 h-6 rounded-full border"
                                style={{ backgroundColor: theme.primaryColor }}
                              />
                              <div
                                className="w-6 h-6 rounded-full border"
                                style={{ backgroundColor: theme.secondaryColor }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Preview */}
        <div className="w-1/2 bg-gray-100 overflow-auto">
          <div className="p-8">
            <div
              className="bg-white shadow-lg mx-auto max-w-4xl min-h-[11in] p-12 print:shadow-none print:max-w-none print:p-0"
              style={{
                fontFamily: selectedTheme.fontFamily,
                color: selectedTheme.textColor,
                backgroundColor: selectedTheme.backgroundColor,
              }}
            >
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-2" style={{ color: selectedTheme.primaryColor }}>
                  {resumeData.personalInfo.fullName}
                </h1>
                <h2 className="text-xl mb-4" style={{ color: selectedTheme.secondaryColor }}>
                  {resumeData.personalInfo.title}
                </h2>

                <div className="flex flex-wrap justify-center gap-4 text-sm">
                  {resumeData.personalInfo.email && (
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-1" />
                      {resumeData.personalInfo.email}
                    </div>
                  )}
                  {resumeData.personalInfo.phone && (
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-1" />
                      {resumeData.personalInfo.phone}
                    </div>
                  )}
                  {resumeData.personalInfo.location && (
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {resumeData.personalInfo.location}
                    </div>
                  )}
                  {resumeData.personalInfo.website && (
                    <div className="flex items-center">
                      <Globe className="w-4 h-4 mr-1" />
                      {resumeData.personalInfo.website}
                    </div>
                  )}
                  {resumeData.personalInfo.linkedin && (
                    <div className="flex items-center">
                      <Linkedin className="w-4 h-4 mr-1" />
                      {resumeData.personalInfo.linkedin}
                    </div>
                  )}
                  {resumeData.personalInfo.github && (
                    <div className="flex items-center">
                      <Github className="w-4 h-4 mr-1" />
                      {resumeData.personalInfo.github}
                    </div>
                  )}
                </div>
              </div>

              {/* Summary */}
              {resumeData.personalInfo.summary && (
                <div className="mb-8">
                  <h3
                    className="text-lg font-bold mb-3 pb-1 border-b-2"
                    style={{
                      color: selectedTheme.primaryColor,
                      borderColor: selectedTheme.primaryColor,
                    }}
                  >
                    PROFESSIONAL SUMMARY
                  </h3>
                  <p className="text-sm leading-relaxed">{resumeData.personalInfo.summary}</p>
                </div>
              )}

              {/* Dynamic Sections */}
              {resumeData.sectionOrder.map((sectionId) => {
                switch (sectionId) {
                  case "experiences":
                    return (
                      resumeData.experiences.length > 0 && (
                        <div key={sectionId} className="mb-8">
                          <h3
                            className="text-lg font-bold mb-4 pb-1 border-b-2"
                            style={{
                              color: selectedTheme.primaryColor,
                              borderColor: selectedTheme.primaryColor,
                            }}
                          >
                            PROFESSIONAL EXPERIENCE
                          </h3>
                          <div className="space-y-6">
                            {resumeData.experiences.map((exp) => (
                              <div key={exp.id}>
                                <div className="flex justify-between items-start mb-2">
                                  <div>
                                    <h4 className="font-bold text-base">{exp.position}</h4>
                                    <h5 className="font-semibold" style={{ color: selectedTheme.secondaryColor }}>
                                      {exp.company}
                                    </h5>
                                  </div>
                                  <div className="text-right text-sm">
                                    <div>{exp.location}</div>
                                    <div>
                                      {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                                    </div>
                                  </div>
                                </div>
                                <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                                  {exp.description.map((desc, idx) => (
                                    <li key={idx}>{desc}</li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    )

                  case "education":
                    return (
                      resumeData.education.length > 0 && (
                        <div key={sectionId} className="mb-8">
                          <h3
                            className="text-lg font-bold mb-4 pb-1 border-b-2"
                            style={{
                              color: selectedTheme.primaryColor,
                              borderColor: selectedTheme.primaryColor,
                            }}
                          >
                            EDUCATION
                          </h3>
                          <div className="space-y-4">
                            {resumeData.education.map((edu) => (
                              <div key={edu.id}>
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h4 className="font-bold">
                                      {edu.degree} in {edu.field}
                                    </h4>
                                    <h5 className="font-semibold" style={{ color: selectedTheme.secondaryColor }}>
                                      {edu.institution}
                                    </h5>
                                    {(edu.gpa || edu.honors) && (
                                      <div className="text-sm">
                                        {edu.gpa && `GPA: ${edu.gpa}`}
                                        {edu.gpa && edu.honors && " • "}
                                        {edu.honors}
                                      </div>
                                    )}
                                  </div>
                                  <div className="text-right text-sm">
                                    <div>{edu.location}</div>
                                    <div>
                                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    )

                  case "skills":
                    return (
                      resumeData.skills.length > 0 && (
                        <div key={sectionId} className="mb-8">
                          <h3
                            className="text-lg font-bold mb-4 pb-1 border-b-2"
                            style={{
                              color: selectedTheme.primaryColor,
                              borderColor: selectedTheme.primaryColor,
                            }}
                          >
                            TECHNICAL SKILLS
                          </h3>
                          <div className="space-y-3">
                            {resumeData.skills.map((skillGroup) => (
                              <div key={skillGroup.id} className="flex">
                                <div
                                  className="font-semibold w-32 flex-shrink-0"
                                  style={{ color: selectedTheme.secondaryColor }}
                                >
                                  {skillGroup.category}:
                                </div>
                                <div className="text-sm">{skillGroup.skills.join(" • ")}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    )

                  case "projects":
                    return (
                      resumeData.projects.length > 0 && (
                        <div key={sectionId} className="mb-8">
                          <h3
                            className="text-lg font-bold mb-4 pb-1 border-b-2"
                            style={{
                              color: selectedTheme.primaryColor,
                              borderColor: selectedTheme.primaryColor,
                            }}
                          >
                            PROJECTS
                          </h3>
                          <div className="space-y-4">
                            {resumeData.projects.map((project) => (
                              <div key={project.id}>
                                <div className="flex justify-between items-start mb-1">
                                  <h4 className="font-bold">{project.name}</h4>
                                  <div className="text-sm space-x-2">
                                    {project.link && <span>Live: {project.link}</span>}
                                    {project.github && <span>GitHub: {project.github}</span>}
                                  </div>
                                </div>
                                <p className="text-sm mb-2">{project.description}</p>
                                <div className="text-sm">
                                  <span className="font-semibold" style={{ color: selectedTheme.secondaryColor }}>
                                    Technologies:
                                  </span>{" "}
                                  {project.technologies.join(" • ")}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    )

                  default:
                    return null
                }
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print\\:shadow-none,
          .print\\:shadow-none * {
            visibility: visible;
          }
          .print\\:shadow-none {
            position: absolute;
            left: 0;
            top: 0;
            width: 100% !important;
            max-width: none !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          @page {
            margin: 0.5in;
          }
        }
      `}</style>
    </div>
  )
}
