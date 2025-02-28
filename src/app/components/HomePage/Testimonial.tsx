'use client';
import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialProps {
    name: string;
    review: string;
    rating: number;
}

const TestimonialCard: React.FC<TestimonialProps> = ({
    name,
    review,
    rating,
}) => (
    <div className="p-4 rounded-lg border border-red-600 bg-black text-white w-64 flex-shrink-0 mx-3 my-2">
        <p className="mb-2 text-sm h-20 overflow-hidden">{review}</p>
        <p className="font-semibold text-sm">{name}</p>
        <div className="flex text-red-500 mt-1">
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    size={12}
                    fill={i < rating ? 'currentColor' : 'none'}
                />
            ))}
        </div>
    </div>
);

interface TestimonialsRowProps {
    testimonials: TestimonialProps[];
    direction: 'left' | 'right';
}

const TestimonialsRow: React.FC<TestimonialsRowProps> = ({
    testimonials,
    direction,
}) => (
    <div className="flex mb-4 overflow-hidden">
        <div className={direction === 'left' ? 'scrollLeft' : 'scrollRight'}>
            <div className="flex">
                {[...testimonials, ...testimonials].map(
                    (testimonial, index) => (
                        <TestimonialCard key={index} {...testimonial} />
                    )
                )}
            </div>
        </div>
    </div>
);

const TestimonialsSection: React.FC = () => {
    const allTestimonials: TestimonialProps[] = [
        {
            name: 'Ahmed S., Restaurant Owner',
            review: 'This POS system has completely transformed our order management. The speed at checkout has doubled our table turnover rate!',
            rating: 5,
        },
        {
            name: 'Fatima A., Retail Manager',
            review: 'The inventory tracking feature has eliminated stockouts. We can now forecast demand with incredible accuracy.',
            rating: 4,
        },
        {
            name: 'Omar K., Café Owner',
            review: 'The intuitive interface made training new staff a breeze. Even during rush hours, transactions are smooth and error-free.',
            rating: 5,
        },
        {
            name: 'Layla M., Boutique Owner',
            review: 'Customer data management has helped us create personalized marketing campaigns that have increased repeat business by 30%.',
            rating: 5,
        },
        {
            name: 'Hassan T., Supermarket Director',
            review: 'The reporting tools give me instant visibility into sales trends. The dashboard is comprehensive yet easy to understand.',
            rating: 4,
        },
        {
            name: 'Yasmin H., Bakery Owner',
            review: 'The loyalty program integration has been a game-changer for our business. Our customers love the points system!',
            rating: 5,
        },
        {
            name: 'Khaled R., Food Truck Operator',
            review: 'The mobile capabilities allow me to process payments anywhere. The offline mode has saved us during network outages.',
            rating: 5,
        },
        {
            name: 'Aisha B., Pharmacy Manager',
            review: "The barcode scanning feature is lightning fast. We've cut checkout time in half since implementing this POS system.",
            rating: 5,
        },
        {
            name: 'Mohamed E., Electronics Store Owner',
            review: 'The multi-location management tools help me keep all my branches synchronized. Inventory transfers have never been easier.',
            rating: 4,
        },
        {
            name: 'Nadia J., Restaurant Manager',
            review: 'The table management feature has streamlined our operations. Our servers can now handle more tables efficiently.',
            rating: 5,
        },
        {
            name: 'Samir Z., Convenience Store Owner',
            review: "The integrated payment processing works flawlessly. We've reduced transaction errors by nearly 100%.",
            rating: 5,
        },
        {
            name: 'Salma L., Clothing Store Owner',
            review: 'The customizable receipts and invoices have elevated our brand image. Customers notice these small details!',
            rating: 5,
        },
        {
            name: 'Zain M., Bookstore Manager',
            review: 'The customer display options have improved transparency at checkout. Our customers appreciate seeing the itemized totals.',
            rating: 4,
        },
        {
            name: 'Heba F., Gift Shop Owner',
            review: 'The employee management features help track performance and time. Scheduling has never been more efficient.',
            rating: 5,
        },
        {
            name: 'Tariq D., Restaurant Franchisee',
            review: 'The cloud-based architecture means I can check sales from anywhere. Real-time monitoring has been invaluable.',
            rating: 5,
        },
    ];

    // Shuffle and split testimonials into three groups
    const shuffled = [...allTestimonials].sort(() => 0.5 - Math.random());
    const testimonialGroups = [
        shuffled.slice(0, 5),
        shuffled.slice(5, 10),
        shuffled.slice(10, 15),
    ];

    return (
        <section className="py-16 px-4 overflow-hidden">
            <style jsx global>{`
                .scrollLeft {
                    display: flex;
                    animation: scrollLeft 40s linear infinite;
                    min-width: 100%;
                }

                .scrollRight {
                    display: flex;
                    animation: scrollRight 40s linear infinite;
                    min-width: 100%;
                }

                @keyframes scrollLeft {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }

                @keyframes scrollRight {
                    0% {
                        transform: translateX(-50%);
                    }
                    100% {
                        transform: translateX(0);
                    }
                }
            `}</style>

            <div className=" mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12">
                    What our <span className="text-red-500">customers</span> say
                    about our us
                </h2>
                <div className="space-y-8">
                    <TestimonialsRow
                        testimonials={testimonialGroups[0]}
                        direction="left"
                    />
                    <TestimonialsRow
                        testimonials={testimonialGroups[1]}
                        direction="right"
                    />
                    <TestimonialsRow
                        testimonials={testimonialGroups[2]}
                        direction="left"
                    />
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
