package com.example;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
public class PlanController {
    private Map<String, Object> timetableData;
    private Map<String, Object> studyPlan;
    private Map<String, Object> progress = new HashMap<>();

    @PostMapping("/upload-timetable")
    public ResponseEntity<?> uploadTimetable(@RequestBody Map<String, Object> data) {
        this.timetableData = data;
        return ResponseEntity.ok(Map.of("status", "success", "message", "Timetable uploaded."));
    }

    @PostMapping("/generate-plan")
    public ResponseEntity<?> generatePlan() {
        if (timetableData == null) {
            return ResponseEntity.badRequest().body(Map.of("status", "error", "message", "No timetable uploaded."));
        }
        studyPlan = Map.of(
                "plan", List.of(
                        Map.of("day", "Monday", "task", "Study Math"),
                        Map.of("day", "Tuesday", "task", "Study Physics"),
                        Map.of("day", "Wednesday", "task", "Revision")
                )
        );
        return ResponseEntity.ok(Map.of("status", "success", "plan", studyPlan));
    }

    @GetMapping("/plan")
    public ResponseEntity<?> getPlan() {
        if (studyPlan == null) {
            return ResponseEntity.status(404).body(Map.of("status", "error", "message", "No plan generated."));
        }
        return ResponseEntity.ok(Map.of("status", "success", "plan", studyPlan));
    }

    @PostMapping("/progress")
    public ResponseEntity<?> updateProgress(@RequestBody Map<String, Object> data) {
        progress.putAll(data);
        return ResponseEntity.ok(Map.of("status", "success", "progress", progress));
    }

    @GetMapping("/progress")
    public ResponseEntity<?> getProgress() {
        return ResponseEntity.ok(Map.of("status", "success", "progress", progress));
    }
}
