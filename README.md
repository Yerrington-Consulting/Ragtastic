<a name="readme-top"></a>

<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![Apache 2.0 License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Yerrington-Consulting/Ragtastic">
    <img src="https://github.com/Yerrington-Consulting/Ragtastic/assets/2257834/60d92550-d03c-451d-92de-0d8ecc006a09" alt="Ragtastic Logo" width="200">

  </a>

  <h3 align="center">Ragtastic</h3>

  <p align="center">
    Easily prototype and scale Retrieval-augmented generation apps with Ragtastic.
    <br />
    <a href="https://github.com/Yerrington-Consulting/Ragtastic"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/Yerrington-Consulting/Ragtastic">View Demo</a>
    ·
    <a href="https://github.com/Yerrington-Consulting/Ragtastic/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/Yerrington-Consulting/Ragtastic/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
    ·
    <a href="https://discord.gg/vXvtPa4qMh"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/discord.svg" width="20" height="20" style="vertical-align: middle;" /> Join our Discord</a>
  </p>
</div>
<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

![Ragtastic Screen Shot](https://github.com/Yerrington-Consulting/Ragtastic/assets/2257834/88e18383-6298-4bce-b1e5-4b66eeb9798d)

Ragtastic is designed to simplify the development of Retrieval-augmented generation (RAG) applications, making it easy to integrate large language models and vector databases through an intuitive UI. Whether you're a developer looking to prototype AI interactions or a data professional aiming to build generative search apps, Ragtastic provides the essential tools to enhance your AI-driven solutions efficiently.

### Built With

This section lists any major frameworks/libraries used to bootstrap your project:
* [FastAPI](https://fastapi.tiangolo.com/)
* [React](https://reactjs.org/)
* [Vite](https://vitejs.dev/)
* [Material-UI](https://mui.com/)
* [ElectronJS](https://www.electronjs.org/)

<!-- GETTING STARTED -->
## Getting Started

There are several ways to get started working with Ragtastic.  You can use one of our release builds listed here.  To get a local copy up and running follow these simple steps.

## Prerequisites

Installation
Clone the repo
   ```bash
   git clone https://github.com/Yerrington-Consulting/Ragtastic.git
   ```
### Client

Install Packages

From the `Ragtastic/client` directory, install the client packages.
```bash
yarn install
```

#### Yarn Scripts

| Command            | Description | 
| ------------------ | ----------- |
| `yarn dev`         | 🚀 Starts the development server using Vite. |
| `yarn build:web`   | 🌐 Builds the web version of the application with specific Vite config. |
| `yarn build:electron` | 🖥️ Builds the Electron version of the application with specific Vite config. |
| `yarn lint`        | 🔍 Runs ESLint to check for code issues in `.js` and `.jsx` files. |
| `yarn preview`     | 📦 Serves the built app for testing with Vite preview. |


### Server

**Setting Up the Python Environment**

For this project, we recommend using a virtual environment to isolate the package dependencies. Follow these steps to set up your environment and run the application.

Prerequisites
> Python: Ensure you have Python installed on your machine. You can download it from [python.org](http://python.org) or use a package manager on your operating system.

> Soon, we will add the `requirements.txt`

From the `Ragtastic/server` directory, create a separate environment (highly recommended).

**Create a Virtual Environment**
Navigate to the project directory where the requirements.txt is located and create a virtual environment using:

#### For Windows
```bash
python -m venv venv
```
#### For macOS and Linux
```bash
python3 -m venv venv
````

**Activate the Virtual Environment**
Before you install dependencies or run the application, activate the virtual environment:

#### For Windows
```bash
.\venv\Scripts\activate
```
#### For macOS and Linux
```bash
source venv/bin/activate
```

**Install Dependencies**

With the virtual environment activated, install the project dependencies:
```bash
pip install -r requirements.txt
```

**Running the Application**

With the virtual environment set up and dependencies installed, you are ready to run the application.

**Start the FastAPI server**
To run the FastAPI application, use the following command:

```bash
uvicorn app.main:app --reload
```

**Deactivating the Virtual Environment**
When you're done working with the application, you can deactivate the virtual environment by running:

```bash
deactivate
```
This command will return you to your system’s default Python interpreter.


<!-- USAGE EXAMPLES -->
### Usage

Use Ragtastic to manage chat sessions, configure prompts dynamically, and integrate with vector databases for enhanced user queries. For more examples, refer to the Documentation.

<!-- ROADMAP -->
## Roadmap

- [ ] Initial Release with basic chat session management
- [ ] Integration with OpenAI API models (GPT-3.x, GPT-4.x)
- [ ] Support for Vector Database (ChromaDB)
- [ ] Cross-platform builds for Mac, Windows, and Linux

See the [open issues](/issues) for a full list of proposed features (and known issues) or come to our [Discord #feature-requests](https://discord.gg/vXvtPa4qMh) channel.

<!-- CONTRIBUTING -->
### Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

### Fork the Project
1. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
1. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
1. Push to the Branch (`git push origin feature/AmazingFeature`)
1. Open a Pull Request

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/Yerrington-Consulting/Ragtastic.svg?style=for-the-badge
[contributors-url]: https://github.com/Yerrington-Consulting/Ragtastic/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Yerrington-Consulting/Ragtastic.svg?style=for-the-badge
[forks-url]: https://github.com/Yerrington-Consulting/Ragtastic/network/members
[stars-shield]: https://img.shields.io/github/stars/Yerrington-Consulting/Ragtastic.svg?style=for-the-badge
[stars-url]: https://github.com/Yerrington-Consulting/Ragtastic/stargazers
[issues-shield]: https://img.shields.io/github/issues/Yerrington-Consulting/Ragtastic.svg?style=for-the-badge
[issues-url]: https://github.com/Yerrington-Consulting/Ragtastic/issues
[license-shield]: https://img.shields.io/github/license/Yerrington-Consulting/Ragtastic.svg?style=for-the-badge
[license-url]: https://github.com/Yerrington-Consulting/Ragtastic/blob/master/LICENSE.txt
