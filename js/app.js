(function () {
  const STORAGE_KEY = "it_sysadmin_4weeks_progress_v1";

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        return {
          completedLessons: parsed.completedLessons || [],
          masteredTerms: parsed.masteredTerms || [],
          checkedGradCriteria: parsed.checkedGradCriteria || [],
          lessonNotes: parsed.lessonNotes || {},
          interviewDrafts: parsed.interviewDrafts || {},
          aiAuditReports: parsed.aiAuditReports || {},
          revealedTrapAnswers: parsed.revealedTrapAnswers || {},
          quizAnswers: parsed.quizAnswers || {},
          lastLessonId: parsed.lastLessonId || 1,
          theme: parsed.theme || "dark"
        };
      }
    } catch (e) {
      console.warn("Could not read state from localStorage", e);
    }
    return {
      completedLessons: [],
      masteredTerms: [],
      checkedGradCriteria: [],
      lessonNotes: {},
      interviewDrafts: {},
      aiAuditReports: {},
      revealedTrapAnswers: {},
      quizAnswers: {},
      lastLessonId: 1,
      theme: "dark"
    };
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn("Could not save state", e);
    }
  }

  const state = loadState();

  function getAllLessons() {
    const w1 = window.WEEK1_DATA || [];
    const w2 = window.WEEK2_DATA || [];
    const w3 = window.WEEK3_DATA || [];
    const w4 = window.WEEK4_DATA || [];
    return [...w1, ...w2, ...w3, ...w4].sort((a, b) => a.id - b.id);
  }

  function escapeHtml(str) {
    if (str === null || str === undefined) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function getPriorityBadgeClass(p) {
    if (!p) return "badge-p1";
    const up = p.toUpperCase();
    if (up === "P0") return "badge-p0";
    if (up === "P1") return "badge-p1";
    if (up === "P2") return "badge-p2";
    if (up === "LAB") return "badge-lab";
    return "badge-mock";
  }

  const app = {
    currentView: "dashboard",
    currentLessonId: state.lastLessonId || 1,
    currentLevelFilter: "all",
    currentPacketScenarioIdx: 1, // default to Inter-VLAN (the core interview scenario)
    currentPacketHopIdx: 0,
    ntfsCalc: {
      sharePerm: "Read",
      ntfsPerm: "Full Control"
    },
    raidCalc: {
      type: "SHR",
      disks: 4,
      diskSizeTB: 4
    },
    glossaryFilter: "all",
    activeTimerTermId: null,
    timerSecondsLeft: 30,
    timerInterval: null,

    init() {
      document.documentElement.setAttribute("data-theme", state.theme);
      this.renderSidebar();
      this.updateProgressUI();
      this.showView("dashboard");
    },

    toggleTheme() {
      state.theme = state.theme === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", state.theme);
      saveState();
    },

    updateProgressUI() {
      const lessons = getAllLessons();
      const total = lessons.length || 24;
      const done = state.completedLessons.length;
      const pct = Math.round((done / total) * 100);

      const textEl = document.getElementById("sidebar-progress-text");
      const barEl = document.getElementById("sidebar-progress-bar");
      const termsEl = document.getElementById("sidebar-terms-count");
      const gradEl = document.getElementById("sidebar-grad-count");

      if (textEl) textEl.textContent = `${done} / ${total} buổi (${pct}%)`;
      if (barEl) barEl.style.width = `${pct}%`;
      if (termsEl) termsEl.textContent = `Thuật ngữ 30s: ${state.masteredTerms.length}/30`;

      // Auto-calculate or combine graduation criteria
      const autoGradCount = this.getCompletedGraduationCount();
      if (gradEl) gradEl.textContent = `Chuẩn đầu ra: ${autoGradCount}/5`;
    },

    getCompletedGraduationCount() {
      let count = 0;
      const criteria = window.COURSE_META.graduationCriteria;
      criteria.forEach((c) => {
        if (state.checkedGradCriteria.includes(c.id)) {
          count++;
        } else if (c.id === "crit-def" && state.masteredTerms.length >= 24) {
          count++;
        } else if (c.id === "crit-lab") {
          const labs = [6, 12, 18];
          if (labs.every((id) => state.completedLessons.includes(id))) count++;
        }
      });
      return count;
    },

    renderSidebar() {
      const container = document.getElementById("sidebar-weeks-container");
      if (!container) return;
      const lessons = getAllLessons();
      const weeks = window.COURSE_META.weeksOverview;

      container.innerHTML = weeks
        .map((w) => {
          const weekLessons = lessons.filter((l) => l.week === w.week);
          const doneCount = weekLessons.filter((l) =>
            state.completedLessons.includes(l.id)
          ).length;

          return `
            <div class="week-group">
              <button class="week-header-btn" onclick="app.toggleWeekGroup(${w.week})">
                <span>Tuần ${w.week} (${doneCount}/${weekLessons.length})</span>
                <span style="font-size:11px; color:var(--text-muted);">▼</span>
              </button>
              <ul class="week-lessons-list" id="week-list-${w.week}">
                ${weekLessons
                  .map((l) => {
                    const isDone = state.completedLessons.includes(l.id);
                    const isActive =
                      this.currentView === "lesson" &&
                      this.currentLessonId === l.id;
                    return `
                      <li>
                        <button
                          class="lesson-nav-item ${isDone ? "completed" : ""} ${
                      isActive ? "active" : ""
                    }"
                          onclick="app.openLesson(${l.id})"
                        >
                          <span class="lesson-code-pill">${
                            isDone ? "✓ " : ""
                          }${escapeHtml(l.code)}</span>
                          <span style="flex:1; line-height:1.35;">${escapeHtml(
                            l.title
                          )}</span>
                          <span class="badge ${getPriorityBadgeClass(
                            l.priority
                          )}" style="font-size:10px; padding:1px 5px;">${escapeHtml(
                      l.priority
                    )}</span>
                        </button>
                      </li>
                    `;
                  })
                  .join("")}
              </ul>
            </div>
          `;
        })
        .join("");
    },

    toggleWeekGroup(weekNum) {
      const el = document.getElementById(`week-list-${weekNum}`);
      if (!el) return;
      el.style.display = el.style.display === "none" ? "block" : "none";
    },

    setActiveNavBtn(viewName) {
      ["dashboard", "blueprint", "simulators", "glossary", "labs"].forEach(
        (v) => {
          const btn = document.getElementById(`nav-${v}`);
          if (btn) {
            btn.classList.toggle("active", v === viewName);
          }
        }
      );
    },

    showView(viewName) {
      this.currentView = viewName;
      this.setActiveNavBtn(viewName);
      this.renderSidebar();
      const main = document.getElementById("main-view-container");
      if (!main) return;

      if (viewName === "dashboard") {
        this.renderDashboard(main);
      } else if (viewName === "blueprint") {
        this.renderBlueprint(main);
      } else if (viewName === "simulators") {
        this.renderSimulators(main);
      } else if (viewName === "glossary") {
        this.renderGlossary(main);
      } else if (viewName === "labs") {
        this.renderLabsAndGraduation(main);
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    },

    openLesson(lessonId, levelFilter) {
      this.currentView = "lesson";
      this.currentLessonId = Number(lessonId);
      this.currentLevelFilter = levelFilter || "all";
      state.lastLessonId = this.currentLessonId;
      saveState();

      this.setActiveNavBtn("");
      this.renderSidebar();

      const main = document.getElementById("main-view-container");
      if (main) {
        this.renderLesson(main, this.currentLessonId);
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    },

    handleSearch(query) {
      const drawer = document.getElementById("search-results-drawer");
      if (!drawer) return;
      const q = (query || "").trim().toLowerCase();
      if (!q) {
        drawer.style.display = "none";
        drawer.innerHTML = "";
        return;
      }

      const lessons = getAllLessons();
      const matchedLessons = lessons.filter(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          l.subtitle.toLowerCase().includes(q) ||
          l.whyThisMatters.toLowerCase().includes(q) ||
          (l.level1_definitions?.concepts || []).some(
            (c) =>
              c.term.toLowerCase().includes(q) ||
              c.easyExplain.toLowerCase().includes(q)
          )
      );

      const matchedTerms = (window.COURSE_META.glossary30 || []).filter(
        (t) =>
          t.term.toLowerCase().includes(q) ||
          t.def30s.toLowerCase().includes(q)
      );

      drawer.style.display = "block";
      drawer.innerHTML = `
        <div class="card" style="border-color:var(--accent-blue);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
            <strong>🔍 Kết quả tìm kiếm cho "${escapeHtml(query)}" (${
        matchedLessons.length
      } bài học, ${matchedTerms.length} thuật ngữ)</strong>
            <button class="btn" onclick="document.getElementById('global-search-input').value=''; app.handleSearch('');">Đóng ✕</button>
          </div>
          ${
            matchedLessons.length > 0
              ? `<div style="margin-bottom:10px;">
                  <div style="font-size:12px; color:var(--text-muted); margin-bottom:6px; font-weight:700;">BÀI HỌC LIÊN QUAN:</div>
                  <div style="display:flex; flex-wrap:wrap; gap:8px;">
                    ${matchedLessons
                      .map(
                        (l) => `
                        <button class="btn" onclick="app.handleSearch(''); document.getElementById('global-search-input').value=''; app.openLesson(${
                          l.id
                        });">
                          <span class="badge ${getPriorityBadgeClass(
                            l.priority
                          )}">Bài ${escapeHtml(l.code)}</span>
                          <span>${escapeHtml(l.title)}</span>
                        </button>
                      `
                      )
                      .join("")}
                  </div>
                </div>`
              : ""
          }
          ${
            matchedTerms.length > 0
              ? `<div>
                  <div style="font-size:12px; color:var(--text-muted); margin-bottom:6px; font-weight:700;">THUẬT NGỮ 30 GIÂY:</div>
                  <div style="display:grid; gap:8px;">
                    ${matchedTerms
                      .slice(0, 4)
                      .map(
                        (t) => `
                        <div style="padding:10px; background:var(--bg-elevated); border-radius:8px; border:1px solid var(--border-color); font-size:13px;">
                          <strong style="color:var(--accent-blue);">${escapeHtml(
                            t.term
                          )}:</strong> ${escapeHtml(t.def30s)}
                        </div>
                      `
                      )
                      .join("")}
                  </div>
                </div>`
              : ""
          }
        </div>
      `;
    },

    /* ==================== VIEW 1: DASHBOARD ==================== */
    renderDashboard(container) {
      const meta = window.COURSE_META;
      const lessons = getAllLessons();
      const resumeLesson =
        lessons.find((l) => l.id === state.lastLessonId) || lessons[0];

      container.innerHTML = `
        <div class="hero-banner">
          <span class="badge badge-mock">${escapeHtml(meta.badge)}</span>
          <h1 class="hero-title">Giáo trình ${escapeHtml(meta.title)} — 4 tuần</h1>
          <p style="font-size:15.5px; color:var(--text-secondary); max-width:850px;">
            <strong>${escapeHtml(meta.tagline)}</strong>. Mỗi buổi 60–90 phút (khung chuẩn 75 phút), học 6 buổi/tuần, 1 ngày nghỉ hoặc ôn lại.
          </p>

          <div class="stats-grid">
            ${meta.stats
              .map(
                (s) => `
                <div class="stat-box">
                  <div class="stat-value">${escapeHtml(s.value)}</div>
                  <div class="stat-label">${escapeHtml(s.label)}</div>
                  <div class="stat-sub">${escapeHtml(s.sub)}</div>
                </div>
              `
              )
              .join("")}
          </div>

          <div style="margin-top:20px; padding:16px; background:var(--bg-card); border-radius:10px; border-left:4px solid var(--accent-amber);">
            <div style="font-weight:800; color:var(--accent-amber); margin-bottom:4px;">
              💡 ${escapeHtml(meta.corePhilosophy.highlight)}
            </div>
            <div style="font-size:13.5px; color:var(--text-secondary);">
              ${escapeHtml(meta.corePhilosophy.detail)}
            </div>
          </div>

          <div style="display:flex; flex-wrap:wrap; gap:12px; margin-top:20px;">
            <button class="btn btn-primary" onclick="app.openLesson(1)">
              🚀 Bắt đầu từ Bài 01: IP, Subnet, Gateway, DNS & DHCP
            </button>
            ${
              resumeLesson && resumeLesson.id !== 1
                ? `<button class="btn btn-success" onclick="app.openLesson(${resumeLesson.id})">
                    ▶️ Học tiếp Bài ${escapeHtml(resumeLesson.code)}: ${escapeHtml(resumeLesson.title)}
                  </button>`
                : ""
            }
            <button class="btn" onclick="app.showView('simulators')">
              🔬 Mở Mô Phỏng Gói Tin (VLAN vs Routing vs NAT)
            </button>
            <button class="btn" onclick="app.showView('glossary')">
              ⚡ Luyện 30 Thuật Ngữ trong 30 Giây
            </button>
          </div>
        </div>

        <!-- I. Chẩn đoán lỗ hổng sau phỏng vấn -->
        <div class="card">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
            <div>
              <h2 style="font-size:20px; font-weight:800;">I. Chẩn đoán lỗ hổng sau phỏng vấn</h2>
              <p style="font-size:13.5px; color:var(--text-muted);">
                Những ưu tiên rút ra từ chính câu trả lời phỏng vấn của cậu — bấm vào từng bài học để lấp ngay lỗ hổng tương ứng.
              </p>
            </div>
            <div style="display:flex; gap:8px;">
              <span class="badge badge-p0">P0: Bắt buộc sửa ngay</span>
              <span class="badge badge-p1">P1: Củng cố nguyên lý</span>
              <span class="badge badge-p2">P2: Chuẩn hóa thế mạnh</span>
            </div>
          </div>

          <div class="table-wrap">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Nhóm kiến thức</th>
                  <th>Hiện trạng qua phỏng vấn</th>
                  <th>Ưu tiên</th>
                  <th>Phân tích nguyên nhân & Hướng khắc phục</th>
                  <th>Bài học giải quyết</th>
                </tr>
              </thead>
              <tbody>
                ${meta.diagnostics
                  .map(
                    (d) => `
                    <tr>
                      <td style="font-weight:700; color:var(--text-main);">${escapeHtml(
                        d.group
                      )}</td>
                      <td>${escapeHtml(d.status)}</td>
                      <td><span class="badge ${getPriorityBadgeClass(
                        d.priority
                      )}">${escapeHtml(d.priority)}</span></td>
                      <td style="color:var(--text-secondary); font-size:13px;">${escapeHtml(
                        d.gapAnalysis
                      )}</td>
                      <td>
                        <div style="display:flex; flex-wrap:wrap; gap:5px;">
                          ${d.relatedLessons
                            .map((id) => {
                              const code = String(id).padStart(2, "0");
                              const done = state.completedLessons.includes(id);
                              return `<button class="btn" style="padding:3px 8px; font-size:11.5px; ${
                                done
                                  ? "border-color:var(--accent-emerald); color:var(--accent-emerald);"
                                  : ""
                              }" onclick="app.openLesson(${id})">${
                                done ? "✓ " : ""
                              }Bài ${code}</button>`;
                            })
                            .join("")}
                        </div>
                      </td>
                    </tr>
                  `
                  )
                  .join("")}
              </tbody>
            </table>
          </div>
        </div>

        <!-- II. Lộ trình học chi tiết 4 Tuần (24 buổi) -->
        <div class="card">
          <h2 style="font-size:20px; font-weight:800; margin-bottom:6px;">II. Lộ trình học chi tiết — 4 Tuần (24 Buổi)</h2>
          <p style="font-size:13.5px; color:var(--text-muted); margin-bottom:18px;">
            Bấm vào bất kỳ buổi học nào để mở bài giảng chi tiết theo cấu trúc 4 Cấp độ (Định nghĩa -> Nguyên lý -> Thực hành -> Phỏng vấn).
          </p>

          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(460px, 1fr)); gap:18px;">
            ${meta.weeksOverview
              .map((w) => {
                const wLessons = lessons.filter((l) => l.week === w.week);
                return `
                  <div style="background:var(--bg-elevated); border:1px solid var(--border-color); border-radius:12px; padding:18px;">
                    <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
                      <div>
                        <div style="font-size:16px; font-weight:800; color:var(--accent-blue);">${escapeHtml(
                          w.title
                        )}</div>
                        <div style="font-size:13px; font-weight:600; color:var(--accent-amber);">${escapeHtml(
                          w.subtitle
                        )}</div>
                      </div>
                    </div>
                    <p style="font-size:12.5px; color:var(--text-muted); margin-bottom:12px;">${escapeHtml(
                      w.focus
                    )}</p>
                    <div style="display:flex; flex-direction:column; gap:8px;">
                      ${wLessons
                        .map((l) => {
                          const isDone = state.completedLessons.includes(l.id);
                          return `
                            <div
                              onclick="app.openLesson(${l.id})"
                              style="cursor:pointer; padding:10px 12px; border-radius:8px; background:var(--bg-card); border:1px solid ${
                                isDone
                                  ? "var(--accent-emerald)"
                                  : "var(--border-color)"
                              }; display:flex; align-items:center; gap:10px; transition:all 0.15s;"
                            >
                              <span class="lesson-code-pill" style="${
                                isDone
                                  ? "background:var(--accent-emerald-bg); color:var(--accent-emerald); border-color:var(--accent-emerald);"
                                  : ""
                              }">${isDone ? "✓ " : ""}${escapeHtml(l.code)}</span>
                              <div style="flex:1; min-width:0;">
                                <div style="font-size:13.5px; font-weight:700; color:var(--text-main);">${escapeHtml(
                                  l.title
                                )}</div>
                                <div style="font-size:12px; color:var(--text-muted);">${escapeHtml(
                                  l.subtitle
                                )}</div>
                              </div>
                              <span class="badge ${getPriorityBadgeClass(
                                l.priority
                              )}">${escapeHtml(l.priority)}</span>
                            </div>
                          `;
                        })
                        .join("")}
                    </div>
                  </div>
                `;
              })
              .join("")}
          </div>
        </div>

        <!-- III. Khung một buổi học 75 phút -->
        <div class="card">
          <h2 style="font-size:20px; font-weight:800; margin-bottom:6px;">III. Phương pháp học: Khung chuẩn 75 phút / buổi</h2>
          <p style="font-size:13.5px; color:var(--text-muted); margin-bottom:16px;">
            Vì cậu quen thực hành hơn học thuộc lòng, cả 24 bài giảng trong ứng dụng này đều được thiết kế theo đúng 4 cấp độ:
          </p>
          <div class="stats-grid" style="margin-top:0;">
            ${meta.sessionStructure
              .map(
                (s) => `
                <div class="stat-box" style="border-top:3px solid var(--accent-blue);">
                  <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span class="badge badge-mock">${escapeHtml(s.level)}</span>
                    <span style="font-weight:800; color:var(--accent-amber);">${
                      s.minutes
                    } phút</span>
                  </div>
                  <div style="font-size:15px; font-weight:800; margin:8px 0 4px;">${escapeHtml(
                    s.title
                  )}</div>
                  <div style="font-size:12.5px; color:var(--text-secondary);">${escapeHtml(
                    s.desc
                  )}</div>
                </div>
              `
              )
              .join("")}
          </div>
        </div>
      `;
    },

    /* ==================== VIEW 2: LESSON READER ==================== */
    renderLesson(container, lessonId) {
      const lessons = getAllLessons();
      const lesson = lessons.find((l) => l.id === Number(lessonId));
      if (!lesson) {
        container.innerHTML = `<div class="card">Không tìm thấy bài học #${lessonId}.</div>`;
        return;
      }

      const isCompleted = state.completedLessons.includes(lesson.id);
      const prevLesson = lessons.find((l) => l.id === lesson.id - 1);
      const nextLesson = lessons.find((l) => l.id === lesson.id + 1);
      const lf = this.currentLevelFilter;

      const showL1 = lf === "all" || lf === "l1";
      const showL2 = lf === "all" || lf === "l2";
      const showL3 = lf === "all" || lf === "l3";
      const showL4 = lf === "all" || lf === "l4";
      const conn =
        window.SYSTEM_BLUEPRINT &&
        window.SYSTEM_BLUEPRINT.lessonConnections &&
        window.SYSTEM_BLUEPRINT.lessonConnections[lesson.id];

      container.innerHTML = `
        <!-- Lesson Header -->
        <div class="lesson-header-card">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:12px;">
            <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
              <span class="badge badge-mock">TUẦN ${lesson.week} • BÀI ${escapeHtml(
        lesson.code
      )}</span>
              <span class="badge ${getPriorityBadgeClass(
                lesson.priority
              )}">Ưu tiên: ${escapeHtml(lesson.priority)}</span>
              <span class="badge" style="background:var(--bg-elevated); border:1px solid var(--border-color);">⏱️ ${escapeHtml(
                lesson.duration
              )}</span>
            </div>

            <button
              class="btn ${isCompleted ? "btn-success" : "btn-primary"}"
              onclick="app.toggleCompleteLesson(${lesson.id})"
            >
              ${
                isCompleted
                  ? "✅ Đã hoàn thành buổi học (Bấm để bỏ đánh dấu)"
                  : "☑️ Đánh dấu Hoàn thành buổi học này"
              }
            </button>
          </div>

          <h1 style="font-size:25px; font-weight:800; margin:12px 0 4px;">
            Bài ${escapeHtml(lesson.code)}: ${escapeHtml(lesson.title)}
          </h1>
          <p style="font-size:15px; color:var(--accent-blue); font-weight:600;">
            ${escapeHtml(lesson.subtitle)}
          </p>

          <div style="margin-top:14px; padding:14px 16px; background:var(--bg-elevated); border-radius:10px; border:1px solid var(--border-color); font-size:13.5px;">
            <strong style="color:var(--accent-rose);">🎯 Chẩn đoán & Mục tiêu thực chiến của cậu:</strong>
            <div style="margin-top:4px; color:var(--text-secondary);">${escapeHtml(
              lesson.whyThisMatters
            )}</div>
          </div>

          ${
            lesson.analogy
              ? `<div class="analogy-box">
                  <div class="analogy-title">💡 Hình dung siêu dễ hiểu: ${escapeHtml(
                    lesson.analogy.title
                  )}</div>
                  <div style="font-size:13.5px; color:var(--text-main);">${escapeHtml(
                    lesson.analogy.content
                  )}</div>
                </div>`
              : ""
          }
        </div>

        <!-- SYSTEM CONNECTION & EXECUTION ORDER CARD (NO GUESSWORK NEEDED) -->
        ${
          conn
            ? `<div class="card" style="border-left:5px solid var(--accent-emerald);">
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:12px;">
                  <div>
                    <span class="badge badge-p2">🔗 MỐI LIÊN KẾT HỆ THỐNG & TRÌNH TỰ THỰC THI (KHÔNG CẦN MÒ)</span>
                    <h2 style="font-size:18px; font-weight:800; margin-top:6px; color:var(--accent-emerald);">
                      📍 Vị trí: ${escapeHtml(conn.stage)}
                    </h2>
                  </div>
                  <button class="btn" onclick="app.showView('blueprint')" style="font-size:12.5px;">
                    🏗️ Xem Bản Đồ Xây Hệ Thống 7 Tầng A–Z
                  </button>
                </div>

                <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap:14px; margin-bottom:14px;">
                  <!-- Upstream -->
                  <div style="padding:14px; background:var(--bg-elevated); border-radius:10px; border:1px solid var(--border-color);">
                    <div style="font-size:13px; font-weight:800; color:var(--accent-blue); margin-bottom:4px;">
                      ⬅️ 1. NHẬN ĐẦU VÀO TỪ ĐÂU? (Phải có gì trước bài này?)
                    </div>
                    <div style="font-size:13.5px; font-weight:700; margin-bottom:4px;">
                      ${escapeHtml(conn.upstream.title)}
                    </div>
                    <div style="font-size:13px; color:var(--text-secondary);">
                      ${escapeHtml(conn.upstream.detail)}
                    </div>
                    ${
                      conn.upstream.linkedLessons &&
                      conn.upstream.linkedLessons.length > 0
                        ? `<div style="display:flex; flex-wrap:wrap; gap:6px; margin-top:8px;">
                            ${conn.upstream.linkedLessons
                              .map(
                                (id) =>
                                  `<button class="btn" style="padding:3px 8px; font-size:11.5px;" onclick="app.openLesson(${id})">⬅️ Xem Bài ${String(
                                    id
                                  ).padStart(2, "0")}</button>`
                              )
                              .join("")}
                          </div>`
                        : ""
                    }
                  </div>

                  <!-- Downstream -->
                  <div style="padding:14px; background:var(--bg-elevated); border-radius:10px; border:1px solid var(--border-color);">
                    <div style="font-size:13px; font-weight:800; color:var(--accent-amber); margin-bottom:4px;">
                      ➡️ 2. PHỤC VỤ CHO AI ĐỨNG SAU? (Sai bước này thì cái gì sập?)
                    </div>
                    <div style="font-size:13.5px; font-weight:700; margin-bottom:4px;">
                      ${escapeHtml(conn.downstream.title)}
                    </div>
                    <div style="font-size:13px; color:var(--text-secondary);">
                      ${escapeHtml(conn.downstream.detail)}
                    </div>
                    ${
                      conn.downstream.linkedLessons &&
                      conn.downstream.linkedLessons.length > 0
                        ? `<div style="display:flex; flex-wrap:wrap; gap:6px; margin-top:8px;">
                            ${conn.downstream.linkedLessons
                              .map(
                                (id) =>
                                  `<button class="btn" style="padding:3px 8px; font-size:11.5px;" onclick="app.openLesson(${id})">➡️ Nối sang Bài ${String(
                                    id
                                  ).padStart(2, "0")}</button>`
                              )
                              .join("")}
                          </div>`
                        : ""
                    }
                  </div>
                </div>

                <!-- Step by step execution checklist -->
                <div style="padding:14px 16px; background:var(--bg-elevated); border-radius:10px; border:1px solid rgba(52, 211, 153, 0.35);">
                  <div style="font-size:13.5px; font-weight:800; color:var(--accent-emerald); margin-bottom:8px;">
                    ⚡ 3. TRÌNH TỰ THỰC THI CHUẨN NGOÀI ĐỜI THỰC (Làm đúng thứ tự này — Không cần mò):
                  </div>
                  <div style="display:grid; gap:6px; font-size:13.5px; color:var(--text-main);">
                    ${(conn.executionFlow || [])
                      .map(
                        (stepText) => `
                        <div style="padding:6px 10px; background:var(--bg-card); border-radius:6px; border:1px solid var(--border-color);">
                          ${escapeHtml(stepText)}
                        </div>
                      `
                      )
                      .join("")}
                  </div>
                </div>
              </div>`
            : ""
        }

        <!-- Sticky Level Filter Tabs -->
        <div class="lesson-level-tabs">
          <button class="level-tab-btn ${
            lf === "all" ? "active" : ""
          }" onclick="app.setLessonLevelFilter('all')">
            📖 Xem trọn vẹn (75p)
          </button>
          <button class="level-tab-btn ${
            lf === "l1" ? "active" : ""
          }" onclick="app.setLessonLevelFilter('l1')">
            Cấp 1: Định nghĩa (15p)
          </button>
          <button class="level-tab-btn ${
            lf === "l2" ? "active" : ""
          }" onclick="app.setLessonLevelFilter('l2')">
            Cấp 2: Nguyên lý & Sơ đồ (15p)
          </button>
          <button class="level-tab-btn ${
            lf === "l3" ? "active" : ""
          }" onclick="app.setLessonLevelFilter('l3')">
            Cấp 3: Thực hành Lab (30p)
          </button>
          <button class="level-tab-btn ${
            lf === "l4" ? "active" : ""
          }" onclick="app.setLessonLevelFilter('l4')">
            Cấp 4: Phỏng vấn & Quiz (15p)
          </button>
        </div>

        <!-- LEVEL 1: DEFINITIONS -->
        ${
          showL1 && lesson.level1_definitions
            ? `<section class="card">
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; margin-bottom:12px;">
                  <div>
                    <span class="badge badge-mock">CẤP 1 — 15 PHÚT</span>
                    <h2 style="font-size:20px; font-weight:800; margin-top:4px;">Định nghĩa & Thuật ngữ chuẩn phỏng vấn</h2>
                  </div>
                  <span style="font-size:12.5px; color:var(--text-muted);">Mục tiêu: Giải thích gãy gọn từng khái niệm trong 15–30 giây</span>
                </div>

                <div class="concepts-grid">
                  ${(lesson.level1_definitions.concepts || [])
                    .map(
                      (c) => `
                      <div class="concept-card">
                        <div class="concept-term">${escapeHtml(c.term)}</div>
                        <div class="concept-shortdef">
                          <strong>🗣️ Câu chốt phỏng vấn:</strong> ${escapeHtml(
                            c.shortDef
                          )}
                        </div>
                        <div class="concept-explain">${escapeHtml(
                          c.easyExplain
                        )}</div>
                        ${
                          c.realExample
                            ? `<div class="concept-example">📌 VD thực tế: ${escapeHtml(
                                c.realExample
                              )}</div>`
                            : ""
                        }
                      </div>
                    `
                    )
                    .join("")}
                </div>

                ${
                  lesson.level1_definitions.comparisonTable
                    ? `<div style="margin-top:20px;">
                        <h3 style="font-size:16px; font-weight:800; color:var(--accent-amber); margin-bottom:8px;">
                          ⚖️ ${escapeHtml(
                            lesson.level1_definitions.comparisonTable.title
                          )}
                        </h3>
                        <div class="table-wrap">
                          <table class="data-table">
                            <thead>
                              <tr>
                                ${(
                                  lesson.level1_definitions.comparisonTable
                                    .headers || []
                                )
                                  .map((h) => `<th>${escapeHtml(h)}</th>`)
                                  .join("")}
                              </tr>
                            </thead>
                            <tbody>
                              ${(
                                lesson.level1_definitions.comparisonTable
                                  .rows || []
                              )
                                .map(
                                  (row) => `
                                  <tr>
                                    ${row
                                      .map(
                                        (cell, idx) =>
                                          `<td style="${
                                            idx === 0
                                              ? "font-weight:700; color:var(--text-main);"
                                              : ""
                                          }">${escapeHtml(cell)}</td>`
                                      )
                                      .join("")}
                                  </tr>
                                `
                                )
                                .join("")}
                            </tbody>
                          </table>
                        </div>
                      </div>`
                    : ""
                }
              </section>`
            : ""
        }

        <!-- LEVEL 2: PRINCIPLES & DIAGRAMS -->
        ${
          showL2 && lesson.level2_principles
            ? `<section class="card">
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:14px;">
                  <div>
                    <span class="badge badge-lab">CẤP 2 — 15 PHÚT</span>
                    <h2 style="font-size:20px; font-weight:800; margin-top:4px;">Nguyên lý hoạt động & Sơ đồ hệ thống</h2>
                  </div>
                  ${
                    [1, 2, 3, 4, 5, 6, 9, 14, 15, 19, 21].includes(lesson.id)
                      ? `<button class="btn btn-primary" onclick="app.showView('simulators')">
                          🔬 Mở Công Cụ Mô Phỏng Trực Quan
                        </button>`
                      : ""
                  }
                </div>

                <div style="padding:16px 18px; background:var(--bg-elevated); border-radius:10px; border:1px solid var(--border-color); font-size:14px; line-height:1.7;">
                  ${lesson.level2_principles.corePrinciple || ""}
                </div>

                ${
                  lesson.level2_principles.asciiDiagram
                    ? `<div style="margin-top:18px;">
                        <h3 style="font-size:15px; font-weight:800; color:var(--accent-blue); margin-bottom:6px;">
                          🗺️ Sơ đồ Kiến trúc & Luồng hoạt động
                        </h3>
                        <pre class="code-block">${escapeHtml(
                          lesson.level2_principles.asciiDiagram
                        )}</pre>
                      </div>`
                    : ""
                }

                ${
                  lesson.level2_principles.flowSteps &&
                  lesson.level2_principles.flowSteps.length > 0
                    ? `<div style="margin-top:18px;">
                        <h3 style="font-size:16px; font-weight:800; margin-bottom:10px;">
                          🔄 ${escapeHtml(
                            lesson.level2_principles.flowTitle ||
                              "Quy trình hoạt động chi tiết từng bước"
                          )}
                        </h3>
                        <div class="flow-timeline">
                          ${lesson.level2_principles.flowSteps
                            .map(
                              (fs) => `
                              <div class="flow-step-card">
                                <div class="flow-step-header">
                                  <span class="flow-step-badge">${escapeHtml(
                                    fs.step
                                  )}</span>
                                  <strong style="font-size:14.5px;">${escapeHtml(
                                    fs.title
                                  )}</strong>
                                </div>
                                <div style="font-size:13.5px; color:var(--text-secondary);">
                                  ${escapeHtml(fs.detail)}
                                </div>
                                ${
                                  fs.packetOrState
                                    ? `<div class="flow-packet-state">🔎 ${escapeHtml(
                                        fs.packetOrState
                                      )}</div>`
                                    : ""
                                }
                              </div>
                            `
                            )
                            .join("")}
                        </div>
                      </div>`
                    : ""
                }

                ${
                  lesson.level2_principles.keyTakeaways
                    ? `<div style="margin-top:18px; padding:16px 18px; background:var(--accent-emerald-bg); border:1px solid rgba(52, 211, 153, 0.35); border-radius:10px;">
                        <div style="font-weight:800; color:var(--accent-emerald); margin-bottom:8px;">
                          🔑 Nguyên tắc cốt lõi cần khắc cốt ghi tâm:
                        </div>
                        <ul style="padding-left:20px; font-size:13.5px; display:grid; gap:6px;">
                          ${lesson.level2_principles.keyTakeaways
                            .map((k) => `<li>${escapeHtml(k)}</li>`)
                            .join("")}
                        </ul>
                      </div>`
                    : ""
                }
              </section>`
            : ""
        }

        <!-- LEVEL 3: HANDS-ON PRACTICE & TROUBLESHOOTING -->
        ${
          showL3 && lesson.level3_practice
            ? `<section class="card">
                <div style="margin-bottom:14px;">
                  <span class="badge badge-p2">CẤP 3 — 30 PHÚT</span>
                  <h2 style="font-size:20px; font-weight:800; margin-top:4px;">Thực hành Lab & Tình huống chẩn đoán bằng bằng chứng</h2>
                </div>

                <div style="padding:14px 16px; background:var(--accent-blue-bg); border-left:4px solid var(--accent-blue); border-radius:8px; font-size:14px; margin-bottom:18px;">
                  <strong>🛠️ Bối cảnh Thực hành / Tình huống:</strong> ${escapeHtml(
                    lesson.level3_practice.scenario
                  )}
                </div>

                <div style="display:flex; flex-direction:column; gap:16px;">
                  ${(lesson.level3_practice.steps || [])
                    .map(
                      (st, idx) => `
                      <div style="background:var(--bg-elevated); border:1px solid var(--border-color); border-radius:10px; padding:16px;">
                        <div style="font-size:15px; font-weight:800; color:var(--accent-blue); margin-bottom:6px;">
                          ${escapeHtml(st.title || `Bước ${idx + 1}`)}
                        </div>
                        <div style="font-size:13.5px; color:var(--text-secondary); margin-bottom:8px;">
                          ${escapeHtml(st.instruction)}
                        </div>
                        ${
                          st.commandOrConfig
                            ? `<pre class="code-block">${escapeHtml(
                                st.commandOrConfig
                              )}</pre>`
                            : ""
                        }
                        ${
                          st.explanation
                            ? `<div style="font-size:13px; color:var(--accent-emerald); margin-top:8px;">
                                💡 <strong>Cách đọc kết quả / Bằng chứng:</strong> ${escapeHtml(
                                  st.explanation
                                )}
                              </div>`
                            : ""
                        }
                      </div>
                    `
                    )
                    .join("")}
                </div>

                ${
                  lesson.level3_practice.troubleshootingChecklist &&
                  lesson.level3_practice.troubleshootingChecklist.length > 0
                    ? `<div style="margin-top:22px;">
                        <h3 style="font-size:16px; font-weight:800; color:var(--accent-amber); margin-bottom:8px;">
                          🩺 Bảng Chẩn Đoán 4 Bước (Triệu chứng ➔ Giả thuyết ➔ Phép thử ➔ Xử lý)
                        </h3>
                        <div class="table-wrap">
                          <table class="data-table">
                            <thead>
                              <tr>
                                <th>1. Triệu chứng lỗi</th>
                                <th>2. Giả thuyết nguyên lý</th>
                                <th>3. Phép thử / Lệnh kiểm tra</th>
                                <th>4. Cách sửa & Xác minh</th>
                              </tr>
                            </thead>
                            <tbody>
                              ${lesson.level3_practice.troubleshootingChecklist
                                .map(
                                  (tc) => `
                                  <tr>
                                    <td style="font-weight:700; color:var(--accent-rose);">${escapeHtml(
                                      tc.symptom
                                    )}</td>
                                    <td>${escapeHtml(tc.hypothesis)}</td>
                                    <td><code style="color:var(--accent-blue); font-family:Consolas,monospace;">${escapeHtml(
                                      tc.testCommand
                                    )}</code></td>
                                    <td style="color:var(--accent-emerald);">${escapeHtml(
                                      tc.fix
                                    )}</td>
                                  </tr>
                                `
                                )
                                .join("")}
                            </tbody>
                          </table>
                        </div>
                      </div>`
                    : ""
                }
              </section>`
            : ""
        }

        <!-- LEVEL 4: INTERVIEW & QUIZ -->
        ${
          showL4 && lesson.level4_interview
            ? `<section class="card">
                <div style="margin-bottom:14px;">
                  <span class="badge badge-p1">CẤP 4 — 15 PHÚT</span>
                  <h2 style="font-size:20px; font-weight:800; margin-top:4px;">Hỏi đáp Phỏng vấn, Phản biện & Chấm điểm</h2>
                  <p style="font-size:13px; color:var(--text-muted);">
                    Đích đến là cậu tự giải thích được bằng nguyên lý hệ thống, không chỉ trả lời nhờ nhớ máy móc ví dụ.
                  </p>
                </div>

                <h3 style="font-size:16px; font-weight:800; margin-bottom:12px;">
                  🎤 Câu hỏi Phản biện khi Phỏng vấn (AI Mentor Audit & Chấm điểm)
                </h3>

                ${(lesson.level4_interview.trapQuestions || [])
                  .map((tq, qIdx) => {
                    const draftKey = `${lesson.id}_${qIdx}`;
                    const savedDraft = state.interviewDrafts[draftKey] || "";
                    const auditReport = state.aiAuditReports[draftKey] || null;
                    const isRevealed =
                      Boolean(auditReport) ||
                      Boolean(state.revealedTrapAnswers[draftKey]);

                    let scoreClass = "score-mid";
                    if (auditReport) {
                      if (auditReport.score >= 8) scoreClass = "score-high";
                      else if (auditReport.score < 5) scoreClass = "score-low";
                    }

                    return `
                      <div class="trap-card" id="trap-card-${draftKey}">
                        <div class="trap-question">
                          ❓ Câu hỏi phỏng vấn ${qIdx + 1}: "${escapeHtml(
                      tq.question
                    )}"
                        </div>

                        <div style="margin-bottom:12px;">
                          <label style="font-size:12.5px; font-weight:700; color:var(--text-secondary);">
                            ✍️ Nhập câu trả lời của cậu (Đáp án mẫu đã được ẩn để cậu tự tư duy, sau đó bấm nút AI Audit bên dưới):
                          </label>
                          <textarea
                            id="draft-input-${draftKey}"
                            class="notes-textarea"
                            style="min-height:85px;"
                            placeholder="Gõ câu trả lời của cậu theo khung: Kết luận -> Nguyên lý hoạt động -> Cơ chế / Cách kiểm tra..."
                            oninput="app.saveInterviewDraft('${draftKey}', this.value)"
                          >${escapeHtml(savedDraft)}</textarea>

                          <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:10px; margin-top:10px;">
                            <div style="display:flex; flex-wrap:wrap; gap:10px;">
                              <button
                                class="btn btn-primary"
                                id="audit-btn-${draftKey}"
                                onclick="app.runAiAudit(${lesson.id}, ${qIdx})"
                              >
                                🤖 ${
                                  auditReport
                                    ? "AI Audit & Chấm điểm lại câu trả lời"
                                    : "AI Audit & Chấm Điểm Câu Trả Lời"
                                }
                              </button>
                              ${
                                !isRevealed
                                  ? `<button
                                      class="btn"
                                      style="font-size:12.5px; color:var(--text-muted);"
                                      onclick="app.toggleRevealTrapAnswer('${draftKey}', true)"
                                    >
                                      👁️ Mở khóa xem đáp án mẫu (Bỏ qua Audit)
                                    </button>`
                                  : `<button
                                      class="btn"
                                      style="font-size:12.5px; color:var(--text-muted);"
                                      onclick="app.toggleRevealTrapAnswer('${draftKey}', false)"
                                    >
                                      🙈 Ẩn lại đáp án mẫu để tự luyện lại
                                    </button>`
                              }
                            </div>
                            <span style="font-size:12px; color:var(--text-muted);">
                              💡 Mẹo: Trả lời xong bấm AI Audit để phát hiện lỗi thuật ngữ & bẫy phỏng vấn
                            </span>
                          </div>
                        </div>

                        <!-- AI AUDIT REPORT PANEL -->
                        ${
                          auditReport
                            ? `<div class="ai-audit-box">
                                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; padding-bottom:12px; border-bottom:1px solid var(--border-color);">
                                  <div>
                                    <span class="badge badge-mock">🤖 KẾT QUẢ AI MENTOR AUDIT (${escapeHtml(
                                      auditReport.mode
                                    )})</span>
                                    <div style="font-size:14.5px; font-weight:700; margin-top:6px; color:var(--text-main);">
                                      ${escapeHtml(auditReport.verdict)}
                                    </div>
                                  </div>
                                  <div class="ai-score-circle ${scoreClass}">
                                    Điểm: ${auditReport.score} / 10
                                  </div>
                                </div>

                                ${
                                  auditReport.trapWarning
                                    ? `<div style="margin-top:12px; padding:12px 14px; border-radius:8px; background:var(--accent-rose-bg); border:1px solid var(--accent-rose); color:var(--text-main); font-size:13.5px;">
                                        <strong style="color:var(--accent-rose);">Phát hiện bẫy tư duy:</strong>
                                        <div style="margin-top:4px;">${escapeHtml(
                                          auditReport.trapWarning
                                        )}</div>
                                      </div>`
                                    : ""
                                }

                                <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap:12px; margin-top:12px;">
                                  <div class="ai-section-block" style="border-left:3px solid var(--accent-emerald);">
                                    <div style="font-weight:800; color:var(--accent-emerald); margin-bottom:6px;">
                                      ✅ Điểm cậu đã làm tốt:
                                    </div>
                                    <ul style="padding-left:18px; display:grid; gap:4px; color:var(--text-secondary);">
                                      ${(auditReport.strengths || [])
                                        .map((s) => `<li>${escapeHtml(s)}</li>`)
                                        .join("")}
                                    </ul>
                                  </div>

                                  <div class="ai-section-block" style="border-left:3px solid var(--accent-amber);">
                                    <div style="font-weight:800; color:var(--accent-amber); margin-bottom:6px;">
                                      🛠️ Điểm cần bổ sung / Sửa thuật ngữ:
                                    </div>
                                    ${
                                      auditReport.improvements &&
                                      auditReport.improvements.length > 0
                                        ? `<ul style="padding-left:18px; display:grid; gap:6px; color:var(--text-secondary);">
                                            ${auditReport.improvements
                                              .map(
                                                (imp) =>
                                                  `<li>${escapeHtml(imp)}</li>`
                                              )
                                              .join("")}
                                          </ul>`
                                        : `<div style="color:var(--accent-emerald);">Câu trả lời đã bao quát đầy đủ các ý quan trọng và dùng đúng thuật ngữ!</div>`
                                    }
                                  </div>
                                </div>

                                ${
                                  auditReport.kpResults &&
                                  auditReport.kpResults.length > 0
                                    ? `<div style="margin-top:12px;">
                                        <div style="font-size:12.5px; font-weight:800; color:var(--accent-blue); margin-bottom:6px;">
                                          🎯 Kiểm tra từng Ý Chốt Bắt Buộc (Rubric Checklist):
                                        </div>
                                        ${auditReport.kpResults
                                          .map((kpr) => {
                                            const icon =
                                              kpr.status === "matched"
                                                ? "✅ Đạt:"
                                                : kpr.status === "partial"
                                                ? "⚠️ Đạt 1 phần:"
                                                : "❌ Thiếu:";
                                            const cls =
                                              kpr.status === "matched"
                                                ? "kp-matched"
                                                : "kp-missing";
                                            return `
                                              <div class="kp-check-item ${cls}">
                                                <strong style="white-space:nowrap;">${icon}</strong>
                                                <div>
                                                  <strong>${escapeHtml(
                                                    kpr.keyPoint
                                                  )}</strong>
                                                  ${
                                                    kpr.note
                                                      ? `<div style="font-size:12px; color:var(--text-secondary); margin-top:2px;">➔ ${escapeHtml(
                                                          kpr.note
                                                        )}</div>`
                                                      : ""
                                                  }
                                                </div>
                                              </div>
                                            `;
                                          })
                                          .join("")}
                                      </div>`
                                    : ""
                                }
                              </div>`
                            : ""
                        }

                        <!-- LOCKED OR UNLOCKED MODEL ANSWER -->
                        ${
                          isRevealed
                            ? `<div style="margin-top:14px; padding-top:14px; border-top:1px dashed var(--border-color);">
                                <div style="font-size:12.5px; font-weight:800; color:var(--text-muted); margin-bottom:8px;">
                                  🔓 ĐÁP ÁN ĐỐI CHIẾU CHUẨN SENIOR (Hãy đọc kỹ rồi sửa lại câu trả lời của cậu ở trên để bấm Audit lại đạt 10/10):
                                </div>
                                <div class="trap-compare">
                                  <div class="trap-wrong">
                                    <div style="font-weight:800; color:var(--accent-rose); margin-bottom:4px;">
                                      ❌ Trả lời mất điểm (Lỗ hổng thực chiến)
                                    </div>
                                    <div>${escapeHtml(tq.wrongAnswer)}</div>
                                  </div>
                                  <div class="trap-right">
                                    <div style="font-weight:800; color:var(--accent-emerald); margin-bottom:4px;">
                                      ✅ Trả lời chuẩn nguyên lý (Đạt điểm tối đa)
                                    </div>
                                    <div>${escapeHtml(tq.rightAnswer)}</div>
                                  </div>
                                </div>

                                ${
                                  tq.keyPoints && tq.keyPoints.length > 0
                                    ? `<div style="display:flex; flex-wrap:wrap; gap:6px; align-items:center; font-size:12px;">
                                        <strong style="color:var(--accent-blue);">🎯 Ý chốt bắt buộc phải nêu:</strong>
                                        ${tq.keyPoints
                                          .map(
                                            (kp) =>
                                              `<span class="badge" style="background:var(--bg-card); border:1px solid var(--border-color);">${escapeHtml(
                                                kp
                                              )}</span>`
                                          )
                                          .join("")}
                                      </div>`
                                    : ""
                                }
                              </div>`
                            : `<div class="locked-answer-banner">
                                <span>🔒 <strong>Đáp án mẫu & Các ý chốt đã được ẩn</strong> để cậu tự lập luận mà không bị nhìn trước đáp án.</span>
                                <span style="color:var(--accent-blue); font-weight:600;">Hãy nhập câu trả lời và bấm "🤖 AI Audit & Chấm Điểm"!</span>
                              </div>`
                        }
                      </div>
                    `;
                  })
                  .join("")}

                <!-- Interactive Quizzes -->
                ${
                  lesson.level4_interview.quizzes &&
                  lesson.level4_interview.quizzes.length > 0
                    ? `<div style="margin-top:24px;">
                        <h3 style="font-size:16px; font-weight:800; margin-bottom:12px;">
                          📝 Bài tập Kiểm tra & Chấm điểm Hiểu Nguyên Lý
                        </h3>
                        ${lesson.level4_interview.quizzes
                          .map((qz, idx) => {
                            const qKey = `${lesson.id}_q${idx}`;
                            const selectedIdx = state.quizAnswers[qKey];
                            const hasAnswered = selectedIdx !== undefined;
                            return `
                              <div class="quiz-card">
                                <div style="font-weight:700; font-size:14.5px; margin-bottom:8px;">
                                  Câu ${idx + 1}: ${escapeHtml(qz.question)}
                                </div>
                                <div>
                                  ${qz.options
                                    .map((opt, oIdx) => {
                                      let btnClass = "quiz-option-btn";
                                      if (hasAnswered) {
                                        if (oIdx === qz.correctIndex) {
                                          btnClass += " correct";
                                        } else if (oIdx === selectedIdx) {
                                          btnClass += " wrong";
                                        }
                                      }
                                      return `
                                        <button
                                          class="${btnClass}"
                                          onclick="app.answerQuiz(${lesson.id}, ${idx}, ${oIdx})"
                                        >
                                          <strong>${String.fromCharCode(
                                            65 + oIdx
                                          )}.</strong> ${escapeHtml(opt)}
                                        </button>
                                      `;
                                    })
                                    .join("")}
                                </div>
                                <div class="quiz-explanation" style="display:${
                                  hasAnswered ? "block" : "none"
                                };">
                                  <strong>💡 Giải thích nguyên lý:</strong> ${escapeHtml(
                                    qz.explanation
                                  )}
                                </div>
                              </div>
                            `;
                          })
                          .join("")}
                      </div>`
                    : ""
                }
              </section>`
            : ""
        }

        <!-- Personal Notes & Lesson Footer Navigation -->
        <section class="card">
          <h3 style="font-size:16px; font-weight:800;">📒 Ghi chú cá nhân của cậu cho Bài ${escapeHtml(
            lesson.code
          )}</h3>
          <p style="font-size:12.5px; color:var(--text-muted);">
            Tự động lưu trên trình duyệt. Hãy ghi lại các câu lệnh hoặc kinh nghiệm thực tế ở công ty cậu liên quan tới bài này.
          </p>
          <textarea
            class="notes-textarea"
            placeholder="Nhập ghi chú, IP phòng lab, hoặc điểm cậu cần nhớ ở bài này..."
            oninput="app.saveLessonNote(${lesson.id}, this.value)"
          >${escapeHtml(state.lessonNotes[lesson.id] || "")}</textarea>

          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-top:20px; padding-top:16px; border-top:1px solid var(--border-color);">
            <div>
              ${
                prevLesson
                  ? `<button class="btn" onclick="app.openLesson(${prevLesson.id})">
                      ⬅️ Bài ${escapeHtml(prevLesson.code)}: ${escapeHtml(
                      prevLesson.title
                    )}
                    </button>`
                  : `<button class="btn" onclick="app.showView('dashboard')">⬅️ Về Tổng Quan</button>`
              }
            </div>

            <button
              class="btn ${isCompleted ? "btn-success" : "btn-primary"}"
              onclick="app.toggleCompleteLesson(${lesson.id})"
            >
              ${
                isCompleted
                  ? "✅ Đã hoàn thành buổi học"
                  : "☑️ Hoàn thành & Đánh dấu đã học"
              }
            </button>

            <div>
              ${
                nextLesson
                  ? `<button class="btn btn-primary" onclick="app.openLesson(${nextLesson.id})">
                      Tiếp theo: Bài ${escapeHtml(
                        nextLesson.code
                      )} — ${escapeHtml(nextLesson.title)} ➡️
                    </button>`
                  : `<button class="btn btn-primary" onclick="app.showView('glossary')">
                      🎓 Kiểm tra Chuẩn Tốt Nghiệp ➡️
                    </button>`
              }
            </div>
          </div>
        </section>
      `;
    },

    setLessonLevelFilter(filter) {
      this.currentLevelFilter = filter;
      const main = document.getElementById("main-view-container");
      if (main) this.renderLesson(main, this.currentLessonId);
    },

    toggleCompleteLesson(lessonId) {
      const id = Number(lessonId);
      const idx = state.completedLessons.indexOf(id);
      if (idx === -1) {
        state.completedLessons.push(id);
      } else {
        state.completedLessons.splice(idx, 1);
      }
      saveState();
      this.updateProgressUI();
      this.renderSidebar();
      if (this.currentView === "lesson") {
        const main = document.getElementById("main-view-container");
        if (main) this.renderLesson(main, this.currentLessonId);
      }
    },

    saveLessonNote(lessonId, text) {
      state.lessonNotes[lessonId] = text;
      saveState();
    },

    saveInterviewDraft(key, text) {
      state.interviewDrafts[key] = text;
      saveState();
    },

    toggleRevealTrapAnswer(draftKey, show) {
      if (show) {
        state.revealedTrapAnswers[draftKey] = true;
      } else {
        delete state.revealedTrapAnswers[draftKey];
        delete state.aiAuditReports[draftKey];
      }
      saveState();
      const main = document.getElementById("main-view-container");
      if (main) this.renderLesson(main, this.currentLessonId);
    },

    async runAiAudit(lessonId, qIdx) {
      const draftKey = `${lessonId}_${qIdx}`;
      const textarea = document.getElementById(`draft-input-${draftKey}`);
      const userText = textarea
        ? textarea.value.trim()
        : (state.interviewDrafts[draftKey] || "").trim();

      if (!userText) {
        alert(
          "Cậu hãy gõ câu trả lời của mình vào ô trước khi bấm AI Audit nhé!"
        );
        if (textarea) textarea.focus();
        return;
      }

      state.interviewDrafts[draftKey] = userText;
      const lessons = getAllLessons();
      const lesson = lessons.find((l) => l.id === Number(lessonId));
      const tq = lesson?.level4_interview?.trapQuestions?.[qIdx];
      if (!tq) return;

      const btn = document.getElementById(`audit-btn-${draftKey}`);
      if (btn) {
        btn.disabled = true;
        btn.textContent = "⏳ AI Mentor đang phân tích câu trả lời...";
      }

      const report = await window.AI_AUDITOR.auditAnswer(tq, userText);
      state.aiAuditReports[draftKey] = report;
      state.revealedTrapAnswers[draftKey] = true;
      saveState();

      const main = document.getElementById("main-view-container");
      if (main) this.renderLesson(main, this.currentLessonId);
    },

    openAiSettingsModal() {
      const root = document.getElementById("ai-modal-Root");
      if (!root) return;
      const cfg = window.AI_AUDITOR.loadAiConfig();

      root.innerHTML = `
        <div class="modal-backdrop" onclick="app.closeAiSettingsModal()">
          <div class="modal-card" onclick="event.stopPropagation()">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
              <h3 style="font-size:18px; font-weight:800; color:var(--accent-blue);">
                🤖 Cấu hình AI Mentor Audit
              </h3>
              <button class="btn" onclick="app.closeAiSettingsModal()">✕</button>
            </div>

            <div style="padding:12px 14px; background:var(--accent-emerald-bg); border:1px solid rgba(52, 211, 153, 0.35); border-radius:8px; font-size:13px; margin-bottom:14px;">
              <strong>✅ Chế độ AI Mentor Rubric Engine (Tích hợp sẵn) đang BẬT!</strong>
              <div style="margin-top:4px; color:var(--text-secondary);">
                Hệ thống đã tích hợp sẵn bộ phân tích ngữ nghĩa, bắt lỗi thuật ngữ (như <code>submask</code> ➔ <code>Subnet Mask</code>) và phát hiện bẫy phỏng vấn (như nhầm lẫn giữa IP đích và MAC đích) cho toàn bộ 24 bài học mà <strong>không bắt buộc phải có API Key</strong>.
              </div>
            </div>

            <div style="margin-bottom:14px;">
              <label style="font-size:13px; font-weight:700; display:block; margin-bottom:6px;">
                🔑 Tùy chọn nâng cao: Google Gemini API Key (Nếu muốn kết nối thêm Gemini 2.5 Flash Cloud)
              </label>
              <input
                type="password"
                id="gemini-api-key-input"
                value="${escapeHtml(cfg.apiKey || "")}"
                placeholder="Dán API Key (AIzaSy...) hoặc để trống để dùng AI Mentor tích hợp sẵn"
                style="width:100%; padding:10px 12px; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-elevated); color:var(--text-main); font-size:13.5px;"
              />
              <div style="font-size:12px; color:var(--text-muted); margin-top:6px;">
                Key được lưu cục bộ trên trình duyệt của cậu (localStorage). Nếu để trống, ứng dụng sử dụng bộ AI Mentor Rubric Engine tích hợp sẵn.
              </div>
            </div>

            <div style="display:flex; justify-content:flex-end; gap:10px;">
              <button class="btn" onclick="app.closeAiSettingsModal()">Hủy</button>
              <button class="btn btn-primary" onclick="app.saveAiSettingsFromModal()">💾 Lưu cấu hình</button>
            </div>
          </div>
        </div>
      `;
    },

    closeAiSettingsModal() {
      const root = document.getElementById("ai-modal-Root");
      if (root) root.innerHTML = "";
    },

    saveAiSettingsFromModal() {
      const input = document.getElementById("gemini-api-key-input");
      const key = input ? input.value.trim() : "";
      window.AI_AUDITOR.saveAiConfig({
        apiKey: key,
        model: "gemini-2.5-flash"
      });
      this.closeAiSettingsModal();
    },

    answerQuiz(lessonId, quizIdx, optionIdx) {
      state.quizAnswers[`${lessonId}_q${quizIdx}`] = optionIdx;
      saveState();
      const main = document.getElementById("main-view-container");
      if (main) this.renderLesson(main, lessonId);
    },

    /* ==================== VIEW 3: INTERACTIVE SIMULATORS ==================== */
    renderSimulators(container) {
      const scenarios = window.COURSE_META.simulators.packetScenarios;
      const sc = scenarios[this.currentPacketScenarioIdx] || scenarios[0];
      const hop = sc.steps[this.currentPacketHopIdx] || sc.steps[0];

      // Calculate NTFS vs Share effective permission
      const shareLevels = { Read: 1, Change: 2, "Full Control": 3 };
      const ntfsLevels = {
        "Explicit Deny": 0,
        Read: 1,
        Modify: 2,
        "Full Control": 3
      };
      const levelNames = {
        0: "🚫 BỊ CHẶN HOÀN TOÀN (Access Denied)",
        1: "👀 Chỉ Đọc (Read-Only) — Không tạo/sửa/xóa được file",
        2: "✏️ Đọc + Ghi + Sửa + Xóa file (Change / Modify)",
        3: "👑 Toàn quyền (Full Control — Đổi được cả phân quyền ACL)"
      };

      const sVal = shareLevels[this.ntfsCalc.sharePerm];
      const nVal = ntfsLevels[this.ntfsCalc.ntfsPerm];
      const effectiveNetworkVal = nVal === 0 ? 0 : Math.min(sVal, nVal);
      const effectiveLocalVal = nVal;

      // Calculate RAID / SHR
      const r = this.raidCalc;
      let usableTB = 0;
      let faultTolerance = "";
      let raidExplain = "";
      if (r.type === "RAID 0") {
        usableTB = r.disks * r.diskSizeTB;
        faultTolerance = "0 ổ (Chết 1 ổ là MẤT SẠCH toàn bộ dữ liệu!)";
        raidExplain = "Chỉ tăng tốc độ & gộp dung lượng, hoàn toàn không có khả năng chịu lỗi.";
      } else if (r.type === "RAID 1") {
        usableTB = r.diskSizeTB;
        faultTolerance = `${r.disks - 1} ổ (Ghi song song Mirror)`;
        raidExplain = "An toàn cao, đọc nhanh, nhưng tận dụng dung lượng chỉ 50% (với 2 ổ).";
      } else if (r.type === "RAID 5" || r.type === "SHR") {
        usableTB = Math.max(1, r.disks - 1) * r.diskSizeTB;
        faultTolerance = "Chịu lỗi tối đa 1 ổ cứng vật lý hỏng cùng lúc";
        raidExplain =
          r.type === "SHR"
            ? "Synology Hybrid RAID (1-disk redundancy): Tương đương RAID 5 khi các ổ cùng dung lượng, nhưng linh hoạt tận dụng dung lượng hơn khi nâng cấp ổ cứng lệch size."
            : "Cần tối thiểu 3 ổ cứng. Mất dung lượng của 1 ổ để lưu Parity.";
      } else if (r.type === "RAID 6" || r.type === "SHR-2") {
        usableTB = Math.max(1, r.disks - 2) * r.diskSizeTB;
        faultTolerance = "Chịu lỗi tối đa 2 ổ cứng vật lý hỏng cùng lúc";
        raidExplain = "Cần tối thiểu 4 ổ cứng. Dùng 2 ổ làm Parity, rất an toàn khi rebuild ổ dung lượng lớn.";
      } else if (r.type === "RAID 10") {
        usableTB = (r.disks / 2) * r.diskSizeTB;
        faultTolerance = "Ít nhất 1 ổ (tối đa 1 ổ ở mỗi cặp Mirror)";
        raidExplain = "Kết hợp tốc độ IOPS cao của RAID 0 và an toàn của RAID 1, rất hợp cho Database/VM.";
      }

      container.innerHTML = `
        <div class="hero-banner">
          <span class="badge badge-lab">MÔ PHỎNG NGUYÊN LÝ HỆ THỐNG</span>
          <h1 class="hero-title">Phòng Thí Nghiệm Trực Quan (Interactive Simulators)</h1>
          <p style="font-size:14.5px; color:var(--text-secondary);">
            Bấm chọn từng kịch bản để nhìn tận mắt điều gì diễn ra bên trong gói tin mạng (VLAN/Routing/NAT), cách Windows tính quyền NTFS + SMB Share, và bản chất của RAID/SHR.
          </p>
        </div>

        <!-- SIMULATOR 1: PACKET FLOW -->
        <div class="card">
          <h2 style="font-size:20px; font-weight:800; margin-bottom:6px;">
            1. Mô phỏng Đường đi của Gói tin: Khi nào cần Switch (VLAN), Routing, và NAT?
          </h2>
          <p style="font-size:13.5px; color:var(--text-muted); margin-bottom:14px;">
            Trả lời câu hỏi cốt lõi nhất của chương trình: <em>"Tại sao thiết bị ở VLAN 10 sang VLAN 30 cần Routing nhưng KHÔNG cần NAT?"</em>
          </p>

          <div style="display:flex; flex-wrap:wrap; gap:10px; margin-bottom:16px;">
            ${scenarios
              .map(
                (item, idx) => `
                <button
                  class="btn ${
                    idx === this.currentPacketScenarioIdx ? "btn-primary" : ""
                  }"
                  onclick="app.selectPacketScenario(${idx})"
                >
                  ${escapeHtml(item.title)}
                </button>
              `
              )
              .join("")}
          </div>

          <div style="padding:16px; background:var(--bg-elevated); border:1px solid var(--border-color); border-radius:10px;">
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:10px;">
              <span class="badge badge-mock">${escapeHtml(sc.badge)}</span>
              <div style="display:flex; gap:8px;">
                <span class="badge ${
                  sc.needsGateway ? "badge-p2" : "badge-p0"
                }">Default Gateway: ${
        sc.needsGateway ? "CẦN DÙNG" : "KHÔNG DÙNG"
      }</span>
                <span class="badge ${
                  sc.needsRouting ? "badge-p2" : "badge-p0"
                }">Routing L3: ${
        sc.needsRouting ? "CẦN DÙNG" : "KHÔNG DÙNG"
      }</span>
                <span class="badge ${
                  sc.needsNat ? "badge-p1" : "badge-p0"
                }">NAT: ${sc.needsNat ? "BẮT BUỘC (SRCNAT)" : "KHÔNG CẦN NAT!"}</span>
              </div>
            </div>

            <pre class="code-block" style="color:var(--accent-blue); font-weight:700;">${escapeHtml(
              sc.topology
            )}</pre>
            <p style="font-size:13.5px; color:var(--text-secondary); margin-bottom:14px;">
              ${escapeHtml(sc.summary)}
            </p>

            <!-- Hop Selector -->
            <div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:12px;">
              ${sc.steps
                .map(
                  (st, hIdx) => `
                  <button
                    class="btn ${
                      hIdx === this.currentPacketHopIdx ? "btn-success" : ""
                    }"
                    onclick="app.selectPacketHop(${hIdx})"
                  >
                    ${escapeHtml(st.hop)}
                  </button>
                `
                )
                .join("")}
            </div>

            <!-- Active Hop Inspector -->
            <div style="background:var(--bg-card); border:1px solid var(--accent-blue); border-radius:10px; padding:16px;">
              <div style="font-size:15px; font-weight:800; color:var(--accent-blue); margin-bottom:6px;">
                📍 ${escapeHtml(hop.hop)}
              </div>
              <div style="font-size:14px; margin-bottom:14px;">
                ${escapeHtml(hop.action)}
              </div>
              <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:10px; font-family:Consolas,monospace; font-size:12.5px;">
                <div style="padding:10px; background:var(--bg-code); border-radius:8px; border:1px solid #334155;">
                  <div style="color:var(--text-muted);">SOURCE IP (Layer 3)</div>
                  <div style="color:var(--accent-emerald); font-weight:700; margin-top:2px;">${escapeHtml(
                    hop.srcIp
                  )}</div>
                </div>
                <div style="padding:10px; background:var(--bg-code); border-radius:8px; border:1px solid #334155;">
                  <div style="color:var(--text-muted);">DESTINATION IP (Layer 3)</div>
                  <div style="color:var(--accent-emerald); font-weight:700; margin-top:2px;">${escapeHtml(
                    hop.dstIp
                  )}</div>
                </div>
                <div style="padding:10px; background:var(--bg-code); border-radius:8px; border:1px solid #334155;">
                  <div style="color:var(--text-muted);">SOURCE MAC (Layer 2)</div>
                  <div style="color:var(--accent-amber); font-weight:700; margin-top:2px;">${escapeHtml(
                    hop.srcMac
                  )}</div>
                </div>
                <div style="padding:10px; background:var(--bg-code); border-radius:8px; border:1px solid #334155;">
                  <div style="color:var(--text-muted);">DESTINATION MAC (Layer 2)</div>
                  <div style="color:var(--accent-amber); font-weight:700; margin-top:2px;">${escapeHtml(
                    hop.dstMac
                  )}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- SIMULATOR 2: NTFS vs SMB SHARE CALCULATOR -->
        <div class="card">
          <h2 style="font-size:20px; font-weight:800; margin-bottom:6px;">
            2. Máy tính Quyền Hiệu Lực: SMB Share Permission vs NTFS Permission (Bài 09)
          </h2>
          <p style="font-size:13.5px; color:var(--text-muted); margin-bottom:14px;">
            Quy tắc vàng: Khi User truy cập qua mạng (<code>\\\\FileServer\\DuAn</code>), quyền thực tế = <strong>Quyền KHẮT KHE HƠN (Most Restrictive)</strong> giữa Share Permission và NTFS Permission.
          </p>

          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:16px;">
            <div style="padding:16px; background:var(--bg-elevated); border-radius:10px; border:1px solid var(--border-color);">
              <div style="font-weight:800; color:var(--accent-blue); margin-bottom:8px;">
                Bước 1: Chọn Quyền SMB Share (Cổng vào qua mạng)
              </div>
              <div style="display:flex; flex-direction:column; gap:8px;">
                ${["Read", "Change", "Full Control"]
                  .map(
                    (p) => `
                    <button
                      class="btn ${
                        this.ntfsCalc.sharePerm === p ? "btn-primary" : ""
                      }"
                      onclick="app.setNtfsCalc('share', '${p}')"
                    >
                      Share Permission: ${p}
                    </button>
                  `
                  )
                  .join("")}
              </div>
            </div>

            <div style="padding:16px; background:var(--bg-elevated); border-radius:10px; border:1px solid var(--border-color);">
              <div style="font-weight:800; color:var(--accent-purple); margin-bottom:8px;">
                Bước 2: Chọn Quyền NTFS (Quyền trên ổ cứng Server)
              </div>
              <div style="display:flex; flex-direction:column; gap:8px;">
                ${["Read", "Modify", "Full Control", "Explicit Deny"]
                  .map(
                    (p) => `
                    <button
                      class="btn ${
                        this.ntfsCalc.ntfsPerm === p ? "btn-primary" : ""
                      }"
                      onclick="app.setNtfsCalc('ntfs', '${p}')"
                    >
                      NTFS Permission: ${p}
                    </button>
                  `
                  )
                  .join("")}
              </div>
            </div>

            <div style="padding:16px; background:var(--bg-elevated); border-radius:10px; border:2px solid var(--accent-emerald);">
              <div style="font-weight:800; color:var(--accent-emerald); margin-bottom:8px;">
                🎯 KẾT QUẢ QUYỀN HIỆU LỰC (EFFECTIVE PERMISSION)
              </div>
              <div style="margin-bottom:12px;">
                <div style="font-size:12px; color:var(--text-muted);">Khi truy cập qua mạng (\\\\Server\\Share):</div>
                <div style="font-size:15px; font-weight:800; color:var(--accent-amber); margin-top:2px;">
                  ${levelNames[effectiveNetworkVal]}
                </div>
              </div>
              <div style="margin-bottom:12px;">
                <div style="font-size:12px; color:var(--text-muted);">Khi đăng nhập trực tiếp tại Server (Local E:\\Share):</div>
                <div style="font-size:14px; font-weight:700; color:var(--text-main); margin-top:2px;">
                  ${levelNames[effectiveLocalVal]} (Bỏ qua Share Permission)
                </div>
              </div>
              <div style="font-size:12.5px; color:var(--text-secondary); padding-top:8px; border-top:1px dashed var(--border-color);">
                💡 <strong>Best Practice thực tế:</strong> Trên tab Sharing, cấp cho <code>Authenticated Users = Change/Full Control</code>, sau đó khóa mở chi tiết từng phòng ban hoàn toàn ở tab <strong>Security (NTFS)</strong>!
              </div>
            </div>
          </div>
        </div>

        <!-- SIMULATOR 3: RAID / SHR & BACKUP -->
        <div class="card">
          <h2 style="font-size:20px; font-weight:800; margin-bottom:6px;">
            3. Mô phỏng Dung lượng & Khả năng chịu lỗi RAID / Synology SHR (Bài 14 & 15)
          </h2>
          <p style="font-size:13.5px; color:var(--text-muted); margin-bottom:14px;">
            Hiểu rõ RAID/SHR bảo vệ cậu khỏi cái gì, và tại sao có RAID rồi vẫn bắt buộc phải có Snapshot & Backup 3-2-1.
          </p>

          <div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:14px;">
            ${["SHR", "RAID 1", "RAID 5", "RAID 6", "RAID 10", "RAID 0"]
              .map(
                (t) => `
                <button
                  class="btn ${this.raidCalc.type === t ? "btn-primary" : ""}"
                  onclick="app.setRaidType('${t}')"
                >
                  ${t}
                </button>
              `
              )
              .join("")}
          </div>

          <div class="stats-grid" style="margin-top:0;">
            <div class="stat-box">
              <div class="stat-value">${usableTB} TB</div>
              <div class="stat-label">Dung lượng sử dụng thực tế</div>
              <div class="stat-sub">Cấu hình mẫu: ${r.disks} ổ × ${
        r.diskSizeTB
      }TB (Tổng thô: ${r.disks * r.diskSizeTB}TB)</div>
            </div>
            <div class="stat-box">
              <div class="stat-value" style="font-size:18px; color:var(--accent-emerald);">${escapeHtml(
                faultTolerance
              )}</div>
              <div class="stat-label">Khả năng chịu lỗi phần cứng</div>
              <div class="stat-sub">${escapeHtml(raidExplain)}</div>
            </div>
            <div class="stat-box">
              <div class="stat-value" style="font-size:17px; color:var(--accent-rose);">❌ KHÔNG CHỐNG ĐƯỢC!</div>
              <div class="stat-label">Nếu bị Ransomware / Xóa nhầm file</div>
              <div class="stat-sub">RAID đồng bộ lệnh xóa/mã hóa xuống mọi ổ ngay lập tức! Phải dùng <strong>Btrfs Snapshot</strong> hoặc <strong>Backup 3-2-1</strong> để cứu.</div>
            </div>
          </div>
        </div>
      `;
    },

    selectPacketScenario(idx) {
      this.currentPacketScenarioIdx = idx;
      this.currentPacketHopIdx = 0;
      const main = document.getElementById("main-view-container");
      if (main) this.renderSimulators(main);
    },

    selectPacketHop(hopIdx) {
      this.currentPacketHopIdx = hopIdx;
      const main = document.getElementById("main-view-container");
      if (main) this.renderSimulators(main);
    },

    setNtfsCalc(which, val) {
      if (which === "share") this.ntfsCalc.sharePerm = val;
      if (which === "ntfs") this.ntfsCalc.ntfsPerm = val;
      const main = document.getElementById("main-view-container");
      if (main) this.renderSimulators(main);
    },

    setRaidType(type) {
      this.raidCalc.type = type;
      if (type === "RAID 1") this.raidCalc.disks = 2;
      else this.raidCalc.disks = 4;
      const main = document.getElementById("main-view-container");
      if (main) this.renderSimulators(main);
    },

    /* ==================== VIEW 4: 30 TERMS IN 30 SECONDS ==================== */
    renderGlossary(container) {
      const terms = window.COURSE_META.glossary30 || [];
      const masteredCount = state.masteredTerms.length;
      const filtered = terms.filter((t) => {
        if (this.glossaryFilter === "unmastered")
          return !state.masteredTerms.includes(t.id);
        if (this.glossaryFilter === "mastered")
          return state.masteredTerms.includes(t.id);
        return true;
      });

      container.innerHTML = `
        <div class="hero-banner">
          <span class="badge badge-p0">TIÊU CHUẨN TỐT NGHIỆP SỐ 1</span>
          <h1 class="hero-title">Thử Thách 30 Thuật Ngữ IT Trong 30 Giây</h1>
          <p style="font-size:14.5px; color:var(--text-secondary);">
            Mục tiêu: Giải thích gãy gọn 30 thuật ngữ cốt lõi trong vòng 30 giây/thuật ngữ, đạt tối thiểu <strong>24/30</strong>. Hiện tại cậu đã đạt: <strong style="color:var(--accent-emerald);">${masteredCount} / 30</strong>.
          </p>

          <div style="display:flex; flex-wrap:wrap; gap:10px; margin-top:16px;">
            <button class="btn ${
              this.glossaryFilter === "all" ? "btn-primary" : ""
            }" onclick="app.setGlossaryFilter('all')">
              Tất cả (30)
            </button>
            <button class="btn ${
              this.glossaryFilter === "unmastered" ? "btn-primary" : ""
            }" onclick="app.setGlossaryFilter('unmastered')">
              Cần luyện tập (${30 - masteredCount})
            </button>
            <button class="btn ${
              this.glossaryFilter === "mastered" ? "btn-primary" : ""
            }" onclick="app.setGlossaryFilter('mastered')">
              Đã đạt chuẩn (${masteredCount})
            </button>
          </div>
        </div>

        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(440px, 1fr)); gap:16px;">
          ${filtered
            .map((t) => {
              const isMastered = state.masteredTerms.includes(t.id);
              const isTimerRunning = this.activeTimerTermId === t.id;
              return `
                <div class="card" style="margin-bottom:0; border-color:${
                  isMastered ? "var(--accent-emerald)" : "var(--border-color)"
                };">
                  <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px; margin-bottom:10px;">
                    <div>
                      <span class="badge badge-mock">#${t.id} • ${escapeHtml(
                t.category
              )}</span>
                      <h3 style="font-size:18px; font-weight:800; color:var(--accent-blue); margin-top:6px;">
                        ${escapeHtml(t.term)}
                      </h3>
                    </div>
                    <button
                      class="btn ${isTimerRunning ? "btn-primary" : ""}"
                      onclick="app.startTermTimer(${t.id})"
                    >
                      ⏱️ ${
                        isTimerRunning
                          ? `<span id="timer-display-${t.id}">${this.timerSecondsLeft}s</span>`
                          : "Bấm giờ 30s"
                      }
                    </button>
                  </div>

                  <details style="background:var(--bg-elevated); padding:12px 14px; border-radius:8px; border:1px solid var(--border-color); margin-bottom:12px;">
                    <summary style="cursor:pointer; font-weight:700; font-size:13.5px; color:var(--accent-amber);">
                      👁️ Hãy tự nói định nghĩa trong 30s rồi bấm vào đây để đối chiếu đáp án chuẩn
                    </summary>
                    <div style="margin-top:10px; font-size:13.5px; color:var(--text-main);">
                      <strong>✅ Định nghĩa chuẩn 30s:</strong> ${escapeHtml(
                        t.def30s
                      )}
                    </div>
                    <div style="margin-top:8px; font-size:12.5px; color:var(--accent-rose);">
                      <strong>⚠️ Lưu ý tránh mất điểm:</strong> ${escapeHtml(
                        t.trap
                      )}
                    </div>
                  </details>

                  <button
                    class="btn ${isMastered ? "btn-success" : ""}"
                    style="width:100%; justify-content:center;"
                    onclick="app.toggleMasteredTerm(${t.id})"
                  >
                    ${
                      isMastered
                        ? "✅ Đã giải thích trôi chảy trong 30 giây"
                        : "☑️ Đánh dấu: Đã thuộc & Giải thích được trong 30s"
                    }
                  </button>
                </div>
              `;
            })
            .join("")}
        </div>
      `;
    },

    setGlossaryFilter(filter) {
      this.glossaryFilter = filter;
      const main = document.getElementById("main-view-container");
      if (main) this.renderGlossary(main);
    },

    startTermTimer(termId) {
      if (this.timerInterval) clearInterval(this.timerInterval);
      this.activeTimerTermId = termId;
      this.timerSecondsLeft = 30;
      const main = document.getElementById("main-view-container");
      if (main) this.renderGlossary(main);

      this.timerInterval = setInterval(() => {
        this.timerSecondsLeft--;
        const el = document.getElementById(`timer-display-${termId}`);
        if (el) {
          el.textContent =
            this.timerSecondsLeft > 0
              ? `${this.timerSecondsLeft}s`
              : "Hết 30s!";
        }
        if (this.timerSecondsLeft <= 0) {
          clearInterval(this.timerInterval);
        }
      }, 1000);
    },

    toggleMasteredTerm(termId) {
      const idx = state.masteredTerms.indexOf(termId);
      if (idx === -1) state.masteredTerms.push(termId);
      else state.masteredTerms.splice(idx, 1);
      saveState();
      this.updateProgressUI();
      const main = document.getElementById("main-view-container");
      if (main) this.renderGlossary(main);
    },

    /* ==================== VIEW 5: LABS & GRADUATION ==================== */
    renderLabsAndGraduation(container) {
      const meta = window.COURSE_META;

      container.innerHTML = `
        <div class="hero-banner">
          <span class="badge badge-p2">PHÒNG LAB & TIÊU CHUẨN TỐT NGHIỆP</span>
          <h1 class="hero-title">IV. Phòng Lab Thực Chiến & V. Tiêu Chuẩn Tốt Nghiệp</h1>
          <p style="font-size:14.5px; color:var(--text-secondary);">
            Vì cậu sử dụng Windows và từng làm với WinBox, chương trình ưu tiên môi trường Lab ảo hóa nhỏ gọn, cách ly an toàn, không cần đầu tư thêm thiết bị thật ngay.
          </p>
        </div>

        <div class="card" style="border-left:5px solid var(--accent-rose);">
          <h3 style="font-size:16px; font-weight:800; color:var(--accent-rose);">
            ⚠️ Nguyên tắc An toàn Vận hành Sống còn (Operational Safety)
          </h3>
          <p style="font-size:13.5px; color:var(--text-secondary); margin-top:4px;">
            Toàn bộ Lab cần chạy trong <strong>mạng ảo cách ly (Host-Only / Internal Network)</strong>. Tuyệt đối <strong>KHÔNG</strong> thực hiện bài tập xóa dữ liệu, thay đổi VLAN, khóa Firewall hoặc áp thử GPO chưa kiểm chứng trực tiếp trên hệ thống sản xuất (Production) thật của công ty!
          </p>
        </div>

        <!-- 3 Lab Environments -->
        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap:18px; margin-bottom:22px;">
          ${meta.labsGuide
            .map(
              (lab) => `
              <div class="card" style="margin-bottom:0;">
                <span class="badge badge-lab">MÔI TRƯỜNG LAB</span>
                <h2 style="font-size:19px; font-weight:800; color:var(--accent-blue); margin:8px 0;">
                  ${escapeHtml(lab.title)}
                </h2>
                <p style="font-size:13.5px; color:var(--text-secondary); margin-bottom:10px;">
                  ${escapeHtml(lab.summary)}
                </p>
                <div style="font-size:12px; color:var(--accent-amber); font-weight:700; margin-bottom:12px;">
                  💻 ${escapeHtml(lab.specs)}
                </div>

                <div style="font-size:13px; font-weight:700; margin-bottom:6px;">Sơ đồ thành phần:</div>
                <ul style="padding-left:18px; font-size:12.5px; color:var(--text-secondary); margin-bottom:12px; display:grid; gap:4px;">
                  ${lab.topology
                    .map((t) => `<li>${escapeHtml(t)}</li>`)
                    .join("")}
                </ul>

                <div style="font-size:13px; font-weight:700; margin-bottom:6px; color:var(--accent-emerald);">Bài tập tự xác minh:</div>
                <ul style="padding-left:18px; font-size:12.5px; color:var(--text-secondary); display:grid; gap:4px;">
                  ${lab.exercises
                    .map((ex) => `<li>${escapeHtml(ex)}</li>`)
                    .join("")}
                </ul>
              </div>
            `
            )
            .join("")}
        </div>

        <!-- V. Graduation Criteria -->
        <div class="card">
          <h2 style="font-size:20px; font-weight:800; margin-bottom:6px;">
            V. Theo dõi tiến độ & 5 Điều kiện hoàn thành chương trình (${this.getCompletedGraduationCount()}/5)
          </h2>
          <p style="font-size:13.5px; color:var(--text-muted); margin-bottom:16px;">
            Mình không muốn chỉ học hết 24 buổi là coi như xong. Cậu cần chứng minh được khả năng vận dụng thực sự qua 5 tiêu chuẩn dưới đây:
          </p>

          <div style="display:flex; flex-direction:column; gap:12px;">
            ${meta.graduationCriteria
              .map((c) => {
                const isChecked =
                  state.checkedGradCriteria.includes(c.id) ||
                  (c.id === "crit-def" && state.masteredTerms.length >= 24);
                return `
                  <div
                    onclick="app.toggleGradCriteria('${c.id}')"
                    style="cursor:pointer; padding:16px; border-radius:10px; background:var(--bg-elevated); border:1px solid ${
                      isChecked
                        ? "var(--accent-emerald)"
                        : "var(--border-color)"
                    }; display:flex; align-items:flex-start; gap:14px;"
                  >
                    <input
                      type="checkbox"
                      ${isChecked ? "checked" : ""}
                      style="width:20px; height:20px; margin-top:3px; cursor:pointer;"
                      onclick="event.stopPropagation(); app.toggleGradCriteria('${
                        c.id
                      }');"
                    />
                    <div style="flex:1;">
                      <div style="font-size:15.5px; font-weight:800; color:${
                        isChecked ? "var(--accent-emerald)" : "var(--text-main)"
                      };">
                        ${escapeHtml(c.title)}
                      </div>
                      <div style="font-size:13.5px; color:var(--text-secondary); margin-top:2px;">
                        ${escapeHtml(c.target)}
                      </div>
                      <div style="font-size:12px; color:var(--accent-blue); margin-top:4px;">
                        💡 ${escapeHtml(c.checkHint)}
                      </div>
                    </div>
                  </div>
                `;
              })
              .join("")}
          </div>
        </div>

        <!-- Official Docs -->
        <div class="card">
          <h2 style="font-size:19px; font-weight:800; margin-bottom:10px;">
            📚 Tài liệu chính thức để tra cứu khi học
          </h2>
          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:14px;">
            ${meta.officialDocs
              .map(
                (doc) => `
                <a
                  href="${escapeHtml(doc.url)}"
                  target="_blank"
                  rel="noopener noreferrer"
                  style="text-decoration:none; color:inherit; padding:14px; background:var(--bg-elevated); border:1px solid var(--border-color); border-radius:10px; display:block;"
                >
                  <div style="font-weight:800; color:var(--accent-blue); margin-bottom:4px;">
                    🔗 ${escapeHtml(doc.name)}
                  </div>
                  <div style="font-size:13px; color:var(--text-secondary);">
                    ${escapeHtml(doc.desc)}
                  </div>
                </a>
              `
              )
              .join("")}
          </div>
        </div>
      `;
    },

    toggleGradCriteria(id) {
      const idx = state.checkedGradCriteria.indexOf(id);
      if (idx === -1) state.checkedGradCriteria.push(id);
      else state.checkedGradCriteria.splice(idx, 1);
      saveState();
      this.updateProgressUI();
      const main = document.getElementById("main-view-container");
      if (main) this.renderLabsAndGraduation(main);
    },

    /* ==================== VIEW 6: 7-STAGE SYSTEM BLUEPRINT ==================== */
    renderBlueprint(container) {
      const stages = (window.SYSTEM_BLUEPRINT && window.SYSTEM_BLUEPRINT.masterStages) || [];

      container.innerHTML = `
        <div class="hero-banner">
          <span class="badge badge-p2">DÂY CHUYỀN XÂY DỰNG HỆ THỐNG TỪ CON SỐ 0</span>
          <h1 class="hero-title">🏗️ Bản Thiết Kế Thực Thi Hệ Thống A–Z (7 Tầng)</h1>
          <p style="font-size:14.5px; color:var(--text-secondary);">
            Xóa bỏ hoàn toàn cảnh <em>"kiến thức rải rác, có guide thì làm được nhưng tự xây từ đầu thì phải mò"</em>. Đây là dây chuyền lắp ghép chuẩn từ Tầng 1 đến Tầng 7: chỉ rõ <strong>cái gì phải làm trước</strong>, <strong>bàn giao thông số nào cho bước sau</strong>, <strong>lệnh thực thi cụ thể</strong> và <strong>cách nghiệm thu từng tầng</strong>.
          </p>
        </div>

        <div style="display:flex; flex-direction:column; gap:20px;">
          ${stages
            .map(
              (st, idx) => `
              <div class="card" style="margin-bottom:0; border-left:5px solid var(--accent-blue);">
                <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:10px; margin-bottom:10px;">
                  <div>
                    <span class="badge badge-mock">TẦNG ${st.stageNumber} / 7 • ${escapeHtml(
                st.badge
              )}</span>
                    <h2 style="font-size:20px; font-weight:800; color:var(--accent-blue); margin-top:6px;">
                      ${escapeHtml(st.title)}
                    </h2>
                  </div>
                  <div style="display:flex; flex-wrap:wrap; gap:6px;">
                    ${(st.lessonIds || [])
                      .map(
                        (id) =>
                          `<button class="btn" style="padding:5px 10px; font-size:12px;" onclick="app.openLesson(${id})">📖 Học sâu Bài ${String(
                            id
                          ).padStart(2, "0")}</button>`
                      )
                      .join("")}
                  </div>
                </div>

                <div style="padding:12px 14px; background:var(--accent-amber-bg); border:1px solid rgba(251, 191, 36, 0.35); border-radius:8px; font-size:13.5px; margin-bottom:14px;">
                  <strong style="color:var(--accent-amber);">❓ Tại sao bắt buộc phải làm ở đúng thứ tự này?</strong>
                  <div style="margin-top:4px; color:var(--text-main);">${escapeHtml(
                    st.whyOrderMatters
                  )}</div>
                </div>

                <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:12px; margin-bottom:14px;">
                  <div style="padding:12px 14px; background:var(--bg-elevated); border-radius:8px; border:1px solid var(--border-color); font-size:13px;">
                    <div style="font-weight:800; color:var(--accent-blue); margin-bottom:4px;">
                      ⬅️ Đầu vào nhận từ tầng trước:
                    </div>
                    <div style="color:var(--text-secondary);">${escapeHtml(
                      st.inputFromPrev
                    )}</div>
                  </div>
                  <div style="padding:12px 14px; background:var(--bg-elevated); border-radius:8px; border:1px solid var(--border-color); font-size:13px;">
                    <div style="font-weight:800; color:var(--accent-purple); margin-bottom:4px;">
                      ➡️ Kết quả bàn giao cho tầng kế tiếp:
                    </div>
                    <div style="color:var(--text-secondary);">${escapeHtml(
                      st.outputToNext
                    )}</div>
                  </div>
                </div>

                <div>
                  <div style="font-size:13.5px; font-weight:800; color:var(--text-main); margin-bottom:6px;">
                    🛠️ Runbook Thực Thi Từng Bước (Thao tác & Câu lệnh chuẩn):
                  </div>
                  <pre class="code-block">${escapeHtml(st.stepByStepRunbook)}</pre>
                </div>

                <div style="margin-top:12px; padding:12px 14px; background:var(--accent-emerald-bg); border:1px solid rgba(52, 211, 153, 0.35); border-radius:8px; font-size:13.5px;">
                  <strong style="color:var(--accent-emerald);">✅ Chốt Nghiệm Thu Tầng ${
                    st.stageNumber
                  } (Phải PASS bước này mới được sang Tầng ${
                st.stageNumber + 1 <= 7 ? st.stageNumber + 1 : "Hoàn tất"
              }):</strong>
                  <div style="margin-top:4px; color:var(--text-main);">${escapeHtml(
                    st.gateCheck
                  )}</div>
                </div>
              </div>
              ${
                idx < stages.length - 1
                  ? `<div style="text-align:center; font-size:20px; color:var(--accent-emerald); font-weight:800;">⬇️ Bàn giao thông số xuống Tầng ${
                      st.stageNumber + 1
                    } ⬇️</div>`
                  : ""
              }
            `
            )
            .join("")}
        </div>
      `;
    }
  };

  window.app = app;
  window.addEventListener("DOMContentLoaded", () => app.init());
})();
