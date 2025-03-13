# **Chatbot with ChromaDB Integration**

## **📌 Overview**

This chatbot allows users to:

1. **Store data from multiple links** into **ChromaDB**.
2. **Query the stored data** and retrieve the most relevant response.
3. **Use AI (e.g., OpenAI API)** to generate responses based on stored data.

---

## **🛠 System Architecture**

The chatbot consists of two main components:

- **Backend (Node.js + Express + ChromaDB)** – Handles data storage, retrieval, and AI processing.
- **Frontend (React.js)** – Provides UI for submitting links and queries.

**Data Flow:**

1. **User submits links** → Backend fetches content and stores it in ChromaDB.
2. **User submits a query** → Backend retrieves relevant content from ChromaDB and generates a response.

---

## **⚙️ Prerequisites**

### **1. Required Software**

- **Node.js (>=18)** – Backend runtime.
- **Python (>=3.8)** – Required for ChromaDB.
- **ChromaDB** – Vector database for storing and retrieving information.

### **2. Installation**

#### **Backend Dependencies**

- Express.js (for server)
- ChromaDB (for vector storage)
- Gorq llm (for response generation)

#### **Frontend Dependencies**

- React.js (for UI)
- Axios (for API calls)
- TailwindCSS (for styling)

---

## **📂 Folder Structure**

```
chatbot-project/
│── backend/             # Express.js + ChromaDB backend
│   ├── server.js        # Main server file
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

## **🚀 Step 1: Backend Setup (Node.js + ChromaDB)**

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
3. OpenAI (or another AI model) **generates a response** based on the retrieved data.

#### **API Endpoint**

- **POST /query**
  - **Request Body**:
    ```json
    {
      "query": "What is machine learning?"
    }
    ```
  - **Response**:
    ```json
    {
      "response": "Machine learning is a subset of AI..."
    }
    ```

---

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

- Deploy backend on **Vercel**, **AWS**, or **DigitalOcean**.
- Set **environment variables** (`OPENAI_API_KEY`, `CHROMADB_URL`).

### **Frontend Deployment**

- Deploy frontend on **Netlify** or **Vercel**.
- Ensure API calls are routed to the backend.

---

## **📌 Conclusion**

This chatbot leverages **ChromaDB** to store and retrieve data, making responses more relevant. By integrating with **OpenAI**, it enhances user interactions by providing AI-generated responses.
