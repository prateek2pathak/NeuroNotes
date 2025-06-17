import React from "react";
import Navbar from "../components/Navbar";

export default function AboutUs() {
  return (
  <>
    <Navbar/>
    <div className="min-h-screen pt-20 px-6 pb-10 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">

      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">About This Project</h1>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">📚 The Platform</h2>
          <p>
            This web app is a modern flashcard-based learning platform powered by AI. Users can create decks,
            generate cards using AI prompts, and study with intuitive flipping card UI — all designed to help
            improve learning efficiency and retention.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">👨‍💻 About the Creator</h2>
          <p>
            Hi! I'm <span className="font-semibold text-indigo-600">Prateek Pathak</span>, the developer behind this project.
            I'm a under grad at IIIT Allahabad who loves building full-stack web applications and exploring the
            intersection of AI and education.
          </p>
          <p className="mt-2">
            This app was built using the MERN stack (MongoDB, Express, React, Node.js), Firebase Authentication,
            and AI card generation using Gemini API. It’s my way of merging tech with meaningful productivity tools.
          </p>
          <p className="mt-4">
            Feel free to connect with me:
          </p>
          <ul className="list-disc list-inside mt-2 text-indigo-500">
            <li>
              <a href="https://github.com/prateek2pathak" target="_blank" rel="noopener noreferrer">
                GitHub: @prateek2pathak
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/prateek2pathak" target="_blank" rel="noopener noreferrer">
                LinkedIn: Prateek Pathak
              </a>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">💡 Future Plans</h2>
          <p>
            Upcoming features include spaced repetition, study analytics, dark mode preferences, and AI-powered summaries. Stay tuned!
          </p>
        </section>
      </div>
    </div>
  </>
  );
}
