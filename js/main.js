/* ============================================================
 * 贵州师范大学国际教育学院 · 展示网站逻辑
 * ============================================================ */
(function () {
  "use strict";
  var D = window.SIE;

  /* ---------- 导航滚动态 ---------- */
  var nav = document.getElementById("topnav");
  var navLinks = document.getElementById("navLinks");
  var navToggle = document.getElementById("navToggle");
  function onScroll() { nav.classList.toggle("scrolled", window.scrollY > 40); }
  window.addEventListener("scroll", onScroll); onScroll();
  navToggle.addEventListener("click", function () { navLinks.classList.toggle("open"); });
  navLinks.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () { navLinks.classList.remove("open"); });
  });

  /* ---------- 首屏动态背景轮播 ---------- */
  var slides = Array.prototype.slice.call(document.querySelectorAll("#heroSlides .hero-slide"));
  var dotsBox = document.getElementById("heroDots");
  var slideIndex = 0, slideTimer = null;
  function goSlide(i) {
    slideIndex = (i + slides.length) % slides.length;
    slides.forEach(function (s, k) { s.classList.toggle("active", k === slideIndex); });
    Array.prototype.forEach.call(dotsBox.children, function (d, k) { d.classList.toggle("active", k === slideIndex); });
  }
  function nextSlide() { goSlide(slideIndex + 1); }
  function restartSlide() { clearInterval(slideTimer); slideTimer = setInterval(nextSlide, 6000); }
  slides.forEach(function (_, i) {
    var d = document.createElement("span");
    d.className = "hero-dot" + (i === 0 ? " active" : "");
    d.addEventListener("click", function () { goSlide(i); restartSlide(); });
    dotsBox.appendChild(d);
  });
  restartSlide();

  /* ---------- 首屏指标 ---------- */
  var heroMetrics = document.getElementById("heroMetrics");
  D.heroMetrics.forEach(function (m) {
    heroMetrics.insertAdjacentHTML("beforeend",
      '<div class="hm"><div class="num" data-v="' + m.value + '" data-suffix="' + m.suffix + '">0</div>' +
      '<div class="lab">' + m.label + '</div></div>');
  });

  /* ---------- 核心数据看板卡片 ---------- */
  var board = document.getElementById("boardGrid");
  D.metrics.forEach(function (m) {
    board.insertAdjacentHTML("beforeend",
      '<div class="board-card reveal"><div class="bc-ico">' + m.icon + '</div>' +
      '<div class="bc-num"><span class="n" data-v="' + m.value + '">0</span><i>' + m.suffix + '</i></div>' +
      '<div class="bc-lab">' + m.label + '</div><div class="bc-note">' + m.note + '</div></div>');
  });

  /* ---------- 数字滚动 ---------- */
  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-v"), 10) || 0;
    var suffix = el.getAttribute("data-suffix") || "";
    var dur = 1400, start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(0) + "".replace(/0$/, "") + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString("zh-CN") + suffix;
    }
    requestAnimationFrame(step);
  }

  /* ---------- 发展历程 ---------- */
  var tl = document.getElementById("timelineList");
  D.timeline.forEach(function (t) {
    tl.insertAdjacentHTML("beforeend",
      '<div class="tl-item reveal"><div class="tl-year">' + t.year + '</div>' +
      '<h4>' + t.title + '</h4><p>' + t.desc + '</p></div>');
  });

  /* ---------- 合作院校列表 ---------- */
  var pl = document.getElementById("partnerList");
  D.partners.listed.forEach(function (p) {
    var flag = p.country === "美国" ? "🇺🇸" : "🇬🇧";
    pl.insertAdjacentHTML("beforeend",
      '<div class="pl-item"><span class="pl-flag">' + flag + '</span>' +
      '<div><div class="pl-name">' + p.name + '</div><div class="pl-country">' + p.country + '</div></div></div>');
  });
  pl.insertAdjacentHTML("beforeend",
    '<div class="pl-total">等等 <b>' + D.partners.total + '</b> 所英美院校及机构</div>');

  /* ---------- 师资亮点 ---------- */
  var fg = document.getElementById("facultyGrid");
  var facIcons = ["🌏", "🗣️", "🎖️"];
  D.faculty.forEach(function (f, i) {
    fg.insertAdjacentHTML("beforeend",
      '<div class="fac-card reveal"><div class="fc-ico">' + facIcons[i % 3] + '</div><p>' + f + '</p></div>');
  });

  /* ---------- 使命愿景 ---------- */
  var ml = document.getElementById("missionList");
  D.mission.forEach(function (m, i) {
    ml.insertAdjacentHTML("beforeend",
      '<div class="mis-item reveal"><span class="mi-no">0' + (i + 1) + '</span><p>' + m + '</p></div>');
  });

  /* ---------- 联系方式 ---------- */
  document.getElementById("contactInfo").innerHTML =
    '<div class="ci-item"><span class="ci-ico">📍</span>' +
    '<div><div class="ci-lab">学院地址</div><div class="ci-val">' + D.contact.address + '</div>' +
    '<div class="ci-val small">邮编 ' + D.contact.postalCode + '</div></div></div>' +
    '<div class="ci-item"><span class="ci-ico">📞</span>' +
    '<div><div class="ci-lab">学院办公室</div><div class="ci-val">' + D.contact.phoneOffice + '</div>' +
    '<div class="ci-lab" style="margin-top:6px;">学生科 / 学院团委</div><div class="ci-val">' + D.contact.phoneStudents + '</div></div></div>' +
    '<div class="ci-item"><span class="ci-ico">✉️</span>' +
    '<div><div class="ci-lab">电子邮箱</div><div class="ci-val">' + D.contact.email + '</div></div></div>' +
    '<div class="ci-item"><span class="ci-ico">🌐</span>' +
    '<div><div class="ci-lab">学院官网</div><div class="ci-val"><a href="' + D.meta.website + '" target="_blank" rel="noopener">' + D.meta.website + '</a></div></div></div>';

  /* ==========================================================
   * ECharts 可视化
   * ========================================================== */
  var charts = [];
  function mk(id) { var dom = document.getElementById(id); var c = echarts.init(dom); charts.push(c); return c; }

  /* 图表配色（深色主题） */
  var LT = "#e7eef8", MUT = "#9db4cc";

  /* 1. 本科专业 × 国际项目分布（单系列横向条形图：每专业一行、颜色按项目区分，无文字叠加） */
  var projInfo = [
    { abbr: "SQA AD",      full: "英国高等教育文凭项目",                          color: "#6fc0f5" },
    { abbr: "IGEC",        full: "国际通识教育课程",                              color: "#d9a94b" },
    { abbr: "中美合作办学", full: "与美国中央俄克拉荷马大学合作的音乐学本科项目", color: "#3fd3bd" }
  ];
  var progRows = [
    { name: "旅游管理（国际酒店管理方向）", proj: 0 },
    { name: "计算机科学与技术（软件开发方向）", proj: 0 },
    { name: "市场营销", proj: 1 },
    { name: "旅游管理", proj: 1 },
    { name: "音乐学", proj: 2 }
  ];
  mk("chartProgram").setOption({
    tooltip: {
      trigger: "item",
      backgroundColor: "rgba(6,15,29,.95)", borderColor: "rgba(255,255,255,.18)",
      textStyle: { color: "#fff", fontSize: 16 },
      formatter: function (p) {
        var r = progRows[p.dataIndex];
        return "<b>" + r.name + "</b><br>归口：" + projInfo[r.proj].full;
      }
    },
    legend: {
      bottom: 0, selectedMode: false,
      data: projInfo.map(function (p) { return p.abbr; }),
      textStyle: { color: LT, fontSize: 15 },
      itemWidth: 24, itemHeight: 16, icon: "rect"
    },
    grid: { left: "2%", right: "10%", top: "8%", bottom: "10%", containLabel: true },
    xAxis: { type: "value", max: 1.35, show: false },
    yAxis: {
      type: "category",
      data: progRows.map(function (r) { return r.name; }),
      inverse: true,
      axisLabel: { color: LT, fontSize: 16, width: 320, overflow: "break", lineHeight: 24 },
      axisLine: { lineStyle: { color: "rgba(255,255,255,.24)" } },
      axisTick: { show: false },
      offset: 10
    },
    series: [{
      type: "bar",
      barWidth: 40,
      data: progRows.map(function (r) {
        var pi = projInfo[r.proj];
        return {
          value: 1,
          itemStyle: { color: pi.color, borderRadius: 12 },
          label: { show: true, position: "right", color: pi.color, fontWeight: 700, fontSize: 16, formatter: pi.abbr }
        };
      }),
      emphasis: { itemStyle: { shadowBlur: 18, shadowColor: "rgba(255,255,255,.28)" } }
    }]
  });

  /* 2. 合作院校国家占比（环形） */
  var cnt = {}; D.partners.listed.forEach(function (p) { cnt[p.country] = (cnt[p.country] || 0) + 1; });
  var pData = Object.keys(cnt).map(function (k) { return { name: k, value: cnt[k] }; });
  mk("chartPartnerPie").setOption({
    tooltip: { trigger: "item", backgroundColor: "rgba(6,15,29,.92)", borderColor: "rgba(255,255,255,.15)", textStyle: { color: "#fff" }, formatter: "{b}：{c} 所（{d}%）" },
    legend: { bottom: 0, icon: "circle", textStyle: { color: LT, fontSize: 16 } },
    color: ["#5da9e8", "#d9a94b"],
    title: { text: "55", subtext: "合作院校总数", left: "center", top: "36%", textStyle: { fontSize: 60, fontWeight: 800, color: "#fff" }, subtextStyle: { color: MUT, fontSize: 18 } },
    series: [{
      type: "pie", radius: ["54%", "72%"], center: ["50%", "46%"],
      avoidLabelOverlap: true,
      label: { show: true, formatter: "{b}\n{c} 所", lineHeight: 24, color: LT, fontSize: 16 },
      data: pData,
      itemStyle: { borderColor: "#0a1622", borderWidth: 4, borderRadius: 8 },
      emphasis: { label: { fontSize: 20, fontWeight: 700, color: "#fff" } }
    }]
  });

  /* 3. 国际合作资源版图（关系图） */
  var uniColor = { 美国: "#5da9e8", 英国: "#d9a94b" };
  var uniFlag = { 美国: "🇺🇸", 英国: "🇬🇧" };
  var nodes = [{ name: "国际教育学院", category: 0, symbolSize: 96, itemStyle: { color: "#3fd3bd" }, label: { color: "#fff", fontSize: 18, fontWeight: 700 } }];
  D.partners.listed.forEach(function (p) {
    nodes.push({ name: p.name, category: 1, symbolSize: 34, itemStyle: { color: uniColor[p.country] }, label: { color: LT, fontSize: 16 } });
  });
  var links = D.partners.listed.map(function (p) {
    return { source: p.name, target: "国际教育学院", label: { show: true, formatter: uniFlag[p.country], fontSize: 22 } };
  });
  mk("chartPartnerGraph").setOption({
    tooltip: { trigger: "item", backgroundColor: "rgba(6,15,29,.92)", borderColor: "rgba(255,255,255,.15)", textStyle: { color: "#fff" }, formatter: "{b}" },
    legend: { bottom: 0, data: ["国际教育学院", "合作院校"], textStyle: { color: LT, fontSize: 16 }, icon: "circle" },
    series: [{
      type: "graph", layout: "force",
      data: nodes, links: links,
      categories: [{ name: "国际教育学院" }, { name: "合作院校" }],
      roam: true,
      force: { repulsion: 340, edgeLength: 150, gravity: 0.1, friction: 0.6 },
      labelLayout: { hideOverlap: false },
      lineStyle: { color: "source", curveness: 0.15, width: 2, opacity: 0.6 },
      emphasis: { focus: "adjacency", lineStyle: { width: 3.5 } },
      label: { position: "bottom", fontSize: 15, color: "#ffffff" }
    }]
  });

  /* 4. 组织机构树 */
  function leadNodes() {
    return D.leadership.positions.map(function (pos) {
      return { name: pos.persons.join("、"), value: pos.title, itemStyle: { color: "#e0b25e" } };
    });
  }
  var orgRoot = {
    name: "贵州师范大学\n国际教育学院",
    itemStyle: { color: "#d9a94b" },
    label: { color: "#fff", fontSize: 18, fontWeight: 800, lineHeight: 24 },
    children: [
      { name: "领导团队", itemStyle: { color: "#5da9e8" }, label: { color: "#fff" }, children: leadNodes() },
      { name: "管理机构", itemStyle: { color: "#3fd3bd" }, label: { color: "#fff" }, children: D.offices.map(function (o) { return { name: o.name, value: o.phone }; }) },
      { name: "教学院系", itemStyle: { color: "#b29bf3" }, label: { color: "#fff" }, children: D.departments.map(function (d) { return { name: d.name, value: d.phone || "" }; }) }
    ]
  };
  mk("chartOrg").setOption({
    tooltip: { trigger: "item", backgroundColor: "rgba(6,15,29,.92)", borderColor: "rgba(255,255,255,.15)", textStyle: { color: "#fff" }, formatter: function (p) { return "<b>" + p.name + "</b>" + (p.value ? "<br>" + p.value : " · —"); } },
    series: [{
      type: "tree", data: [orgRoot],
      left: "4%", right: "10%", top: "6%", bottom: "4%",
      orient: "LR", symbol: "circle", symbolSize: 9,
      expandAndCollapse: true,
      label: { position: "left", verticalAlign: "middle", align: "right", fontSize: 16, color: LT },
      leaves: { label: { position: "right", verticalAlign: "middle", align: "left", fontSize: 16, color: LT } },
      lineStyle: { color: "rgba(255,255,255,.28)", width: 2, curveness: 0.55 },
      itemStyle: { borderColor: "rgba(255,255,255,.6)", borderWidth: 2 },
      emphasis: { focus: "descendant" }
    }]
  });

  /* ---------- 视口进入触发动效 + 数字滚动 ---------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        e.target.querySelectorAll(".n, [data-v]").forEach(animateCount);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.18 });
  document.querySelectorAll(".reveal, .board-card").forEach(function (el) { io.observe(el); });
  // 首屏分级滚动：hero 指标直接进入视口即触发
  document.querySelectorAll("#heroMetrics .num, #heroMetrics [data-v]").forEach(animateCount);

  /* ---------- 自适应 ---------- */
  var rto;
  window.addEventListener("resize", function () {
    clearTimeout(rto); rto = setTimeout(function () { charts.forEach(function (c) { c.resize(); }); }, 150);
  });
})();