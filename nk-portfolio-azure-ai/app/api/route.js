import { DefaultAzureCredential, getBearerTokenProvider } from "@azure/identity";
import { NextResponse } from "next/server";
import OpenAI from "openai";

//  Setup Azure Entra ID token provider
const tokenProvider = getBearerTokenProvider(
  new DefaultAzureCredential(),
  "https://cognitiveservices.azure.com/.default"
);

//  Configure OpenAI client for Azure
const client = new OpenAI({
  apiKey: process.env.AZURE_OPENAI_API_KEY, //  required
  baseURL: `${process.env.AZURE_OPENAI_ENDPOINT}openai/deployments/${process.env.AZURE_OPENAI_MODEL}`,
  defaultQuery: { "api-version": process.env.AZURE_OPENAI_API_VERSION }, //  correct
  defaultHeaders: { "api-key": process.env.AZURE_OPENAI_API_KEY },       //  needed for Azure
});

/*
// Health check
export async function GET(req) {
  try {
  //  const { message } = await req.json();

    const result = await client.chat.completions.create({
      model: process.env.AZURE_OPENAI_MODEL, //  must match deployment name
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "Do you know js?" },
      ],
      max_tokens: 128,
    });

    return NextResponse.json({
      reply: result.choices[0].message.content,
    });
  } catch (err) {
    console.error("Azure Chat error:", err);
    return NextResponse.json({ error: "Azure Chat request failed" }, { status: 500 });
  }
 // return NextResponse.json({ status: " Azure Chat API ready. Use POST." });
}
*/

// Chat request
export async function POST(req) {
  try {
    // Parse JSON safely
    const body = await req.json();
    const userMessage = body?.message;

    if (!userMessage || typeof userMessage !== "string") {
      return NextResponse.json(
        { error: "Invalid request: message must be a string" },
        { status: 400 }
      );
    }

    const result = await client.chat.completions.create({
      model: process.env.AZURE_OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content: `You are PortfolioGPT, answering only questions about Narendra based on his resume:\n\n${DATA_RESUME}`,
        },
        { role: "user", content: userMessage }, //  string
      ],
      max_tokens: 256,
    });

    return NextResponse.json({
      message: result.choices[0].message.content,
    });
  } catch (err) {
    console.error("Azure Chat error:", err);
    return NextResponse.json(
      { error: "Azure Chat request failed" },
      { status: 500 }
    );
  }
}

const DATA_RESUME = `NARENDRA KORADA
Chicago, IL | +1 (312) 880-8673 | narendrakorada472@gmail.com | /Narendra Korada
SUMMARY
Master’s student in Information Technology and Management with a focus on software engineering and systems 
design. I am skilled in Python, Java, JavaScript, and SQL, with practical experience in API development, backend 
integration, system automation, and workflow optimization. Actively seeking internship opportunities in 2025 and 
beyond where I can contribute to technology-driven innovation by building scalable, efficient, and impactful 
software solutions.
EDUCATION
Illinois Institute of Technology, Chicago, IL MAY 2026
Master of Information Technology and Management CGPA: 3.77
Raghu Institute of Technology, Visakhapatnam, AP JUN 2022
Bachelor of Technology CGPA: 8.56
TECHNICAL SKILLS 
Languages: Python, Java, JavaScript, SQL, HTML/CSS
Frameworks/Tools: PEGA PRPC, REST API, Git, Visual Studio, React (basic)
Databases: MySQL, Oracle
Platforms: Windows, Linux, macOS
Concepts: API Integration, Database Management, System Automation, App Development, Agile 
Development
WORK EXPERIENCE
SOFTWARE ENGINEER
HCL Technologies, Chennai, TN, India AUG 2022 – JAN 2024
Key Skill: PEGA
Developed internal billing automation tools using PEGA PRPC and REST APIs, reducing 
processing time by 25%.
Built scalable backend solutions and dynamic UI components to enhance case management 
efficiency.
Collaborated with cross-functional teams to deploy business-critical software in Agile sprints.
Troubleshot technical issues using diagnostic tools and contributed to CI/CD processes.
INTERN - PeopleSoft Technical Training
Cognizant, Hyderabad, TG, India JAN 2022 - JUL 2022
Enhanced the HR management system “PRO_DNA” by building backend forms and data pipelines.
Optimized SQL queries and improved database retrieval performance by 15%.
Participated in Agile ceremonies and collaborated with cross-functional engineering teams.
PROJECT EXPERIENCE
HOTEL BOOKING APPLICATION | PEGA PRPC
Created a digital hotel booking system with automated workflows for bookings and payments.
Integrated customer data management and process monitoring components.
OBJECT RECOGNITION SYSTEM USING CONVOLUTIONAL NEURAL NETWORK | Python, CNN
Developed a real-time image detection system using Convolutional Neural Networks.
Improved system memory allocation and model performance over traditional pipelines.
CERTIFICATIONS
Certified System architect in PEGA (v8.4) - UAP by Talent Sprint. 
Certified Senior System architect in PEGA (v8.6) - UAP by Talent Sprint`