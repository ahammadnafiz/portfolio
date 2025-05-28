
const skillsData = [
  {
    category: "Programming Languages",
    skills: [
      { name: "C++", icon: "devicon-cplusplus-plain" },
      { name: "Python", icon: "devicon-python-plain" },
    ]
  },
  {
    category: "AI & Deep Learning Frameworks",
    skills: [
      { name: "FastAPI", icon: "devicon-fastapi-plain" },
      { name: "LangChain", icon: "🧠" },
      { name: "Matplotlib", icon: "devicon-matplotlib-plain" },
      { name: "NumPy", icon: "devicon-numpy-plain" },
      { name: "OpenCV", icon: "devicon-opencv-plain" },
      { name: "Pandas", icon: "devicon-pandas-plain" },
      { name: "PyTorch", icon: "devicon-pytorch-original" },
      { name: "Scikit-learn", icon: "devicon-scikitlearn-plain" },
      { name: "Seaborn", icon: "devicon-plotly-plain" },
      { name: "Streamlit", icon: "devicon-streamlit-plain" },
      { name: "TensorFlow", icon: "devicon-tensorflow-original" },
    ]
  },
  {
    category: "Others",
    skills: [
      { name: "Git", icon: "devicon-git-plain" },
      { name: "Linux", icon: "devicon-linux-plain" },
      { name: "Neovim", icon: "devicon-neovim-plain" },
      { name: "VS Code", icon: "devicon-vscode-plain" },
    ]
  }
]

export function Skills() {
  return (
    <section id="skills" className="py-16 sm:py-20 lg:py-24 bg-background relative">
      {/* Center content container */}
      <div className="flex justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl text-center relative">
          {/* Left decorative element */}
          <div className="hidden lg:flex absolute -left-16 xl:-left-20 top-1/2 transform -translate-y-1/2">
            <div className="w-6 h-6 lg:w-8 lg:h-8 border-2 border-accent opacity-30 animate-pulse"></div>
          </div>
          
          {/* Right decorative element */}
          <div className="hidden lg:flex absolute -right-16 xl:-right-20 top-1/2 transform -translate-y-1/2">
            <div className="w-6 h-6 lg:w-8 lg:h-8 bg-accent opacity-20 animate-pulse"></div>
          </div>
          <div className="mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-mono font-bold mb-4 uppercase">
              <span className="text-accent">T</span>ech & <span className="text-accent">S</span>tack
            </h2>
          </div>

          <div className="space-y-12 sm:space-y-16">
            {skillsData.map((category) => (
              <div key={category.category} className="space-y-6 sm:space-y-8">
                <h3 className="text-xl sm:text-2xl font-mono font-bold text-accent uppercase tracking-wider">
                  {category.category}
                </h3>
                
                <div className="flex flex-wrap justify-center gap-6 sm:gap-8 lg:gap-10">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="flex flex-col items-center group hover:scale-105 transition-transform duration-200 w-20 sm:w-24 lg:w-28">
                      <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mb-3 sm:mb-4 text-white group-hover:text-accent transition-colors duration-200">
                        {skill.icon.startsWith('devicon-') ? (
                          <i className={`${skill.icon} text-2xl sm:text-3xl lg:text-4xl`}></i>
                        ) : (
                          <span className="text-2xl sm:text-3xl lg:text-4xl filter grayscale">{skill.icon}</span>
                        )}
                      </div>
                      <span className="font-mono text-xs sm:text-sm text-foreground leading-tight group-hover:text-accent transition-colors duration-200 text-center">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
