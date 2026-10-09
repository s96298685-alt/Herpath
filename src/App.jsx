import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  Bell,
  BookOpen,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  Compass,
  Heart,
  HelpCircle,
  Home,
  MessageSquareText,
  Search,
  Settings,
  Sparkles,
  Star,
  Target,
  Users
} from 'lucide-react'
import './App.css'

const navItems = [
  { id: 'Home', label: 'Home', icon: Home },
  { id: 'My Network', label: 'My Network', icon: Users },
  { id: 'Career Navigator', label: 'Career Navigator', icon: Compass },
  { id: 'Mentorship', label: 'Mentorship', icon: Users },
  { id: 'Learning Resources', label: 'Learning Resources', icon: BookOpen },
  { id: 'Opportunities', label: 'Opportunities', icon: BriefcaseBusiness },
  { id: 'My Profile', label: 'My Profile', icon: Target }
]

const educationOptions = [
  'School student',
  'Undergraduate student',
  'Graduate',
  'Postgraduate',
  'Working professional',
  'Returning to work after a career break'
]

const interestsOptions = [
  'Technology and Software',
  'Data Science and AI',
  'Business and Management',
  'Design and Creativity',
  'Healthcare',
  'Finance',
  'Education',
  'Entrepreneurship',
  'Research',
  'Other'
]

const skillOptions = ['Communication', 'Programming', 'Problem-solving', 'Design', 'Data analysis', 'Leadership', 'Marketing', 'Research']
const goalOptions = ['Find my first job', 'Get an internship', 'Change my career', 'Improve my skills', 'Return to work', 'Start a business', 'Explore possible careers']
const timeOptions = ['2-4 hours/week', '5-8 hours/week', '9+ hours/week']

const defaultPosts = [
  {
    id: 1,
    author: 'Riya Sharma',
    role: 'Software Engineer @ Aurora Labs',
    initials: 'RS',
    category: 'Achievement',
    text: 'Finished a 4-week mock interview sprint and finally cracked a behavioral interview round. My biggest takeaway: storytelling with clear examples really changes how teams respond. #CareerGrowth',
    likes: 184,
    liked: false,
    comments: [{ id: 11, author: 'Ananya', text: 'This is so helpful for final-year students.' }],
    time: '2h ago'
  },
  {
    id: 2,
    author: 'Meera Nair',
    role: 'Senior Product Designer',
    initials: 'MN',
    category: 'Learning',
    text: 'If you are building a portfolio, start with 3 strong case studies instead of 10 average ones. Document the problem, your process, and measurable impact. That clarity makes hiring teams trust your work.',
    likes: 246,
    liked: true,
    comments: [{ id: 21, author: 'Sana', text: 'I am updating my portfolio this week.' }],
    time: '5h ago'
  },
  {
    id: 3,
    author: 'Aditi Verma',
    role: 'Founder @ Bloom Studio',
    initials: 'AV',
    category: 'Question',
    text: 'Starting a business while balancing a full-time role taught me this: validate before you scale. I spoke to 25 potential customers before building the MVP, and it saved us months of guesswork.',
    likes: 132,
    liked: false,
    comments: [{ id: 31, author: 'Nisha', text: 'This is such a practical lesson for founders.' }],
    time: '1d ago'
  },
  {
    id: 4,
    author: 'Priya Kapoor',
    role: 'Career Return Coach',
    initials: 'PK',
    category: 'Support',
    text: 'Returning to work after a break can feel daunting, but it is a strength story. Rebuild confidence through small wins, upskilling, and networking with people who encourage you to grow. ',
    likes: 201,
    liked: false,
    comments: [{ id: 41, author: 'Nandini', text: 'Thank you for normalizing this journey.' }],
    time: '2d ago'
  }
]

const mentorProfiles = [
  {
    id: 1,
    name: 'Neha Kulkarni',
    title: 'Senior Software Engineer',
    industry: 'Software Engineering',
    stage: 'Mid-career',
    expertise: ['Frontend', 'System design'],
    intro: 'Helps women transition into product engineering with structured interview prep and portfolio feedback.',
    badge: 'Demo profile'
  },
  {
    id: 2,
    name: 'Shreya Menon',
    title: 'Lead Data Scientist',
    industry: 'Data Science',
    stage: 'Senior',
    expertise: ['AI', 'Analytics'],
    intro: 'Supports early-career professionals in building practical machine learning portfolios and analytics projects.',
    badge: 'Demo profile'
  },
  {
    id: 3,
    name: 'Ira Joshi',
    title: 'Senior UX Researcher',
    industry: 'UI/UX Design',
    stage: 'Senior',
    expertise: ['User research', 'Figma'],
    intro: 'Guides aspiring designers on portfolio storytelling, user journeys, and real-world product thinking.',
    badge: 'Demo profile'
  },
  {
    id: 4,
    name: 'Rhea Kapoor',
    title: 'Founder & Operator',
    industry: 'Entrepreneurship',
    stage: 'Founder',
    expertise: ['Startup strategy', 'Pitching'],
    intro: 'Helps founders validate ideas, pitch to communities, and turn early experiments into traction.',
    badge: 'Demo profile'
  },
  {
    id: 5,
    name: 'Maya Iyer',
    title: 'Financial Analyst',
    industry: 'Finance',
    stage: 'Mid-career',
    expertise: ['Finance basics', 'Career switch'],
    intro: 'Advises women exploring finance and analytics careers with roadmap guidance and networking support.',
    badge: 'Demo profile'
  },
  {
    id: 6,
    name: 'Anu Sethi',
    title: 'Growth Marketing Lead',
    industry: 'Marketing',
    stage: 'Mid-career',
    expertise: ['Brand strategy', 'Campaign planning'],
    intro: 'Specializes in helping professionals move from execution to strategic marketing leadership roles.',
    badge: 'Demo profile'
  },
  {
    id: 7,
    name: 'Ayesha Qureshi',
    title: 'People & Culture Leader',
    industry: 'Leadership',
    stage: 'Senior',
    expertise: ['Leadership', 'Mentoring'],
    intro: 'Supports women in building leadership presence, managing transitions, and leading cross-functional teams.',
    badge: 'Demo profile'
  }
]

const resourceLibrary = [
  { id: 1, title: 'FreeCodeCamp', category: 'Programming', level: 'Beginner', time: '6h', description: 'A free, beginner-friendly curriculum covering HTML, CSS, JavaScript, and web development fundamentals.', link: 'https://www.freecodecamp.org/', suggested: false },
  { id: 2, title: 'CS50x', category: 'Programming', level: 'Beginner', time: '10h', description: 'An accessible introduction to computer science principles and programming using Python and C.', link: 'https://cs50.harvard.edu/x/2024/', suggested: false },
  { id: 3, title: 'Google Data Analytics Certificate', category: 'Data and AI', level: 'Beginner', time: '8h/week', description: 'A structured learning path on spreadsheets, SQL, and data analysis practices.', link: 'https://grow.google/data-analytics/', suggested: true },
  { id: 4, title: 'Figma Learn', category: 'Design', level: 'Beginner', time: '4h', description: 'A public design toolkit with learning paths for interface design, prototyping, and design systems.', link: 'https://www.figma.com/learn/', suggested: false },
  { id: 5, title: 'Coursera: Communication Skills', category: 'Communication', level: 'Intermediate', time: '5h', description: 'Publicly available communication and presentation learning content to strengthen workplace confidence.', link: 'https://www.coursera.org/', suggested: true },
  { id: 6, title: 'The MBA Exchange', category: 'Business', level: 'Intermediate', time: '3h', description: 'Career-focused materials for business and entrepreneurship fundamentals.', link: 'https://www.mbaexchange.com/', suggested: true },
  { id: 7, title: 'Resume Worded', category: 'Resume Preparation', level: 'Beginner', time: '2h', description: 'A free resume review resource and examples for polishing application materials.', link: 'https://resumeworded.com/', suggested: true },
  { id: 8, title: 'Pramp', category: 'Interview Preparation', level: 'Intermediate', time: '4h', description: 'Practice technical and behavioral interview questions with peer mock interviews.', link: 'https://www.pramp.com/', suggested: true }
]

const opportunityData = [
  { id: 1, title: 'Women in Tech Internship Sprint', organization: 'CodeBridge Foundation', type: 'Internships', skills: ['Frontend', 'Communication'], eligibility: 'Open to undergraduate students and graduates', location: 'Remote', deadline: 'Demo only', bookmark: false },
  { id: 2, title: 'Entry-Level Product Analyst', organization: 'Northstar Labs', type: 'Entry-level jobs', skills: ['SQL', 'Data analysis'], eligibility: '0-2 years experience', location: 'Hybrid / Bengaluru', deadline: 'Demo only', bookmark: true },
  { id: 3, title: 'STEM Returnship Fellowship', organization: 'HerNext Careers', type: 'Return-to-work programs', skills: ['Problem-solving', 'Collaboration'], eligibility: 'Women re-entering the workforce after a career break', location: 'Remote', deadline: 'Demo only', bookmark: false },
  { id: 4, title: 'Diversity in Design Bootcamp', organization: 'Mosaic Studio', type: 'Training programs', skills: ['UX research', 'Figma'], eligibility: 'Aspiring designers seeking portfolio guidance', location: 'Hybrid / Delhi', deadline: 'Demo only', bookmark: false },
  { id: 5, title: 'Founders in Residence Grant', organization: 'SheBuild Collective', type: 'Entrepreneurship programs', skills: ['Pitching', 'Strategy'], eligibility: 'Early-stage founders in product or service businesses', location: 'Remote', deadline: 'Demo only', bookmark: false },
  { id: 6, title: 'STEM Scholarship for Women', organization: 'FuturePath NGO', type: 'Scholarships', skills: ['Research', 'Academic writing'], eligibility: 'School and college students in STEM fields', location: 'India', deadline: 'Demo only', bookmark: true }
]

const profileBase = {
  name: 'Ananya Mehta',
  education: 'Graduate student, B.Tech in Computer Science',
  interests: ['Technology and Software', 'Data Science and AI'],
  skills: ['Programming', 'Communication', 'Problem-solving', 'Data analysis'],
  goal: 'Find my first job',
  milestones: ['Completed: Intro to Python', 'Completed: Resume review workshop', 'In progress: Data structures practice'],
  savedResources: ['FreeCodeCamp', 'Figma Learn'],
  savedOpportunities: ['Women in Tech Internship Sprint'],
  posts: ['Mock interview prep experience', 'Portfolio case study tips']
}

const defaultRoadmap = {
  title: 'Software Development',
  summary: 'A strong fit for your profile based on your interest in tech and existing problem-solving skills.',
  reasons: [
    'You already show interest in technology and software.',
    'Your skills align well with programming and structured learning.',
    'This path supports early career entry with portfolio-based opportunities.'
  ],
  skillsOwned: ['Problem-solving', 'Communication'],
  skillsToDevelop: ['Programming', 'Git and GitHub', 'Data structures'],
  roadmap: [
    'Learn programming fundamentals.',
    'Practise data structures and algorithms.',
    'Learn Git and GitHub.',
    'Build portfolio projects.',
    'Prepare for technical interviews.',
    'Explore internships and entry-level roles.'
  ],
  projects: ['Build a personal portfolio website', 'Create a task manager app', 'Solve 30 DSA problems in 30 days'],
  resources: ['FreeCodeCamp', 'CS50x', 'Pramp'],
  mentors: ['Software Engineering mentor', 'Frontend mentor'],
  strategy: 'Apply to internship programs, contribute to open-source libraries, and tailor your resume to product and engineering roles.'
}

function getCareerRecommendations(formData) {
  const interestBias = formData.interests.length
  const base = [
    {
      title: 'Software Development',
      summary: 'Ideal for learners who enjoy problem-solving and building digital products.',
      reasons: [
        'Your interests include technology and software.',
        'Programming and structured learning fit your current strengths.',
        'This path offers clear internship and entry-level opportunities.'
      ],
      skillsOwned: formData.skills.filter((skill) => ['Problem-solving', 'Communication', 'Leadership'].includes(skill)),
      skillsToDevelop: ['Programming', 'Git and GitHub', 'Data structures', 'Debugging'],
      roadmap: [
        'Learn programming fundamentals.',
        'Practise data structures and algorithms.',
        'Learn Git and GitHub.',
        'Build portfolio projects.',
        'Prepare for technical interviews.',
        'Explore internships and entry-level roles.'
      ],
      projects: ['Build a personal portfolio website', 'Create a task tracker app', 'Contribute to a beginner-friendly open-source project'],
      resources: ['FreeCodeCamp', 'CS50x', 'Pramp'],
      mentors: ['Software Engineering', 'Frontend mentorship'],
      strategy: 'Apply for internships, build a portfolio, and target product engineering and startup roles.'
    },
    {
      title: 'UI/UX Design',
      summary: 'A creative career path suited to problem-solvers who enjoy user experience and visual storytelling.',
      reasons: [
        'Your interests include design and creativity.',
        'Communication and design-oriented thinking support this path.',
        'This route can be built through portfolio case studies and research methods.'
      ],
      skillsOwned: formData.skills.filter((skill) => ['Communication', 'Leadership', 'Design'].includes(skill)),
      skillsToDevelop: ['Figma', 'User research', 'Interaction design', 'Portfolio storytelling'],
      roadmap: [
        'Learn design fundamentals.',
        'Study user research and usability.',
        'Practise Figma or an equivalent design tool.',
        'Build case studies and portfolio projects.',
        'Request feedback from designers.',
        'Apply for internships and junior roles.'
      ],
      projects: ['Redesign a public service app', 'Create a mobile-first dashboard concept', 'Build a user research case study'],
      resources: ['Figma Learn', 'Coursera: Communication Skills', 'UX Planet'],
      mentors: ['UI/UX mentorship', 'Design research mentor'],
      strategy: 'Show your process with before-and-after design work and practice presenting your reasoning clearly.'
    },
    {
      title: 'Data Analysis',
      summary: 'A good match when you enjoy making sense of information and uncovering patterns.',
      reasons: [
        'Your interests include data science and AI.',
        'You already have analytical and communication strengths.',
        'This path is approachable through spreadsheets, SQL, and presentable dashboards.'
      ],
      skillsOwned: formData.skills.filter((skill) => ['Data analysis', 'Communication', 'Problem-solving'].includes(skill)),
      skillsToDevelop: ['Spreadsheets', 'SQL', 'Python basics', 'Data visualization'],
      roadmap: [
        'Learn spreadsheets.',
        'Learn SQL.',
        'Practise Python basics.',
        'Understand data visualization.',
        'Build portfolio projects.',
        'Prepare for entry-level opportunities.'
      ],
      projects: ['Analyze a public dataset', 'Create a sales dashboard', 'Build a mini BI project using SQL and charts'],
      resources: ['Google Data Analytics Certificate', 'Coursera', 'Pramp'],
      mentors: ['Data science mentor', 'Analytics mentor'],
      strategy: 'Create portfolio dashboards, get comfortable explaining insights, and target analyst roles in product, operations, and digital teams.'
    }
  ]

  if (formData.education === 'Returning to work after a career break') {
    base.unshift({
      title: 'Career Re-entry & Operations',
      summary: 'A flexible and practical route that builds confidence while re-entering the workforce.',
      reasons: [
        'This path is designed for structured re-entry and role transition.',
        'Your communication and leadership strengths can be repositioned in project and operations roles.',
        'It supports a gradual return with upskilling and networking.'
      ],
      skillsOwned: formData.skills.filter((skill) => ['Leadership', 'Communication', 'Problem-solving'].includes(skill)),
      skillsToDevelop: ['Project coordination', 'Portfolio refresh', 'Interview confidence'],
      roadmap: [
        'Refresh your resume and skills story.',
        'Identify transferable strengths from past experience.',
        'Join a return-to-work training cohort.',
        'Build a short portfolio of recent work samples.',
        'Practice interviews and networking conversations.',
        'Apply for re-entry programs and project roles.'
      ],
      projects: ['Career transition story deck', 'Re-entry skills plan', 'Mock interview practice'],
      resources: ['Resume Worded', 'Coursera: Communication Skills', 'HerNext Careers workshops'],
      mentors: ['Leadership mentor', 'Career return mentor'],
      strategy: 'Focus on transferable strengths, upskill in a clear area, and apply to re-entry programs with visible momentum.'
    })
  }

  return base
    .map((option, index) => ({
      ...option,
      match: Math.min(97, 70 + index * 6 + interestBias * 3),
      recommendedFor: formData.goal
    }))
    .sort((a, b) => b.match - a.match)
}

function App() {
  const [activeSection, setActiveSection] = useState('Home')
  const [feedFilter, setFeedFilter] = useState('All')
  const [draft, setDraft] = useState('')
  const [postType, setPostType] = useState('Achievement')
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem('herpath-posts')
    return saved ? JSON.parse(saved) : defaultPosts
  })
  const [commentInputs, setCommentInputs] = useState({})
  const [commentOpen, setCommentOpen] = useState(null)

  const [assessment, setAssessment] = useState({
    education: 'Undergraduate student',
    interests: ['Technology and Software'],
    skills: ['Communication', 'Programming'],
    goal: 'Find my first job',
    time: '5-8 hours/week'
  })
  const [recommendations, setRecommendations] = useState([])
  const [selectedCareer, setSelectedCareer] = useState(defaultRoadmap)
  const [assessmentComplete, setAssessmentComplete] = useState(false)
  const [roadmapProgress, setRoadmapProgress] = useState({})

  const [mentorFilter, setMentorFilter] = useState({ industry: 'All', stage: 'All', expertise: 'All' })
  const [mentorRequests, setMentorRequests] = useState([])

  const [resourceQuery, setResourceQuery] = useState('')
  const [resourceCategory, setResourceCategory] = useState('All')

  const [opportunityBookmarks, setOpportunityBookmarks] = useState(() => {
    const saved = localStorage.getItem('herpath-bookmarks')
    return saved ? JSON.parse(saved) : opportunityData.filter((item) => item.bookmark).map((item) => item.id)
  })

  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('herpath-profile')
    return saved ? JSON.parse(saved) : profileBase
  })

  useEffect(() => {
    localStorage.setItem('herpath-posts', JSON.stringify(posts))
  }, [posts])

  useEffect(() => {
    localStorage.setItem('herpath-bookmarks', JSON.stringify(opportunityBookmarks))
  }, [opportunityBookmarks])

  useEffect(() => {
    localStorage.setItem('herpath-profile', JSON.stringify(profile))
  }, [profile])

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesFilter = feedFilter === 'All' || post.category === feedFilter
      const textMatches = post.text.toLowerCase().includes(resourceQuery.toLowerCase())
      return matchesFilter && textMatches
    })
  }, [posts, feedFilter, resourceQuery])

  const mentorOptions = useMemo(() => {
    return mentorProfiles.filter((mentor) => {
      const industryMatch = mentorFilter.industry === 'All' || mentor.industry === mentorFilter.industry
      const stageMatch = mentorFilter.stage === 'All' || mentor.stage === mentorFilter.stage
      const expertiseMatch = mentorFilter.expertise === 'All' || mentor.expertise.includes(mentorFilter.expertise)
      return industryMatch && stageMatch && expertiseMatch
    })
  }, [mentorFilter])

  const resourceOptions = useMemo(() => {
    return resourceLibrary.filter((item) => {
      const categoryMatch = resourceCategory === 'All' || item.category === resourceCategory
      const queryMatch = item.title.toLowerCase().includes(resourceQuery.toLowerCase()) || item.description.toLowerCase().includes(resourceQuery.toLowerCase())
      return categoryMatch && queryMatch
    })
  }, [resourceCategory, resourceQuery])

  const toggleLike = (postId) => {
    setPosts((currentPosts) =>
      currentPosts.map((post) => {
        if (post.id !== postId) return post
        const liked = !post.liked
        return {
          ...post,
          liked,
          likes: liked ? post.likes + 1 : Math.max(post.likes - 1, 0)
        }
      })
    )
  }

  const publishPost = () => {
    if (!draft.trim()) return

    const newPost = {
      id: Date.now(),
      author: 'Ananya Mehta',
      role: 'Career Explorer',
      initials: 'AM',
      category: postType,
      text: draft.trim(),
      likes: 0,
      liked: false,
      comments: [],
      time: 'Just now'
    }

    setPosts((currentPosts) => [newPost, ...currentPosts])
    setDraft('')
    setPostType('Achievement')
    setActiveSection('Home')
  }

  const addComment = (postId) => {
    const text = (commentInputs[postId] || '').trim()
    if (!text) return

    setPosts((currentPosts) =>
      currentPosts.map((post) => {
        if (post.id !== postId) return post
        return {
          ...post,
          comments: [...post.comments, { id: Date.now(), author: 'You', text }]
        }
      })
    )
    setCommentInputs((current) => ({ ...current, [postId]: '' }))
    setCommentOpen(null)
  }

  const handleAssessmentSubmit = (event) => {
    event.preventDefault()
    const generated = getCareerRecommendations(assessment)
    setRecommendations(generated)
    setSelectedCareer(generated[0])
    setAssessmentComplete(true)
  }

  const handleRoadmapCheck = (stepIndex) => {
    setRoadmapProgress((current) => ({
      ...current,
      [selectedCareer.title]: {
        ...(current[selectedCareer.title] || {}),
        [stepIndex]: !current[selectedCareer.title]?.[stepIndex]
      }
    }))
  }

  const progressValue = selectedCareer?.roadmap ? Math.round(
    (Object.values(roadmapProgress[selectedCareer.title] || {}).filter(Boolean).length / selectedCareer.roadmap.length) * 100
  ) : 0

  const requestMentorship = (mentor) => {
    setMentorRequests((current) => [...current, mentor.name])
  }

  const toggleBookmark = (id) => {
    setOpportunityBookmarks((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    )
  }

  const handleProfileChange = (field, value) => {
    setProfile((current) => ({ ...current, [field]: value }))
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-block">
          <div className="brand-mark">H</div>
          <div>
            <div className="brand-name">HERPATH</div>
            <div className="brand-tag">Her Network. Her Growth.</div>
          </div>
        </div>

        <nav className="sidebar-nav" aria-label="Sidebar navigation">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveSection(id)}
              className={`nav-item ${activeSection === id ? 'active' : ''}`}
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button type="button" className="nav-item footer-link">
            <Settings size={18} />
            <span>Settings</span>
          </button>
          <button type="button" className="nav-item footer-link">
            <HelpCircle size={18} />
            <span>Help and Support</span>
          </button>
        </div>
      </aside>

      <main className="content">
        <header className="topbar">
          <div className="search-wrap">
            <Search size={16} />
            <input type="text" aria-label="Search" placeholder="Search across HERPATH" value={resourceQuery} onChange={(event) => setResourceQuery(event.target.value)} />
          </div>

          <div className="topbar-actions">
            <button type="button" className="icon-button" aria-label="Notifications">
              <Bell size={18} />
            </button>
            <button type="button" className="icon-button" aria-label="Messages">
              <MessageSquareText size={18} />
            </button>
            <div className="profile-pill">
              <div className="mini-avatar">AM</div>
              <div>
                <strong>Ananya</strong>
                <span>Career explorer</span>
              </div>
            </div>
            <button type="button" className="cta-button">
              <Sparkles size={16} />
              Build My Career Roadmap
            </button>
          </div>
        </header>

        <div className="page-shell">
          {activeSection === 'Home' && (
            <div className="page-grid">
              <section className="main-column">
                <div className="welcome-card">
                  <div>
                    <p className="eyebrow">Welcome back</p>
                    <h1>Welcome back, Ananya!</h1>
                    <p className="muted">Your next career milestone starts here.</p>
                  </div>
                  <div className="mini-progress-card">
                    <div className="mini-progress-header">
                      <span>Career goal</span>
                      <span className="goal-chip">Find my first job</span>
                    </div>
                    <div className="mini-progress-row">
                      <div>
                        <strong>Skills completed</strong>
                        <p>3/7</p>
                      </div>
                      <div>
                        <strong>Roadmap progress</strong>
                        <p>68%</p>
                      </div>
                    </div>
                    <div className="progress-bar">
                      <span style={{ width: '68%' }}></span>
                    </div>
                    <small>Next recommended action: Prepare for mock interviews.</small>
                  </div>
                </div>

                <div className="composer-card">
                  <div className="composer-header">
                    <div className="mini-avatar large">AM</div>
                    <div className="composer-actions">
                      <label>
                        <span>Share type</span>
                        <select value={postType} onChange={(event) => setPostType(event.target.value)}>
                          <option>Achievement</option>
                          <option>Question</option>
                          <option>Learning</option>
                        </select>
                      </label>
                    </div>
                  </div>
                  <textarea value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Share an achievement, ask a career question, or post a learning resource..." />
                  <div className="composer-footer">
                    <div className="tag-row">
                      <span>🎯 Growth mindset</span>
                      <span>💬 Career advice</span>
                    </div>
                    <button type="button" className="primary-button" onClick={publishPost}>Publish post</button>
                  </div>
                </div>

                <div className="feed-header card-inline">
                  <h2>Networking feed</h2>
                  <div className="filter-row">
                    <button type="button" className={feedFilter === 'All' ? 'filter-tag active' : 'filter-tag'} onClick={() => setFeedFilter('All')}>All</button>
                    <button type="button" className={feedFilter === 'Achievement' ? 'filter-tag active' : 'filter-tag'} onClick={() => setFeedFilter('Achievement')}>Achievement</button>
                    <button type="button" className={feedFilter === 'Question' ? 'filter-tag active' : 'filter-tag'} onClick={() => setFeedFilter('Question')}>Question</button>
                    <button type="button" className={feedFilter === 'Learning' ? 'filter-tag active' : 'filter-tag'} onClick={() => setFeedFilter('Learning')}>Learning</button>
                  </div>
                </div>

                {filteredPosts.length === 0 ? (
                  <div className="empty-box">No posts match this filter yet. Try a different topic or publish a new update.</div>
                ) : (
                  filteredPosts.map((post) => (
                    <article className="feed-card" key={post.id}>
                      <div className="feed-head">
                        <div className="avatar">{post.initials}</div>
                        <div>
                          <h3>{post.author}</h3>
                          <p>{post.role}</p>
                        </div>
                        <span className="time-badge">{post.time}</span>
                      </div>
                      <div className="post-category">{post.category}</div>
                      <p className="post-copy">{post.text}</p>
                      <div className="post-actions">
                        <button type="button" className={post.liked ? 'meta-button liked' : 'meta-button'} onClick={() => toggleLike(post.id)}>
                          <Heart size={16} fill={post.liked ? 'currentColor' : 'none'} />
                          {post.likes}
                        </button>
                        <button type="button" className="meta-button" onClick={() => setCommentOpen(commentOpen === post.id ? null : post.id)}>
                          <MessageSquareText size={16} />
                          {post.comments.length}
                        </button>
                        <button type="button" className="meta-button">
                          <ArrowRight size={16} />
                          Share
                        </button>
                      </div>

                      {commentOpen === post.id && (
                        <div className="comment-box">
                          <div className="comment-list">
                            {post.comments.map((comment) => (
                              <div key={comment.id} className="comment-item">
                                <strong>{comment.author}</strong>
                                <span>{comment.text}</span>
                              </div>
                            ))}
                          </div>
                          <div className="comment-form">
                            <input value={commentInputs[post.id] || ''} onChange={(event) => setCommentInputs((current) => ({ ...current, [post.id]: event.target.value }))} placeholder="Add a comment" />
                            <button type="button" onClick={() => addComment(post.id)}>Post</button>
                          </div>
                        </div>
                      )}
                    </article>
                  ))
                )}
              </section>

              <aside className="side-column">
                <div className="side-card">
                  <h3>Career pulse</h3>
                  <div className="stat-stack">
                    <div>
                      <span>Mentors reached</span>
                      <strong>12</strong>
                    </div>
                    <div>
                      <span>Learning streak</span>
                      <strong>8 days</strong>
                    </div>
                    <div>
                      <span>Saved roles</span>
                      <strong>14</strong>
                    </div>
                  </div>
                </div>

                <div className="side-card">
                  <h3>Suggested next steps</h3>
                  <ul className="check-list">
                    <li><Check size={14} /> Practice mock interviews</li>
                    <li><Check size={14} /> Update portfolio case study</li>
                    <li><Check size={14} /> Request mentorship</li>
                  </ul>
                </div>
              </aside>
            </div>
          )}

          {activeSection === 'Career Navigator' && (
            <section className="page-section">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">AI career navigator</p>
                  <h2>Build a career roadmap</h2>
                </div>
              </div>

              {!assessmentComplete ? (
                <form className="assessment-form" onSubmit={handleAssessmentSubmit}>
                  <div className="step-card">
                    <h3>Step 1: Education</h3>
                    <div className="options-grid">
                      {educationOptions.map((option) => (
                        <label key={option} className={assessment.education === option ? 'choice selected' : 'choice'}>
                          <input type="radio" name="education" checked={assessment.education === option} onChange={() => setAssessment((current) => ({ ...current, education: option }))} />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="step-card">
                    <h3>Step 2: Interests</h3>
                    <div className="options-grid">
                      {interestsOptions.map((option) => (
                        <label key={option} className={assessment.interests.includes(option) ? 'choice selected' : 'choice'}>
                          <input type="checkbox" checked={assessment.interests.includes(option)} onChange={() => {
                            setAssessment((current) => {
                              const next = current.interests.includes(option)
                                ? current.interests.filter((item) => item !== option)
                                : [...current.interests, option]
                              return { ...current, interests: next }
                            })
                          }} />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="step-card">
                    <h3>Step 3: Current skills</h3>
                    <div className="options-grid small-grid">
                      {skillOptions.map((skill) => (
                        <label key={skill} className={assessment.skills.includes(skill) ? 'choice selected' : 'choice'}>
                          <input type="checkbox" checked={assessment.skills.includes(skill)} onChange={() => {
                            setAssessment((current) => {
                              const next = current.skills.includes(skill)
                                ? current.skills.filter((item) => item !== skill)
                                : [...current.skills, skill]
                              return { ...current, skills: next }
                            })
                          }} />
                          <span>{skill}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="step-card">
                    <h3>Step 4: Career goal</h3>
                    <div className="options-grid">
                      {goalOptions.map((option) => (
                        <label key={option} className={assessment.goal === option ? 'choice selected' : 'choice'}>
                          <input type="radio" name="goal" checked={assessment.goal === option} onChange={() => setAssessment((current) => ({ ...current, goal: option }))} />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="step-card">
                    <h3>Step 5: Preferred learning time</h3>
                    <div className="options-grid">
                      {timeOptions.map((option) => (
                        <label key={option} className={assessment.time === option ? 'choice selected' : 'choice'}>
                          <input type="radio" name="time" checked={assessment.time === option} onChange={() => setAssessment((current) => ({ ...current, time: option }))} />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="primary-button">Generate recommendation</button>
                  </div>
                </form>
              ) : (
                <div className="roadmap-layout">
                  <div className="recommendation-grid">
                    {recommendations.map((recommendation) => (
                      <button
                        key={recommendation.title}
                        type="button"
                        className={selectedCareer.title === recommendation.title ? 'career-card selected' : 'career-card'}
                        onClick={() => setSelectedCareer(recommendation)}
                      >
                        <div className="career-topline">
                          <span>{recommendation.title}</span>
                          <span>{recommendation.match}% match</span>
                        </div>
                        <p>{recommendation.summary}</p>
                        <div className="career-meta-row">
                          <span>Why it fits</span>
                          <ChevronRight size={16} />
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="roadmap-panel">
                    <div className="roadmap-header">
                      <div>
                        <p className="eyebrow">Recommended path</p>
                        <h3>{selectedCareer.title}</h3>
                      </div>
                      <button type="button" className="secondary-button" onClick={() => {
                        setAssessmentComplete(false)
                        setRecommendations([])
                        setSelectedCareer(defaultRoadmap)
                        setRoadmapProgress({})
                      }}>Restart assessment</button>
                    </div>

                    <div className="roadmap-summary">
                      <p>{selectedCareer.summary}</p>
                    </div>

                    <div className="info-grid">
                      <div>
                        <h4>Why this may suit you</h4>
                        <ul>
                          {selectedCareer.reasons.map((reason) => (
                            <li key={reason}><Check size={14} /> {reason}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4>Relevant skills</h4>
                        <div className="chip-list">
                          {selectedCareer.skillsOwned.map((skill) => <span key={skill} className="chip soft">{skill}</span>)}
                        </div>
                        <h4>Skills to develop</h4>
                        <div className="chip-list">
                          {selectedCareer.skillsToDevelop.map((skill) => <span key={skill} className="chip accent">{skill}</span>)}
                        </div>
                      </div>
                    </div>

                    <div className="roadmap-checklist">
                      <div className="roadmap-topline">
                        <h4>Step-by-step roadmap</h4>
                        <span>{progressValue}% complete</span>
                      </div>
                      <div className="progress-bar large">
                        <span style={{ width: `${progressValue}%` }}></span>
                      </div>

                      <ul>
                        {selectedCareer.roadmap.map((step, index) => (
                          <li key={step} className={roadmapProgress[selectedCareer.title]?.[index] ? 'done' : ''}>
                            <label>
                              <input type="checkbox" checked={Boolean(roadmapProgress[selectedCareer.title]?.[index])} onChange={() => handleRoadmapCheck(index)} />
                              <span>{step}</span>
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bottom-grid">
                      <div>
                        <h4>Suggested projects</h4>
                        <ul className="bullet-list">
                          {selectedCareer.projects.map((project) => <li key={project}>{project}</li>)}
                        </ul>
                      </div>
                      <div>
                        <h4>Relevant learning resources</h4>
                        <ul className="bullet-list">
                          {selectedCareer.resources.map((resource) => <li key={resource}>{resource}</li>)}
                        </ul>
                      </div>
                    </div>

                    <div className="bottom-grid">
                      <div>
                        <h4>Recommended mentor categories</h4>
                        <ul className="bullet-list">
                          {selectedCareer.mentors.map((mentor) => <li key={mentor}>{mentor}</li>)}
                        </ul>
                      </div>
                      <div>
                        <h4>Job search strategy</h4>
                        <p>{selectedCareer.strategy}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </section>
          )}

          {activeSection === 'Mentorship' && (
            <section className="page-section">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">MentorBridge</p>
                  <h2>Find a mentor who matches your path</h2>
                </div>
              </div>

              <div className="filters-grid">
                <label>
                  <span>Industry</span>
                  <select value={mentorFilter.industry} onChange={(event) => setMentorFilter((current) => ({ ...current, industry: event.target.value }))}>
                    <option value="All">All</option>
                    {Array.from(new Set(mentorProfiles.map((mentor) => mentor.industry))).map((industry) => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                </label>
                <label>
                  <span>Career stage</span>
                  <select value={mentorFilter.stage} onChange={(event) => setMentorFilter((current) => ({ ...current, stage: event.target.value }))}>
                    <option value="All">All</option>
                    {Array.from(new Set(mentorProfiles.map((mentor) => mentor.stage))).map((stage) => (
                      <option key={stage} value={stage}>{stage}</option>
                    ))}
                  </select>
                </label>
                <label>
                  <span>Area of expertise</span>
                  <select value={mentorFilter.expertise} onChange={(event) => setMentorFilter((current) => ({ ...current, expertise: event.target.value }))}>
                    <option value="All">All</option>
                    {Array.from(new Set(mentorProfiles.flatMap((mentor) => mentor.expertise))).map((expertise) => (
                      <option key={expertise} value={expertise}>{expertise}</option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="mentor-grid">
                {mentorOptions.map((mentor) => (
                  <div key={mentor.id} className="mentor-card">
                    <div className="mentor-header">
                      <div className="avatar large purple">{mentor.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}</div>
                      <div>
                        <h3>{mentor.name}</h3>
                        <p>{mentor.title}</p>
                      </div>
                    </div>
                    <div className="badge-row"><span className="badge">{mentor.badge}</span></div>
                    <div className="mentor-meta">
                      <span>{mentor.industry}</span>
                      <span>{mentor.stage}</span>
                    </div>
                    <div className="chip-list">
                      {mentor.expertise.map((skill) => <span key={skill} className="chip soft">{skill}</span>)}
                    </div>
                    <p className="mentor-intro">{mentor.intro}</p>
                    <div className="mentor-actions">
                      <button type="button" className="secondary-button small">View Profile</button>
                      <button type="button" className="primary-button small" onClick={() => requestMentorship(mentor)}>Request Mentorship</button>
                    </div>
                  </div>
                ))}
              </div>

              {mentorRequests.length > 0 && (
                <div className="toast-wrap">
                  <div className="toast success">Mentorship request sent to {mentorRequests[mentorRequests.length - 1]}.</div>
                </div>
              )}
            </section>
          )}

          {activeSection === 'Learning Resources' && (
            <section className="page-section">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">Resource Hub</p>
                  <h2>Learning resources by career goal</h2>
                </div>
              </div>

              <div className="resource-controls">
                <div className="search-wrap wide">
                  <Search size={16} />
                  <input type="text" placeholder="Search resources or topics" value={resourceQuery} onChange={(event) => setResourceQuery(event.target.value)} />
                </div>
                <label className="select-field">
                  <span>Category</span>
                  <select value={resourceCategory} onChange={(event) => setResourceCategory(event.target.value)}>
                    <option value="All">All</option>
                    {Array.from(new Set(resourceLibrary.map((item) => item.category))).map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </label>
              </div>

              {resourceOptions.length === 0 ? (
                <div className="empty-box">No resources match your filter yet. Try another keyword.</div>
              ) : (
                <div className="resource-grid">
                  {resourceOptions.map((resource) => (
                    <div key={resource.id} className="resource-card">
                      <div className="resource-topline">
                        <span className="category-tag">{resource.category}</span>
                        {resource.suggested && <span className="suggested-tag">Suggested resource</span>}
                      </div>
                      <h3>{resource.title}</h3>
                      <div className="meta-line">
                        <span>{resource.level}</span>
                        <span>{resource.time}</span>
                      </div>
                      <p>{resource.description}</p>
                      <a href={resource.link} target="_blank" rel="noreferrer">Open Resource</a>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {activeSection === 'Opportunities' && (
            <section className="page-section">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">Opportunity Hub</p>
                  <h2>Explore sample career opportunities</h2>
                </div>
              </div>

              <div className="opportunity-grid">
                {opportunityData.map((opportunity) => (
                  <div key={opportunity.id} className="opportunity-card">
                    <div className="opportunity-head">
                      <div>
                        <span className="category-tag">{opportunity.type}</span>
                        <h3>{opportunity.title}</h3>
                        <p>{opportunity.organization}</p>
                      </div>
                      <button type="button" className={opportunityBookmarks.includes(opportunity.id) ? 'bookmark-button active' : 'bookmark-button'} onClick={() => toggleBookmark(opportunity.id)}>
                        <Star size={16} fill={opportunityBookmarks.includes(opportunity.id) ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                    <div className="meta-line">
                      <span>{opportunity.location}</span>
                      <span>{opportunity.deadline}</span>
                    </div>
                    <div className="chip-list">
                      {opportunity.skills.map((skill) => <span key={skill} className="chip soft">{skill}</span>)}
                    </div>
                    <p className="eligibility">{opportunity.eligibility}</p>
                    <button type="button" className="secondary-button full-width">View Details</button>
                  </div>
                ))}
              </div>

              <div className="info-note">Demo listings are illustrative. Verify eligibility, deadlines, and application details with the official provider.</div>
            </section>
          )}

          {activeSection === 'My Profile' && (
            <section className="page-section profile-layout">
              <div className="profile-card large-card">
                <div className="profile-summary">
                  <div className="profile-avatar">AM</div>
                  <div>
                    <h2>{profile.name}</h2>
                    <p>{profile.education}</p>
                  </div>
                </div>

                <div className="profile-fields">
                  <label>
                    <span>Name</span>
                    <input value={profile.name} onChange={(event) => handleProfileChange('name', event.target.value)} />
                  </label>
                  <label>
                    <span>Education</span>
                    <input value={profile.education} onChange={(event) => handleProfileChange('education', event.target.value)} />
                  </label>
                  <label>
                    <span>Career interest</span>
                    <input value={profile.interests.join(', ')} onChange={(event) => handleProfileChange('interests', event.target.value.split(',').map((item) => item.trim()).filter(Boolean))} />
                  </label>
                  <label>
                    <span>Career goal</span>
                    <input value={profile.goal} onChange={(event) => handleProfileChange('goal', event.target.value)} />
                  </label>
                </div>
              </div>

              <div className="profile-card">
                <h3>Skills</h3>
                <div className="chip-list">
                  {profile.skills.map((skill) => <span key={skill} className="chip accent">{skill}</span>)}
                </div>
              </div>

              <div className="profile-card">
                <h3>Completed learning milestones</h3>
                <ul className="bullet-list">
                  {profile.milestones.map((milestone) => <li key={milestone}>{milestone}</li>)}
                </ul>
              </div>

              <div className="profile-card">
                <h3>Saved resources</h3>
                <ul className="bullet-list">
                  {profile.savedResources.map((resource) => <li key={resource}>{resource}</li>)}
                </ul>
              </div>

              <div className="profile-card">
                <h3>Saved opportunities</h3>
                <ul className="bullet-list">
                  {profile.savedOpportunities.map((opportunity) => <li key={opportunity}>{opportunity}</li>)}
                </ul>
              </div>

              <div className="profile-card">
                <h3>Published posts</h3>
                <ul className="bullet-list">
                  {profile.posts.map((post) => <li key={post}>{post}</li>)}
                </ul>
              </div>
            </section>
          )}

          {activeSection !== 'Home' && activeSection !== 'Career Navigator' && activeSection !== 'Mentorship' && activeSection !== 'Learning Resources' && activeSection !== 'Opportunities' && activeSection !== 'My Profile' && activeSection === 'My Network' && (
            <section className="page-section empty-state-panel">
              <div className="empty-box">Your network is ready to grow. Start by connecting with mentors and collaborators.</div>
            </section>
          )}
        </div>
      </main>

      <div className="mobile-nav">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button key={id} type="button" className={activeSection === id ? 'mobile-item active' : 'mobile-item'} onClick={() => setActiveSection(id)}>
            <Icon size={18} />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default App
