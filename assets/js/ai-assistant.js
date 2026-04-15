/**
 * AI Portfolio Assistant for Tiyani Manganyi
 * A smart chatbot that answers questions about skills, projects, experience, etc.
 * Includes in-chat contact form and quick-action contact buttons.
 */

(function () {
  "use strict";

  // ── Knowledge Base ──────────────────────────────────────────────────
  var portfolio = {
    name: "Tiyani Manganyi",
    title: "Junior Software Developer and Data Science Specialist",
    location: "180 Burgers Street, Pretoria, South Africa",
    phone: "060 817 5627",
    email: "kbmagoda2024@gmail.com",
    github: "https://github.com/Tiyani-Manganyi",
    linkedin: "https://www.linkedin.com/in/tiyani-manganyi-137625316/",
    facebook: "https://www.facebook.com/TmanG0g0",

    about:
      "Tiyani Manganyi is a dedicated Software Developer and Data Science Specialist based in Pretoria, South Africa. He completed his Diploma in Computer Science at Tshwane University of Technology. He has expertise in full-stack development, machine learning, and cloud computing. He has built 9+ projects including AI-powered tools, e-commerce platforms, real-time chat applications, and data analytics dashboards. He offers services including Full-Stack Web Development, AI & Machine Learning Solutions, Data Analytics & Visualization, Cloud Deployment & DevOps, Responsive UI/UX Design, and API Development & Integration.",

    education: [
      { year: "2026", title: "Diploma in Computer Science", institution: "Tshwane University of Technology" },
      { year: "2025", title: "FNB App Academy Graduate", details: "Full Stack Development and AI Integration" },
      { year: "2024", title: "Data Science", institution: "AWS" }
    ],

    skills: {
      "JavaScript / React.js": 85,
      "Python / Django": 80,
      "Node.js / Express": 78,
      "MongoDB": 82,
      "NLP": 75,
      "AWS / Azure Cloud": 70
    },

    skillTags: [
      "Python", "JavaScript", "React", "Node.js", "NLP", "MongoDB",
      "AWS", "Azure", "Django", "Express", "Full-Stack Development",
      "Machine Learning", "Cloud Computing", "Data Science"
    ],

    stats: {
      totalProjects: 18,
      aiMlProjects: 8,
      certifications: 13,
      githubRepos: 30,
      yearsExperience: 3
    },

    projects: [
      {
        name: "AI Resume Analyzer",
        description: "AI-powered tool analyzing resumes for ATS compatibility, keyword optimization, and skill gaps. Helps job seekers pass automated screening systems.",
        tags: ["AI", "NLP", "Python"],
        liveDemo: "https://resume-analyzer-ashen.vercel.app/",
        github: "github.com/Tiyani-Manganyi/resume-analyzer"
      },
      {
        name: "House Price Prediction",
        description: "Regression model predicting real estate prices with high accuracy. Used by FinTech and real estate companies.",
        tags: ["Machine Learning", "Regression", "Python"],
        liveDemo: "https://house-price-predictor.streamlit.app",
        github: "github.com/Tiyani-Manganyi/house-price-prediction"
      },
      {
        name: "South African Case Law AI",
        description: "Semantic search + GPT over landmark SA constitutional cases. Ask a legal question and get cited answers grounded in actual judgments.",
        tags: ["AI", "NLP", "Legal Tech"],
        liveDemo: "https://4ir-ai-tut.base44.app/"
      },
      {
        name: "Doctors Appointment Website",
        description: "Online platform for booking medical appointments with calendar integration and secure scheduling.",
        tags: ["Full-Stack", "Node.js", "React"],
        liveDemo: "https://doctors-booking.vercel.app/",
        github: "github.com/Tiyani-Manganyi/doctors-booking"
      },
      {
        name: "Fruits and Vegetable E-commerce",
        description: "Full-stack e-commerce platform with secure payments, user accounts, and admin dashboard.",
        tags: ["E-commerce", "Full-Stack", "JavaScript"],
        github: "github.com/Tiyani-Manganyi/Fruits_and_vegetable_web"
      },
      {
        name: "4IR Resume Website",
        description: "Digital CV platform using modern web technologies for the Fourth Industrial Revolution era.",
        tags: ["Web Development", "Resume"],
        liveDemo: "https://4-ir-resume-rxi9.vercel.app/"
      },
      {
        name: "TUT Job Portal",
        description: "Smart career matching platform that connects students and alumni with employers using intelligent algorithms and real-time vacancy alerts.",
        tags: ["Full-Stack", "AI", "Career"],
        liveDemo: "https://4ir-ai-tut.base44.app/"
      }
    ],

    certifications: [
      "AZ-900 Microsoft Azure Fundamentals",
      "AWS Data Science",
      "CISCO Certificate",
      "Cyber Security UK",
      "Data Management Certificate",
      "FNB App Academy Certificate"
    ]
  };

  // ── Intent Matching ─────────────────────────────────────────────────
  var intents = [
    {
      patterns: [/\b(hi|hello|hey|howdy|sup|yo|greetings|good\s*(morning|afternoon|evening))\b/i],
      handler: function () {
        return "Hi there! I'm Tiyani's AI assistant. I can tell you about his **skills**, **projects**, **experience**, **education**, **certifications**, or help you **contact** him.\n\nWhat would you like to know?";
      }
    },
    {
      patterns: [/\b(who\s*(is|are)\s*(you|tiyani)|about\s*(tiyani|him|you)|tell\s*me\s*about|introduce|background)\b/i],
      handler: function () {
        return "**" + portfolio.name + "**\n" + portfolio.title + "\n\n" + portfolio.about + "\n\nBased in Pretoria, South Africa";
      }
    },
    {
      patterns: [/\b(skill|tech|stack|technolog|proficien|know|can\s*(he|you)\s*(do|use|code)|programming|language|framework)\b/i],
      handler: function () {
        var msg = "**Technical Skills:**\n\n";
        var skills = portfolio.skills;
        for (var skill in skills) {
          if (skills.hasOwnProperty(skill)) {
            var pct = skills[skill];
            var filled = Math.round(pct / 10);
            var bar = "";
            for (var i = 0; i < filled; i++) bar += "\u2588";
            for (var j = 0; j < 10 - filled; j++) bar += "\u2591";
            msg += bar + " **" + skill + "** \u2014 " + pct + "%\n";
          }
        }
        msg += "\nAlso proficient in: " + portfolio.skillTags.join(", ");
        return msg;
      }
    },
    {
      patterns: [/\b(project|portfolio|built|created|developed|work|app|application|website|what\s*(have|has)\s*(he|you)\s*(built|made|created|done))\b/i],
      handler: function () {
        var msg = "**Projects (" + portfolio.projects.length + " featured):**\n\n";
        portfolio.projects.forEach(function (p, i) {
          msg += "**" + (i + 1) + ". " + p.name + "**\n" + p.description + "\n";
          if (p.liveDemo) msg += "[Live Demo](" + p.liveDemo + ")\n";
          msg += "\n";
        });
        msg += "He has **" + portfolio.stats.totalProjects + " total projects** including **" + portfolio.stats.aiMlProjects + " AI/ML projects**. Ask me about any specific project!";
        return msg;
      }
    },
    {
      patterns: [/\b(resume\s*analy|ats|resume\s*scan|resume\s*ai)\b/i],
      handler: function () {
        var p = portfolio.projects[0];
        return "**" + p.name + "**\n\n" + p.description + "\n\n**Live Demo:** " + p.liveDemo + "\n**Code:** " + p.github + "\n\nTags: " + p.tags.join(", ");
      }
    },
    {
      patterns: [/\b(house\s*price|real\s*estate|predict|regression)\b/i],
      handler: function () {
        var p = portfolio.projects[1];
        return "**" + p.name + "**\n\n" + p.description + "\n\n**Live Demo:** " + p.liveDemo + "\n**Code:** " + p.github + "\n\nTags: " + p.tags.join(", ");
      }
    },
    {
      patterns: [/\b(case\s*law|legal|constitutional|law\s*ai)\b/i],
      handler: function () {
        var p = portfolio.projects[2];
        return "**" + p.name + "**\n\n" + p.description + "\n\n**Live Demo:** " + p.liveDemo + "\n\nTags: " + p.tags.join(", ");
      }
    },
    {
      patterns: [/\b(doctor|appointment|booking|medical|health)\b/i],
      handler: function () {
        var p = portfolio.projects[3];
        return "**" + p.name + "**\n\n" + p.description + "\n\n**Live Demo:** " + p.liveDemo + "\n**Code:** " + p.github + "\n\nTags: " + p.tags.join(", ");
      }
    },
    {
      patterns: [/\b(e-?commerce|shop|fruit|vegetable|store|cart|payment)\b/i],
      handler: function () {
        var p = portfolio.projects[4];
        return "**" + p.name + "**\n\n" + p.description + "\n\n**Code:** " + p.github + "\n\nTags: " + p.tags.join(", ");
      }
    },
    {
      patterns: [/\b(job\s*portal|career|tut\s*job|vacancy|employment)\b/i],
      handler: function () {
        var p = portfolio.projects[6];
        return "**" + p.name + "**\n\n" + p.description + "\n\n**Live Demo:** " + p.liveDemo + "\n\nTags: " + p.tags.join(", ");
      }
    },
    {
      patterns: [/\b(educat|school|universit|diploma|degree|study|tut|tshwane|qualif)\b/i],
      handler: function () {
        var msg = "**Education and Training:**\n\n";
        portfolio.education.forEach(function (e) {
          msg += "**" + e.year + "** \u2014 " + e.title + "\n";
          if (e.institution) msg += e.institution + "\n";
          if (e.details) msg += e.details + "\n";
          msg += "\n";
        });
        return msg;
      }
    },
    {
      patterns: [/\b(certif|award|badge|credential|az.?900|azure\s*fund|aws\s*cert|cisco|cyber|fnb)\b/i],
      handler: function () {
        var msg = "**Certifications (" + portfolio.stats.certifications + " total):**\n\n";
        portfolio.certifications.forEach(function (c, i) {
          msg += (i + 1) + ". " + c + "\n";
        });
        msg += "\n[View All Certificates](award.html)";
        return msg;
      }
    },
    {
      // Send message - show in-chat form (MUST come before contact card pattern)
      patterns: [/\b(send\s*a?\s*message|send\s*email|compose|write\s*email|email\s*him|email\s*tiyani|drop\s*a?\s*(line|mail|email)|write\s*to)\b/i],
      handler: function () { return "__CONTACT_FORM__"; }
    },
    {
      // Contact - show interactive contact card
      patterns: [/\b(contact|reach|email|phone|call|hire|connect|get\s*in\s*touch|message|whatsapp|chat\s*with|talk\s*to|speak\s*to)\b/i],
      handler: function () { return "__CONTACT_CARD__"; }
    },
    {
      patterns: [/\b(experience|year|how\s*long|work\s*experience|career\s*history|profession)\b/i],
      handler: function () {
        return "**Professional Experience:**\n\nTiyani has **" + portfolio.stats.yearsExperience + " years of experience** in software development.\n\n**Stats:**\n- " + portfolio.stats.totalProjects + " total projects\n- " + portfolio.stats.aiMlProjects + " AI/ML projects\n- " + portfolio.stats.certifications + " certifications\n- " + portfolio.stats.githubRepos + " GitHub repositories\n\nFNB App Academy Graduate (2025)\nAWS Data Science (2024)";
      }
    },
    {
      patterns: [/\b(python|django)\b/i],
      handler: function () {
        return "**Python and Django:**\n\nTiyani's proficiency: **" + portfolio.skills["Python / Django"] + "%**\n\nPython projects include:\n- AI Resume Analyzer (NLP)\n- House Price Prediction (ML / Regression)\n- South African Case Law AI (Semantic Search + GPT)\n- Data analytics dashboards\n\nHe uses Python for machine learning, data science, web back-ends (Django), and automation.";
      }
    },
    {
      patterns: [/\b(react|javascript|frontend|front.?end)\b/i],
      handler: function () {
        return "**JavaScript and React.js:**\n\nTiyani's proficiency: **" + portfolio.skills["JavaScript / React.js"] + "%**\n\nHe builds interactive frontends, SPAs, and full-stack applications using React.js. Projects include the Doctors Appointment platform, e-commerce sites, and the 4IR Resume website.";
      }
    },
    {
      patterns: [/\b(node|express|backend|back.?end|server)\b/i],
      handler: function () {
        return "**Node.js and Express:**\n\nTiyani's proficiency: **" + portfolio.skills["Node.js / Express"] + "%**\n\nHe uses Node.js and Express for building RESTful APIs, real-time chat applications, and server-side logic for full-stack projects.";
      }
    },
    {
      patterns: [/\b(mongo|database|db|nosql)\b/i],
      handler: function () {
        return "**MongoDB:**\n\nTiyani's proficiency: **" + portfolio.skills["MongoDB"] + "%**\n\nMongoDB is his primary NoSQL database for storing user data, products, appointments, and more across multiple projects.";
      }
    },
    {
      patterns: [/\b(cloud|aws|azure|deploy|devops|hosting)\b/i],
      handler: function () {
        return "**Cloud and DevOps:**\n\nTiyani's proficiency: **" + portfolio.skills["AWS / Azure Cloud"] + "%**\n\n- **AZ-900** Microsoft Azure Fundamentals certified\n- **AWS** Data Science certified\n- Deploys projects on Vercel, Streamlit Cloud, and Azure\n- Experience with cloud infrastructure and CI/CD";
      }
    },
    {
      patterns: [/\b(ai|artificial\s*intelligence|machine\s*learn|ml|nlp|natural\s*language|deep\s*learn|data\s*science)\b/i],
      handler: function () {
        return "**AI and Machine Learning:**\n\nTiyani has built **" + portfolio.stats.aiMlProjects + " AI/ML projects**, including:\n\n1. **AI Resume Analyzer** \u2014 NLP-powered ATS optimization\n2. **House Price Prediction** \u2014 Regression model with high accuracy\n3. **SA Case Law AI** \u2014 Semantic search + GPT for legal questions\n4. **TUT Job Portal** \u2014 Intelligent career matching\n\nHis NLP proficiency is **" + portfolio.skills["NLP"] + "%** and growing!";
      }
    },
    {
      patterns: [/\b(locat|where|city|country|south\s*africa|pretoria|address)\b/i],
      handler: function () {
        return "**Location:**\n\n" + portfolio.location + "\nSouth Africa\n\nEmail: " + portfolio.email + "\nPhone: " + portfolio.phone;
      }
    },
    {
      patterns: [/\b(github|repo|source\s*code|open\s*source)\b/i],
      handler: function () {
        return "**GitHub:**\n\nTiyani has **" + portfolio.stats.githubRepos + " repositories** on GitHub.\n\n[Visit GitHub Profile](" + portfolio.github + ")\n\nNotable repos:\n- resume-analyzer\n- house-price-prediction\n- Fruits_and_vegetable_web\n- doctors-booking";
      }
    },
    {
      patterns: [/\b(linkedin|social|connect\s*online|network)\b/i],
      handler: function () {
        return "**Social Profiles:**\n\n- [GitHub](" + portfolio.github + ")\n- [LinkedIn](" + portfolio.linkedin + ")\n- [Facebook](" + portfolio.facebook + ")";
      }
    },
    {
      patterns: [/\b(available|hire|hiring|open\s*to\s*work|freelanc|remote|job|opportunit|recruit)\b/i],
      handler: function () {
        return "**Tiyani is open to work!**\n\nHe is available for:\n- Full-time positions\n- Contract / Freelance work\n- Remote opportunities\n- Internships and graduate programs\n\nEmail: " + portfolio.email + "\nPhone: " + portfolio.phone + "\nWhatsApp: +27 60 817 5627\n\n**Tip:** Type **\"send a message\"** to compose a message right here in the chat!";
      }
    },
    {
      patterns: [/\b(service|offer|what\s*can\s*(he|you)\s*do\s*for|what\s*do\s*(you|he)\s*offer|what\s*(you|he)\s*provide|can\s*(you|he)\s*help\s*with)\b/i],
      handler: function () {
        return "**Services Tiyani Offers:**\n\n1. **Full-Stack Web Development** \u2014 React, Node.js, Django, MongoDB\n2. **AI & Machine Learning** \u2014 NLP, predictive models, automation\n3. **Data Analytics & Visualization** \u2014 Dashboards, reports, Python/Pandas\n4. **Cloud Deployment & DevOps** \u2014 AWS, Azure, Vercel, CI/CD\n5. **Responsive UI/UX Design** \u2014 Mobile-first, accessible interfaces\n6. **API Development & Integration** \u2014 REST APIs, payment gateways, microservices\n\nScroll to the **Services** section on the homepage or type **\"contact\"** to get in touch!";
      }
    },
    {
      patterns: [/\b(testimonial|review|recommend|feedback|what\s*people\s*say)\b/i],
      handler: function () {
        return "**Testimonials:**\n\nTiyani has received great feedback from mentors, faculty, and clients:\n\n\u2B50 **FNB App Academy** \u2014 \"One of the most dedicated developers... exceptional skill in NLP and full-stack development.\"\n\n\u2B50 **TUT Faculty** \u2014 \"Creative AI solutions... always delivered quality code on time. A true team player.\"\n\n\u2B50 **Client (Doctors Clinic)** \u2014 \"Exceeded expectations... booking system is seamless, UI is clean.\"\n\nCheck out the **Testimonials** section on the homepage for more!";
      }
    },
    {
      patterns: [/\b(timeline|journey|career\s*path|road\s*map|mileston)\b/i],
      handler: function () {
        return "**Tiyani's Career Timeline:**\n\n**2026** \u2014 Diploma in Computer Science (TUT)\n**2025** \u2014 FNB App Academy Graduate\n**2024-2025** \u2014 Freelance Software Developer (9+ projects)\n**2024** \u2014 AWS Data Science Certification\n**2024** \u2014 Azure AZ-900 Certified\n**2023** \u2014 Cisco Networking & Cybersecurity\n\nScroll to the **Experience** section on the homepage for the full interactive timeline!";
      }
    },
    {
      patterns: [/\b(whatsapp|wa\.me|chat\s*on\s*whatsapp)\b/i],
      handler: function () {
        return "**WhatsApp Tiyani:**\n\nYou can chat directly on WhatsApp!\n\n[Open WhatsApp Chat](https://wa.me/27608175627?text=Hi%20Tiyani!%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20connect.)\n\nOr use the green WhatsApp button on the bottom-left of the page.";
      }
    },
    {
      patterns: [/\b(download|resume|cv|pdf)\b/i],
      handler: function () {
        return "**Download Tiyani's Resume:**\n\nYou can download his CV (PDF) directly:\n\n[Download Resume](assets/pdf/cv.pdf)\n\nOr scroll to the **Resume Download** section on the homepage.\n\nThe resume includes full details on education, skills, projects, and certifications.";
      }
    },
    {
      patterns: [/\b(thank|thanks|thx|cheers|appreciate)\b/i],
      handler: function () {
        return "You're welcome! Feel free to ask anything else about Tiyani's portfolio. I'm here to help!\n\n[Contact Tiyani](contact.html) | [View Certificates](award.html)";
      }
    },
    {
      patterns: [/\b(bye|goodbye|see\s*you|later|exit|quit|close)\b/i],
      handler: function () {
        return "Goodbye! Thanks for visiting Tiyani's portfolio. Don't hesitate to reach out if you have more questions!\n\nEmail: " + portfolio.email;
      }
    },
    {
      patterns: [/\b(help|what\s*can\s*you|menu|option|command)\b/i],
      handler: function () {
        return "**I can help you with:**\n\n1. **About** \u2014 Who is Tiyani?\n2. **Skills** \u2014 Technical proficiencies\n3. **Projects** \u2014 Featured work\n4. **Services** \u2014 What Tiyani offers\n5. **Education** \u2014 Qualifications\n6. **Certifications** \u2014 Awards and badges\n7. **Experience** \u2014 Career summary\n8. **Timeline** \u2014 Career milestones\n9. **Testimonials** \u2014 What people say\n10. **Contact** \u2014 Quick-action contact buttons\n11. **Send a message** \u2014 Compose a message right here\n12. **WhatsApp** \u2014 Chat on WhatsApp\n13. **Download CV** \u2014 Get resume PDF\n14. **AI/ML** \u2014 AI and data science work\n15. **Availability** \u2014 Hiring info\n\nJust type a topic or ask a question!";
      }
    }
  ];

  // ── Response Generator ──────────────────────────────────────────────
  function getResponse(userMessage) {
    var msg = userMessage.trim();
    if (!msg) return "Please type a question and I'll do my best to answer!";

    for (var i = 0; i < intents.length; i++) {
      var intent = intents[i];
      for (var j = 0; j < intent.patterns.length; j++) {
        if (intent.patterns[j].test(msg)) {
          return intent.handler();
        }
      }
    }

    // Fuzzy keyword fallback - search projects
    var lowerMsg = msg.toLowerCase();
    for (var k = 0; k < portfolio.projects.length; k++) {
      var p = portfolio.projects[k];
      var nameMatch = p.name.toLowerCase().indexOf(lowerMsg) !== -1;
      var descMatch = p.description.toLowerCase().indexOf(lowerMsg) !== -1;
      var tagMatch = p.tags.some(function (t) { return lowerMsg.indexOf(t.toLowerCase()) !== -1; });
      if (nameMatch || descMatch || tagMatch) {
        var resp = "Found a matching project!\n\n**" + p.name + "**\n" + p.description + "\n";
        if (p.liveDemo) resp += "[Live Demo](" + p.liveDemo + ")\n";
        if (p.github) resp += "Code: " + p.github + "\n";
        return resp;
      }
    }

    // Default fallback
    return "I'm not sure about that, but I can help with:\n\n- **Skills** \u2014 Tiyani's tech stack\n- **Projects** \u2014 Featured work and live demos\n- **Services** \u2014 What Tiyani can do for you\n- **Education** \u2014 Qualifications\n- **Certifications** \u2014 Awards\n- **Testimonials** \u2014 What people say\n- **Contact** \u2014 How to reach Tiyani\n- **Send a message** \u2014 Write to him directly\n- **AI/ML** \u2014 Data science projects\n\nTry asking about one of these topics!";
  }

  // ── Simple Markdown-to-HTML ─────────────────────────────────────────
  function renderMarkdown(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" style="color:#e63946;text-decoration:underline;">$1</a>')
      .replace(/\n/g, "<br>");
  }

  // ── Build Chat UI ───────────────────────────────────────────────────
  function createChatWidget() {
    // Floating button
    var fab = document.createElement("div");
    fab.id = "ai-fab";
    fab.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="white" viewBox="0 0 16 16">' +
      '<path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5M3 8.062C3 6.76 4.235 5.765 5.53 5.886a26 26 0 0 1 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.93.93 0 0 1-.765.935c-.845.147-2.34.346-4.235.346s-3.39-.2-4.235-.346A.93.93 0 0 1 3 9.219zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a25 25 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25 25 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135"/>' +
      '<path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2zM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5"/>' +
      '</svg>';
    document.body.appendChild(fab);

    // Chat window
    var chatWindow = document.createElement("div");
    chatWindow.id = "ai-chat-window";
    chatWindow.innerHTML =
      '<div id="ai-chat-header">' +
        '<div style="display:flex;align-items:center;gap:10px;">' +
          '<div style="width:36px;height:36px;border-radius:50%;background:#e63946;display:flex;align-items:center;justify-content:center;">' +
            '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 16 16"><path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5M3 8.062C3 6.76 4.235 5.765 5.53 5.886a26 26 0 0 1 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.93.93 0 0 1-.765.935c-.845.147-2.34.346-4.235.346s-3.39-.2-4.235-.346A.93.93 0 0 1 3 9.219zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a25 25 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25 25 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135"/><path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2zM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5"/></svg>' +
          '</div>' +
          '<div>' +
            '<div style="font-weight:700;font-size:0.95rem;">Tiyani\'s AI Assistant</div>' +
            '<div style="font-size:0.75rem;opacity:0.85;display:flex;align-items:center;gap:4px;">' +
              '<span style="width:8px;height:8px;border-radius:50%;background:#10b981;display:inline-block;"></span> Online' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<button id="ai-chat-close" aria-label="Close chat">&times;</button>' +
      '</div>' +
      '<div id="ai-chat-messages"></div>' +
      '<div id="ai-chat-suggestions"></div>' +
      '<form id="ai-chat-form">' +
        '<input type="text" id="ai-chat-input" placeholder="Ask about skills, projects, or say contact..." autocomplete="off" />' +
        '<button type="submit" id="ai-chat-send" aria-label="Send">' +
          '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 16 16"><path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z"/></svg>' +
        '</button>' +
      '</form>';
    document.body.appendChild(chatWindow);

    // ── Inject Styles ─────────────────────────────────────────────────
    var style = document.createElement("style");
    style.textContent =
      '#ai-fab{position:fixed;bottom:28px;right:28px;width:60px;height:60px;border-radius:50%;' +
      'background:linear-gradient(135deg,#e63946,#ff6b6b);display:flex;align-items:center;' +
      'justify-content:center;cursor:pointer;box-shadow:0 6px 24px rgba(230,57,70,0.45);' +
      'z-index:99999;transition:transform .3s ease,box-shadow .3s ease;animation:ai-fab-pulse 2s infinite}' +
      '#ai-fab:hover{transform:scale(1.1);box-shadow:0 8px 32px rgba(230,57,70,0.6)}' +
      '@keyframes ai-fab-pulse{0%,100%{box-shadow:0 6px 24px rgba(230,57,70,0.45)}50%{box-shadow:0 6px 32px rgba(230,57,70,0.7)}}' +

      '#ai-chat-window{position:fixed;bottom:100px;right:28px;width:400px;max-width:calc(100vw - 32px);' +
      'height:540px;max-height:calc(100vh - 140px);background:#fff;border-radius:20px;' +
      'box-shadow:0 20px 60px rgba(0,0,0,0.2);z-index:99999;display:none;flex-direction:column;' +
      'overflow:hidden;font-family:"Poppins","Roboto",sans-serif;animation:ai-chat-slide-in .3s ease forwards}' +
      '#ai-chat-window.open{display:flex}' +
      '@keyframes ai-chat-slide-in{from{opacity:0;transform:translateY(20px) scale(0.95)}to{opacity:1;transform:translateY(0) scale(1)}}' +

      '#ai-chat-header{background:linear-gradient(135deg,#0a192f,#1e2a3a);color:#fff;' +
      'padding:16px 20px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0}' +
      '#ai-chat-close{background:none;border:none;color:#fff;font-size:1.5rem;cursor:pointer;' +
      'padding:0 4px;line-height:1;opacity:.8;transition:opacity .2s}' +
      '#ai-chat-close:hover{opacity:1}' +

      '#ai-chat-messages{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:12px;background:#f8fafc}' +
      '#ai-chat-messages::-webkit-scrollbar{width:6px}' +
      '#ai-chat-messages::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:3px}' +

      '.ai-msg{max-width:85%;padding:12px 16px;border-radius:16px;font-size:.88rem;' +
      'line-height:1.6;word-wrap:break-word;animation:ai-msg-in .3s ease}' +
      '@keyframes ai-msg-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}' +
      '.ai-msg.bot{background:#fff;color:#1e293b;align-self:flex-start;border:1px solid #e2e8f0;' +
      'border-bottom-left-radius:4px;box-shadow:0 2px 8px rgba(0,0,0,0.04)}' +
      '.ai-msg.user{background:linear-gradient(135deg,#e63946,#ff6b6b);color:#fff;' +
      'align-self:flex-end;border-bottom-right-radius:4px}' +
      '.ai-msg.bot strong{color:#e63946}' +
      '.ai-msg.bot a{color:#e63946;text-decoration:underline}' +

      '.ai-typing{display:flex;gap:4px;padding:12px 16px;align-self:flex-start}' +
      '.ai-typing span{width:8px;height:8px;background:#94a3b8;border-radius:50%;animation:ai-typing-bounce 1.4s infinite both}' +
      '.ai-typing span:nth-child(2){animation-delay:.16s}' +
      '.ai-typing span:nth-child(3){animation-delay:.32s}' +
      '@keyframes ai-typing-bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-8px)}}' +

      '#ai-chat-suggestions{display:flex;flex-wrap:wrap;gap:6px;padding:8px 16px;' +
      'background:#fff;border-top:1px solid #f1f5f9;flex-shrink:0}' +
      '.ai-suggestion-chip{background:#f1f5f9;border:1px solid #e2e8f0;border-radius:20px;' +
      'padding:5px 14px;font-size:.78rem;cursor:pointer;transition:all .2s;color:#475569;white-space:nowrap}' +
      '.ai-suggestion-chip:hover{background:#e63946;color:#fff;border-color:#e63946;transform:translateY(-1px)}' +

      '#ai-chat-form{display:flex;padding:12px 16px;gap:8px;background:#fff;border-top:1px solid #f1f5f9;flex-shrink:0}' +
      '#ai-chat-input{flex:1;border:2px solid #e2e8f0;border-radius:25px;padding:10px 18px;' +
      'font-size:.88rem;outline:none;font-family:inherit;transition:border-color .2s}' +
      '#ai-chat-input:focus{border-color:#e63946}' +
      '#ai-chat-send{width:42px;height:42px;border-radius:50%;border:none;' +
      'background:linear-gradient(135deg,#e63946,#ff6b6b);cursor:pointer;display:flex;' +
      'align-items:center;justify-content:center;transition:transform .2s,box-shadow .2s;flex-shrink:0}' +
      '#ai-chat-send:hover{transform:scale(1.08);box-shadow:0 4px 16px rgba(230,57,70,0.4)}' +

      '.ai-msg.bot input,.ai-msg.bot textarea,.ai-msg.bot select{width:100%;box-sizing:border-box}' +

      '@media(max-width:480px){#ai-chat-window{bottom:0;right:0;width:100vw;height:100vh;' +
      'max-height:100vh;border-radius:0}#ai-fab{bottom:16px;right:16px;width:54px;height:54px}}';
    document.head.appendChild(style);

    // ── State and References ──────────────────────────────────────────
    var messagesEl = document.getElementById("ai-chat-messages");
    var suggestionsEl = document.getElementById("ai-chat-suggestions");
    var input = document.getElementById("ai-chat-input");
    var formEl = document.getElementById("ai-chat-form");
    var isOpen = false;

    // ── Helper Functions ──────────────────────────────────────────────
    function addMessage(text, sender) {
      var div = document.createElement("div");
      div.className = "ai-msg " + sender;

      if (sender === "bot" && text === "__CONTACT_CARD__") {
        div.innerHTML = buildContactCard();
        bindContactCardEvents(div);
      } else if (sender === "bot" && text === "__CONTACT_FORM__") {
        div.innerHTML = buildContactForm();
        bindContactFormEvents(div);
      } else {
        div.innerHTML = sender === "bot" ? renderMarkdown(text) : escapeHtml(text);
      }
      messagesEl.appendChild(div);
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    /* ── Contact Card (quick-action buttons) ─────────────────────── */
    function buildContactCard() {
      return '<strong style="font-size:1rem;">Contact Tiyani</strong><br><br>' +
        '<div style="display:flex;flex-direction:column;gap:8px;">' +
          '<a href="mailto:' + portfolio.email + '" class="ai-cta-btn" ' +
            'style="background:#e63946;color:#fff;padding:10px 14px;border-radius:12px;text-decoration:none;' +
            'display:flex;align-items:center;gap:8px;font-size:.85rem;font-weight:600;transition:all .2s;">' +
            '&#x1F4E7; Email &mdash; ' + portfolio.email +
          '</a>' +
          '<a href="tel:+27608175627" class="ai-cta-btn" ' +
            'style="background:#2563eb;color:#fff;padding:10px 14px;border-radius:12px;text-decoration:none;' +
            'display:flex;align-items:center;gap:8px;font-size:.85rem;font-weight:600;transition:all .2s;">' +
            '&#x1F4DE; Phone &mdash; ' + portfolio.phone +
          '</a>' +
          '<a href="https://wa.me/27608175627?text=Hi%20Tiyani%2C%20I%20found%20your%20portfolio%20and%20would%20like%20to%20connect!" ' +
            'target="_blank" class="ai-cta-btn" ' +
            'style="background:#25d366;color:#fff;padding:10px 14px;border-radius:12px;text-decoration:none;' +
            'display:flex;align-items:center;gap:8px;font-size:.85rem;font-weight:600;transition:all .2s;">' +
            '&#x1F4AC; WhatsApp' +
          '</a>' +
          '<a href="' + portfolio.linkedin + '" target="_blank" class="ai-cta-btn" ' +
            'style="background:#0077b5;color:#fff;padding:10px 14px;border-radius:12px;text-decoration:none;' +
            'display:flex;align-items:center;gap:8px;font-size:.85rem;font-weight:600;transition:all .2s;">' +
            '&#x1F517; LinkedIn' +
          '</a>' +
          '<a href="' + portfolio.github + '" target="_blank" class="ai-cta-btn" ' +
            'style="background:#1e293b;color:#fff;padding:10px 14px;border-radius:12px;text-decoration:none;' +
            'display:flex;align-items:center;gap:8px;font-size:.85rem;font-weight:600;transition:all .2s;">' +
            '&#x1F419; GitHub' +
          '</a>' +
        '</div>' +
        '<br>' +
        '<div style="display:flex;gap:6px;flex-wrap:wrap;">' +
          '<button class="ai-action-chip" data-action="form" ' +
            'style="background:#f1f5f9;border:1px solid #e2e8f0;border-radius:20px;padding:5px 14px;' +
            'font-size:.78rem;cursor:pointer;color:#475569;transition:all .2s;">' +
            '&#x2709;&#xFE0F; Send a message</button>' +
          '<button class="ai-action-chip" data-action="location" ' +
            'style="background:#f1f5f9;border:1px solid #e2e8f0;border-radius:20px;padding:5px 14px;' +
            'font-size:.78rem;cursor:pointer;color:#475569;transition:all .2s;">' +
            '&#x1F4CD; Location</button>' +
          '<button class="ai-action-chip" data-action="availability" ' +
            'style="background:#f1f5f9;border:1px solid #e2e8f0;border-radius:20px;padding:5px 14px;' +
            'font-size:.78rem;cursor:pointer;color:#475569;transition:all .2s;">' +
            '&#x2705; Availability</button>' +
        '</div>';
    }

    function bindContactCardEvents(container) {
      setTimeout(function () {
        container.querySelectorAll(".ai-action-chip").forEach(function (btn) {
          btn.addEventListener("click", function () {
            var action = btn.dataset.action;
            if (action === "form") handleUserInput("Send Tiyani a message");
            if (action === "location") handleUserInput("Where is Tiyani located?");
            if (action === "availability") handleUserInput("Is Tiyani available for hire?");
          });
        });
        container.querySelectorAll(".ai-cta-btn").forEach(function (a) {
          a.addEventListener("mouseenter", function () {
            a.style.transform = "translateY(-2px)";
            a.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
          });
          a.addEventListener("mouseleave", function () {
            a.style.transform = "";
            a.style.boxShadow = "";
          });
        });
        container.querySelectorAll(".ai-action-chip").forEach(function (btn) {
          btn.addEventListener("mouseenter", function () {
            btn.style.background = "#e63946";
            btn.style.color = "#fff";
            btn.style.borderColor = "#e63946";
          });
          btn.addEventListener("mouseleave", function () {
            btn.style.background = "#f1f5f9";
            btn.style.color = "#475569";
            btn.style.borderColor = "#e2e8f0";
          });
        });
      }, 50);
    }

    /* ── In-Chat Contact Form ────────────────────────────────────── */
    function buildContactForm() {
      return '<strong style="font-size:1rem;">&#x2709;&#xFE0F; Send Tiyani a Message</strong><br>' +
        '<p style="font-size:.82rem;color:#64748b;margin:6px 0 12px;">Fill in the details below and I will help you send it.</p>' +
        '<form id="ai-contact-form-inner" style="display:flex;flex-direction:column;gap:10px;">' +
          '<input type="text" name="senderName" placeholder="Your Name *" required ' +
            'style="padding:10px 14px;border:2px solid #e2e8f0;border-radius:10px;font-size:.85rem;' +
            'outline:none;font-family:inherit;transition:border-color .2s;" ' +
            'onfocus="this.style.borderColor=\'#e63946\'" onblur="this.style.borderColor=\'#e2e8f0\'" />' +
          '<input type="email" name="senderEmail" placeholder="Your Email *" required ' +
            'style="padding:10px 14px;border:2px solid #e2e8f0;border-radius:10px;font-size:.85rem;' +
            'outline:none;font-family:inherit;transition:border-color .2s;" ' +
            'onfocus="this.style.borderColor=\'#e63946\'" onblur="this.style.borderColor=\'#e2e8f0\'" />' +
          '<select name="subject" ' +
            'style="padding:10px 14px;border:2px solid #e2e8f0;border-radius:10px;font-size:.85rem;' +
            'outline:none;font-family:inherit;background:#fff;color:#475569;transition:border-color .2s;" ' +
            'onfocus="this.style.borderColor=\'#e63946\'" onblur="this.style.borderColor=\'#e2e8f0\'">' +
            '<option value="">Select a reason...</option>' +
            '<option value="hiring">Job Opportunity / Hiring</option>' +
            '<option value="freelance">Freelance / Contract Work</option>' +
            '<option value="collaboration">Project Collaboration</option>' +
            '<option value="question">General Question</option>' +
            '<option value="other">Other</option>' +
          '</select>' +
          '<textarea name="senderMessage" placeholder="Your Message *" required rows="3" ' +
            'style="padding:10px 14px;border:2px solid #e2e8f0;border-radius:10px;font-size:.85rem;' +
            'outline:none;font-family:inherit;resize:vertical;transition:border-color .2s;" ' +
            'onfocus="this.style.borderColor=\'#e63946\'" onblur="this.style.borderColor=\'#e2e8f0\'"></textarea>' +
          '<button type="submit" ' +
            'style="background:linear-gradient(135deg,#e63946,#ff6b6b);color:#fff;border:none;padding:12px;' +
            'border-radius:12px;font-size:.9rem;font-weight:700;cursor:pointer;transition:all .2s;font-family:inherit;" ' +
            'onmouseenter="this.style.transform=\'translateY(-2px)\';this.style.boxShadow=\'0 4px 16px rgba(230,57,70,0.4)\'" ' +
            'onmouseleave="this.style.transform=\'\';this.style.boxShadow=\'\'">' +
            '&#x1F4E4; Send Message' +
          '</button>' +
        '</form>';
    }

    function bindContactFormEvents(container) {
      setTimeout(function () {
        var cForm = container.querySelector("#ai-contact-form-inner");
        if (!cForm) return;
        cForm.addEventListener("submit", function (e) {
          e.preventDefault();
          var sName = cForm.senderName.value.trim();
          var sEmail = cForm.senderEmail.value.trim();
          var sSubject = cForm.subject.value;
          var sMessage = cForm.senderMessage.value.trim();

          if (!sName || !sEmail || !sMessage) {
            addMessage("Please fill in all required fields (Name, Email, Message).", "bot");
            return;
          }

          var subjectLabels = {
            hiring: "Job Opportunity",
            freelance: "Freelance / Contract Inquiry",
            collaboration: "Project Collaboration",
            question: "General Question",
            other: "Portfolio Inquiry",
            "": "Portfolio Inquiry"
          };
          var subjectLine = subjectLabels[sSubject] || "Portfolio Inquiry";
          var body = "Hi Tiyani,%0D%0A%0D%0AMy name is " + encodeURIComponent(sName) +
            ".%0D%0A%0D%0A" + encodeURIComponent(sMessage) +
            "%0D%0A%0D%0ABest regards,%0D%0A" + encodeURIComponent(sName) +
            "%0D%0AEmail: " + encodeURIComponent(sEmail);
          var mailtoLink = "mailto:" + portfolio.email +
            "?subject=" + encodeURIComponent(subjectLine + " - from " + sName) +
            "&body=" + body;
          var waLink = "https://wa.me/27608175627?text=" +
            encodeURIComponent("Hi Tiyani, my name is " + sName + ". " + sMessage);

          // Replace form with success state
          cForm.innerHTML =
            '<div style="text-align:center;padding:16px 0;">' +
              '<div style="font-size:2.5rem;margin-bottom:8px;">&#x2705;</div>' +
              '<strong style="font-size:1rem;color:#10b981;">Message Ready!</strong>' +
              '<p style="font-size:.82rem;color:#64748b;margin:8px 0;">Choose how you want to send your message:</p>' +
              '<a href="' + mailtoLink + '" target="_blank" ' +
                'style="display:inline-block;background:linear-gradient(135deg,#e63946,#ff6b6b);color:#fff;' +
                'padding:12px 24px;border-radius:12px;text-decoration:none;font-weight:700;font-size:.9rem;' +
                'transition:all .2s;margin-bottom:8px;" ' +
                'onmouseenter="this.style.transform=\'translateY(-2px)\';this.style.boxShadow=\'0 4px 16px rgba(230,57,70,0.4)\'" ' +
                'onmouseleave="this.style.transform=\'\';this.style.boxShadow=\'\'">' +
                '&#x1F4E7; Open Email Client' +
              '</a>' +
              '<div style="margin-top:12px;display:flex;gap:8px;justify-content:center;flex-wrap:wrap;">' +
                '<a href="' + waLink + '" target="_blank" ' +
                  'style="background:#25d366;color:#fff;padding:8px 16px;border-radius:10px;' +
                  'text-decoration:none;font-size:.82rem;font-weight:600;">' +
                  '&#x1F4AC; Send via WhatsApp' +
                '</a>' +
                '<a href="' + portfolio.linkedin + '" target="_blank" ' +
                  'style="background:#0077b5;color:#fff;padding:8px 16px;border-radius:10px;' +
                  'text-decoration:none;font-size:.82rem;font-weight:600;">' +
                  '&#x1F517; Connect on LinkedIn' +
                '</a>' +
              '</div>' +
            '</div>';

          // Confirmation message
          setTimeout(function () {
            addMessage(
              "**Message prepared for Tiyani!**\n\n**From:** " + sName + " (" + sEmail + ")\n" +
              "**Subject:** " + subjectLine + "\n" +
              "**Message:** " + sMessage + "\n\n" +
              "Click a button above to send via Email, WhatsApp, or LinkedIn. Tiyani typically responds within 24 hours!",
              "bot"
            );
            showSuggestions(["Projects", "Skills", "Certifications"]);
          }, 500);
        });
      }, 50);
    }

    function escapeHtml(str) {
      var d = document.createElement("div");
      d.textContent = str;
      return d.innerHTML;
    }

    function showTyping() {
      var typing = document.createElement("div");
      typing.className = "ai-typing";
      typing.id = "ai-typing-indicator";
      typing.innerHTML = "<span></span><span></span><span></span>";
      messagesEl.appendChild(typing);
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function hideTyping() {
      var t = document.getElementById("ai-typing-indicator");
      if (t) t.remove();
    }

    function showSuggestions(chips) {
      suggestionsEl.innerHTML = "";
      chips.forEach(function (text) {
        var chip = document.createElement("span");
        chip.className = "ai-suggestion-chip";
        chip.textContent = text;
        chip.addEventListener("click", function () { handleUserInput(text); });
        suggestionsEl.appendChild(chip);
      });
    }

    function handleUserInput(text) {
      addMessage(text, "user");
      showTyping();
      suggestionsEl.innerHTML = "";

      var delay = 400 + Math.random() * 600;
      setTimeout(function () {
        hideTyping();
        var response = getResponse(text);
        addMessage(response, "bot");

        // Show contextual follow-up suggestions (skip for form/card)
        if (response !== "__CONTACT_CARD__" && response !== "__CONTACT_FORM__") {
          showSuggestions(getFollowUpSuggestions(text));
        }
      }, delay);
    }

    function getFollowUpSuggestions(lastQuestion) {
      var lower = lastQuestion.toLowerCase();
      if (/project|built|app/i.test(lower)) return ["AI Projects", "Services", "Contact Tiyani", "Testimonials"];
      if (/skill|tech/i.test(lower)) return ["Projects", "Services", "Contact Tiyani"];
      if (/edu|school|diploma/i.test(lower)) return ["Certifications", "Experience", "Contact Tiyani"];
      if (/certif|award/i.test(lower)) return ["Education", "Projects", "Hire Tiyani"];
      if (/contact|email|phone|whatsapp|message/i.test(lower)) return ["Send a message", "Services", "Availability"];
      if (/ai|ml|nlp|data/i.test(lower)) return ["Resume Analyzer", "Services", "Contact Tiyani"];
      if (/cloud|aws|azure/i.test(lower)) return ["Certifications", "Services", "Contact Tiyani"];
      if (/hire|avail|recruit|job|freelanc/i.test(lower)) return ["Send a message", "Services", "Skills"];
      if (/service|offer/i.test(lower)) return ["Projects", "Contact Tiyani", "Send a message"];
      if (/testimonial|review|feedback/i.test(lower)) return ["Services", "Projects", "Contact Tiyani"];
      return ["Skills", "Projects", "Services", "Contact Tiyani"];
    }

    // ── Event Handlers ────────────────────────────────────────────────
    fab.addEventListener("click", function () {
      isOpen = !isOpen;
      chatWindow.classList.toggle("open", isOpen);
      fab.style.display = isOpen ? "none" : "flex";
      if (isOpen && messagesEl.children.length === 0) {
        addMessage(
          "**Hi! I'm Tiyani's AI assistant.**\n\nI know everything about his portfolio \u2014 skills, projects, certifications, and more.\n\nI can also help you **contact Tiyani** directly \u2014 just say \"contact\" or \"send a message\"!\n\nHow can I help you today?",
          "bot"
        );
        showSuggestions(["About Tiyani", "Skills", "Projects", "Services", "Testimonials", "Contact Tiyani", "Send a message"]);
        input.focus();
      }
    });

    document.getElementById("ai-chat-close").addEventListener("click", function () {
      isOpen = false;
      chatWindow.classList.remove("open");
      fab.style.display = "flex";
    });

    formEl.addEventListener("submit", function (e) {
      e.preventDefault();
      var text = input.value.trim();
      if (!text) return;
      input.value = "";
      handleUserInput(text);
    });

    // Close on Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && isOpen) {
        isOpen = false;
        chatWindow.classList.remove("open");
        fab.style.display = "flex";
      }
    });
  }

  // ── Initialize ──────────────────────────────────────────────────────
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createChatWidget);
  } else {
    createChatWidget();
  }
})();
