# LinkedIn Public Profile Scraper - Complete Guide

## 🚀 Overview

A comprehensive Node.js LinkedIn public profile scraper that extracts structured data from public LinkedIn profiles using both JSON-LD parsing and HTML fallback methods.

## 📋 Features

✅ **JSON-LD Structured Data Extraction** - Primary method for reliable data extraction
✅ **HTML Fallback Parsing** - Backup method when JSON-LD is unavailable
✅ **Comprehensive Profile Data** - Name, headline, location, experience, education, skills
✅ **Anti-Bot Protection Handling** - Proper headers and error handling
✅ **Rate Limiting Respect** - Built-in delays and respectful scraping
✅ **Batch Processing** - Scrape multiple profiles with automatic delays
✅ **URL Validation** - Validate LinkedIn profile URLs before scraping
✅ **Error Handling** - Detailed error messages and status codes

## 🛠 Installation

The required packages are already installed:
```bash
npm install axios cheerio
```

## 📡 API Endpoints

### Base URL: `http://localhost:3000/api/linkedin-scraper`

### 1. Get Scraper Status
```http
GET /api/linkedin-scraper/status
```

**Response:**
```json
{
  "success": true,
  "data": {
    "status": "operational",
    "version": "1.0.0",
    "capabilities": [
      "JSON-LD structured data extraction",
      "HTML fallback parsing",
      "Profile information (name, headline, location)",
      "Work experience extraction",
      "Education history",
      "Skills identification",
      "About section parsing",
      "Profile picture extraction"
    ]
  }
}
```

### 2. Scrape Profile by URL
```http
POST /api/linkedin-scraper/profile
Content-Type: application/json

{
  "url": "https://linkedin.com/in/username"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Profile scraped successfully",
  "data": {
    "scrapedAt": "2024-01-15T10:30:00.000Z",
    "sourceUrl": "https://linkedin.com/in/username",
    "vanityName": "username",
    "profile": {
      "id": "username",
      "firstName": "John",
      "lastName": "Doe",
      "fullName": "John Doe",
      "headline": "Software Engineer at Tech Company",
      "profilePicture": "https://media.licdn.com/...",
      "location": "San Francisco, CA",
      "connections": "500+ connections",
      "positions": [
        {
          "title": "Software Engineer",
          "company": "Tech Company",
          "dates": "2022 - Present",
          "description": "N/A"
        }
      ],
      "education": [
        {
          "school": "University Name",
          "degree": "Computer Science",
          "dates": "2018 - 2022"
        }
      ],
      "skills": ["JavaScript", "Python", "React"],
      "about": "Passionate software engineer...",
      "contactInfo": {
        "email": "N/A",
        "phone": "N/A",
        "website": "N/A"
      }
    }
  }
}
```

### 3. Scrape Profile by Vanity Name
```http
GET /api/linkedin-scraper/profile/:vanityName
```

**Example:**
```http
GET /api/linkedin-scraper/profile/johndoe
```

### 4. Validate LinkedIn URL
```http
POST /api/linkedin-scraper/validate
Content-Type: application/json

{
  "url": "https://linkedin.com/in/username"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "url": "https://linkedin.com/in/username",
    "isValid": true,
    "vanityName": "username",
    "message": "Valid LinkedIn profile URL"
  }
}
```

### 5. Batch Scrape Profiles
```http
POST /api/linkedin-scraper/batch
Content-Type: application/json

{
  "urls": [
    "https://linkedin.com/in/user1",
    "https://linkedin.com/in/user2",
    "https://linkedin.com/in/user3"
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Batch scraping completed. 2 successful, 1 failed.",
  "data": {
    "totalRequested": 3,
    "successful": 2,
    "failed": 1,
    "results": [...],
    "errors": [...],
    "completedAt": "2024-01-15T10:35:00.000Z"
  }
}
```

## 🧪 Testing Examples

### PowerShell Testing Commands

1. **Check Status:**
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/linkedin-scraper/status" -Method GET
```

2. **Validate URL:**
```powershell
$body = @{
    url = "https://linkedin.com/in/test-user"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/linkedin-scraper/validate" -Method POST -Body $body -ContentType "application/json"
```

3. **Scrape Profile:**
```powershell
$body = @{
    url = "https://linkedin.com/in/username"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/linkedin-scraper/profile" -Method POST -Body $body -ContentType "application/json"
```

4. **Scrape by Vanity Name:**
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/linkedin-scraper/profile/username" -Method GET
```

### Thunder Client Examples

**Collection: LinkedIn Scraper**

1. **GET Status**
   - URL: `http://localhost:3000/api/linkedin-scraper/status`
   - Method: GET

2. **POST Validate URL**
   - URL: `http://localhost:3000/api/linkedin-scraper/validate`
   - Method: POST
   - Body (JSON):
   ```json
   {
     "url": "https://linkedin.com/in/test-user"
   }
   ```

3. **POST Scrape Profile**
   - URL: `http://localhost:3000/api/linkedin-scraper/profile`
   - Method: POST
   - Body (JSON):
   ```json
   {
     "url": "https://linkedin.com/in/username"
   }
   ```

4. **GET Scrape by Vanity Name**
   - URL: `http://localhost:3000/api/linkedin-scraper/profile/username`
   - Method: GET

## ⚠️ Important Considerations

### Legal and Ethical Guidelines

1. **Terms of Service**: Always respect LinkedIn's Terms of Service
2. **Rate Limiting**: Built-in delays prevent overwhelming LinkedIn's servers
3. **Public Data Only**: Only scrapes publicly available profile information
4. **Educational Purpose**: This scraper is for educational and research purposes

### Technical Limitations

1. **Anti-Bot Protection**: LinkedIn has sophisticated anti-scraping measures
2. **Rate Limits**: Excessive requests may result in IP blocking (429 errors)
3. **Profile Privacy**: Private profiles cannot be scraped
4. **Data Availability**: Not all profiles have complete structured data

### Error Handling

- **429 Rate Limited**: Wait before making another request
- **404 Not Found**: Profile doesn't exist or is private
- **403 Blocked**: IP may be temporarily blocked by LinkedIn
- **408 Timeout**: Request took too long, try again later

## 🔧 Configuration

### Environment Variables
No additional environment variables required for the scraper itself.

### Rate Limiting
- **Recommended**: 1 request per second
- **Batch Processing**: 2-second delays between requests
- **Maximum Batch Size**: 5 profiles per request

## 📊 Data Structure

The scraper extracts the following data structure:

```javascript
{
  id: "vanity-name",
  firstName: "John",
  lastName: "Doe", 
  fullName: "John Doe",
  headline: "Job Title at Company",
  profilePicture: "https://...",
  location: "City, State",
  connections: "500+ connections",
  positions: [
    {
      title: "Job Title",
      company: "Company Name",
      dates: "2022 - Present",
      description: "Job description"
    }
  ],
  education: [
    {
      school: "University Name",
      degree: "Degree Name",
      dates: "2018 - 2022"
    }
  ],
  skills: ["Skill1", "Skill2", "Skill3"],
  about: "About section content",
  contactInfo: {
    email: "N/A",
    phone: "N/A", 
    website: "N/A"
  }
}
```

## 🚦 Status Codes

- **200**: Success
- **400**: Bad Request (invalid URL or parameters)
- **404**: Profile not found or private
- **408**: Request timeout
- **429**: Rate limited by LinkedIn
- **500**: Internal server error

## 🔄 Scraping Process

1. **URL Validation**: Validates LinkedIn profile URL format
2. **HTTP Request**: Sends request with browser-like headers
3. **JSON-LD Parsing**: Extracts structured data from JSON-LD scripts
4. **HTML Fallback**: Falls back to HTML parsing for missing data
5. **Data Cleaning**: Cleans and validates extracted data
6. **Response**: Returns structured profile data

## 📝 Usage Tips

1. **Test with Public Profiles**: Use well-known public LinkedIn profiles for testing
2. **Respect Rate Limits**: Don't make rapid successive requests
3. **Handle Errors Gracefully**: Always check response status and handle errors
4. **Use Batch Wisely**: Limit batch requests to avoid detection
5. **Monitor Logs**: Check server logs for scraping status and errors

## 🎯 Next Steps

The LinkedIn scraper is now fully operational and ready for use. You can:

1. Test with various public LinkedIn profiles
2. Integrate with your frontend application
3. Add additional data extraction fields as needed
4. Implement caching to reduce duplicate requests
5. Add proxy support for large-scale scraping (if legally compliant)

Remember to always respect LinkedIn's Terms of Service and use this scraper responsibly!
