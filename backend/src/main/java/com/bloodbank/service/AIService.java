package com.bloodbank.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AIService {

    @Value("${openai.api.key}")
    private String apiKey;

    @Value("${openai.api.url}")
    private String apiUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    public String getChatbotResponse(String userMessage) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", "gpt-3.5-turbo"); // or whichever model
        requestBody.put("messages", List.of(
                Map.of("role", "system", "content", "You are a helpful assistant for a Bloodbank Management System. Answer questions about blood types, donation eligibility, and fictional blood bank hours (9 AM to 5 PM, Mon-Sat). Keep answers concise."),
                Map.of("role", "user", "content", userMessage)
        ));
        
        // mock return if key is placeholder
        if (apiKey.equals("YOUR_OPENAI_API_KEY")) {
            return "This is a mock response from the AI Chatbot. Please configure your OpenAI API key in application.properties.";
        }

        try {
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
            ResponseEntity<Map> response = restTemplate.postForEntity(apiUrl, entity, Map.class);
            
            Map<String, Object> responseBody = response.getBody();
            if (responseBody != null && responseBody.containsKey("choices")) {
                List<Map<String, Object>> choices = (List<Map<String, Object>>) responseBody.get("choices");
                if (!choices.isEmpty()) {
                    Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");
                    return (String) message.get("content");
                }
            }
            return "Sorry, I couldn't process your request.";
        } catch (Exception e) {
            e.printStackTrace();
            return "Error communicating with AI service.";
        }
    }
}
