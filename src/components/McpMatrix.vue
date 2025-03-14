<script setup lang="ts">
import { ref, computed } from 'vue';

// 修改接口定义，添加可选的高亮字段
interface Item {
  name: string;
  description: string;
  url?: string;
  nameHighlighted?: string;
  descriptionHighlighted?: string;
}

interface Category {
  icon: string;
  title: string;
  items: Array<Item>;
  id: string;
}

// 搜索类别
const searchItems = [
  {
    name: "server-brave-search",
    description: "使用 Brave 的搜索 API 实现网页搜索功能",
    url: "https://github.com/modelcontextprotocol/server-brave-search"
  },
  {
    name: "nyt",
    description: "使用 NYTimes API 搜索文章",
    url: "https://github.com/angheljf/nyt"
  },
  {
    name: "server-fetch",
    description: "高效获取和处理网页内容，供 AI 使用",
    url: "https://github.com/modelcontextprotocol/server-fetch"
  },
  {
    name: "mcp-servers-kagi",
    description: "Kagi 搜索 API 集成",
    url: "https://github.com/ac3xx/mcp-servers-kagi"
  },
  {
    name: "exa-mcp-server",
    description: "模型上下文协议 (MCP) 服务器让 Claude 等 AI 助手可以使用 Exa AI Search API 进行网络搜索",
    url: "https://github.com/exa-labs/exa-mcp-server"
  },
  {
    name: "search1api-mcp",
    description: "通过 search1api 搜索（需要付费 API 密钥）",
    url: "https://github.com/fatwang2/search1api-mcp"
  },
  {
    name: "mcp-server-tavily",
    description: "Tavily AI 搜索 API",
    url: "https://github.com/Tomatio13/mcp-server-tavily"
  },
  {
    name: "mcp-tavily",
    description: "Tavily AI 搜索 API",
    url: "https://github.com/kshern/mcp-tavily"
  },
  {
    name: "arxiv-mcp-server",
    description: "搜索 ArXiv 研究论文",
    url: "https://github.com/blazickjp/arxiv-mcp-server"
  },
  {
    name: "mcp-webresearch",
    description: "在 Google 上搜索并对任何主题进行深度研究",
    url: "https://github.com/mzxrai/mcp-webresearch"
  },
  {
    name: "mcp-simple-arxiv",
    description: "MCP for LLM 用于搜索和阅读 arXiv 上的论文",
    url: "https://github.com/andybrandt/mcp-simple-arxiv"
  },
  {
    name: "mcp-simple-pubmed",
    description: "MCP 用于搜索和阅读 PubMed 中的医学/生命科学论文",
    url: "https://github.com/andybrandt/mcp-simple-pubmed"
  },
  {
    name: "mcp-server-rag-web-browser",
    description: "一个用于 Apify 的 RAG Web 浏览器 Actor 的 MCP 服务器，可以执行网页搜索、抓取 URL，并以 Markdown 格式返回内容",
    url: "https://github.com/apify/mcp-server-rag-web-browser"
  },
  {
    name: "MCP-searxng",
    description: "用于连接到 searXNG 实例的 MCP 服务器",
    url: "https://github.com/SecretiveShell/MCP-searxng"
  },
  {
    name: "Clojars-MCP-Server",
    description: "Clojars MCP 服务器，提供 Clojure 库的最新依赖信息",
    url: "https://github.com/Bigsy/Clojars-MCP-Server"
  },
  {
    name: "MCP-SearXNG",
    description: "SearXNG 的模型上下文协议服务器",
    url: "https://github.com/Ihor-Sokoliuk/MCP-SearXNG"
  },
  {
    name: "mcp-hn",
    description: "一个用于搜索 Hacker News、获取热门故事等的 MCP 服务器",
    url: "https://github.com/erithwik/mcp-hn"
  },
  {
    name: "google-news-mcp-server",
    description: "Google News 集成，具有自动主题分类、多语言支持，以及通过 SerpAPI 提供的标题、故事和相关主题的综合搜索功能",
    url: "https://github.com/chanmeng/google-news-mcp-server"
  },
  {
    name: "trieve",
    description: "通过 Trieve 爬取、嵌入、分块、搜索和检索数据集中的信息",
    url: "https://github.com/devflowinc/trieve"
  }
];

// 安全类别
const securityItems = [
  {
    name: "dnstwist MCP Server",
    description: "dnstwist 的 MCP 服务器，这是一个强大的 DNS 模糊测试工具，可帮助检测域名抢注、钓鱼和企业窃密行为",
    url: "https://github.com/example/dnstwist-mcp-server"
  },
  {
    name: "Maigret MCP Server",
    description: "maigret 的 MCP 服务器，maigret 是一款强大的 OSINT 工具，可从各种公共来源收集用户帐户信息",
    url: "https://github.com/example/maigret-mcp-server"
  },
  {
    name: "Shodan MCP Server",
    description: "MCP 服务器用于查询 Shodan API 和 Shodan CVEDB。此服务器提供 IP 查找、设备搜索、DNS 查找、漏洞查询、CPE 查找等工具",
    url: "https://github.com/example/shodan-mcp-server"
  },
  {
    name: "VirusTotal MCP Server",
    description: "用于查询 VirusTotal API 的 MCP 服务器。此服务器提供用于扫描 URL、分析文件哈希和检索 IP 地址报告的工具",
    url: "https://github.com/example/virustotal-mcp-server"
  },
  {
    name: "ORKL MCP Server",
    description: "用于查询 ORKL API 的 MCP 服务器。此服务器提供获取威胁报告、分析威胁行为者和检索威胁情报来源的工具",
    url: "https://github.com/example/orkl-mcp-server"
  },
  {
    name: "Security Audit MCP Server",
    description: "一个强大的 MCP (模型上下文协议) 服务器，审计 npm 包依赖项的安全漏洞。内置远程 npm 注册表集成，以进行实时安全检查",
    url: "https://github.com/example/security-audit-mcp-server"
  }
];

// 旅行与交通类别
const travelItems = [
  {
    name: "NS Travel Information MCP Server",
    description: "了解荷兰铁路 (NS) 的旅行信息、时刻表和实时更新",
    url: "https://github.com/example/ns-travel-mcp-server"
  }
];

// 版本控制类别
const versionControlItems = [
  {
    name: "server-github",
    description: "GitHub API集成用于仓库管理、PR、问题等",
    url: "https://github.com/modelcontextprotocol/server-github"
  },
  {
    name: "server-gitlab",
    description: "GitLab平台集成用于项目管理和CI/CD操作",
    url: "https://github.com/modelcontextprotocol/server-gitlab"
  },
  {
    name: "server-git",
    description: "直接的Git仓库操作，包括读取、搜索和分析本地仓库",
    url: "https://github.com/modelcontextprotocol/server-git"
  },
  {
    name: "mcp-git-ingest",
    description: "使用 LLM 阅读和分析 GitHub 存储库",
    url: "https://github.com/adhikasp/mcp-git-ingest"
  }
];

// 其他工具和集成类别
const otherToolsItems = [
  {
    name: "actors-mcp-server",
    description: "使用超过 3,000 个预构建的云工具（称为 Actors）从网站、电商、社交媒体、搜索引擎、地图等提取数据",
    url: "https://github.com/apify/actors-mcp-server"
  },
  {
    name: "contentful-mcp",
    description: "更新、创建、删除 Contentful Space 中的内容、内容模型和资产",
    url: "https://github.com/ivo-toby/contentful-mcp"
  },
  {
    name: "mcp-openai",
    description: "与 OpenAI 最智能的模型聊天",
    url: "https://github.com/mzxrai/mcp-openai"
  },
  {
    name: "godoc-mcp",
    description: "高效的 Go 文档服务器，让 AI 助手可以智能访问包文档和类型，而无需阅读整个源文件",
    url: "https://github.com/mrjoshuak/godoc-mcp"
  },
  {
    name: "mcp-server-openai",
    description: "直接从Claude查询OpenAI模型，使用MCP协议",
    url: "https://github.com/pierrebrunelle/mcp-server-openai"
  },
  {
    name: "server-everything",
    description: "MCP服务器，涵盖MCP协议的所有功能",
    url: "https://github.com/modelcontextprotocol/server-everything"
  },
  {
    name: "phabricator-mcp-server",
    description: "与Phabricator API交互",
    url: "https://github.com/baba786/phabricator-mcp-server"
  },
  {
    name: "mcp-obsidian",
    description: "通过REST API与Obsidian交互",
    url: "https://github.com/MarkusPfundstein/mcp-obsidian"
  },
  {
    name: "mcp-obsidian",
    description: "这是一个连接器，允许Claude Desktop（或任何MCP兼容应用程序）读取和搜索包含Markdown笔记的目录（如Obsidian库）",
    url: "https://github.com/calclavia/mcp-obsidian"
  },
  {
    name: "mcp-youtube",
    description: "获取YouTube字幕",
    url: "https://github.com/anaisbetts/mcp-youtube"
  },
  {
    name: "notion_mcp",
    description: "与Notion API集成，管理个人待办事项列表",
    url: "https://github.com/danhilse/notion_mcp"
  },
  {
    name: "wcgw",
    description: "自动化shell执行、计算机控制和编码代理。（Mac）",
    url: "https://github.com/rusiaaman/wcgw"
  },
  {
    name: "ancestry-mcp",
    description: "允许AI读取.ged文件和基因数据",
    url: "https://github.com/reeeeemo/ancestry-mcp"
  },
  {
    name: "apple-notes-mcp",
    description: "允许AI读取本地Apple Notes数据库（仅限macOS）",
    url: "https://github.com/sirmews/apple-notes-mcp"
  },
  {
    name: "coinmarket-mcp-server",
    description: "Coinmarket API集成，用于获取加密货币列表和报价",
    url: "https://github.com/anjor/coinmarket-mcp-server"
  },
  {
    name: "mcp-notion-server",
    description: "与Notion API交互",
    url: "https://github.com/suekou/mcp-notion-server"
  },
  {
    name: "unichat-mcp-server",
    description: "使用MCP协议通过工具或预定义的提示发送请求给OpenAI、MistralAI、Anthropic、xAI或Google AI。需要供应商API密钥",
    url: "https://github.com/amidabuddha/unichat-mcp-server"
  },
  {
    name: "mcp-miro",
    description: "访问 MIRO 白板，批量创建和读取项目。需要 REST API 的 OAUTH 密钥",
    url: "https://github.com/evalstate/mcp-miro"
  },
  {
    name: "jira-mcp-server",
    description: "通过 JQL 和 API 读取 Jira 数据，并执行创建和编辑工单的请求",
    url: "https://github.com/KS-GEN-AI/jira-mcp-server"
  },
  {
    name: "confluence-mcp-server",
    description: "通过 CQL 获取 Confluence 数据并阅读页面",
    url: "https://github.com/KS-GEN-AI/confluence-mcp-server"
  },
  {
    name: "mcp-atlassian",
    description: "Confluence工作区的自然语言搜索和内容访问",
    url: "https://github.com/sooperset/mcp-atlassian"
  },
  {
    name: "any-chat-completions-mcp",
    description: "与任何其他OpenAI SDK兼容的聊天完成API对话，例如Perplexity、Groq、xAI等",
    url: "https://github.com/pyroprompts/any-chat-completions-mcp"
  },
  {
    name: "mcp-installer",
    description: "一个MCP服务器，可以为您安装其他MCP服务器",
    url: "https://github.com/anaisbetts/mcp-installer"
  },
  {
    name: "mcp-server-perplexity",
    description: "与 Perplexity API 交互",
    url: "https://github.com/tanigami/mcp-server-perplexity"
  },
  {
    name: "wikimedia-enterprise-model-context-protocol",
    description: "维基百科文章查找 API",
    url: "https://github.com/future-audiences/wikimedia-enterprise-model-context-protocol"
  },
  {
    name: "mcp-simple-timeserver",
    description: "MCP 服务器允许检查客户端计算机上的本地时间或 NTP 服务器上的当前 UTC 时间",
    url: "https://github.com/andybrandt/mcp-simple-timeserver"
  },
  {
    name: "mcp-simple-openai-assistant",
    description: "MCP 与 OpenAI 助手对话（Claude 可以使用任何 GPT 模型作为他的助手）",
    url: "https://github.com/andybrandt/mcp-simple-openai-assistant"
  },
  {
    name: "mcp-hfspace",
    description: "直接从 Claude 使用 HuggingFace Spaces。使用开源图像生成、聊天、视觉任务等",
    url: "https://github.com/llmindset/mcp-hfspace"
  },
  {
    name: "mcp-manager",
    description: "简单的 Web UI 用于安装和管理 Claude 桌面应用程序的 MCP 服务器",
    url: "https://github.com/zueai/mcp-manager"
  },
  {
    name: "mcp-cli",
    description: "用于测试 MCP 服务器的 CLI 工具",
    url: "https://github.com/wong2/mcp-cli"
  },
  {
    name: "mcp-vegalite-server",
    description: "使用 VegaLite 格式和渲染器从获取的数据生成可视化效果",
    url: "https://github.com/isaacwasserman/mcp-vegalite-server"
  },
  {
    name: "homeassistant-mcp",
    description: "访问家庭助理数据和控制设备（灯、开关、恒温器等）",
    url: "https://github.com/tevonsb/homeassistant-mcp"
  },
  {
    name: "mcp-server-home-assistant",
    description: "通过模型上下文协议服务器暴露所有 Home Assistant 语音意图，实现智能家居控制",
    url: "https://github.com/allenporter/mcp-server-home-assistant"
  },
  {
    name: "all-in-one-model-context-protocol",
    description: "一些对开发人员有用的工具",
    url: "https://github.com/nguyenvanduocit/all-in-one-model-context-protocol"
  },
  {
    name: "mac-apps-launcher-mcp-server",
    description: "用于列出和启动 MacOS 上的应用程序的 MCP 服务器",
    url: "https://github.com/joshuarileydev/mac-apps-launcher-mcp-server"
  },
  {
    name: "mcp-datetime",
    description: "MCP 服务器提供多种格式的日期和时间函数",
    url: "https://github.com/ZeparHyfar/mcp-datetime"
  },
  {
    name: "piapi-mcp-server",
    description: "PiAPI MCP服务器使用户能够直接从Claude或其他MCP兼容应用程序中使用Midjourney/Flux/Kling/Hunyuan/Udio/Trellis生成媒体内容",
    url: "https://github.com/apinetwork/piapi-mcp-server"
  },
  {
    name: "DifyWorkflow",
    description: "MCP 服务器 Tools 实现查询与执行 Dify AI 平台上自定义的工作流",
    url: "https://github.com/gotoolkits/DifyWorkflow"
  },
  {
    name: "hn-server",
    description: "解析 news.ycombinator.com（Hacker News）的 HTML 内容，为不同类型的故事（热门、最新、问答、展示、工作）提供结构化数据",
    url: "https://github.com/pskill9/hn-server"
  },
  {
    name: "screenpipe",
    description: "本地优先的系统，支持屏幕/音频捕获并带有时间戳索引、SQL/嵌入存储、语义搜索、LLM 驱动的历史分析和事件触发动作",
    url: "https://github.com/mediar-ai/screenpipe"
  },
  {
    name: "bear-mcp-server",
    description: "允许 AI 读取您的 Bear Notes（仅支持 macOS）",
    url: "https://github.com/akseyh/bear-mcp-server"
  },
  {
    name: "ws-mcp",
    description: "使用 WebSocket 包装 MCP 服务器（用于 kitbitz）",
    url: "https://github.com/example/ws-mcp"
  },
  {
    name: "bitcoin-mcp",
    description: "一个模型上下文协议（MCP）服务器，使 AI 模型能够与比特币交互，允许它们生成密钥、验证地址、解码交易、查询区块链等",
    url: "https://github.com/AbdelStark/bitcoin-mcp"
  },
  {
    name: "mcp-kibela",
    description: "Kibela 与 MCP 的集成",
    url: "https://github.com/kj455/mcp-kibela"
  }
];

// 框架类别
const frameworkItems = [
  {
    name: "FastMCP (Python)",
    description: "用于在 Python 中构建 MCP 服务器的高级框架",
    url: "https://github.com/example/fastmcp-python"
  },
  {
    name: "FastMCP (TypeScript)",
    description: "用于在 TypeScript 中构建 MCP 服务器的高级框架",
    url: "https://github.com/example/fastmcp-typescript"
  },
  {
    name: "Foxy Contexts",
    description: "用于以声明方式编写 MCP 服务器的 Golang 库，包含功能测试",
    url: "https://github.com/example/foxy-contexts"
  },
  {
    name: "Genkit MCP",
    description: "提供Genkit与模型上下文协议（MCP）之间的集成",
    url: "https://github.com/example/genkit-mcp"
  },
  {
    name: "LiteMCP",
    description: "用于在 JavaScript/TypeScript 中构建 MCP 服务器的高级框架",
    url: "https://github.com/example/litemcp"
  },
  {
    name: "mcp-go",
    description: "用于构建MCP服务器和客户端的Golang SDK",
    url: "https://github.com/mark3labs/mcp-go"
  },
  {
    name: "mcp-framework",
    description: "用于构建 MCP 服务器的快速而优雅的 TypeScript 框架",
    url: "https://github.com/example/mcp-framework"
  },
  {
    name: "mcp-proxy",
    description: "用于使用 stdio 传输的 MCP 服务器的 TypeScript SSE 代理",
    url: "https://github.com/example/mcp-proxy"
  },
  {
    name: "mcp-rs-template",
    description: "Rust的MCP CLI服务器模板",
    url: "https://github.com/example/mcp-rs-template"
  },
  {
    name: "mcp-golang",
    description: "用于构建 MCP 服务器的 Golang 框架，专注于类型安全",
    url: "https://github.com/metoro-io/mcp-golang"
  },
  {
    name: "langchain-mcp",
    description: "提供LangChain中MCP工具调用支持，允许将MCP工具集成到LangChain工作流中",
    url: "https://github.com/rectalogic/langchain-mcp"
  },
  {
    name: "ModelContextProtocol.NET",
    description: "基于 .NET 9 的 C# MCP 服务器 SDK ，支持 NativeAOT",
    url: "https://github.com/salty-flower/ModelContextProtocol.NET"
  },
  {
    name: "spring-ai-mcp",
    description: "用于构建 MCP 客户端和服务器的 Java SDK 和 Spring Framework 集成，支持多种可插拔的传输选项",
    url: "https://github.com/example/spring-ai-mcp"
  },
  {
    name: "codemirror-mcp",
    description: "CodeMirror 扩展，实现了用于资源提及和提示命令的模型上下文协议 (MCP)",
    url: "https://github.com/marimo-team/codemirror-mcp"
  }
];

// 实用工具类别
const utilityItems = [
  {
    name: "mcp-server-and-gw",
    description: "带有示例服务器和 MCP 客户端的 MCP stdio 到 HTTP SSE 传输网关",
    url: "https://github.com/boilingdata/mcp-server-and-gw"
  },
  {
    name: "mcp-langchain-ts-client",
    description: "在 LangChain.js 中使用 MCP 提供的工具",
    url: "https://github.com/isaacwasserman/mcp-langchain-ts-client"
  },
  {
    name: "mcp-gateway",
    description: "MCP SSE 服务器的网关演示",
    url: "https://github.com/lightconetech/mcp-gateway"
  },
  {
    name: "mcphost",
    description: "一个 CLI 主机应用程序，使大型语言模型 (LLM) 能够通过模型上下文协议 (MCP) 与外部工具交互",
    url: "https://github.com/mark3labs/mcphost"
  },
  {
    name: "MCP-Connect",
    description: "一个小工具，使基于云的 AI 服务能够通过 HTTP/HTTPS 请求访问本地的基于 Stdio 的 MCP 服务器",
    url: "https://github.com/example/mcp-connect"
  },
  {
    name: "MCP-Bridge",
    description: "OpenAI 中间件代理，用于在任何现有的 OpenAI 兼容客户端中使用 MCP",
    url: "https://github.com/SecretiveShell/MCP-Bridge"
  },
  {
    name: "mcp-proxy",
    description: "MCP stdio 到 SSE 的传输网关",
    url: "https://github.com/sparfenyuk/mcp-proxy"
  },
  {
    name: "gpt-computer-assistant",
    description: "用于构建垂直 AI 代理的框架",
    url: "https://github.com/upsonic/gpt-computer-assistant"
  }
];

const categories: Category[] = [
  {
    icon: "📂",
    title: "浏览器自动化",
    items: [
      {
        name: "playwright-plus-python-mcp",
        description: "使用 Playwright 进行浏览器自动化的 MCP 服务器，更适合LLM",
        url: "https://github.com/blackwhite084/playwright-plus-python-mcp"
      },
      {
        name: "playwright-mcp-server",
        description: "使用 Playwright 进行浏览器自动化和网页抓取的 MCP 服务器",
        url: "https://github.com/executeautomation/playwright-mcp-server"
      },
      {
        name: "mcp-server-playwright",
        description: "使用 Playwright 实现浏览器自动化的 MCP 服务器",
        url: "https://github.com/automatalabs/mcp-server-playwright"
      },
      {
        name: "server-puppeteer",
        description: "用于网页抓取和交互的浏览器自动化",
        url: "https://github.com/modelcontextprotocol/server-puppeteer"
      },
      {
        name: "mcp-server-youtube-transcript",
        description: "获取 YouTube 字幕和文字记录以供 AI 分析",
        url: "https://github.com/kimtaeyoon83/mcp-server-youtube-transcript"
      },
      {
        name: "mcp-server-apple-shortcuts",
        description: "MCP 服务器与 Apple Shortcuts 的集成",
        url: "https://github.com/recursechat/mcp-server-apple-shortcuts"
      },
      {
        name: "mcp-aoai-web-browsing",
        description: "使用 Azure OpenAI 和 Playwright 的'最小'服务器/客户端 MCP 实现",
        url: "https://github.com/kimtth/mcp-aoai-web-browsing"
      },
      {
        name: "web-search",
        description: "一个支持使用 Google 搜索结果进行免费网页搜索的 MCP 服务器，无需 API 密钥",
        url: "https://github.com/pskill9/web-search"
      }
    ],
    id: "browser-automation"
  },
  {
    icon: "🎨",
    title: "艺术与文化",
    items: [
      {
        name: "video-editing-mcp",
        description: "从您的视频集合中添加、分析、搜索和生成视频剪辑",
        url: "https://github.com/burningion/video-editing-mcp"
      },
      {
        name: "rijksmuseum-mcp",
        description: "荷兰国立博物馆 API 集成，支持艺术品搜索、详情查询和收藏品浏览",
        url: "https://github.com/r-huijts/rijksmuseum-mcp"
      }
    ],
    id: "art-culture"
  },
  {
    icon: "☁️",
    title: "云平台",
    items: [
      {
        name: "Cloudflare MCP Server",
        description: "与 Cloudflare 服务集成，包括 Workers、KV、R2 和 D1",
        url: "https://github.com/cloudflare/mcp-sdk"
      },
      {
        name: "Kubernetes MCP Server",
        description: "通过 MCP 操作 Kubernetes 集群",
        url: "https://github.com/kubernetes/kubernetes-mcp-server"
      },
      {
        name: "mcp-server-kubernetes",
        description: "使用 Typescript 实现 Kubernetes 集群中针对 pod、部署、服务的操作",
        url: "https://github.com/flux159/mcp-server-kubernetes"
      },
      {
        name: "netskope-mcp",
        description: "提供对 Netskope Private Access 环境中所有组件的访问权限，包含详细的设置信息和 LLM 使用示例",
        url: "https://github.com/johnneerdael/netskope-mcp"
      }
    ],
    id: "cloud-platform"
  },
  {
    icon: "🖥️",
    title: "命令行",
    items: [
      {
        name: "iterm-mcp",
        description: "一个为 iTerm 终端提供访问能力的 MCP 服务器。您可以执行命令，并就终端中看到的内容进行提问交互",
        url: "https://github.com/ferrislucas/iterm-mcp"
      },
      {
        name: "mcp-server-commands",
        description: "使用\"run_command\"和\"run_script\"工具运行任何命令",
        url: "https://github.com/g0t4/mcp-server-commands"
      },
      {
        name: "cli-mcp-server",
        description: "具有安全执行和可定制安全策略的命令行界面",
        url: "https://github.com/MladenSU/cli-mcp-server"
      },
      {
        name: "mcp-shell-server",
        description: "实现模型上下文协议 (MCP) 的安全 shell 命令执行服务器",
        url: "https://github.com/tumf/mcp-shell-server"
      }
    ],
    id: "command-line"
  },
  {
    icon: "💬",
    title: "社交",
    items: [
      {
        name: "gtasks-mcp",
        description: "用于管理 Google Tasks 的 MCP 服务器",
        url: "https://github.com/zcaceres/gtasks-mcp"
      },
      {
        name: "imessage-query-fastmcp-mcp-server",
        description: "MCP 服务器通过模型上下文协议 (MCP) 提供对 iMessage 数据库的安全访问，使 LLM 能够通过适当的电话号码验证和附件处理来查询和分析 iMessage 对话",
        url: "https://github.com/hannesrudolph/imessage-query-fastmcp-mcp-server"
      },
      {
        name: "server-slack",
        description: "用于频道管理和消息传递的 Slack 工作区集成",
        url: "https://github.com/modelcontextprotocol/server-slack"
      },
      {
        name: "server-bluesky",
        description: "Bluesky 实例集成，用于查询和交互",
        url: "https://github.com/modelcontextprotocol/server-bluesky"
      },
      {
        name: "mcp-gsuite",
        description: "与 Gmail 和 Google 日历集成",
        url: "https://github.com/MarkusPfundstein/mcp-gsuite"
      },
      {
        name: "mcp-twikit",
        description: "与 Twitter 搜索和时间线进行交互",
        url: "https://github.com/adhikasp/mcp-twikit"
      },
      {
        name: "wecombot",
        description: "MCP服务器 Tools 应用程序，用于向企业微信群机器人发送各种类型的消息",
        url: "https://github.com/gotoolkits/wecombot"
      },
      {
        name: "nostr-mcp",
        description: "Nostr MCP 服务器，支持与 Nostr 交互，可发布笔记等功能",
        url: "https://github.com/AbdelStark/nostr-mcp"
      }
    ],
    id: "social"
  },
  {
    icon: "👤",
    title: "数据平台",
    items: [
      {
        name: "inoyu-mcp-unomi-server",
        description: "MCP 服务器用于访问和更新 Apache Unomi CDP 服务器上的配置文件",
        url: "https://github.com/sergehuber/inoyu-mcp-unomi-server"
      },
      {
        name: "OpenDataMCP",
        description: "使用模型上下文协议将任何开放数据连接到任何 LLM",
        url: "https://github.com/OpenDataMCP/OpenDataMCP"
      },
      {
        name: "mcp-tinybird",
        description: "MCP 服务器可从任何 MCP 客户端与 Tinybird Workspace 进行交互",
        url: "https://github.com/tinybirdco/mcp-tinybird"
      },
      {
        name: "mcp-server-iaptic",
        description: "连接 iaptic 平台，让您轻松查询客户购买记录、交易数据以及应用营收统计信息",
        url: "https://github.com/iaptic/mcp-server-iaptic"
      }
    ],
    id: "data-platform"
  },
  {
    icon: "🗄️",
    title: "数据库",
    items: [
      {
        name: "elasticsearch-mcp-server",
        description: "集成 Elasticsearch 的 MCP 服务器实现",
        url: "https://github.com/cr7258/elasticsearch-mcp-server"
      },
      {
        name: "airtable-mcp-server",
        description: "Airtable 数据库集成，具有架构检查、读写功能",
        url: "https://github.com/domdomegg/airtable-mcp-server"
      },
      {
        name: "mcp-server-bigquery",
        description: "BigQuery 数据库集成了架构检查和查询功能",
        url: "https://github.com/LucasHild/mcp-server-bigquery"
      },
      {
        name: "mcp-bigquery-server",
        description: "Google BigQuery 集成的服务器实现，可实现直接 BigQuery 数据库访问和查询功能",
        url: "https://github.com/ergut/mcp-bigquery-server"
      },
      {
        name: "mcp-clickhouse",
        description: "集成 Apache Kafka 和 Timeplus。可以获取Kafka中的最新数据，并通过 Timeplus 来 SQL 查询",
        url: "https://github.com/ClickHouse/mcp-clickhouse"
      },
      {
        name: "mcp-timeplus",
        description: "MCP server for Apache Kafka and Timeplus. Able to list Kafka topics, poll Kafka messages, save Kafka data locally and query streaming data with SQL via Timeplus",
        url: "https://github.com/jovezhong/mcp-timeplus"
      },
      {
        name: "mcp-database-server",
        description: "Fireproof 分布式账本数据库，支持多用户数据同步",
        url: "https://github.com/fireproof-storage/mcp-database-server"
      },
      {
        name: "mysql_mcp_server",
        description: "MySQL 数据库集成可配置的访问控制、模式检查和全面的安全指南",
        url: "https://github.com/designcomputer/mysql_mcp_server"
      },
      {
        name: "mcp-mysql-server",
        description: "基于 Node.js 的 MySQL 数据库集成，提供安全的 MySQL 数据库操作",
        url: "https://github.com/f4ww4z/mcp-mysql-server"
      },
      {
        name: "server-postgres",
        description: "PostgreSQL 数据库集成了模式检查和查询功能",
        url: "https://github.com/modelcontextprotocol/server-postgres"
      },
      {
        name: "server-sqlite",
        description: "具有内置分析功能的 SQLite 数据库操作",
        url: "https://github.com/modelcontextprotocol/server-sqlite"
      },
      {
        name: "supabase-mcp-server",
        description: "Supabase MCP 服务器用于管理和创建 Supabase 中的项目和组织",
        url: "https://github.com/joshuarileydev/supabase-mcp-server"
      },
      {
        name: "mcp-server-duckdb",
        description: "DuckDB 数据库集成了模式检查和查询功能",
        url: "https://github.com/ktanaka101/mcp-server-duckdb"
      },
      {
        name: "mongo-mcp",
        description: "MongoDB 集成使 LLM 能够直接与数据库交互",
        url: "https://github.com/QuantGeekDev/mongo-mcp"
      },
      {
        name: "mcp-tinybird",
        description: "Tinybird 集成查询和 API 功能",
        url: "https://github.com/tinybirdco/mcp-tinybird"
      },
      {
        name: "mcp-mongo-server",
        description: "MongoDB 的模型上下文协议服务器",
        url: "https://github.com/kiliczsh/mcp-mongo-server"
      },
      {
        name: "vikingdb-mcp-server",
        description: "VikingDB 数据库集成了collection和index的基本信息介绍，并提供向量存储和查询的功能",
        url: "https://github.com/KashiwaByte/vikingdb-mcp-server"
      },
      {
        name: "mcp-neo4j",
        description: "Neo4j 的模型上下文协议",
        url: "https://github.com/neo4j-contrib/mcp-neo4j"
      },
      {
        name: "mcp-snowflake-server",
        description: "Snowflake 集成实现，支持读取和（可选）写入操作，并具备洞察跟踪功能",
        url: "https://github.com/isaacwasserman/mcp-snowflake-server"
      },
      {
        name: "sqlite-explorer-fastmcp-mcp-server",
        description: "一个 MCP 服务器，通过模型上下文协议 （MCP） 提供对 SQLite 数据库的安全只读访问",
        url: "https://github.com/hannesrudolph/sqlite-explorer-fastmcp-mcp-server"
      },
      {
        name: "mcp-pinecone",
        description: "Pinecone 与矢量搜索功能的集成",
        url: "https://github.com/sirmews/mcp-pinecone"
      },
      {
        name: "mcp-alchemy",
        description: "基于SQLAlchemy的通用数据库集成，支持PostgreSQL、MySQL、MariaDB、SQLite、Oracle、MS SQL Server等众多数据库",
        url: "https://github.com/runekaagaard/mcp-alchemy"
      }
    ],
    id: "database"
  },
  {
    icon: "🛠️",
    title: "开发者工具",
    items: [
      {
        name: "docker-mcp",
        description: "通过 MCP 进行 Docker 容器管理和操作",
        url: "https://github.com/QuantGeekDev/docker-mcp"
      },
      {
        name: "fetch-mcp",
        description: "一个灵活获取 JSON、文本和 HTML 数据的 MCP 服务器",
        url: "https://github.com/zcaceres/fetch-mcp"
      },
      {
        name: "xcode-mcp-server",
        description: "Xcode 集成，支持项目管理、文件操作和构建自动化",
        url: "https://github.com/r-huijts/xcode-mcp-server"
      },
      {
        name: "openapi-mcp-server",
        description: "使用开放 API 规范 (v3) 连接任何 HTTP/REST API 服务器",
        url: "https://github.com/snaggle-ai/openapi-mcp-server"
      },
      {
        name: "mcpProxy",
        description: "连接到 JetBrains IDE",
        url: "https://github.com/jetbrains/mcpProxy"
      },
      {
        name: "mcp-text-editor",
        description: "面向行的文本文件编辑器。针对 LLM 工具进行了优化，具有高效的部分文件访问功能，可最大限度地减少令牌使用量",
        url: "https://github.com/tumf/mcp-text-editor"
      },
      {
        name: "simulator-mcp-server",
        description: "用于控制 iOS 模拟器的 MCP 服务器",
        url: "https://github.com/joshuarileydev/simulator-mcp-server"
      },
      {
        name: "app-store-connect-mcp-server",
        description: "一个 MCP 服务器，用于与 iOS 开发者的 App Store Connect API 进行通信",
        url: "https://github.com/joshuarileydev/app-store-connect-mcp-server"
      },
      {
        name: "mcp-package-version",
        description: "MCP 服务器可帮助 LLM 在编写代码时建议最新的稳定软件包版本",
        url: "https://github.com/sammcj/mcp-package-version"
      },
      {
        name: "postman-mcp-server",
        description: "与 Postman API 进行交互",
        url: "https://github.com/delano/postman-mcp-server"
      },
      {
        name: "mcp-pandoc",
        description: "基于 Pandoc 的 MCP 服务器，支持 Markdown、HTML、PDF、DOCX（.docx）、csv 等格式之间的无缝转换",
        url: "https://github.com/vivekVells/mcp-pandoc"
      },
      {
        name: "website-downloader",
        description: "这个 MCP 服务器提供了使用 wget 下载完整网站的工具，可保留网站结构并转换链接以支持本地访问",
        url: "https://github.com/pskill9/website-downloader"
      },
      {
        name: "mcp-server-sql-analyzer",
        description: "基于 SQLGlot 的 MCP 服务器，提供 SQL 分析、代码检查和方言转换功能",
        url: "https://github.com/j4c0bs/mcp-server-sql-analyzer"
      }
    ],
    id: "dev-tools"
  },
  {
    icon: "📂",
    title: "文件系统",
    items: [
      {
        name: "server-filesystem",
        description: "直接访问本地文件系统",
        url: "https://github.com/modelcontextprotocol/server-filesystem"
      },
      {
        name: "server-google-drive",
        description: "Google Drive 集成，用于列出、阅读和搜索文件",
        url: "https://github.com/modelcontextprotocol/server-google-drive"
      },
      {
        name: "box-mcp-server",
        description: "Box 集成，支持文件列表、阅读和搜索功能",
        url: "https://github.com/hmk/box-mcp-server"
      },
      {
        name: "mcp-filesystem-server",
        description: "用于本地文件系统访问的 Golang 实现",
        url: "https://github.com/mark3labs/mcp-filesystem-server"
      },
      {
        name: "mcp-everything-search",
        description: "使用 Everything SDK 实现的快速 Windows 文件搜索",
        url: "https://github.com/mamertofabian/mcp-everything-search"
      },
      {
        name: "llm-context.py",
        description: "通过 MCP 或剪贴板与 LLM 共享代码上下文",
        url: "https://github.com/cyberchitta/llm-context.py"
      },
      {
        name: "mcp-server-opendal",
        description: "使用 Apache OpenDAL™ 访问任何存储",
        url: "https://github.com/Xuanwo/mcp-server-opendal"
      }
    ],
    id: "file-system"
  },
  {
    icon: "💰",
    title: "金融与金融科技",
    items: [
      {
        name: "coincap-mcp",
        description: "使用 CoinCap 的公共 API 集成实时加密货币市场数据，无需 API 密钥即可访问加密货币价格和市场信息",
        url: "https://github.com/QuantGeekDev/coincap-mcp"
      },
      {
        name: "coinmarket-mcp-server",
        description: "Coinmarket API 集成以获取加密货币列表和报价",
        url: "https://github.com/anjor/coinmarket-mcp-server"
      },
      {
        name: "alpha-vantage-mcp",
        description: "Alpha Vantage API 集成，用于获取股票和加密货币信息",
        url: "https://github.com/berlinbra/alpha-vantage-mcp"
      },
      {
        name: "tasty-agent",
        description: "Tastyworks API 集成，用于管理 Tastytrade 平台的交易活动",
        url: "https://github.com/ferdousbhai/tasty-agent"
      }
    ],
    id: "fintech"
  },
  {
    icon: "🧠",
    title: "知识与记忆",
    items: [
      {
        name: "server-memory",
        description: "基于知识图谱的长期记忆系统用于维护上下文",
        url: "https://github.com/modelcontextprotocol/server-memory"
      },
      {
        name: "MemoryMesh",
        description: "增强基于图形的记忆，重点关注 AI 角色扮演和故事生成",
        url: "https://github.com/CheMiguel23/MemoryMesh"
      },
      {
        name: "cognee",
        description: "AI应用程序和Agent的内存管理器使用各种图存储和向量存储，并允许从 30 多个数据源提取数据",
        url: "https://github.com/topoteretes/cognee"
      },
      {
        name: "mcp-ragdocs",
        description: "MCP 服务器实现提供了通过矢量搜索检索和处理文档的工具，使 AI 助手能够利用相关文档上下文来增强其响应能力",
        url: "https://github.com/hannesrudolph/mcp-ragdocs"
      },
      {
        name: "mcp-zotero",
        description: "为 LLM 提供的连接器，用于操作 Zotero Cloud 上的文献集合和资源",
        url: "https://github.com/kaliaboi/mcp-zotero"
      }
    ],
    id: "knowledge"
  },
  {
    icon: "🗺️",
    title: "位置服务",
    items: [
      {
        name: "server-google-maps",
        description: "Google 地图集成，提供位置服务、路线规划和地点详细信息",
        url: "https://github.com/modelcontextprotocol/server-google-maps"
      },
      {
        name: "MCP-timeserver",
        description: "访问任意时区的时间并获取当前本地时间",
        url: "https://github.com/SecretiveShell/MCP-timeserver"
      },
      {
        name: "MCP-Geo",
        description: "支持 nominatim、ArcGIS、Bing 的地理编码 MCP 服务器",
        url: "https://github.com/webcoderz/MCP-Geo"
      },
      {
        name: "mcp-server-ipinfo",
        description: "使用 IPInfo API 获取 IP 地址的地理位置和网络信息",
        url: "https://github.com/briandconnelly/mcp-server-ipinfo"
      }
    ],
    id: "location"
  },
  {
    icon: "🎯",
    title: "营销",
    items: [
      {
        name: "Open Strategy Partners Marketing Tools",
        description: "Open Strategy Partners 提供的营销工具套件，包含写作风格指南、编辑规范和产品营销价值图谱创建工具",
        url: "https://github.com/OpenStrategyPartners/mcp-marketing-tools"
      }
    ],
    id: "marketing"
  },
  {
    icon: "📊",
    title: "监测",
    items: [
      {
        name: "server-sentry",
        description: "Sentry.io 集成用于错误跟踪和性能监控",
        url: "https://github.com/modelcontextprotocol/server-sentry"
      },
      {
        name: "server-raygun",
        description: "Raygun API V3 集成用于崩溃报告和真实用户监控",
        url: "https://github.com/modelcontextprotocol/server-raygun"
      },
      {
        name: "metoro-mcp-server",
        description: "查询并与 Metoro 监控的 kubernetes 环境交互",
        url: "https://github.com/metoro-io/metoro-mcp-server"
      },
      {
        name: "mcp-grafana",
        description: "在 Grafana 实例中搜索仪表盘、调查事件并查询数据源",
        url: "https://github.com/grafana/mcp-grafana"
      }
    ],
    id: "monitoring"
  },
  {
    icon: "🔎",
    title: "搜索",
    items: searchItems,
    id: "search"
  },
  {
    icon: "🔒",
    title: "安全",
    items: securityItems,
    id: "security"
  },
  {
    icon: "🚆",
    title: "旅行与交通",
    items: travelItems,
    id: "travel"
  },
  {
    icon: "🔄",
    title: "版本控制",
    items: versionControlItems,
    id: "version-control"
  },
  {
    icon: "🛠️",
    title: "其他工具和集成",
    items: otherToolsItems,
    id: "other-tools"
  },
  {
    icon: "🧮",
    title: "数据科学工具",
    items: [
      {
        name: "mcp-server-data-exploration",
        description: "支持对基于 .csv 的数据集进行自主数据探索，以最小的成本提供智能见解",
        url: "https://github.com/reading-plus-ai/mcp-server-data-exploration"
      },
      {
        name: "markdownify-mcp",
        description: "一个 MCP 服务器，可将几乎任何文件或网络内容转换为 Markdown",
        url: "https://github.com/zcaceres/markdownify-mcp"
      }
    ],
    id: "data-science"
  },
  {
    icon: "🧰",
    title: "框架",
    items: frameworkItems,
    id: "frameworks"
  },
  {
    icon: "🔧",
    title: "实用工具",
    items: utilityItems,
    id: "utilities"
  }
];

// 使用 computed 替代 ref 来处理过滤后的分类
const filteredCategories = computed(() => {
  if (!searchQuery.value) {
    return categories;
  }

  const searchTerm = searchQuery.value.toLowerCase();
  return categories.map(category => ({
    ...category,
    items: category.items.filter(item => 
      item.name.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm)
    ).map(item => ({
      ...item,
      nameHighlighted: highlightText(item.name, searchQuery.value),
      descriptionHighlighted: highlightText(item.description, searchQuery.value)
    }))
  })).filter(category => category.items.length > 0);
});

// 添加搜索查询的响应式引用
const searchQuery = ref('');

// 添加高亮文本的方法
const highlightText = (text: string, query: string) => {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<span class="highlight">$1</span>');
};

// 修改过滤方法
const filterItems = (query: string) => {
  searchQuery.value = query;
};

// 暴露方法给父组件
defineExpose({ filterItems });
</script>

<template>
  <div class="mcp-matrix">
    <div 
      v-for="(category, index) in filteredCategories" 
      :key="index" 
      class="category-container"
      :id="category.id"
    >
      <div class="category-header">
        <span class="category-icon">{{ category.icon }}</span>
        <h3 class="category-title">{{ category.title }}</h3>
          </div>
      <div class="category-items">
        <div v-if="category.items.length === 0" class="empty-category">
          <p>暂无项目</p>
        </div>
        <div v-else class="items-grid">
          <div v-for="(item, itemIndex) in category.items" :key="itemIndex" class="item-card">
            <!-- 使用 v-html 渲染高亮文本 -->
            <h4 v-html="item.nameHighlighted || item.name"></h4>
            <p v-html="item.descriptionHighlighted || item.description"></p>
            <a v-if="item.url" :href="item.url" target="_blank" rel="noopener noreferrer">访问</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mcp-matrix {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  margin: 0 auto;
}

.category-container {
  background: rgba(30, 41, 59, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  width: 100%;
  margin: 0 auto;
}

.category-container:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
}

.category-header {
  display: flex;
  align-items: center;
  padding: 0.8rem 1.2rem;
  background: rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.category-icon {
  font-size: 1.5rem;
  margin-right: 0.8rem;
}

.category-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #fe8019;
  margin: 0;
}

.category-items {
  padding: 1.5rem;
  overflow: hidden;
}

.empty-category {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  color: rgba(255, 255, 255, 0.5);
  font-style: italic;
}

.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.2rem;
  width: 100%;
  box-sizing: border-box;
}

.item-card {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.2s, background 0.2s;
  width: 100%;
  box-sizing: border-box;
  word-wrap: break-word;
  overflow: hidden;
}

.item-card:hover {
  transform: translateY(-3px);
  background: rgba(255, 255, 255, 0.25);
}

.item-card h4 {
  font-size: 1rem;
  margin: 0 0 0.5rem 0;
  color: #4cbbfc;
  word-break: break-word;
}

.item-card p {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 0.8rem 0;
  word-break: break-word;
}

.item-card a {
  display: inline-block;
  background: linear-gradient(45deg, #4882cf, #4cbbfc);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  font-size: 0.8rem;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
}

.item-card a:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(76, 187, 252, 0.3);
}

/* 响应式布局 */
@media (max-width: 768px) {
  .items-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .category-items {
    padding: 1rem;
  }
}

/* 大屏幕优化 */
@media (min-width: 1200px) {
  .items-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
}

@media (min-width: 1600px) {
  .items-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}

@media (min-width: 1800px) {
  .items-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
  }
}

/* 修改高亮样式 */
:deep(.highlight) {
  background-color: rgba(76, 187, 252, 0.3);
  border-radius: 3px;
  padding: 0 2px;
  color: #ffffff;
  font-weight: bold;
  font-size: 130%; /* 增加字体大小到130% */
  display: inline-block; /* 确保放大不会影响周围布局 */
  transition: all 0.2s ease; /* 添加平滑过渡效果 */
}

/* 确保高亮文本在卡片中正确显示 */
.item-card h4:deep(.highlight) {
  color: #4cbbfc; /* 保持标题的蓝色 */
}

.item-card p:deep(.highlight) {
  color: rgba(255, 255, 255, 0.9); /* 保持描述文本的颜色 */
}
</style> 