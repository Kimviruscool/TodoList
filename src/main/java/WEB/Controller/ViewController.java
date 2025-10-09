package WEB.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.HashMap;
import java.util.Map;
import java.util.Arrays;
import java.util.List;

@Controller
@CrossOrigin(origins = "*")
public class ViewController {
    
    @GetMapping("/")
    public String index(){
        return "index";
    }
    
    @GetMapping("/api/profile")
    @ResponseBody
    public Map<String, Object> getProfile() {
        Map<String, Object> profile = new HashMap<>();
        profile.put("name", "개발자");
        profile.put("title", "Full Stack Developer");
        profile.put("email", "developer@example.com");
        profile.put("phone", "010-1234-5678");
        profile.put("location", "서울, 대한민국");
        profile.put("description", "열정적인 개발자로서 사용자 경험을 중시하며, 최신 기술을 활용한 웹 애플리케이션 개발에 전문성을 가지고 있습니다.");
        return profile;
    }
    
    @GetMapping("/api/skills")
    @ResponseBody
    public Map<String, Object> getSkills() {
        Map<String, Object> skills = new HashMap<>();
        skills.put("frontend", Arrays.asList("HTML5", "CSS3", "JavaScript", "React", "Vue.js"));
        skills.put("backend", Arrays.asList("Java", "Spring Boot", "Node.js", "Python"));
        skills.put("database", Arrays.asList("MySQL", "PostgreSQL", "MongoDB"));
        skills.put("tools", Arrays.asList("Git", "Docker", "AWS", "Vercel"));
        return skills;
    }
    
    @GetMapping("/api/projects")
    @ResponseBody
    public List<Map<String, Object>> getProjects() {
        return Arrays.asList(
            Map.of(
                "id", 1,
                "title", "TodoList 웹 애플리케이션",
                "description", "Spring Boot와 MySQL을 활용한 할일 관리 시스템",
                "technologies", Arrays.asList("Java", "Spring Boot", "MySQL", "HTML/CSS/JS"),
                "image", "/images/project1.jpg",
                "github", "https://github.com/yourusername/todolist"
            ),
            Map.of(
                "id", 2,
                "title", "포트폴리오 웹사이트",
                "description", "반응형 디자인의 개인 포트폴리오 웹사이트",
                "technologies", Arrays.asList("HTML5", "CSS3", "JavaScript", "Spring Boot"),
                "image", "/images/project2.jpg",
                "github", "https://github.com/yourusername/portfolio"
            ),
            Map.of(
                "id", 3,
                "title", "E-commerce 플랫폼",
                "description", "온라인 쇼핑몰 구현 프로젝트",
                "technologies", Arrays.asList("React", "Node.js", "MongoDB", "Express"),
                "image", "/images/project3.jpg",
                "github", "https://github.com/yourusername/ecommerce"
            )
        );
    }
    
    @GetMapping("/api/experience")
    @ResponseBody
    public List<Map<String, Object>> getExperience() {
        return Arrays.asList(
            Map.of(
                "company", "테크 컴퍼니",
                "position", "Backend Developer",
                "period", "2023 - 현재",
                "description", "Spring Boot 기반 웹 애플리케이션 개발 및 API 설계"
            ),
            Map.of(
                "company", "스타트업 XYZ",
                "position", "Full Stack Developer",
                "period", "2022 - 2023",
                "description", "프론트엔드와 백엔드 개발을 담당하며 전체적인 시스템 아키텍처 설계"
            )
        );
    }
}
