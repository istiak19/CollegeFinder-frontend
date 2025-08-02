import { useState } from 'react';

const FAQ = () => {
    const faqs = [
        {
            question: 'How can I apply to a college through this website?',
            answer:
                'You can go to the "Admission" section, select your desired college, and fill out the admission form with your details.',
        },
        {
            question: 'Are these colleges approved by the University Grants Commission (UGC) of Bangladesh?',
            answer:
                'Yes, all colleges listed on our platform are registered and approved by the UGC.',
        },
        {
            question: 'Is there any admission test required?',
            answer:
                'Admission test requirements vary by college. Check the individual college details for updated information.',
        },
        {
            question: 'Can I apply to multiple colleges at once?',
            answer:
                'Yes, you can apply to multiple colleges using the admission section. However, admission policies depend on each institution.',
        },
        {
            question: 'How do I know if my application was submitted successfully?',
            answer:
                'After submitting, visit the "My College" section to view your submitted applications and their statuses.',
        },
        {
            question: 'Can I update my profile or application later?',
            answer:
                'Yes, you can edit your profile from the Profile section. Application edits depend on the individual college policy.',
        },
        {
            question: 'Are there scholarships or financial aid options?',
            answer:
                'Some colleges offer scholarships. Please check the "Details" of each college or contact their admission office.',
        },
    ];

    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleIndex = (index: number) => {
        setOpenIndex((prev) => (prev === index ? null : index));
    };

    return (
        <section className="bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
                    📚 Frequently Asked Questions (FAQs)
                </h2>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow border border-gray-200"
                        >
                            <button
                                onClick={() => toggleIndex(index)}
                                aria-expanded={openIndex === index}
                                className="w-full cursor-pointer text-left px-5 py-4 font-semibold text-base sm:text-lg flex justify-between items-center transition-colors duration-200"
                            >
                                {faq.question}
                                <span className="text-xl text-gray-400 ml-4">
                                    {openIndex === index ? '−' : '+'}
                                </span>
                            </button>
                            {openIndex === index && (
                                <div className="px-5 pb-4 text-gray-700 transition-all duration-300 ease-in-out">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;