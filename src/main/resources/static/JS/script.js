// DOM이 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
    // 전역 변수
    let profileData = null;
    let skillsData = null;
    let projectsData = null;
    let experienceData = null;

    // 초기화
    init();

    // 초기화 함수
    async function init() {
        try {
            await loadAllData();
            setupEventListeners();
            setupScrollEffects();
            setupNavigation();
            setupBackToTop();
            setupContactForm();
        } catch (error) {
            console.error('초기화 중 오류 발생:', error);
        }
    }

    // 모든 데이터 로드
    async function loadAllData() {
        try {
            const [profile, skills, projects, experience] = await Promise.all([
                fetch('/api/profile').then(res => res.json()),
                fetch('/api/skills').then(res => res.json()),
                fetch('/api/projects').then(res => res.json()),
                fetch('/api/experience').then(res => res.json())
            ]);

            profileData = profile;
            skillsData = skills;
            projectsData = projects;
            experienceData = experience;

            // 데이터 렌더링
            renderSkills();
            renderProjects();
            renderExperience();
            updateProfileInfo();
        } catch (error) {
            console.error('데이터 로드 실패:', error);
            showErrorMessage('데이터를 불러오는데 실패했습니다.');
        }
    }

    // 스킬 렌더링
    function renderSkills() {
        if (!skillsData) return;

        const skillCategories = {
            'frontend-skills': skillsData.frontend,
            'backend-skills': skillsData.backend,
            'database-skills': skillsData.database,
            'tools-skills': skillsData.tools
        };

        Object.entries(skillCategories).forEach(([containerId, skills]) => {
            const container = document.getElementById(containerId);
            if (container && skills) {
                container.innerHTML = skills.map(skill => 
                    `<span class="skill-item">${skill}</span>`
                ).join('');
            }
        });
    }

    // 프로젝트 렌더링
    function renderProjects() {
        if (!projectsData) return;

        const container = document.getElementById('projects-container');
        if (container) {
            container.innerHTML = projectsData.map(project => `
                <div class="project-card fade-in">
                    <div class="project-image">
                        <i class="fas fa-laptop-code"></i>
                    </div>
                    <div class="project-content">
                        <h3 class="project-title">${project.title}</h3>
                        <p class="project-description">${project.description}</p>
                        <div class="project-technologies">
                            ${project.technologies.map(tech => 
                                `<span class="tech-tag">${tech}</span>`
                            ).join('')}
                        </div>
                        <div class="project-links">
                            <a href="${project.github}" class="project-link" target="_blank">
                                <i class="fab fa-github"></i> GitHub
                            </a>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    }

    // 경력 렌더링
    function renderExperience() {
        if (!experienceData) return;

        const container = document.getElementById('experience-container');
        if (container) {
            container.innerHTML = experienceData.map((exp, index) => `
                <div class="experience-item fade-in">
                    <div class="experience-dot"></div>
                    <div class="experience-content">
                        <div class="experience-company">${exp.company}</div>
                        <div class="experience-position">${exp.position}</div>
                        <div class="experience-period">${exp.period}</div>
                        <div class="experience-description">${exp.description}</div>
                    </div>
                </div>
            `).join('');
        }
    }

    // 프로필 정보 업데이트
    function updateProfileInfo() {
        if (!profileData) return;

        // Hero 섹션의 이름과 제목 업데이트
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            heroTitle.innerHTML = `안녕하세요, <span class="highlight">${profileData.name}</span>입니다`;
        }

        const heroSubtitle = document.querySelector('.hero-subtitle');
        if (heroSubtitle) {
            heroSubtitle.textContent = profileData.title;
        }

        const heroDescription = document.querySelector('.hero-description');
        if (heroDescription) {
            heroDescription.textContent = profileData.description;
        }

        // About 섹션의 연락처 정보 업데이트
        const contactItems = document.querySelectorAll('.contact-item span');
        if (contactItems.length >= 3) {
            contactItems[0].textContent = profileData.email;
            contactItems[1].textContent = profileData.phone;
            contactItems[2].textContent = profileData.location;
        }

        // Contact 섹션의 이메일 링크 업데이트
        const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
        emailLinks.forEach(link => {
            link.href = `mailto:${profileData.email}`;
        });
    }

    // 이벤트 리스너 설정
    function setupEventListeners() {
        // 모바일 메뉴 토글
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });

            // 메뉴 링크 클릭 시 메뉴 닫기
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                });
            });
        }

        // 스크롤 시 네비게이션 스타일 변경
        window.addEventListener('scroll', handleScroll);
    }

    // 스크롤 처리
    function handleScroll() {
        const navbar = document.querySelector('.navbar');
        const backToTop = document.getElementById('backToTop');

        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
            if (backToTop) {
                backToTop.classList.add('visible');
            }
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            if (backToTop) {
                backToTop.classList.remove('visible');
            }
        }
    }

    // 스크롤 효과 설정
    function setupScrollEffects() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // fade-in 클래스를 가진 요소들을 관찰
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
    }

    // 네비게이션 설정
    function setupNavigation() {
        // 부드러운 스크롤
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80; // 네비게이션 높이 고려
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // 현재 섹션에 따른 네비게이션 활성화
        window.addEventListener('scroll', updateActiveNav);
    }

    // 활성 네비게이션 업데이트
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Back to Top 버튼 설정
    function setupBackToTop() {
        const backToTopBtn = document.getElementById('backToTop');
        if (backToTopBtn) {
            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    // 연락처 폼 설정
    function setupContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', handleContactFormSubmit);
        }
    }

    // 연락처 폼 제출 처리
    function handleContactFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        // 간단한 유효성 검사
        if (!name || !email || !message) {
            showMessage('모든 필드를 입력해주세요.', 'error');
            return;
        }

        // 이메일 유효성 검사
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage('올바른 이메일 주소를 입력해주세요.', 'error');
            return;
        }

        // 폼 제출 시뮬레이션 (실제로는 서버로 전송)
        showMessage('메시지가 성공적으로 전송되었습니다!', 'success');
        e.target.reset();
    }

    // 메시지 표시 함수
    function showMessage(message, type = 'info') {
        // 기존 메시지 제거
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // 새 메시지 생성
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;
        
        // 스타일 적용
        messageDiv.style.cssText = `
            padding: 1rem;
            margin-top: 1rem;
            border-radius: 8px;
            font-weight: 500;
            text-align: center;
            background: ${type === 'success' ? '#d1fae5' : type === 'error' ? '#fee2e2' : '#dbeafe'};
            color: ${type === 'success' ? '#065f46' : type === 'error' ? '#991b1b' : '#1e40af'};
            border: 1px solid ${type === 'success' ? '#a7f3d0' : type === 'error' ? '#fecaca' : '#bfdbfe'};
        `;

        // 폼에 메시지 추가
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.appendChild(messageDiv);
            
            // 3초 후 메시지 제거
            setTimeout(() => {
                messageDiv.remove();
            }, 3000);
        }
    }

    // 에러 메시지 표시
    function showErrorMessage(message) {
        console.error(message);
        // 필요시 사용자에게 에러 메시지 표시
    }

    // 스킬 아이템 애니메이션
    function animateSkills() {
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                item.style.transition = 'all 0.3s ease';
                
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 100);
            }, index * 100);
        });
    }

    // 타이핑 효과 (선택사항)
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // 페이지 로드 완료 후 스킬 애니메이션 실행
    window.addEventListener('load', () => {
        setTimeout(animateSkills, 1000);
    });

    // 키보드 접근성
    document.addEventListener('keydown', function(e) {
        // ESC 키로 모바일 메뉴 닫기
        if (e.key === 'Escape') {
            const navMenu = document.querySelector('.nav-menu');
            const navToggle = document.querySelector('.nav-toggle');
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        }
    });

    // 리사이즈 이벤트 처리
    window.addEventListener('resize', () => {
        // 모바일 메뉴가 열려있을 때 데스크톱으로 전환되면 메뉴 닫기
        if (window.innerWidth > 768) {
            const navMenu = document.querySelector('.nav-menu');
            const navToggle = document.querySelector('.nav-toggle');
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        }
    });

    // 성능 최적화를 위한 디바운스 함수
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // 스크롤 이벤트 최적화
    const debouncedScrollHandler = debounce(handleScroll, 10);
    const debouncedNavHandler = debounce(updateActiveNav, 10);
    
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('scroll', updateActiveNav);
    window.addEventListener('scroll', debouncedScrollHandler);
    window.addEventListener('scroll', debouncedNavHandler);
});
