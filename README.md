# Tupper

Tupper is a feature-rich, advanced contact management web application. Designed to run locally.

## Key Features

- **📝 Standard Contact Management:**
  - Create, edit and delete contacts
  - Import/export data from other apps
  - Organize contacts into groups


- **🌍 Interactive map of contact locations**


- **📱 Social Media integration for each contact**


- **🤝 Comprehensive relationship system**
  - Declare relationships between contacts (supports backlinks)
  - Generate an interactive relational graph
  - Quick genealogical panel based on parent-child relations


- **💼 Enhanced group management with Organizations**
  - Define organizations (e.g., companies, schools)
  - Group contacts by shared organizations 
  - Create infinite sub-organizations for detailed grouping

## Tech Stack

- [React](https://github.com/facebook/react) + [Vite](https://github.com/vitejs/vite) for fast builds and development
- [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss) for a modern, responsive UI
- [Express.js](https://github.com/expressjs/express) for internal API and requests handling
- [Charts.js](https://github.com/chartjs/Chart.js) with the [chart-graph](https://github.com/sgratzl/chartjs-chart-graph) plugin for relationship and genealogy graphs
- [MapTiler](https://github.com/maptiler) for dynamic and interactive contact location maps
- [React JSON Schema Form](https://github.com/rjsf-team/react-jsonschema-form) for dynamic form generation

## Installation

1. **Clone the repository**
```bash
git clone https://github.com/paradoxe-tech/Tupper
cd Tupper
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the server**
```bash
npm run start
```

## Usage

- Launch the application locally by visiting [`http://localhost:8080`](http://localhost:8080).
- Use the intuitive UI to manage, explore, and analyze your contacts.

## Contribution

Contributions are welcome !

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a pull request

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.