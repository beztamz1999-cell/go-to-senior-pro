(function () {
  const AI_CONFIG_KEY = "it_sysadmin_ai_config_v1";

  function loadAiConfig() {
    try {
      const raw = localStorage.getItem(AI_CONFIG_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return {
      apiKey: "",
      model: "gemini-2.5-flash"
    };
  }

  function saveAiConfig(cfg) {
    try {
      localStorage.setItem(AI_CONFIG_KEY, JSON.stringify(cfg));
    } catch (e) {}
  }

  function removeAccents(str) {
    return (str || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .toLowerCase();
  }

  // Terminology check for common informal or misspelled IT words
  function checkTerminology(userText) {
    const lower = userText.toLowerCase();
    const notes = [];

    if (/\bsub\s*mask\b/i.test(lower)) {
      notes.push(
        "Cậu đang viết là 'submask' — khi đi phỏng vấn hãy dùng chuẩn thuật ngữ 'Subnet Mask' (Mặt nạ mạng) hoặc 'Prefix Length (/24)'."
      );
    }
    if (/cuc\s+(mang|wifi|phat|chia)/i.test(removeAccents(lower))) {
      notes.push(
        "Tránh dùng từ đời thường như 'cục mạng / cục phát / cục chia' khi phỏng vấn System Admin — hãy gọi chính xác là Router, Switch (Layer 2/Layer 3), hoặc Access Point (AP)."
      );
    }
    if (lower.trim().split(/\s+/).length < 8) {
      notes.push(
        "Câu trả lời của cậu đang quá ngắn cụt lủn ('" +
          userText.trim() +
          "'). Khi phỏng vấn vị trí System & Network Admin, đừng chỉ trả lời kết quả ngắn gọn 3–4 từ mà phải nêu theo cấu trúc: Kết luận -> Nguyên lý hoạt động -> Cơ chế kỹ thuật."
      );
    }

    return notes;
  }

  // Synonym groups so semantic concept matching works naturally in Vietnamese
  const CONCEPT_SYNONYMS = [
    {
      triggers: ["subnet mask", "cung mang", "cung subnet", "cung dai"],
      matches: [
        "subnet",
        "submask",
        "mask",
        "cung dai",
        "cung mang",
        "cung lop",
        "chung dai",
        "chung mang",
        "/24"
      ]
    },
    {
      triggers: ["layer 2", "on-link", "arp", "switch"],
      matches: [
        "layer 2",
        "l2",
        "switch",
        "arp",
        "mac",
        "on-link",
        "truc tiep"
      ]
    },
    {
      triggers: ["default gateway", "khong di qua default gateway"],
      matches: ["gateway", "default gateway", "cong ra", "router"]
    },
    {
      triggers: ["truy cap thang bang dia chi ip", "khong can dns"],
      matches: ["dns", "ten mien", "phan giai", "bang ip", "go ip", "truc tiep ip"]
    },
    {
      triggers: ["ip dich", "192.168.30.50", "cua server", "giu nguyen"],
      matches: ["ip dich", "server", "30.50", "dich cuoi", "giu nguyen ip", "khong doi ip"]
    },
    {
      triggers: ["mac dich", "192.168.10.1", "cua router", "cua gateway"],
      matches: ["mac dich", "mac cua router", "mac cua gateway", "mac gateway", "mac router", "10.1"]
    }
  ];

  function extractSignificantTokens(text) {
    const stopWords = new Set([
      "la", "va", "cua", "co", "khong", "duoc", "khi", "thi", "ma", "de",
      "trong", "cho", "voi", "cac", "mot", "nhung", "nay", "do", "vi", "nen",
      "can", "phai", "se", "da", "tren", "duoi", "vao", "ra", "den", "tu",
      "theo", "hoac", "neu", "bởi", "boi", "tai", "sao", "nao", "gi"
    ]);
    return removeAccents(text)
      .replace(/[^a-z0-9./_-]+/g, " ")
      .split(/\s+/)
      .filter((w) => w.length >= 2 && !stopWords.has(w));
  }

  function checkKeyPointCoverage(userText, keyPoint) {
    const uNorm = removeAccents(userText);
    const kpNorm = removeAccents(keyPoint);

    // Special granular checks for tough multi-part key points
    if (
      kpNorm.includes("truy cap thang bang dia chi ip") &&
      kpNorm.includes("dns")
    ) {
      const mentionsDns = uNorm.includes("dns");
      const mentionsRawIpReason =
        uNorm.includes("bang ip") ||
        uNorm.includes("go ip") ||
        uNorm.includes("dia chi ip") ||
        uNorm.includes("10.100") ||
        uNorm.includes("khong dung ten") ||
        uNorm.includes("khong go ten");
      if (mentionsDns && mentionsRawIpReason) {
        return { status: "matched", note: "Đã nêu đủ cả DNS và lý do dùng thẳng IP." };
      }
      if (mentionsDns && !mentionsRawIpReason) {
        return {
          status: "partial",
          note: "Cậu đã nhắc tới không cần DNS, nhưng CHƯA giải thích đúng lý do: không cần DNS là vì người dùng gõ thẳng địa chỉ IP (\\\\192.168.10.100) thay vì gõ tên máy (\\\\FILESERVER), chứ không phải vì 'cùng dải mạng nên không cần DNS'!"
        };
      }
    }

    if (
      kpNorm.includes("so sanh subnet mask") &&
      kpNorm.includes("layer 2")
    ) {
      const hasSubnet =
        uNorm.includes("subnet") ||
        uNorm.includes("submask") ||
        uNorm.includes("cung dai") ||
        uNorm.includes("cung mang");
      const hasL2 =
        uNorm.includes("layer 2") ||
        uNorm.includes("l2") ||
        uNorm.includes("switch") ||
        uNorm.includes("arp") ||
        uNorm.includes("mac") ||
        uNorm.includes("truc tiep");
      if (hasSubnet && hasL2) {
        return { status: "matched", note: "Nêu chuẩn cả Subnet Mask và giao tiếp Layer 2." };
      }
      if (hasSubnet && !hasL2) {
        return {
          status: "partial",
          note: "Đã nhận ra cùng dải mạng nhờ Subnet Mask, nhưng nên bổ sung thêm cơ chế: hai máy giao tiếp trực tiếp ở Layer 2 (qua Switch bằng ARP & địa chỉ MAC)."
        };
      }
    }

    // General token & synonym matching
    const kpTokens = extractSignificantTokens(keyPoint);
    if (kpTokens.length === 0) return { status: "matched", note: "" };

    let matchedCount = 0;
    kpTokens.forEach((tok) => {
      if (uNorm.includes(tok)) {
        matchedCount++;
      } else {
        // Check synonym groups
        for (const grp of CONCEPT_SYNONYMS) {
          if (
            grp.triggers.some((t) => kpNorm.includes(t) || t.includes(tok)) &&
            grp.matches.some((m) => uNorm.includes(m))
          ) {
            matchedCount += 0.85;
            break;
          }
        }
      }
    });

    const ratio = matchedCount / kpTokens.length;
    if (ratio >= 0.5) return { status: "matched", note: "" };
    if (ratio >= 0.25)
      return {
        status: "partial",
        note: "Đã chạm tới ý này nhưng diễn đạt chưa đầy đủ các từ khóa kỹ thuật."
      };
    return { status: "missing", note: "Chưa thấy cậu đề cập rõ ý cốt lõi này trong câu trả lời." };
  }

  // Deep Trap Detector tailored for System & Network Admin interview questions
  function detectSpecificTrap(question, userText, wrongAnswer, rightAnswer) {
    const qNorm = removeAccents(question);
    const uNorm = removeAccents(userText);

    // Trap 1: Question asks BOTH Destination IP and Destination MAC when leaving PC1 towards another VLAN
    if (
      qNorm.includes("ip dich") &&
      qNorm.includes("mac dich") &&
      (qNorm.includes("router") || qNorm.includes("gateway"))
    ) {
      const mentionsRouter =
        uNorm.includes("router") ||
        uNorm.includes("gateway") ||
        uNorm.includes("10.1");
      const mentionsServer =
        uNorm.includes("server") ||
        uNorm.includes("30.50") ||
        uNorm.includes("may dich");
      const separatesIpAndMac =
        uNorm.includes("ip") && uNorm.includes("mac");

      if (mentionsRouter && (!mentionsServer || !separatesIpAndMac)) {
        return {
          trapped: true,
          warning:
            "🚨 SẬP BẪY PHỎNG VẤN KINH ĐIỂN! Cậu trả lời gộp là 'của thiết bị Router' cho cả hai thông số là SAI NGUYÊN LÝ Layer 2 / Layer 3! Tại thời điểm gói tin rời card mạng PC1: (1) Địa chỉ MAC đích (Layer 2) mới là của Router Gateway (192.168.10.1) để nhờ chuyển tiếp hộ; nhưng (2) Địa chỉ IP đích (Layer 3) BẮT BUỘC phải giữ nguyên là IP của Server (192.168.30.50)! Nếu IP đích cũng ghi là của Router thì Router sẽ tưởng gói tin gửi cho chính nó và không biết phải định tuyến (Route) đi đâu tiếp.",
          maxScoreCap: 3.5
        };
      }
      if (mentionsServer && !mentionsRouter) {
        return {
          trapped: true,
          warning:
            "🚨 SẬP BẪY NỬA VỜI! Cậu mới chỉ nhìn thấy Server mà quên mất ở Layer 2, PC1 không thể biết MAC của Server ở VLAN khác. Do đó: IP đích là của Server (192.168.30.50), nhưng MAC đích bắt buộc phải đóng gói là MAC của Default Gateway / Router (192.168.10.1)!",
          maxScoreCap: 4.0
        };
      }
    }

    // Trap 2: Same subnet share access without Gateway and DNS
    if (
      qNorm.includes("default gateway") &&
      qNorm.includes("dns") &&
      qNorm.includes("192.168.10.100")
    ) {
      const saysCannot =
        (uNorm.includes("khong the") ||
          uNorm.includes("khong ket noi duoc") ||
          uNorm.includes("khong vao duoc")) &&
        !uNorm.includes("hoan toan duoc") &&
        !uNorm.includes("van duoc") &&
        !uNorm.includes("van ket noi");
      if (saysCannot) {
        return {
          trapped: true,
          warning:
            "🚨 SẬP BẪY! Cậu thấy thiếu Default Gateway và DNS nên kết luận không truy cập được. Thực tế hai máy cùng dải 192.168.10.0/24 giao tiếp thẳng qua Switch (Layer 2) nên KHÔNG cần Gateway, và truy cập bằng IP \\\\192.168.10.100 nên KHÔNG cần DNS!",
          maxScoreCap: 2.5
        };
      }
    }

    // Trap 3: VLAN 10 to VLAN 30 -> fixing NAT
    if (
      qNorm.includes("vlan") &&
      qNorm.includes("nat") &&
      (uNorm.includes("sua nat") ||
        uNorm.includes("bat nat") ||
        uNorm.includes("thieu nat")) &&
      !uNorm.includes("khong sua nat") &&
      !uNorm.includes("khong can nat")
    ) {
      return {
        trapped: true,
        warning:
          "🚨 SẬP BẪY CỐT LÕI (P0)! Hai VLAN nội bộ giao tiếp với nhau chỉ cần Routing (Layer 3) và Firewall Forward cho phép, TUYỆT ĐỐI KHÔNG CẦN NAT!",
        maxScoreCap: 3.0
      };
    }

    return { trapped: false, warning: null, maxScoreCap: 10 };
  }

  // Main Local Intelligent Audit Function
  function runLocalSmartAudit(questionObj, userText) {
    const cleanText = (userText || "").trim();
    const keyPoints = questionObj.keyPoints || [];
    const termNotes = checkTerminology(cleanText);
    const trapCheck = detectSpecificTrap(
      questionObj.question,
      cleanText,
      questionObj.wrongAnswer,
      questionObj.rightAnswer
    );

    const kpResults = keyPoints.map((kp) => {
      const res = checkKeyPointCoverage(cleanText, kp);
      return {
        keyPoint: kp,
        status: res.status, // "matched" | "partial" | "missing"
        note: res.note
      };
    });

    // Calculate score out of 10
    let rawPoints = 0;
    kpResults.forEach((r) => {
      if (r.status === "matched") rawPoints += 1;
      else if (r.status === "partial") rawPoints += 0.6;
    });

    let score =
      keyPoints.length > 0
        ? Math.round((rawPoints / keyPoints.length) * 90) / 10 + 1
        : 7.0;

    // Penalize ultra-short answers
    const wordCount = cleanText.split(/\s+/).filter(Boolean).length;
    if (wordCount < 6) score = Math.min(score, 4.0);
    else if (wordCount < 12) score = Math.min(score, 6.5);

    // Penalize terminology slips slightly
    if (termNotes.length > 0) {
      score = Math.max(1.5, score - 0.5 * termNotes.length);
    }

    // Apply trap cap if trapped
    if (trapCheck.trapped) {
      score = Math.min(score, trapCheck.maxScoreCap);
    }

    score = Math.round(Math.min(10, Math.max(1, score)) * 10) / 10;

    // Build strengths & improvements
    const strengths = [];
    const improvements = [];

    kpResults.forEach((r) => {
      if (r.status === "matched") {
        strengths.push(`Đã nêu đúng ý chốt: "${r.keyPoint}".`);
      } else if (r.status === "partial") {
        strengths.push(`Đã chạm được ý: "${r.keyPoint}".`);
        if (r.note) improvements.push(r.note);
      } else {
        improvements.push(
          `Thiếu ý cốt lõi: "${r.keyPoint}". ${r.note || ""}`
        );
      }
    });

    termNotes.forEach((tn) => improvements.push(tn));

    if (strengths.length === 0 && !trapCheck.trapped) {
      strengths.push("Đã bước đầu đưa ra phán đoán cho tình huống.");
    }

    let verdict = "";
    if (trapCheck.trapped) {
      verdict =
        "Cẩn thận! Câu trả lời hiện tại của cậu đang dính bẫy tư duy mà người phỏng vấn giăng ra.";
    } else if (score >= 8.5) {
      verdict =
        "Xuất sắc! Câu trả lời nắm rất chắc nguyên lý hệ thống, đủ sức thuyết phục nhà tuyển dụng khó tính.";
    } else if (score >= 6.5) {
      verdict =
        "Khá tốt! Cậu đã hiểu đúng hướng bản chất, chỉ cần gọt giũa lại thuật ngữ và bổ sung 1–2 chi tiết cơ chế bên dưới để đạt 10/10.";
    } else {
      verdict =
        "Câu trả lời còn sơ sài hoặc thiếu các lập luận nguyên lý quan trọng. Hãy xem chi tiết các điểm cần bổ sung bên dưới!";
    }

    return {
      mode: "AI Mentor Rubric Engine",
      score,
      verdict,
      trapWarning: trapCheck.warning,
      strengths,
      improvements,
      kpResults,
      rewrittenSuggestion: questionObj.rightAnswer
    };
  }

  // Optional Live Gemini API Audit
  async function runGeminiApiAudit(apiKey, model, questionObj, userText) {
    const prompt = `Bạn là một Senior IT System & Network Architect đang phỏng vấn và huấn luyện (Mentor) cho một học viên thực chiến.
Hãy audit (chấm điểm và phân tích chi tiết) câu trả lời của học viên cho câu hỏi phỏng vấn sau:

- Câu hỏi phỏng vấn: "${questionObj.question}"
- Bẫy trả lời sai thường gặp: "${questionObj.wrongAnswer}"
- Đáp án chuẩn nguyên lý: "${questionObj.rightAnswer}"
- Các ý chốt bắt buộc phải có: ${JSON.stringify(questionObj.keyPoints || [])}

- Câu trả lời thực tế của học viên: "${userText}"

Hãy trả về đúng định dạng JSON (không bọc markdown) theo schema:
{
  "score": number (thang điểm 10, ví dụ 7.5 hoặc 3.5),
  "verdict": "Nhận xét tổng quát 1-2 câu (xưng 'mình' - gọi 'cậu')",
  "trapWarning": "Nếu học viên dính bẫy nguyên lý (ví dụ gộp chung IP và MAC của router, hoặc nhầm lẫn khái niệm), cảnh báo rõ ràng ở đây; nếu không dính bẫy thì để null",
  "strengths": ["Điểm học viên đã trả lời đúng 1", "Điểm đúng 2"],
  "improvements": ["Điểm học viên dùng sai thuật ngữ (như submask -> Subnet Mask) hoặc giải thích thiếu cơ chế sâu (như thiếu giải thích tại sao không cần DNS là do gõ thẳng IP chứ không phải do cùng dải)", "Điểm cần bổ sung 2"],
  "kpResults": [
    { "keyPoint": "Tên ý chốt", "status": "matched" | "partial" | "missing", "note": "Nhận xét ngắn" }
  ],
  "rewrittenSuggestion": "Viết lại câu trả lời dựa trên ý của học viên nhưng nâng cấp lên chuẩn Senior 10/10"
}`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${
      model || "gemini-2.5-flash"
    }:generateContent?key=${encodeURIComponent(apiKey)}`;

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.2,
          responseMimeType: "application/json"
        }
      })
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Gemini API Error (${res.status}): ${errText}`);
    }

    const data = await res.json();
    const rawJson =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
    const parsed = JSON.parse(rawJson);
    return {
      mode: `Gemini AI (${model || "gemini-2.5-flash"})`,
      score: Number(parsed.score) || 5,
      verdict: parsed.verdict || "",
      trapWarning: parsed.trapWarning || null,
      strengths: parsed.strengths || [],
      improvements: parsed.improvements || [],
      kpResults: parsed.kpResults || [],
      rewrittenSuggestion:
        parsed.rewrittenSuggestion || questionObj.rightAnswer
    };
  }

  window.AI_AUDITOR = {
    loadAiConfig,
    saveAiConfig,
    async auditAnswer(questionObj, userText) {
      const cfg = loadAiConfig();
      if (cfg.apiKey && cfg.apiKey.trim().length > 10) {
        try {
          return await runGeminiApiAudit(
            cfg.apiKey.trim(),
            cfg.model,
            questionObj,
            userText
          );
        } catch (err) {
          console.warn(
            "Gemini API call failed, falling back to built-in Smart AI Mentor Engine:",
            err
          );
          const fallback = runLocalSmartAudit(questionObj, userText);
          fallback.mode =
            "AI Mentor Engine (Fallback - Kiểm tra lại API Key nếu muốn gọi Gemini Cloud)";
          return fallback;
        }
      }
      return runLocalSmartAudit(questionObj, userText);
    }
  };
})();
