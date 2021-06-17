export default {
  "swagger": "2.0",
  "info": {
    "version": "1.0.0",
    "title": "Math Database API",
    "description": "Nodejs + Express + MongoDB",
    "license": {
      "name": "Facebook",
      "url": "https://www.facebook.com/giangkma/"
    }
  },
  "host": "localhost:8888",
  "basePath": "/api/v1",
  "tags": [
    {
      "name": "Questions",
      "description": "API for Questions in the system"
    },
  ],
  "schemes": [
    "http"
  ],
  "consumes": [
    "application/json"
  ],
  "produces": [
    "application/json"
  ],
  "paths": {
    "/questions": {
      "post": {
        "tags": [
          "Questions"
        ],
        "description": "Create new Questions in system",
        "parameters": [
          {
            "name": "question",
            "in": "body",
            "description": "question that we want to create",
            "schema": {
              "$ref": "#/definitions/questionPayload"
            }
          }
        ],
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "New question is created",
            "schema": {
              "$ref": "#/definitions/question"
            }
          }
        }
      },
      "get": {
        "tags": [
          "Questions"
        ],
        "summary": "Get all questions in system",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": "#/definitions/questions"
            }
          }
        }
      }
    },
    "/questions/{questionId}": {
      "parameters": [
        {
          "name": "questionId",
          "in": "path",
          "required": true,
          "description": "ID of question that we want to find",
          "type": "string"
        }
      ],
      "get": {
        "tags": [
          "Questions"
        ],
        "summary": "Get question with given ID",
        "responses": {
          "200": {
            "description": "question is found",
            "schema": {
              "$ref": "#/definitions/question"
            }
          }
        }
      },
      "delete": {
        "summary": "Delete question with given ID",
        "tags": [
          "Questions"
        ],
        "responses": {
          "200": {
            "description": "question is deleted",
            "schema": {
              "$ref": "#/definitions/question"
            }
          }
        }
      },
      "put": {
        "summary": "Update question with give ID",
        "tags": [
          "Questions"
        ],
        "parameters": [
          {
            "name": "question",
            "in": "body",
            "description": "question with new values of properties",
            "schema": {
              "$ref": "#/definitions/questionPayload"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "question is updated",
            "schema": {
              "$ref": "#/definitions/question"
            }
          }
        }
      }
    }
  },
  "definitions": {
    "questionPayload": {
      "required": [
        "question",
        "answer",
        "className",
        "correctAnswer"
      ],
      "properties": {
        "question": {
          "type": "string",
        },
        "answer": {
          "type": "array",
          "items": {
            "type": "string",
          }
        },
        "className": {
          "type": "string"
        },
        "correctAnswer": {
          "type": "string"
        },
        "chapter": {
          "type": "string"
        }
      }
    },
    "question": {
      "required": [
        "id",
        "question",
        "answer",
        "className",
        "correctAnswer"
      ],
      "properties": {
        "id": {
          "type": "string",
          "uniqueItems": true
        },
        "question": {
          "type": "string",
        },
        "answer": {
          "type": "array",
          "items": {
            "type": "string",
          }
        },
        "className": {
          "type": "string"
        },
        "correctAnswer": {
          "type": "string"
        },
        "chapter": {
          "type": "string"
        }
      }
    },
    "questions": {
      "type": "array",
      "$ref": "#/definitions/question"
    }
  }
}