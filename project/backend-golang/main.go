package main

import (
	"net/http"
	"github.com/gin-gonic/gin"
)

var timetableData map[string]interface{}
var studyPlan map[string]interface{}
var progress = make(map[string]interface{})

func main() {
	r := gin.Default()

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "pong"})
	})

	r.POST("/upload-timetable", func(c *gin.Context) {
		if err := c.BindJSON(&timetableData); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"status": "error", "message": "Expected JSON data."})
			return
		}
		c.JSON(http.StatusOK, gin.H{"status": "success", "message": "Timetable uploaded."})
	})

	r.POST("/generate-plan", func(c *gin.Context) {
		if timetableData == nil {
			c.JSON(http.StatusBadRequest, gin.H{"status": "error", "message": "No timetable uploaded."})
			return
		}
		studyPlan = map[string]interface{}{
			"plan": []map[string]string{
				{"day": "Monday", "task": "Study Math"},
				{"day": "Tuesday", "task": "Study Physics"},
				{"day": "Wednesday", "task": "Revision"},
			},
		}
		c.JSON(http.StatusOK, gin.H{"status": "success", "plan": studyPlan})
	})

	r.GET("/plan", func(c *gin.Context) {
		if studyPlan == nil {
			c.JSON(http.StatusNotFound, gin.H{"status": "error", "message": "No plan generated."})
			return
		}
		c.JSON(http.StatusOK, gin.H{"status": "success", "plan": studyPlan})
	})

	r.POST("/progress", func(c *gin.Context) {
		var data map[string]interface{}
		if err := c.BindJSON(&data); err == nil {
			for k, v := range data {
				progress[k] = v
			}
		}
		c.JSON(http.StatusOK, gin.H{"status": "success", "progress": progress})
	})

	r.GET("/progress", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "success", "progress": progress})
	})

	r.Run(":5001")
}
