package WEB.Config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("*")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(false);
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // CSS 파일 처리
        registry.addResourceHandler("/CSS/**")
                .addResourceLocations("classpath:/static/CSS/")
                .setCachePeriod(31536000);
        
        // JS 파일 처리
        registry.addResourceHandler("/JS/**")
                .addResourceLocations("classpath:/static/JS/")
                .setCachePeriod(31536000);
        
        // 이미지 파일 처리
        registry.addResourceHandler("/images/**")
                .addResourceLocations("classpath:/static/images/")
                .setCachePeriod(31536000);
        
        // 기타 정적 파일 처리
        registry.addResourceHandler("/static/**")
                .addResourceLocations("classpath:/static/")
                .setCachePeriod(31536000);
    }
}
