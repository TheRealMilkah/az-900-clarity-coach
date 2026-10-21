# AZ-900 Clarity Coach

### Understand the question. Spot the clue. Learn with confidence.

A beginner-friendly learning tool designed to help students understand Microsoft Azure Fundamentals (AZ-900) practice questions by breaking down confusing wording, highlighting important clues, and explaining the reasoning behind answers.

**Live Demo:** https://az-900-clarity-coach-0ro2.bolt.host

**GitHub Repository:** https://github.com/TheRealMilkah/az-900-clarity-coach

---

## 1. Project Overview

AZ-900 Clarity Coach is an interactive educational web application designed to help beginners approach Azure Fundamentals practice questions with greater understanding and confidence.

Preparing for a cloud certification involves more than memorizing definitions. Learners must interpret scenarios, recognize important wording, distinguish between similar Azure services, and identify the option that best addresses the requirement described in a question.

For someone new to cloud computing, even a short question can feel confusing when several answer choices appear reasonable.

AZ-900 Clarity Coach addresses this challenge by helping learners understand the question before choosing an answer. It focuses on the wording, the concept being tested, and the reasoning needed to identify the most appropriate answer.

The goal is to help students develop a structured approach to technical questions instead of relying entirely on memorization.

## 2. The Problem

Learning cloud computing introduces students to unfamiliar terminology, new services, and technical concepts. Understanding definitions is an important first step, but applying that knowledge to exam-style questions can be more challenging.

Beginners may experience difficulties such as:

- **Confusing question wording:** A question may contain several technical details, making it difficult to identify what is actually being asked.
- **Similar answer choices:** Multiple Azure services may sound appropriate until the learner identifies the specific requirement.
- **Missing important clues:** Words describing availability, cost, security, location, or management can influence which answer is correct.
- **Memorizing without understanding:** Knowing a service definition does not always explain when or why that service should be used.
- **Uncertainty about incorrect answers:** Selecting the correct option is less useful when the learner does not understand why the alternatives are unsuitable.

These challenges can make certification preparation frustrating, especially for students who are encountering cloud computing for the first time.

Sometimes, the difficulty is not simply a lack of technical knowledge. Learners also need help interpreting the question and connecting its wording to the concept being tested.

## 3. The Solution

AZ-900 Clarity Coach takes a question-first approach to learning.

The application is designed to help learners examine practice questions in smaller, more understandable parts. It draws attention to important wording, clarifies the requirement described in the question, and connects the wording to the relevant Azure concept.

Instead of treating a question as a test of memory alone, the learning approach encourages students to ask:

1. What is the question actually asking?
2. Which words or requirements matter most?
3. What Azure concept is being tested?
4. Which answer best satisfies the stated requirement?
5. Why are the other options less suitable?

This approach encourages learners to think through questions systematically and understand the reasoning behind their answers.

The central idea is simple: understanding how to interpret a question can be just as important as knowing the technical terminology it contains.

## 4. How It Works

The application organizes practice around understanding the question before selecting an answer.

### Step 1: Read the Question

The learner reads an AZ-900-style scenario and reviews the available answer choices.

### Step 2: Spot the Signal

The learner focuses on important words and phrases that point toward the requirement being tested.

### Step 3: Understand the Requirement

The learner identifies what the scenario requires rather than becoming distracted by technical terms that may not determine the answer.

### Step 4: Connect the Clue to the Concept

The learner considers which Azure service, feature, or capability best matches the requirement described in the question.

### Step 5: Review the Answer

The learner reviews the answer and the explanation provided by the application to understand the reasoning behind the choice.

### Step 6: Continue Practising

Topic filters and session progress indicators help learners work through questions and follow their progress during practice.

The objective is not simply to complete a set of questions. It is to become more comfortable interpreting technical questions independently.

## 5. Key Features

### Question Breakdown

Encourages learners to identify what a question requires and distinguish relevant details from distracting information.

### Spot the Signal

Focuses attention on important wording that can help learners recognize the concept being tested.

### Answer Explanations

Helps learners understand the reasoning behind answers instead of relying exclusively on memorization.

### Topic-Based Practice

Provides topic filters that allow learners to explore questions within specific subject areas.

### Session Progress Tracking

Displays practice progress so learners can see how far they have progressed through a question session.

### Beginner-Friendly Learning Approach

Organizes the learning experience around interpreting technical questions, making Azure Fundamentals practice more approachable for students who are still developing their cloud computing knowledge.

Feature descriptions reflect the current prototype and should be interpreted according to the functionality available in the deployed application.

## 6. The Learning Experience: An Example

Consider this practice question:

**An application must keep running even if an entire data center fails. Which Azure feature is designed to protect against a single data center outage?**

A beginner might focus on the different Azure services listed in the answer choices and try to remember which definition sounds familiar.

Clarity Coach encourages a more structured approach.

**First, identify the requirement.**

The application must continue operating when a data center becomes unavailable.

**Next, spot the signal.**

The phrases "keep running" and "an entire data center fails" point toward availability and protection against a data center-level failure.

**Then, connect the wording to the concept.**

The learner considers which Azure availability capability is designed to address that specific failure scenario.

**Finally, evaluate the answer choices.**

The best answer is the option that satisfies the stated requirement, not simply the one with the most familiar technical name.

This example demonstrates the learning principle behind AZ-900 Clarity Coach: helping students understand how the wording of a question connects to the technical concept being tested.

The example is illustrative. Learners should review the actual answer choices and explanations provided by the application.

## 7. Question Bank and Topic Coverage

The current prototype contains a question bank intended for Azure Fundamentals practice and learning.

The application includes questions and topic filters covering areas such as:

- Cloud Concepts
- Azure Architecture
- Management and Governance
- Compute
- Networking
- Storage
- Security
- Databases
- Analytics
- Availability
- Pricing
- Monitoring
- Infrastructure as Code
- Support
- Compliance

These areas describe the subjects addressed by the current prototype. They do not establish that every official AZ-900 exam objective is fully covered.

The question bank can be expanded, reviewed, and updated as the project develops. Learners should verify technical concepts against the latest official Microsoft Learn documentation.

## 8. Technology Stack and Development Tools

AZ-900 Clarity Coach was developed as a web-based application using a modern frontend development workflow.

### Programming Languages and Technologies

| Technology | Purpose |
| --- | --- |
| TypeScript | Adds static typing to JavaScript and supports more structured application development. |
| JavaScript | Supports browser-side application logic and interactions through the TypeScript toolchain. |
| HTML | Provides the structural foundation of the web interface. |
| CSS | Supports the visual presentation, styling, and layout of the application. |
| React | Provides a component-based approach to building interactive user interfaces, if included in the current project dependencies. |
| Vite | Supports the frontend development server and application build process. |
| Tailwind CSS | Supports utility-based styling and interface design. |

The exact frameworks and dependencies should be confirmed against the current project configuration before being treated as a definitive inventory.

### Development Tools

**Bolt.new**

Used as the AI-assisted development environment to build and refine the application.

**GitHub**

Used for source code hosting, version control, project organization, and sharing the code with reviewers and other developers.

**npm**

Used to install project dependencies and run the development commands defined in the project configuration.

**Web Browser**

Used to access and test the deployed web application.

This project demonstrates an approach to building an educational application through AI-assisted development and a modern web technology stack.

## 9. Running the Project Locally

Developers can explore the source code and run the application on their own computers.

### Prerequisites

- Node.js
- npm, included with Node.js
- Git, if cloning the repository through the command line

### Installation Instructions

**Step 1: Clone the repository**

    git clone https://github.com/TheRealMilkah/az-900-clarity-coach.git

**Step 2: Navigate to the project directory**

    cd az-900-clarity-coach

**Step 3: Install the dependencies**

    npm install

**Step 4: Start the development server**

    npm run dev

**Step 5: Open the application**

Follow the local URL displayed in the terminal. With the default Vite configuration, this is commonly:

    http://localhost:5173

The commands available depend on the scripts configured in the project's package.json file.

## 10. Project Status and Future Development

### Current Status

AZ-900 Clarity Coach is an early-stage educational application with a working web prototype.

The current learning experience includes a question-practice interface, topic filters, and session progress indicators. The project focuses on making exam-style questions easier to interpret and helping learners understand the reasoning behind their answers.

### Potential Future Improvements

Future development could include:

- Expanding and reviewing the question bank against the latest official AZ-900 exam objectives.
- Improving explanations for correct and incorrect answer choices.
- Adding more guided examples of confusing question wording.
- Introducing topic-level performance summaries.
- Providing revision recommendations based on areas where learners need more practice.
- Improving accessibility, mobile usability, and the overall learning experience.
- Connecting learners to relevant official Microsoft Learn resources.
- Adding more structured learning activities to support independent study.

These are potential improvements, not claims that the features have already been implemented.

## 11. Educational Disclaimer

AZ-900 Clarity Coach is an independent educational project intended to support learning and practice.

It is not an official Microsoft product and is not affiliated with, endorsed by, or sponsored by Microsoft.

The application does not guarantee certification success. Learners should use it alongside official Microsoft Learn materials and the latest published AZ-900 exam objectives.

Azure services, features, and certification requirements may change. Technical information should be checked against current official documentation.

Microsoft and Azure are trademarks of the Microsoft group of companies.

## 12. Acknowledgements

This project was developed with the goal of making cloud certification preparation more understandable for beginners.

It is built around the learning principle that students benefit from understanding why an answer is appropriate, not simply memorizing the answer itself.

Official Microsoft Learn resources provide an important reference for studying Azure concepts and verifying technical accuracy.

## 13. Author

**Milkah Michira**

Creator of AZ-900 Clarity Coach

This project explores the use of AI-assisted development to create a practical learning tool for students preparing for cloud fundamentals certification.

### Project Links

- **Live Demo:** https://az-900-clarity-coach-0ro2.bolt.host
- **GitHub Repository:** https://github.com/TheRealMilkah/az-900-clarity-coach
- **Official AZ-900 Study Resources:** https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/

---

**AZ-900 Clarity Coach**

*Understand the question. Spot the clue. Learn with confidence.*
