# **Chatbot with ChromaDB Integration**

## **📌 Overview**

This chatbot allows users to:

1. **Store data from multiple links** into **ChromaDB**.
2. **Query the stored data** and retrieve the most relevant response.
3. **Use AI (Groq LLM)** to generate responses based on stored data.

---

## **🛠 System Architecture**

The chatbot consists of two main components:

- **Backend (FastAPI + ChromaDB)** – Handles data storage, retrieval, and AI processing.
- **Frontend (React.js)** – Provides UI for submitting links and queries.

**Data Flow:**

1. **User submits links** → Backend fetches content and stores it in ChromaDB.
2. **User submits a query** → Backend retrieves relevant content from ChromaDB and generates a response using Groq LLM.

---

## **⚙️ Prerequisites**

### **1. Required Software**

- **Python (>=3.8)** – Required for FastAPI and ChromaDB.
- **FastAPI** – Backend framework.
- **ChromaDB** – Vector database for storing and retrieving information.
- **Groq LLM** – AI model for generating responses.

### **2. Installation**

#### **Backend Dependencies**

- FastAPI (for backend API)
- ChromaDB (for vector storage)
- Groq LLM SDK (for AI response generation)
- Uvicorn (for running FastAPI server)

#### **Frontend Dependencies**

- React.js (for UI)
- Axios (for API calls)
- TailwindCSS (for styling)

---

## **📂 Folder Structure**

```
chatbot-project/
│── backend/             # FastAPI + ChromaDB backend
│   ├── main.py          # FastAPI server
│   ├── routes/          # API routes
│   ├── controllers/     # Business logic
│   ├── models/          # ChromaDB collections
│   ├── .env             # Environment variables
│── frontend/            # React.js frontend
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── pages/       # Main pages
│   │   ├── App.js       # Main app entry
│   ├── package.json     # Frontend dependencies
│── README.md            # Documentation
```

---

## **🚀 Step 1: Backend Setup (FastAPI + ChromaDB)**

### **1.1 Start ChromaDB**

- Install ChromaDB:
  ```sh
  pip install chromadb
  ```
- Run ChromaDB:
  ```sh
  chroma run --host 0.0.0.0 --port 8000
  ```

### **1.2 Store Data from Links**

- The backend accepts a list of **URLs**, extracts content, and stores it in **ChromaDB** as vector embeddings.

#### **API Endpoint**

- **POST /store-links**
  - **Request Body**:
    ```json
    {
      "links": ["https://example.com/article1", "https://example.com/article2"]
    }
    ```
  - **Response**:
    ```json
    {
      "message": "Links stored successfully",
      "count": 2
    }
    ```

---

## **🖥 Step 2: Query Processing**

### **2.1 How Queries Work**

1. User submits a query.
2. The system **retrieves relevant data** from ChromaDB.
3. Groq LLM **generates a response** based on the retrieved data.

## **🖥 Step 3: Frontend Setup (React.js)**

### **3.1 User Interface (UI)**

- The frontend provides two main features:
  1. **Submit Links** – Users can input URLs and store data.
  2. **Ask Questions** – Users can enter queries and get AI-generated responses.

### **3.2 API Communication**

- The frontend sends requests to the backend to store links and process queries.

---

## **🔧 Deployment**

### **Backend Deployment**

- Deploy backend on **Render**.

### **Frontend Deployment**

- Deploy frontend on **Vercel**.
- Ensure API calls are routed to the backend.

---

## **📌 Conclusion**

This chatbot leverages **ChromaDB** to store and retrieve data, making responses more relevant. By integrating with **Groq LLM**, it enhances user interactions by providing AI-generated responses.
