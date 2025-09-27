"use client";
import { useState } from "react";



export default function Home() {

    const [menuOpen, setMenuOpen] = useState(false);

    const [messageInput, setMessageInput] = useState('');

    const [messages, setMessages] = useState([
        {
            role: "assistant",
            content: "How can I help you learn more about Narendra and his Resume?" 
        }
        
    ]);

    const submitForm = async (e) => {
        e.preventDefault();
        let newMessages = [...messages, {role: "user", content: messageInput }]
        setMessages(newMessages);
        setMessageInput('');
        const apiMessage = await fetch(
            "/api",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({message: messageInput})
            }
        ).then(res => res.json());
        setMessages([...newMessages, {role: "system", content: apiMessage.message }]);
    }

    const toggleMobileMenu = () => {
        setMenuOpen(!menuOpen);

}

  return (
    <>
      <header>
            <a href="#" className="logo-holder">
            <div className="logo"> NK </div>
                <div className="logo-text">Narendra Korada</div>
            </a>
            <nav>
                <ul id="menu" className={menuOpen ? "active" : ""}>
                    <li>
                        <a href="#Home">Home</a>
                    </li>
                    <li>
                        <a href="#skills">Skills</a>
                    </li>
                    <li>
                        <a href="#projects">Projects</a>
                    </li>
                    <li>
                        <a href="mailto:narendrakorada472@gmail.com" className="button">Contact Me</a>
                    </li>
                </ul>

                <a href="#" className="mobile-toggle" title="Toggle navigation menu" onClick= {toggleMobileMenu} >
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h10"/>
                    </svg>
                </a>

            </nav>
        </header>

        <main>
            <section className="hero container">
                <div className="hero-blue">
                    <div>
                        <h1><small>Hi I'm</small>
                            Narendra Korada
                        </h1>
                        <p>ITM master’s student at IIT Chicago. Skills: HTML/CSS/JS for UI, Python/Java/SQL/APIs for backend. 
                            I enjoy solving problems, automating workflows, and delivering reliable features.
                            <span>Passionate about AI and currently working on projects that explore its real-world impact.</span>
                        </p>
                        <div className="call-to-action">
                            <a href="./Narendra_Korada_Intern.pdf" className="button black">
                                View Resume
                            </a>
                            <a href="mailto:narendrakorada472@gmail.com" className="button white">
                                Contact Me
                            </a>
                        </div>
                        <div className="social-links">
                            <a href="#">
                                <img src="./images/github.png" alt="GitHub" width="48"/>
                            </a>
                            <a href="#">
                                <img src="./images/linkedin.png" alt="LinkedIn" width="48"/>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="hero-yellow">
                    <img src="./images/image-NK.png" alt="Narendra Korada" width="100%"/>
                </div>
            </section>
            <section className="logos container">
                <div className="marquee">
                    <div className="track">
                        <img src="./images/html.png" alt="HTML" width="128"/>
                        <img src="./images/css.png" alt="CSS" width="128"/>
                        <img src="./images/javascript.png" alt="JavaScript" width="128"/>
                        <img src="./images/Java.png" alt="JAVA" width="128"/>
                        <img src="./images/python.png" alt="Python" width="128"/>
                        <img src="./images/react.png" alt="React" width="128"/>
                        <img src="./images/nextjs.png" alt="NextJS" width="128"/>
                        <img src="./images/azure.png" alt="Azure" width="128"/>
                        <img src="./images/vscode.png" alt="Vscode" width="128"/>
                        <img src="./images/html.png" alt="HTML" width="128"/>
                        <img src="./images/css.png" alt="CSS" width="128"/>
                        <img src="./images/javascript.png" alt="JavaScript" width="128"/>
                        <img src="./images/Java.png" alt="JAVA" width="128"/>
                        <img src="./images/python.png" alt="Python" width="128"/>
                        <img src="./images/react.png" alt="React" width="128"/>
                        <img src="./images/nextjs.png" alt="NextJS" width="128"/>
                        <img src="./images/azure.png" alt="Azure" width="128"/>
                        <img src="./images/vscode.png" alt="Vscode" width="128"/>

                    </div>
                </div>
            </section>
            <section id="skills" className="skills container">
                <h2>
                    <small>About Me</small>
                    Skills & Technologies
                </h2>
                <div className="holder-blue">
                    <div className="left-column">
                        <h3>Frontend</h3>
                        <ul>
                            <li>HTML</li>
                            <li>CSS</li>
                            <li>JavaScript</li>
                            <li>React</li>
                            {/* <li>Need to add more skills later</li> */}
                        </ul>
                        <h3>Backend</h3>
                        <ul>
                            <li>Java</li>
                            <li>Python</li>
                            <li>API</li>
                        </ul>
                    </div>
                    <div className="right-column">
                        <h3>A bit about me</h3>
                        <p>
                            I’m a Master’s student in ITM at IIT Chicago, skilled in Python, Java, JavaScript, SQL, and HTML/CSS. I have experience in API development, 
                            backend integration, and system automation, and I’m passionate about building scalable, efficient software with growing interest in AI.
                        </p>
                            <p>
                                Outside of coding, I enjoy hiking, photography, and exploring new technologies. I’m excited to connect with like-minded professionals and contribute to innovative projects.

                            </p>
                    </div>
                </div>
            </section>
            <section className="work-experience container">
                <h2>
                    <small>Recent</small>
                    Work Experience
                </h2>
                <div className="jobs">
                    <article>
                        <figure>
                            <div>
                                <img src="./images/workplace-2.jpg" alt="Workplace 1 - HCL Technologies" width="100%" />
                                <figcaption>Workplace 1 - HCL Technologies</figcaption>
                            </div>
                        </figure>
                        <h3>HCL Technologies</h3>
                        <div>Aug 2022 - Jan 2024</div>
                        <p>description for a workplace</p>
                    </article>
                    <article>
                        <figure>
                            <div>
                                <img src="./images/workplace-2.jpg" alt="Workplace 2 - Cognizant" width="100%" />
                                <figcaption>Workplace 2 - Cognizant</figcaption>
                            </div>
                        </figure>
                        <h3>HCL Technologies</h3>
                        <div>Aug 2022 - Jan 2024</div>
                        <p>description for a workplace</p>
                    </article>
                </div>
            </section>

            <section id="projects" className="bento container">
                <h2>
                    <small>
                        Previous
                    </small>
                    Completed Projects
                </h2>
                <div className="bento-grid">

                    <a href="#" className="bento-item">
                        <img src="./images/bento-1.jpg" alt="Edit with your new projects 1" width="100%"/>
                    </a>

                    <a href="#" className="bento-item">
                        <img src="./images/bento-2.jpg" alt="project 2" width="100%"/>
                    </a>

                    <a href="#" className="bento-item">
                        <img src="./images/bento-3.jpg" alt="project 3" width="100%"/>
                    </a>

                    <a href="Narendrakorada-portfolio/images/pomodoro-app.png" className="bento-item" title="Pomodoro-App">
                        <img src="./images/pomodoro-app.png" alt="project 4" width="100%"/>
                    </a>

                    <a href="#" className="bento-item">
                        <img src="./images/bento-5.jpg" alt="project 5" width="100%"/>
                    </a>

                    <a href="#" className="bento-item">
                        <img src="./images/bento-6.jpg" alt="project 6" width="100%"/>
                    </a>

                </div>
            </section>

            <section className="chatbot container">
                <h2>
                    <small>
                        Talk to me
                    </small>
                    Chatbot
                </h2>

            <div className="chatbot-blue">
                <div className="chat-info">
                    <h3>Azure AI Chatbot</h3>
                    <p>Here, I have created a chatbot that is aware of all my abilities, employment history, and a copy of my resume.
                        To learn more about me and my background, you can utilize it to ask me questions. </p>
                    <p>You can also download my resume here if you want to take a look at it. I'm currently looking for new 
                        opportunities so if you have a project you think I'd be a good fit for, please get in touch! </p>
                    <a href="./Narendra_Korada_Intern.pdf" className="button black">Download Resume</a>
                </div>
                <div className="chat-box">
                    <div className="scroll-area">
                        <ul id="chat-log">
                            {
                                messages.map((message, index) => (
                                <li key={index} className={`${message.role}`}>
                                    <span className={`avatar`}>{message.role === 
                                    "user" ? "You" : "AI"}</span>
                                    <div className="message">{message.content}</div>
                                </li>
                                ))}
                        </ul>
                    </div>
                    <form onSubmit={submitForm} className="chat-message">
                        <input type="text"
                        placeholder="Hey Narendra, what skills are you best at?" value={messageInput} onChange={e => setMessageInput(e.target.value)}/>
                        <button className="button black">Send</button>
                    </form>
                </div>
            </div>
            </section>
        </main>
        <footer className="footer">
            <p>© 2025 Narendra Korada. All rights reserved.</p>
        </footer>

    </>
  );
}
