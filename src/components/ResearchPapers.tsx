const ResearchPapers = () => {
    const papers = [
        {
            title: '📄 AI-Based Healthcare Monitoring System',
            college: 'BUET',
            link: 'https://www.buet.ac.bd/web/#/research/health-ai',
        },
        {
            title: '📄 Nanotech & Quantum Dots for Solar Cells',
            college: 'Dhaka University',
            link: 'https://du.ac.bd/research/quantum-solar',
        },
        {
            title: '📄 Smart Grid Design for Renewable Integration',
            college: 'RUET',
            link: 'https://www.ruet.ac.bd/publications/smart-grid-2025',
        },
        {
            title: '📄 Machine Learning in River Erosion Forecasting',
            college: 'CUET',
            link: 'https://www.cuet.ac.bd/research/ml-erosion',
        },
    ];

    return (
        <section>
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
                🔬 Student Research Highlights
            </h2>

            <ul className="space-y-4">
                {papers.map((paper, index) => (
                    <li key={index} className="bg-white p-5 shadow-md rounded-lg hover:shadow-lg transition duration-300">
                        <a
                            href={paper.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-700 hover:underline text-lg font-medium flex items-center gap-2"
                        >
                            <span>{paper.title}</span>
                            <span className="text-sm text-gray-500">({paper.college})</span>
                            <svg
                                className="w-4 h-4 text-blue-400 ml-1"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14 3h7v7m0 0L10 21l-4-4L21 10z" />
                            </svg>
                        </a>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default ResearchPapers;