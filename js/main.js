// Everything Claude Code Website - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 导航栏滚动效果
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
        }

        lastScroll = currentScroll;
    });

    // 数字动画
    const stats = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5
    };

    const animateValue = (element, start, end, duration) => {
        const startTime = performance.now();
        const suffix = element.textContent.includes('K') ? 'K+' :
                       element.textContent.includes('+') ? '+' : '';

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const current = Math.floor(start + (end - start) * progress);
            element.textContent = current + suffix;

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const text = entry.target.textContent;
                let endValue;

                if (text.includes('K')) {
                    endValue = parseInt(text) * 1000;
                } else {
                    endValue = parseInt(text);
                }

                animateValue(entry.target, 0, endValue, 1500);
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    stats.forEach(stat => statsObserver.observe(stat));

    // 动态加载组件卡片
    renderComponents();

    // 代码复制功能
    document.querySelectorAll('pre').forEach(pre => {
        pre.style.position = 'relative';
        pre.style.cursor = 'pointer';

        pre.addEventListener('click', async function() {
            const code = this.querySelector('code')?.textContent || this.textContent;

            try {
                await navigator.clipboard.writeText(code);

                const tip = document.createElement('span');
                tip.textContent = '已复制!';
                tip.style.cssText = `
                    position: absolute;
                    top: 8px;
                    right: 8px;
                    background: #7c3aed;
                    color: white;
                    padding: 4px 12px;
                    border-radius: 4px;
                    font-size: 12px;
                    opacity: 1;
                    transition: opacity 0.3s;
                `;
                this.appendChild(tip);

                setTimeout(() => {
                    tip.style.opacity = '0';
                    setTimeout(() => tip.remove(), 300);
                }, 1500);
            } catch (err) {
                console.error('复制失败:', err);
            }
        });
    });

    // 点击模态框外部关闭
    document.getElementById('modal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });

    // ESC 键关闭模态框
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    console.log('Everything Claude Code Website Loaded');
});

// 渲染组件卡片
function renderComponents() {
    // 渲染 Agents
    const agentsGrid = document.getElementById('agents-grid');
    if (agentsGrid && componentsData.agents) {
        agentsGrid.innerHTML = componentsData.agents.map(agent => `
            <div class="component-card" onclick="showAgentDetail('${agent.id}')">
                <div class="card-header">
                    <span class="card-icon">${agent.icon}</span>
                    <div class="card-title">
                        <h3>${agent.name}</h3>
                        <span class="card-subtitle">${agent.title}</span>
                    </div>
                </div>
                <p class="card-description">${agent.description}</p>
                <div class="card-tags">
                    <span class="tag tag-model">${agent.model}</span>
                    <span class="tag tag-tools">${agent.tools.length} tools</span>
                </div>
                <div class="card-features">
                    ${agent.features.slice(0, 3).map(f => `<span>• ${f}</span>`).join('')}
                </div>
                <div class="card-click-hint">点击查看详情 →</div>
            </div>
        `).join('');
    }

    // 渲染 Skills
    const skillsGrid = document.getElementById('skills-grid');
    if (skillsGrid && componentsData.skills) {
        skillsGrid.innerHTML = componentsData.skills.map(skill => `
            <div class="component-card" onclick="showSkillDetail('${skill.id}')">
                <div class="card-header">
                    <span class="card-icon">${skill.icon}</span>
                    <div class="card-title">
                        <h3>${skill.name}</h3>
                        <span class="card-subtitle">${skill.title}</span>
                    </div>
                </div>
                <p class="card-description">${skill.description}</p>
                <div class="card-categories">
                    ${skill.categories.slice(0, 4).map(c => `<span class="category-tag">${c}</span>`).join('')}
                </div>
                <div class="card-click-hint">点击查看详情 →</div>
            </div>
        `).join('');
    }

    // 渲染 Commands
    const commandsGrid = document.getElementById('commands-grid');
    if (commandsGrid && componentsData.commands) {
        commandsGrid.innerHTML = componentsData.commands.map(cmd => `
            <div class="component-card" onclick="showCommandDetail('${cmd.id}')">
                <div class="card-header">
                    <span class="card-icon">${cmd.icon}</span>
                    <div class="card-title">
                        <h3>${cmd.name}</h3>
                        <span class="card-subtitle">${cmd.title}</span>
                    </div>
                </div>
                <p class="card-description">${cmd.description}</p>
                <div class="card-usage">
                    <code>${cmd.usage}</code>
                </div>
                <div class="card-click-hint">点击查看详情 →</div>
            </div>
        `).join('');
    }
}

// 打开模态框
function openModal() {
    const modal = document.getElementById('modal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// 关闭模态框
function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// 显示 Agent 详情
function showAgentDetail(id) {
    const agent = componentsData.agents.find(a => a.id === id);
    if (!agent) return;

    document.getElementById('modal-icon').textContent = agent.icon;
    document.getElementById('modal-title').textContent = `${agent.name} - ${agent.title}`;

    let html = `
        <div class="detail-section">
            <h4>📋 描述</h4>
            <p>${agent.description}</p>
        </div>

        <div class="detail-section">
            <h4>🎯 使用时机</h4>
            <p class="when-to-use">${agent.whenToUse}</p>
        </div>

        <div class="detail-section">
            <h4>⚙️ 配置</h4>
            <div class="config-grid">
                <div class="config-item">
                    <span class="config-label">Model</span>
                    <span class="config-value model-${agent.model}">${agent.model}</span>
                </div>
                <div class="config-item">
                    <span class="config-label">Tools</span>
                    <span class="config-value">${agent.tools.join(', ')}</span>
                </div>
            </div>
        </div>

        <div class="detail-section">
            <h4>✨ 核心功能</h4>
            <ul class="feature-list">
                ${agent.features.map(f => `<li>${f}</li>`).join('')}
            </ul>
        </div>
    `;

    if (agent.workflow) {
        html += `
            <div class="detail-section">
                <h4>🔄 工作流程</h4>
                <div class="workflow-steps">
                    ${agent.workflow.map((step, i) => `
                        <div class="workflow-step">
                            <div class="step-num">${i + 1}</div>
                            <div class="step-content">
                                <strong>${step.step}</strong>
                                <p>${step.desc}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    if (agent.reviewChecklist) {
        html += `
            <div class="detail-section">
                <h4>✅ 审查清单</h4>
                ${agent.reviewChecklist.map(cat => `
                    <div class="checklist-category">
                        <strong>${cat.category}</strong>
                        <ul>
                            ${cat.items.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                `).join('')}
            </div>
        `;
    }

    if (agent.keyPrinciples) {
        html += `
            <div class="detail-section">
                <h4>🔑 关键原则</h4>
                <ul class="principle-list">
                    ${agent.keyPrinciples.map(p => `<li><code>${p}</code></li>`).join('')}
                </ul>
            </div>
        `;
    }

    if (agent.antiPatterns) {
        html += `
            <div class="detail-section">
                <h4>⚠️ 反模式</h4>
                <ul class="anti-pattern-list">
                    ${agent.antiPatterns.map(p => `<li>${p}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    if (agent.diagnosticCommands) {
        html += `
            <div class="detail-section">
                <h4>🔧 诊断命令</h4>
                <pre class="code-block"><code>${agent.diagnosticCommands.join('\n')}</code></pre>
            </div>
        `;
    }

    if (agent.priorityLevels) {
        html += `
            <div class="detail-section">
                <h4>📊 优先级</h4>
                <div class="priority-table">
                    ${agent.priorityLevels.map(p => `
                        <div class="priority-row">
                            <span class="priority-level level-${p.level.toLowerCase()}">${p.level}</span>
                            <span class="priority-desc">${p.desc}</span>
                            <span class="priority-action">${p.action}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    if (agent.owaspTop10) {
        html += `
            <div class="detail-section">
                <h4>🛡️ OWASP Top 10 检查</h4>
                <div class="owasp-list">
                    ${agent.owaspTop10.map(item => `
                        <div class="owasp-item">
                            <span class="owasp-num">${item.id}</span>
                            <span class="owasp-name">${item.name}</span>
                            <span class="owasp-check">${item.check}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    if (agent.tddCycle) {
        html += `
            <div class="detail-section">
                <h4>🔄 TDD 循环</h4>
                <div class="tdd-cycle">
                    ${Object.entries(agent.tddCycle).map(([key, val]) => `
                        <div class="tdd-step tdd-${key.toLowerCase()}">
                            <strong>${key}</strong>
                            <p>${val}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    if (agent.testTypes) {
        html += `
            <div class="detail-section">
                <h4>🧪 测试类型</h4>
                <div class="test-types">
                    ${agent.testTypes.map(t => `
                        <div class="test-type">
                            <strong>${t.type}</strong>
                            <p>${t.desc}</p>
                            <span class="when-tag">${t.when}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    if (agent.edgeCases) {
        html += `
            <div class="detail-section">
                <h4>🔍 必须测试的边界情况</h4>
                <div class="edge-cases">
                    ${agent.edgeCases.map(e => `<span class="edge-tag">${e}</span>`).join('')}
                </div>
            </div>
        `;
    }

    if (agent.commonFixes) {
        html += `
            <div class="detail-section">
                <h4>🔧 常见修复</h4>
                <div class="fixes-table">
                    <div class="fixes-header">
                        <span>错误</span>
                        <span>原因</span>
                        <span>修复</span>
                    </div>
                    ${agent.commonFixes.map(f => `
                        <div class="fixes-row">
                            <code>${f.error}</code>
                            <span>${f.cause}</span>
                            <span>${f.fix}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    if (agent.successMetrics) {
        html += `
            <div class="detail-section">
                <h4>📈 成功指标</h4>
                <div class="metrics-grid">
                    ${Object.entries(agent.successMetrics).map(([key, val]) => `
                        <div class="metric-item">
                            <strong>${key}</strong>
                            <span>${val}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    document.getElementById('modal-body').innerHTML = html;
    openModal();
}

// 显示 Skill 详情
function showSkillDetail(id) {
    const skill = componentsData.skills.find(s => s.id === id);
    if (!skill) return;

    document.getElementById('modal-icon').textContent = skill.icon;
    document.getElementById('modal-title').textContent = `${skill.name} - ${skill.title}`;

    let html = `
        <div class="detail-section">
            <h4>📋 描述</h4>
            <p>${skill.description}</p>
        </div>

        <div class="detail-section">
            <h4>📁 分类</h4>
            <div class="categories-list">
                ${skill.categories.map(c => `<span class="category-tag">${c}</span>`).join('')}
            </div>
        </div>
    `;

    if (skill.keyPrinciples) {
        html += `
            <div class="detail-section">
                <h4>🔑 核心原则</h4>
                <ul class="principle-list">
                    ${skill.keyPrinciples.map(p => `<li>${p}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    if (skill.patterns) {
        html += `
            <div class="detail-section">
                <h4>📐 模式</h4>
                <div class="patterns-grid">
                    ${Object.entries(skill.patterns).map(([key, val]) => `
                        <div class="pattern-item">
                            <strong>${key}</strong>
                            <p>${val}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    if (skill.idioms) {
        html += `
            <div class="detail-section">
                <h4>💡 惯用语</h4>
                <div class="idioms-table">
                    ${skill.idioms.map(i => `
                        <div class="idiom-row">
                            <code>${i.idiom}</code>
                            <span>${i.desc}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    if (skill.antiPatterns) {
        html += `
            <div class="detail-section">
                <h4>⚠️ 反模式</h4>
                <ul class="anti-pattern-list">
                    ${skill.antiPatterns.map(p => `<li><code>${p}</code></li>`).join('')}
                </ul>
            </div>
        `;
    }

    if (skill.tooling) {
        html += `
            <div class="detail-section">
                <h4>🔧 工具命令</h4>
                <pre class="code-block"><code>${skill.tooling.join('\n')}</code></pre>
            </div>
        `;
    }

    if (skill.commands) {
        html += `
            <div class="detail-section">
                <h4>🔧 命令</h4>
                <pre class="code-block"><code>${skill.commands.join('\n')}</code></pre>
            </div>
        `;
    }

    if (skill.layers) {
        html += `
            <div class="detail-section">
                <h4>🏗️ 分层架构</h4>
                <ul class="layers-list">
                    ${skill.layers.map(l => `<li>${l}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    document.getElementById('modal-body').innerHTML = html;
    openModal();
}

// 显示 Command 详情
function showCommandDetail(id) {
    const cmd = componentsData.commands.find(c => c.id === id);
    if (!cmd) return;

    document.getElementById('modal-icon').textContent = cmd.icon;
    document.getElementById('modal-title').textContent = `${cmd.name} - ${cmd.title}`;

    let html = `
        <div class="detail-section">
            <h4>📋 描述</h4>
            <p>${cmd.description}</p>
        </div>

        <div class="detail-section">
            <h4>💻 用法</h4>
            <pre class="code-block"><code>${cmd.usage}</code></pre>
        </div>
    `;

    if (cmd.features) {
        html += `
            <div class="detail-section">
                <h4>✨ 功能</h4>
                <ul class="feature-list">
                    ${cmd.features.map(f => `<li>${f}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    if (cmd.workflow) {
        html += `
            <div class="detail-section">
                <h4>🔄 工作流程</h4>
                <ol class="workflow-list">
                    ${cmd.workflow.map(w => `<li>${w}</li>`).join('')}
                </ol>
            </div>
        `;
    }

    if (cmd.tddCycle) {
        html += `
            <div class="detail-section">
                <h4>🔄 TDD 循环</h4>
                <div class="tdd-cycle">
                    ${Object.entries(cmd.tddCycle).map(([key, val]) => `
                        <div class="tdd-step tdd-${key.toLowerCase()}">
                            <strong>${key}</strong>
                            <p>${val}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    if (cmd.coverageRequirements) {
        html += `
            <div class="detail-section">
                <h4>📊 覆盖率要求</h4>
                <div class="coverage-grid">
                    <div class="coverage-item">
                        <strong>最低要求</strong>
                        <span>${cmd.coverageRequirements.minimum}</span>
                    </div>
                    <div class="coverage-item">
                        <strong>关键代码</strong>
                        <span>${cmd.coverageRequirements.critical}</span>
                    </div>
                </div>
            </div>
        `;
    }

    if (cmd.severityLevels) {
        html += `
            <div class="detail-section">
                <h4>📊 严重程度</h4>
                <div class="severity-table">
                    ${cmd.severityLevels.map(s => `
                        <div class="severity-row severity-${s.level.toLowerCase()}">
                            <span class="severity-level">${s.level}</span>
                            <span class="severity-desc">${s.desc}</span>
                            <span class="severity-action">${s.action}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    if (cmd.diagnosticCommands) {
        html += `
            <div class="detail-section">
                <h4>🔧 诊断命令</h4>
                <pre class="code-block"><code>${cmd.diagnosticCommands.join('\n')}</code></pre>
            </div>
        `;
    }

    if (cmd.detectionTools) {
        html += `
            <div class="detail-section">
                <h4>🔍 检测工具</h4>
                <div class="tools-list">
                    ${cmd.detectionTools.map(t => `<span class="tool-tag">${t}</span>`).join('')}
                </div>
            </div>
        `;
    }

    if (cmd.relatedCommands) {
        html += `
            <div class="detail-section">
                <h4>🔗 相关命令</h4>
                <div class="related-commands">
                    ${cmd.relatedCommands.map(c => `<span class="cmd-tag">${c}</span>`).join('')}
                </div>
            </div>
        `;
    }

    document.getElementById('modal-body').innerHTML = html;
    openModal();
}