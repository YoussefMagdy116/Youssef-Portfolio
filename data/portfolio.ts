/**
 * ============================================================
 *  PORTFOLIO DATA — SINGLE SOURCE OF TRUTH
 * ============================================================
 *  All personal information displayed on the site is edited
 *  here. Components read from this file only — avoid
 *  hardcoding names, roles, links or contact details elsewhere.
 * ============================================================
 */

export const profile = {
  name: "Youssef Mohamed Abdelmaksoud",
  shortName: "Youssef",
  title: "Junior Cybersecurity Analyst",
  location: "Giza, Egypt",
  tagline: "Monitoring. Investigating. Securing.",
  intro:
    "Cybersecurity analyst focused on security operations, threat detection, and incident response — backed by hands-on experience in networking, firewalls, and enterprise infrastructure.",
  summary:
    "Junior Cybersecurity Analyst with hands-on experience in threat detection, incident response, SIEM operations, networking, security device administration, vulnerability identification, security posture improvement, and enterprise IT environments. Actively developing cybersecurity expertise and committed to continuous learning.",
  focusAreas: [
    "Cybersecurity Operations",
    "Networking",
    "Infrastructure",
    "Security Monitoring",
  ],
};

/**
 * Path to the CV inside /public — replace the file to update the CV.
 * The base path is set at build time for GitHub Pages deploys.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const cvPath = `${basePath}/Youssef_CV.pdf`;

export const contact = {
  email: "Youssefmagdyy5@gmail.com",
  linkedin: "https://www.linkedin.com/in/youssef-magdy-7737b61a2",
  github: "https://github.com/YoussefMagdy116",
  location: "Giza, Egypt",
  message:
    "Interested in cybersecurity, SOC, networking, or security operations opportunities? Let’s connect.",
};

export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

/* ------------------------------------------------------------------ */
/* Experience — rendered as SOC event-log entries                      */
/* ------------------------------------------------------------------ */

export interface ExperienceItem {
  id: string;
  event: string;
  company: string;
  role: string;
  period: string;
  domain: string;
  summary: string;
  responsibilities: string[];
}

export const experiences: ExperienceItem[] = [
  {
    id: "vultara",
    event: "EVENT 01",
    company: "Vultara Inc.",
    role: "Junior Security Analyst",
    period: "Aug 2024 — Dec 2024",
    domain: "Security Operations",
    summary:
      "Security operations role centered on SIEM monitoring, incident support, and vulnerability handling.",
    responsibilities: [
      "Monitored security events and alerts using SIEM platforms.",
      "Assisted with incident response and investigations.",
      "Assisted with incident containment.",
      "Identified security vulnerabilities.",
      "Supported vulnerability remediation.",
      "Helped improve network and endpoint security controls.",
    ],
  },
  {
    id: "raya",
    event: "EVENT 02",
    company: "Raya Company",
    role: "Networking Intern",
    period: "Aug 2025 — Feb 2026",
    domain: "Networking & Automation",
    summary:
      "Networking internship combining CCNA-level operations, Python automation, and SOC exposure.",
    responsibilities: [
      "Applied CCNA-level networking and security concepts.",
      "Performed network automation using Python.",
      "Participated in SOC monitoring.",
      "Participated in incident response.",
      "Performed vulnerability assessment activities.",
      "Worked with CCNP Service Provider Core concepts.",
    ],
  },
  {
    id: "clash",
    event: "EVENT 03",
    company: "Clash – Esports",
    role: "Network & Systems Operations",
    period: "Jul 2025 — Apr 2026",
    domain: "Network Infrastructure",
    summary:
      "Ran the network and systems side of an esports venue — segmentation, firewalls, surveillance, and diskless gaming infrastructure.",
    responsibilities: [
      "Configured and managed VLANs and network segmentation.",
      "Administered Kerio Control and MikroTik firewalls.",
      "Managed Active Directory users, policies, and authentication.",
      "Installed and maintained Hikvision surveillance systems and NVRs.",
      "Deployed diskless systems using CCBoot.",
      "Established wireless branch connectivity using Ubiquiti PowerBeam AC.",
      "Configured and maintained network switches.",
      "Managed VLANs, switch ports, and configuration backups.",
      "Troubleshot hardware, software, networking, operating systems, applications, and drivers.",
    ],
  },
  {
    id: "moca",
    event: "EVENT 04",
    company: "Moca Spaces",
    role: "Freelance IT Support Engineer",
    period: "Freelance",
    domain: "IT Support & Systems",
    summary:
      "Freelance IT support covering access control, server administration, and endpoint reliability.",
    responsibilities: [
      "Implemented and configured access control systems.",
      "Managed email domain migration.",
      "Administered Windows Server environments.",
      "Maintained regular data backups.",
      "Diagnosed and resolved laptop hardware and software issues.",
      "Coordinated with Wi-Fi providers to troubleshoot connectivity issues.",
      "Supported business IT infrastructure and day-to-day operations.",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Skills — technology clusters + topology graph                       */
/* ------------------------------------------------------------------ */

export interface SkillCluster {
  id: string;
  title: string;
  items: string[];
}

export const skillClusters: SkillCluster[] = [
  {
    id: "secops",
    title: "Security Operations",
    items: [
      "SOC Operations",
      "Incident Handling",
      "Threat Detection",
      "Vulnerability Assessment",
      "Incident Investigation",
    ],
  },
  {
    id: "siem",
    title: "SIEM & Security Tooling",
    items: [
      "IBM QRadar",
      "Security Onion",
      "Wireshark",
      "Kali Linux",
      "Packet Tracer",
      "EVE-NG",
    ],
  },
  {
    id: "netdef",
    title: "Network Defense",
    items: [
      "Firewalls",
      "WAF",
      "Proxy",
      "IPS",
      "EDR",
      "MikroTik",
      "Kerio Control",
      "Ubiquiti",
    ],
  },
  {
    id: "networking",
    title: "Networking",
    items: [
      "Network Configuration",
      "Network Troubleshooting",
      "VLANs",
      "Network Segmentation",
      "CCNA Concepts",
    ],
  },
  {
    id: "sysadmin",
    title: "Systems Administration",
    items: [
      "Active Directory",
      "Windows Server",
      "Hikvision NVR",
      "CCBoot",
      "Diskless Systems",
    ],
  },
  {
    id: "automation",
    title: "Automation",
    items: ["Python", "Network Automation"],
  },
];

/** Node graph shown in the skills topology visualisation. */
export interface SkillGraphNode {
  id: string;
  label: string;
  category: string; // matches SkillCluster.id
}

export const skillGraphTools: SkillGraphNode[] = [
  { id: "qradar", label: "QRadar", category: "siem" },
  { id: "onion", label: "Security Onion", category: "siem" },
  { id: "wireshark", label: "Wireshark", category: "siem" },
  { id: "kali", label: "Kali Linux", category: "siem" },
  { id: "mikrotik", label: "MikroTik", category: "netdef" },
  { id: "kerio", label: "Kerio Control", category: "netdef" },
  { id: "ips", label: "IPS", category: "netdef" },
  { id: "edr", label: "EDR", category: "netdef" },
  { id: "waf", label: "WAF", category: "netdef" },
  { id: "vlan", label: "VLAN", category: "netdef" },
  { id: "ubiquiti", label: "Ubiquiti", category: "networking" },
  { id: "eveng", label: "EVE-NG", category: "networking" },
  { id: "ad", label: "Active Directory", category: "sysadmin" },
  { id: "winserver", label: "Windows Server", category: "sysadmin" },
  { id: "python", label: "Python", category: "automation" },
];

/* ------------------------------------------------------------------ */
/* Projects / Labs — reusable placeholder cards                        */
/* ------------------------------------------------------------------ */

export type ProjectStatus = "planned" | "in-progress" | "complete";

export interface ProjectItem {
  id: string;
  caseFile: string;
  title: string;
  status: ProjectStatus;
  description: string;
  technologies: string[];
  /** Optional fields — add them as the projects are documented. */
  architecture?: string;
  screenshots?: string[];
  github?: string;
  details?: string;
}

/**
 * Placeholder lab/project cards. These are intentionally generic —
 * they are NOT claims of completed work. Populate each entry with
 * real details, screenshots and links as the projects are written up.
 */
export const projects: ProjectItem[] = [
  {
    id: "soc-siem-lab",
    caseFile: "CASE FILE #01",
    title: "SOC / SIEM Lab",
    status: "planned",
    description:
      "Reserved write-up: log ingestion, dashboards, correlation rules, and alert triage in a home SIEM lab.",
    technologies: ["IBM QRadar", "Security Onion", "Linux"],
  },
  {
    id: "ad-lab",
    caseFile: "CASE FILE #02",
    title: "Active Directory Lab",
    status: "planned",
    description:
      "Reserved write-up: domain setup, users and group policies, and authentication hardening exercises.",
    technologies: ["Windows Server", "Active Directory", "Group Policy"],
  },
  {
    id: "segmentation-lab",
    caseFile: "CASE FILE #03",
    title: "Network Segmentation Lab",
    status: "planned",
    description:
      "Reserved write-up: VLAN design, inter-VLAN routing, and segmentation strategy in a simulated network.",
    technologies: ["VLANs", "MikroTik", "Packet Tracer"],
  },
  {
    id: "python-automation",
    caseFile: "CASE FILE #04",
    title: "Python Network Automation",
    status: "planned",
    description:
      "Reserved write-up: automating device configuration and checks over SSH with Python scripting.",
    technologies: ["Python", "Network Automation", "SSH / CLI"],
  },
  {
    id: "firewall-config",
    caseFile: "CASE FILE #05",
    title: "Firewall Configuration",
    status: "planned",
    description:
      "Reserved write-up: rule design, NAT, and traffic filtering on firewall platforms used in production-like setups.",
    technologies: ["Kerio Control", "MikroTik", "Firewall Rules"],
  },
  {
    id: "threat-detection-lab",
    caseFile: "CASE FILE #06",
    title: "Threat Detection Lab",
    status: "planned",
    description:
      "Reserved write-up: packet analysis and detection exercises using traffic captures and open-source tooling.",
    technologies: ["Wireshark", "Kali Linux", "Security Onion"],
  },
];

/* ------------------------------------------------------------------ */
/* Education & Certifications                                          */
/* ------------------------------------------------------------------ */

export const education = {
  school: "Staffordshire University",
  degree: "BSc Cybersecurity",
  period: "2019 – 2023",
};

export interface CertificationItem {
  ref: string;
  name: string;
  issuer: string;
}

export const certifications: CertificationItem[] = [
  {
    ref: "CR-001",
    name: "IBM QRadar SIEM — Step-by-Step Bootcamp",
    issuer: "IBM QRadar Bootcamp",
  },
  {
    ref: "CR-002",
    name: "Cybersecurity Training",
    issuer: "AMIIT",
  },
  {
    ref: "CR-003",
    name: "IINSIDEOUT Soft Skills — Network Engineer",
    issuer: "GIZ with RTU",
  },
];

/* ------------------------------------------------------------------ */
/* Terminal — predefined, frontend-only command outputs                */
/* ------------------------------------------------------------------ */

export const terminalIntro = [
  "Youssef Portfolio Terminal — simulated environment. No shell is executed.",
  "Type 'help' to list the available commands.",
];

export const terminalCommands: Record<string, string[]> = {
  help: [
    "Available commands:",
    "  help            Show this help",
    "  about           Who I am",
    "  skills          Capability clusters",
    "  experience      Work history",
    "  education       Academic background",
    "  certifications  Training & credentials",
    "  contact         Reach me",
    "  whoami          Session identity",
    "  clear           Clear the terminal",
  ],
  about: [
    "Junior Cybersecurity Analyst — Giza, Egypt.",
    "Focus: SOC operations, SIEM, incident response, threat detection.",
    "Background spans networking, firewalls, and enterprise infrastructure.",
  ],
  skills: skillClusters.map(
    (c) => `${c.title.toUpperCase().padEnd(24)} ${c.items.slice(0, 4).join(" · ")}`,
  ),
  experience: experiences.map(
    (e) => `${e.role} — ${e.company} (${e.period})`,
  ),
  education: [
    `${education.degree} — ${education.school} (${education.period})`,
  ],
  certifications: certifications.map((c) => `${c.name} — ${c.issuer}`),
  contact: [
    `Email    : ${contact.email}`,
    `LinkedIn : ${contact.linkedin}`,
    `GitHub   : ${contact.github}`,
    `Location : ${contact.location}`,
  ],
  whoami: [
    `${profile.name} — ${profile.title}`,
    "Guest session. Welcome to my portfolio.",
  ],
};
