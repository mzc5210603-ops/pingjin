/* ═══════════ 包袱铺 · 逻辑层 ═══════════ */
"use strict";

const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);
const rnd = (a) => a[Math.floor(Math.random() * a.length)];

/* ── 剧目切换 ── */
$("#showtabs").addEventListener("click", (e) => {
  const tab = e.target.closest(".stab");
  if (!tab) return;
  $$(".stab").forEach((t) => t.classList.remove("active"));
  tab.classList.add("active");
  $$(".show").forEach((s) => (s.hidden = s.id !== tab.dataset.t));
  const cur = $("#" + tab.dataset.t);
  cur.style.animation = "none"; void cur.offsetWidth; cur.style.animation = "";
});

/* ═══════════ 甲 · 单口段子机 ═══════════ */
const JOKES = {
  上班: {
    setups: [
      "我们公司说弹性工作制，",
      "老板说把我当兄弟，",
      "入职时 HR 说这里扁平化管理，",
      "我们开周会的地方叫「头脑风暴室」，",
      "公司福利里写着下午茶免费，",
      "领导说年轻人要多学习，",
    ],
    punches: [
      "后来我才知道，弹的是我，性是它。",
      "发工资那天兄弟只给我转了个表情包。",
      "扁平到我的工位和打印机拼桌。",
      "确实，每次进去头脑都风暴，出来脑子一片空白。",
      "免费的只有茶，下午没了，活还是我的。",
      "学了一年，学会了在梦里回「收到」。",
    ],
  },
  减肥: {
    setups: [
      "我最近在轻断食，",
      "朋友问我是怎么瘦下来的，",
      "我办了张健身年卡，",
      "我的减肥计划很科学，",
      "称了一下体重，比上个月轻了两斤，",
      "医生说我需要管住嘴，",
    ],
    punches: [
      "轻的是体重，断的是我对自己的判断。",
      "我说是呼吸掉了的，没人信。",
      "一年去了两次：办卡那次，和退卡那次。",
      "周一到周日规划得明明白白，执行日期永远在下周。",
      "原来是我把手机放秤上了。",
      "当晚我就管住了，嘴决定先吃顿好的告别一下。",
    ],
  },
  恋爱: {
    setups: [
      "对象说喜欢有安全感的男生，",
      "她说我们之间要坦诚，",
      "女朋友生气让我猜她怎么了，",
      "相亲对象问我有什么优点，",
      "她说感情里最重要的是仪式感，",
      "吵架她说「你走」，",
    ],
    punches: [
      "所以我练出了能把快递全扛上六楼的臂力。",
      "于是我把购物车截图发给了她。",
      "我猜了三次，错了四次，至今不明。",
      "我说：按时吃饭。她说这是养老院招生标准。",
      "于是我每天早上给她发打卡截图。",
      "我走了两步就回来了，她说她更气了，还得哄。",
    ],
  },
  编程: {
    setups: [
      "我的代码在测试环境跑得好好的，",
      "产品经理说这个需求很简单，",
      "我给变量取名叫 temp，",
      "面试官问我最大的优点，",
      "我写了个防呆设计，",
      "上线前我说这版稳了，",
    ],
    punches: [
      "一上生产，它就学会了自己抛异常。",
      "确实简单，他只用一句话说完了三年的迭代。",
      "三个月后它成了全项目最重要的变量，没人敢动。",
      "我说遇事不慌，先 git blame 别人。",
      "上线第二天，证明了用户比呆更厉害。",
      "当晚它就教育了我：稳，只是没到时候。",
    ],
  },
  考试: {
    setups: [
      "考前我复习得特别充分，",
      "老师说这次考试不考死记硬背，",
      "我带了一支「逢考必过」的笔，",
      "考场上我看同桌写得飞快，",
      "出成绩那天我妈特别冷静，",
      "有道题让我写出解题思路，",
    ],
    punches: [
      "充分到梦里全对，卷子上全空。",
      "果然，考的是我背不下来的那部分。",
      "它很灵，真的过了——分数线，在下二十名。",
      "抄完才发现，他也不会。",
      "冷静到第二天给我报了三个补习班。",
      "我写了「冥想」，老师给了零分和一次谈话。",
    ],
  },
  存钱: {
    setups: [
      "我给自己定了每月存三千的目标，",
      "记账软件说我这个月餐饮占比百分之六十，",
      "朋友劝我做点理财，",
      "我研究了一晚上基金，",
      "双十一我立誓只买必需品，",
      "钱包里放了一张全家福，",
    ],
    punches: [
      "第一个月就实现了目标的一半——存了一千五的负债。",
      "剩下百分之四十是奶茶替我喝掉的。",
      "我理了，财没来。",
      "第二天它就教我认识了绿这个颜色的多种层次。",
      "结账时，购物车替我重新定义了必需。",
      "为了花钱的时候能看一眼家人失望的眼神。",
    ],
  },
  健身: {
    setups: [
      "我跟着健身博主的视频练，",
      "健身房教练说我很有天赋，",
      "我每天坚持走一万步，",
      "练完卧推第二天，",
      "我买了套运动服激励自己，",
      "体测报告说我体脂率超标，",
    ],
    punches: [
      "他练了三年，我看了三年，我们都很稳定。",
      "天赋是充卡方面，我一次充了两年。",
      "从工位到奶茶店，走了三个来回。",
      "胳膊抬不起来，我打车去的医院。",
      "效果显著，运动服成了我最贵的家居服。",
      "我把报告折成了纸飞机，让它也运动运动。",
    ],
  },
  点外卖: {
    setups: [
      "外卖软件说我是什么「超级会员」，",
      "我点了一份「微辣」，",
      "骑手打电话说马上到，",
      "满减凑单凑了半小时，",
      "商家备注写着「现炒更香」，",
      "我给差评只给了三个字，",
    ],
    punches: [
      "超级在每单都比别人多两块配送费。",
      "它对我的口腔发起了饱和式打击。",
      "那通电话之后，他又去隔壁城市绕了一圈。",
      "省了五块，多买了一箱我根本不吃的火腿肠。",
      "我等了四十分钟，香没等到，凉先到了。",
      "商家回了我八百字小作文，还@了平台。",
    ],
  },
};

let curJoke = null;
let curTopic = "上班";

$("#topics").addEventListener("click", (e) => {
  const t = e.target.closest(".topic");
  if (!t) return;
  $$(".topic").forEach((x) => x.classList.remove("active"));
  t.classList.add("active");
  curTopic = t.dataset.k;
  const total = JOKES[curTopic].setups.length * JOKES[curTopic].punches.length;
  $("#jokeCount").textContent = `「${curTopic}」话题库存 ${total} 种组合`;
});

function tellJoke() {
  const bank = JOKES[curTopic];
  const setup = rnd(bank.setups);
  let punch = rnd(bank.punches);
  let guard = 0;
  while (curJoke && curJoke.punch === punch && guard++ < 8) punch = rnd(bank.punches);
  curJoke = { kind: "段子", text: setup + punch, setup, punch, topic: curTopic };
  $("#jokeCard").hidden = false;
  const card = $("#jokeCard");
  card.style.animation = "none"; void card.offsetWidth; card.style.animation = "";
  $("#jokeSetup").textContent = setup;
  $("#jokePunch").textContent = punch;
  $("#jokeSave").hidden = false;
  $("#jokeCopy").hidden = false;
}
$("#jokeGo").addEventListener("click", tellJoke);
$("#jokeCopy").addEventListener("click", () => {
  navigator.clipboard?.writeText(curJoke.text);
  flash("#jokeCopy", "复制");
});
$("#jokeSave").addEventListener("click", () => saveNote(curJoke));

/* ═══════════ 乙 · 小品剧本工坊 ═══════════ */
const CAST2 = [
  ["大鹏", "小燕"],
  ["老陈", "阿花"],
  ["铁柱", "翠兰"],
  ["老周", "小美"],
];
const CAST3 = [["大鹏", "小燕", "房东王姨"], ["老陈", "阿花", "物业小李"], ["铁柱", "翠兰", "隔壁老王"]];
const OPENERS = [
  "（灯亮。{A}推门进来，风风火火。）",
  "（幕启。{A}正在数钱，数着数着叹了口气。）",
  "（台上只有一把椅子。{A}坐上去又立刻弹起来。）",
];
const BANTER = {
  误会: [
    "{A}：你听我解释！\n{B}：我不听我不听——你说。",
    "{A}：这事儿吧，说来话长。\n{B}：那就长话短说。\n{A}：短说就是：完了。",
    "{B}：你不是说今天去办正事吗？\n{A}：对啊，我正在办。\n{B}：办什么？\n{A}：正在想。",
  ],
  反转: [
    "{A}：其实我一直没敢告诉你……\n{B}：你说。\n{A}：那天的事，根本不是我干的。\n{B}：我知道，监控拍的是我。",
    "{A}：我攒了很久，就为了今天这句话。\n{B}：（感动）你说。\n{A}：借我五百。",
    "{B}：你老实交代，钱花哪儿了？\n{A}：给你买礼物了。\n{B}：（掏出）就这个秤？\n{A}：让你天天称体重，气就消得慢。",
  ],
  夸张: [
    "{A}：我跟你讲，这事儿要成了，咱这条街都得改名。\n{B}：改什么？\n{A}：改成咱俩名字。",
    "{A}：我练过！\n{B}：练过什么？\n{A}：练过胆儿——练完更虚了。",
    "{B}：你到底行不行？\n{A}：我不行的话，这世界上就没行的人了。\n{B}：那你可太重要了。",
  ],
  无厘头: [
    "{A}：我跟你说个秘密，你别告诉别人。\n{B}：（掏出手机）你说，我开个录音。\n{A}：……你这算保密协议吗？",
    "{A}：刚才有只猫看了我一眼。\n{B}：然后呢？\n{A}：我觉得它懂我。\n{B}：它懂你什么？\n{A}：懂我今天没吃饱。",
    "{B}：你手里拿的什么？\n{A}：充电宝。\n{B}：那为什么在漏沙子？\n{A}：它老年化了。",
  ],
};
const TWISTS = [
  "{B}：等等——你说的是「{theme}」？\n{A}：对啊。\n{B}：那咱俩吵了半天，吵的根本不是一件事！\n（两人对视，同时叹气。）",
  "{A}：其实我早看出来了。\n{B}：看出什么？\n{A}：今天这场「{theme}」，从头到尾就你一个人当真。\n（灯暗，收。）",
  "{B}：（拍桌）行！这「{theme}」我不管了！\n{A}：（小声）那……晚饭吃什么？\n{B}：（秒回）楼下新开那家。\n（灯暗。）",
  "{A}：都别吵了！其实今天是我生日。\n{B}：你上礼拜才过过。\n{A}：上礼拜是农历。\n（全体沉默两秒，集体鼓掌。）",
];
const ENDINGS = [
  "（全体亮相，鞠躬。大幕合上，掌声中灯灭。）",
  "（音乐起，三人定格。追光收成一点，黑场。）",
  "（{A}回头对观众：这事儿，咱下周接着说。灯灭。）",
];

function buildScript() {
  const theme = $("#scTheme").value.trim() || rnd(["相亲", "年会", "体检", "搬家", "网购", "减肥"]);
  const castN = +$("#scCast").value;
  const style = $("#scStyle").value;
  const cast = rnd(castN === 2 ? CAST2 : CAST3);
  const [A, B] = cast;

  const fill = (t) => t.replaceAll("{A}", A).replaceAll("{B}", B).replaceAll("{theme}", theme);
  const banter = rnd(BANTER[style]);

  const lines = [
    `《${theme}${style === "反转" ? "惊魂" : style === "夸张" ? "风云" : "那些事"}》`,
    `人物：${cast.join(" / ")}`,
    `类型：${style === "误会" ? "误会连环" : style === "反转" ? "结尾反转" : style === "夸张" ? "一路夸张" : "无厘头"}小品 · 时长约 5 分钟`,
    "",
    "【第一幕 · 铺垫】",
    fill(rnd(OPENERS)),
    `${A}：这${theme}的事儿，我可盼了好久了。`,
    `${B}：（上下打量）就你？`,
    `${A}：怎么，不像？`,
    `${B}：像，太像了——像上次那个${theme}搞砸的你。`,
    "",
    "【第二幕 · 冲突】",
    fill(banter),
    "",
    "【第三幕 · 反转收尾】",
    fill(rnd(TWISTS)),
    "",
    fill(rnd(ENDINGS)),
    "",
    "（剧终）",
  ];
  return { kind: "剧本", title: `《${theme}》小品`, text: lines.join("\n") };
}

let curScript = null;
function renderScript() {
  curScript = buildScript();
  $("#scTitle").textContent = curScript.title;
  $("#scriptBody").textContent = curScript.text;
  $("#scriptSheet").hidden = false;
  const sheet = $("#scriptSheet");
  sheet.style.animation = "none"; void sheet.offsetWidth; sheet.style.animation = "";
}
$("#scGo").addEventListener("click", renderScript);
$("#scRedo").addEventListener("click", renderScript);
$("#scCopy").addEventListener("click", () => {
  navigator.clipboard?.writeText(curScript.text);
  flash("#scCopy", "复制全文");
});
$("#scSave").addEventListener("click", () => saveNote(curScript));

/* ═══════════ 丙 · 谐音梗制造机 ═══════════ */
const PUNS = [
  { w: "蕉绿", base: "焦虑", line: "香蕉一绿，我整个人就跟着蕉绿了。", exp: "「蕉」谐「焦」，配上香蕉皮的颜色，双杀。" },
  { w: "蚌埠住了", base: "绷不住了", line: "看到工资条那一刻，我蚌埠住了。", exp: "安徽蚌埠 + 绷不住，地名梗祖师爷。" },
  { w: "栓Q", base: "thank you", line: "老板夸我PPT做得好，栓Q，我连夜又改了八版。", exp: "中式发音的 thank you，礼貌中带着疲惫。" },
  { w: "泰裤辣", base: "太酷啦", line: "凌晨三点改完需求，泰裤辣！酷得我直哆嗦。", exp: "发音混搭，越读越离谱，离谱就对了。" },
  { w: "尊嘟假嘟", base: "真的假的", line: "尊嘟假嘟？今晚不用加班？尊嘟。假嘟，是线上故障。", exp: "嗲化发音，反差萌外壳包着悲剧内核。" },
  { w: "耗子尾汁", base: "好自为之", line: "年轻人不讲武德，劝你耗子尾汁。", exp: "武术大师名场面，互联网永久产权。" },
  { w: "夺笋呐", base: "多损呐", line: "把闹钟设成老板语音的，你可真是夺笋呐。", exp: "「多损」快读成「夺笋」，损友专用语。" },
  { w: "栓不住", base: "拴不住", line: "我这颗想辞职的心，是栓不住的。", exp: "栓Q 的近亲，主打一个跑得快。" },
  { w: "有bear来", base: "有备而来", line: "他带着三个充电宝来开会，一看就是有bear来。", exp: "bear = 备，英文谐音混入中文句式。" },
  { w: "duck不必", base: "大可不必", line: "为了省两块钱跑三条街？duck不必。", exp: "duck 谐「大可」，鸭界首次参与造梗。" },
  { w: "书念得好好地", base: "属你念得好", line: "全组就你汇报不磕巴，书念得好好地。", exp: "快读连音梗，考场与职场通用。" },
  { w: "体trainer", base: "体育老师", line: "我数学是体trainer教的。", exp: "中英夹杂式谐音，气死语文老师。" },
  { w: "干啥啥不行", base: "干啥啥不行", line: "干啥啥不行，吃饭第一名——这个不算谐音，算扎心。", exp: "控制组：用来提醒你谐音梗的边界。" },
  { w: "鸭力山大", base: "压力山大", line: "月底冲业绩，鸭力山大。", exp: "压力 + 鸭 = 鸭力，畜类负担最重的一晚。" },
  { w: "蕉个朋友", base: "交个朋友", line: "来，蕉个朋友，我请你吃香蕉。", exp: "蕉绿家族二哥，社交场合专属。" },
  { w: "鱼块", base: "愉快", line: "祝大家天天鱼块，顿顿有鱼。", exp: "鱼 = 愉，年夜饭桌必备吉祥话。" },
  { w: "薯于你", base: "属于你", line: "这包薯片，薯于你。", exp: "薯 = 属，零食界最深情的告白。" },
  { w: "梨不开你", base: "离不开你", line: "秋天的第一个梨：梨不开你。", exp: "梨 = 离，水果谐音三大常驻嘉宾。" },
  { w: "橙心橙意", base: "诚心诚意", line: "这箱橙子送你，橙心橙意。", exp: "橙 = 诚，果篮社交货币。" },
  { w: "柿柿如意", base: "事事如意", line: "吃个柿子，柿柿如意。", exp: "柿 = 事，谐音梗里的老字号。" },
  { w: "蟹蟹", base: "谢谢", line: "蟹蟹你嘞，改天请你吃螃蟹。", exp: "蟹 = 谢，自带回礼承诺。" },
  { w: "莓烦恼", base: "没烦恼", line: "吃颗草莓，莓烦恼。", exp: "莓 = 没，甜品店招牌常客。" },
  { w: "梨解一下", base: "理解一下", line: "您梨解一下，我真不是故意的。", exp: "梨 = 理，道歉专用果味版。" },
  { w: "花生了什么事", base: "发生了什么事", line: "到底花生了什么事？", exp: "花 = 发，考古级网络老梗，用了就是情怀。" },
];

function showPun(p) {
  $("#punResult").hidden = false;
  const r = $("#punResult");
  r.style.animation = "none"; void r.offsetWidth; r.style.animation = "";
  $("#punWord").textContent = p.w;
  $("#punLine").textContent = p.line;
  $("#punExp").textContent = "梗解释：" + p.exp;
}
$("#punGo").addEventListener("click", () => {
  const key = $("#punIn").value.trim();
  const note = $("#punNote");
  if (!key) { note.hidden = false; note.textContent = "先输入一个词，铺子才知道往哪翻。"; return; }
  const hits = PUNS.filter((p) => p.w.includes(key) || p.base.includes(key) || p.line.includes(key));
  if (hits.length === 0) {
    note.hidden = false;
    note.textContent = `「${key}」没翻到梗——这词太正了，谐音梗都绕着走。试试「焦虑 / 谢谢 / 压力」？`;
    $("#punResult").hidden = true;
    return;
  }
  note.hidden = false;
  note.textContent = `翻到 ${hits.length} 个梗，随机抖一个：`;
  showPun(rnd(hits));
});
$("#punRand").addEventListener("click", () => {
  $("#punNote").hidden = true;
  showPun(rnd(PUNS));
});

/* ═══════════ 丁 · 段子手账（localStorage） ═══════════ */
const NB_KEY = "baofupu_notes_v1";
let notes = [];
try { notes = JSON.parse(localStorage.getItem(NB_KEY) || "[]"); } catch { notes = []; }

function persist() {
  localStorage.setItem(NB_KEY, JSON.stringify(notes));
}
function saveNote(item) {
  notes.unshift({ kind: item.kind, text: item.text, title: item.title || item.topic || "", time: Date.now() });
  persist();
  renderNotes();
  const btn = $("#jokeSave");
  if (!btn.hidden) flash("#jokeSave", "收进手账");
}
function flash(sel, name) {
  const b = $(sel);
  const old = b.textContent;
  b.textContent = "✓ 已" + name.slice(-2) + "好";
  setTimeout(() => (b.textContent = old), 900);
}
function fmtTime(ts) {
  const d = new Date(ts);
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getMonth() + 1}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
}
function renderNotes() {
  const ul = $("#nbList");
  ul.innerHTML = "";
  $("#nbCount").textContent = `${notes.length} 条`;
  if (notes.length === 0) {
    ul.innerHTML = `<li><span style="color:var(--dim)">手账还空着——去前面抖两个包袱收进来。</span></li>`;
    return;
  }
  notes.forEach((n, i) => {
    const li = document.createElement("li");
    const tag = document.createElement("span");
    const kind = document.createElement("b");
    kind.className = "kind";
    kind.textContent = n.kind;
    tag.appendChild(kind);
    tag.appendChild(document.createTextNode(n.kind === "剧本" ? (n.title + "\n" + n.text.slice(0, 80) + "…") : n.text + `（${fmtTime(n.time)}）`));
    tag.style.whiteSpace = "pre-wrap";
    const del = document.createElement("button");
    del.textContent = "×";
    del.title = "删除";
    del.addEventListener("click", () => { notes.splice(i, 1); persist(); renderNotes(); });
    li.appendChild(tag);
    li.appendChild(del);
    ul.appendChild(li);
  });
}
$("#nbCopyAll").addEventListener("click", () => {
  if (notes.length === 0) return;
  navigator.clipboard?.writeText(notes.map((n) => `【${n.kind}】\n${n.text}`).join("\n\n———\n\n"));
});
$("#nbClear").addEventListener("click", () => {
  if (notes.length === 0) return;
  if (!confirm("手账要全撕掉吗？收着的包袱可就都没了。")) return;
  notes = [];
  persist();
  renderNotes();
});

/* ── 初始化 ── */
tellJoke();
$("#punNote").hidden = true;
renderNotes();
