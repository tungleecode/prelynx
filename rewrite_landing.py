import re

with open("src/app/page.tsx", "r") as f:
    content = f.read()

# 1. Replace Hero & Analytics grid
old_hero = """      {/* 0. Hero & Analytics (Bento Grid) */}
      <section className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Block 1: Hero */}
        <div className="lg:col-span-3 clay-card rounded-lg p-10 flex flex-col justify-center items-center text-center gap-6 anim-glow relative overflow-hidden">
          <h2 className="text-5xl font-extrabold leading-tight z-10 text-[var(--color-maroon)]">
            Làm chủ tiếng Anh <br/> với phong cách của bạn
          </h2>
          <p className="text-lg opacity-80 max-w-xl z-10 font-medium">
            Hơn 2,800 bài học IELTS, SAT và tiếng Anh giao tiếp được thiết kế trực quan, sinh động.
          </p>
          <button 
            onClick={() => window.dispatchEvent(new Event("open-login"))}
            className="clay-btn px-8 py-4 rounded-md text-xl font-black mt-4 hover-bounce z-10"
          >
            Bắt đầu học ngay
          </button>
        </div>

        {/* Block 2: Analytics Dashboard */}
        <div className="lg:col-span-2 w-full flex items-center justify-center">
          <div className="transform scale-[0.85] origin-center w-full">
            <AnalyticsDashboard />
          </div>
        </div>
      </section>"""

new_hero = """      {/* 0. Hero */}
      <section className="w-full max-w-5xl flex flex-col justify-center items-center text-center gap-8 py-20 mt-10 relative">
        <h1 className="text-6xl md:text-7xl font-black leading-[1.1] text-[var(--color-maroon)]">
          Làm chủ tiếng Anh <br/> với phong cách của bạn
        </h1>
        <p className="text-xl md:text-2xl opacity-80 max-w-3xl font-bold">
          Hơn 2,800 bài học IELTS, SAT và tiếng Anh giao tiếp được thiết kế trực quan, sinh động.
        </p>
        <button 
          onClick={() => window.dispatchEvent(new Event("open-login"))}
          className="clay-btn px-12 py-5 rounded-2xl text-2xl font-black mt-4 hover-bounce z-10"
        >
          Bắt đầu học ngay
        </button>
      </section>

      {/* 0.5 Analytics Dashboard */}
      <section className="w-full max-w-5xl relative z-10 mb-10 -mt-8">
        <div className="w-full anim-float">
          <AnalyticsDashboard />
        </div>
      </section>"""

content = content.replace(old_hero, new_hero)

# 2. Fix Stats cards
old_stats = """        {stats.map((s) => (
          <div key={s.label} className="clay-card rounded-lg p-8 flex flex-col items-center text-center gap-3 anim-float">
            <div className="w-14 h-14 rounded-md clay-btn flex items-center justify-center">
              <Icon d={s.d} className={`w-7 h-7 ${s.color}`} />
            </div>
            <h3 className="text-3xl md:text-4xl font-black text-[var(--color-maroon)]">{s.value}</h3>
            <p className="font-bold">{s.label}</p>
            <p className="text-sm opacity-60">{s.note}</p>
          </div>
        ))}"""

new_stats = """        {stats.map((s) => (
          <div key={s.label} className="p-8 flex flex-col items-center text-center gap-3 anim-float">
            <div className="w-16 h-16 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center justify-center mb-2">
              <Icon d={s.d} className={`w-8 h-8 ${s.color}`} />
            </div>
            <h3 className="text-4xl md:text-5xl font-black text-[var(--color-maroon)]">{s.value}</h3>
            <p className="font-black text-lg">{s.label}</p>
            <p className="text-base font-bold opacity-60">{s.note}</p>
          </div>
        ))}"""

content = content.replace(old_stats, new_stats)

# 3. Fix Steps cards
old_steps = """        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((s) => (
            <div key={s.n} className="clay-card rounded-lg p-8 flex flex-col gap-4 hover-bounce">
              <div className="w-14 h-14 rounded-full clay-btn flex items-center justify-center font-black text-2xl text-[var(--color-maroon)] shadow-inner">
                {s.n}
              </div>
              <h3 className="font-black text-xl">{s.title}</h3>
              <p className="opacity-70 leading-relaxed font-medium">{s.desc}</p>
            </div>
          ))}
        </div>"""

new_steps = """        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 relative">
          {steps.map((s) => (
            <div key={s.n} className="flex flex-col gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[var(--color-maroon)] text-white flex items-center justify-center font-black text-3xl shadow-lg">
                {s.n}
              </div>
              <h3 className="font-black text-2xl">{s.title}</h3>
              <p className="opacity-70 leading-relaxed font-bold text-lg">{s.desc}</p>
            </div>
          ))}
        </div>"""

content = content.replace(old_steps, new_steps)

# 4. Fix Features cards
old_features = """        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              onClick={() => setActiveGuide({ title: f.title, description: f.detail, svg: <Icon d={f.d} className={`w-10 h-10 ${f.color}`} /> })}
              className="clay-card rounded-lg p-8 flex flex-col gap-5 hover-tilt cursor-pointer"
            >
              <div className="w-16 h-16 rounded-md clay-btn flex items-center justify-center">
                <Icon d={f.d} className={`w-8 h-8 ${f.color}`} />
              </div>
              <h3 className="font-black text-2xl leading-snug">{f.title}</h3>
              <p className="opacity-70 leading-relaxed font-medium">{f.desc}</p>
              <p className="font-bold text-sm text-[var(--color-maroon)] mt-auto">Xem chi tiết</p>
            </div>
          ))}
        </div>"""

new_features = """        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((f) => (
            <div
              key={f.title}
              onClick={() => setActiveGuide({ title: f.title, description: f.detail, svg: <Icon d={f.d} className={`w-10 h-10 ${f.color}`} /> })}
              className="flex flex-col gap-5 cursor-pointer group p-4 rounded-2xl hover:bg-black/5 transition-colors"
            >
              <div className="w-16 h-16 rounded-2xl bg-white border-2 border-gray-200 flex items-center justify-center group-hover:-translate-y-2 transition-transform duration-300">
                <Icon d={f.d} className={`w-8 h-8 ${f.color}`} />
              </div>
              <h3 className="font-black text-2xl leading-snug group-hover:text-[var(--color-maroon)] transition-colors">{f.title}</h3>
              <p className="opacity-70 leading-relaxed font-bold text-lg">{f.desc}</p>
              <p className="font-black text-[var(--color-maroon)] mt-auto group-hover:underline">Xem chi tiết →</p>
            </div>
          ))}
        </div>"""

content = content.replace(old_features, new_features)

# 5. Fix Resources cards
old_resources = """        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((r) => (
            <div
              key={r.title}
              onClick={() => setActiveGuide({ title: r.title, description: r.desc, svg: <Icon d={r.d} className={`w-10 h-10 ${r.color}`} /> })}
              className="clay-card rounded-lg p-6 flex items-center gap-5 hover-wobble cursor-pointer"
            >
              <div className="w-14 h-14 shrink-0 rounded-md clay-btn flex items-center justify-center">
                <Icon d={r.d} className={`w-7 h-7 ${r.color}`} />
              </div>
              <div>
                <h3 className="font-black text-lg leading-snug">{r.title}</h3>
                <p className="text-sm opacity-70 mt-1 font-medium">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>"""

new_resources = """        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((r) => (
            <div
              key={r.title}
              onClick={() => setActiveGuide({ title: r.title, description: r.desc, svg: <Icon d={r.d} className={`w-10 h-10 ${r.color}`} /> })}
              className="flex items-start gap-5 cursor-pointer group p-6 rounded-2xl hover:bg-black/5 transition-colors"
            >
              <div className="w-16 h-16 shrink-0 rounded-2xl bg-white border-2 border-gray-200 flex items-center justify-center group-hover:rotate-12 transition-transform">
                <Icon d={r.d} className={`w-8 h-8 ${r.color}`} />
              </div>
              <div>
                <h3 className="font-black text-xl leading-snug group-hover:text-[var(--color-maroon)] transition-colors">{r.title}</h3>
                <p className="text-base opacity-70 mt-2 font-bold">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>"""

content = content.replace(old_resources, new_resources)


with open("src/app/page.tsx", "w") as f:
    f.write(content)
