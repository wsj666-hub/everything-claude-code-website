// Everything Claude Code - 组件数据

const componentsData = {
    agents: [
        {
            id: 'architect',
            name: 'architect',
            title: '架构师',
            icon: '🏗️',
            description: '软件架构专家，负责系统设计、可扩展性和技术决策',
            model: 'opus',
            tools: ['Read', 'Grep', 'Glob'],
            features: [
                '设计新功能的系统架构',
                '评估技术权衡',
                '推荐模式和最佳实践',
                '识别可扩展性瓶颈',
                '规划未来增长',
                '确保代码库一致性'
            ],
            workflow: [
                { step: '1. 当前状态分析', desc: '审查现有架构、识别模式和约定、记录技术债务、评估可扩展性限制' },
                { step: '2. 需求收集', desc: '功能需求、非功能需求（性能、安全、可扩展性）、集成点、数据流需求' },
                { step: '3. 设计提案', desc: '高层架构图、组件职责、数据模型、API契约、集成模式' },
                { step: '4. 权衡分析', desc: '优缺点、替代方案、最终决策和理由' }
            ],
            principles: ['模块化与关注点分离', '可扩展性', '可维护性', '安全性', '性能'],
            whenToUse: '规划新功能、重构大型系统、做出架构决策时主动使用'
        },
        {
            id: 'build-error-resolver',
            name: 'build-error-resolver',
            title: '构建错误解决专家',
            icon: '🔧',
            description: '构建和 TypeScript 错误解决专家。专注于用最小修改快速修复构建错误',
            model: 'sonnet',
            tools: ['Read', 'Write', 'Edit', 'Bash', 'Grep', 'Glob'],
            features: [
                'TypeScript 错误解决',
                '构建错误修复',
                '依赖问题解决',
                '配置错误修复',
                '最小化修改',
                '不做架构改动'
            ],
            workflow: [
                { step: '收集所有错误', desc: '运行 tsc --noEmit 获取所有类型错误，分类：类型推断、缺失类型、导入、配置、依赖' },
                { step: '修复策略', desc: '仔细阅读错误信息，找到最小修复方案，验证修复不会破坏其他代码' },
                { step: '常见修复', desc: '隐式 any 类型 → 添加类型注解；可能 undefined → 可选链或空检查；属性不存在 → 添加到接口' }
            ],
            priorityLevels: [
                { level: 'CRITICAL', desc: '构建完全失败，无开发服务器', action: '立即修复' },
                { level: 'HIGH', desc: '单个文件失败，新代码类型错误', action: '尽快修复' },
                { level: 'MEDIUM', desc: 'Linter 警告，弃用 API', action: '有时间时修复' }
            ],
            whenToUse: '构建失败或类型错误时主动使用'
        },
        {
            id: 'code-reviewer',
            name: 'code-reviewer',
            title: '代码审查专家',
            icon: '👁️',
            description: '专业代码审查，关注代码质量、安全性和可维护性。编写或修改代码后必须使用',
            model: 'sonnet',
            tools: ['Read', 'Grep', 'Glob', 'Bash'],
            features: [
                '安全漏洞检测',
                '代码质量检查',
                'React/Next.js 模式检查',
                'Node.js/后端模式检查',
                '性能问题识别',
                '最佳实践验证'
            ],
            reviewChecklist: [
                { category: '安全 (CRITICAL)', items: ['硬编码凭证', 'SQL 注入', 'XSS 漏洞', '路径遍历', 'CSRF 漏洞', '认证绕过'] },
                { category: '代码质量 (HIGH)', items: ['大函数 (>50行)', '大文件 (>800行)', '深度嵌套 (>4层)', '缺失错误处理', '变异模式', 'console.log 残留'] },
                { category: 'React 模式 (HIGH)', items: ['缺失依赖数组', '渲染中更新状态', '列表缺少 key', 'Prop 透传', '不必要重渲染'] },
                { category: '性能 (MEDIUM)', items: ['低效算法', '缺失 memoization', '大包体积', '缺失缓存'] }
            ],
            whenToUse: '编写或修改代码后必须使用'
        },
        {
            id: 'database-reviewer',
            name: 'database-reviewer',
            title: '数据库审查专家',
            icon: '🗄️',
            description: 'PostgreSQL 数据库专家，专注于查询优化、模式设计、安全和性能。结合 Supabase 最佳实践',
            model: 'sonnet',
            tools: ['Read', 'Write', 'Edit', 'Bash', 'Grep', 'Glob'],
            features: [
                '查询性能优化',
                '模式设计',
                '安全与 RLS',
                '连接管理',
                '并发控制',
                '监控设置'
            ],
            keyPrinciples: [
                '始终索引外键',
                '使用部分索引 WHERE deleted_at IS NULL',
                '使用覆盖索引 INCLUDE (col)',
                '队列使用 SKIP LOCKED',
                '游标分页 WHERE id > $last',
                '批量插入 Multi-row INSERT',
                '短事务，不在事务中调用外部 API',
                '一致的锁顺序防止死锁'
            ],
            antiPatterns: ['SELECT *', 'int 用于 ID（用 bigint）', 'varchar(255) 无理由（用 text）', 'timestamp 无时区（用 timestamptz）', '随机 UUID 作为主键（用 UUIDv7）', 'OFFSET 分页', '未参数化查询'],
            whenToUse: '编写 SQL、创建迁移、设计模式、排查数据库性能时主动使用'
        },
        {
            id: 'doc-updater',
            name: 'doc-updater',
            title: '文档更新专家',
            icon: '📝',
            description: '文档和代码地图专家。主动更新代码地图和文档，生成 docs/CODEMAPS/*，更新 README 和指南',
            model: 'haiku',
            tools: ['Read', 'Write', 'Edit', 'Bash', 'Grep', 'Glob'],
            features: [
                '代码地图生成',
                '文档更新',
                'AST 分析',
                '依赖映射',
                '文档质量保证'
            ],
            codemapFormat: {
                structure: 'docs/CODEMAPS/',
                files: ['INDEX.md', 'frontend.md', 'backend.md', 'database.md', 'integrations.md', 'workers.md'],
                content: ['架构图', '关键模块表', '数据流', '外部依赖', '相关区域链接']
            },
            whenToUse: '新功能、API 变更、依赖变更、架构变更、设置流程修改时主动使用'
        },
        {
            id: 'e2e-runner',
            name: 'e2e-runner',
            title: 'E2E 测试专家',
            icon: '🧪',
            description: '端到端测试专家，使用 Vercel Agent Browser（首选）或 Playwright。管理测试旅程、隔离不稳定测试、上传工件',
            model: 'sonnet',
            tools: ['Read', 'Write', 'Edit', 'Bash', 'Grep', 'Glob'],
            features: [
                '测试旅程创建',
                '测试维护',
                '不稳定测试管理',
                '工件管理',
                'CI/CD 集成',
                '测试报告生成'
            ],
            keyPrinciples: [
                '使用语义选择器 [data-testid="..."]',
                '等待条件而非时间 waitForResponse() > waitForTimeout()',
                '自动等待内置 page.locator().click()',
                '隔离测试，无共享状态',
                '快速失败，每个关键步骤使用 expect()',
                '重试时追踪 trace: on-first-retry'
            ],
            successMetrics: { criticalJourneys: '100%', overallPassRate: '>95%', flakyRate: '<5%', duration: '<10min' },
            whenToUse: '主动生成、维护和运行 E2E 测试'
        },
        {
            id: 'go-reviewer',
            name: 'go-reviewer',
            title: 'Go 代码审查专家',
            icon: '🐹',
            description: 'Go 代码审查专家，专注于惯用 Go 模式、并发安全、错误处理和性能。Go 项目必须使用',
            model: 'sonnet',
            tools: ['Read', 'Grep', 'Glob', 'Bash'],
            features: [
                'SQL 注入检测',
                '命令注入检测',
                '竞态条件识别',
                '错误处理审查',
                '并发模式检查',
                '性能问题识别'
            ],
            priorities: [
                { level: 'CRITICAL', items: ['SQL 注入', '命令注入', '路径遍历', '竞态条件', 'unsafe 包', '硬编码密钥', '不安全 TLS'] },
                { level: 'CRITICAL - 错误处理', items: ['忽略错误 _', '缺失错误包装', 'panic 用于可恢复错误', '缺失 errors.Is/As'] },
                { level: 'HIGH - 并发', items: ['Goroutine 泄漏', '无缓冲通道死锁', '缺失 sync.WaitGroup', 'Mutex 误用'] },
                { level: 'HIGH - 代码质量', items: ['大函数 (>50行)', '深度嵌套 (>4层)', '非惯用模式', '包级变量', '接口污染'] }
            ],
            diagnosticCommands: ['go vet ./...', 'staticcheck ./...', 'golangci-lint run', 'go build -race ./...', 'go test -race ./...', 'govulncheck ./...'],
            whenToUse: '所有 Go 代码变更时使用'
        },
        {
            id: 'go-build-resolver',
            name: 'go-build-resolver',
            title: 'Go 构建错误解决专家',
            icon: '🔨',
            description: 'Go 构建、vet 和编译错误解决专家。用最小修改修复构建错误、go vet 问题和 linter 警告',
            model: 'sonnet',
            tools: ['Read', 'Write', 'Edit', 'Bash', 'Grep', 'Glob'],
            features: [
                'Go 编译错误诊断',
                'go vet 警告修复',
                'staticcheck/golangci-lint 问题解决',
                '模块依赖问题处理',
                '类型错误和接口不匹配修复'
            ],
            commonFixes: [
                { error: 'undefined: X', cause: '缺失导入、拼写错误、未导出', fix: '添加导入或修复大小写' },
                { error: 'cannot use X as type Y', cause: '类型不匹配、指针/值', fix: '类型转换或解引用' },
                { error: 'X does not implement Y', cause: '缺失方法', fix: '实现正确接收器的方法' },
                { error: 'import cycle not allowed', cause: '循环依赖', fix: '提取共享类型到新包' },
                { error: 'cannot find package', cause: '缺失依赖', fix: 'go get pkg@version 或 go mod tidy' }
            ],
            principles: ['仅手术式修复 - 不重构', '不添加 //nolint 除非明确批准', '不更改函数签名除非必要', '添加/移除导入后运行 go mod tidy'],
            whenToUse: 'Go 构建失败时使用'
        },
        {
            id: 'planner',
            name: 'planner',
            title: '规划专家',
            icon: '📋',
            description: '复杂功能和重构的专业规划专家。用户请求功能实现、架构变更或复杂重构时主动使用',
            model: 'opus',
            tools: ['Read', 'Grep', 'Glob'],
            features: [
                '需求分析和重述',
                '风险识别',
                '分步计划创建',
                '依赖识别',
                '复杂度估算',
                '等待用户确认'
            ],
            planFormat: {
                sections: ['概述', '需求', '架构变更', '实施步骤（分阶段）', '测试策略', '风险与缓解', '成功标准'],
                stepDetails: ['具体文件路径', '明确行动', '依赖关系', '风险等级']
            },
            bestPractices: ['具体 - 使用确切文件路径、函数名', '考虑边界情况', '最小化变更', '遵循现有模式', '支持测试', '增量思考', '记录决策'],
            whenToUse: '实现新功能、重大架构变更、复杂重构时使用'
        },
        {
            id: 'python-reviewer',
            name: 'python-reviewer',
            title: 'Python 代码审查专家',
            icon: '🐍',
            description: 'Python 代码审查专家，专注于 PEP 8 合规、Pythonic 惯用模式、类型提示、安全和性能。Python 项目必须使用',
            model: 'sonnet',
            tools: ['Read', 'Grep', 'Glob', 'Bash'],
            features: [
                'SQL 注入检测',
                '命令注入检测',
                '路径遍历检测',
                '错误处理审查',
                '类型提示检查',
                'Pythonic 模式验证'
            ],
            priorities: [
                { level: 'CRITICAL - 安全', items: ['f-string SQL 查询', 'subprocess shell=True', '用户控制路径', 'eval/exec 滥用', '不安全反序列化', '硬编码密钥'] },
                { level: 'CRITICAL - 错误处理', items: ['裸 except:', '吞掉异常', '缺失上下文管理器'] },
                { level: 'HIGH - 类型提示', items: ['公共函数缺失类型注解', '使用 Any 而非具体类型', '可空参数缺失 Optional'] },
                { level: 'HIGH - Pythonic', items: ['C 风格循环', 'type() == 而非 isinstance()', '魔法数字而非 Enum', '循环中字符串拼接'] }
            ],
            diagnosticCommands: ['mypy .', 'ruff check .', 'black --check .', 'bandit -r .', 'pytest --cov=app --cov-report=term-missing'],
            whenToUse: '所有 Python 代码变更时使用'
        },
        {
            id: 'refactor-cleaner',
            name: 'refactor-cleaner',
            title: '重构清理专家',
            icon: '🧹',
            description: '死代码清理和整合专家。主动移除未使用代码、重复代码和重构。运行分析工具识别死代码并安全移除',
            model: 'sonnet',
            tools: ['Read', 'Write', 'Edit', 'Bash', 'Grep', 'Glob'],
            features: [
                '死代码检测',
                '重复消除',
                '依赖清理',
                '安全重构'
            ],
            detectionCommands: ['npx knip', 'npx depcheck', 'npx ts-prune', 'npx eslint . --report-unused-disable-directives'],
            workflow: [
                { step: '分析', desc: '并行运行检测工具，按风险分类：SAFE（未使用导出/依赖）、CAREFUL（动态导入）、RISKY（公共 API）' },
                { step: '验证', desc: '对每个要移除的项目：grep 所有引用、检查是否为公共 API、审查 git 历史' },
                { step: '安全移除', desc: '仅从 SAFE 开始，一次移除一个类别：deps → exports → files → duplicates，每批后运行测试' }
            ],
            safetyChecklist: ['检测工具确认未使用', 'Grep 确认无引用（包括动态）', '不是公共 API 的一部分', '移除后测试通过'],
            whenToUse: '主动用于移除未使用代码、重复和重构'
        },
        {
            id: 'security-reviewer',
            name: 'security-reviewer',
            title: '安全审查专家',
            icon: '🔒',
            description: '安全漏洞检测和修复专家。处理用户输入、认证、API 端点或敏感数据后主动使用。检测密钥、SSRF、注入、不安全加密和 OWASP Top 10',
            model: 'sonnet',
            tools: ['Read', 'Write', 'Edit', 'Bash', 'Grep', 'Glob'],
            features: [
                '漏洞检测',
                '密钥检测',
                '输入验证',
                '认证/授权检查',
                '依赖安全',
                '安全最佳实践执行'
            ],
            owaspTop10: [
                { id: 1, name: '注入', check: '查询参数化？用户输入清理？ORM 安全使用？' },
                { id: 2, name: '破损认证', check: '密码哈希（bcrypt/argon2）？JWT 验证？会话安全？' },
                { id: 3, name: '敏感数据暴露', check: 'HTTPS 强制？密钥在环境变量？PII 加密？日志清理？' },
                { id: 4, name: 'XXE', check: 'XML 解析器安全配置？外部实体禁用？' },
                { id: 5, name: '破损访问控制', check: '每个路由检查认证？CORS 正确配置？' },
                { id: 6, name: '安全配置错误', check: '默认凭证更改？调试模式关闭？安全头设置？' },
                { id: 7, name: 'XSS', check: '输出转义？CSP 设置？框架自动转义？' },
                { id: 8, name: '不安全反序列化', check: '用户输入安全反序列化？' },
                { id: 9, name: '已知漏洞', check: '依赖最新？npm audit 干净？' },
                { id: 10, name: '日志不足', check: '安全事件日志？警报配置？' }
            ],
            emergencyResponse: ['文档详细报告', '立即通知项目所有者', '提供安全代码示例', '验证修复有效', '如果凭证暴露则轮换密钥'],
            whenToUse: '新 API 端点、认证代码变更、用户输入处理、DB 查询变更、文件上传、支付代码、外部 API 集成、依赖更新时使用'
        },
        {
            id: 'tdd-guide',
            name: 'tdd-guide',
            title: 'TDD 专家',
            icon: '✅',
            description: '测试驱动开发专家，强制先写测试的方法论。编写新功能、修复 bug 或重构代码时主动使用。确保 80%+ 测试覆盖率',
            model: 'sonnet',
            tools: ['Read', 'Write', 'Edit', 'Bash', 'Grep'],
            features: [
                '强制先测试方法',
                'Red-Green-Refactor 循环',
                '80%+ 测试覆盖率',
                '全面测试套件编写',
                '边界情况捕获'
            ],
            tddCycle: {
                RED: '编写失败测试',
                GREEN: '编写最小代码通过测试',
                REFACTOR: '改进代码，保持测试通过',
                REPEAT: '下一个功能/场景'
            },
            testTypes: [
                { type: '单元测试', desc: '隔离测试单个函数', when: '始终' },
                { type: '集成测试', desc: 'API 端点、数据库操作', when: '始终' },
                { type: 'E2E 测试', desc: '关键用户流程 (Playwright)', when: '关键路径' }
            ],
            edgeCases: ['Null/Undefined 输入', '空数组/字符串', '无效类型', '边界值（最小/最大）', '错误路径', '竞态条件', '大数据（10k+ 项）', '特殊字符'],
            whenToUse: '实现新功能、添加函数/组件、修复 bug、重构现有代码、构建关键业务逻辑时使用'
        }
    ],
    skills: [
        {
            id: 'python-patterns',
            name: 'python-patterns',
            title: 'Python 开发模式',
            icon: '🐍',
            description: 'Pythonic 惯用模式、PEP 8 标准、类型提示和最佳实践，构建健壮、高效、可维护的 Python 应用',
            categories: ['核心原则', '类型提示', '错误处理', '上下文管理器', '推导式和生成器', '数据类', '装饰器', '并发模式', '包组织', '内存和性能'],
            keyPrinciples: ['可读性优先', '显式优于隐式', 'EAFP - 请求宽恕比许可更容易'],
            patterns: {
                '类型提示': '现代 Python 类型注解，Protocol 基于 Duck Typing，TypeVar 泛型',
                '错误处理': '特定异常处理，异常链，自定义异常层次',
                '上下文管理器': '资源管理 with 语句，自定义上下文管理器类',
                '生成器': '列表推导式，生成器表达式，生成器函数',
                '数据类': '@dataclass 自动方法，验证，命名元组',
                '装饰器': '函数装饰器，参数化装饰器，类装饰器',
                '并发': '线程池用于 I/O，进程池用于 CPU，async/await 用于并发 I/O'
            },
            antiPatterns: ['可变默认参数', 'type() == 检查', '== None 而非 is None', 'from module import *', '裸 except:', '循环中字符串拼接'],
            tooling: ['black .', 'isort .', 'ruff check .', 'mypy .', 'pytest --cov', 'bandit -r .']
        },
        {
            id: 'golang-patterns',
            name: 'golang-patterns',
            title: 'Go 开发模式',
            icon: '🐹',
            description: '惯用 Go 模式、最佳实践和约定，构建健壮、高效、可维护的 Go 应用',
            categories: ['核心原则', '错误处理', '并发模式', '接口设计', '包组织', '结构设计', '内存和性能', '工具集成'],
            keyPrinciples: ['简单清晰优于巧妙', '零值有用', '接受接口返回结构体', '不要通过共享内存通信'],
            patterns: {
                '错误处理': '带上下文包装，自定义错误类型，errors.Is/As 检查',
                '并发': 'Worker Pool，Context 取消/超时，优雅关闭，errgroup 协调',
                '接口': '小而专注的接口，在使用处定义，可选行为类型断言',
                '结构': '函数选项模式，嵌入组合',
                '性能': '预分配切片，sync.Pool，strings.Builder 避免循环拼接'
            },
            idioms: [
                { idiom: 'Accept interfaces, return structs', desc: '函数接受接口参数，返回具体类型' },
                { idiom: 'Errors are values', desc: '错误是一等公民，不是异常' },
                { idiom: "Don't communicate by sharing memory", desc: '使用 channel 协调 goroutine' },
                { idiom: 'Make the zero value useful', desc: '类型无需显式初始化即可使用' },
                { idiom: 'Clear is better than clever', desc: '可读性优于聪明' },
                { idiom: 'gofmt is no one\'s favorite but everyone\'s friend', desc: '总是用 gofmt/goimports 格式化' }
            ],
            commands: ['go build ./...', 'go test -race ./...', 'go vet ./...', 'staticcheck ./...', 'golangci-lint run', 'gofmt -w .']
        },
        {
            id: 'springboot-patterns',
            name: 'springboot-patterns',
            title: 'Spring Boot 模式',
            icon: '☕',
            description: 'Spring Boot 架构模式、REST API 设计、分层服务、数据访问、缓存和最佳实践',
            categories: ['分层架构', 'REST API 设计', '数据访问', '缓存策略', '安全模式', '配置管理', '测试策略'],
            layers: ['Controller 层 - HTTP 请求处理', 'Service 层 - 业务逻辑', 'Repository 层 - 数据访问', 'DTO - 数据传输对象', 'Entity - 数据库实体']
        },
        {
            id: 'django-patterns',
            name: 'django-patterns',
            title: 'Django 模式',
            icon: '🎸',
            description: 'Django 架构模式、DRF REST API 设计、ORM 最佳实践、缓存、信号和中间件',
            categories: ['MTV 架构', 'DRF 序列化器', 'ORM 优化', '缓存策略', '信号模式', '中间件模式', '测试策略']
        },
        {
            id: 'postgres-patterns',
            name: 'postgres-patterns',
            title: 'PostgreSQL 模式',
            icon: '🐘',
            description: 'PostgreSQL 数据库模式，用于查询优化、模式设计、索引和安全',
            categories: ['索引策略', '查询优化', '模式设计', '行级安全', '并发控制', '全文搜索', 'JSONB 模式']
        },
        {
            id: 'docker-patterns',
            name: 'docker-patterns',
            title: 'Docker 模式',
            icon: '🐳',
            description: 'Docker 和 Docker Compose 模式，用于本地开发、容器安全、网络和编排',
            categories: ['多阶段构建', '安全实践', '网络模式', '卷管理', 'Compose 模式', '健康检查']
        },
        {
            id: 'api-design',
            name: 'api-design',
            title: 'API 设计模式',
            icon: '🔌',
            description: 'REST API 设计模式，包括资源命名、状态码、分页、过滤、版本控制和错误处理',
            categories: ['资源命名', 'HTTP 方法', '状态码', '分页', '过滤排序', '版本控制', '错误处理', '认证授权']
        },
        {
            id: 'security-review',
            name: 'security-review',
            title: '安全审查',
            icon: '🔐',
            description: '安全漏洞检测和修复检查清单，用于认证、用户输入、密钥处理、API 端点和敏感数据',
            categories: ['OWASP Top 10', '认证模式', '输入验证', '密钥管理', '加密策略', '日志安全']
        },
        {
            id: 'e2e-testing',
            name: 'e2e-testing',
            title: 'E2E 测试模式',
            icon: '🎭',
            description: 'Playwright E2E 测试模式、Page Object Model、配置、CI/CD 集成和最佳实践',
            categories: ['Page Object Model', '选择器策略', '等待模式', '测试组织', 'CI/CD 集成', '工件管理']
        },
        {
            id: 'tdd-workflow',
            name: 'tdd-workflow',
            title: 'TDD 工作流',
            icon: '🔄',
            description: '测试驱动开发方法论，强制先写测试，确保 80%+ 覆盖率',
            categories: ['Red-Green-Refactor', '测试类型', 'Mock 策略', '覆盖率要求', '边界情况']
        },
        {
            id: 'continuous-learning',
            name: 'continuous-learning',
            title: '持续学习',
            icon: '📚',
            description: '从会话中自动提取可重用模式并保存为学习技能',
            categories: ['模式提取', '知识保存', '会话分析', '技能生成']
        },
        {
            id: 'verification-loop',
            name: 'verification-loop',
            title: '验证循环',
            icon: '🔁',
            description: 'Claude Code 会话的综合验证系统',
            categories: ['检查点验证', '持续评估', '评分器类型', 'Pass@k 指标']
        },
        {
            id: 'deployment-patterns',
            name: 'deployment-patterns',
            title: '部署模式',
            icon: '🚀',
            description: '部署工作流、CI/CD 管道模式、Docker 容器化、健康检查和回滚策略',
            categories: ['CI/CD 管道', '容器化', '健康检查', '回滚策略', '蓝绿部署', '金丝雀发布']
        }
    ],
    commands: [
        {
            id: 'plan',
            name: '/plan',
            title: '实施规划',
            icon: '📋',
            description: '重述需求、评估风险、创建分步实施计划。在编写代码前等待用户确认',
            usage: '/plan "添加用户认证"',
            features: [
                '需求分析和重述',
                '风险识别',
                '分阶段实施步骤',
                '依赖识别',
                '复杂度估算',
                '用户确认'
            ],
            workflow: ['分析请求并重述需求', '分解为阶段和具体步骤', '识别组件间依赖', '评估风险和潜在阻碍', '估算复杂度', '展示计划并等待确认'],
            relatedCommands: ['/tdd', '/build-fix', '/code-review']
        },
        {
            id: 'tdd',
            name: '/tdd',
            title: 'TDD 工作流',
            icon: '✅',
            description: '强制测试驱动开发工作流。先定义接口、生成测试、然后实现最小代码通过。确保 80%+ 覆盖率',
            usage: '/tdd 我需要一个计算市场流动性分数的函数',
            features: [
                '先定义接口',
                '先生成失败测试 (RED)',
                '实现最小代码 (GREEN)',
                '重构改进 (REFACTOR)',
                '验证覆盖率 80%+'
            ],
            tddCycle: {
                RED: '编写失败测试',
                GREEN: '编写最小代码通过测试',
                REFACTOR: '改进代码，测试保持通过',
                REPEAT: '下一个功能/场景'
            },
            coverageRequirements: { minimum: '80%', critical: '100% (财务计算、认证逻辑、安全代码、核心业务逻辑)' },
            relatedCommands: ['/plan', '/build-fix', '/code-review', '/test-coverage']
        },
        {
            id: 'e2e',
            name: '/e2e',
            title: 'E2E 测试',
            icon: '🎭',
            description: '使用 Playwright 生成和运行端到端测试。创建测试旅程、运行测试、管理工件',
            usage: '/e2e',
            features: [
                '测试旅程创建',
                'Playwright 配置',
                'Page Object Model',
                '工件上传',
                'CI/CD 集成'
            ],
            relatedCommands: ['/verify', '/tdd']
        },
        {
            id: 'code-review',
            name: '/code-review',
            title: '代码审查',
            icon: '👁️',
            description: '质量、安全性和可维护性的专业代码审查。编写或修改代码后立即使用',
            usage: '/code-review',
            features: [
                '安全漏洞检测',
                '代码质量检查',
                '最佳实践验证',
                '性能问题识别'
            ],
            severityLevels: [
                { level: 'CRITICAL', desc: '安全漏洞、数据丢失风险', action: '必须修复' },
                { level: 'HIGH', desc: '代码质量、性能问题', action: '应该修复' },
                { level: 'MEDIUM', desc: '最佳实践、样式问题', action: '建议修复' },
                { level: 'LOW', desc: '可选改进', action: '信息' }
            ],
            relatedCommands: ['/security-review', '/tdd']
        },
        {
            id: 'build-fix',
            name: '/build-fix',
            title: '构建修复',
            icon: '🔧',
            description: '修复构建错误和 TypeScript 类型错误。仅用最小差异修复构建/类型错误，不做架构编辑',
            usage: '/build-fix',
            features: [
                'TypeScript 错误解决',
                '构建错误修复',
                '依赖问题解决',
                '配置错误修复'
            ],
            diagnosticCommands: ['npx tsc --noEmit --pretty', 'npm run build', 'npx eslint . --ext .ts,.tsx,.js,.jsx'],
            relatedCommands: ['/tdd', '/code-review']
        },
        {
            id: 'verify',
            name: '/verify',
            title: '验证循环',
            icon: '🔁',
            description: '运行验证循环：构建、静态分析、测试和覆盖率检查',
            usage: '/verify',
            features: [
                '构建验证',
                '静态分析',
                '测试运行',
                '覆盖率检查'
            ],
            relatedCommands: ['/tdd', '/e2e']
        },
        {
            id: 'refactor-clean',
            name: '/refactor-clean',
            title: '重构清理',
            icon: '🧹',
            description: '使用分析工具识别死代码并安全移除',
            usage: '/refactor-clean',
            features: [
                '死代码检测',
                '未使用导出移除',
                '依赖清理',
                '重复消除'
            ],
            detectionTools: ['knip', 'depcheck', 'ts-prune'],
            relatedCommands: ['/code-review']
        },
        {
            id: 'learn',
            name: '/learn',
            title: '模式提取',
            icon: '📚',
            description: '从会话中提取可重用模式并保存为学习技能',
            usage: '/learn',
            features: [
                '会话分析',
                '模式提取',
                '技能生成',
                '知识保存'
            ],
            relatedCommands: ['/instinct-status', '/evolve']
        },
        {
            id: 'checkpoint',
            name: '/checkpoint',
            title: '检查点',
            icon: '💾',
            description: '保存验证状态以供后续恢复',
            usage: '/checkpoint',
            relatedCommands: ['/verify']
        },
        {
            id: 'test-coverage',
            name: '/test-coverage',
            title: '测试覆盖率',
            icon: '📊',
            description: '检查测试覆盖率并报告',
            usage: '/test-coverage',
            relatedCommands: ['/tdd', '/verify']
        },
        {
            id: 'update-docs',
            name: '/update-docs',
            title: '更新文档',
            icon: '📝',
            description: '更新文档和代码地图',
            usage: '/update-docs',
            relatedCommands: ['/update-codemaps']
        },
        {
            id: 'update-codemaps',
            name: '/update-codemaps',
            title: '更新代码地图',
            icon: '🗺️',
            description: '生成架构代码地图',
            usage: '/update-codemaps',
            relatedCommands: ['/update-docs']
        },
        {
            id: 'go-review',
            name: '/go-review',
            title: 'Go 代码审查',
            icon: '🐹',
            description: 'Go 代码综合审查，惯用模式、并发安全、错误处理和性能',
            usage: '/go-review',
            relatedCommands: ['/go-build', '/go-test']
        },
        {
            id: 'go-build',
            name: '/go-build',
            title: 'Go 构建修复',
            icon: '🔨',
            description: '修复 Go 构建错误、go vet 警告和 linter 问题',
            usage: '/go-build',
            relatedCommands: ['/go-review', '/go-test']
        },
        {
            id: 'go-test',
            name: '/go-test',
            title: 'Go TDD 工作流',
            icon: '✅',
            description: 'Go TDD 工作流。先写表驱动测试，然后实现。验证 80%+ 覆盖率',
            usage: '/go-test',
            relatedCommands: ['/go-review', '/go-build']
        },
        {
            id: 'python-review',
            name: '/python-review',
            title: 'Python 代码审查',
            icon: '🐍',
            description: 'Python 代码综合审查，PEP 8 合规、类型提示、安全和性能',
            usage: '/python-review',
            relatedCommands: ['/tdd']
        },
        {
            id: 'skill-create',
            name: '/skill-create',
            title: '创建技能',
            icon: '✨',
            description: '从本地 git 历史分析编码模式并生成 SKILL.md 文件',
            usage: '/skill-create 或 /skill-create --instincts',
            features: [
                '分析 git 历史',
                '提取编码模式',
                '生成 SKILL.md',
                '生成直觉集合'
            ]
        },
        {
            id: 'instinct-status',
            name: '/instinct-status',
            title: '直觉状态',
            icon: '🧠',
            description: '显示所有学习的直觉及其置信度',
            usage: '/instinct-status',
            relatedCommands: ['/instinct-import', '/instinct-export', '/evolve']
        },
        {
            id: 'instinct-import',
            name: '/instinct-import',
            title: '导入直觉',
            icon: '📥',
            description: '从队友或其他来源导入直觉',
            usage: '/instinct-import <file>',
            relatedCommands: ['/instinct-status', '/instinct-export']
        },
        {
            id: 'instinct-export',
            name: '/instinct-export',
            title: '导出直觉',
            icon: '📤',
            description: '导出直觉供分享',
            usage: '/instinct-export',
            relatedCommands: ['/instinct-status', '/instinct-import']
        },
        {
            id: 'evolve',
            name: '/evolve',
            title: '进化直觉',
            icon: '🧬',
            description: '将相关直觉聚类到技能中',
            usage: '/evolve',
            relatedCommands: ['/instinct-status', '/learn']
        },
        {
            id: 'security-scan',
            name: '/security-scan',
            title: '安全扫描',
            icon: '🔍',
            description: '扫描 Claude Code 配置（.claude/ 目录）的安全漏洞',
            usage: '/security-scan',
            features: [
                '密钥检测',
                '配置审计',
                '权限检查',
                '敏感数据扫描'
            ]
        },
        {
            id: 'setup-pm',
            name: '/setup-pm',
            title: '设置包管理器',
            icon: '📦',
            description: '配置首选的包管理器（npm、pnpm、yarn、bun）',
            usage: '/setup-pm',
            features: [
                '自动检测包管理器',
                '配置环境变量',
                '项目级配置',
                '全局配置'
            ]
        },
        {
            id: 'pm2',
            name: '/pm2',
            title: 'PM2 初始化',
            icon: '🚀',
            description: 'PM2 进程管理器初始化',
            usage: '/pm2'
        }
    ]
};

// 导出数据
if (typeof module !== 'undefined' && module.exports) {
    module.exports = componentsData;
}